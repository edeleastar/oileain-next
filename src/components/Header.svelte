<script lang="ts">
  import {Code, Map, MenuAlt2} from "svelte-hero-icons"
  import Icon from "./Icon.svelte";
  import Toc from "./Toc.svelte";

  export let title = "";
</script>

  <div class="navbar shadow-lg bg-neutral text-neutral-content rounded-box mb-4 p-4 justify-center">
   <Toc />
    <div class="flex-1 hidden px-2 mx-2 lg:block">
      <p class="text-lg font-bold">Oileain</p>
      An experiment in exploring <a href="http://www.oileain.org/">David Walsh's Oileain</a>. Prepared by Eamonn de
      Leastar (edeleastar@gmail.com)
    </div>
    <div class="flex-wrap lg:flex-none shadow-lg bg-neutral text-neutral-content rounded-box horizontal ml-2 mt-2 lg:mt-0">
      <Icon type={Map} toolTip="Explore Island Maps" link="/#/" button="true"/>
      <Icon type={Code} toolTip="Application Source" link="https://github.com/edeleastar/oileain-vite" button="true"/>
      <a href="http://www.oileain.org/" data-tip="Oileian Book Site" class="tooltip capitalize"> <img
          data-src="http://www.oileain.org/wp-content/uploads/2015/05/oileain_2X.png" width="70px" height="" alt=""
          uk-img/> </a>
    </div>
  </div>

