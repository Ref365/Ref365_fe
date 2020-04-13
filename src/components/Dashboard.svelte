<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";


  let userId = 1;
  const client = getClient();
  const GETALLMILEAGE = gql`
      {
        user(id: ${userId}) {
          events {
            mileage
            dateTime
          }
        }
      }
    `;

  const GETALLINCOME = gql`
      {
        user(id: ${userId}) {
          events {
            income
            dateTime
          }
        }
      }
    `;

  const incomeQuery = query(client, {query: GETALLINCOME});
  const mileageQuery = query(client, {query: GETALLMILEAGE});
  const getIncomeTotal = events => {
    let totalIncome = events.reduce((acc, event) => {
      return acc + event.income;
    }, 0);
  };
  const getDataToDate = events => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let yearBegin = new Date(currentYear, 0, 1).getTime();
    let eventsToDate = events.filter(event => {
      let date = new Date(event.dateTime);
      let milliseconds = date.getTime();
      return (milliseconds > yearBegin) && (milliseconds < Date.now());
    });
    let incomeToDate = eventsToDate.reduce((acc, event) => {
      return acc + event.income;
    }, 0);
  };
  const getPreviousYearData = events => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let previousYear = currentYear - 1;
    let prevYearData = events.filter(event => {
      let eventYear = new Date(event.dateTime).getFullYear();
      return eventYear === previousYear;
    });
    let prevYearIncome = prevYearData.reduce((acc, event) => {
      return acc + event.income;
    }, 0);
  };
</script>

<section class='dashboard-main'>
  <h1>Dashboard</h1>
  {#await $incomeQuery}
  <p> ...loading</p>
  {:then data}
  {getIncomeTotal(data.data.user.events)}
  {getDataToDate(data.data.user.events)}
  {getPreviousYearData(data.data.user.events)}
  {:catch e}
  {/await}
</section>



<style>

</style>
