<script lang="ts">
  import {afterUpdate, getContext, onDestroy, onMount} from "svelte";
  import {location, replace} from "svelte-spa-router";
  import type {Oileain} from "../services/oileain-api";
  import type {Island, IslandGroup} from "../services/oileain-types";
  import {generateMarkerLayers, generateMarkerSpec} from "../services/oileain-types";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {MarkerLayer, MarkerSpec} from "../components/markers";
  import LeafletCard from "../components/LeafletCard.svelte";
  import DescriptionCard from "../components/DescriptionCard.svelte";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let island: Island;

  let islandGroup: IslandGroup[];
  let markerLayers = Array<MarkerLayer>();

  let mapTerrain, mapSat, mapIreland: LeafletMap;
  let marker: MarkerSpec;

  async function fetchIsland(id: string) {
    island = await oileain.getIslandById(id);
  }

  function renderIsland() {
    marker = generateMarkerSpec(island);
    if (mapTerrain) {
      mapTerrain.addPopupMarker("selected", marker);
      mapTerrain.moveTo(14, marker.location);
      mapSat.moveTo(14, marker.location)
    }
  }

  afterUpdate(async () => {
    renderIsland();
  });

  onMount(async () => {
    islandGroup = await oileain.getCoasts();
    markerLayers = generateMarkerLayers(islandGroup);
    if (params.wild) {
      island = await oileain.getIslandById(encodeURI(params.wild));
    }
  });

  let unsubscribe = location.subscribe(async (value) => {
    if (islandGroup) {
      const id = value.substring(value.lastIndexOf("/") + 1);
      island = await oileain.getIslandById(id);
      marker = generateMarkerSpec(island);
      mapIreland.moveTo(11, marker.location);
    }
  });

  onDestroy(unsubscribe);

  async function markerSelect(event) {
    island = await oileain.getIslandById(event.detail.marker.id);
    renderIsland();
    replace(`/poi/${island.safeName}`)
  }
</script>

{#if island}
  <div class="h-full md:h-5/6 p-2 bg-base-200 rounded-2xl border">
    <div class="flex flex-wrap justify-center h-full md:h-3/6">
      <LeafletCard>
        <LeafletMap id="main" bind:this={mapTerrain}/>
      </LeafletCard>
      <DescriptionCard>
        {@html island.description}
      </DescriptionCard>
    </div>
    <div class="flex flex-wrap justify-center h-full md:h-3/6">
      <LeafletCard>
        <LeafletMap id="sat1" activeLayer="Satellite" bind:this={mapSat}/>
      </LeafletCard>
      <LeafletCard>
        <LeafletMap id="sat2" zoom={12} {markerLayers} location={ island.coordinates.geo} bind:this={mapIreland}
                    on:message={markerSelect}/>
      </LeafletCard>
    </div>
  </div>
{/if}

