<script lang="ts">
  import TailwindCSS from "./TailwindCSS.svelte";
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./pages/Home.svelte";
  import Navigator from "./pages/Navigator.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Island from "./pages/Island.svelte";
  import { Oileain } from "./services/oileain-api";

  setContext("oileain", new Oileain());

  let routes = {
    "/": Home,
    "/navigator": Navigator,
    "/poi/*": Island,
    "*": NotFound,
  };
</script>
<TailwindCSS />
<svelte:head>
  <title>Oileain</title>
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <Router {routes} />
</div>
<Sidebar />
