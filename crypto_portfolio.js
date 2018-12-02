function displayCryptoGraph(crypto){
	var cid = crypto.cells[0].textContent;
	baseUrl = "https://widgets.cryptocompare.com/";
	(function (){
		var appName = encodeURIComponent(window.location.hostname);
		if(appName==""){appName="local";}
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.async = true;
		var theUrl = baseUrl+'serve/v2/coin/chart?fsym='+cid+'&tsym=USD&period=1M';
		s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
		document.getElementById("crypto_graph").appendChild(s);
	})();
}

function displayCryptoDetails(crypto){
	var cid = crypto.cells[0].textContent;
	baseUrl = "https://widgets.cryptocompare.com/";
	(function (){
		var appName = encodeURIComponent(window.location.hostname);
		if(appName==""){appName="local";}
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.async = true;
		var theUrl = baseUrl+'serve/v1/coin/header?fsym='+cid+'&tsyms=USD,EUR,GBP,CNY';
		s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
		document.getElementById('crypto_details').appendChild(s);
	})();
}

function displayGraphAndDetailsOnRowClick(){
	var numRows = document.getElementsByClassName("coins").length;
	var i;
	for(i = 0; i < numRows; i++){
		document.getElementsByClassName("coins")[i].onclick = function() { 
			document.getElementById("crypto_graph").innerHTML = '';
			document.getElementById("crypto_details").innerHTML = '';
			displayCryptoGraph(this); 
			displayCryptoDetails(this);
		 };
	}
}

function populateCryptoTable(){
	var map1 = new Map();
	var currency = new Map();
	currency.set("BTC", 1);
	currency.set("ETH", 13);
	currency.set("XRP", 2000);
	currency.set("XLM", 40);
	currency.set("XMR", 22);
	map1.set("user1", currency);

	var firstCryptoPortfolio = map1.get("user1");
	var cryptoString = Array.from(firstCryptoPortfolio.keys()).join();

	//Create xml request and get access crypto api
	var xml = new XMLHttpRequest();
	xml.open("GET", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + cryptoString + "&tsyms=USD", true);

	var tableText = "";
	//Parse data from api and insert the data into table
	xml.onreadystatechange = function () {
		//Ensures api data is ready to be accessed
		if (xml.readyState === 4 && xml.status === 200) {
			var jsonData = JSON.parse(xml.responseText);
			tableText += "<table id=\"crypto_table\"><tr><th>Name</th><th>Price Per Coin (USD)</th><th>Crypto Owned</th><th>Total Invested (USD)</th></tr>"
		for (var [cryptoID, amountOwned] of firstCryptoPortfolio) {
			var pricePerCoin = (jsonData.RAW[cryptoID].USD.PRICE).toFixed(2);	
			var cryptoOwned = amountOwned.toFixed(2);
			var totalInvested = (amountOwned * jsonData.RAW[cryptoID].USD.PRICE).toFixed(2);

			tableText += "<tr class=\"coins\"><td>" + cryptoID + "</td><td>" + pricePerCoin + "</td><td>" + cryptoOwned + "</td><td>" + totalInvested + "</td>";
		}
		tableText += "</table>";
      	document.getElementById("crypto_table_container").innerHTML = tableText;

      	displayGraphAndDetailsOnRowClick();
	}};
	xml.send(null);
}

//call function initially, then calls function every 5 minutes
populateCryptoTable();
setInterval(populateCryptoTable, 300000);
