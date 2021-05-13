<script lang="ts">
  import type { Island } from "../services/oileain-types";
  export let island: Island;
</script>

<div class="uk-text-center uk-text-small" uk-grid>
  <div class="uk-width-expand@m">
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
  </div>
  <div class="uk-width-1-2@m">
    <div class="uk-card uk-card-default uk-card-body uk-padding-small">
      <caption>Transverse Mercator</caption>
      <table class="uk-table uk-table-divider uk-table-small">
        <tbody>
          <tr>
            <td>Eastings</td>
            <td>{island.coordinates.tmcGrid.eastings}</td>
          </tr>
          <tr>
            <td>Northings</td>
            <td>{island.coordinates.fullIrishGrid.northings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="uk-text-center uk-text-small" uk-grid>
  <div class="uk-width-expand@m">
    <div class="uk-card uk-card-default uk-card-body uk-padding-small">
      <caption>Full Irish Grid</caption>
      <table class="uk-table uk-table-divider uk-table-small">
        <tbody>
          <tr>
            <td>Eastings</td>
            <td>{island.coordinates.fullIrishGrid.eastings}</td>
          </tr>
          <tr>
            <td>Northings</td>
            <td>{island.coordinates.fullIrishGrid.northings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="uk-width-1-2@m">
    <div class="uk-card uk-card-default uk-card-body uk-padding-small">
      <caption>Irish Grid</caption>
      <table class="uk-table uk-table-divider uk-table-small">
        <tbody>
          <tr>
            <td>Sheet</td>
            <td>{island.coordinates.irishGrid.sheet}</td>
          </tr>
          <tr>
            <td>Eastings</td>
            <td>{island.coordinates.irishGrid.eastings}</td>
          </tr>
          <tr>
            <td>Norhtings</td>
            <td>{island.coordinates.irishGrid.northings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
