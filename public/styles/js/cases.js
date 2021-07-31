/* globals Chart:false, feather:false */
var myChart= '';
var week = [];
var month = [];
var year = [];
var confirmed7 = [];
var confirmed30 = [];
var confirmed100 = [];
var deaths7 = [];
var deaths30 = [];
var deaths100 = [];

feather.replace({ 'aria-hidden': 'true' })

// generate date data to array 
var confirmed_sum_res = 0;
var deaths_sum_res = 0;
for (let index = 1; index < 8; index++) {
  var date = new Date();
  date.setDate(date.getDate() - index);
  var dateString = date.toISOString().split('T')[0];
  week.push(dateString);
}
for (let index = 1; index < 31; index++) {
  var date = new Date();
  date.setDate(date.getDate() - index);
  var dateString = date.toISOString().split('T')[0];
  month.push(dateString);
}
for (let index = 1; index < 101; index++) {
  var date = new Date();
  date.setDate(date.getDate() - index);
  var dateString = date.toISOString().split('T')[0];
  year.push(dateString);
}

$.when(
  function () {
    var cl = document.getElementById('myChart');
    cl.setColor('#29cc4f'); // default is '#000000'
    cl.setShape('spiral'); // default is 'oval'
    cl.setDiameter(106); // default is 40
    cl.setDensity(108); // default is 40
    cl.setRange(0.5); // default is 1.3
    cl.setFPS(35); // default is 24
    cl.show(); // Hidden by default
  },
  // Call history for confirmed status
  $.ajax({
    type: "GET",
    url: "https://covid-api.mmediagroup.fr/v1/history",
    data: {
      'status': 'Confirmed'
    },
    dataType: 'json',
    success: function (response) {
      $.each(week, function (params) {
        $.each(response, function (i) { 
          let res = response[i].All.dates[week.reverse()[params]];
          confirmed_sum_res += res;
        });
        confirmed7.push(confirmed_sum_res);
      });
      $.each(month, function (params) {
        $.each(response, function (i) { 
          let res = response[i].All.dates[month.reverse()[params]];
          confirmed_sum_res += res;
        });
        confirmed30.push(confirmed_sum_res);
      });
      $.each(year, function (params) {
        $.each(response, function (i) { 
          let res = response[i].All.dates[year.reverse()[params]];
          confirmed_sum_res += res;
        });
        confirmed100.push(confirmed_sum_res);
      });
    }
  }),

  // call history for death status
  $.ajax({
    type: "GET",
    url: "https://covid-api.mmediagroup.fr/v1/history",
    data: {
      'status': 'Deaths'
    },
    dataType: 'json',
    success: function (response) {
      $.each(week, function (params) {
        $.each(response, function (i) { 
          let res = response[i].All.dates[week.reverse()[params]];
          deaths_sum_res += res;
        });
        deaths7.push(deaths_sum_res);
      });
      $.each(month, function (params) {
        $.each(response, function (i) { 
          let res = response[i].All.dates[month.reverse()[params]];
          deaths_sum_res += res;
        });
        deaths30.push(deaths_sum_res);
      });
      $.each(year, function (params) {
        $.each(response, function (i) { 
          let res = response[i].All.dates[year.reverse()[params]];
          deaths_sum_res += res;
        });
        deaths100.push(deaths_sum_res);
      });
    }
  })
).done(
  // implement the data to chart
  (function (){
    (function () {
      'use strict'

      // Graphs
      var ctx = document.getElementById('myChart')
      
      // eslint-disable-next-line no-unused-vars
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: week.reverse(),
          datasets: [{
            label: 'Terkonfimasi',
            data: confirmed7,
            borderColor: '#1ecfdf',
            backgroundColor: 'transparent',
            borderWidth: 1,
            radius: 0,
            pointBackgroundColor: '#1ecfdf',
            pointStyle: 'rectRot',
            pointRadius: 5,
            pointBorderColor: 'rgb(0, 0, 0)'
          },
          {
            label: 'Meninggal',
            data: deaths7,
            borderColor: '#e40065',
            backgroundColor: 'transparent',
            borderWidth: 1,
            radius: 0,
            pointBackgroundColor: '#e40065',
            pointStyle: 'rectRot',
            pointRadius: 5,
            pointBorderColor: 'rgb(0, 0, 0)'
          }]
        },
        options: {
          tooltips: {
            enable: true,
            mode: 'single',
            callbacks: {
              title: function(tooltipItems, data) {
                //Return value for title
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];
                const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu",
                  "Minggu"
                ];
                let d = new Date(tooltipItems[0].xLabel);
                return dayNames[d.getDay()]+", "+d.getDate()+" "+monthNames[d.getMonth()]+" "+d.getFullYear();
              },
              label: function(tooltipItem, data) {
                if (tooltipItem.datasetIndex === 0) {
                  return "Terkonfimasi: "+tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }else if (tooltipItem.datasetIndex === 1){
                  return "Meninggal: "+tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
              },
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                },
              },
            }],
            xAxes: [{
              max : 10,
            }]
          },
          legend: {
            labels: {
              usePointStyle: true,
            },
          }
        }
      });
    })()
  })
)

$('#set-7').on('click', function(){
  myChart.data.datasets[0].data = confirmed7;
  myChart.data.datasets[1].data = deaths7;
  myChart.data.labels = week;
  $('#tempo-selector').html(`
    <span data-feather="calendar"></span>
    Tempo : 7 Hari
  `);
  myChart.update();
});
$('#set-30').on('click', function(){
  myChart.data.datasets[0].data = confirmed30;
  myChart.data.datasets[1].data = deaths30;
  myChart.data.labels = month;
  $('#tempo-selector').html(`
    <span data-feather="calendar"></span>
    Tempo : 30 Hari
  `);
  myChart.update();
});
$('#set-100').on('click', function(){
  myChart.data.datasets[0].data = confirmed100;
  myChart.data.datasets[1].data = deaths100;
  myChart.data.labels = year;
  $('#tempo-selector').html(`
    <span data-feather="calendar"></span>
    Tempo : 100 Hari
  `);
  myChart.update();
});
$('#export-canvas').on('click', function () {
  var ctx = document.getElementById('myChart');
  window.location = ctx.toDataURL("img/png");
  console.log('export');
})
