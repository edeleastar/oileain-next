<script lang="ts">
  import {createEventDispatcher, onMount} from "svelte";
  import type {Control, LatLng, Layer, LayerGroup, Map, Marker} from "leaflet";
  import L from "leaflet";
  import type {MarkerLayer, MarkerSpec} from "./markers";
  import type {Geodetic} from "../services/oileain-types";

  const dispatch = createEventDispatcher();

  export let id = "home-map-id";
  export let height = 800;
  export let location: Geodetic = {lat: 53.2734, long: -7.7783203};
  export let zoom = 0;
  export let minZoom = 0;
  export let activeLayer = "Terrain";
  export let markerLayers: MarkerLayer[];
  export let marker: MarkerSpec;

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
    let defaultLayer = baseLayers[activeLayer];
    imap = L.map(id, {
      center: [location.lat, location.long],
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
    if (zoom != 0 && marker) {
      moveTo(zoom, marker.location);
    }
  });

  export function addPopupMarkerAndZoom(layer: string, marker: MarkerSpec) {
    if (imap) {
      addPopup(layer, marker.title, marker.location);
      //moveTo(15, marker.location);
      invalidateSize();
    }
  }

  export function populateLayer(markerLayer: MarkerLayer) {
    let group = L.layerGroup([]);
    markerLayer.markerSpecs.forEach((markerSpec) => {
      let marker = L.marker([markerSpec.location.lat, markerSpec.location.lng],  {icon: greenIcon, markerSpec:markerSpec});
      marker.bindTooltip(markerSpec.title);
      marker.addTo(group);
      marker.addTo(group).on("click", (event: any) => {
        dispatch("message", {
          marker: event.sourceTarget.options.markerSpec,
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
    imap.flyTo(location);
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

<div class="card bordered">
  <div {id} class="h-80"/>
</div>
