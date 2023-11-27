import { InventoryItem } from "./types/inventorytype";

export default class InventoryItemUI {
    private data: InventoryItem;
  
    constructor(itemData: InventoryItem) {
      this.data = itemData;
    }
  
    get name(): string {
        return this.data.name;
    }

    get nameElement(): HTMLHeadingElement {
        //  getting the div that has the same id
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the name element
        if( inventoryItemUIContainer ){
            const nameElement: HTMLHeadingElement = inventoryItemUIContainer.querySelector('#productName') as HTMLHeadingElement;
            
            return nameElement;
        }else{
            throw new Error('InventoryItemUI: nameElement: inventoryItemUIContainer is null');
        }


    }
    
    set name(value: string) {
        this.data.name = value;
    }
    
    get price(): number{
        return this.data.price;
    }

    get priceElement(): HTMLParagraphElement {
        //  getting the div that has the same id
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the name element
        if( inventoryItemUIContainer ){
            const priceElement: HTMLParagraphElement = inventoryItemUIContainer.querySelector('#productPrice') as HTMLParagraphElement;
            
            return priceElement;
        }else{
            throw new Error('InventoryItemUI: priceElement: inventoryItemUIContainer is null');
        }
    }
    
    set price(value: number) {
        this.data.price = value;
    }

    get inStock(): boolean{
        return this.data.inStock;
    }
    
    set inStock(value: boolean) {
        this.data.inStock = value;
    }

    get size(): number{
        return this.data.size;
    }

    set size(value: number) {
        this.data.size = value;
    }

    get tags(): string[]{
        return this.data.tags;
    }

    get tagsElement(): HTMLDivElement {
        //  getting the div that has the same id
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the name element
        if( inventoryItemUIContainer ){
            const tagsElement: HTMLDivElement = inventoryItemUIContainer.querySelector('#productDescPoints') as HTMLDivElement;
            
            return tagsElement;
        }else{
            throw new Error('InventoryItemUI: tagsElement: inventoryItemUIContainer is null');
        }
    }

    set tags(value: string[]) {
        this.data.tags = value;
    }

    get description(): string{
        return this.data.description;
    }

    get descriptionElement(): HTMLParagraphElement {
        //  getting the div that has the same id
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the name element
        if( inventoryItemUIContainer ){
            const descriptionElement: HTMLParagraphElement = inventoryItemUIContainer.querySelector('#productDesc') as HTMLParagraphElement;
            
            return descriptionElement;
        }else{
            throw new Error('InventoryItemUI: descriptionElement: inventoryItemUIContainer is null');
        }
    }

    set description(value: string) {
        this.data.description = value;
    }

    get pictureRef(): string{
        return this.data.pictureRef;
    }

    get pictureRefElement(): HTMLImageElement {
        //  getting the div that has the same id
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the name element
        if( inventoryItemUIContainer ){
            const pictureRefElement: HTMLImageElement = inventoryItemUIContainer.querySelector('#productImg') as HTMLImageElement;
            
            return pictureRefElement;
        }else{
            throw new Error('InventoryItemUI: pictureRefElement: inventoryItemUIContainer is null');
        }
    }

    set pictureRef(value: string) {
        this.data.pictureRef = value;
    }

    get discount_percent(): number{
        return this.data.discount_percent;
    }

    set discount_percent(value: number) {
        this.data.discount_percent = value;
    }

    get size_unit(): string{
        return this.data.size_unit;
    }

    set size_unit(value: string) {
        this.data.size_unit = value;
    }

    get id(): string{
        return this.data.id as string;
    }

    set id(value: string) {
        this.data.id = value;
    }

    get category(): string{
        return this.data.category;
    }

    set category(value: string) {
        this.data.category = value;
    }

    get dataJSON(): string {
        return JSON.stringify(this.data);
    }

