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

var xml = new XMLHttpRequest();
xml.open("GET", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + cryptoString + "&tsyms=USD", true);

var tableTxt = "";
xml.onreadystatechange = function () {
	if (xml.readyState === 4 && xml.status === 200) {
	var jsonObj = JSON.parse(xml.responseText);
	tableTxt += "<table><tr><th>Name</th><th>Percent Change (24H)</th><th>Total Invested (USD)</th><th>Owned</th><th>Price Per Coin (USD)</th></tr>";
	for (var [cryptoID, amountOwned] of firstCryptoPortfolio) {
  		tableTxt += "<tr><td>" + cryptoID + "</td><td>" + jsonObj.RAW[cryptoID].USD.CHANGEPCT24HOUR + "</td><td>" + amountOwned * jsonObj.RAW[cryptoID].USD.PRICE + "</td><td>" + amountOwned + "</td><td>" + jsonObj.RAW[cryptoID].USD.PRICE + "</td><tr>";
	}
	
	tableTxt += "</table>";
	document.getElementById("crypto_table").innerHTML = tableTxt;
}};

xml.send(null);