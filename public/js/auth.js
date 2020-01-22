const googleButton = document.getElementById('googleSignUpButton');
googleButton.addEventListener('click', googleSignin);

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    firebase.auth()

        .signInWithPopup(provider).then(function (result) {
            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                $.getJSON('http://localhost:3000/verifytoken/' + idToken, function (result) {
                    console.log(result);
                });
            });
            var user = result.user;
            // window.location.href = "/";
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
}