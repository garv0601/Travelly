// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"; // Add sendEmailVerification
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; // Import database functions

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
const auth = getAuth(app);
const database = getDatabase(app); // Initialize the database

var name = document.getElementById("full_name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confpassword = document.getElementById("confPassword");
var mobile = document.getElementById("mobile");
// Add an event listener to the lock symbol icon
const passwordToggleIcon = document.getElementById("passwordToggle");
const passwordInput = document.getElementById("password");

passwordToggleIcon.addEventListener("click", () => {
    // Toggle the password field visibility
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggleIcon.name = "lock-open-outline"; // Change the icon to an open lock
    } else {
        passwordInput.type = "password";
        passwordToggleIcon.name = "lock-closed-outline"; // Change the icon to a closed lock
    }
});





window.signup = function (e) {
    e.preventDefault();
    var obj = {
        full_name: name.value,
        email: email.value,
        password: password.value,
        confpassword: confpassword.value,
        mobile: mobile.value,
    };

    // Check if password and confirm password match
    if (obj.password !== obj.confpassword) {
        alert("Passwords do not match.");
        password.value = ""; // Clear password field
        confpassword.value = ""; // Clear confirm password field
        return;
    }


      // Check if mobile number is exactly 10 digits and consists only of digits
    if (!/^\d{10}$/.test(obj.mobile)) {
        alert("Mobile number must be exactly 10 digits and consist only of digits.");
        mobile.value = ""; // Clear mobile number field
        return;
    }

    // Check if password meets complexity requirements
    if (!/^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(obj.password)) {
        alert("Password must contain at least one lowercase letter, one uppercase letter, one special character (@#$%^&+=), and one number.");
        password.value = ""; // Clear password field
        return;
    }


    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (userCredential) {
            const user = userCredential.user;
            alert("Signup Successfully");

            // Send email verification
            sendEmailVerification(auth.currentUser)
                .then(function () {
                    // Verification email sent.
                    window.location.href = "verify_email.html"; // Redirect to a new page
                })
                .catch(function (error) {
                    // An error occurred.
                    alert("Error sending verification email: " + error.message);
                });

            // Save user data to the database
            saveUserDataToDatabase(user.uid, obj.full_name, obj.email, obj.password,obj.mobile);
        })
        .catch(function (error) {
            alert("Error: " + error.message);
        });
    console.log(obj);
};

// Function to save user data to the database
function saveUserDataToDatabase(userId, fullName, userEmail,userpassword,userMobile) {
    const userRef = ref(database, `users/${userId}`);
    set(userRef, {
        full_name: fullName,
        email: userEmail,
        mobile: userMobile,
        password:userpassword
    })
        .then(() => {
            console.log("User data saved to the database.");
        })
        .catch((error) => {
            console.error("Error saving user data to the database:", error);
        });
}