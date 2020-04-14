<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  let userId = 1;

  export let eventQuery;

  const client = getClient();

 let sortedEvents = [];
 let firstFive = [];

 const sortEvents = (events) => {
   sortedEvents = events.sort((a,b) => new Date(b.dateTime) - new Date(a.dateTime));
   if (sortedEvents.length > 6) {
     firstFive = sortedEvents.slice(0, 5)
   } else {
     firstFive = sortedEvents;
   }
 }

</script>

<section class='card-container'>
  <h2>Your Upcoming Events</h2>
   {#await $eventQuery}
    <p>.. loading</p>
  {:then data}

  <p class='hidden'>{sortEvents(data.data.user.events)}</p>

    {#each firstFive as event, i}
    <section class='event-card'>
      <p class='event-title'>{event.title}</p>
      <p>{event.dateTime}</p>
    </section>
    {/each}

  {:catch e}
    {e}
  {/await}
</section>

<style>
  .card-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   color: white;
   /* overflow: auto;
   height: 100vh; */
  }

  h2 {
    font-size: 2rem;
  }
  .event-card {
    border: 3px solid yellow;
    background-color: black;
    border-radius: 5%;
    width: 75%;
    margin: 1rem;
    color: white;
    font-size: 1.2rem;
  }
  .hidden {
    display: none;
  }

</style>
