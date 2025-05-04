document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector(".sign-up form");
    const signInForm = document.querySelector(".sign-in form");

    // Handle Sign Up
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = signUpForm.querySelector("input[placeholder='Name']").value;
        const email = signUpForm.querySelector("input[placeholder='Email']").value;
        const password = signUpForm.querySelector("input[placeholder='Password']").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the email is already registered
        const existingUser = users.find(user => user.email === email);
        
        if (existingUser) {
            alert("Email is already registered!");
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully!");
        window.location.href = "login.html";  // Redirect to login
    });

    // Handle Sign In
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = signInForm.querySelector("input[placeholder='Email']").value;
        const password = signInForm.querySelector("input[placeholder='Password']").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            // Store logged-in user info
            localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

            alert(`Welcome ${matchedUser.name}!`);
            
            // Redirect to their personal homepage
            window.location.href = "homepage.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
