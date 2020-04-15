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
  let errors = {
    formValid: true,
    goodPost: true,
  }
  let messages = {
    successfulPost: false
  }
// methods
  const client = getClient();
   const GETEVENTS = gql`
      {
        user(id: ${userId}) {
          events {
            title
            dateTime
            date
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
        title = '';
        notes = ''
        date = null;
        time = null;
        mileage = null;
        payment = null;
        messages.successfulPost = true;
        eventQuery.refetch();
      })
      .catch(e => {
        console.error('error:', e);
        errors.goodPost = false;
      });
  }

  const validateForm = () => {
    if (title && notes && date && time && mileage && payment) {
      errors.formValid = true;
      addEvent()
    } else {
      errors.formValid = false;
    }
  }

</script>

<section>
  <form on:submit|preventDefault={validateForm}>
    <h2>Add New Event</h2>
    {#if !errors.formValid}
      <p>Please make sure all fields are filled out.</p>
    {/if}
     {#if !errors.goodPost}
      <p>We're sorry, there was an error creating your event. Please try again soon.</p>
    {/if}
    <label for='event-title'>Event Title</label>
      <input bind:value={title} class='event-title' type='text'>
    <label for='mileage'>Mileage</label>
      <input bind:value={mileage} type='number' min='0' oninput="validity.valid||(value='');" step='any' >
    <label for='date'>Date & Time</label>
      <input bind:value={date} class='date' type='date'>
      <input bind:value={time} type='time' >
    <label for='payment'>Payment</label>
      <input bind:value={payment} placeholder='$' min='0' oninput="validity.valid||(value='');" step='any' class='payment' type='number' >
    <label for='notes'>Notes</label>
      <textarea class='notes-input' bind:value={notes} type='text' rows="5" cols="33"></textarea>
    <button>Create New Event</button>
  </form>
  <div>
    {#if messages.successfulPost}
      <p class='happy-message'>Event created!</p>
    {/if}
    <UpcomingEvents eventQuery={eventQuery}/>
  </div>
</section>


<style>
  section {
    display: flex;
    height: 100vh;
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

  input,
  textarea {
    border: .1rem solid black;
    width: 60%;
    height: 3rem;
    margin-top: 5px;
  }
  div {
    width: 50%;
  }

  p {
    color: red;
    font-size: 2rem;
  }

  .happy-message {
    color: yellow;
    font-size: 2rem;
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
    border: none;
    border-radius: 5%;
    background-color: yellow;
    margin-top: 2rem;
    padding: 1rem;
    font-size: 1.65rem;
  }
</style>
