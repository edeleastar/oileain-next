import type {LatLng} from "leaflet";

export interface MarkerSpec {
  id: string;
  title: string;
  location: LatLng;
}

export interface MarkerLayer {
  title: string;
  markerSpecs: MarkerSpec[];
}

export interface MapSpec {
  location?: LatLng;
  zoom?: number;
  minZoom?: number;
  activeLayer?: string;
  markerLayers?: MarkerLayer[];
  marker?: MarkerSpec
}
