// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrDzfTfOMORIJ4xiOpCG_U63SnQAso278",
    authDomain: "travelly-d0dd6.firebaseapp.com",
    projectId: "travelly-d0dd6",
    storageBucket: "travelly-d0dd6.appspot.com",
    messagingSenderId: "580183778874",
    appId: "1:580183778874:web:85c9fe30808e74a2aa7703",
    measurementId: "G-J35903PET4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");

window.login = function (e) {
    e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (userCredential) {
        const user = userCredential.user;
        console.log(user.uid); // Access the user's UID
        alert("Log in successfully");
        
        // Redirect to tour.html after successful login
        window.location.href = "../tour.html";
    })
    .catch(function (error) {
        alert("Login error: " + error.message);
    });
console.log(obj);
}