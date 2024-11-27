// alert("hi")   // check linked successfully
async function handleSubmit(event) {
    event.preventDefault();
    
    // Get values from new IDs
    var userId = document.getElementById("x").value;
    var password = document.getElementById("y").value;

    // Store data asynchronously in sessionStorage
    await sessionStorage.setItem("userId", userId);
    await sessionStorage.setItem("password", password);

    // Store data asynchronously in localStorage
    await localStorage.setItem("userId", userId);
    await localStorage.setItem("password", password);

    // Clear form fields
    document.getElementById("x").value = '';
    document.getElementById("y").value = '';

    alert("Form data has been saved to sessionStorage and localStorage!");
}

// Attach event listener to the form
document.getElementById("loginForm").addEventListener("submit", handleSubmit);


