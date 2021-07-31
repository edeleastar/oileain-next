<script lang="ts">
  import {getContext} from "svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {Oileain} from "../services/oileain-api";
  import {generateMarkerLayers} from "../services/oileain-types";
  import type {MapSpec} from "../components/markers";
  import {replace} from "svelte-spa-router";

  const oileain: Oileain = getContext("oileain");

  async function getCoasts() {
    let coasts = await oileain.getCoasts();
    let mapSpec: MapSpec = {
      markerLayers: generateMarkerLayers(coasts)
    };
    return mapSpec;
  }

  function markerSelect(event) {
    oileain.getIslandById(event.detail.marker.id).then((islandSelected) => {
      let island = islandSelected;
      replace(`/poi/${island.safeName}`);
    });
  }
</script>

{#await getCoasts() then mapSpec}
  <LeafletMap {mapSpec} on:message={markerSelect}/>
{/await}
