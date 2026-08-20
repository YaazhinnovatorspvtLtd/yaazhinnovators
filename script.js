// ==========================================
// GOOGLE APPS SCRIPT WEB APP URL
// ==========================================

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBRhcxEtLTTZfvVFGqI8iSabwEmgwtrwV2zBw3ZL9WB_D3faz3HDFQ1Zhik7tswNWH2A/exec";


// ==========================================
// REGISTRATION MODAL
// ==========================================

const registrationModal =
    document.getElementById("registrationModal");

const registrationType =
    document.getElementById("registrationType");

const formTitle =
    document.getElementById("formTitle");


function openForm(type) {

    registrationModal.style.display = "flex";

    registrationType.value = type;

    const titles = {
        seminar: "Seminar Registration",
        webinar: "Webinar Registration",
        internship: "Internship Registration",
        project: "Project Registration"
    };

    formTitle.textContent =
        titles[type] || "Program Registration";

    document.body.style.overflow = "hidden";
}


function closeForm() {

    registrationModal.style.display = "none";

    document.body.style.overflow = "auto";
}


// Close modal by clicking outside

window.addEventListener("click", function(event) {

    if (event.target === registrationModal) {
        closeForm();
    }

});


// ==========================================
// REGISTRATION FORM → GOOGLE SHEETS
// ==========================================

const registrationForm =
    document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const message =
        document.getElementById("registrationMessage");

    const submitButton =
        registrationForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const formData =
        new FormData(registrationForm);

    const data = {

        type: registrationType.value,

        name: formData.get("name"),

        designation: formData.get("designation"),

        department: formData.get("department"),

        purpose: formData.get("purpose"),

        phone: formData.get("phone"),

        email: formData.get("email")

    };


    try {

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(data)

        });


        message.textContent =
            "✓ Registration submitted successfully!";

        registrationForm.reset();

    }

    catch (error) {

        message.textContent =
            "Something went wrong. Please try again.";

        console.error(error);

    }


    submitButton.disabled = false;
    submitButton.textContent = "Submit Registration";

});


// ==========================================
// ENQUIRY FORM → GOOGLE SHEETS
// ==========================================

const enquiryForm =
    document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const message =
        document.getElementById("enquiryMessage");

    const submitButton =
        enquiryForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";


    const formData =
        new FormData(enquiryForm);


    const data = {

        type: "enquiry",

        name: formData.get("name"),

        phone: formData.get("phone"),

        email: formData.get("email"),

        purpose: formData.get("purpose")

    };


    try {

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(data)

        });


        message.textContent =
            "✓ Thank you! Your enquiry has been submitted.";

        enquiryForm.reset();

    }

    catch (error) {

        message.textContent =
            "Something went wrong. Please try again.";

        console.error(error);

    }


    submitButton.disabled = false;
    submitButton.textContent = "Send Enquiry";

});