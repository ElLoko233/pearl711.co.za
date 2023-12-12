// getting the firebase compoents
import {
    auth,
    db,
    storage
}from "./firebaseComp";

import{ onAuthStateChanged, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

//  getting the nav bar class
import NavigationBarUI from "./custom/navbarui";

// importing the code that fixes the form labels
import { 
    fixingFormLabel
} from "./custom/fixformlabelrelationship";
import InventoryItemUIAdmin from "./inventorymanager/inventoryitemuiadmin";
import InventoryManager from "./inventorymanager/inventorymanger";
import { InventoryItem, InventoryMetadata } from "./inventorymanager/types/inventorytype";
import { FirebaseError } from "firebase/app";





window.addEventListener( 'DOMContentLoaded', async event => {
    
    // creating an instance of the navigation bar
    const navbarui = new NavigationBarUI(  );

    // creating a container for the subcritption
    let unsubscription: any;
    
    // fixing input and form relationship
    fixingFormLabel();
    
    // initalizing the navigation bar
    navbarui.initialize( );

    (navbarui.getLogOutButton() as HTMLButtonElement).addEventListener( 'click', async event => {
        // preventing default
        event.preventDefault();

        // signing out the user
        await auth.signOut();
    });

    const INVENTORYCOLLECTIONREF = '/Inventory Manager/inventory/inventory';
    const INVENTORYMANAGERREF = '/Inventory Manager';
    const METADATAID = 'metadata';
    const METADATACOLLECTIONREF = '/Inventory Manager/';
    
    // creating an instance of the inventory manager
    const inventoryManager = new InventoryManager<InventoryItem, InventoryMetadata>( db, INVENTORYCOLLECTIONREF, METADATACOLLECTIONREF );

    // creating a container for all the inventory items
    let inventoryItemsList: InventoryItemUIAdmin[] = []; 
    
    // getting the search form element
    const searchForm : HTMLFormElement = document.getElementById('searchForm') as HTMLFormElement;

    // getting the search input
    const searchInput : HTMLInputElement = searchForm["search-product"] as HTMLInputElement;

    // getting the filter button element
    const filterButton : HTMLButtonElement = document.getElementById('filterButton') as HTMLButtonElement;

    // getting the filter form element
    const filterForm : HTMLFormElement = document.getElementById('filters') as HTMLFormElement;

    // getting the form inventory items
    const inventoryItemsForm = document.getElementById( "productItems" ) as HTMLFormElement;

    // getting the remove item button
    const rmvItemButton = document.getElementById( "rmv-item" ) as HTMLButtonElement;

    // getting the create ew item button
    const createItemButton = document.getElementById( "create-new-item-button" ) as HTMLButtonElement;

    // getting the create new item popup
    const createNewItemPopup = document.getElementById( "createitem-popup" ) as HTMLElement;

    // getting the cancle create item button
    const createNewItemPopupCancelButton = document.getElementById( "createitem-cancel" ) as HTMLButtonElement;

    // getting the submit create new item button
    const createNewItemPopupSubmitButton = document.getElementById( "createitem-submit" ) as HTMLButtonElement;

    // getting the uplaod image input
    const uploadImageInput = document.getElementById( "createitem-image" ) as HTMLInputElement;

    // getting the create item form
    const createItemForm = document.getElementById( "createitem-form" ) as HTMLFormElement;

    // getting the image preview eleemtn
    const imagePreview : HTMLImageElement = document.getElementById( "createitem-image-preview" ) as HTMLImageElement;

    // getting the create item conatiner
    const createItemContainer = document.getElementById('createitem-container') as HTMLElement;

    // gettung the create item image error paragraph
    const createItemImageError = document.getElementById( "createitem-image-error" ) as HTMLParagraphElement;

    // bindng the submit button to a click event
    createNewItemPopupSubmitButton.addEventListener( 'click', async event => {
        // preventing default
        event.preventDefault();

        if( createNewItemPopupSubmitButton.disabled ){
            return;
        }

        // disabling the submit button
        createNewItemPopupSubmitButton.disabled = true;

        // adding a orange border to the create item container
        createItemContainer.classList.add('border-orange-500');
        createItemContainer.classList.add('border-4');

        // setting the createitemcontiert to pulse animation
        createItemContainer.classList.add('animate-pulse');

        // getting the create item image input
        const createItemImageInput = document.getElementById( "createitem-image" ) as HTMLInputElement;

        

        // verifying that the image is not empty
        if( ((createItemImageInput.files as FileList).length === 0) ){
            // showing the error
            imagePreview.classList.add('border-red-500');
            imagePreview.classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');

            // unhidding the create item image error
            createItemImageError.classList.remove('hidden');

            // adding the error message
            createItemImageError.innerText = "Please select an image";

            // returning out of the function
            return;
        }

        let img = new Image();

        img.onload = function () {
            const w = img.width;
            const h = img.height;

            if( !((w > 400 && w < 500) && (h > 400 && h < 500)) ){
                // showing the error
                imagePreview.classList.add('border-red-500');
                imagePreview.classList.add('border-4');

                // enabling the submit button
                createNewItemPopupSubmitButton.disabled = false;

                // remoinve a orange border to the create item container
                createItemContainer.classList.remove('border-orange-500');
                createItemContainer.classList.remove('border-4');

                // remove the createitemcontiert to pulse animation
                createItemContainer.classList.remove('animate-pulse');

                // unhidding the create item image error
                createItemImageError.classList.remove('hidden');

                // adding the error message
                createItemImageError.innerText = "Please select an image with a width and height between 400px and 500px";

                // returning out of the function
                return;
            }else{
                // showing the error
                imagePreview.classList.remove('border-red-500');
                imagePreview.classList.remove('border-4');

                // removing the error
                createItemImageError.classList.add('hidden');

                // error message
                createItemImageError.innerText = "";

                // valid styles
                imagePreview.classList.add('border-green-500');
                imagePreview.classList.add('border-4');
            }
        };
        
        // Set the image source to the selected file
        img.src = URL.createObjectURL( (createItemImageInput.files as FileList)[0]);

        // getting the create item name input
        const itemName : string = createItemForm['names'].value;
        
        // verifying that the name is not empty
        if( itemName === '' || itemName === ' ' ){
            // showing the error
            createItemForm['names'].classList.add('border-red-500');
            createItemForm['names'].classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');
            
            return;
        }else{
            // removing the error
            createItemForm['names'].classList.remove('border-red-500');
            createItemForm['names'].classList.remove('border-4');

            // valid styles
            createItemForm['names'].classList.add('border-green-500');
            createItemForm['names'].classList.add('border-4');
        }

        // getting the create item description input
        const itemDescription = createItemForm['description'].value;

        // verifying that the description is not empty
        if( itemDescription === '' || itemDescription === ' ' ){
            // showing the error
            createItemForm['description'].classList.add('border-red-500');
            createItemForm['description'].classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');

            // returning out of the function
            return;
        }else{
            // removing the error
            createItemForm['description'].classList.remove('border-red-500');
            createItemForm['description'].classList.remove('border-4');

            // valid styles
            createItemForm['description'].classList.add('border-green-500');
            createItemForm['description'].classList.add('border-4');
        }

        // getting the create item price input
        const itemPrice : number = Number(createItemForm['price'].value);

        // verifying that the price is not empty
        if( itemPrice <= 0 || itemPrice === null || itemPrice === undefined ){
            // showing the error
            createItemForm['price'].classList.add('border-red-500');
            createItemForm['price'].classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');

            // returning out of the function
            return;
        }else{
            // removing the error
            createItemForm['price'].classList.remove('border-red-500');
            createItemForm['price'].classList.remove('border-4');

            // valid styles
            createItemForm['price'].classList.add('border-green-500');
            createItemForm['price'].classList.add('border-4');
        }

        // getting the create item stock availability input
        const itemStock = Array.from(createItemForm['inStock'] as HTMLInputElement[]).find( (element) => element.checked === true )?.value;

        // converting the stock availability to a boolean
        const itemStockAvailability = ( itemStock === 'true' )? true : false;

        // getting the size of the item
        const itemSize = createItemForm['size'].value;

        // verifying that the size is not empty
        if( itemSize === '' || itemSize === ' ' ){
            // showing the error
            createItemForm['size'].classList.add('border-red-500');
            createItemForm['size'].classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');

            // returning out of the function
            return;
        }else{
            // removing the error
            createItemForm['size'].classList.remove('border-red-500');
            createItemForm['size'].classList.remove('border-4');

            // valid styles
            createItemForm['size'].classList.add('border-green-500');
            createItemForm['size'].classList.add('border-4');
        }

        // getting the create item tags input
        const itemTags: string[] = ( (createItemForm['tags'].value === "" || createItemForm['tags'].value === " " )? []: createItemForm['tags'].value.split(',') ).map( (tag: string) => {
            // stripping the leading spaces
            return tag.trim();
        } );


        // verifying that the tags is not empty
        if( itemTags.length === 0 ){
            // showing the error
            createItemForm['tags'].classList.add('border-red-500');
            createItemForm['tags'].classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');

            // returning out of the function
            return;
        }else{
            // removing the error
            createItemForm['tags'].classList.remove('border-red-500');
            createItemForm['tags'].classList.remove('border-4');

            // valid styles
            createItemForm['tags'].classList.add('border-green-500');
            createItemForm['tags'].classList.add('border-4');
        }

        // getting the create item category input
        const itemCategory : string = createItemForm['category'].value;

        // verifying that the category is not empty
        if( itemCategory === '' || itemCategory === ' ' ){
            // showing the error
            createItemForm['category'].classList.add('border-red-500');
            createItemForm['category'].classList.add('border-4');

            // enabling the submit button
            createNewItemPopupSubmitButton.disabled = false;

            // remoinve a orange border to the create item container
            createItemContainer.classList.remove('border-orange-500');
            createItemContainer.classList.remove('border-4');

            // remove the createitemcontiert to pulse animation
            createItemContainer.classList.remove('animate-pulse');

            // returning out of the function
            return;
        }else{
            // removing the error
            createItemForm['category'].classList.remove('border-red-500');
            createItemForm['category'].classList.remove('border-4');

            // valid styles
            createItemForm['category'].classList.add('border-green-500');
            createItemForm['category'].classList.add('border-4');
        } 

        const data: InventoryItem = {
            name: itemName as string,
            description: itemDescription as string,
            price: Number(itemPrice),
            inStock: Boolean(itemStockAvailability),
            size: itemSize,
            tags: itemTags as string[],
            pictureUrl: '' as string,
            pictureRef:"",
            discount_percent: 0,
            category: itemCategory as string
        };

        // creating the inventory item
        const inventoryItem = await inventoryManager.createInventoryItem( data, (createItemImageInput.files as FileList)[0] );

        // closing the create item popup
        createNewItemPopup.classList.add('hidden');

        // removing a orange border to the create item container
        createItemContainer.classList.remove('border-orange-500');
        createItemContainer.classList.remove('border-4');

        // remoinve a orange border to the create item container
        createItemContainer.classList.remove('border-orange-500');
        createItemContainer.classList.remove('border-4');

        // remove the createitemcontiert to pulse animation
        createItemContainer.classList.remove('animate-pulse');

        // disabled
        createNewItemPopupSubmitButton.disabled = false;

        // clearing the previwm image
        imagePreview.src = '';

        
        // showing the error 
        imagePreview.classList.remove('border-red-500');
        imagePreview.classList.remove('border-4');

        // valid styles
        createItemForm['names'].classList.remove('border-green-500');
        createItemForm['names'].classList.remove('border-4');

        // valid styles
        createItemForm['description'].classList.remove('border-green-500');
        createItemForm['description'].classList.remove('border-4');

        // valid styles
        createItemForm['price'].classList.remove('border-green-500');
        createItemForm['price'].classList.remove('border-4');

        // valid styles
        createItemForm['size'].classList.remove('border-green-500');
        createItemForm['size'].classList.remove('border-4');

        // valid styles
        createItemForm['category'].classList.remove('border-green-500');
        createItemForm['category'].classList.remove('border-4');

        // valid styles
        createItemForm['tags'].classList.remove('border-green-500');
        createItemForm['tags'].classList.remove('border-4');

        // clearing the form
        createItemForm.reset();
    });
    
    // binding the upload image input to a change event
    uploadImageInput.addEventListener( 'input', event => {
        // preventing default
        event.preventDefault();

        // getting the create item image preview
        const createItemImagePreview = document.getElementById( "createitem-image-preview" ) as HTMLImageElement;

        // image path
        const imagePath : string = (uploadImageInput.files as FileList)[0].name;

        if (uploadImageInput.files && uploadImageInput.files[0]) {
            const fileReader = new FileReader();

            let img = new Image();

            img.onload = function () {
                const w = img.width;
                const h = img.height;

                if( !((w > 400 && w < 500) && (h > 400 && h < 500)) ){
                    // showing the error
                    imagePreview.classList.add('border-red-500');
                    imagePreview.classList.add('border-4');

                    // enabling the submit button
                    createNewItemPopupSubmitButton.disabled = false;

                    // remoinve a orange border to the create item container
                    createItemContainer.classList.remove('border-orange-500');
                    createItemContainer.classList.remove('border-4');

                    // remove the createitemcontiert to pulse animation
                    createItemContainer.classList.remove('animate-pulse');

                    // unhidding the create item image error
                    createItemImageError.classList.remove('hidden');

                    // adding the error message
                    createItemImageError.innerText = "Please select an image with a width and height between 400px and 500px";

                    // returning out of the function
                    return;
                }else{
                    // showing the error
                    imagePreview.classList.remove('border-red-500');
                    imagePreview.classList.remove('border-4');

                    // removing the error
                    createItemImageError.classList.add('hidden');

                    // error message
                    createItemImageError.innerText = "";

                    // valid styles
                    imagePreview.classList.add('border-green-500');
                    imagePreview.classList.add('border-4');
                }
            };
        
            fileReader.onload = (e) => {
                const results = e.target?.result;
                if (typeof results === 'string') {
                    createItemImagePreview.src = results;

                    // removing the error
                    createItemImagePreview.classList.remove('border-red-500');
                    createItemImagePreview.classList.remove('border-4');

                    // valid styles
                    createItemImagePreview.classList.add('border-green-500');
                    createItemImagePreview.classList.add('border-4');

                    // hidding the create item image error
                    createItemImageError.classList.add('hidden');
                }

              img.src = URL.createObjectURL( (uploadImageInput.files as FileList)[0]);
            };

            
            fileReader.readAsDataURL(uploadImageInput.files[0]);
        }

    });

    // binding the create new item popup cancel button to a click event
    createNewItemPopupCancelButton.addEventListener( 'click', event => {
        // preventing default
        event.preventDefault();

        // closing the create admin popup
        createNewItemPopup.classList.add('hidden');

        // removing a orange border to the create item container
        createItemContainer.classList.remove('border-orange-500');
        createItemContainer.classList.remove('border-4');

        // remoinve a orange border to the create item container
        createItemContainer.classList.remove('border-orange-500');
        createItemContainer.classList.remove('border-4');

        // remove the createitemcontiert to pulse animation
        createItemContainer.classList.remove('animate-pulse');

        // disabled
        createNewItemPopupSubmitButton.disabled = false;

        // clearing the previwm image
        imagePreview.src = '';

        
        // showing the error 
        imagePreview.classList.remove('border-red-500');
        imagePreview.classList.remove('border-4');

        // valid styles
        createItemForm['names'].classList.remove('border-green-500');
        createItemForm['names'].classList.remove('border-4');

        // valid styles
        createItemForm['description'].classList.remove('border-green-500');
        createItemForm['description'].classList.remove('border-4');

        // valid styles
        createItemForm['price'].classList.remove('border-green-500');
        createItemForm['price'].classList.remove('border-4');

        // valid styles
        createItemForm['size'].classList.remove('border-green-500');
        createItemForm['size'].classList.remove('border-4');

        // valid styles
        createItemForm['category'].classList.remove('border-green-500');
        createItemForm['category'].classList.remove('border-4');

        // valid styles
        createItemForm['tags'].classList.remove('border-green-500');
        createItemForm['tags'].classList.remove('border-4');

        // clearing the form
        createItemForm.reset();
    });

    // binding the createItemButton click event'
    createItemButton.addEventListener( 'click', event => {
        // preventing default
        event.preventDefault();

        // clsoing the naviagtion bar
        navbarui.closeNavigation();

        // opening the create admin popup
        createNewItemPopup.classList.remove('hidden');
    });

    // // binding the create item button to a click event
    // createNewItemPopup.addEventListener( 'click', event => {
    //     // preventing the default
    //     event.preventDefault();

    //     // getting the popup conateiner
    //     const createNewItemContainer = document.getElementById('createitem-container') as HTMLElement;

    //     // checking if whether the click is outside or inside the form
    //     if( !createNewItemContainer.contains(event.target as HTMLElement) ){
    //         // closing the createadmin popup
    //         createNewItemPopup.classList.add('hidden');
    //     }
    // });

    // bindin the rmv item button to a click event
    rmvItemButton.addEventListener( 'click', async event => {
        // preventing default
        event.preventDefault();

        // creating a container for the inventory items to be removed
        const inventoryItemsToBeRemoved: InventoryItemUIAdmin[] = [];

        // getting the form inventory items
        const checkedBoxes = inventoryItemsForm.querySelectorAll( 'input[type="checkbox"]:checked' ) as NodeListOf<HTMLInputElement>;

        // getting the inventory items that are to be removed
        for( const checkbox of checkedBoxes ){
            // finding the inventory item
            const inventoryItem = inventoryItemsList.find( (item) => item.id === checkbox.id );

            // checking if the inventory item exists
            if( inventoryItem ){
                // adding the inventory item to the list
                inventoryItemsToBeRemoved.push( inventoryItem );
            }
        }

        // removing the inventory items
        for( const inventoryItem of inventoryItemsToBeRemoved ){
            // removing the inventory item
            await inventoryManager.deleteInventoryItem( inventoryItem );
        }
    });

    // binding the change event to the form
    inventoryItemsForm.addEventListener( 'change', event => {
        // prevent default behaviour
        event.preventDefault();

        // togling the mute status of the remove item button
        __muteRmvItemButton();

    });

    // binding the input search 
    searchForm.addEventListener('input', async (event) => {
        // preving the defaul
        event.preventDefault();

        // creating a filteres list of ui items
        let filteredInventoryItems : InventoryItemUIAdmin[] = [];

        // getting the search value
        const searchValue = searchInput.value;

        // creating a list of the inventory items ui objects
        const inventoryItemsList : InventoryItemUIAdmin[] = ( await inventoryManager.getCollectionData() ).map( (item) => new InventoryItemUIAdmin(item as InventoryItem) );

        // filtering the inventory items
        filteredInventoryItems = searchInventoryItems(inventoryItemsList, searchValue);

        if( searchValue === '' ){
            // loading the inventory items
            loadInventoryItems(inventoryItemsList);
        }else{
            // loading the inventory items
            loadInventoryItems(filteredInventoryItems);
        }
    })
    searchForm.addEventListener('submit', (event) => {
        // preventing the default
        event.preventDefault();
    });

    // binding the click event on the filter button
    filterButton.addEventListener("click", ( event ) => {
        // diabling default
        event.preventDefault();
    
        // checking if the search form is hidden
        if( filterForm.classList.contains("hidden") ){
            // removing the hidden class
            filterForm.classList.remove("hidden");
        }else{
            // adding the hidden class
            filterForm.classList.add("hidden");

            // resetting the form
            filterForm.reset();
        }

        // loading the inventory items
        loadInventoryItems(inventoryItemsList);
    });

    //  binding the filter form submit
    filterForm.addEventListener('submit', async (event) => {
        // preving the defaul
        event.preventDefault();

        // getting the form inputs
        const formInput: HTMLFormControlsCollection  = filterForm.elements;

        //  creating container for the checked checkboxes that have data-filter of category
        let checkedCategories = filterForm.querySelectorAll( 'input[type="checkbox"]:checked[data-filter="category"]' ) as NodeListOf<HTMLInputElement>;
        
        //  creating container for the checked checkboxes that have data-filter of category
        let checkedAvailability = filterForm.querySelectorAll( 'input[type="checkbox"]:checked[data-filter="stockAvailability"]' ) as NodeListOf<HTMLInputElement>;

        // creating a list of the inventory items ui objects
        const inventoryItemsList : InventoryItemUIAdmin[] = ( await inventoryManager.getCollectionData() ).map( (item) => new InventoryItemUIAdmin(item as InventoryItem) );

        let filteredInventoryItems : InventoryItemUIAdmin[] = inventoryItemsList;

        // filtering the inventory items based on category
        if( checkedCategories.length > 0 ){
            filteredInventoryItems = filteredInventoryItems.filter( (inventoryItem) => {
                // checking if the inventory item has the category
                for( const category of checkedCategories ){
                    if( inventoryItem.category.toLowerCase().replace(" ", "") === category.value.toLowerCase().replace(" ", "") ){
                        return true;
                    }
                }

                return false;
            })
        }

        // filtering the inventory items based on availability
        if( checkedAvailability.length > 0 ){
            filteredInventoryItems = filteredInventoryItems.filter( (inventoryItem) => {
                // checking if the inventory item matches the selected stock availability option
                for( const availability of checkedAvailability ){
                    if( availability.value.toLowerCase().replace(" ","") === "instock" ){
                        if(inventoryItem.inStock){
                            return true;
                        };
                    }else if( availability.value.toLowerCase().replace(" ","") === "outofstock" ){
                        if(!inventoryItem.inStock){
                            return true;
                        };
                    }
                }
    
                return false;
            });
        }
        
        // loading the inventory items
        loadInventoryItems(filteredInventoryItems);
    });

    // subscribing to user changes
    onAuthStateChanged( auth, async user => {

        if( user ){
            // getting the users custom claims
            const idTokenResult = await user.getIdTokenResult();

            // checking if the user is an admin
            if( !user.emailVerified ){
                // redirecting the user to the main page
                window.location.href = "/";
            }

            // getting the createAdminButton element
            const createAdminButton = document.getElementById('popup-createadmin') as HTMLButtonElement;

            // getting the createadmin popup form
            const createAdminPopup = document.getElementById('createadmin-popup') as HTMLElement;

            // getting the create admin popoup cancel button
            const createAdminPopupCancelButton = document.getElementById('createadmin-cancel') as HTMLButtonElement;

            // getting the create admin form
            const createAdminForm = document.getElementById('createadmin-form') as HTMLFormElement;

            // geting the create admin submit
            const createAdminSubmit = document.getElementById('createadmin-submit') as HTMLButtonElement;

            // getting the hide createadmin password button
            const hideCreateAdminPasswordButton = document.querySelector('.hide-password') as HTMLButtonElement;
            hideCreateAdminPasswordButton.addEventListener( 'click', event => {
                // preventing default
                event.preventDefault();

                // getting the create admin password field
                const createAdminPasswordField = document.getElementById('createadmin-password') as HTMLInputElement;

                // changing the input type
                createAdminPasswordField.setAttribute( 'type', 'password' );

                // hiding the hide password button
                hideCreateAdminPasswordButton.classList.add( 'hidden' );

                // unhiding the unhide password button
                unhideCreateAdminPasswordButton.classList.remove( 'hidden' );
            });

            // getting the create admin password unhide button
            const unhideCreateAdminPasswordButton = document.querySelector('.unhide-password') as HTMLButtonElement;
            unhideCreateAdminPasswordButton.addEventListener( 'click', event => {
                // preventing default
                event.preventDefault();

                // getting the create admin password field
                const createAdminPasswordField = document.getElementById('createadmin-password') as HTMLInputElement;

                // changing the input type
                createAdminPasswordField.setAttribute( 'type', 'text' );

                // hiding the unhide password button
                unhideCreateAdminPasswordButton.classList.add( 'hidden' );

                // unhiding the hide password button
                hideCreateAdminPasswordButton.classList.remove( 'hidden' );
            });

            // binding the submit button
            createAdminSubmit.addEventListener( 'click', async event => {
                // preventing default
                event.preventDefault();

                // creating the new admin
                createAdmin();
            });

            // binding the createadmin form to close when a click event is received outside of the form
            createAdminPopup.addEventListener( 'click', event => {
                // preventing the default
                event.preventDefault();

                // checking if whether the click is outside or inside the form
                if( event.target === createAdminPopup ){
                    // closing the createadmin popup
                    createAdminPopup.classList.add('hidden');
                }
            });

            // // binding the unhide createadmin password button to a click event
            // this.getUnhideCreateAdminPasswordButton(  ).addEventListener( 'click', (event) => {
            //     // preventing the default bahaviour
            //     event.preventDefault();

            //     // getting a refernce to the createadmin password field
            //     const createadminpassword = document.getElementById( this.getUnhideCreateAdminPasswordButton().getAttribute('data-for') );

            //     // changing the input type of the passwaord field
            //     createadminpassword.setAttribute( "type", "text" );

            //     // hidding the unhide createadminpassowrd button
            //     this.getUnhideCreateAdminPasswordButton().classList.add( "hidden" );

            //     // unhidding the hide createadmin password button
            //     this.getHideCreateAdminPasswordButton().classList.remove( "hidden" );
            // })

            // // binding the hide createadmin password button to a click event
            // this.getHideCreateAdminPasswordButton(  ).addEventListener( 'click', (event) => {
            //     // preventing the default bahaviour
            //     event.preventDefault();

            //     // getting a refernce to the createadmin password field
            //     const createadminpassword = document.getElementById( this.getUnhideCreateAdminPasswordButton().getAttribute('data-for') );

            //     // changing the input type of the passwaord field
            //     createadminpassword.setAttribute( "type", "password" );

            //     // unhidding the unhide createadminpassowrd button
            //     this.getUnhideCreateAdminPasswordButton().classList.remove( "hidden" );

            //     // hidding the hide createadmin password button
            //     this.getHideCreateAdminPasswordButton().classList.add( "hidden" );
            // })

            // binding the createadmin form button to submit event
            createAdminForm.addEventListener( 'submit', async event => {        
                // preventing the default behaviour
                event.preventDefault();

                // create admin document
                createAdmin();
            });

            // binding the click event to the create admin popup cancel button
            createAdminPopupCancelButton.addEventListener( 'click', event => {
                // preventing default
                event.preventDefault();

                // closing the create admin popup
                createAdminPopup.classList.add('hidden');
            });

            // binding the button click event'
            createAdminButton.addEventListener( 'click', event => {
                // preventing default
                event.preventDefault();

                // clsoing the naviagtion bar
                navbarui.closeNavigation();

                // opening the create admin popup
                createAdminPopup.classList.remove('hidden');
            });

            // // binding the createadmin form button to submit event
            // admin.getCreateAdminButton().addEventListener( 'click', async event => {                
            //     // preventing the default behaviour
            //     event.preventDefault();
                
            //     // getting the login data
            //     const AdminData = admin.getCreateAdminFormData();
                
            //     // requesting the user to be createadmin
            //     await admin.createAdmin( AdminData );
                
            //     // resseting the form
            //     admin.getCreateAdminForm().reset();

            //     // closing the createadmin popup
            //     admin.closeCreateAdminPopup();
            // });   
        }
        else{
      
            // redirecting user to the admin login page
            window.location.href = "login.html";
        }
    });

    // getting the list of catgory optoins
    const metadataUnsub = inventoryManager.metadataDocument.listenToDocument( async ( snapshot ) => {

        // getting the metadata
        const metadata = snapshot.data() as InventoryMetadata;

        // getting the category options
        const categoryOptions = Object.keys(metadata.product_categories);

        // getting the category options datalist
        const categoryOptionsDataList = document.getElementById( "categories-list" ) as HTMLDataListElement;

        // clearing the inner html
        categoryOptionsDataList.innerHTML = '';

        // adding the category options to the datalist
        for( const categoryOption of categoryOptions ){
            // creating the option element
            const optionElement = document.createElement( 'option' );
            optionElement.value = categoryOption;

            // adding the option element to the datalist
            categoryOptionsDataList.appendChild( optionElement );
        }

        // category options for filter
        const categoryOptionFilter = document.createElement('div');
        categoryOptionFilter.innerHTML =
            '<input id="petshop" data-filter="category" type="checkbox" value="petshop" class="filterCheckBox"/> <label for="petshop" class="filterLabel"> Pet Shop</label>';

        // adding the filterType class to the div
        categoryOptionFilter.classList.add('filterItem');

        const categoryFilterList = document.getElementById( "category-filter-list" );

        // clearing the inner html
        if (categoryFilterList) {
            categoryFilterList.innerHTML = '';
        }

        // updating the category filter
        for( const categoryOption of categoryOptions ){
            // creating the category filter
            const newCategoryFilter = categoryOptionFilter.cloneNode(true) as HTMLElement;

            // getting the input element
            const inputElement = newCategoryFilter.querySelector( 'input' ) as HTMLInputElement;

            // getting the label element
            const labelElement = newCategoryFilter.querySelector( 'label' ) as HTMLLabelElement;

            // setting the input id
            inputElement.id = categoryOption;

            // setting the input value
            inputElement.value = categoryOption;

            // setting the label for
            labelElement.htmlFor = categoryOption;

            // setting the label text
            labelElement.textContent = categoryOption;

            // adding the category filter to the category filter list
            if (categoryFilterList) {
                categoryFilterList.appendChild( newCategoryFilter );
            }
        }
    });

    // getting the inventory items
    unsubscription = inventoryManager.listenToInventoryQueryData( (inventoryitems:InventoryItem[]) => {
        //  clearing the inventory items list
        inventoryItemsList = [] as InventoryItemUIAdmin[];

        // creating an inventory item ui
        for( const item of inventoryitems ){
            // creating an inventory item ui
            const inventoryItemUI = new InventoryItemUIAdmin(item);

            // adding the inventory item to the list
            inventoryItemsList.push(inventoryItemUI);
        }

        // loading the inventory items
        loadInventoryItems(inventoryItemsList);
    });

    // helper functions
    function  __muteRmvItemButton(): void{

        // getting the form inventory items
        const checkedBoxes = inventoryItemsForm.querySelectorAll( 'input[type="checkbox"]:checked' ) as NodeListOf<HTMLInputElement>;

        // enabling the remove item button if options are selected
        if( checkedBoxes.length > 0 ){
            rmvItemButton.disabled = false;
        }else{
            rmvItemButton.disabled = true;
        }
    };

    // creating a function that will load the inventory items
    function loadInventoryItems( inventoryItems: InventoryItemUIAdmin[] ): void{
        const inventoryItemsUI = document.getElementById('productItems') as HTMLElement;

        // clearing the inner html
        inventoryItemsUI.innerHTML = '';

        // creating an inventory item ui
        for( const item of inventoryItems ){
            inventoryItemsUI.appendChild(item.createInventoryItemElement());
        }
    }

    //  creating function that will filter the inventory items based on the search value
    function searchInventoryItems( inventoryItems: InventoryItemUIAdmin[], searchQuery: string ): InventoryItemUIAdmin[]{
        // creating a filtered list of inventory items
        const filteredInventoryItems : InventoryItemUIAdmin[] = [];

        //  checking if the search value is not empty
        if( searchQuery !== '' ){
            // creating a list of the words
            const words : string[] = searchQuery.split(' ');

            // queriing the invenotory items name if they have the words
            for( const word of words ){
                // getting the inventory items that have the word
                const inventoryItemsWithWord : InventoryItemUIAdmin[] = inventoryItems.filter( (inventoryItem) => {
                    if( inventoryItem.name.toLowerCase().includes(word.toLowerCase()) || inventoryItem.tags.includes(word.toLowerCase()) ){
                        // removing the inventory item from the clone list
                        inventoryItems = inventoryItems.filter( (item) => item.id !== inventoryItem.id);

                        return true;
                    }
                    return false;
                });

                // adding the inventory items to the filtered list
                filteredInventoryItems.push(...inventoryItemsWithWord);
            }

            // queriing the invenotory items tags if they have the words
            for( const word of words ){
                // getting the inventory items that have the word
                const inventoryItemsWithWord : InventoryItemUIAdmin[] = inventoryItems.filter( (inventoryItem) => {
                    for( const tag of inventoryItem.tags ){
                        if( tag.toLowerCase().includes(word.toLowerCase()) ){
                            // removing the inventory item from the clone list
                            inventoryItems = inventoryItems.filter( (item) => item.id !== inventoryItem.id);

                            return true;
                        }
                    }
                });

                // adding the inventory items to the filtered list
                filteredInventoryItems.push(...inventoryItemsWithWord);
            }

            // sorting name based on closest match
            filteredInventoryItems.sort((nameA, nameB) => {
                const scoreA = words.filter(word => nameA.name.toLowerCase().includes(word.toLowerCase())).length;
                const scoreB = words.filter(word => nameB.name.toLowerCase().includes(word.toLowerCase())).length;
            
                return scoreB - scoreA; // Sort in descending order of match score
            });
        }
        
        return filteredInventoryItems;
    }

    // creating a function that will create an admin
    async function createAdmin(){
        // getting the create admin form
        const createAdminForm = document.getElementById('createadmin-form') as HTMLFormElement;
        
        // getting the createadmin popup form
        const createAdminPopup = document.getElementById('createadmin-popup') as HTMLElement;

        // getting the email
        const email = createAdminForm['email'].value;

        // checking if the email is valid
        if( !email.includes('@') ){
            // showing the email error
            createAdminForm['email'].classList.add('border-red-500');
            createAdminForm['email'].classList.remove('border-primary-500');

            // returning out of the function
            return;
        }

        // getting the password
        const password = createAdminForm['password'].value;

        // checking if the password is valid
        if( password.toLowerCase().replace(" ", "") === '' ){
            // showing the password error
            createAdminForm['password'].classList.add('border-red-500');
            createAdminForm['password'].classList.remove('border-primary-500');

            // returning out of the function
            return;
        }

        // creating the user
        try{
            const userCred = await createUserWithEmailAndPassword( auth, email, password );

        }catch( error  ){
            // getting the error code
            const errorCode = ( error as FirebaseError ).code;

            // checking if the error code is auth/email-already-in-use
            if (errorCode === 'auth/email-already-in-use') {
                // showing the email error
                createAdminForm['email'].classList.add('border-red-500');
                createAdminForm['email'].classList.remove('border-primary-500');
            }

            // checking if the error code is auth/invalid-email
            if (errorCode === 'auth/invalid-email') {
                // showing the email error
                createAdminForm['email'].classList.add('border-red-500');
                createAdminForm['email'].classList.remove('border-primary-500');
            }

            // checking if the error code is auth/weak-password
            if( errorCode === 'auth/weak-password' ){
                // showing the password error
                createAdminForm['password'].classList.add('border-red-500');
                createAdminForm['password'].classList.remove('border-primary-500');
            }

            // returning out of the function
            return;
        }

        // closing the createadmin popup
        createAdminPopup.classList.add('hidden');
    };
});    