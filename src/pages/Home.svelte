<script lang="ts">
  import {getContext} from "svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {Oileain} from "../services/oileain-api";
  import type {MapSpec} from "../components/markers";
  import {push} from "svelte-spa-router";

  const oileain: Oileain = getContext("oileain");

  async function getCoasts() {
    await oileain.getCoasts();
    let mapSpec: MapSpec = {
      markerLayers: oileain.markerLayers,
      markerClick(marker): void {
        oileain.getIslandById(marker.id).then((islandSelected) => {
          let island = islandSelected;
          push(`/poi/${island.safeName}`);
        });
      }
    };
    return mapSpec;
  }

</script>

{#await getCoasts() then mapSpec}
  <LeafletMap {mapSpec}/>
{/await}
