// --- Interactive Greeting ---
window.onload = function () {
    const visitorName = prompt("Welcome to CampusGuide! What is your name?", "Guest");
    if (visitorName) {
        alert("Hello " + visitorName + "! Please fill out our registration form carefully.");
    }
};

document.getElementById("contactForm").addEventListener("submit", function (e) {

    // --- Full Name ---
    const fullname = document.getElementById("fullname").value.trim();
    const namePattern = /^[A-Za-z\s]+$/;

    if (fullname.length < 5) {
        alert("Full name must contain at least 5 characters.");
        e.preventDefault();
        return;
    }

    if (!namePattern.test(fullname)) {
        alert("Full name must contain only letters and spaces.");
        e.preventDefault();
        return;
    }

    // --- Email ---
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@e-uvt\.ro$/;

    if (!emailPattern.test(email)) {
        alert("Email must be valid and end with @e-uvt.ro");
        e.preventDefault();
        return;
    }

    // --- Phone  ---
    const phone = document.getElementById("phone").value.trim();
    const phonePattern = /^\d{10}$/;

    if (phone !== "" && !phonePattern.test(phone)) {
        alert("Phone number must contain exactly 10 digits.");
        e.preventDefault();
        return;
    }

    // --- Subject ---
    const subject = document.getElementById("subject").value;
    if (subject === "") {
        alert("Please select a subject.");
        e.preventDefault();
        return;
    }

    // --- Message ---
    const message = document.getElementById("message").value.trim();

    if (message === "") {
        alert("Message cannot be empty.");
        e.preventDefault();
        return;
    }

    // --- Radio buttons ---
    const radios = document.querySelectorAll('input[name="source"]');
    let radioSelected = false;

    radios.forEach(function (radio) {
        if (radio.checked) {
            radioSelected = true;
        }
    });

    if (!radioSelected) {
        alert("Please select how you heard about us.");
        e.preventDefault();
        return;
    }

    // --- Date of Birth (must be 18+) ---
    const dob = document.getElementById("dob").value;

    if (dob === "") {
        alert("Date of Birth is required.");
        e.preventDefault();
        return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const age18 = new Date(dobDate.getFullYear() + 18, dobDate.getMonth(), dobDate.getDate());

    if (today < age18) {
        alert("You must be at least 18 years old.");
        e.preventDefault();
        return;
    }

    // --- Age (18–60) ---
    const ageValue = document.getElementById("age").value;
    const age = parseInt(ageValue);

    if (isNaN(age) || age < 18 || age > 60) {
        alert("Age must be between 18 and 60.");
        e.preventDefault();
        return;
    }

    // --- Website URL (must start with https://) ---
    const website = document.getElementById("website").value.trim();

    if (website === "") {
        alert("Website URL is required.");
        e.preventDefault();
        return;
    }

    if (!website.startsWith("https://")) {
        alert("Website URL must start with https://");
        e.preventDefault();
        return;
    }

    // --- File Upload (.pdf or .docx, max 2MB) ---
    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a file.");
        e.preventDefault();
        return;
    }

    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
        alert("File must be a .pdf or .docx file.");
        e.preventDefault();
        return;
    }

    if (fileSize > maxSize) {
        alert("File size must not exceed 2MB.");
        e.preventDefault();
        return;
    }

    // --- Favourite Color ---
    const favColor = document.getElementById("favColor").value;

    if (favColor === "" || favColor === null) {
        alert("Please select a favourite color.");
        e.preventDefault();
        return;
    }

    // --- Final confirmation ---
    const confirmed = confirm("Are you sure you want to submit your registration?");

    if (!confirmed) {
        e.preventDefault();
    }

});
