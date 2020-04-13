<script>
  import { Router, Link, Route, link } from "svelte-routing";
  import { getClient, query, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  const GETUSERS = gql`
    { users { email } }
  `;

  const client = getClient();
  const userOp = query(client, {query: GETUSERS});

</script>


<nav>
  <a href='/' use:link class='home-btn'>REF365</a>
  <a href='add-event' use:link class='new-event-btn' >Add New Event</a>
</nav>

<style>
  nav {
    border: 2px solid yellow;
    background-color: black;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  
  a {
    color: white;
    text-decoration: none;
    font-size: 1.4rem;
    border-radius: 5%;
  }

  .new-event-btn {
    padding: 12px;
    border: 2px solid grey;
  }

  .home-btn {
    font-size: 3rem;
    padding: 10px;
    margin-left: 2%;
  }
  a:hover {
    border-bottom: 2px solid white;
    }
  
</style>
