import type { MarkerLayer, MarkerSpec } from "../components/markers";

// Types for the geographic model as encoded in
//  - https://github.com/edeleastar/oileain-api

// Geodetic Co-ordinates
// WGS84/ETRS89
// Used as reference for GPS and online maps of Ireland
// GPS-compatible
export interface Geodetic {
  lat: number;
  long: number;
}

// Irish Grid
// Used on OS maps of Ireland since the 1960s.
export interface Grid {
  sheet: string;
  eastings: number;
  northings: number;
}

// Irish Grid Full Co-ordinates
export interface FullGrid {
  eastings: number;
  northings: number;
}

// Container for above co-ordinate systems
export interface Coordinates {
  irishGrid: Grid;
  fullIrishGrid: FullGrid;
  tmcGrid: FullGrid; //Irish Transverse Mercator Grid Co-ordinates
  geo: Geodetic;
}

// A single island
export interface Island {
  name: string;
  safeName: string;
  nameHtml: string;
  costalZone: string;
  coordinates: Coordinates;
  cursor: number;
  description: string;
  coast?: IslandGroup;
}

// A group of Islands
export interface IslandGroup {
  title: string;
  variable: string;
  identifier: string;
  geo: Geodetic;
  pois: Array<Island>; // islands known as pois (points of interest)
}

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
    markerSpecs.push(generateMarkerSpec(island));
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
    markerLayers.push(generateMarkerLayer(coast));
  });
  return markerLayers;
}
