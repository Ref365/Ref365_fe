<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  let userId = 1;

  export let eventQuery;

  const client = getClient();

 let sortedEvents = [];

 const sortEvents = (events) => {
   sortedEvents = events.sort((a,b) => new Date(a.date) - new Date(b.date))
   console.log(sortedEvents)
 }

</script>

<section class='card-container'>
  <h2>Your Upcoming Events</h2>
   {#await $eventQuery}
    <p>.. loading</p>
  {:then data}

  {
    sortEvents(data.data.user.events)
  }


    {#each sortedEvents as event, i}
    <section class='event-card'>
      <p class='event-title'>{event.title}</p>
      <p>{event.date}</p>
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

</style>
