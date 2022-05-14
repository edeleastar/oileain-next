<script lang="ts">
  import {Code, Map} from "svelte-hero-icons"
  import Icon from "./Icon.svelte";
  import {currentPoi} from "../services/stores";

  export const title = "";
</script>

<div class="navbar shadow-lg bg-neutral text-neutral-content rounded-box mb-4 p-4 justify-center">

  <a href="https://www.bookdepository.com/Oileain---the-Irish-Islands-Guide-David-Walsh/9781906095376?redirected=true&utm_medium=Google&utm_campaign=Base1&utm_source=IE&utm_content=Oileain---the-Irish-Islands-Guide&selectCurrency=EUR&w=AFFPAU96ZR10PUA8VTCJ&gclid=Cj0KCQjwpv2TBhDoARIsALBnVnln5gXm8nVuixUGhOMnZ_wixd4kDkp465rG6Vb4bOOcyGeHaQ2RkG4aAo0wEALw_wcB"
     target="_blank" data-tip="Oileáin – by David Walsh" class="tooltip tooltip-right capitalize"> <img
      src="/favicon.png" width="60px" alt="Oileáin – by David Walsh"> </a>
  <div class="flex-1 hidden px-2 mx-2 lg:block">
    <p class="text-base font-thin">Oileáin – The guide to the Irish islands by David Walsh, site by Eamonn de
      Leastar</p>
    {#if $currentPoi !== null}
      <div class="text-sm font-thin">
        {@html $currentPoi.title} [{$currentPoi.lat},{$currentPoi.lng}]
      </div>
    {/if}
  </div>
  <div
      class="flex-wrap lg:flex-none shadow-lg bg-neutral text-neutral-content rounded-box horizontal ml-2 mt-2 lg:mt-0">
    <Icon type={Map} toolTip="Explore Island Maps" link="#/loc/53.2734,-7.7783203,8" button="true"/>
    <a href="#/loc/53.61739782,-9.88818052,11">
      <button class="btn btn-circle btn-success btn-xs">W</button>
    </a> <a href="#/loc/55.31876009,-7.39748133,11">
    <button class="btn btn-circle btn-info btn-xs">N</button>
  </a> <a href="#/loc/53.61739782,-9.88818052,10">
    <button class="btn btn-circle btn-warning btn-xs">E</button>
  </a> <a href="#/loc/53.61739782,-9.88818052,10">
    <button class="btn btn-circle btn-error btn-xs">W</button>
  </a>
    <Icon type={Code} toolTip="Application Source" target="_blank" link="https://github.com/edeleastar/oileain-vite"
          button="true"/>
  </div>
</div>

