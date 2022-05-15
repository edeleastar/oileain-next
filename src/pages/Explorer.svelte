<script lang="ts">
  import {getContext, onDestroy} from "svelte";
  import {location, push} from "svelte-spa-router";
  import type {Oileain} from "../services/oileain-api";
  import type {Island} from "../services/oileain-types";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type {MapSpec} from "../services/markers";
  import LeafletCard from "../components/LeafletCard.svelte";
  import DescriptionCard from "../components/DescriptionCard.svelte";
  import LatLng from "../components/LatLng.svelte";
  import {currentPoi} from "../services/stores";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  let island: Island;

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

  let lat = 0.0;
  let lng = 0.0;
  let mapContextSpec: MapSpec = {
    zoom: 12,
    markerDrag(event): void {
      lat = event.latlng.lat.toFixed(8)
      lng = event.latlng.lng.toFixed(8)
    },
    markerClick(marker): void {
      oileain.getIslandById(marker.id).then((islandSelected) => {
        island = islandSelected;
        push(`/poi/${island.safeName}`);
        renderIsland();
      });
    },
  }

  async function getIsland() {
    await oileain.getCoasts();
    island = await oileain.getIslandById(encodeURI(params.wild))
    currentPoi.set({title: island.nameHtml, lat: island.coordinates.geo.lat, lng: island.coordinates.geo.long});
    mapTerrainSpec.marker = island.markerSpec;
    mapSatSpec.location = island.markerSpec.location;
    mapContextSpec.location = island.markerSpec.location;
    mapContextSpec.markerLayers = oileain.markerLayers;
    lat = island.markerSpec.location.lat;
    lng = island.markerSpec.location.lng;
    return mapTerrainSpec;
  }

  function renderIsland() {
    currentPoi.set({title: island.nameHtml, lat: island.coordinates.geo.lat, lng: island.coordinates.geo.long});
    mapTerrain.moveTo(island.markerSpec.location, 14);
    mapSat.moveTo(island.markerSpec.location, 14,);
    mapTerrain.addPopupMarker("selected", island.markerSpec);
    //mapContext.moveTo(11, island.markerSpec.location);
    lat = island.markerSpec.location.lat;
    lng = island.markerSpec.location.lng;
  }

  let unsubscribe = location.subscribe(async (value) => {
    if (island) {
      const id = value.substring(value.lastIndexOf("/") + 1);
      if (id) {
        island = await oileain.getIslandById(id);
        renderIsland();
        mapContext.moveTo(island.markerSpec.location)
      }
    }
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
        <LeafletMap id="context" mapSpec={mapContextSpec} bind:this={mapContext}/>
      </LeafletCard>
    </div>
    <div class="m-6">
      <LatLng {lat} {lng}/>
    </div>
  </div>
{/await}
