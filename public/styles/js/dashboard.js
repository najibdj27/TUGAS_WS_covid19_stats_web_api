/* globals Chart:false, feather:false */
var myChart= '';
var week = [];
var month = [];
var year = [];
var deaths7 = [];
var deaths30 = [];
var deaths365 = [];

feather.replace({ 'aria-hidden': 'true' })

$.ajax({
  type: "GET",
  url: "https://covid-api.mmediagroup.fr/v1/history",
  data: {
    'status': 'Confirmed'
  },
  dataType: 'json',
  success: function (response) {
    let sum_res = 0;
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
    for (let index = 1; index < 366; index++) {
      var date = new Date();
      date.setDate(date.getDate() - index);
      var dateString = date.toISOString().split('T')[0];
      year.push(dateString);
    }
    $.each(week, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[week.reverse()[params]];
        sum_res += res;
      });
      deaths7.push(sum_res);
    });
    $.each(month, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[month.reverse()[params]];
        sum_res += res;
      });
      deaths30.push(sum_res);
    });
    $.each(year, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[year.reverse()[params]];
        sum_res += res;
      });
      deaths365.push(sum_res);
    });
  }
});
$.ajax({
  type: "GET",
  url: "https://covid-api.mmediagroup.fr/v1/history",
  data: {
    'status': 'Deaths'
  },
  dataType: 'json',
  success: function (response) {
    let sum_res = 0;
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
    for (let index = 1; index < 366; index++) {
      var date = new Date();
      date.setDate(date.getDate() - index);
      var dateString = date.toISOString().split('T')[0];
      year.push(dateString);
    }
    $.each(week, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[week.reverse()[params]];
        sum_res += res;
      });
      deaths7.push(sum_res);
    });
    $.each(month, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[month.reverse()[params]];
        sum_res += res;
      });
      deaths30.push(sum_res);
    });
    $.each(year, function (params) {
      $.each(response, function (i) { 
        let res = response[i].All.dates[year.reverse()[params]];
        sum_res += res;
      });
      deaths365.push(sum_res);
    });
  }
});


$(document).ajaxComplete(function (){
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
        data: deaths7,
        fill: false,
        borderColor: '#E72828',
        tension: 0.1
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
            return "Terkonfirmasi"+": "+tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        }]
      },
      legend: {
        display: false
      }
    }
  })
  })()
});

$('#set-7').on('click', function(){
  myChart.data.datasets[0].data = deaths7;
  myChart.data.labels = week;
  myChart.update();
});
$('#set-30').on('click', function(){
  myChart.data.datasets[0].data = deaths30;
  myChart.data.labels = month;
  myChart.update();
});
$('#set-365').on('click', function(){
  myChart.data.datasets[0].data = deaths365;
  myChart.data.labels = year;
  myChart.update();
});
$('#export-canvas').on('click', function () {
  var ctx = document.getElementById('myChart');
  window.location = ctx.toDataURL("img/png");
  console.log('export');
})
