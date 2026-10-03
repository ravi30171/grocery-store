document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let savedEmail = localStorage.getItem("userEmail");
    let savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {

        localStorage.setItem("loggedIn", "true");

        document.getElementById("message").innerHTML =
            "✅ Login successful! Opening FreshCart...";

        document.getElementById("message").style.color = "green";

        setTimeout(function() {
            window.location.href = "index.html";
        }, 1000);

    } else {

        document.getElementById("message").innerHTML =
            "❌ Incorrect email or password.";

        document.getElementById("message").style.color = "red";
    }

});