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

<section>
  <p>this is the upcoming events section</p>
   {#await $eventQuery}
    <p>.. loading</p>
  {:then data}

    {#each data.data.user.events as event, i}
      <p>{event.title}</p>
      <p>{event.date}</p>
    {/each}

  {:catch e}
    {e}
  {/await}
</section>

<style>
  section {
   border: 3px solid green;
  }
</style>