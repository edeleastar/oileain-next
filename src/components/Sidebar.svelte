<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Oileain } from "../services/oileain-api";
  import type { IslandGroup } from "../services/oileain-types";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<IslandGroup>;

  onMount(async () => {
    coasts = await oileain.getCoasts();
  });
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
{#if coasts}
  <div id="coasts-menu" uk-offcanvas="mode: reveal;">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close />
      {#each coasts as coast}
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
          <li class="uk-parent">
            <a href="#">{coast.title}</a>
            <ul class="uk-nav-sub">
              {#each coast.pois as island}
                <li><a href="/#/poi/{island.safeName}"> {island.name}</a></li>
              {/each}
            </ul>
          </li>
        </ul>
      {/each}
    </div>
  </div>
{/if}
