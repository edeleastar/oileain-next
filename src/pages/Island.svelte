<script lang="ts">
  import {getContext, onDestroy, onMount} from "svelte";
  import {location} from "svelte-spa-router";
  import type {Oileain} from "../services/oileain-api";
  import type {Island, IslandGroup} from "../services/oileain-types";
  import {generateMarkerSpec} from "../services/oileain-types";
  import IslandDescription from "../components/IslandDescription.svelte";
  import IslandCoordinates from "../components/IslandCoordinates.svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {MarkerSpec} from "../components/markers";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let island: Island;
  let marker: MarkerSpec;
  let islandGroup: IslandGroup[];
  let refresh = true;

  onMount(async () => {
    islandGroup = await oileain.getCoasts();
    island = await oileain.getIslandById(encodeURI(params.wild));
    marker = generateMarkerSpec(island);
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
</script>

{#if island}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-expand@m uk-animation-slide-left">
      {#key refresh}
        <LeafletMap id="map-main" {marker} zoom={7} height={560}/>
        <div class="uk-card uk-card-default uk-card-body">
          <IslandCoordinates {island}/>
        </div>
      {/key}
    </div>
    <div class="uk-width-1-3@m uk-animation-slide-right">
      <IslandDescription {island}/>
    </div>
  </div>
{/if}
