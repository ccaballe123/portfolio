function clicked(){
	var input_val = document.getElementById("stock_search").value;
	//document.getElementById("stock_results").innerHTML = input_val;
	var getStock = new XMLHttpRequest();
	getStock.open ("GET","https://api.iextrading.com/1.0/stock/" + input_val + "/batch?types=quote",true);

	var injectTxt = "";
	getStock.onreadystatechange = function(){
		if (getStock.readyState === 4 && getStock.status === 200){
			var jsonreply = JSON.parse(getStock.responseText)
			injectTxt += "<table><thead><tr class=table100-head><th class=column1>Name</th><th class=column2>Price</th><th class=column3>Daily High</th><th class=column4>Daily Low</th><th class=column5>24h change</th><th class=column6> Volume</th></tr><tbody>";
			var sym = jsonreply.quote.symbol;
			var price = jsonreply.quote.latestPrice;
			var dayHigh = jsonreply.quote.high;
			var dayLow = jsonreply.quote.low;
			var dayChange = jsonreply.quote.change;
			var vol = jsonreply.quote.avgTotalVolume;
			injectTxt += "<tr><td class=column1>" + sym +"</td><td class=column2> $" + price + "</td><td class=column3>$" + dayHigh + "</td><td class=column4>$" + dayLow + "</td><td class=column5>" + dayChange + "%</td><td class=column6>" + vol + "</td></tr>";
			injectTxt += "</tbody></table>";
			document.getElementById("stock_results").innerHTML = injectTxt;
		}
	}
	getStock.send(null);
}

document.getElementById('btn').addEventListener('click', clicked);



