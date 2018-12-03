function clicked(){
	var input_val = document.getElementById("stock_search").value;
	var getList = new XMLHttpRequest();
	getList.open("GET","https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + input_val + "&apikey=WGHIGI9CMU30FNH9");
	getList.send();
	var injectTxt = "";
	var pullout = "";
	getList.onreadystatechange = function(){
		if (getList.readyState === 4 && getList.status === 200){
			var jsonreply = JSON.parse(getList.responseText);
			injectTxt += "<table><thead><tr class=table100-head><th class=column1> Name </th><th class=column2> Symbol </th><th class=column2> Price </th><th class=column2> Daily High</th></tr><tbody>";

			var getSome = new XMLHttpRequest();
			getSome.open("GET", "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +jsonreply.bestMatches[0]['1. symbol']+"&apikey=PAUQOECBIB4WSOV9");
			getSome.send();
			getSome.onreadystatechange = function(){
				if (getSome.readyState === 4 && getSome.status === 200){
					var jsonreply1 = JSON.parse(getSome.responseText);
					var price = jsonreply1['Global Quote']['05. price'];
					var high = jsonreply1['Global Quote']['03. high'];
					var name = jsonreply.bestMatches[0]['2. name'];
					var sym = jsonreply.bestMatches[0]['1. symbol'];
					injectTxt += "<tr><td class=column1>" + name + "</td><td class=column2> " + sym + "</td><td class=column2>"+ price + "</td><td class=column2>" + high + "</tr>";

					var getNext = new XMLHttpRequest();
					getNext.open("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +jsonreply.bestMatches[1]['1. symbol']+"&apikey=PAUQOECBIB4WSOV9");
					getNext.send();
					getNext.onreadystatechange = function(){
						if (getNext.readyState === 4 && getNext.status === 200){
							var jsonreply2 = JSON.parse(getNext.responseText);
							var price = jsonreply2['Global Quote']['05. price'];
							var name = jsonreply.bestMatches[1]['2. name'];
							var sym = jsonreply.bestMatches[1]['1. symbol'];
							injectTxt += "<tr><td class=column1>" + name + "</td><td class=column2> " + sym + "</td><td>"+ price + "</td></tr>";


							var getNext1 = new XMLHttpRequest();
							getNext1.open("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +jsonreply.bestMatches[2]['1. symbol']+"&apikey=PAUQOECBIB4WSOV9");
							getNext1.send();
							getNext1.onreadystatechange = function(){
								if (getNext1.readyState === 4 && getNext1.status === 200){
									var jsonreply3 = JSON.parse(getNext1.responseText);
									var price = jsonreply3['Global Quote']['05. price'];
									var name = jsonreply.bestMatches[2]['2. name'];
									var sym = jsonreply.bestMatches[2]['1. symbol'];
									injectTxt += "<tr><td class=column1>" + name + "</td><td class=column2> " + sym + "</td><td>"+ price + "</td></tr>";

									var getNext2 = new XMLHttpRequest();
									getNext2.open("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +jsonreply.bestMatches[3]['1. symbol']+"&apikey=WGHIGI9CMU30FNH9");
									getNext2.send();
									getNext2.onreadystatechange = function(){
										if (getNext2.readyState === 4 && getNext2.status === 200){
											var jsonreply4 = JSON.parse(getNext2.responseText);
											var price = jsonreply4['Global Quote']['05. price'];
											var name = jsonreply.bestMatches[3]['2. name'];
											var sym = jsonreply.bestMatches[3]['1. symbol'];
											injectTxt += "<tr><td class=column1>" + name + "</td><td class=column2> " + sym + "</td><td>"+ price + "</td></tr>";

											var getNext3 = new XMLHttpRequest();
											getNext3.open("GET","https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +jsonreply.bestMatches[4]['1. symbol']+"&apikey=2VJVA192H4TZ27VD");
											getNext3.send();
											getNext3.onreadystatechange = function(){
												if (getNext3.readyState === 4 && getNext3.status === 200){
													var jsonreply5 = JSON.parse(getNext3.responseText);
													//var price = jsonreply5['Global Quote']['05. price'];
													var name = jsonreply.bestMatches[4]['2. name'];
													var sym = jsonreply.bestMatches[4]['1. symbol'];
													injectTxt += "<tr><td class=column1>" + name + "</td><td class=column2> " + sym + "</td><td>"+ price + "</td></tr>";



													injectTxt += "</tbody></table>"
													document.getElementById("stock_results").innerHTML = injectTxt;
								
												}
											}

										}
									}

								}
									
							}							


						}
					}

				}
			}


		}
	}
	



}

document.getElementById('btn').addEventListener('click', clicked);