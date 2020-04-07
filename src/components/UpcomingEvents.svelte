<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  let userId = 2;

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

</script>

<section class='card-container'>
  <h2>this is the (unstyled) upcoming events section</h2>
   {#await $eventQuery}
    <p>.. loading</p>
  {:then data}

    {#each data.data.user.events as event, i}
    <section class='event-card'>
      <p>{event.title}</p>
      <p>{event.date}</p>
    </section>
    {/each}

  {:catch e}
    {e}
  {/await}
</section>

<style>
  .card-container {
   border: 3px solid green;
   padding: 2rem;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-content: center;
  }
  .event-card {
    border: 3px solid yellow;
    width: 75%;
    margin: 1rem;
  }

</style>