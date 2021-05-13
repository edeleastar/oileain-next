<script lang="ts">
  import type { Island } from "../services/oileain-types";
  export let island: Island;
</script>

<div class="ui segment">
  <div class="description">
    {@html island.description}
  </div>
</div>
