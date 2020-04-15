<script>
import {onMount} from 'svelte';
import Chart from 'chart.js';
// export let totalMileage;
// export let yearToDateMileage;
// export let lastYearMileage;

function createChart() {
  
  var ctx = document.getElementById('myChart');
  Chart.defaults.global.defaultFontSize = 22;
  Chart.defaults.global.defaultFontFamily = 'Arial';
  Chart.defaults.global.defaultFontColor = 'white';


  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['All-Time', 'Year-To-Date', 'Last Year'],
          datasets: [{
              label: 'Mileage Data:',
              data: [totalMileage, yearToDateMileage, lastYearMileage],
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


