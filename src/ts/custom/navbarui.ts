


export default class NavigationBarUI {
    // close nav bar html button element
    private _navTogglerClose: HTMLButtonElement;

    // button that will open the nav bar
    private _navTogglerOpen: HTMLButtonElement;

    // the div that contains the links
    private _navLinksContainer: HTMLDivElement;

     // creating container for css class names
    private _navHiddenClass: string = "hidden";



    constructor(){
        // getting the navigation bar elements
        this._navTogglerClose = document.querySelector( 'nav #nav-toggler-close' ) as HTMLButtonElement;

        this._navTogglerOpen = document.querySelector( 'nav #nav-toggler-open' ) as HTMLButtonElement;

        this._navLinksContainer = document.querySelector( 'nav #nav-links-container' ) as HTMLDivElement;
    }

    set navTogglerClose(cssPath:string){
        const selector = document.querySelector(cssPath);
        if( selector ){
            this._navTogglerClose = selector as HTMLButtonElement;
        }else{
            throw new Error( 'The css path provided for the close navigation button is invalid' );
        }
    }

    get navTogglerClose(): HTMLButtonElement{
        return this._navTogglerClose;
    }

    set navTogglerOpen(cssPath:string){
        const selector = document.querySelector(cssPath);
        if( selector ){
            this._navTogglerOpen = selector as HTMLButtonElement;
        }else{
            throw new Error( 'The css path provided for the open navigation button is invalid' );
        }
    }

    get navTogglerOpen(): HTMLButtonElement{
        return this._navTogglerOpen;
    }

    set navLinksContainer(cssPath:string){
        const selector = document.querySelector(cssPath);
        if( selector ){
            this._navLinksContainer = selector as HTMLDivElement;
        }else{
            throw new Error( 'The css path provided for the navigation links container is invalid' );
        }
    }

    get navLinksContainer(): HTMLDivElement{
        return this._navLinksContainer;
    }

    get navHiddenClass(): string{
        return this._navHiddenClass;
    }

    set navHiddenClass(cssClass:string){
        this._navHiddenClass = cssClass;
    }

    initialize = () => {
        /**
         * This function will initialize the navigation ui
         * elements by binding the modal ui navigation elements
         */

        // binding the open naviation button tp a click event
        this.getNavigationOpenButton().addEventListener( 'click', event => {
            // prevent default
            event.preventDefault();

            this.openNavigation();
        });

        // binding the close navigation button to a clcick event
        this.getNavigationCloseButton().addEventListener( 'click', event => {
            // prevent defualt
            event.preventDefault();

            this.closeNavigation();
        });

        // binding the on resize event to the window
        window.addEventListener( 'resize', event => {
            // prevent default
            event.preventDefault();

            // checking if the navigation bar is open
            if( !this.getNavigationLinksContainer().classList.contains( this.navHiddenClass ) ){
                // closing the navigation bar
                this.closeNavigation();
            }
        });

    };

    getNavigationCloseButton = (  ) => {
        /**
         * this function is going to get the 
         * button that closes the navigation on 
         * small devices
         * 
         * (Result)
         * return: the close navigation button
         */

        return this.navTogglerClose;
    }

    getNavigationOpenButton = (  ) => {
        /**
         * this function will get the button that opens
         * the navigation 
         * 
         * (Result)
         * return: the button that opens the navigation
         */

        return this.navTogglerOpen;
    }

    getNavigationLinksContainer = (  ) => {
        /**
         * this function will get the contianer that
         * contains thenavigation links
         * 
         (Result)
         return: the element that contains the navigation links
         * 
         */

         return this.navLinksContainer;
    }

    getSignUpButton = (  ) => {
        /**
         * this fubnction gets the button that
         * will display the signup modal
         * 
         * (Result)
         * return: the button that will display the signup modal
         */

        return document.querySelector( 'nav #popup-signup' );
    }

    getLoginButton = (  ) => {
        /**
         * this function gets the button that
         * will display the login modal
         * 
         * (Result)
         * return: the button that will display the login modal
         */

        return document.querySelector( 'nav #popup-login' );
    }

    getCreateAdminButton = (  ) => {
        /**
         * this function gets the button that
         * will display the createadmin modal
         * 
         * (Result)
         * return: the button that will display the createadmin modal
         */

        return document.querySelector( 'nav #popup-createadmin' );
    }

    getLogOutButton = (  ) => {
        /**
         * this function gets the button that
         * will logout the user
         * 
         * (Result)
         * return: the button that will logout user
         */

        return document.querySelector( 'nav #logout' );
    }

    closeNavigation = () => { 
        /**
         * this function will handle closing the
         * navigatoin bar
         */
        // removing the close navigation button
        this.getNavigationCloseButton().classList.add(this.navHiddenClass);

        // displaying the open navigation button
        this.getNavigationOpenButton().classList.remove(this.navHiddenClass);

        // removing the navigation links
        this.getNavigationLinksContainer().classList.add(this.navHiddenClass);
    }

    openNavigation = () => {
        /**
         * this function will handle opening the
         * navigation bar
         */

        // removing the open navigation button
        this.getNavigationOpenButton().classList.add(this.navHiddenClass);

        // displaying the close navigation button
        this.getNavigationCloseButton().classList.remove(this.navHiddenClass);

        // displaying the navigation links
        this.getNavigationLinksContainer().classList.remove(this.navHiddenClass);
    }
};

