function clicked()
{
	var input_val = document.getElementById("crypto_search").value;
	var getList = new XMLHttpRequest();
  getList.open("GET","https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=e5c8121a-a6b7-40e8-8ca7-3ba2437f9730&symbol=" + input_val, true);
	getList.send();
	var injectTxt = "";
	getList.onreadystatechange = function()
  {
		if (getList.readyState === 4 && getList.status === 200)
    {
			var jsonreply = JSON.parse(getList.responseText);
			injectTxt += "<table><thead><tr class=table100-head><th class=column1> Name </th><th class=column2> Symbol </th><th class=column2> Price </th><th class=column2> Daily Precent Change </th> <th class=column2> Buy/Sell </th></tr><tbody>";
      var price = jsonreply['data'][input_val].quote.USD.price;
      var change = jsonreply['data'][input_val].quote.USD.percent_change_24h;
      var name = jsonreply['data'][input_val].name;
      var sym = jsonreply['data'][input_val].symbol;
      injectTxt += "<tr><td class=column1>" + name + "</td><td class=column2><span class='symbol'>" + sym + "</span></td><td class=column2><span class='price'>" + price + "</span></td><td class=column2>" + change + "</td><td class=column2><p>Amount<span class='error'></span></p><input type='number' class='amount'><button id='buy-btn' onclick='buy(0, 0)'>+</button><button id='sell-btn' onclick='sell(0, 0)'>-</button></</td>" + "</tr>";
      injectTxt += "</tbody></table>"
      document.getElementById("crypto_results").innerHTML = jsonreply['data'][input_val]["quote"]["USD"]["price"];
		}
	}
}

document.getElementById('btn').addEventListener('click', clicked);
