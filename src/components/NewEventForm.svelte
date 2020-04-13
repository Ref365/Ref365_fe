<script>
// imports
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  import UpcomingEvents from './UpcomingEvents.svelte'
// component variables and props
  let title;
  let notes;
  let date;
  let time;
  let mileage;
  let payment;
  let userId = 1;
// methods
  const client = getClient();
   const GETEVENTS = gql`
      {
        user(id: ${userId}) {
          events {
            date
            title
            time
          }
        }
      }
    `;
 const eventQuery = query(client, {query: GETEVENTS});

  const ADDEVENT = gql`
    mutation($title: String!,
             $userId: ID!,
             $notes: String!,
             $date: String!,
             $time: String!,
             $payment: Float!
             $mileage: Float!,
              ){
      createEvent(input: {
        userId: $userId,
        title: $title,
        notes: $notes,
        date: $date,
        time: $time,
        mileage: $mileage,
        income: $payment
      }) {
        event {
           id
           title
           notes
           date
           time
           mileage
           income
        }
        errors
      }
}
  `;

  const addEvent = () => {
   const eventAdd = mutate(client, {
      mutation: ADDEVENT,
      variables: {
        userId,
        title,
        notes,
        date,
        time,
        mileage,
        payment
      }
    })
      .then(data => {
        console.log(data)
        eventQuery.refetch();
      })
      .catch(e => {
        console.error("error: ", e);
      });
  }
</script>

<section>
  <form on:submit|preventDefault={addEvent}>
    <h2>Add New Event</h2>
    <label for='event-title'>Event Title</label>
      <input bind:value={title} class='event-title' type='text'>
    <label for='mileage'>Mileage</label>
      <input bind:value={mileage} type='number'>
    <label for='date'>Date & Time</label>
      <input bind:value={date} class='date' type='date'>
      <input bind:value={time} type='time' >
    <label for='payment'>Payment</label>
      <input bind:value={payment} placeholder='$' class='payment' type='number' >
    <label for='notes'>Notes</label>
      <input class='notes-input' bind:value={notes} type='text'>
    <button>Create New Event</button>
  </form>
  <div>
    <UpcomingEvents eventQuery={eventQuery}/>
  </div>
</section>


<style>
  section {
    display: flex;

  }
  h2 {
    font-size: 2rem;
    color: white;
  }
  form {
    border-right: 3px solid black;
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  input {
    border: .1rem solid black;
    width: 60%;
    height: 3rem;
  }
  div {
    width: 50%;
  }

  .notes-input {
    height: 6rem;
  }

  label {
    width: 60%;
    font-size: 1.5rem;
    color: white;

  }

  button {
    width: 60%;
    cursor: pointer;
    border-radius: 5%;
    background-color: yellow;
    margin-top: 2rem;
    padding: 1rem;
    font-size: 1.65rem;
  }
</style>
