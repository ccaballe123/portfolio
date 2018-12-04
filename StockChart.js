  var stockSymbols = ["AAPL","TSLA","LMT","GOOG","AMZN"];

  var xml = new XMLHttpRequest();
  xml.open ("GET","https://api.iextrading.com/stock/AAPL/chart", true);

  var tableTxt = "";
  var pureTxt = {
    "name":[],
    "symbol":[],
    "price":[],
    "PC":[]
  };
  xml.onreadystatechange = function()
  {
    if(xml.readyState == 4 && xml.status === 200)
    {
      var jsonObj = JSON.parse(xml.responseText);
      tableTxt += "<table><thead><tr class=table100-head><th class=column1>Company Name</th><th class=column2>Symbol</th><th class=column3>Price</th><th class=column6>Percent Change</th></tr></thead><tbody>";
      for (var i=0; i<5; i++)
      {
        var name          = jsonObj[stockSymbols[i]]["quote"]["companyName"];
        var symbol        = stockSymbols[i];
        var price         = jsonObj[stockSymbols[i]]["quote"]["latestPrice"].toFixed(2);
        var percentChange = jsonObj[stockSymbols[i]]["quote"]["changePercent"];
        pureTxt['name'].push(name);
        pureTxt['symbol'].push(symbol);
        pureTxt['price'].push(price);
        pureTxt['PC'].push((percentChange*100).toFixed(2));
        tableTxt += "<tr><td class=column1>" + name +  "</td> <td class=column2>" + symbol + "</td><td class=column3>$" + price + "</td><td class=column6>" + (percentChange*100).toFixed(2) + " %</td></tr>";
      }
      tableTxt += "</table>";
      document.getElementById("stock_table_data").innerHTML = tableTxt;
      document.getElementById("stock_table_pure_data").innerText = JSON.stringify(pureTxt);
    }
  };

  xml.send(null);
