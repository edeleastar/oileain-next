<script lang="ts">
  import {getContext, onDestroy, onMount} from "svelte";
  import {location, replace} from "svelte-spa-router";
  import type {Oileain} from "../services/oileain-api";
  import type {Island, IslandGroup} from "../services/oileain-types";
  import {generateMarkerLayers, generateMarkerSpec} from "../services/oileain-types";
  import Card from "../components/Card.svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import IslandLatLng from "../components/IslandLatLng.svelte";
  import type {MarkerLayer} from "../components/markers";
  import type {MarkerSpec} from "../components/markers";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let island: Island;
  let islandGroup: IslandGroup[];
  let refresh = true;
  let markerLayers = Array<MarkerLayer>();

  let navigator: LeafletMap;
  let marker: MarkerSpec;
  onMount(async () => {
    islandGroup = await oileain.getCoasts();
    markerLayers = generateMarkerLayers(islandGroup);
    if (params.wild) {
      island = await oileain.getIslandById(encodeURI(params.wild));
      marker = generateMarkerSpec(island);
    }
  });

  let unsubscribe = location.subscribe((value) => {
    if (islandGroup) {
      const safeName = value.substring(value.lastIndexOf("/") + 1);
      oileain.getIslandById(safeName).then((foundIsland) => {
        island = foundIsland;
        marker = generateMarkerSpec(island);
        refresh = !refresh;

      });
    }
  });

  onDestroy(unsubscribe);

  function markerSelect(event) {
    oileain.getIslandById(event.detail.marker.id).then((islandSelected) => {
      island = islandSelected;
      marker = generateMarkerSpec(island);
      refresh = !refresh;
      replace(`/poi/${island.safeName}`);
    });
  }
</script>


{#if island}
  <div class=" mx-auto bg-base-200 text-base-content rounded-box mb-2 p-4">
    <div class="flex flex-wrap justify-center">
      {#key refresh}
        <Card {island}>
          <span slot="figure">
            <LeafletMap height={"h-96"} id="main"  zoom={15}  location={ island.coordinates.geo} {marker}/>
          </span>
        </Card>
        <Card {island}>
          <span slot="title">
             <IslandLatLng {island}/>
          </span>
          <span slot="description">
            {@html island.description}
          </span>
        </Card>
        <Card {island}>
          <span slot="figure">
            <LeafletMap height={"h-96"} id="sat1" activeLayer="Satellite" zoom={15}  location={ island.coordinates.geo}/>
          </span>
        </Card>
      {/key}
        <Card {island}>
          <span slot="figure">
           <LeafletMap id="sat2" height={"h-96"}  zoom={12} {markerLayers}  location={ island.coordinates.geo}  on:message={markerSelect}/>
          </span>
        </Card>
    </div>
  </div>
{/if}

