import NavigationBarUI from "./custom/navbarui";
import InventoryItemUI from "./inventorymanager/inventoryitemui";
import InventoryManager from "./inventorymanager/inventorymanger";
import { InventoryItem, InventoryMetadata } from "./inventorymanager/types/inventorytype";
import { db } from "./firebaseComp";
import { limit, where } from "firebase/firestore";



window.addEventListener("load", async () => {
    // initializing the navigation component
    const navbar = new NavigationBarUI();
    navbar.initialize();

    // creating a datalimit
    let dataLIMIT: number  = 10;
    
    const INVENTORYCOLLECTIONREF = '/Inventory Manager/inventory/inventory';
    const INVENTORYMANAGERREF = '/Inventory Manager';
    const METADATAID = 'metadata';
    const METADATACOLLECTIONREF = '/Inventory Manager/';
    
    const inventoryManager = new InventoryManager<InventoryItem, InventoryMetadata>( db, INVENTORYCOLLECTIONREF, METADATACOLLECTIONREF );

    // creating a container for all the inventory items
    let inventoryItemsList: InventoryItemUI[] = []; 

    // getting the search button element
    const searchButton : HTMLButtonElement = document.getElementById('searchButton') as HTMLButtonElement;
    const searchButtonCloseIcon : HTMLElement = document.getElementById("closeSearch") as HTMLElement;
    const searchButtonSearchIcon : HTMLElement = document.getElementById('searchIcon') as HTMLElement;
    
    // getting the search form element
    const searchForm : HTMLFormElement = document.getElementById('searchForm') as HTMLFormElement;
    // getting the search input
    const searchInput : HTMLInputElement = searchForm["search-product"] as HTMLInputElement;

    // getting the load more button
    const loadMoreButton : HTMLButtonElement = document.getElementById('loadMore') as HTMLButtonElement;
    
    // creating a container for the subcritption
    let unsubscription: any;
    
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
            }

            // adding the hidden class
            searchForm.classList.add("hidden");
        }

        // clearing the search value
        searchInput.value = '';

        // loading the inventory items
        loadInventoryItems(inventoryItemsList);
    });

    // binding the input search 
    searchForm.addEventListener('input', async (event) => {
        // preving the defaul
        event.preventDefault();

        // creating a filteres list of ui items
        let filteredInventoryItems : InventoryItemUI[] = [];

        // getting the search value
        const searchValue = searchInput.value;

        // querying the entire db
        const inventoryItemsAll  = await inventoryManager.getCollectionData();

        // creating a list of the inventory items ui objects
        const inventoryItemsAllUI : InventoryItemUI[] = inventoryItemsAll.map( (item) => new InventoryItemUI(item as InventoryItem) );

        // filtering the inventory items
        filteredInventoryItems = searchInventoryItems(inventoryItemsAllUI, searchValue);

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

    // binding a click event to the load more button
    loadMoreButton.addEventListener('click', async (event) => {
        // preventing the default
        event.preventDefault();

        // increasing the data limit
        dataLIMIT += 10;

        // unsubscribing from the inventory items
        unsubscription();

        // creating a new subscription
        unsubscription = inventoryManager.listenToInventoryQueryData( (inventoryitems:InventoryItem[]) => { 
            //  clearing the inventory items list
            inventoryItemsList = [] as InventoryItemUI[];
    
            // creating an inventory item ui
            for( const item of inventoryitems ){
                // creating an inventory item ui
                const inventoryItemUI = new InventoryItemUI(item);
    
                // adding the inventory item to the list
                inventoryItemsList.push(inventoryItemUI);
            }
    
            // loading the inventory items
            loadInventoryItems(inventoryItemsList);
        }, limit(dataLIMIT));
    })
    
    // getting the inventory items
    unsubscription = inventoryManager.listenToInventoryQueryData( (inventoryitems:InventoryItem[]) => { 
        //  clearing the inventory items list
        inventoryItemsList = [] as InventoryItemUI[];

        // creating an inventory item ui
        for( const item of inventoryitems ){
            // creating an inventory item ui
            const inventoryItemUI = new InventoryItemUI(item);

            // adding the inventory item to the list
            inventoryItemsList.push(inventoryItemUI);
        }

        // loading the inventory items
        loadInventoryItems(inventoryItemsList);
    }, limit(dataLIMIT), where('inStock', '==', true));
});

// creating a function that will load the inventory items
function loadInventoryItems( inventoryItems: InventoryItemUI[] ): void{
    const inventoryItemsUI = document.getElementById('productItems') as HTMLElement;

    // clearing the inner html
    inventoryItemsUI.innerHTML = '';

    // creating an inventory item ui
    for( const item of inventoryItems ){
        
        inventoryItemsUI.appendChild(item.createInventoryItemElement());
    }
}

//  creating function that will filter the inventory items based on the search value
function searchInventoryItems( inventoryItems: InventoryItemUI[], searchQuery: string ): InventoryItemUI[]{
    // creating a filtered list of inventory items
    const filteredInventoryItems : InventoryItemUI[] = [];

    //  checking if the search value is not empty
    if( searchQuery !== '' ){
        // creating a list of the words
        const words : string[] = searchQuery.split(' ');

        // queriing the invenotory items name if they have the words
        for( const word of words ){
            // getting the inventory items that have the word
            const inventoryItemsWithWord : InventoryItemUI[] = inventoryItems.filter( (inventoryItem) => {
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
            const inventoryItemsWithWord : InventoryItemUI[] = inventoryItems.filter( (inventoryItem) => {
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