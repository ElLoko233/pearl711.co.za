
// importing the code that fixes the form labels
import { fixingFormLabel } from "./custom/fixformlabelrelationship";

// getting the firbase components
import {
    auth,
}from "./firebaseComp";

import { onAuthStateChanged, getIdTokenResult, signInWithEmailAndPassword,signOut } from "firebase/auth";


window.addEventListener( 'load', event => {
    // fixing input and form relationship
    fixingFormLabel();

    // getting the cancle login button 
    const cancelLoginButton : HTMLInputElement = document.getElementById( 'login-cancel' ) as HTMLInputElement;

    // getting the login popup skeleton
    const loginPageSkeleton : HTMLElement = document.getElementById( 'login-popup-skeleton' ) as HTMLElement;

    // getting the login popup
    const loginPopup : HTMLElement = document.getElementById( 'login-popup' ) as HTMLElement;

    // getting the login button
    const loginButton : HTMLInputElement = document.getElementById( 'login-submit' ) as HTMLInputElement;

    // getting the login form
    const loginForm : HTMLFormElement = document.getElementById( 'login-form' ) as HTMLFormElement;

    // getting the hide login button
    const hideLoginPasswordButton : HTMLButtonElement = document.getElementById( 'hide-password' ) as HTMLButtonElement;

    // getting the unhide login button
    const unhideLoginPasswordButton : HTMLButtonElement = document.getElementById( 'unhide-password' ) as HTMLButtonElement;

    
    // binding the close login button to a click event
    cancelLoginButton.addEventListener( 'click', event => {
        // preventing the default behavour
        event.preventDefault();

        window.location.href = '/';
    } );

    // binding the unhide login password button to a click event
    unhideLoginPasswordButton.addEventListener( 'click', (event) => {
            // preventing the default bahaviour
            event.preventDefault();

            // getting a refernce to the login password field
            const loginpassword : HTMLInputElement = document.getElementById( unhideLoginPasswordButton.getAttribute('data-for') as string ) as HTMLInputElement;

            // changing the input type of the passwaord field
            loginpassword.setAttribute( "type", "text" );

            // hidding the unhide loginpassowrd button
            unhideLoginPasswordButton.classList.add( "hidden" );

            // unhidding the hide login password button
            hideLoginPasswordButton.classList.remove( "hidden" );
    });

    // binding the hide login password button to a click event
    hideLoginPasswordButton.addEventListener( 'click', (event) => {
            // preventing the default bahaviour
            event.preventDefault();

            // getting a refernce to the login password field
            const loginpassword : HTMLInputElement = document.getElementById( unhideLoginPasswordButton.getAttribute('data-for') as string ) as HTMLInputElement;
 
            // changing the input type of the passwaord field
            loginpassword.setAttribute( "type", "password" );

            // unhidding the unhide loginpassowrd button
            unhideLoginPasswordButton.classList.remove( "hidden" );

            // hidding the hide login password button
            hideLoginPasswordButton.classList.add( "hidden" );
    });

    // binding the login form button to submit event
    loginButton.addEventListener( 'click', async event => {
        // preventing the default behaviour
        event.preventDefault();
        
        try{
            // getting the login data from the form
            const email :string = loginForm['email'].value;
            const password :string = loginForm['password'].value;


            // requesting the user to be loged in 
            await signInWithEmailAndPassword( auth, email, password );
            
            // resseting the form
            loginForm.reset();

        }catch( error ){
            // displaying the error message
            console.log('error :>> ', error);
        }
    });

    // determining what to do after the user has submited valid credentials
    onAuthStateChanged( auth, async user => {
        if( user ){
            // displaying the login popup skeleton
            loginPageSkeleton.classList.add( 'hidden' );
                
            // hidding the login popup form
            loginPopup.classList.remove( 'hidden' );

            // getting the user id token
            const userToken = await getIdTokenResult( user );

            // checking if the user is an admin
            if( userToken.claims.email_verified ){
                // redirecting the user to the admin page
                window.location.href = './';
            }else{
                window.location.href = "/public";
            }        
        }else{
            // hiding the login popup skeleton
            loginPageSkeleton.classList.add( 'hidden' );
        
            // displaying the login popup form
            loginPopup.classList.remove( 'hidden' );
        }
    } );
});
