const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const utf8 = require('utf8');
const airportOverridesData = require('./lib/airportOverrides');

// Load airport data
const airportData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'large-airports.json'), 'utf8'));
// Load countries data
const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'country-codes.json'), 'utf8'));

const writeCSV = locations => {
  const csvPath = path.join(__dirname, 'dist', 'fastly-edge-locations.csv');
  const data = locations.map(e => {
    return `${e.code},${e.city},${e.country},${e.countryCode},${e.hasMultiplePoPs},${e.latitude},${e.longitude}`;
  });
  // Add header
  data.unshift('code,city,country,country_code,hasMultiplePoPs,latitude,longitude');
  fs.writeFileSync(csvPath, data.join(os.EOL), 'utf8');
}

const writeJSON = locations => {
  const jsonPath = path.join(__dirname, 'dist', 'fastly-edge-locations.json');
  const data = {};
  locations.forEach(location => {
    data[location.code] = {
      city: location.city,
      country: location.country,
      countryCode: location.countryCode,
      hasMultiplePoPs: location.hasMultiplePoPs,
      latitude: location.latitude,
      longitude: location.longitude,
    }
  });
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

const lookupCountry = (countryCode) => {
  const foundCountry = countriesData.filter(country => country.Code === countryCode);
  if (foundCountry.length === 1) {
    return foundCountry[0].Name;
  } else {
    return '';
  }
}

const lookupAirport = city => {
  const matches = [];
  let match = null;
  // Search for matches
  airportData.forEach(entry => {
    if (entry.municipality && entry.municipality.toLowerCase() === city.toLowerCase()) {
      matches.push(entry);
    }
  });
  if (matches.length > 1) { // Handle multiple matches
    const tempMatches = [];
    matches.forEach(m => {
      if (m.name.toLowerCase().indexOf('international') !== -1) {
        tempMatches.push(m);
      }
    });
    if (tempMatches.length > 0) { // Multiple matches, take first one, kind of random selection
      match = tempMatches[0];
    } else { // no "international" tempMatches, fallback to first el of unfiltered matches
      match = matches[0];
    }
  } else { // Single match
    match = matches[0];
  }
  return match;
}

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', consoleObj => console.log(consoleObj.text()));

  const response = await page.goto('https://www.fastly.com/network-map/')

  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`)
  }

  const data = await page.evaluate(() => {
    const cities = [];
    const rawCities = document.evaluate('//html/body/div/div[1]/section[2]/div/div/div/div[*]/ul/li[*]/p', document);

    // First iterator
    let citiesIterator = rawCities.iterateNext();

    // Iterate over entries
    while (citiesIterator) {
      cities.push(citiesIterator.textContent); 
      citiesIterator = rawCities.iterateNext();
    }

    const cleanedCities = cities.map((city) => {
      const c = {};
      if (city.includes('*')) {
        c.name = city.replace(/\*/g, '');
        c.hasMultiplePoPs = true;
      } else {
        c.name = city;
        c.hasMultiplePoPs = false;
      }
      // FRA override
      c.name = c.name.replace('Frankfurt', 'Frankfurt am Main');
      return c;
    });

    return cleanedCities;

  });

  await page.close();
  await browser.close();

  const withAirports = data.map((city) => {
    const location = {
      city: city.name,
      hasMultiplePoPs: city.hasMultiplePoPs,
    };
    const airport = lookupAirport(utf8.encode(location.city));
    if (airportOverridesData.hasOwnProperty(location.city.toLowerCase())) {
      const overrideData = airportOverridesData[location.city.toLowerCase()];
      location.code = overrideData.code;
      location.countryCode = overrideData.countryCode;
      location.country = lookupCountry(overrideData.countryCode);
      location.latitude = overrideData.latitude;
      location.longitude = overrideData.longitude;
    } else if (airport) {
      location.code = airport.iata_code;
      location.countryCode = airport.iso_country;
      location.country = lookupCountry(airport.iso_country);
      const coordinate = airport.coordinates.split(', ');
      location.latitude = parseFloat(coordinate[1]);
      location.longitude = parseFloat(coordinate[0]);
    }
    return location;
  });

  writeJSON(withAirports);
  writeCSV(withAirports);
}

run();
