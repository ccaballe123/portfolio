var map1 = new Map();
var currency = new Map();
currency.set("BTC", 1);
currency.set("ETH", 13);
currency.set("XRP", 2000);
currency.set("XLM", 40);
currency.set("XMR", 22);
map1.set("user1", currency);

var firstCryptoPortfolio = map1.get("user1");
// for (var [crypto, amountOwned] of firstCryptoPortfolio) {
  
// }

var cryptoString = Array.from(firstCryptoPortfolio.keys()).join();


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xml = new XMLHttpRequest();
xml.open("GET", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + cryptoString + "&tsyms=USD");

xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status === 200) {
    	var jsonObj = JSON.parse(xml.responseText);
        console.log(jsonObj.RAW["BTC"].USD.CHANGEPCT24HOUR);
    }
};
xml.send();


