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
code,city,country,country_code,hasMultiplePoPs,latitude,longitude
IAD,Ashburn,United States,US,true,38.94449997,-77.45580292
ATL,Atlanta,United States,US,true,33.6367,-84.428101
BOS,Boston,United States,US,false,42.36429977,-71.00520325
YYC,Calgary,Canada,CA,false,51.113899231,-114.019996643
MDW,Chicago,United States,US,true,41.785999,-87.752403
CMH,Columbus,United States,US,false,39.998001,-82.891899
DAL,Dallas,United States,US,true,32.847099,-96.851799
DEN,Denver,United States,US,false,39.861698150635,-104.672996521
DTW,Detroit,United States,US,false,42.212398529052734,-83.35340118408203
HNL,Honolulu,United States,US,false,21.32062,-157.924228
HOU,Houston,United States,US,false,29.64539909,-95.27890015
JAX,Jacksonville,United States,US,false,30.49410057067871,-81.68789672851562
MCI,Kansas City,United States,US,false,39.2976,-94.713898
LAX,Los Angeles,United States,US,true,33.942501,-118.407997
MIA,Miami,United States,US,false,25.79319953918457,-80.29060363769531
MSP,Minneapolis,United States,US,false,44.882,-93.221802
YUL,Montreal,Canada,CA,false,45.470556,-73.740833
JFK,New York,United States,US,true,40.639801,-73.7789
PHX,Phoenix,United States,US,false,33.43429946899414,-112.01200103759766
PDX,Portland,United States,US,false,45.58869934,-122.5979996
SJC,San Jose,United States,US,true,37.362598,-121.929001
BFI,Seattle,United States,US,true,47.529998779296875,-122.302001953125
STL,St Louis,United States,US,false,38.748697,-90.370003
YYZ,Toronto,Canada,CA,false,43.6772003174,-79.63059997559999
YVR,Vancouver,Canada,CA,false,49.193901062,-123.183998108
BOG,Bogota,Colombia,CO,false,4.70159,-74.1469
EZE,Buenos Aires,Argentina,AR,false,-34.8222,-58.5358
CWB,Curitiba,Brazil,BR,false,-25.5284996033,-49.1758003235
FOR,Fortaleza,Brazil,BR,false,-3.775833,-38.532222
LIM,Lima,Peru,PE,false,-12.0219,-77.114305
GRU,São Paulo,Brazil,BR,true,-23.435556411743164,-46.47305679321289
SCL,Santiago,Chile,CL,false,-33.393001556396484,-70.78579711914062
GIG,Rio de Janeiro,Brazil,BR,false,-22.8099994659,-43.2505569458
AMS,Amsterdam,Netherlands,NL,false,52.308601,4.76389
CPH,Copenhagen,Denmark,DK,false,55.617900848389,12.656000137329
BRU,Brussels,Belgium,BE,false,50.901401519800004,4.48443984985
DUB,Dublin,Ireland,IE,false,53.421299,-6.27007
FRA,Frankfurt am Main,Germany,DE,true,50.033333,8.570556
HEL,Helsinki,Finland,FI,false,60.317199707031,24.963300704956
LIS,Lisbon,Portugal,PT,false,38.7813,-9.13592
LTN,London,United Kingdom,GB,true,51.874698638916016,-0.36833301186561584
MAD,Madrid,Spain,ES,false,40.471926,-3.56264
MAN,Manchester,United Kingdom,GB,false,53.35369873046875,-2.2749500274658203
MRS,Marseille,France,FR,false,43.439271922,5.22142410278
MXP,Milan,Italy,IT,false,45.6306,8.72811
MUC,Munich,Germany,DE,false,48.353802,11.7861
OSL,Oslo,Norway,NO,false,60.193901062012,11.100399971008
PMO,Palermo,Italy,IT,false,38.175999,13.091
CDG,Paris,France,FR,false,49.012798,2.55
CIA,Rome,Italy,IT,false,41.7994,12.5949
SOF,Sofia,Bulgaria,BG,false,42.696693420410156,23.411436080932617
ARN,Stockholm,Sweden,SE,false,59.651901245117,17.918600082397
VIE,Vienna,Austria,AT,false,48.110298156738,16.569700241089
ACC,Accra,Ghana,GH,false,5.605189800262451,-0.16678600013256073
CPT,Cape Town,South Africa,ZA,false,-33.9648017883,18.6016998291
JNB,Johannesburg,South Africa,ZA,false,-26.1392,28.246
DMK,Bangkok,Thailand,TH,false,13.9125995636,100.607002258
MAA,Chennai,India,IN,false,12.990005493164062,80.16929626464844
DXB,Dubai,United Arab Emirates,AE,false,25.2527999878,55.3643989563
FJR,Fujairah,United Arab Emirates,AE,false,25.112222,56.324167
HKG,Hong Kong,Hong Kong,HK,false,22.308901,113.915001
HYD,Hyderabad,India,IN,false,17.231318,78.429855
CCU,Kolkata,India,IN,false,22.654699325561523,88.44670104980469
KUL,Kuala Lumpur,Malaysia,MY,false,2.745579957962,101.70999908447
MNL,Manila,Philippines,PH,false,14.5086,121.019997
BOM,Mumbai,India,IN,false,19.0886993408,72.8678970337
DEL,New Delhi,India,IN,false,28.5665,77.103104
KIX,Osaka,Japan,JP,false,34.42729949951172,135.24400329589844
ICN,Seoul,Korea, Republic of,KR,false,37.46910095214844,126.45099639892578
SIN,Singapore,Singapore,SG,false,1.35019,103.994003
NRT,Tokyo,Japan,JP,true,35.764702,140.386002
ADL,Adelaide,Australia,AU,false,-34.945,138.531006
AKL,Auckland,New Zealand,NZ,false,-37.008098602299995,174.792007446
BNE,Brisbane,Australia,AU,false,-27.384199142456055,153.11700439453125
CHC,Christchurch,New Zealand,NZ,false,-43.48939895629883,172.53199768066406
MEL,Melbourne,Australia,AU,false,-37.673302,144.843002
PER,Perth,Australia,AU,false,-31.94029998779297,115.96700286865234
SYD,Sydney,Australia,AU,false,-33.94609832763672,151.177001953125
WLG,Wellington,New Zealand,NZ,false,-41.3272018433,174.804992676
MEX,Mexico City,Mexico,MX,false,19.4363,-99.072098
NBO,Nairobi,Kenya,KE,false,-1.31923997402,36.9277992249
```

### JSON lookup

The JSON version of the data can be found at [dist/fastly-edge-locations.json](dist/fastly-edge-locations.json).

```javascript
{
  "IAD": {
    "city": "Ashburn",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 38.94449997,
    "longitude": -77.45580292
  },
  "ATL": {
    "city": "Atlanta",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 33.6367,
    "longitude": -84.428101
  },
  "BOS": {
    "city": "Boston",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 42.36429977,
    "longitude": -71.00520325
  },
  "YYC": {
    "city": "Calgary",
    "country": "Canada",
    "countryCode": "CA",
    "hasMultiplePoPs": false,
    "latitude": 51.113899231,
    "longitude": -114.019996643
  },
  "MDW": {
    "city": "Chicago",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 41.785999,
    "longitude": -87.752403
  },
  "CMH": {
    "city": "Columbus",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 39.998001,
    "longitude": -82.891899
  },
  "DAL": {
    "city": "Dallas",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 32.847099,
    "longitude": -96.851799
  },
  "DEN": {
    "city": "Denver",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 39.861698150635,
    "longitude": -104.672996521
  },
  "DTW": {
    "city": "Detroit",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 42.212398529052734,
    "longitude": -83.35340118408203
  },
  "HNL": {
    "city": "Honolulu",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 21.32062,
    "longitude": -157.924228
  },
  "HOU": {
    "city": "Houston",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 29.64539909,
    "longitude": -95.27890015
  },
  "JAX": {
    "city": "Jacksonville",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 30.49410057067871,
    "longitude": -81.68789672851562
  },
  "MCI": {
    "city": "Kansas City",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 39.2976,
    "longitude": -94.713898
  },
  "LAX": {
    "city": "Los Angeles",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 33.942501,
    "longitude": -118.407997
  },
  "MIA": {
    "city": "Miami",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 25.79319953918457,
    "longitude": -80.29060363769531
  },
  "MSP": {
    "city": "Minneapolis",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 44.882,
    "longitude": -93.221802
  },
  "YUL": {
    "city": "Montreal",
    "country": "Canada",
    "countryCode": "CA",
    "hasMultiplePoPs": false,
    "latitude": 45.470556,
    "longitude": -73.740833
  },
  "JFK": {
    "city": "New York",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 40.639801,
    "longitude": -73.7789
  },
  "PHX": {
    "city": "Phoenix",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 33.43429946899414,
    "longitude": -112.01200103759766
  },
  "PDX": {
    "city": "Portland",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 45.58869934,
    "longitude": -122.5979996
  },
  "SJC": {
    "city": "San Jose",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 37.362598,
    "longitude": -121.929001
  },
  "BFI": {
    "city": "Seattle",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": true,
    "latitude": 47.529998779296875,
    "longitude": -122.302001953125
  },
  "STL": {
    "city": "St Louis",
    "country": "United States",
    "countryCode": "US",
    "hasMultiplePoPs": false,
    "latitude": 38.748697,
    "longitude": -90.370003
  },
  "YYZ": {
    "city": "Toronto",
    "country": "Canada",
    "countryCode": "CA",
    "hasMultiplePoPs": false,
    "latitude": 43.6772003174,
    "longitude": -79.63059997559999
  },
  "YVR": {
    "city": "Vancouver",
    "country": "Canada",
    "countryCode": "CA",
    "hasMultiplePoPs": false,
    "latitude": 49.193901062,
    "longitude": -123.183998108
  },
  "BOG": {
    "city": "Bogota",
    "country": "Colombia",
    "countryCode": "CO",
    "hasMultiplePoPs": false,
    "latitude": 4.70159,
    "longitude": -74.1469
  },
  "EZE": {
    "city": "Buenos Aires",
    "country": "Argentina",
    "countryCode": "AR",
    "hasMultiplePoPs": false,
    "latitude": -34.8222,
    "longitude": -58.5358
  },
  "CWB": {
    "city": "Curitiba",
    "country": "Brazil",
    "countryCode": "BR",
    "hasMultiplePoPs": false,
    "latitude": -25.5284996033,
    "longitude": -49.1758003235
  },
  "FOR": {
    "city": "Fortaleza",
    "country": "Brazil",
    "countryCode": "BR",
    "hasMultiplePoPs": false,
    "latitude": -3.775833,
    "longitude": -38.532222
  },
  "LIM": {
    "city": "Lima",
    "country": "Peru",
    "countryCode": "PE",
    "hasMultiplePoPs": false,
    "latitude": -12.0219,
    "longitude": -77.114305
  },
  "GRU": {
    "city": "São Paulo",
    "country": "Brazil",
    "countryCode": "BR",
    "hasMultiplePoPs": true,
    "latitude": -23.435556411743164,
    "longitude": -46.47305679321289
  },
  "SCL": {
    "city": "Santiago",
    "country": "Chile",
    "countryCode": "CL",
    "hasMultiplePoPs": false,
    "latitude": -33.393001556396484,
    "longitude": -70.78579711914062
  },
  "GIG": {
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "countryCode": "BR",
    "hasMultiplePoPs": false,
    "latitude": -22.8099994659,
    "longitude": -43.2505569458
  },
  "AMS": {
    "city": "Amsterdam",
    "country": "Netherlands",
    "countryCode": "NL",
    "hasMultiplePoPs": false,
    "latitude": 52.308601,
    "longitude": 4.76389
  },
  "CPH": {
    "city": "Copenhagen",
    "country": "Denmark",
    "countryCode": "DK",
    "hasMultiplePoPs": false,
    "latitude": 55.617900848389,
    "longitude": 12.656000137329
  },
  "BRU": {
    "city": "Brussels",
    "country": "Belgium",
    "countryCode": "BE",
    "hasMultiplePoPs": false,
    "latitude": 50.901401519800004,
    "longitude": 4.48443984985
  },
  "DUB": {
    "city": "Dublin",
    "country": "Ireland",
    "countryCode": "IE",
    "hasMultiplePoPs": false,
    "latitude": 53.421299,
    "longitude": -6.27007
  },
  "FRA": {
    "city": "Frankfurt am Main",
    "country": "Germany",
    "countryCode": "DE",
    "hasMultiplePoPs": true,
    "latitude": 50.033333,
    "longitude": 8.570556
  },
  "HEL": {
    "city": "Helsinki",
    "country": "Finland",
    "countryCode": "FI",
    "hasMultiplePoPs": false,
    "latitude": 60.317199707031,
    "longitude": 24.963300704956
  },
  "LIS": {
    "city": "Lisbon",
    "country": "Portugal",
    "countryCode": "PT",
    "hasMultiplePoPs": false,
    "latitude": 38.7813,
    "longitude": -9.13592
  },
  "LTN": {
    "city": "London",
    "country": "United Kingdom",
    "countryCode": "GB",
    "hasMultiplePoPs": true,
    "latitude": 51.874698638916016,
    "longitude": -0.36833301186561584
  },
  "MAD": {
    "city": "Madrid",
    "country": "Spain",
    "countryCode": "ES",
    "hasMultiplePoPs": false,
    "latitude": 40.471926,
    "longitude": -3.56264
  },
  "MAN": {
    "city": "Manchester",
    "country": "United Kingdom",
    "countryCode": "GB",
    "hasMultiplePoPs": false,
    "latitude": 53.35369873046875,
    "longitude": -2.2749500274658203
  },
  "MRS": {
    "city": "Marseille",
    "country": "France",
    "countryCode": "FR",
    "hasMultiplePoPs": false,
    "latitude": 43.439271922,
    "longitude": 5.22142410278
  },
  "MXP": {
    "city": "Milan",
    "country": "Italy",
    "countryCode": "IT",
    "hasMultiplePoPs": false,
    "latitude": 45.6306,
    "longitude": 8.72811
  },
  "MUC": {
    "city": "Munich",
    "country": "Germany",
    "countryCode": "DE",
    "hasMultiplePoPs": false,
    "latitude": 48.353802,
    "longitude": 11.7861
  },
  "OSL": {
    "city": "Oslo",
    "country": "Norway",
    "countryCode": "NO",
    "hasMultiplePoPs": false,
    "latitude": 60.193901062012,
    "longitude": 11.100399971008
  },
  "PMO": {
    "city": "Palermo",
    "country": "Italy",
    "countryCode": "IT",
    "hasMultiplePoPs": false,
    "latitude": 38.175999,
    "longitude": 13.091
  },
  "CDG": {
    "city": "Paris",
    "country": "France",
    "countryCode": "FR",
    "hasMultiplePoPs": false,
    "latitude": 49.012798,
    "longitude": 2.55
  },
  "CIA": {
    "city": "Rome",
    "country": "Italy",
    "countryCode": "IT",
    "hasMultiplePoPs": false,
    "latitude": 41.7994,
    "longitude": 12.5949
  },
  "SOF": {
    "city": "Sofia",
    "country": "Bulgaria",
    "countryCode": "BG",
    "hasMultiplePoPs": false,
    "latitude": 42.696693420410156,
    "longitude": 23.411436080932617
  },
  "ARN": {
    "city": "Stockholm",
    "country": "Sweden",
    "countryCode": "SE",
    "hasMultiplePoPs": false,
    "latitude": 59.651901245117,
    "longitude": 17.918600082397
  },
  "VIE": {
    "city": "Vienna",
    "country": "Austria",
    "countryCode": "AT",
    "hasMultiplePoPs": false,
    "latitude": 48.110298156738,
    "longitude": 16.569700241089
  },
  "ACC": {
    "city": "Accra",
    "country": "Ghana",
    "countryCode": "GH",
    "hasMultiplePoPs": false,
    "latitude": 5.605189800262451,
    "longitude": -0.16678600013256073
  },
  "CPT": {
    "city": "Cape Town",
    "country": "South Africa",
    "countryCode": "ZA",
    "hasMultiplePoPs": false,
    "latitude": -33.9648017883,
    "longitude": 18.6016998291
  },
  "JNB": {
    "city": "Johannesburg",
    "country": "South Africa",
    "countryCode": "ZA",
    "hasMultiplePoPs": false,
    "latitude": -26.1392,
    "longitude": 28.246
  },
  "DMK": {
    "city": "Bangkok",
    "country": "Thailand",
    "countryCode": "TH",
    "hasMultiplePoPs": false,
    "latitude": 13.9125995636,
    "longitude": 100.607002258
  },
  "MAA": {
    "city": "Chennai",
    "country": "India",
    "countryCode": "IN",
    "hasMultiplePoPs": false,
    "latitude": 12.990005493164062,
    "longitude": 80.16929626464844
  },
  "DXB": {
    "city": "Dubai",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "hasMultiplePoPs": false,
    "latitude": 25.2527999878,
    "longitude": 55.3643989563
  },
  "FJR": {
    "city": "Fujairah",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "hasMultiplePoPs": false,
    "latitude": 25.112222,
    "longitude": 56.324167
  },
  "HKG": {
    "city": "Hong Kong",
    "country": "Hong Kong",
    "countryCode": "HK",
    "hasMultiplePoPs": false,
    "latitude": 22.308901,
    "longitude": 113.915001
  },
  "HYD": {
    "city": "Hyderabad",
    "country": "India",
    "countryCode": "IN",
    "hasMultiplePoPs": false,
    "latitude": 17.231318,
    "longitude": 78.429855
  },
  "CCU": {
    "city": "Kolkata",
    "country": "India",
    "countryCode": "IN",
    "hasMultiplePoPs": false,
    "latitude": 22.654699325561523,
    "longitude": 88.44670104980469
  },
  "KUL": {
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "countryCode": "MY",
    "hasMultiplePoPs": false,
    "latitude": 2.745579957962,
    "longitude": 101.70999908447
  },
  "MNL": {
    "city": "Manila",
    "country": "Philippines",
    "countryCode": "PH",
    "hasMultiplePoPs": false,
    "latitude": 14.5086,
    "longitude": 121.019997
  },
  "BOM": {
    "city": "Mumbai",
    "country": "India",
    "countryCode": "IN",
    "hasMultiplePoPs": false,
    "latitude": 19.0886993408,
    "longitude": 72.8678970337
  },
  "DEL": {
    "city": "New Delhi",
    "country": "India",
    "countryCode": "IN",
    "hasMultiplePoPs": false,
    "latitude": 28.5665,
    "longitude": 77.103104
  },
  "KIX": {
    "city": "Osaka",
    "country": "Japan",
    "countryCode": "JP",
    "hasMultiplePoPs": false,
    "latitude": 34.42729949951172,
    "longitude": 135.24400329589844
  },
  "ICN": {
    "city": "Seoul",
    "country": "Korea, Republic of",
    "countryCode": "KR",
    "hasMultiplePoPs": false,
    "latitude": 37.46910095214844,
    "longitude": 126.45099639892578
  },
  "SIN": {
    "city": "Singapore",
    "country": "Singapore",
    "countryCode": "SG",
    "hasMultiplePoPs": false,
    "latitude": 1.35019,
    "longitude": 103.994003
  },
  "NRT": {
    "city": "Tokyo",
    "country": "Japan",
    "countryCode": "JP",
    "hasMultiplePoPs": true,
    "latitude": 35.764702,
    "longitude": 140.386002
  },
  "ADL": {
    "city": "Adelaide",
    "country": "Australia",
    "countryCode": "AU",
    "hasMultiplePoPs": false,
    "latitude": -34.945,
    "longitude": 138.531006
  },
  "AKL": {
    "city": "Auckland",
    "country": "New Zealand",
    "countryCode": "NZ",
    "hasMultiplePoPs": false,
    "latitude": -37.008098602299995,
    "longitude": 174.792007446
  },
  "BNE": {
    "city": "Brisbane",
    "country": "Australia",
    "countryCode": "AU",
    "hasMultiplePoPs": false,
    "latitude": -27.384199142456055,
    "longitude": 153.11700439453125
  },
  "CHC": {
    "city": "Christchurch",
    "country": "New Zealand",
    "countryCode": "NZ",
    "hasMultiplePoPs": false,
    "latitude": -43.48939895629883,
    "longitude": 172.53199768066406
  },
  "MEL": {
    "city": "Melbourne",
    "country": "Australia",
    "countryCode": "AU",
    "hasMultiplePoPs": false,
    "latitude": -37.673302,
    "longitude": 144.843002
  },
  "PER": {
    "city": "Perth",
    "country": "Australia",
    "countryCode": "AU",
    "hasMultiplePoPs": false,
    "latitude": -31.94029998779297,
    "longitude": 115.96700286865234
  },
  "SYD": {
    "city": "Sydney",
    "country": "Australia",
    "countryCode": "AU",
    "hasMultiplePoPs": false,
    "latitude": -33.94609832763672,
    "longitude": 151.177001953125
  },
  "WLG": {
    "city": "Wellington",
    "country": "New Zealand",
    "countryCode": "NZ",
    "hasMultiplePoPs": false,
    "latitude": -41.3272018433,
    "longitude": 174.804992676
  },
  "MEX": {
    "city": "Mexico City",
    "country": "Mexico",
    "countryCode": "MX",
    "hasMultiplePoPs": false,
    "latitude": 19.4363,
    "longitude": -99.072098
  },
  "NBO": {
    "city": "Nairobi",
    "country": "Kenya",
    "countryCode": "KE",
    "hasMultiplePoPs": false,
    "latitude": -1.31923997402,
    "longitude": 36.9277992249
  }
}
```
