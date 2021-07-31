<script lang="ts">
  import {getContext, onDestroy} from "svelte";
  import {location, replace} from "svelte-spa-router";
  import type {Oileain} from "../services/oileain-api";
  import type {Island} from "../services/oileain-types";
  import {generateMarkerLayers, generateMarkerSpec} from "../services/oileain-types";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {MapSpec, MarkerSpec} from "../components/markers";
  import LeafletCard from "../components/LeafletCard.svelte";
  import DescriptionCard from "../components/DescriptionCard.svelte";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let island: Island;
  let marker: MarkerSpec;

  let mapTerrain: LeafletMap;
  let mapTerrainSpec: MapSpec = {
    zoom: 14
  };
  let mapSat: LeafletMap;
  let mapSatSpec: MapSpec = {
    activeLayer: "Satellite",
    zoom: 14
  }
  let mapContext: LeafletMap;
  let mapContextSpec: MapSpec = {
    zoom: 12
  }

  async function getIsland() {
    let coasts = await oileain.getCoasts();
    island = await oileain.getIslandById(encodeURI(params.wild))
    marker = generateMarkerSpec(island);
    mapTerrainSpec.marker = marker;
    mapSatSpec.location = marker.location;
    mapContextSpec.location = marker.location;
    mapContextSpec.markerLayers = generateMarkerLayers(coasts)
    return mapTerrainSpec;
  }

  function renderIsland() {
    let marker = generateMarkerSpec(island)

    mapTerrain.moveTo(14, marker.location);
    mapSat.moveTo(14, marker.location);
    mapTerrain.addPopupMarker("selected", marker);
    mapContext.moveTo(11, marker.location);
  }

  function markerSelect(event) {
    oileain.getIslandById(event.detail.marker.id).then((islandSelected) => {
      island = islandSelected;
      replace(`/poi/${island.safeName}`);
      renderIsland();
    });
  }

  let unsubscribe = location.subscribe(async (value) => {
    const id = value.substring(value.lastIndexOf("/") + 1);
    island = await oileain.getIslandById(id);
    renderIsland();
  });

  onDestroy(unsubscribe);

</script>
{#await getIsland() then mapSpec}
  <div class="h-full md:h-5/6 p-2 bg-base-200 rounded-2xl border">
    <div class="flex flex-wrap justify-center p-2 h-full md:h-3/6">
      <LeafletCard>
        <LeafletMap id="terrain " {mapSpec} bind:this={mapTerrain}/>
      </LeafletCard>
      <DescriptionCard>
        {@html island.description}
      </DescriptionCard>
    </div>
    <div class="hidden md:flex flex-wrap justify-center p-2 h-full md:h-3/6">
      <LeafletCard>
        <LeafletMap id="sat" mapSpec={mapSatSpec} bind:this={mapSat}/>
      </LeafletCard>
      <LeafletCard>
        <LeafletMap id="context" mapSpec={mapContextSpec} on:message={markerSelect} bind:this={mapContext}/>
      </LeafletCard>
    </div>
  </div>
{/await}
