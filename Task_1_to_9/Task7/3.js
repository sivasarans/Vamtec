function fileValidation(input) {
    var _a;
    var max = 2 * 1024 * 1024; // 2 MB in bytes
    var file = ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) || null; // ensures if multiple files, index 0 is need
    if (file) {
        if (file.size > max) {
            alert("Maximum limit is 2MB.");
            console.log("File size exceeds 2MB limit.");
        }
        var allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (allowedTypes.indexOf(file.type) === -1) {
            alert("Invalid file type. Only JPG, JPEG, SVG, and PNG are allowed.");
            console.log("Invalid file type:", file.type);
            input.value = ""; // Clear the input if type is invalid
        }}}
function loginValidateandStorage() {
    var errorMessage = "";
    var x = document.querySelectorAll(".x");
    console.clear();
    var username = document.getElementById("UserName").value.trim(); //also use : querySelector("#Username")
    var login_password = document.getElementById("password").value.trim();
    if (!username || !login_password) {
        if (!username)
            errorMessage += "Please enter your username.\n";
        if (!login_password)
            errorMessage += "Please enter your password.\n";
        alert(errorMessage);
    }
    else { alert("Login successful!");    }
    sessionStorage.setItem("Login_ID", username);
    sessionStorage.setItem("Login_Password", login_password);
    localStorage.setItem("Login_ID", username);
    localStorage.setItem("Login_Password", login_password);
    document.cookie = "Login_ID=".concat(username, "; path=/;  SameSite=Lax");
    document.cookie = "Login_Password=".concat(login_password, "; path=/;  SameSite=Lax");
    alert("Form data has been saved to sessionStorage, localStorage, and cookies!");
    console.log("sessionStorage:", sessionStorage.getItem("Login_ID"), sessionStorage.getItem("Login_Password"));
    console.log("localStorage:", localStorage.getItem("Login_ID"), localStorage.getItem("Login_Password"));
    x.forEach(function (val, i) {
        console.log("Values by QuerySelectorAll ".concat(i + 1, ":"), val.value);
    });
}


var registrationForm = document.getElementById("RegistervalidateAndStorage");
console.log(registrationForm);
if (registrationForm !== null) {
    registrationForm.addEventListener("submit", function (q) {
        var _a;
        q.preventDefault();
        console.log(q);
        var errorMessage = "";
        var username = document.getElementById("Username").value.trim();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();
        var date = document.getElementById("date").value.trim();
        var file = ((_a = document.getElementById("fileload").files) === null || _a === void 0 ? void 0 : _a.length) || 0;
        var gender = document.querySelector("input[name='Gender']:checked");
        var terms = document.getElementById("terms").checked;
        if (!username || !email || !password || !date || file === 0 || !gender || !terms) {
            if (!username)
                errorMessage += "Please enter your username.\n";
            if (!email)
                errorMessage += "Please enter your email.\n";
            if (!password)
                errorMessage += "Please enter your password.\n";
            if (!date)
                errorMessage += "Please select a date.\n";
            if (file === 0)
                errorMessage += "Please upload a file.\n";
            if (!gender)
                errorMessage += "Please select your gender.\n";
            if (!terms)
                errorMessage += "You must agree to the terms and conditions.\n";
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
        sessionStorage.setItem("Terms", String(terms));
        localStorage.setItem("Username", username);
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
        localStorage.setItem("Date", date);
        localStorage.setItem("Gender", gender.value);
        localStorage.setItem("Terms", String(terms));
        document.cookie = "Username=".concat(username, ";");
        document.cookie = "Email=".concat(email, ";");
        document.cookie = "Password=".concat(password, ";");
        document.cookie = "Date=".concat(date, ";");
        document.cookie = "Gender=".concat(gender.value, ";");
        document.cookie = "Terms=".concat(terms, ";");
        alert("Form data has been saved to sessionStorage and localStorage!");
        app.add();
        console.log("sessionStorage:", sessionStorage.getItem("Username"), sessionStorage.getItem("Password"));
        console.log("localStorage:", localStorage.getItem("Username"), localStorage.getItem("Password"));
        console.log("Cookies:", document.cookie);
    });
}