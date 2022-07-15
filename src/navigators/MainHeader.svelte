<script lang="ts">
  import Icon from "../components/Icon.svelte";
  import {currentPoi} from "../services/stores";

  export const title = "Oileáin – by Leenane Kayak Club"
  export const subTitle = "<a target='_blank' href='https://github.com/edeleastar'> Eamonn de Leastar <a>";
</script>

<div class="header-container navbar">
  <a href="https://www.bookdepository.com/Oileain---the-Irish-Islands-Guide-David-Walsh/9781906095376?redirected=true&utm_medium=Google&utm_campaign=Base1&utm_source=IE&utm_content=Oileain---the-Irish-Islands-Guide&selectCurrency=EUR&w=AFFPAU96ZR10PUA8VTCJ&gclid=Cj0KCQjwpv2TBhDoARIsALBnVnln5gXm8nVuixUGhOMnZ_wixd4kDkp465rG6Vb4bOOcyGeHaQ2RkG4aAo0wEALw_wcB"
     target="_blank" data-tip="Oileáin – by David Walsh" class="tooltip tooltip-right capitalize"> <img src="/favicon.png" width="60px" alt="Oileáin – by David Walsh">
  </a>
  <div class="flex-1 hidden px-2 mx-2 lg:block">
    <span class="text-base font-thin"> {title}</span>
    <span class="text-sm underline font-thin"> {@html subTitle}</span>
    <div class="text-sm font-thin">
      {@html $currentPoi.title} [{$currentPoi.lat},{$currentPoi.lng}]
    </div>
  </div>
  <div class="iconbar">
    <Icon type="fontisto:compass-alt" width={50} height={50} toolTip="All Coasts" link="#/loc/53.2734,-7.7783203,8" button/>
    <Icon type="ic:outline-west" width={50} height={50} toolTip="West Coast" link="#/loc/53.61739782,-9.88818052,9" button/>
    <Icon type="ic:outline-north" width={50} height={50}  toolTip="North Coast" link="#/loc/55.31876009,-7.39748133,9" button/>
    <Icon type="ic:outline-east" width={50} height={50}  toolTip="East Coast" link="#/loc/53.31217207,-5.91522442,9" button/>
    <Icon type="ic:outline-south" width={50} height={50}  toolTip="South Coast" link="#/loc/51.82611493,-7.98476399,9" button/>
    <div class="hiddenlg:block">
      <Icon type="logos:github-octocat" width={50} height={50}  toolTip="Source" target="_blank" link="https://github.com/edeleastar/oileain-next" button/>
    </div>
  </div>
</div>
