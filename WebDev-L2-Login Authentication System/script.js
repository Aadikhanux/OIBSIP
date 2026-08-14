const USERS_KEY = "authUsers";
const SESSION_KEY = "authSession";


/*
    Get all registered users
*/

function getUsers() {

    return JSON.parse(
        localStorage.getItem(USERS_KEY)
    ) || [];
}


/*
    Save users
*/

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


/*
    SHA-256 password hashing
*/

async function hashPassword(password) {

    const data = new TextEncoder().encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


/*
    Show message
*/

function showMessage(element, message, type) {

    element.textContent = message;
    element.className = `message ${type}`;
}


/*
    Registration
*/

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async event => {

        event.preventDefault();


        const username = document
            .getElementById("registerUsername")
            .value
            .trim();

        const email = document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("registerPassword")
            .value;

        const confirmPassword = document
            .getElementById("confirmPassword")
            .value;

        const message = document.getElementById(
            "registerMessage"
        );


        /*
            Basic validation
        */

        if (
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            showMessage(
                message,
                "Please fill in all fields.",
                "error"
            );

            return;
        }


        /*
            Username validation
        */

        if (username.length < 3) {

            showMessage(
                message,
                "Username must contain at least 3 characters.",
                "error"
            );

            return;
        }


        /*
            Password validation
        */

        const passwordPattern = /^(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {

            showMessage(
                message,
                "Password must be at least 8 characters and contain at least 1 number.",
                "error"
            );

            return;
        }


        /*
            Confirm password
        */

        if (password !== confirmPassword) {

            showMessage(
                message,
                "Passwords do not match.",
                "error"
            );

            return;
        }


        /*
            Get existing users
        */

        const users = getUsers();


        /*
            Duplicate check
        */

        const existingUser = users.find(user =>
            user.username.toLowerCase() === username.toLowerCase() ||
            user.email.toLowerCase() === email
        );

        if (existingUser) {

            showMessage(
                message,
                "Username or email is already registered.",
                "error"
            );

            return;
        }


        /*
            Hash password before storing
        */

        const passwordHash = await hashPassword(password);


        /*
            Create new user
        */

        const newUser = {
            id: Date.now(),
            username: username,
            email: email,
            passwordHash: passwordHash,
            createdAt: new Date().toISOString()
        };


        users.push(newUser);

        saveUsers(users);


        showMessage(
            message,
            "Account created successfully. Redirecting to login...",
            "success"
        );


        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);

    });
}


/*
    Login
*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async event => {

        event.preventDefault();


        const loginValue = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value;

        const message = document.getElementById(
            "loginMessage"
        );


        /*
            Empty field validation
        */

        if (loginValue === "" || password === "") {

            showMessage(
                message,
                "Please enter your username/email and password.",
                "error"
            );

            return;
        }


        /*
            Find user
        */

        const users = getUsers();

        const user = users.find(currentUser =>
            currentUser.username.toLowerCase() ===
                loginValue.toLowerCase() ||
            currentUser.email.toLowerCase() ===
                loginValue.toLowerCase()
        );


        /*
            Hash entered password
        */

        const passwordHash = await hashPassword(password);


        /*
            Check credentials

            Notice that the error message is intentionally
            generic and doesn't reveal whether the username
            or password was incorrect.
        */

        if (!user || user.passwordHash !== passwordHash) {

            showMessage(
                message,
                "Invalid username/email or password.",
                "error"
            );

            return;
        }


        /*
            Create login session
        */

        const session = {
            userId: user.id,
            username: user.username,
            loginTime: new Date().toISOString()
        };


        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );


        window.location.href = "dashboard.html";

    });
}


/*
    Protect dashboard
*/

if (
    window.location.pathname.endsWith("dashboard.html") ||
    window.location.pathname.endsWith("/dashboard.html")
) {

    const session = JSON.parse(
        localStorage.getItem(SESSION_KEY)
    );


    /*
        No session = redirect to login
    */

    if (!session || !session.userId || !session.username) {

        window.location.href = "index.html";

    } else {

        const users = getUsers();
        const currentUser = users.find(user => user.id === session.userId);

        if (!currentUser) {
            localStorage.removeItem(SESSION_KEY);
            window.location.href = "index.html";
        } else {
            const usernameElement = document.getElementById(
                "dashboardUsername"
            );

            if (usernameElement) {
                usernameElement.textContent = session.username;
            }
        }
    }
}


/*
    Logout
*/

const logoutButton = document.getElementById(
    "logoutButton"
);

if (logoutButton) {

    logoutButton.addEventListener("click", () => {

        localStorage.removeItem(SESSION_KEY);

        window.location.href = "index.html";

    });
}