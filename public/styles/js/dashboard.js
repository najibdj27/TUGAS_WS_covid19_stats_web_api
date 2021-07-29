/* globals Chart:false, feather:false */
var seven_days = [];
var deaths = [];

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

$.ajax({
  type: "GET",
  url: "https://covid-api.mmediagroup.fr/v1/history",
  data: {
    'status': 'Confirmed'
  },
  dataType: 'json',
  success: function (response) {
    let sum_res = 0;
    
    for (let index = 1; index < 9; index++) {
      const d = new Date();
      let year = d.getFullYear();
      let month = ("0" + (d.getMonth()+1)).slice(-2);
      let date = ("0" + (d.getDate()-index)).slice(-2);
      var now = year+'-'+month+'-'+date;
      seven_days.push(now);
    }
    $.each(seven_days, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[seven_days.reverse()[params]];
        sum_res += res;
      });
      deaths.push(sum_res);
    });
  }
});

$(document).ajaxComplete(function (){
  (function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: seven_days,
      datasets: [{
        data: deaths,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 2,
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
});

