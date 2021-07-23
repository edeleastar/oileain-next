<script lang="ts">
  import {getContext, onMount} from "svelte";
  import type {Oileain} from "../services/oileain-api";
  import type {IslandGroup} from "../services/oileain-types";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<IslandGroup>;

  onMount(async () => {
    coasts = await oileain.getCoasts();
  });
</script>

{#if coasts}
  <div class="accordion flex flex-col items-center justify-center">
    {#each coasts as coast}
      <div class="w-full">
        <input type="checkbox" name="panel" id="{coast.title}" class="hidden">
        <label for="{coast.title}" class="relative block  bg-neutral text-neutral-content p-3 shadow border-b border-grey">
          {coast.title}
        </label>
        <div class="accordion__content overflow-hidden bg-grey-lighter px-4">
          <div class="mt-1"/>
          {#each coast.pois as island}
            <li><a href="/#/poi/{island.safeName}"> {island.name}</a></li>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  label:after {
    content: '+';
    position: absolute;
    right: 1em;
    color: #fff;
  }

  input:checked + label:after {
    content: '-';
    line-height: .8em;
  }

  .accordion__content {
    max-height: 0em;
    transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
  }

  input[name='panel']:checked ~ .accordion__content {
    /* Get this as close to what height you expect */
    max-height: 50em;
  }
</style>
