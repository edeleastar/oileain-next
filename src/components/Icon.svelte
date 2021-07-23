<script lang="ts">
  import Icon from "svelte-hero-icons";

  export let type;
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let button = "";
  export let colour = "";
</script>


<div data-tip="{toolTip}" class="tooltip capitalize">
  {#if link}
    {#if button}
      <button tabindex="0" class="btn btn-square btn-ghost">
        <a target="{target}" href="{link}">
          <Icon src={type} class="w-5 h-5 text-{colour}"/>
        </a>
      </button>
    {:else}
      <a target="{target}" href="{link}">
        <Icon src={type} class="w-5 h-5 text-{colour}"/>
      </a>
    {/if}
  {:else}
    {#if button}
      <button tabindex="0" class="btn btn-square btn-ghost">
        <Icon src={type} class="w-5 h-5 text-{colour}"/>
      </button>
    {:else}
      <Icon src={type} class="w-5 h-5 text-{colour}"/>
    {/if}
  {/if}
</div>

