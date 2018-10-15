/* Registers new user as well as creating a portfolio collection and storing their desired balance in the Cloud Firestore. */
function register() {

	var email = document.getElementById("email").value;
	var password_one = document.getElementById("pwd_one").value;
	var password = document.getElementById("pwd_two").value;
	var balance = document.getElementById("balance").value;

	if(password_one != password) {
		alert("Both passwords must be identical");
		return;
	}

	/* TO DO (?) Complexity requirements for passwords? Or just enable Google Authenticated Accounts? */


	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function() {
		var uid = firebase.auth().currentUser.uid;
		firestore.collection("users").doc("portfolios").set({
			[uid] : {
				Balance : balance
			}
		}, { merge : true })
		.then(function(docRef) {
		    alert("inserted data");
		})
		.catch(function(error) {
		    alert("Error adding document: ", error);
		});

		window.location = "index.html";
	})
	.catch(function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
	if(errorCode == 'auth/email-already-in-use') {
		alert("Email is in use!");
	} else if(errorCode == 'auth/invalid-email') {
		alert("Email is invalid");
	}

	});

}