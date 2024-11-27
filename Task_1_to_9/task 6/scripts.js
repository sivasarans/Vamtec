function fileValidation(input) {
    const max = 2 * 1024 * 1024; // 2 MB in bytes
    const file = input.files[0]; // ensures if multiple files, index 0 is need

    if (file) {
        if (file.size > max) {
            alert("Maximum limit is 2MB.");
            console.log("File size exceeds 3MB limit.");
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Only JPG, JPEG, SVG, and PNG are allowed.");
            console.log("Invalid file type:", file.type);

            input.value = ""; // Clear the input if type is invalid
        }
    }
}



function loginValidateandStorage() {  
    let errorMessage = "";
    const x = document.querySelectorAll(".x"); 
    console.clear();
    const username = document.getElementById("UserName").value.trim(); //also use : querySelector("#Username")
    const login_password = document.getElementById("password").value.trim();
    if (!username || !login_password) {
        if (!username) errorMessage += "Please enter your username.\n";
        if (!login_password) errorMessage += "Please enter your password.\n";
        alert(errorMessage);
    } else { alert("Login successful!");}
    sessionStorage.setItem("Login_ID", username);
    sessionStorage.setItem("Login_Password", login_password);
    localStorage.setItem("Login_ID", username);
    localStorage.setItem("Login_Password", login_password);
    document.cookie = `Login_ID=${username}; path=/;  SameSite=Lax`;
    document.cookie = `Login_Password=${login_password}; path=/;  SameSite=Lax`;
    alert("Form data has been saved to sessionStorage, localStorage, and cookies!");
    console.log("sessionStorage:", sessionStorage.getItem("Login_ID"), sessionStorage.getItem("Login_Password"));
    console.log("localStorage:", localStorage.getItem("Login_ID"), localStorage.getItem("Login_Password"));


    // Log the values of each input field
    x.forEach((val, i) => {
        console.log(`Values by QuerySelectorAll ${i + 1}:`, val.value);
    });
}

const registrationForm = document.getElementById("RegistervalidateAndStorage");
console.log(registrationForm);

if (registrationForm) {
    registrationForm.addEventListener("submit", function (q) {
    q.preventDefault(); 
    console.log(q);
    let errorMessage = "";
    const username = document.getElementById("Username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const date = document.getElementById("date").value.trim();
    const file = document.getElementById("fileload").files.length;
    const gender = document.querySelector("input[name='Gender']:checked");
    const terms = document.getElementById("terms").checked;

    if (!username || !email || !password || !date || file === 0 || !gender || !terms) {
        if (!username) errorMessage += "Please enter your username.\n";
        if (!email) errorMessage += "Please enter your email.\n";
        if (!password) errorMessage += "Please enter your password.\n";
        if (!date) errorMessage += "Please select a date.\n";
        if (file === 0) errorMessage += "Please upload a file.\n";
        if (!gender) errorMessage += "Please select your gender.\n";
        if (!terms) errorMessage += "You must agree to the terms and conditions.\n";

        // Prevent form submission and alert the user
        alert(errorMessage);
        return; // Stop further execution if there are errors
    }

    // Store data in sessionStorage and localStorage
    sessionStorage.setItem("Username", username);
    sessionStorage.setItem("Email", email);
    sessionStorage.setItem("Password", password);
    sessionStorage.setItem("Date", date);
    sessionStorage.setItem("Gender", gender.value);
    sessionStorage.setItem("Terms", terms);
    localStorage.setItem("Username", username);
    localStorage.setItem("Email", email);
    localStorage.setItem("Password", password);
    localStorage.setItem("Date", date);
    localStorage.setItem("Gender", gender.value);
    localStorage.setItem("Terms", terms);
    document.cookie = `Username=${username};`;
    document.cookie = `Email=${email};`;
    document.cookie = `Password=${password};`;
    document.cookie = `Date=${date};`;
    document.cookie = `Gender=${gender.value};`;
    document.cookie = `Terms=${terms};`;

    // setCookie("Username", username, 7); // 7 means days
    // setCookie("Email", email, 7);
    // setCookie("Password", password, 7);
    // setCookie("Date", date, 7);
    // setCookie("Gender", gender.value, 7);
    // setCookie("Terms", terms, 7);

    alert("Form data has been saved to sessionStorage and localStorage!");
    console.log("sessionStorage:", sessionStorage.getItem("Username"), sessionStorage.getItem("Password"));
    console.log("localStorage:", localStorage.getItem("Username"), localStorage.getItem("Password"));
    console.log("Cookies:", document.cookie);
});
}



