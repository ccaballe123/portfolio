
var xml1 = new XMLHttpRequest();
xml1.open("GET", "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=percent_change_7d&start=250&limit=5&sort_dir=desc&CMC_PRO_API_KEY=9a4967b9-f9fc-4746-8e65-fd589c08bb59", true);

var tableTxt1 = "";
xml1.onreadystatechange = function(){
  if (xml1.readyState === 4 && xml1.status === 200) {
      var jsonObj1 = JSON.parse(xml1.responseText);
	  tableTxt1 += "<table><thead><tr class=table100-head><th class=column1>Name</th><th class=column2>Price (USD)</th><th class=column3>Percent Change (24hrs)</th><th class=column6>Percent Change (7days)</th></tr></thead><tbody>";
      for (var i=0; i< 5; i++){
        var sym1 = jsonObj1['data'][i].symbol;
        var cos1 = jsonObj1['data'][i].quote.USD.price;
        var percent24h1 = jsonObj1['data'][i].quote.USD.percent_change_24h;
        var percent7d1 = jsonObj1['data'][i].quote.USD.percent_change_7d;
		var cos2 = cos1.toFixed(5);
		var percent24h2 = percent24h1.toFixed(2);
		var percent7d2 = percent7d1.toFixed(2);

        tableTxt1 += "<tr><td class=column1>" + sym1 +  "</td> <td class=column2> $" + cos2 + "</td><td class=column3>" + percent24h2 + " %</td><td class=column6>" + percent7d2 + " %</td></tr>";
      }
      

      tableTxt1 += "</tbody></table>";
      document.getElementById("trending_crypto").innerHTML = tableTxt1;
  
  }};
//https://api.iextrading.com/1.0/stock/market/list/gainers
  xml1.send(null);