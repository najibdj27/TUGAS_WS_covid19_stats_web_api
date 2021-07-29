/* globals Chart:false, feather:false */
var seven_days = [];
(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })
  $.ajax({
    type: "GET",
    url: "https://covid-api.mmediagroup.fr/v1/history",
    data: {
      'status': 'Confirmed'
    },
    dataType: 'json',
    success: function (response) {
      var deaths = 0;
      var res = {};
      var country = Object.keys(response);
      // for (let i = 0; i < 7; i++) {
      //   var date_list = Object.keys(response.Afghanistan.All.dates[i]);
      //   date_list_data += date_list;
      // }
      
      for (let index = 1; index < 9; index++) {
        const d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let date = d.getDate()-index;
        var now = year+'-'+month+'-'+date;
        seven_days.push(now);
      }
      console.log(seven_days);

      $.each(response, function (i, value) { 
        let y = response[i].All.dates["2021-07-28"];
        let res = y;
        deaths += res;
        // for (let idx = 0; idx < 7; idx++) {
        //   let y = response[i].All.dates[idx];
        //   let res = y;
        //   deaths += res;
        // }
        // $.each(response[i].All.dates, function(x, y){
        //   let res = y;
        //   deaths += res;
        // });
      });
      
      console.log(deaths);
    }
  });

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: seven_days,
      datasets: [{
        data: [
          1339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()
