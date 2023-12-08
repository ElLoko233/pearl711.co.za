import { InventoryItem } from "./types/inventorytype";

export default class InventoryItemUI {
    protected data: InventoryItem;
  
    constructor(itemData: InventoryItem) {
      this.data = itemData;
    }

    /**
     * Gets the name of the inventory item
     * @returns name of the inventory item
     * 
    */
    get name(): string {
        if( !this.data.name ){
            return '';
        }
        return this.data.name;
    }

    /**
    * Gets the html element of the name of the inventory item
    * @returns the html element of the name of the inventory item
    * 
    */
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
    
    /**
     * Sets the name of the inventory item
     * @param value - name of the inventory item
     * 
    */
    set name(value: string) {
        this.data.name = value;
    }
    
    /**
     * Gets the price of the inventory item
     * @returns price of the inventory item
    */
    get price(): number{
        if( !this.data.price ){
            return 0;
        }
        return this.data.price;
    }

    /**
     * Gets the html element of the price of the inventory item
     * @returns the html element of the price of the inventory item
     * 
    */
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
    
    /**
     * Sets the price of the inventory item
     * @param value - price of the inventory item
     * 
    */
    set price(value: number) {
        this.data.price = value;
    }

    /**
     * Gets the boolean indicating whether the item is instock
     * @returns bolean of whether the item is instock
    */
    get inStock(): boolean{
        if( !this.data.inStock ){
            return false;
        }
        return this.data.inStock;
    }
    
    /**
     * Sets the boolean indicating whether the item is instock
     * @param value - bolean of whether the item is instock
     */
    set inStock(value: boolean) {
        this.data.inStock = value;
    }

    /**
     * Gets the size of the inventory item
     * @returns size of the inventory item
    */
    get size(): number{
        if( !this.data.size ){
            return 0;
        }
        return this.data.size;
    }

    /**
     * sets the size of the inventory item
     * @param value - size of the inventory item
     */
    set size(value: number) {
        this.data.size = value;
    }

    /**
     * Gets the tags of the inventory item
     * @returns tags of the inventory item
    */
    get tags(): string[]{
        if( !this.data.tags ){
            return [];
        }
        return this.data.tags;
    }

    /**
     * Gets the html element of the tags of the inventory item
     * @returns the html element of the tags of the inventory item
     * 
    */
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

    /**
     * Sets the tags of the inventory item
     * @param value - tags of the inventory item
     */
    set tags(value: string[]) {
        this.data.tags = value;
    }

    /**
     * Gets the description of the inventory item
     * @returns description of the inventory item
    */
    get description(): string{
        if( !this.data.description ){
            return '';
        }
        return this.data.description;
    }

    /**
     * Gets the html element of the description of the inventory item
     * @returns the html element of the description of the inventory item
     * 
    */
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

    /**
     * Sets the description of the inventory item
     * @param value - description of the inventory item
     */
    set description(value: string) {
        this.data.description = value;
    }

    /**
     * Gets the picture reference of the inventory item
     * @returns picture reference of the inventory item
    */
    get pictureRef(): string{
        if( !this.data.pictureRef ){
            return '';
        }
        return this.data.pictureRef;
    }

    /**
     * Gets the html element of the picture reference of the inventory item
     * @returns the html element of the picture reference of the inventory item
     * 
    */
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

    /**
     * Sets the picture reference of the inventory item
     * @param value - picture reference of the inventory item
     */
    set pictureRef(value: string) {
        this.data.pictureRef = value;
    }

    /**
     * Gets the discount percent of the inventory item
     * @returns discount percent of the inventory item
    */
    get discount_percent(): number{
        if( !this.data.discount_percent ){
            return 0;
        }
        return this.data.discount_percent;
    }

    /**
     * Sets the discount percent of the inventory item
     * @param value - discount percent of the inventory item
     */
    set discount_percent(value: number) {
        this.data.discount_percent = value;
    }

