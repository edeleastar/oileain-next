<script lang="ts">
  import TailwindCSS from "./TailwindCSS.svelte";
  import {setContext} from "svelte";
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./pages/Home.svelte";
  import Explorer from "./pages/Explorer.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import {Oileain} from "./services/oileain-api";

  setContext("oileain", new Oileain());

  let routes = {
    "/": Home,
    "/poi/*": Explorer,
    "*": NotFound,
  };
</script>
<TailwindCSS/>

<svelte:head>
  <title>Oileain</title>
</svelte:head>


<div class="relative">
  <div class="relative md:fixed  sm:w-full  md:w-10/12 min-h-screen p-2">
    <Header title="Oileain"/>
    <Router {routes}/>
  </div>
  <div class="hidden md:block w-full md:w-2/12 ml-auto">
    <Sidebar></Sidebar>
  </div>
</div>


