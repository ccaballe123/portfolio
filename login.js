function login() {

	var email = document.getElementById("email").value;
	var password = document.getElementById("pwd").value;

	// Sign in existing user
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	   // Handle errors
	   	var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		if(errorCode == 'auth/user-not-found') {
			alert("User does not exist");
		} else if(errorCode == 'auth/invalid-email') {
			alert("Email is invalid");
		} else if(errorCode =='auth/wrong-password') {
			alert("Incorrect Password");
		}

	});

}
