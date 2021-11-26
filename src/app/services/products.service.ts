import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AppService {

  products: Product[];
  message: any[];

  constructor(protected http: HttpClient) {
    super(http);
    this.setModel('products');
  }

  createProduct(data:any){
    console.log(data);
    return new Promise((resolve)=>{
      this.create(data).subscribe(res=>{
        // console.log("add res "+JSON.stringify(res));
        resolve(res["product_id"]);
      })
    })
  }

  createProductOptions(data:any){
    console.log(data);
    return new Promise((resolve)=>{
      this.createOptions(data).subscribe(res=>{
        // console.log("add res "+JSON.stringify(res));
        resolve(res);
      })
    })
  }

  updateProduct(id: number,data:any){
    return new Promise((resolve)=>{
      this.edit(id,data).subscribe(res=>{
        console.log(res);
      })
    })
  }

  getProductById(id) {
    console.log("id is ="+id)
    return new Promise((resolve)=>{
      this.get(id).subscribe(productDetail=> {
        resolve(productDetail);
      });
    })
  }


  getProductsOptions(pid) {
    return new Promise((resolve) => {
      this.getOptionByQueryString('options&product_id=' + pid).subscribe(res => {
        console.log(res);
        resolve(res);
       });
    });
  }

  getProducts(cid, companyId) {
    return new Promise((resolve) => {
      let cid_qp = cid ? '&cid=' + cid : '';
      this.getByQueryString('items_per_page=0' + cid_qp + '&subcats=Y&company_id='+companyId).subscribe(res => {
        console.log(res);
        this.products = [];
        for(const prod of res['products']) {

          //no image upload
          if(prod['min_qty']==1) {
            this.products.push({
              id: prod['product_id'],
              name: prod['product'],
              description: "description",
              price: prod['price'],
              discountPrice: prod['list_price'] == 0 ? prod['price'] : prod['list_price'],
              images: ["assets/images/category/men-fashion.jpg"],
              color: ["#CECE45", "#F951E2", "#CF0114"],
              size: ["S", "M", "L"],
              quantity: 1,
              isWishlist: false
            });
          }

          //image exist
          else{
             const imagesArr = [];
            // const imagesArr = [prod['main_pair']['detailed']['image_path']];
              if (prod['image_pairs']) {  
                for (const img of Object.values(prod['image_pairs'])) {
                  imagesArr.push(img['detailed']['image_path']);
                }      
              }    
              this.products.push({
                id: prod['product_id'],
                name: prod['product'],
                description: "description",
                price: prod['price'],
                discountPrice: prod['list_price'] == 0 ? prod['price'] : prod['list_price'],
                images: imagesArr,
                color: ["#CECE45", "#F951E2", "#CF0114"],
                size: ["S", "M", "L"],
                quantity: 1,
                isWishlist: false
              });  
        }      

        }
        resolve(this.products);
      });
    });
  }

  getDiscussionById(pid) {
    return new Promise((resolve) => {
      this.getOptionByQueryString('products/' + pid +'/discussions').subscribe(res => {
        console.log(res);
        resolve(res);
       });
    });
  }


  productList() {
    this.products = [
      {
        id: 1,
        name: "Womens Long Sweater",
        description: `100% Polyester. Soft lightweight and stretchy material feels wonderful against your skin. <br/><br/> Our cardigan vests feature lapel collar, open front, solid color, two side pockets, draped, loose fitting, thigh length, warm sweater vets, long vests, sleeveless cardigans with unique trim, pretty nice for a fun layered look.`,
        price: 35.99,
        discountPrice: 30,
        images: ["assets/images/products/product-1.1.jpg", "assets/images/products/product-1.2.jpg", "assets/images/products/product-1.3.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: false
      },
      {
        id: 2,
        name: "Men's Sleeve T-Shirt",
        description: "60% Cotton/40% Polyester, Imported, Adjustable closure, Machine Wash, Original fit",
        price: 65.90,
        discountPrice: 50,
        images: ["assets/images/products/product-2.1.jpg", "assets/images/products/product-2.2.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: false
      },
      {
        id: 3,
        name: "Triple Zip Pocket Large Crossbody Bag",
        description: `Zipper closure, Adjustable shoulder strap with 24" drop, Faux leather & gold tone hardware, 1 zipper pocket & 1 open pocket inside`,
        price: 55.50,
        discountPrice: 45,
        images: ["assets/images/products/product-3.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: true
      },
      {
        id: 4,
        name: "Apple Watch Resin",
        description: "RESIN MATERIAL: Each resin band is handmade, gorgeous and beautiful. The band made of resin material is lightweight, only about 30g, which is equivalent to one third of the weight of a metal band. At the same time, it is waterproof, wear-resistant, not easy to break, and more comfortable to wear.",
        price: 100,
        discountPrice: 95,
        images: ["assets/images/products/product-4.1.jpg", "assets/images/products/product-4.2.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: false
      },
      {
        id: 5,
        name: "Essential Oil Diffuser Bracelet",
        description: "This is anxiety ease essential oil diffusing bracelet Jewelry for women. You can drop your favorite essential oil or perfume on it to calms emotions,relieves tension and stress in daily busy work, driving, sleeping, long-distance travel, overseas business trips.",
        price: 98.00,
        discountPrice: 90,
        images: ["assets/images/products/product-10.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: true
      },
      {
        id: 6,
        name: "Women Metallic Running Shoes",
        description: "Women running shoes with iridescent metallic PU has durable MD sole,non-slip, lace up for adjustment and added comfort.",
        price: 55.50,
        discountPrice: 40,
        images: ["assets/images/products/product-5.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: true
      },
      {
        id: 7,
        name: "Acer Aspire 5 Slim Laptop",
        description: "AMD Ryzen 3 3200U Dual Core Processor (Up to 3.5GHz); 4GB DDR4 Memory; 128GB PCIe NVMe SSD",
        price: 40.45,
        discountPrice: 30,
        images: ["assets/images/products/product-6.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: true
      },
      {
        id: 7,
        name: "Sony Noise Cancelling Headphones",
        description: "Industry leading ANC lends a personalized, virtually soundproof experience",
        price: 65,
        discountPrice: 50,
        images: ["assets/images/products/product-7.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: false
      },
      {
        id: 8,
        name: "Electric Spice and Coffee Grinder",
        description: "Transforms whole coffee beans into freshly ground coffee in less than 10 seconds; perfectly grinds nuts, seeds, herbs, and spices",
        price: 70.50,
        discountPrice: 60,
        images: ["assets/images/products/product-8.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: true
      },
      {
        id: 9,
        name: "Baby Feet and Fingers Socks Set",
        description: "The baby wrist rattle made from organic cotton and soft skin material, give your baby a soft feeling. Our baby sock toys with bright colors but will not fade.",
        price: 80,
        discountPrice: 75,
        images: ["assets/images/products/product-9.1.jpg"],
        color: ["#CECE45", "#F951E2", "#CF0114"],
        size: ["S", "M", "L"],
        quantity: 1,
        isWishlist: false
      }
    ];

    return this.products;
  }

  messageLists(){
    this.message = [
      {
        id: 1,
        customer_id: 21,
        name: "Soe Pyae",
        message: "message1",
        date: "11/25/2021"
      },
      {
        id: 2,
        customer_id: 22,
        name: "Ko Chan",
        message: "message2",
        date: "11/25/2021"
      },
      {
        id: 3,
        customer_id: 21,
        name: "Soe Pyae",
        message: "message3",
        date: "11/25/2021"
      },
      {
        id: 4,
        customer_id: 22,
        name: "Ko Chan",
        message: "message4",
        date: "11/25/2021"
      }
    ];
    return new Promise((resolve) => {
        resolve(this.message);
       });
  }
  createProductMessage(data:any){
    console.log(data);
    return new Promise((resolve)=>{
      this.create(data).subscribe(res=>{
        // console.log("add res "+JSON.stringify(res));
        resolve(res);
      })
    })
  }
}
