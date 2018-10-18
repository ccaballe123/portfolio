
var xml = new XMLHttpRequest();
xml.open("GET", "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=percent_change_7d&start=1&limit=5&sort_dir=desc&CMC_PRO_API_KEY=9a4967b9-f9fc-4746-8e65-fd589c08bb59", true);

var tableTxt = "";
xml.onreadystatechange = function(){
  if (xml.readyState === 4 && xml.status === 200) {
      var jsonObj = JSON.parse(xml.responseText);
	  tableTxt += "<table><thead><tr class=table100-head><th class=column1>Name</th><th class=column2>Price (USD)</th><th class=column3>Percent Change (24hrs)</th><th class=column6>Percent Change (7days)</th></tr></thead><tbody>";
      for (var i=0; i< 5; i++){
        var sym = jsonObj['data'][i].symbol;
        var cos = jsonObj['data'][i].quote.USD.price;
        var percent24h = jsonObj['data'][i].quote.USD.percent_change_24h;
        var percent7d = jsonObj['data'][i].quote.USD.percent_change_7d;


        tableTxt += "<tr><td class=column1>" + sym +  "</td> <td class=column2>" + cos + "</td><td class=column3>" + percent24h + " %</td><td class=column6>" + percent7d + " %</td></tr>";
      }
      

      tableTxt += "</table>";
      document.getElementById("trending_crypto").innerHTML = tableTxt;
  
  }};

  xml.send(null);