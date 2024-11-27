
function max_size(input) {
    const max = 2 * 1024 * 1024; // 2 MB in bytes
    const file = input.files[0]; // ensures if multiple files, index 0 is need

    if (file) {
        if (file.size > max) {
            alert("Maximum limit is 2MB.");
            console.log("File size exceeds 3MB limit.");
            // let x =document.getElementsByClassName(".device-label").value;
            // console.log(x)

        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Only JPG, JPEG, SVG, and PNG are allowed.");
            console.log("Invalid file type:", file.type);

            input.value = ""; // Clear the input if type is invalid
        }
    }
}

function n(input) {
    console.clear();
    const username = document.getElementById("Username").value
    console.log("Username By ID:", username); 
    const querySelector = document.querySelector("#Username").value;
    console.log("Username By querySelector:", querySelector);
}

function mail(input) {
    console.clear();
    const emailByClass = document.getElementsByClassName("m")[0].value;
    console.log("class:", emailByClass);
    const QuerySelector = document.querySelector(".m").value;
    console.log("querySelector:", QuerySelector);
}


function xx() {  
    let errorMessage = "";
    const x = document.querySelectorAll(".x"); 
    console.clear();
    const username = document.getElementById("UserName").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!username || !password) {
        if (!username) errorMessage += "Please enter your username.\n";
        if (!password) errorMessage += "Please enter your password.\n";
        alert(errorMessage);
    } else { alert("Login successful!");}


    // Log the values of each input field
    x.forEach((val, i) => {
        console.log(`Values by QuerySelectorAll ${i + 1}:`, val.value);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        let errorMessage = "";

        // Check if any of the required fields are empty
        const username = document.getElementById("Username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const date = document.getElementById("date").value.trim();
        const file = document.getElementById("fileload").files.length;
        const gender = document.querySelector("input[name='Gender']:checked");
        const terms = document.getElementById("terms").checked;

        // Using OR condition to check for empty fields
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
            event.preventDefault();
        
        }
        sessionStorage.setItem("Username",username);
        sessionStorage.setItem("Email", email);
        sessionStorage.setItem("Password",password);
        sessionStorage.setItem("Date",date);
        sessionStorage.setItem("Gender", gender.value);
        sessionStorage.setItem("Terms", terms);
        localStorage.setItem("Username",username);
        localStorage.setItem("Email", email);
        localStorage.setItem("Password",password);
        localStorage.setItem("Date",date);
        localStorage.setItem("Gender", gender.value);
        localStorage.setItem("Terms", terms);
        alert("Form data has been saved to sessionStorage, localStorage, and cookies!");
        console.log("sessionStorage:", sessionStorage.getItem("User Id"), sessionStorage.getItem("Password"));
        console.log("localStorage:", localStorage.getItem("User Id"), localStorage.getItem("Password"));


    });
});
function storage() {
    // event.preventDefault();

    var id = document.getElementById("UserName").value;
    var password = document.getElementById("password").value;
    sessionStorage.setItem("User Id", id);
    sessionStorage.setItem("Password", password);
    localStorage.setItem("User Id", id);
    localStorage.setItem("Password", password);
    document.cookie = `User ID=${id}; path=/;  SameSite=Lax`;
    document.cookie = `Password=${password}; path=/;  SameSite=Lax`;
    alert("Form data has been saved to sessionStorage, localStorage, and cookies!");
    console.log("sessionStorage:", sessionStorage.getItem("User Id"), sessionStorage.getItem("Password"));
    console.log("localStorage:", localStorage.getItem("User Id"), localStorage.getItem("Password"));

}

