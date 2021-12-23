const locations = require('../dist/fastly-edge-locations.json');

class FastlyEdgeLocations {
  constructor() {}

  getLocationCount () {
    return Object.getOwnPropertyNames(locations).length;
  }

  getLocations () {
    return locations;
  }

  lookup (code) {
    if (locations.hasOwnProperty(code.toUpperCase())) {
      return locations[code.toUpperCase()];
    } else {
      return false;
    }
  }
}

module.exports = FastlyEdgeLocations;
