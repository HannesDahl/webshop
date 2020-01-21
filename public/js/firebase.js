let firebaseConfig = {
    apiKey: "AIzaSyAidsNoTnXnCoz6RcZjOsJGkYXhC98GSoA",
    authDomain: "webshop-b7847.firebaseapp.com",
    databaseURL: "https://webshop-b7847.firebaseio.com",
    projectId: "webshop-b7847",
    storageBucket: "webshop-b7847.appspot.com",
    messagingSenderId: "137923746002",
    appId: "1:137923746002:web:c98499d500aa815dbcb50b",
    measurementId: "G-K7Z82KTJ66"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid)
        console.log(user)
    }
})