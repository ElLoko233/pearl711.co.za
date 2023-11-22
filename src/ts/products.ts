// importing the navigation component
import NavigationBarUI from "./custom/navbarui";

// initializing the navigation component
const navbar = new NavigationBarUI();
navbar.initialize();

window.addEventListener("load", () => {
    // initializing the navigation component
    const navbar = new NavigationBarUI();
    navbar.initialize();


    // getting the search button element
    const searchButton : HTMLButtonElement = document.getElementById('searchButton') as HTMLButtonElement;
    const searchButtonCloseIcon : HTMLElement = document.getElementById("closeSearch") as HTMLElement;
    const searchButtonSearchIcon : HTMLElement = document.getElementById('searchIcon') as HTMLElement;

    // getting the filter button element
    const filterButton : HTMLButtonElement = document.getElementById('filterButton') as HTMLButtonElement;
    
    // getting the search form element
    const searchForm : HTMLFormElement = document.getElementById('searchForm') as HTMLFormElement;
    // getting the search input
    const searchInput : HTMLInputElement = searchForm["search-product"] as HTMLInputElement;

    // getting the filter form element
    const filterForm : HTMLFormElement = document.getElementById('filters') as HTMLFormElement;
    
    // binding the click event on the search button
    searchButton.addEventListener("click", ( event ) => {
        // diabling default
        event.preventDefault();
    
        // checking if the search form is hidden
        if( searchForm.classList.contains("hidden")){
            if( searchButtonCloseIcon && searchButtonSearchIcon ){
                // changing the button icon to close
                searchButtonCloseIcon.classList.remove('hidden');
                searchButtonSearchIcon.classList.add('hidden');
            }

            // removing the hidden class
            searchForm.classList.remove("hidden");
        }else{
            if( searchButtonCloseIcon && searchButtonSearchIcon ){
                // changing the button icon to search
                searchButtonCloseIcon.classList.add('hidden');
                searchButtonSearchIcon.classList.remove('hidden');

                // clearing the search input
                searchInput.value = "";
            }

            // adding the hidden class
            searchForm.classList.add("hidden");
        }
    });

    // binding the click event on the filter button
    filterButton.addEventListener("click", ( event ) => {
        // diabling default
        event.preventDefault();
    
        // checking if the search form is hidden
        if( filterForm.classList.contains("hidden")){
            // removing the hidden class
            filterForm.classList.remove("hidden");
        }else{
            // adding the hidden class
            filterForm.classList.add("hidden");

            // resetting the form'
            filterForm.reset();
        }
    });

    // binding the input search 
    searchForm.addEventListener('submit', (event) => {
        // preving the defaul
        event.preventDefault();

        // getting the value input
        const searchValue : string = searchInput.value;

        console.log('searchValue :>> ', searchValue);
    })

    //  binding the filter form submit
    filterForm.addEventListener('submit', (event) => {
        // preving the defaul
        event.preventDefault();

        // getting the form inputs
        const formInput: HTMLFormControlsCollection  = filterForm.elements;

        //  creating container for the checked checkboxes
        const checkedCheckboxes: Array<string> = [];

        // looping through the form inputs
        for (let index = 0; index < formInput.length; index++) {
            // getting the current input
            const input: HTMLInputElement = formInput[index] as HTMLInputElement;

            // checking if the input is a checkbox
            if( input.type === "checkbox" && input.checked ){
                // pushing the checkbox value to the checkedCheckboxes array
                checkedCheckboxes.push(input.value);
            }
        }

        console.log('checkedCheckboxes :>> ', checkedCheckboxes);
    })
});