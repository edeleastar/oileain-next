import type { IslandGroup, Island } from "./oileain-types";

// Cache & index island data
export class Oileain {
  // all island data as retrieved from API
  coasts: any[];
  // indexes for fast lookup
  islandMap = new Map<string, Island>();
  coastMap = new Map<string, IslandGroup>();

  // Retrieve shallow version of all islands (without descriptions and other details)
  async getCoasts() {
    if (!this.coasts) {
      const response = await fetch("https://edeleastar.github.io/oileain-api/all-slim.json");
      this.coasts = await response.json();
      this.createIndexes();
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
      // only shalow version locally - fetch and cache full version.
      const path = `https://edeleastar.github.io/oileain-api/${cachedPoi.coast.variable}/${id}.json`;
      const response = await fetch(path);
      const island = await response.json();
      island.safeName = id;
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
        this.islandMap.set(poi.safeName, poi);
      });
    });
  }
}
