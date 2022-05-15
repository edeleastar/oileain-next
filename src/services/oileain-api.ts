import type {Island, IslandGroup} from "./oileain-types";

import type {MarkerLayer, MarkerSpec} from "./markers";

// Converter functions to generate Leaflet marker compatible collections
// from above data structures
export function generateMarkerSpec(island: Island): MarkerSpec {
  return <MarkerSpec>{
    id: island.safeName,
    title: island.name,
    location: {
      lat: island.coordinates.geo.lat,
      lng: island.coordinates.geo.long,
    },
  };
}

export function generateMarkerSpecs(islands: Array<Island>): MarkerSpec[] {
  const markerSpecs = Array<MarkerSpec>();
  islands.forEach((island) => {
    markerSpecs.push(island.markerSpec);
  });
  return markerSpecs;
}

export function generateMarkerLayer(islandGroup: IslandGroup): MarkerLayer {
  return {
    title: islandGroup.title,
    markerSpecs: generateMarkerSpecs(islandGroup.pois),
  };
}

export function generateMarkerLayers(coasts: IslandGroup[]): MarkerLayer[] {
  const markerLayers = [];
  coasts.forEach((coast) => {
    markerLayers.push(coast.markerLayer);
  });
  return markerLayers;
}

// Cache & index island data
export class Oileain {
  // all island data as retrieved from API
  coasts: any[];
  markerLayers: MarkerLayer[];
  // indexes for fast lookup
  islandMap = new Map<string, Island>();
  coastMap = new Map<string, IslandGroup>();

  // Retrieve shallow version of all islands (without descriptions and other details)
  async getCoasts() {
    if (!this.coasts) {
      const response = await fetch("https://edeleastar.github.io/oileain-model-2/api/oileain-all-slim.json");
      this.coasts = await response.json();
      this.createIndexes();
      this.markerLayers = generateMarkerLayers(this.coasts);
    }
    return this.coasts;
  }

  // Retrieve details in a single island - and cache locally
  async getIslandById(id: string) {
    // get local copy
    let cachedPoi = this.islandMap.get(id);
    // see if this is full version
    if (cachedPoi.description) {
      // it is, return
      return cachedPoi;
    } else {
      // only shallow version locally - fetch and cache full version.
      const path = `https://edeleastar.github.io/oileain-model-2/api/${cachedPoi.coast.variable}/${id}.json`;
      const response = await fetch(path);
      const island = await response.json();
      island.safeName = id;
      island.name = island.nameHtml;
      island.markerSpec = generateMarkerSpec(island)
      this.islandMap.set(id, island);
      return island;
    }
  }

  // index all islands by id (safeName)
  createIndexes() {
    this.coasts.forEach((coast) => {
      this.coastMap.set(coast.variable, coast);
      coast.pois.forEach((poi) => {
        poi.coast = coast;
        poi.safeName = encodeURI(poi.safeName);
        poi.markerSpec = generateMarkerSpec(poi);
        this.islandMap.set(poi.safeName, poi);
      });
      coast.markerLayer = generateMarkerLayer(coast);
    });
  }
}