    private __createInventoryItemElement(): HTMLDivElement {
        // creating the string template of the inventory items html element
        const inventoryItemHTML: string = `
            <div class="productItem group">
                <!-- front page -->
                <div id="front" class="productItem-front">
                    <!-- product image -->
                    <div class="productItem-img">
                        <a>
                            <img id="productImg" class="rounded shadow" src="" alt="">
                        </a>
                    </div>

                    <!-- product details -->
                    <div class="productItem-details">
                        <!-- product name -->
                        <div>
                            <a>
                                <h4 id="productName" class="productItem-name">
                                </h4>
                            </a>
                        </div>
                        
                        <!-- product buttons -->
                        <div class="productItem-buttons">
                            <!-- product price -->
                            <a href="./contact.html" class="productItem-price">
                                <p id="productPrice">
                                    R500
                                </p>
                            </a>

                            <!-- product readmore -->
                            <button id="readMore" class="productItem-readmore">
                                Read More
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
                        <button id="close" class="productItem-close">
                            Close
                        </button>
                    </div>
                </div>
            </div>`;

        // Implement the creation of inventory item element
        const element = document.createElement('div');

        // assing the div an id of the object
        element.id = this.id;

        // add the html string to the element
        element.innerHTML = inventoryItemHTML;

        // Set element properties based on itemData
        return element;
    }

    createInventoryItemElement(): HTMLDivElement {
        // creating the inventory item ui
        const invItemUI = this.__createInventoryItemElement();

        // get the image element
        const imageElement: HTMLImageElement = invItemUI.querySelector('#productImg') as HTMLImageElement;

        // get the name element
        const nameElement: HTMLHeadingElement = invItemUI.querySelector('#productName') as HTMLHeadingElement;

        // get the price element
        const priceElement: HTMLParagraphElement = invItemUI.querySelector('#productPrice') as HTMLParagraphElement;

        // get the description element
        const descriptionElement: HTMLParagraphElement = invItemUI.querySelector('#productDesc') as HTMLParagraphElement;

        // get the tags element
        const tagsElement: HTMLDivElement = invItemUI.querySelector('#productDescPoints') as HTMLDivElement;

        //  assining the image element the image url
        imageElement.src = this.pictureRef;

        //  assining the name element the name
        nameElement.textContent = this.name;

        // assining the price element the price
        priceElement.textContent = `R${this.price}`;

        // assining the description element the description
        descriptionElement.textContent = this.description;

        // assining the tags element the tags
        for( const tag of this.tags ){
            const tagElement: HTMLSpanElement = document.createElement('span');
            tagElement.textContent = tag;

            tagElement.classList.add('productDescPoint');

            tagsElement.appendChild(tagElement);
        }

        // binding the read more button
        const readMoreButton: HTMLButtonElement = invItemUI.querySelector('#readMore') as HTMLButtonElement;
        readMoreButton.addEventListener('click', () => {
            this.__flipInventoryItemElement();
        });

        // binding the close button
        const closeButton: HTMLButtonElement = invItemUI.querySelector('#close') as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            this.__flipInventoryItemElement();
        });

        // Bind other elements as needed using getAttributeElement method
        return invItemUI;
      }

      private __flipInventoryItemElement(): void {

        // getting the div element
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the front page
        const frontPage: HTMLDivElement = inventoryItemUIContainer.querySelector('#front') as HTMLDivElement;

        // getting the back page
        const backPage: HTMLDivElement = inventoryItemUIContainer.querySelector('#back') as HTMLDivElement;
        
        
        // flipiing the page
        if (frontPage.classList.contains('productItem-front-hidden')) {
            frontPage.classList.remove('productItem-front-hidden');
            frontPage.classList.add('productItem-front');

            backPage.classList.remove('productItem-back');
            backPage.classList.add('productItem-back-hidden');
        }else{
            frontPage.classList.remove('productItem-front');
            frontPage.classList.add('productItem-front-hidden');

            backPage.classList.remove('productItem-back-hidden');
            backPage.classList.add('productItem-back');

        }

        
    }
    
    private __toggleFrontPage() {
        // getting the div element
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the front page
        const frontPage: HTMLDivElement = inventoryItemUIContainer.querySelector('#front') as HTMLDivElement;

        if (frontPage.classList.contains('productItem-front-hidden')) {
            frontPage.classList.remove('productItem-front-hidden');
            frontPage.classList.add('productItem-front');
        }else{
            frontPage.classList.remove('productItem-front');
            frontPage.classList.add('productItem-front-hidden');
        }
    }

    private __toggleBackPage() {
        // getting the div element
        const inventoryItemUIContainer: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        // getting the back page
        const backPage: HTMLDivElement = inventoryItemUIContainer.querySelector('#back') as HTMLDivElement;

        if (backPage.classList.contains('productItem-back-hidden')) {
            backPage.classList.remove('productItem-back-hidden');
            backPage.classList.add('productItem-back');
        }else{
            backPage.classList.remove('productItem-back');
            backPage.classList.add('productItem-back-hidden');
        }
    }
}
