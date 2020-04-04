<script>
// imports
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
// component variables and props
  let newEventDetails = {}
// methods
  const submitNewEvent = (e) => {
    e.preventDefault();
    console.log(newEventDetails)
  }
</script>


<form on:submit={submitNewEvent}>
  <label for='event-title'>Event Title</label>
    <input bind:value={newEventDetails.title} class='event-title' type='text'>
  <label for='mileage'>Mileage</label>
    <input bind:value={newEventDetails.mileage} type='number'>
  <label for='date'>Date & Time</label>
    <input bind:value={newEventDetails.date} class='date' type='date'>
    <input bind:value={newEventDetails.time} type='time' >
  <label for='payment'>Payment</label>
    <input bind:value={newEventDetails.payment} class='payment' type='number' placeholder='$'>
  <label for='notes'>Notes</label>
    <input bind:value={newEventDetails.notes} type='text'>
  <button>Create New Event</button> 
</form>


<style>

</style>