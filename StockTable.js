var vals = []

function displayGraphAndDetailsOnRowClick(values){

  var numRows = document.getElementsByClassName("stocks").length;
  var i;
  for(i = 0; i < numRows; i++){
    vals.push(values[i]);
    document.getElementsByClassName("stocks")[i].onclick = function() {
      document.getElementById("stock_graph").innerHTML = '';
      displayStockGraph(this);
     };
  }
}

function displayStockGraph(symbols) {
  var symbol = symbols.cells[1].textContent;
  var xml = new XMLHttpRequest();
  xml.open('GET', "https://api.iextrading.com/1.0/stock/" + symbol + "/chart/1d", false);
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
                label: symbol,
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
    }

function populateStockTable() {
  firebase.auth().onAuthStateChanged(function(user) {
  if (user && user != null) {
    var uid = firebase.auth().currentUser.uid;
    var docRef = firestore.collection("users").doc("portfolios");
    docRef.get().then(function(doc) {
      if(doc.exists) {

      }
  var map1 = new Map();
  var stocks = new Map();

  var obj = (doc.data()[uid]['Stock']);
  stocks = new Map(Object.entries(obj));
  map1.set("user1", stocks);

  var firstStockPortfolio = map1.get("user1");
  var stockString = Array.from(firstStockPortfolio.keys()).join();

  var xml = new XMLHttpRequest();
  xml.open ("GET","https://api.iextrading.com/1.0/stock/market/batch?symbols="+stockString+"&types=quote&range=1m&last=5", true);

  var tableTxt = "";
  xml.onreadystatechange = function()
  {
    if(xml.readyState == 4 && xml.status === 200)
    {
      var jsonObj = JSON.parse(xml.responseText);
      tableTxt += "<table><thead><tr class=table100-head><th class=column1>Company Name</th><th class=column2>Symbol</th><th class=column3>Price</th><th class=column6>Stock Owned</th><th class=column6>Total Invested</th></tr></thead><tbody>";
      for (var [stockID, amountOwned] of firstStockPortfolio)
      {
        var name          = jsonObj[stockID]["quote"]["companyName"];
        var price         = jsonObj[stockID]["quote"]["latestPrice"].toFixed(2);
        var usdAmount     = (amountOwned * price).toFixed(2);

        tableTxt += "<tr class=\"stocks\"><td class=column1>" + name +  "</td> <td class=column2>" + stockID + "</td><td class=column3>$" + price + "</td><td class=column6>" + amountOwned + "<td>$" + usdAmount + "</td></tr>";
      }
      tableTxt += "</table>";
      document.getElementById("stock_table_data").innerHTML = tableTxt;
      var stocksOwned = Object.keys((doc.data()[uid]['Stock']));
      displayGraphAndDetailsOnRowClick(stocksOwned);
    }
  };

  xml.send(null);

});
}
});
}


populateStockTable();
displayStockGraph("aapl");
setInterval(populateStockTable, 300000);
