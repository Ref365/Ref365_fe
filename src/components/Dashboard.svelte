<script>
  import ApolloClient from "apollo-boost";
  import { gql } from "apollo-boost";
  import { setClient, getClient, mutate, query } from "svelte-apollo";
  import TotalIncomeChart from './TotalIncomeChart.svelte';
  import TotalMileageChart from './TotalMileageChart.svelte';
  import MonthIncomeChart from './MonthIncomeChart.svelte'

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


  let totalData = 0;
  const getTotalData = (events, type) => {
    totalData = events.reduce((acc, event) => {
      return acc + event[type];
    }, 0);
    return totalData;
  };

  const getDataToDate = (events, type) => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let yearBegin = new Date(currentYear, 0, 1).getTime();
    let eventsToDate = events.filter(event => {
      let date = new Date(event.dateTime);
      let milliseconds = date.getTime();
      return (milliseconds > yearBegin) && (milliseconds < Date.now());
    });
    let dataToDate = eventsToDate.reduce((acc, event) => {
      return acc + event[type];
    }, 0);
    return dataToDate;
  };

  const getPreviousYearData = (events, type) => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let previousYear = currentYear - 1;
    let prevYearData = events.filter(event => {
      let eventYear = new Date(event.dateTime).getFullYear();
      return eventYear === previousYear;
    });
    let prevYearTotal = prevYearData.reduce((acc, event) => {
      return acc + event[type];
    }, 0);
    return prevYearTotal;
  };

</script>

<section class='dashboard-main'>
  <h1>Dashboard</h1>
  {#await $incomeQuery}
  <p>...loading</p>
  {:then data}
  <section class='data-cards-section'>
    <div class='total-income data-card'>
      <h3>Total Income</h3>
      <h2>{`$${getTotalData(data.data.user.events, 'income')}`}</h2>
    </div>
    <div class='income-to-date data-card'>
      <h3>Year-to-Date Income</h3>
      <h2>{`$${getDataToDate(data.data.user.events, 'income')}`}</h2>
    </div>
    <div class='previous-year-income data-card'>
      <h3>Last Year's Income</h3>
      <h2>{`$${getPreviousYearData(data.data.user.events, 'income')}`}</h2>
    </div>
  </section>
   <section class='income-chart-section'>
      <TotalIncomeChart totalIncome={getTotalData(data.data.user.events, 'income')}
             yearToDateIncome={getDataToDate(data.data.user.events, 'income')}
             lastYearIncome={getPreviousYearData(data.data.user.events, 'income')}
      />
      <!-- this component below needs to be finished but it represents a line graph of month to month income -->
      <!-- <MonthIncomeChart allEvents={data.data.user.events}/> -->
  </section>
    {:catch e}
    {/await}
    
  {#await $mileageQuery}
  <p>...loading</p>
  {:then data}
  <section class='data-cards-section'>
    <div class='total-mileage data-card'>
      <h3>Total Mileage</h3>
      <h2>{`${getTotalData(data.data.user.events, 'mileage')} miles`}</h2>
    </div>
    <div class='mileage-to-date data-card'>
      <h3>Year-to-Date Mileage</h3>
      <h2>{`${getDataToDate(data.data.user.events, 'mileage')} miles`}</h2>
    </div>
    <div class='previous-year-mileage data-card'>
      <h3>Last Year's Mileage</h3>
      <h2>{`${getPreviousYearData(data.data.user.events, 'mileage')} miles`}</h2>
    </div>
  </section>
   <section class='mileage-chart-section'>
      <TotalMileageChart totalMileage={getTotalData(data.data.user.events, 'mileage')}
             yearToDateMileage={getDataToDate(data.data.user.events, 'mileage')}
             lastYearMileage={getPreviousYearData(data.data.user.events, 'mileage')}
      />
  </section>
    {:catch e}
    {/await}

</section>



<style>
  * {
    color: white;
  }

  .income-chart-section {
    /* height: 30%; */
    /* border: 5px solid green; */
  }
  .dashboard-main {
    /* height: 100vh; */
  }

  h1 {
    font-size: 3rem;
  }
  .data-cards-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .data-card {
    border: 2px solid yellow;
    padding: 1rem;
    width: 15%;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid grey;
  }
</style>
