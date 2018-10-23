  var stockSymbols = ["LMT","FB","GOOGL","APPL","TSLA"]

  var xml = new XMLHttpRequest();
  xml.open ("GET","https://api.iextrading.com/1.0/stock/market/batch?symbols=lmt,fb,goog,aapl,tsla&types=quote&range=1m&last=5", true);

  var tableTxt = "";
  xml.onreadystatechange = function()
  {
    if(xml.readyState == 4 && xml.response === 200)
    {
      var jsonObj = JSON.parse(xml.responseText);
      tableTxt += "<table><thead><tr class=table100-head><th class=column1>Company Name</th><th class=column2>Symbol</th><th class=column3>Price</th><th class=column6>Percent Change</th></tr></thead><tbody>";
      for (var i=0; i<5; i++)
      {
        var name          = jsonObj[stockSymbols[i]]["quote"]["companyName"];
        var symbol        = stockSymbols[i];
        var price         = jsonObj[stockSymbols[i]]["quote"]["latestPrice"].toFixed(2);
        var percentChange = jsonObj[stockSymbols[i]]["quote"]["changePercent"].toFixed(2);

        tableTxt += "<tr><td class=column1>" + name +  "</td> <td class=column2> $" + symbol + "</td><td class=column3>" + price + " %</td><td class=column6>" + percentChange + " %</td></tr>";
      }
      tableTxt += "</table>"
      document.getElementById("stock_table_data").innerHTML = tableTxt;
    }
  };

  xml.send(null);
