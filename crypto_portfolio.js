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

	//Parse data from api and insert the data into table
	xml.onreadystatechange = function () {
		//Ensures api data is ready to be accessed
		if (xml.readyState === 4 && xml.status === 200) {
			var jsonData = JSON.parse(xml.responseText);
			var index = 1;
			var cryptoRowArray = [];
		for (var [cryptoID, amountOwned] of firstCryptoPortfolio) {
			cryptoRowArray[0] = cryptoID;
			cryptoRowArray[1] = (jsonData.RAW[cryptoID].USD.PRICE).toFixed(2);	
			cryptoRowArray[2] = amountOwned.toFixed(2);
			cryptoRowArray[3] = (amountOwned * jsonData.RAW[cryptoID].USD.PRICE).toFixed(2);

			var row = document.getElementById("row" + index);
			for(var i = 0; i < 4; i++){
				row.cells[i].innerHTML = cryptoRowArray[i];
			}
			index++;
		}
	}};
	xml.send(null);
}

//call function initially, then calls function every 5 minutes
populateCryptoTable();
setInterval(populateCryptoTable, 300000);
