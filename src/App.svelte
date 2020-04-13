<script>
	import NavBar from './components/NavBar.svelte'
	import About from './components/About.svelte'
	import NewEventForm from './components/NewEventForm.svelte'
	import UpcomingEvents from './components/UpcomingEvents.svelte'
	import Dashboard from './components/Dashboard.svelte'
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

// standard fetch call

	// fetch('http://localhost:3000/graphql', {
	// 	method: 'POST',
	// 	// mode: 'no-cors',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify({ query: '{ users { email } }' }),
	// })
	// 	.then(res => {
	// 		console.log('response:', res)
	// 		return res.json()
	// 		})
	// 	.then(data => console.log('data:', data));

</script>

<Router url={url}>
	<main>
		<NavBar />
		<Route path='add-event' component={NewEventForm} />
		<Route path='dashboard' component={Dashboard} />

		<!-- <Route path='add-event' component={UpcomingEvents} /> -->
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

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>
