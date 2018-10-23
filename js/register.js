function goToHomePage() {
	setTimeout(function() { window.location ="home.html"; }, 1000);
}

function userInputError(errorMessage) {
	var inputError = document.getElementById("error");
	inputError.innerHTML = errorMessage;
	inputError.style.display = "block";
}

function checkBalanceInput(input) {
	if(input ? true : false) {
		console.log(typeof input);
		if(Number(input) < 0) {
			userInputError("Please input a balance greater than zero.");
			return false;
		} else {
			return true;
		}
	}
	userInputError("Please input a correct balance.");
	return false
} 

function saveBalance(balance) {
	numbVal = Number(balance);
	var uid = firebase.auth().currentUser.uid;
	firestore.collection("users").doc("portfolios").set({
		[uid] : {
			Balance : numbVal
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

function accountSetup() {
	// initializeBalance("balance");
	var balance = Number(document.getElementById("balance").value);
	if(!checkBalanceInput(balance)) {
		return;
	} 
	saveBalance(balance);
	goToHomePage();
}

function register() {

	var email = document.getElementById("email").value;
	var password_one = document.getElementById("pwd_one").value;
	var password = document.getElementById("pwd_two").value;
	var balance = document.getElementById("balance").value;
	console.log(balance);
	if(email == "") {
		userInputError("Please input an email address.");
		return;
	} else if(password_one == "") {
		userInputError("Please fill out the first password field.");
		return;
	} else if(password == "") {
		userInputError("Please fill out the second password field.");
		return;
	} else if(password_one != password) {
		userInputError("Both passwords must be identical.");
		return;
	} else if(!checkBalanceInput(balance)) {
		return;
	}

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function() {
		saveBalance(balance);
		goToHomePage();
	})
	.catch(function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	userInputError(errorMessage);

	});

}