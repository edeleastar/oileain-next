<script lang="ts">
  import type {Island} from "../services/oileain-types";
  export let island: Island;
</script>

<div class="card compact shadow-2xl bg-base-100 w-full md:w-5/12 m-2 h-96">
  <figure class="flex justify-center">
    <slot name="figure"></slot>
  </figure>
  <div class="card-body overflow-y-scroll prose">
    <slot name="description"></slot>
  </div>
</div>

