document.getElementById("registerForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let message = document.getElementById("message");

    if (password !== confirmPassword) {

        message.innerHTML = "❌ Passwords do not match.";
        message.style.color = "red";

        return;
    }

    // Save user details
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    message.innerHTML = "✅ Account created successfully!";
    message.style.color = "green";

    setTimeout(function() {

        window.location.href = "login.html";

    }, 1000);

});