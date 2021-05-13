<script lang="ts">
  import { onMount } from "svelte";
  import type { Map, Control, Layer, Marker, LayerGroup, LatLng } from "leaflet";
  import { createEventDispatcher } from "svelte";
  import type { MarkerLayer, MarkerSpec } from "./markers";
  import L from "leaflet";

  const dispatch = createEventDispatcher();

  export let id = "home-map-id";
  export let height = 800;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";
  export let markerLayers: MarkerLayer[];
  export let marker: MarkerSpec;

  let imap: Map;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let markerMap = new Map<Marker, MarkerSpec>();

  let baseLayers = {
    Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }),
    Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }),
  };

  onMount(async () => {
    let defaultLayer = baseLayers[activeLayer];
    imap = L.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer],
    });
    addControl();
    if (marker) {
      addPopupMarkerAndZoom("default", marker);
    }
    if (markerLayers) {
      markerLayers.forEach((markerLayer) => {
        populateLayer(markerLayer);
      });
    }
  });

  export function addPopupMarkerAndZoom(layer: string, marker: MarkerSpec) {
    if (imap) {
      addPopup(layer, marker.title, marker.location);
      moveTo(15, marker.location);
      invalidateSize();
    }
  }

  export function populateLayer(markerLayer: MarkerLayer) {
    let group = L.layerGroup([]);
    markerLayer.markerSpecs.forEach((markerSpec) => {
      let marker = L.marker([markerSpec.location.lat, markerSpec.location.lng]);
      var newpopup = L.popup({ autoClose: false, closeOnClick: false });
      const popupTitle = `<a href='/#/poi/${markerSpec.id}'>${markerSpec.title} <small>(click for details}</small></a>`;
      newpopup.setContent(popupTitle);
      marker.bindPopup(newpopup);
      marker.bindTooltip(markerSpec.title);
      marker.addTo(group);
      markerMap.set(marker, markerSpec);
      marker.addTo(group).on("popupopen", (event:any) => {
        const marker = event.popup._source;
        const markerSpec = markerMap.get(marker);
        dispatch("message", {
          marker: markerSpec,
        });
      });
    });
    addLayer(markerLayer.title, group);
    control.addOverlay(group, markerLayer.title);
  }

  function addControl() {
    control = L.control.layers(baseLayers, overlays).addTo(imap);
  }

  function addLayer(title: string, layer: Layer) {
    overlays[title] = layer;
    imap.addLayer(layer);
  }

  function invalidateSize() {
    imap.invalidateSize();
    let hiddenMethodMap = imap as any;
    hiddenMethodMap._onResize();
  }

  function moveTo(zoom: number, location: LatLng) {
    imap.setZoom(zoom);
    imap.panTo(location);
  }

  function addPopup(layerTitle: string, content: string, location: LatLng) {
    let popupGroup: LayerGroup;
    if (!overlays[layerTitle]) {
      popupGroup = L.layerGroup([]);
      overlays[layerTitle] = popupGroup;
      imap.addLayer(popupGroup);
    } else {
      popupGroup = overlays[layerTitle] as LayerGroup;
    }
    const popup = L.popup({
      closeOnClick: false,
      closeButton: false,
    })
      .setLatLng({ lat: location.lat, lng: location.lng })
      .setContent(content);
    popup.addTo(popupGroup);
  }
</script>

<div {id} style="height:{height}px" />