    /**
     * Gets the unit of measurement of the inventory item's size
     * @returns the unit of measurement of the inventory item's size
    */
    get size_unit(): string{
        if( !this.data.size_unit ){
            return '';
        }
        return this.data.size_unit;
    }

    /**
     * Sets the unit of measurement of the inventory item's size
     * @param value - the unit of measurement of the inventory item's size
     */
    set size_unit(value: string) {
        this.data.size_unit = value;
    }

    /**
     * Gets the id of the inventory item
     * @returns id of the inventory item
    */
    get id(): string{
        if( !this.data.id ){
            return '';
        }

        return this.data.id as string;
    }

    /**
     * Sets the id of the inventory item
     * @param value - id of the inventory item
     */
    set id(value: string) {
        this.data.id = value;
    }

    /**
     * Gets the category of the inventory item
     * @returns category of the inventory item
    */
    get category(): string{
        if( this.data.category ){
            return this.data.category;
        }else{
            return '';
        }
    }

    /**
     * Sets the category of the inventory item
     * @param value - category of the inventory item
     */
    set category(value: string) {
        this.data.category = value;
    }

    /**
     * Gets the jsonified data of the inventory item
     * @returns jsonified data of the inventory item
    */
    get dataJSON(): string {
        return JSON.stringify(this.data);
    }


    protected __createInventoryItemElement(): HTMLDivElement {
        // creating the string template of the inventory items html element
        const inventoryItemHTML: string = `
            <div class="productItem group">
                <!-- front page -->
                <div id="front" class="productItem-front">
                    <!-- product image -->
                    <div class="productItem-img">
                        <a href="./contact.html">
                            <img id="productImg" class="rounded shadow" src="" alt="">
                        </a>
                    </div>

                    <!-- product details -->
                    <div class="productItem-details">
                        <!-- product name -->
                        <div>
                            <a href="./contact.html">
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

        // adding grayscalke to the image if the item is not in stock
        if( this.inStock === false ){
            imageElement.classList.add('grayscale');
            imageElement.classList.add('opacity-50');
        }

        // get the name element
        const nameElement: HTMLHeadingElement = invItemUI.querySelector('#productName') as HTMLHeadingElement;

        // setting the name to gray if the item is not in stock
        if( this.inStock === false ){
            nameElement.classList.remove('productItem-name');
            nameElement.classList.add('productItem-name-disabled');
        }

        // get the price element
        const priceElement: HTMLParagraphElement = invItemUI.querySelector('#productPrice') as HTMLParagraphElement;

        // setting the price element to gray if the item is not in stock
        if( this.inStock === false ){
            priceElement.classList.remove('productItem-price');
            priceElement.classList.add('productItem-price-disabled');
        }

        // getting the readmore button
        const readmoreBtn: HTMLButtonElement = invItemUI.querySelector('#readMore') as HTMLButtonElement;

        // setting the readmore button to gray if the item is not in stock
        if( this.inStock === false ){
            readmoreBtn.disabled = true;
            readmoreBtn.classList.remove('productItem-readmore');
            readmoreBtn.classList.add('productItem-readmore-disabled');
        }

        // get the description element
        const descriptionElement: HTMLParagraphElement = invItemUI.querySelector('#productDesc') as HTMLParagraphElement;

        // setting the description element to gray if the item is not in stock
        if( this.inStock === false ){
            descriptionElement.classList.remove('productItem-desc');
            descriptionElement.classList.add('productItem-desc-disabled');
        }

        // get the tags element
        const tagsElement: HTMLDivElement = invItemUI.querySelector('#productDescPoints') as HTMLDivElement;

        //  assining the image element the image url
        imageElement.src = this.pictureRef;

        // assigning image alt to the description
        imageElement.alt = this.description;

        //  assining the name element the name
        nameElement.textContent = this.name.charAt(0).toUpperCase() + this.name.slice(1);

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

type Constructor<T = {}> = new (...args: any[]) => T;

export function withInventoryItemUI<TBase extends Constructor<InventoryItemUI>>(Base: TBase) {
  return class extends Base {}
}

