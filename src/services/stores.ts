import {writable} from "svelte/store";

const Poi = {
  title: "",
  lat: 0,
  lng: 0
};

export const currentPoi = writable(Poi);
