var xml = new XMLHttpRequest();
xml.open ("GET","https://api.iextrading.com/1.0/stock/market/list/gainers", true);

var tableTxt = "";
xml.onreadystatechange = function(){
	if (xml.readyState === 4 && xml.status === 200) {
		var jsonObj = JSON.parse(xml.responseText)
		tableTxt += "<table><thead><tr class=table100-head><th class=column1>Name</th><th class=column2>Price (USD)</th><th class=column3>Percent Change (24hrs)</th><th class=column6>Percent Change (YTD)</th></tr></thead><tbody>";
		for (var i=0; i<5; i++){
			var sym = jsonObj[i].symbol;
			var cos = jsonObj[i].latestPrice;
			var percent24h = jsonObj[i].changePercent
			var yeartochange = jsonObj[i].ytdChange

			tableTxt += "<tr><td class=column1>" + sym +  "</td> <td class=column2>" + cos + "</td><td class=column3>" + percent24h + " %</td><td class=column6>" + yeartochange + " %</td></tr>";

		}
		tableTxt += "</table>";
		document.getElementById("trending_stock").innerHTML = tableTxt;
	}};

	xml.send(null);