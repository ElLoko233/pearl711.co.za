import InventoryItemUI from "./inventoryitemui";
import { InventoryItem } from "./types/inventorytype";

export default class InventoryItemUIAdmin extends InventoryItemUI {
  
    constructor(itemData: InventoryItem) {
        super(itemData);
    }

    protected __createInventoryItemElement(): HTMLDivElement {
        // creating the string template of the inventory items html element
        const inventoryItemHTML: string = `
        <div class="productItem group">
            <input type="checkbox" id="option" name="inventoryItem" class="hidden form-input peer">

            <label for="option" class="peer-checked:outline peer-checked:outline-negative peer-checked:outline-1 peer-checked:hover:outline-[1.5px] peer-checked:shadow-md peer-checked:animate-pulse rounded-md flex flex-col hover:shadow-md cursor-pointer">
                <!-- front page -->
                <div id="front" class="productItem-front">
                    <!-- product image -->
                    <div class="productItem-img">
                        <img id="productImg" class="rounded shadow" src="../assets/images/dog-pack.png" alt="">
                    </div>

                    <!-- product details -->
                    <div class="productItem-details">
                        <!-- product name -->
                        <div>
                            <h4 id="productName" class="productItem-name peer-disabled:text-inherit">
                                dogguy O's for aduklts
                            </h4>
                        </div>
                        
                        <!-- product buttons -->
                        <div class="productItem-buttons">
                            <!-- product price -->
                            <p id="productPrice" class="productItem-price">
                                R500
                            </p>

                            <!-- product readmore -->
                            <button id="readMore" class="productItem-readmore-admin">
                                Read More
                            </button>
                            
                            <!-- product edit -->
                            <button href="" id="edit" class="productItem-edit">
                                <iconify-icon class="productItem-edit-svg" icon="tabler:edit"></iconify-icon>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- back page -->
                <div id="back" class="productItem-back-hidden">    
                    <!-- product details -->
                    <div class="productItem-details">
                        <p id="productDesc" class="productItem-desc">
                            Lorem ipsum dolor sit amet e autem, temporibus rem accusantium perspiciatis repudiandae fugit voluptatem dolor eos illo beatae provident fuga.
                        </p>

                        <!-- product detail points -->
                        <div id="productDescPoints" class="productItem-points" role="group">
                        </div>
                    </div>

                    <!-- product buttons -->
                    <div class="productItem-buttons">
                        <!-- product detail close -->
                        <p id="close" class="productItem-close">
                            Close
                        </p>
                    </div>
                </div>
            </label>
        </div>`;

        // Implement the creation of inventory item element
        const element = document.createElement('div');

        // assing the div an id of the object
        element.id = this.id + "item";

        // add the html string to the element
        element.innerHTML = inventoryItemHTML;

        // Set element properties based on itemData
        return element;
    }

    createInventoryItemElement(): HTMLDivElement {
        // getting the html
        const element = super.createInventoryItemElement();

        // getting the input element
        const input : HTMLInputElement = element.querySelector('input') as HTMLInputElement;
        
        // getting the label element
        const label : HTMLLabelElement = element.querySelector('label') as HTMLLabelElement;

        // getting the edit item button
        const editButton : HTMLButtonElement = element.querySelector('#edit') as HTMLButtonElement;
        editButton.addEventListener('click', (event) => {
            // preventing default
            event.preventDefault();

            // getting the edit popup
            const editPopup : HTMLDivElement = document.getElementById('edititem-popup') as HTMLDivElement;

            // getting the id input elememt
            const idInput : HTMLInputElement = editPopup.querySelector('#edititem-id') as HTMLInputElement;

            // getting the edit item form
            const editItemForm = document.getElementById( "edititem-form" ) as HTMLFormElement;

            // getting the image preview eleemtn
            const imagePreview : HTMLImageElement = document.getElementById( "edititem-image-preview" ) as HTMLImageElement;

            // getting the name input element
            const nameInput : HTMLInputElement = editItemForm.querySelector('#edititem-name') as HTMLInputElement;
            

            // getting the description input element
            const descriptionInput : HTMLInputElement = editItemForm.querySelector('#edititem-description') as HTMLInputElement;

            // setting the name input to the name of the item
            nameInput.value = this.name;

            // setting the description input to the description of the item
            descriptionInput.value = this.description;

            // setting the price input to the price of the item
            editItemForm["price"].value = this.price.toString();

            // setting the instock input to the instock of the item
            const inStockInput = Array.from(editItemForm['inStock'] as HTMLInputElement[]).find( (element) => element.value === this.inStock.toString() ) as HTMLInputElement;
            inStockInput.checked = true;

            // setting the size input to the size of the item
            editItemForm["size"].value = this.size;

            // seeting the tags input to the tags of the item
            editItemForm["tags"].value = this.tags.join(', ');

            // setting the category input to the category of the item
            editItemForm["category"].value = this.category;

            // setting the image preview to the items image
            imagePreview.src = this.pictureUrl;

            // adding the id to the input
            idInput.value = this.id;

            // setting the data for of the edit popup
            editPopup.dataset.id = this.id;

            // enabling the edit popup
            editPopup.classList.remove('hidden');
        });

        // getting the chekcbox element
        const checkbox : HTMLInputElement = element.querySelector('input') as HTMLInputElement;

        // getting the readmore button
        const readmoreBtn: HTMLButtonElement = element.querySelector('#readMore') as HTMLButtonElement;

        readmoreBtn.addEventListener('click', (event) => event.preventDefault() );

        // setting the readmore button to gray if the item is not in stock
        if (this.inStock == false) {
            readmoreBtn.classList.remove('productItem-readmore-admin');
            readmoreBtn.classList.add('productItem-readmore-admin-disabled');
        }
        
        // setting the input to the items id
        input.id = this.id;

        // setting the label to the items id
        label.htmlFor = this.id;



        return element;
    }

}
