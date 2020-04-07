<script>
// imports
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
// component variables and props
  let title;
  let notes;
  let date;
  let time;
  let mileage;
  let payment;
  let userId = 2;
// methods
  const client = getClient();

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
      })
      .catch(e => {
        console.error("error: ", e);
      });
  }
</script>

<form on:submit|preventDefault={addEvent}>
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


<style>
  form {
    padding: 1rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  input {
    border: .1rem solid black;
    width: 60%;
    height: 3rem;
  }

  .notes-input {
    height: 6rem;
  }
  
  label {
    width: 60%;
    font-size: 1.5rem;
  }

  button {
    width: 60%;
    cursor: pointer;
    border-radius: 5%;
    background-color: lightcoral
  }
</style>