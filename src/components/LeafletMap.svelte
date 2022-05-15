<script lang="ts">
  import {createEventDispatcher, onMount} from "svelte";
  import type {Control, LatLng, Layer, LayerGroup, Map} from "leaflet";
  import L from "leaflet";
  import type {MapSpec, MarkerLayer, MarkerSpec} from "./markers";

  const dispatch = createEventDispatcher();

  export let id = "home-map-id";

  export let mapSpec: MapSpec;

  let imap: Map;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};

  var greenIcon = L.icon({
    // iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
    iconUrl: '/images/marker-icon-2x.png',
    iconSize: [25, 40],
    iconAnchor: [15.5, 40], // point of the icon which will correspond to marker's location
  });

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
    mapSpec.activeLayer = mapSpec.activeLayer != null ? mapSpec.activeLayer : "Terrain";
    let defaultLayer = baseLayers[mapSpec.activeLayer];
    imap = L.map(id, {
      center: mapSpec.location != null ? L.latLng(mapSpec.location.lat, mapSpec.location.lng) : L.latLng(53.2734, -7.7783203),
      zoom: mapSpec.zoom != null ? mapSpec.zoom : 8,
      minZoom: mapSpec.minZoom != null ? mapSpec.minZoom : 7,
      layers: [defaultLayer],
    });
    addControl();
    if (mapSpec.marker) {
      addPopupMarker("default", mapSpec.marker);
    }
    if (mapSpec.markerLayers) {
      populateMarkers(mapSpec.markerLayers)
    }
    if (mapSpec.zoom != 0 && mapSpec.marker) {
      moveTo(mapSpec.marker.location, mapSpec.zoom);
    }
    setTimeout(function () {
      imap.invalidateSize()
    }, 1000);
  });

  export function populateMarkers(markerLayers: MarkerLayer[]) {
    markerLayers.forEach((markerLayer) => {
      populateLayer(markerLayer);
    });
  }

  export function addPopupMarker(layer: string, marker: MarkerSpec) {
    if (imap) {
      addPopup(layer, marker.title, marker.location);
      invalidateSize();
    }
  }

  export function populateLayer(markerLayer: MarkerLayer) {
    let group = L.layerGroup([]);
    markerLayer.markerSpecs.forEach((markerSpec) => {
      let marker = L.marker([markerSpec.location.lat, markerSpec.location.lng], {
        icon: greenIcon,
        markerSpec: markerSpec,
        draggable: mapSpec.markerDrag ? true : false
      });
      if (mapSpec.markerDrag) {
        marker.on('drag', function (e) {
          mapSpec.markerDrag(e);
        });
      }
      if (mapSpec.markerClick) {
        marker.addTo(group).on("click", (event: any) => {
          mapSpec.markerClick(event.sourceTarget.options.markerSpec);
        });
      }
      marker.bindTooltip(markerSpec.title);
      marker.addTo(group);
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

  export function moveTo(location: LatLng, zoom: number = 0, ) {
    if (zoom == 0) {
      imap.flyTo(location);
    } else {
      imap.flyTo(location, zoom);
    }
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
        .setLatLng({lat: location.lat, lng: location.lng})
        .setContent(content);
    popup.addTo(popupGroup);
  }
</script>

<div {id} class="h-full"/>



