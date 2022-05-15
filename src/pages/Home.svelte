<script lang="ts">
  import {getContext, onDestroy} from "svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {Oileain} from "../services/oileain-api";
  import type {MapSpec} from "../components/markers";
  import {location, push} from "svelte-spa-router";
  import L, {LatLng} from "leaflet";
  import {currentPoi} from "../services/stores";

  const oileain: Oileain = getContext("oileain");
  export let params: any = {};
  let map: LeafletMap;

  function getLoc(str: string): [LatLng, number] {
    let loc = str.split(',');
    return [L.latLng(Number(loc[0]), Number(loc[1])), Number(loc[2])]
  }

  async function getCoasts() {
    await oileain.getCoasts();
    let location = L.latLng(53.2734, -7.7783203)
    let zoom = 8;
    if (params.wild) {
      [location, zoom] = getLoc(params.wild);
    }
    let mapSpec: MapSpec = {
      location: location,
      zoom: zoom,
      markerLayers: oileain.markerLayers,
      markerClick(marker): void {
        oileain.getIslandById(marker.id).then((islandSelected) => {
          let island = islandSelected;
          push(`/poi/${island.safeName}`);
        });
      }
    };
    currentPoi.set({title: "<p>Ireland</p>", lat: 53.2734, lng: -7.7783203});
    return mapSpec;
  }

  let unsubscribe = location.subscribe(async (value) => {
    console.log(value);
    const id = value.substring(value.lastIndexOf("/") + 1);
    if (id) {
      let [loc, zoom] = getLoc(id);
      if (map) {
        map.moveTo(loc, zoom);
        currentPoi.set({title: "Ireland", lat: loc.lat, lng: loc.lng});
      }
    }
  });

  onDestroy(unsubscribe);

</script>

{#await getCoasts() then mapSpec}
  <LeafletMap {mapSpec} bind:this={map}/>
{/await}
