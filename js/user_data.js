function getBalance() {
	firebase.auth().onAuthStateChanged(function(user) {
	if (user && user != null) {
		var uid = firebase.auth().currentUser.uid;
		console.log(uid);
		var docRef = firestore.collection("users").doc("portfolios");
		docRef.get().then(function(doc) {
			if(doc.exists) {
				var balance = (doc.data()[uid]["Balance"]) + "$";
				document.getElementById("user_balance").value = balance;
			} 
		});
	} 
	});
}


function buy(currency, row) {
	if(currency == 0) {
		currency = "Stock";
	} else {
		currency = "Crypto";
	}
	var uid = firebase.auth().currentUser.uid;
	var symbol = document.getElementsByClassName("symbol")[row].innerHTML;
	var amount = Number(document.getElementsByClassName("amount")[row].value);
	var price = document.getElementsByClassName("price")[row].innerHTML;
	// var uid = "3upnsBR1zeNhKR8OfPGVrYi6pz33";
	// var symbol = "AAPL";
	// var amount = 1;
	// var price = 184.4;
	var docRef = firestore.collection("users").doc("portfolios");
	docRef.get().then(function(doc) {
		if(doc.exists) {
			var currentBalance = Number((doc.data()[uid]["Balance"]));
			if((amount * price) > currentBalance) {
				var error = document.getElementsByClassName("error")[row];
				error.innerHTML = "*Your current balance is not enough to buy this amount.*";
				error.style.display = "block";
				return;
			}
			var newBalance = Number((doc.data()[uid]["Balance"])) - (amount * price);
			var portfolio = (doc.data()[uid][currency]);
			if(Object.keys(portfolio).includes(symbol)) {
				var currentAmount = portfolio[symbol];
				amount += currentAmount;
			} 

			firestore.collection("users").doc("portfolios").set({
			[uid] : {
				Balance : newBalance,
				[currency] : {
					[symbol] : amount
				}
			}
			}, { merge : true })
			.then(function() {
			    console.log("inserted data");
			    var error = document.getElementsByClassName("error")[row];
			    error.style.display = "none";
			})
			.catch(function(error) {
				console.log(error)
			    alert("Error adding document: ", error);
			});
		}
	})
}


function sell(currency, row) {
	if(currency == 0) {
		currency = "Stock";
	} else {
		currency = "Crypto";
	}
	var uid = firebase.auth().currentUser.uid;
	var symbol = document.getElementsByClassName("symbol")[row].innerHTML;
	var amount = Number(document.getElementsByClassName("amount")[row].value);
	var price = document.getElementsByClassName("price")[row].innerHTML;

	var docRef = firestore.collection("users").doc("portfolios");
	docRef.get().then(function(doc) {
		if(doc.exists) {
			var newBalance = Number((doc.data()[uid]["Balance"])) + (amount * price);

			var portfolio = (doc.data()[uid][currency]);
			if(Object.keys(portfolio).includes(symbol)) {
				var currentAmount = portfolio[symbol];
				if(amount > currentAmount) {
					var error = document.getElementsByClassName("error")[row];
					error.innerHTML = "*You can't sell more than you own.*";
					error.style.display = "block";
					return;
				} 
				amount = currentAmount - amount;

			} 



			if(amount == 0) {
				var deleteStr = uid + "." + currency + "." + symbol;
 				firestore.collection("users").doc("portfolios").update({[deleteStr] : FieldValue.delete()})
				return;
			} 

			firestore.collection("users").doc("portfolios").set({
			[uid] : {
				Balance : newBalance,
				[currency] : {
					[symbol] : amount
				}
			}
			}, { merge : true })
			.then(function() {
			    console.log("inserted data");
			    var error = document.getElementsByClassName("error")[row];
			    error.style.display = "none";
			})
			.catch(function(error) {
				console.log(error)
			    alert("Error adding document: ", error);
			});
		}
	})
}