<script>
  import { Router, Link, Route } from "svelte-routing";
  import { getClient, query, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  const GETUSERS = gql`
    { users { email } }
  `;

  const client = getClient();
  const userOp = query(client, {query: GETUSERS});
  
</script>

<style>
</style>

<nav>
  <Link to='about'>About</Link>
   {#await $userOp}
    <p>.. loading</p>
  {:then data}

    {#each data.data['users'] as user, i}
      <p>{user.email}</p>
    {/each}

  {:catch e}
    {e}
  {/await}
</nav>