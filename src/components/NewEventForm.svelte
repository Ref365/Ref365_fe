<script>
// imports
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate } from "svelte-apollo";
// component variables and props
  let newEventDetails = {}
  let userId = 9;
// methods
  const submitNewEvent = (e) => {
    e.preventDefault();
    console.log(newEventDetails)
  }

  const client = getClient();
  const GETEVENTS = gql`
    {
      user(id: ${userId}) {
        events {
          date
        }
      }
    }
  `;
  // const eventQuery = query(client, {query: GETEVENTS});

  const ADDEVENT = gql`
    mutation {
      createEvent(input: {
        userId: ${userId},
        title: ${newEventDetails.title},
        body: ${newEventDetails.notes},
        date: ${newEventDetails.date},
        time: ${newEventDetails.time},
        mileage: ${newEventDetails.mileage},
        income: ${newEventDetails.payment}
      }) {
        event {
          id
          title
          body
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
      // variables: {
      //   todoEdit
      // }
    })
      .then(data => {
        // todoEdit = "";
        // todoOp.refetch();
        console.log(data)
      })
      .catch(e => {
        console.error("error: ", e);
      });
  }
</script>


<form on:submit|preventDefault={addEvent}>
  <label for='event-title'>Event Title</label>
    <input bind:value={newEventDetails.title} class='event-title' type='text'>
  <label for='mileage'>Mileage</label>
    <input bind:value={newEventDetails.mileage} type='number'>
  <label for='date'>Date & Time</label>
    <input bind:value={newEventDetails.date} class='date' type='date'>
    <input bind:value={newEventDetails.time} type='time' >
  <label for='payment'>Payment</label>
    <input bind:value={newEventDetails.payment} placeholder='$' class='payment' type='number' >
  <label for='notes'>Notes</label>
    <input class='notes-input' bind:value={newEventDetails.notes} type='text'>
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