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

function buy() {
	// var uid = firebase.auth().currentUser.uid;
	// var symbol = document.getElementById("symbol").innerHTML;
	// var amount = document.getElementById("amount").innerHTML;
	// var price = document.getElementById("price").innerHTML;
	var docRef = firestore.collection("users").doc("portfolios");
	docRef.get().then(function(doc) {
		if(doc.exists) {
			var currentBalance = Number((doc.data()[uid]["Balance"]));
			if((amount * price) > currentBalance) {
				var error = document.getElementById("error");
				error.innerHTML = "Your current balance is not enough to buy this amount.";
				error.style.display = "block";
				return;
			}
			var newBalance = Number((doc.data()[uid]["Balance"])) - (amount * price);
			var currentAmount = (doc.data()[uid][currency][symbol]);
			if(currentAmount != null) {
				console.log(currentAmount);
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
			})
			.catch(function(error) {
				console.log(error)
			    alert("Error adding document: ", error);
			});
		}
	})
}

function sell() {
	// var uid = firebase.auth().currentUser.uid;
	// var symbol = document.getElementById("symbol").innerHTML;
	// var amount = document.getElementById("amount").innerHTML;
	// var price = document.getElementById("price").innerHTML;
	var docRef = firestore.collection("users").doc("portfolios");
	docRef.get().then(function(doc) {
		if(doc.exists) {
			var newBalance = Number((doc.data()[uid]["Balance"])) + (amount * price);
			var currentAmount = (doc.data()[uid][currency][symbol]);
			if(currentAmount != null) {
				if(amount > currentAmount) {
					var error = document.getElementById("error");
					error.innerHTML = "You can't sell more than you own.";
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
			})
			.catch(function(error) {
				console.log(error)
			    alert("Error adding document: ", error);
			});
		}
	})
}