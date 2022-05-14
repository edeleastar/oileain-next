<script lang="ts">
  import "./tailwind.css";
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
    "/loc/*": Home,
    "*": NotFound,
  };
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>


<div class="relative md:fixed sm:w-full md:w-10/12 p-2 h-screen">
  <Header title="Oileain"/>
  <Router {routes}/>
</div>
<div class="hidden md:block w-full md:w-2/12 ml-auto">
  <Sidebar></Sidebar>
</div>


