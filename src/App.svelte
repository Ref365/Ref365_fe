<script>
	import NavBar from './components/NavBar.svelte'
	import NewEventForm from './components/NewEventForm.svelte'
	import UpcomingEvents from './components/UpcomingEvents.svelte'
	import Dashboard from './components/Dashboard.svelte'
	import HomeScreen from './components/HomeScreen.svelte'
	// export let name;
	import { Router, Link, Route } from "svelte-routing";
	export let url = '';
	import ApolloClient from "apollo-boost";
	import { setClient } from "svelte-apollo";

	// apollo set up

	const client = new ApolloClient({
		uri: "https://ref365-be.herokuapp.com/graphql",
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
	});

  setClient(client);

</script>

<Router url={url}>
	<main>
		<NavBar />
		<Route path='/' component={HomeScreen} />
		<Route path='add-event' component={NewEventForm} />
		<Route path='dashboard' component={Dashboard} />
	</main>
</Router>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
  * {
		font-family: 'Do Hyeon', sans-serif;
		background-color: black;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>
