<script lang="ts">
  import {Code, Map} from "svelte-hero-icons"
  import Icon from "./Icon.svelte";

  export let title = "";
</script>

<div class="navbar shadow-lg bg-neutral text-neutral-content rounded-box mb-4 p-4 justify-center">
  <a href="http://www.oileain.org/" data-tip="Oileian Book Site" target="_blank" class="tooltip capitalize"> <img
      src="http://www.oileain.org/wp-content/uploads/2015/05/oileain_2X.png" width="70px"> </a>
  <div class="flex-1 hidden px-2 mx-2 lg:block">
    <p class="text-lg font-bold">Oileain</p>
    An experiment in exploring <a href="http://www.oileain.org/">David Walsh's Oileain</a>. Prepared by Eamonn de
    Leastar (edeleastar@gmail.com)
  </div>
  <div
      class="flex-wrap lg:flex-none shadow-lg bg-neutral text-neutral-content rounded-box horizontal ml-2 mt-2 lg:mt-0">
    <Icon type={Map} toolTip="Explore Island Maps" link="#/loc/53.2734,-7.7783203,8" button="true"/>
    <a href="#/loc/53.61739782,-9.88818052,11">  <button class="btn btn-circle btn-success btn-xs">W</button> </a>
    <a href="#/loc/55.31876009,-7.39748133,11">  <button class="btn btn-circle btn-info btn-xs">N</button> </a>
    <a href="#/loc/53.61739782,-9.88818052,10">  <button class="btn btn-circle btn-warning btn-xs">E</button> </a>
    <a href="#/loc/53.61739782,-9.88818052,10">  <button class="btn btn-circle btn-error btn-xs">W</button> </a>
    <Icon type={Code} toolTip="Application Source" target="_blank" link="https://github.com/edeleastar/oileain-vite"
          button="true"/>
  </div>
</div>

