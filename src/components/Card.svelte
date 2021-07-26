<script lang="ts">
  import type {Island} from "../services/oileain-types";
  export let island: Island;
</script>

<div class="card compact shadow-2xl bg-base-100 w-full md:w-5/12 m-2 h-96">
  <div class="flex flex-row text-center p-1">
    <h3 class="card-title text-centre font-normal">
      <slot name="title"></slot>
    </h3>
  </div>
  <figure class="flex justify-center">
    <slot name="figure"></slot>
  </figure>
  <div class="card-body overflow-y-scroll">
    <slot name="description"></slot>
  </div>
</div>

