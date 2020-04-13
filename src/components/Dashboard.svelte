<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";


  let userId = 5;
  const client = getClient();
  const GETALLMILEAGE = gql`
      {
        user(id: ${userId}) {
          events {
            mileage
          }
        }
      }
    `;

  const GETALLINCOME = gql`
      {
        user(id: ${userId}) {
          events {
            income
          }
        }
      }
    `;

  const incomeQuery = query(client, {query: GETALLINCOME});
  const mileageQuery = query(client, {query: GETALLMILEAGE});
</script>

<section class='dashboard-main'>
  <h1>Dashboard</h1>
</section>

<style>

</style>