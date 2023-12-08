// getting the firebase compoents
import {
    auth,
    db
}from "./firebaseComp";

import{ onAuthStateChanged } from "firebase/auth";

//  getting the nav bar class
import NavigationBarUI from "./custom/navbarui";

// importing the code that fixes the form labels
import { 
    fixingFormLabel
} from "./custom/fixformlabelrelationship";
import InventoryItemUIAdmin from "./inventorymanager/inventoryitemuiadmin";
import InventoryManager from "./inventorymanager/inventorymanger";
import { InventoryItem, InventoryMetadata } from "./inventorymanager/types/inventorytype";



window.addEventListener( 'DOMContentLoaded', async event => {
    // creating an instance of the navigation bar
    const navbarui = new NavigationBarUI(  );

    // creating a container for the subcritption
    let unsubscription: any;
    
    // fixing input and form relationship
    fixingFormLabel();
    
    // initalizing the navigation bar
    navbarui.initialize( );

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
    const rmvItemButton = document.getElementById( "rmv-item-sessions" ) as HTMLButtonElement;

    // getting the create ew item button
    const createItemButton = document.getElementById( "create-new-item-button" ) as HTMLButtonElement;

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

        console.log('user :>> ', user);

        // if( user ){
        //     // checking if the user is an admin
        //     if( !admin.claims.admin ){
        //         // redirecting the user to the main page
        //         if( isLocalhost ){
        //             window.location.href = "/Public";
        //         }else{
        //             window.location.href = '/';
        //         }
        //     }

        //     // binding the logout button to click event
        //     navbarui.getLogOutButton().addEventListener( 'click', async event => {
        //         await admin.logOut(  );

        //         navbarui.closeNavigation();

        //         // creating a success message instance
        //         const message = new TrainerAppMessageUI( new TrainerAppMessage( "info", "Logged out Successfully", 0 ) );

        //         // saving the message instance
        //         admin.activeMessage = message;

        //         // display the message using toast
        //         message.showMessagewithToast( 1750, "top" );
        //     });

        //     // binding the login button click event'
        //     navbarui.getCreateAdminButton().addEventListener( 'click', event => {
        //         admin.openCreateAdminPopup( mainDisplay );

        //         navbarui.closeNavigation();
        //     });

        //     // binding the createadmin form button to submit event
        //     admin.getCreateAdminButton().addEventListener( 'click', async event => {
        //         // adding a loading screen to the login popup
        //         admin.placeLoadingOverlay( admin.getCreateAdminForm(), true );
                
        //         // preventing the default behaviour
        //         event.preventDefault();
                
        //         try{
        //             // getting the login data
        //             const AdminData = admin.getCreateAdminFormData();
                    
        //             // requesting the user to be createadmin
        //             await admin.createAdmin( AdminData );
                    
        //             // resseting the form
        //             admin.getCreateAdminForm().reset();

        //             // closing the createadmin popup
        //             admin.closeCreateAdminPopup();

        //             // removing the loading screen to the createasmin popup
        //             admin.placeLoadingOverlay( admin.getCreateAdminForm(), false );

        //             // creating a success message instance
        //             const message = new TrainerAppMessageUI( new TrainerAppMessage( "info", `Verifcation Email sent to: ${AdminData.email}`, 1 ) );

        //             // saving the message instance
        //             admin.activeMessage = message;

        //             // display the message using toast
        //             message.showMessagewithToast( 1750, "top" );

        //         }catch( error ){
        //             // creating new message instance
        //             const message = new TrainerAppMessageUI( error );

        //             // storiung the message instance
        //             admin.activeMessage = message;

        //             // storiung the message instance
        //             admin.activeMessage = message;

        //             // display the message using toast
        //             message.showMessagewithToast( 3000 );

        //             // removing the loading screen to the createadmin popup
        //             admin.placeLoadingOverlay( admin.getCreateAdminForm(), false );
        //         }
        //     });

        //     // save object into json file
        //     let metadata = await admin.setSessionManagerMetadata();
        //     let data = metadata
        //     console.log('data :>> ', data);

            
        // }else{
      
        //     // redirecting user to the admin login page
        //     window.location.href = "login.html";
        // }
    } );

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
});
