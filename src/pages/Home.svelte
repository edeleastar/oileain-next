<script lang="ts">
  import {getContext, onMount} from "svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {Oileain} from "../services/oileain-api";
  import type {IslandGroup} from "../services/oileain-types";
  import {generateMarkerLayers} from "../services/oileain-types";
  import type {MarkerLayer} from "../components/markers";
  import {replace} from "svelte-spa-router";


  let oileain: Oileain = getContext("oileain");
  let coasts: Array<IslandGroup> = null;
  let markerLayers = Array<MarkerLayer>();

  onMount(async () => {
    // retrieve shallow version of all islands (divided into coasts)
    coasts = await oileain.getCoasts();
    // create a set of Leaflet layers - one for each coast (island group)
    // these are sent to the LeafletMap and will be rendered (along with layer control to selectively disable)
    markerLayers = generateMarkerLayers(coasts);
  });

  function markerSelect(event) {
    oileain.getIslandById(event.detail.marker.id).then((islandSelected) => {
      let island = islandSelected;
      replace(`/poi/${island.safeName}`);
    });
  }
</script>

{#if coasts}
  <LeafletMap zoom={8}  {markerLayers} on:message={markerSelect}/>
{/if}
