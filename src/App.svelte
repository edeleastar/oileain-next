<script lang="ts">
  import TailwindCSS from "./TailwindCSS.svelte";
  import {setContext} from "svelte";
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./pages/Home.svelte";
  import Navigator from "./pages/Navigator.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Island from "./pages/Island.svelte";
  import {Oileain} from "./services/oileain-api";

  setContext("oileain", new Oileain());

  let routes = {
    "/": Home,
    "/navigator": Navigator,
    "/poi/*": Island,
    "*": NotFound,
  };
</script>
<TailwindCSS/>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<div class="container mx-auto pt-6 antialiased bg-base-100 min-h-screen">
  <Header title="Oileain"/>
  <div class="rounded-lg shadow bg-base-200 drawer h-52 h-full">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content h-full">
      <Router {routes}/>
    </div>
    <div class="drawer-side w-full">
      <label for="my-drawer" class="drawer-overlay"></label>
      <div class="p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</div>
