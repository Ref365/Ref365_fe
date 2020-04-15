<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  let userId = 1;

  const client = getClient();
  const GETEVENTS = gql`
      {
        user(id: ${userId}) {
          events {
            title
            dateTime
            date
            id
            notes
            income
            mileage
          }
        }
      }
    `;
 const eventQuery = query(client, {query: GETEVENTS});

  let sortedEvents = [];
  const sortEvents = (events) => {
   sortedEvents = events.sort((a,b) => new Date(b.dateTime) - new Date(a.dateTime));
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

   const displayEventDetails = event => {
    let selectedCard = document.querySelector(`#event-${event.id}`)
    selectedCard.classList.toggle('hidden');
  }
</script>


<section>
  <h1>All Events</h1>
  {#await $eventQuery}
    <p>...loading</p>
  {:then data}
  <p class='hidden'>{sortEvents(data.data.user.events)}</p>
  <section class='card-section'>
  {#each sortedEvents as event, i}
    <section class='event-card'>
      <button class='show-details-btn' on:click={displayEventDetails(event)}>Show Event Details</button>
      <p class='event-title'>{event.title}</p>
      <p>{convertToReadable(event.dateTime)}</p>
      <div class='expanded-details hidden' id={`event-${event.id}`}>
        <p>Notes: {event.notes}</p>
        <p>${event.income}</p>
        <p>{event.mileage} miles</p>
      </div>
      <button on:click={deleteEvent(event.id)}>Delete Event</button>
    </section>
    {/each}
  </section>
  {/await}
</section>


<style>
  .card-section {
    margin-top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   color: white;
   height: 100vh;

  }

  h1 {
    color: white;
    font-size: 3rem;
  }
  .hidden {
    display: none;
  }

  .show-details-btn {
    background-color: grey;
    color: white;
    font-size: 1rem;
    margin-left: 60%;
    margin-top: 2%;
    cursor: pointer;
    /* width: 20%; */
  }
  .event-card {
    display: flex;
    flex-direction: column;
    border: 3px solid yellow;
    background-color: black;
    border-radius: 5%;
    /* height: 20%; */
    margin: 1rem;
    color: white;
    font-size: 1.2rem;
    padding: 1.5rem;
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