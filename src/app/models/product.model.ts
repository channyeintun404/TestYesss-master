export class Product {
    id: number;
    name: String;
    description: String;
    price: number;
    discountPrice: number;
    main_image:String;
    images: Array<String>;
    size: Array<String>;
    color: Array<String>;
    quantity: number;
    isWishlist: boolean;
    status:String;
}