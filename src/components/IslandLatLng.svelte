<script lang="ts">
  import type { Island } from "../services/oileain-types";
  export let island: Island;
</script>

<div class="uk-card uk-card-default uk-card-body uk-padding-small">
  <caption>GPS-compatible</caption>
  <table class="uk-table uk-table-divider uk-table-small">
    <tbody>
      <tr>
        <td>Latitude</td>
        <td>{island.coordinates.geo.lat}</td>
      </tr>
      <tr>
        <td>Longitude</td>
        <td>{island.coordinates.geo.long}</td>
      </tr>
    </tbody>
  </table>
</div>
