<script lang="ts">
  import type {Island} from "../services/oileain-types";

  export let island: Island;
</script>

<div class="card compact bordered">
  <table class="table-compact w-full">
    <tbody>
      <td>Latitude</td>
      <td>{island.coordinates.geo.lat}</td>
      <td>Longitude</td>
      <td>{island.coordinates.geo.long}</td>
    </tbody>
  </table>
</div>
