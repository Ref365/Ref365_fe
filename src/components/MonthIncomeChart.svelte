<script>
import {onMount} from 'svelte';
import Chart from 'chart.js';
// export let totalMileage;
// export let yearToDateMileage;
// export let lastYearMileage;
export let allEvents;
console.log(allEvents);
// need to sort these by year to date and last year to compare this year's monthly income to last
// could create arrays containing the montly income for previous year and current year to date
  const getDataToDate = (events, type) => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let yearBegin = new Date(currentYear, 0, 1).getTime();
    let eventsToDate = events.filter(event => {
      let date = new Date(event.dateTime);
      let milliseconds = date.getTime();
      return (milliseconds > yearBegin) && (milliseconds < Date.now());
    });
    console.log('eventsToDate:', eventsToDate)
    // let dataToDate = eventsToDate.reduce((acc, event) => {
    //   return acc + event[type];
    // }, 0);
    // return dataToDate;
  };

  getDataToDate(allEvents, 'income')



function createChart() {
  
  var ctx = document.getElementById('myChart');
  Chart.defaults.global.defaultFontSize = 22;
  Chart.defaults.global.defaultFontFamily = 'Arial';
  Chart.defaults.global.defaultFontColor = 'white';


  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'August', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
              label: 'Income Trends:',
              data: [14,54,34],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

onMount(createChart)
</script>

<section>
  <canvas id="myChart" ></canvas>
</section>

<style>

  canvas {

  }

  section {
    border: 5px solid grey;
    margin-bottom: 2rem;
  }
</style>


