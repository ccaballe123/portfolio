var xml = new XMLHttpRequest();
xml.open ("GET","https://api.iextrading.com/1.0/stock/market/list/gainers?displayPercent=true", true);

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
			var cos_ = cos.toFixed(5);
			var percent24h_ = percent24h.toFixed(2);
			var yeartochange_ = yeartochange.toFixed(2);

			tableTxt += "<tr><td class=column1>" + sym +  "</td> <td class=column2>" + cos_ + "</td><td class=column3>" + percent24h_ + " %</td><td class=column6>" + yeartochange_ + " %</td></tr>";

		}
		tableTxt += "</table>";
		document.getElementById("trending_stock").innerHTML = tableTxt;
	}};

	xml.send(null);