var stocks = "AAPL";

// var xml = new XMLHttpRequest();
// xml.open ("GET","https://api.iextrading.com/1.0/stock/aapl/chart/1d", true);

var xml = new XMLHttpRequest();
xml.open('GET', "https://api.iextrading.com/1.0/stock/"+stocks+"/chart/1d", false);
xml.send();

var jsonObj = JSON.parse(xml.responseText);
var value = [];
var label = [];

  for (i = 0; i < jsonObj.length; i++){
    value.push(jsonObj[i]['close']);
    label.push(jsonObj[i]['label']);
  }


var ctx = document.getElementById("myChart").getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'line',
    data:{
    //Along the x-axis
    labels: label,
        datasets: [{
            label: stocks[0],
            backgroundColor: 'rgba(50, 50, 250, 0.7)',
            borderColor: 'rgba(50, 50, 250, 0.9)',
            data: value,
            fill: false,
        }
        // ,{
        //     label: 'test2',
        //     backgroundColor: 'rgba(250, 50, 50, 0.7)',
        //     borderColor: 'rgba(250, 50, 50, 0.9)',
        //     data: [4,6,10,7,2,6,3],
        //     fill: false,
        // }
      ]},
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Stock Price(at closing)'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
});
