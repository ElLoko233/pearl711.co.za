// File: inventoryTypes.ts
// Description: Contains custom data types for the inventory management system.

// Custom data type for metadata related to the inventory.
type InventoryMetadata = {
    /**
     * Total number of products in the inventory.
     */
    number_of_products: number;
  
    /**
     * Object mapping product categories to their counts.
     */
    product_categories: { [category: string]: number };
  };
  
  // Custom data type for individual inventory items.
  type InventoryItem = {
    /**
     * Name of the product.
     */
    name: string;
  
    /**
     * Price of the product.
     */
    price: number;
  
    /**
     * Availability status.
     */
    inStock: boolean;
  
    /**
     * Size of the product.
     */
    size: number;
  
    /**
     * List of tags associated with the product.
     */
    tags: string[];
  
    /**
     * Description of the product.
     */
    description: string;
  
    /**
     * Reference to the product picture.
     */
    pictureRef: string;
  
    /**
     * Discount percentage applied to the product.
     */
    discount_percent: number;
  
    /**
     * Size unit for the product.
     */
    size_unit: number;
  
    /**
     * Unique identifier for the product.
     */
    id: string;
  };
  