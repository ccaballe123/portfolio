function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

//
// The code above was obtained from https://www.html5rocks.com/en/tutorials/cors/
//
// This was a failed attempt to fix the following error that we are recieving
//
// crypto_market.html:1 Access to XMLHttpRequest at 'https://pro-api.coinmarketcap.com/
// v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=e5c8121a-a6b7-40e8-8ca7-3ba2437f9730&symbol=BTC'
// from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
// header is present on the requested resource.
//


function clicked()
{
	var input_val = document.getElementById("crypto_search").value;
  // var getList = createCORSRequest("GET","https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=e5c8121a-a6b7-40e8-8ca7-3ba2437f9730&symbol=" + input_val, true)
  var getList = new XMLHttpRequest();
  // getList.open("GET","https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=e5c8121a-a6b7-40e8-8ca7-3ba2437f9730&symbol=" + input_val, true);
  getList.open("GET","https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + input_val + "&tsyms=USD", true);
	getList.send();
	var injectTxt = "";
	getList.onreadystatechange = function()
  {
		if (getList.readyState === 4 && getList.status === 200)
    {
			var jsonreply = JSON.parse(getList.responseText);
			injectTxt += "<table><thead><tr class=table100-head><th class=column2> Symbol </th><th class=column2> Price </th><th class=column2> Daily Precent Change </th> <th class=column2> Buy/Sell </th></tr><tbody>";
      var price = jsonreply['DISPLAY'][input_val]['USD']['PRICE'];
      var change = jsonreply['DISPLAY'][input_val]['USD']['CHANGE24HOUR'];
      var sym = input_val;
      injectTxt += "</td><td class=column2><span class='symbol'>" + sym + "</span></td><td class=column2><span class='price'>" + price + "</span></td><td class=column2>" + change + "</td><td class=column2><p>Amount<span class='error'></span></p><input type='number' class='amount'><button id='buy-btn' onclick='buy(1, 0)'>+</button><button id='sell-btn' onclick='sell(1, 0)'>-</button></</td>" + "</tr>";
      injectTxt += "</tbody></table>"
      document.getElementById("crypto_results").innerHTML = injectTxt;
		}
	}
}

document.getElementById('btn').addEventListener('click', clicked);
