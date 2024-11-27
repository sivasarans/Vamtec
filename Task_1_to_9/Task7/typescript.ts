function fileValidation(input: HTMLInputElement):void {
    const max:number = 2 * 1024 * 1024; // 2 MB in bytes
    const file: File | null = input.files?.[0] || null;// ensures if multiple files, index 0 is need
    if (file) {
        if (file.size > max) {
            alert("Maximum limit is 2MB.");
            console.log("File size exceeds 2MB limit.");
        }
        const allowedTypes :string[]=['image/jpeg', 'image/png', 'image/svg+xml'];
        if (allowedTypes.indexOf(file.type) === -1) {
            alert("Invalid file type. Only JPG, JPEG, SVG, and PNG are allowed.");
            console.log("Invalid file type:", file.type);

            input.value = ""; // Clear the input if type is invalid
        }
    }
}

function loginValidateandStorage(): void {   // no problem, if multiple js files have same func name , it shows (problems)
    let errorMessage: string = "";
    const x: NodeListOf<HTMLInputElement> = document.querySelectorAll(".x"); 
    console.clear();
    const username: string = (document.getElementById("UserName") as HTMLInputElement).value.trim(); //also use : querySelector("#Username")
    const login_password: string = (document.getElementById("password") as HTMLInputElement).value.trim();
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
    x.forEach((val, i) => {
        console.log(`Values by QuerySelectorAll ${i + 1}:`, (val as HTMLInputElement).value);
    });
}


const registrationForm = document.getElementById("RegistervalidateAndStorage") as HTMLFormElement | null;
console.log(registrationForm);

if (registrationForm !== null) {
    registrationForm.addEventListener("submit", function (q:Event) {
    q.preventDefault(); 
    console.log(q);
    let errorMessage:string = "";
    const username = (document.getElementById("Username") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
    const date = (document.getElementById("date") as HTMLInputElement).value.trim();
    const file = (document.getElementById("fileload") as HTMLInputElement).files?.length || 0;
    const gender = (document.querySelector("input[name='Gender']:checked") as HTMLInputElement | null);
    const terms :boolean= (document.getElementById("terms") as HTMLInputElement).checked;

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
    sessionStorage.setItem("Terms", String(terms));
    localStorage.setItem("Username", username);
    localStorage.setItem("Email", email);
    localStorage.setItem("Password", password);
    localStorage.setItem("Date", date);
    localStorage.setItem("Gender", gender.value);
    localStorage.setItem("Terms", String(terms));
    document.cookie = `Username=${username};`;
    document.cookie = `Email=${email};`;
    document.cookie = `Password=${password};`;
    document.cookie = `Date=${date};`;
    document.cookie = `Gender=${gender.value};`;
    document.cookie = `Terms=${terms};`;

    alert("Form data has been saved to sessionStorage and localStorage!");
    console.log("sessionStorage:", sessionStorage.getItem("Username"), sessionStorage.getItem("Password"));
    console.log("localStorage:", localStorage.getItem("Username"), localStorage.getItem("Password"));
    console.log("Cookies:", document.cookie);
});
}