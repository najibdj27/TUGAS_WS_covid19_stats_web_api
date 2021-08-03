/* globals Chart:false, feather:false */
var myChart= '';
var date_list= [];
var confirmed = [];
var deaths = [];
var recovered = [];
var confirmed_sum_res = 0;
var deaths_sum_res = 0;
var recovered_sum_res = 0;

// generate date data to array 
for (let index = 0; index < 100; index++) {
  let date = new Date();
  date.setDate(date.getDate() - index);
  let dateString = date.toISOString().split('T')[0];
  date_list.push(dateString);
}
console.log(date_list)

$.when(
  // Call history for confirmed status
  $.ajax({
    type: "GET",
    url: "https://covid-api.mmediagroup.fr/v1/history",
    data: {
      'status': 'Confirmed'
    },
    dataType: 'json',
    success: function (response) {
      $.each(date_list, function (params) {
        confirmed_sum_res = 0;
        $.each(response, function (i) { 
          let res;
          if (response[i].All.dates[date_list[params]] != "undefined") {
            res = response[i].All.dates[date_list[params]];
          }else{
            res = 0;
          }
          confirmed_sum_res += res;
        });
        confirmed.push(confirmed_sum_res);
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
      $.each(date_list, function (params) {
        deaths_sum_res = 0;
        $.each(response, function (i) { 
          let res;
          if (response[i].All.dates[date_list[params]] != "undefined") {
            res = response[i].All.dates[date_list[params]];
          }else{
            res = 0;
          }
          deaths_sum_res += res;
        });
        deaths.push(deaths_sum_res);
      });
    }
  }),
  $.ajax({
    type: "GET",
    url: "https://covid-api.mmediagroup.fr/v1/history",
    data: {
      'status': 'Recovered'
    },
    dataType: 'json',
    success: function (response) {
      $.each(date_list, function (params) {
        recovered_sum_res = 0;
        $.each(response, function (i) { 
          let res;
          if (response[i].All.dates[date_list[params]] != "undefined") {
            res = response[i].All.dates[date_list[params]];
          }else{
            res = 0;
          }
          recovered_sum_res += res;
        });
        recovered.push(recovered_sum_res);
      });
    }
  })
).done(
  // implement the data to chart
  function (){
    (function () {
      'use strict'

      // Graphs
      var ctx = document.getElementById('myChart');
      
      // eslint-disable-next-line no-unused-vars
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: date_list.slice(0,7).reverse(),
          datasets: [{
            label: 'Terkonfimasi',
            data: confirmed.reverse(),
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
            data: deaths.reverse(),
            borderColor: '#e40065',
            backgroundColor: 'transparent',
            borderWidth: 1,
            radius: 0,
            pointBackgroundColor: '#e40065',
            pointStyle: 'rectRot',
            pointRadius: 5,
            pointBorderColor: 'rgb(0, 0, 0)'
          },
          {
            label: 'Sembuh',
            data: recovered.reverse(),
            borderColor: '#00ba00',
            backgroundColor: 'transparent',
            borderWidth: 1,
            radius: 0,
            pointBackgroundColor: '#00ba00',
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
                beginAtZero: false,
                callback: function(value, index, values) {
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                },
              },
            }],
          },
          legend: {
            labels : {
              usePointStyle : true
            }
          }
        }
      });
    })()
  },
)

$('#set-7').on('click', function(){
  myChart.data.labels = date_list.slice(0, 7).reverse();
  $('#tempo-selector').html(`
    <span data-feather="calendar"></span>
    Tempo : 7 Hari
  `);
  myChart.update();
});
$('#set-30').on('click', function(){
  myChart.data.labels = date_list.slice(0, 30).reverse();
  $('#tempo-selector').html(`
    <span data-feather="calendar"></span>
    Tempo : 30 Hari
  `);
  myChart.update();
});
$('#set-100').on('click', function(){
  myChart.data.labels = date_list.reverse();
  $('#tempo-selector').html(`
    <span data-feather="calendar"></span>
    Tempo : 100 Hari
  `);
  myChart.update();
});