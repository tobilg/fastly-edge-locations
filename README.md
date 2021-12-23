# fastly-edge-locations
Approximation of fastly.com edge locations, usable via a lookup mechanism.

## Contents

If you're here for the plain data, have a look at

* [List of Fastly CloudFront Edge Locations (as CSV)](#csv-list) 
* [List of Fastly CloudFront Edge Locations (as JSON)](#json-lookup)

## Installation
To install, you can do the following:

```bash
$ npm i fastly-edge-locations
```

## Usage

### Node

```javascript
const FastlyEdgeLocations = require('fastly-edge-locations');
const el = new FastlyEdgeLocations();
const location = el.lookup('IAD');

/* returns
{
  "city": "Ashburn",
  "country": "United States",
  "countryCode": "US",
  "hasMultiplePoPs": true,
  "latitude": 38.94449997,
  "longitude": -77.45580292
}
*/

const invalid = el.lookup('FOO'); // returns false

// Get edge location count
const locationCount = el.getLocationCount(); // returns 81
```

### Browser

This package is published as an UMD module, and can be used in the browser directly from [unpkg](https://unpkg.com/).

```html
<html>
    <head>
        <script src="https://unpkg.com/fastly-edge-locations"></script> 
    </head>
    <body>
        <script>
            // Using the global variable
            document.write('There are ' + fastlyEdgeLocations.getLocationCount() + ' edge locations');
        </script>
    </body>
</html>
```

## Data generation

### TLDR

After installation of `jq` library, run `npm run generate`

### Explanation

To prepare the data regeneration, please run `npm run airports:download && npm run airports:filter && npm run countries:download`. This step requires an installation of [jq](https://github.com/stedolan/jq/wiki/Installation) on the machine where the commands are run.

The `generate.js` script will regenerate the `csv` and `json` versions of the Fastly Edge Location list in the `dist` folder.

It does this by extracting the information from the [Fastly Network Map page](https://www.fastly.com/network-map/), cleaning and unifiying it, and merging it with [airport data](https://datahub.io/core/airport-codes/r/airport-codes.json) (the first three characters of the `location` field are IATA airport codes) to also get the latitude/longitude information.

Also, there are some manual overrides when it wasn't possible to automatically determine the correct IATA code from the city names.

## Data

This project is considered as in the `alpha` stage, so there's **no guarantee that the data is accurate**. Please feel free to test and give feedback either via creating an [issue](https://github.com/tobilg/fastly-edge-locations/issues) or a [pr](https://github.com/tobilg/fastly-edge-locations/pulls)

### CSV list

The CSV version of the data can be found at [dist/fastly-edge-locations.csv](dist/fastly-edge-locations.csv). The file is using `,` as field separator.

### CSV list

The CSV version of the data can be found at [dist/fastly-edge-locations.csv](dist/fastly-edge-locations.csv). The file is using `,` as field separator.

```csv
```

### JSON lookup

The JSON version of the data can be found at [dist/fastly-edge-locations.json](dist/fastly-edge-locations.json).

```javascript
```
