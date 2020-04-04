<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  let title;
  let mileage;
  let date;
  let time;
  let notes;
  let payment;
  
  const submitNewEvent = (e) => {
    e.preventDefault();
    console.log(title, mileage, date, time, notes, payment)
  }
</script>


<form on:submit={submitNewEvent}>
  <label for='event-title'>Event Title</label>
  <input bind:value={title} class='event-title' type='text'>
  <label for='date'>Date & Time</label>
  <input bind:value={date} class='date' type='date'>
  <input bind:value={time} type='time' >
  <label for='mileage'>Mileage</label>
  <input bind:value={mileage} type='number'>
  <label for='payment'>Payment</label>
  <input bind:value={payment} class='payment' type='number' placeholder='$'>
  <label for='notes'>Notes</label>
  <input bind:value={notes} type='text'>
  <button>Create New Event</button>
</form>


<style>

</style>