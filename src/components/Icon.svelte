<script lang="ts">
  import Icon from "@iconify/svelte";

  export let type = "default";
  export let colour = ""
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let button = false;
  export let tipPos = "tooltip-bottom";
  export let width = 20;
  export let height = 20;

  let tip = "";
  let buttonAttr = "";
  if (toolTip) {
    tip = `tooltip ${tipPos} capitalize`;
  }
  if (button) {
    buttonAttr = "navbar-icon";
  }
</script>

<div data-tip="{toolTip}" class="{tip} z-50">
  <div class="{buttonAttr}">
    {#if link}
      <a target="{target}" href="{link}">
        <Icon icon={type} class="text-{colour}" width="{width}" height="{height}" />
      </a>
    {:else}
      <Icon icon={type} class="text-{colour}" width="{width}" height="{height}" />
    {/if}
  </div>
</div>
