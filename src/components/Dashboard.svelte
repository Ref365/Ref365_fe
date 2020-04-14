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
    return totalIncome;
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
    return incomeToDate;
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
    return prevYearIncome;
  };

</script>

<section class='dashboard-main'>
  <h1>Dashboard</h1>
  {#await $incomeQuery}
  <p>...loading</p>
  {:then data}
  <div class='total-income data-card'>
    <h2>{getIncomeTotal(data.data.user.events)}</h2>
  </div>
  <div class='income-to-date data-card'>
    <h2>{getDataToDate(data.data.user.events)}</h2>
  </div>
  <div class='previous-year-income data-card'>
    <h2>{getPreviousYearData(data.data.user.events)}</h2>
  </div>
  {:catch e}
  {/await}

</section>



<style>
  * {
    color: white;
  }

  .dashboard-main {
    height: 100vh;
  }
</style>
