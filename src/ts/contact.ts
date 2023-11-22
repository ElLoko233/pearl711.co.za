// importing the navigation component
import NavigationBarUI from "./custom/navbarui";

// initializing the navigation component
const navbar = new NavigationBarUI();
navbar.initialize();

// getting the contact us form
const contactForm : HTMLFormElement = document.getElementById("contactForm") as HTMLFormElement;

// binding the submit event
contactForm.addEventListener("submit", (event) => {
    // preventing the default
    event.preventDefault();

    // owners email
    const PearlEmail : string= "pearl.services25@gmail.com"

    // getting the name
    const name: string  = contactForm["userName"].value;

    // getting the message
    const message : string = contactForm["msg"].value;

    // Construct the mailto link with the user's email and message
    var mailtoLink = `mailto:${PearlEmail}?subject=Contact%20Us%20(${name})&body=${message}`;

    // Open the default email client with the mailto link
    window.location.href = mailtoLink;
});