<script lang="ts">
  import { onMount, getContext } from "svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import IslandLatLng from "../components/IslandLatLng.svelte";
  import IslandDescription from "../components/IslandDescription.svelte";
  import type { Oileain } from "../services/oileain-api";
  import type { IslandGroup, Island } from "../services/oileain-types";
  import { generateMarkerSpec,generateMarkerLayers } from "../services/oileain-types";
  import type { MarkerLayer } from "../components/markers";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<IslandGroup>;
  let island: Island;
  let navigator: LeafletMap;
  let markerLayers = Array<MarkerLayer>();

  onMount(async () => {
    coasts = await oileain.getCoasts();
    markerLayers = generateMarkerLayers(coasts);
  });

  function markerSelect(event) {
    oileain.getIslandById(event.detail.marker.id).then((islandSelected) => {
      island = islandSelected;
      navigator.addPopupMarkerAndZoom("selected", generateMarkerSpec(island));
    });
  }
</script>

{#if coasts}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-1-3@m uk-animation-scale-up">
      <LeafletMap id="map-main" zoom={7} height={560} {markerLayers} on:message={markerSelect} />
      {#if island}
        <div class="uk-card uk-card-default uk-card-body">
          <IslandLatLng {island} />
        </div>
      {/if}
    </div>
    <div class="uk-width-expand@m uk-animation-scale-up">
      <LeafletMap id="map-secondary" height={250} activeLayer="Satellite" bind:this={navigator} />
      {#if island}
        <div class="uk-card uk-card-default uk-card-body">
          <IslandDescription {island} />
        </div>
      {:else}
        <div class="uk-card uk-card-default uk-card-body">
          <p>Select Island marker on map to view details...</p>
        </div>
      {/if}
    </div>
  </div>
{/if}
