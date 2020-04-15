<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  import { Router, Link, Route, link } from "svelte-routing";
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

 const convertToReadable = (date) => {
   let splitDate = date.split('')
   let formattedDate = splitDate.slice(0,10).join('')
  let longDate = new Date(formattedDate)
  return longDate.toString().split('').slice(0, 15).join('')
 } 

     const DELETEEVENT = gql`
    mutation(
      $eventId: ID!
    ){
      deleteEvent(input: {
      eventId: $eventId
    }) {
    status
  }}
  `;

  const deleteEvent = (eventId) => {
    const eventDelete = mutate(client, {
      mutation: DELETEEVENT,
      variables: {
        eventId
      }
    })
    .then(res => {
      eventQuery.refetch();
    })
    .catch(e => {
      console.log('error:', e)
    })
  }

</script>

<section class='card-container'>
  <h2>Your Upcoming Events</h2>
  <a href='/all-events' use:link class='view-all-btn'>View All Events</a>
   {#await $eventQuery}
    <p>.. loading</p>
  {:then data}

  <p class='hidden'>{sortEvents(data.data.user.events)}</p>

    {#each firstFive as event, i}
    <section class='event-card'>
      <p class='event-title'>{event.title}</p>
      <p>{convertToReadable(event.dateTime)}</p>
      <button on:click={deleteEvent(event.id)}>Delete Event</button>
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

  .view-all-btn {
    color: orange;
    padding: 5px;
    font-size: 2rem;
    text-decoration: none;
    /* border-left: 2px solid white;
    border-right: 2px solid white; */

  }
  .event-card {
    border: 3px solid yellow;
    background-color: black;
    border-radius: 5%;
    width: 75%;
    margin: 1rem;
    color: white;
    font-size: 1.2rem;
    padding-bottom: .5rem;
  }
  .hidden {
    display: none;
  }

  button {
    cursor: pointer;
    background-color: orange;
    border: none;
  }

</style>
