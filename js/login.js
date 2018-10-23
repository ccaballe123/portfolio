function registerBtn() {
	window.location = "register.html";
}

function userInputError(errorMessage) {
	var inputError = document.getElementById("error");
	inputError.innerHTML = errorMessage;
	inputError.style.display = "block";
}

function login() {

	var email = document.getElementById("email").value;
	var password = document.getElementById("pwd").value;

	// Sign in existing user
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function() {
		window.location ="home.html";
	})
	.catch(function(error) {
	   // Handle errors
	   	var errorCode = error.code;
		var errorMessage = error.message;

		if(email == '') {
			userInputError("Please input an email address");
		} else if(password =='') {
			userInputError("Please input a password");
		} else { 
			userInputError(errorMessage);
		}

	});
}


function googleLogin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				var docRef = firestore.collection("users").doc("portfolios");
				var keys = firestore.collection("users").doc("portfolios").get().then(function(doc) {
					if(doc) {
						var userExists = user.uid in doc.data();
						if(!userExists) {
							window.location="account_setup.html";
						} else {
							window.location="home.html";
						}
					} else {
						
					}
				})
			} else {
				
			}
		})
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;

		// ...
		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});

}
