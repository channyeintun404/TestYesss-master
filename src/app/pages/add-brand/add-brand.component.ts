import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeaturesService } from 'src/app/services/features.service';
import axios from 'axios';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {
  name: any;
  brand_array: any[];
  selectedFile: any;
  selectImage: string="Please Select File!!";
  imagesUrl: any;
  constructor(private modalController: ModalController,
              private featuresService:FeaturesService) { }

  ngOnInit() {
    this.updateFeatures();
    this.getFeatures();
  }
  getFeatures(){
    this.featuresService.getAllFeatures().then((res: any) => {
  console.log(res)
      // this.option_array = Object.values(resp)
      this.brand_array = [];
      for (const feature of Object.values(res['variants'])) {
        this.brand_array.push(feature)
      }
      console.log(this.brand_array)
    })
    
  }
  updateFeatures(){
    this.featuresService.getFeaturesById().then(res=>{
      const features_array =[];
      for(const feature of Object.values(res['variants'])){
        console.log(feature)
        features_array.push({
          "variant_id": feature['variant_id'],
          "variant": feature['variant'],
          "description": feature['description'],
          "page_title": feature['page_title'],
          "meta_keywords": feature['meta_keywords'],
          "meta_description": feature['meta_description'],
          "lang_code": feature['lang_code'],
          "feature_id": feature["feature_id"],
          "url": feature['url'],
          "position": feature['position'],
          "image_pair": feature['image_pair']
        })
      }
      features_array.push({
        "variant_id":"1",
        "variant": this.name,
        "description": "",
        "page_title": "",
        "meta_keywords": "",
        "meta_description": "",
        "lang_code": "en",
        "feature_id": "18",
        "url": "",
        "position": "99",
        // "image_pair": {
        //   "image_path": this.imagesUrl,
        //   "image_x": "711",
        //   "image_y": "950",
        //   "http_image_path": this.imagesUrl,
        //   "https_image_path": this.imagesUrl
        // }
        // "image_pair": this.imagesUrl,
        "image_pair": {
          "image_id": "0",
          "position": "0",
          "detailed": {
              "object_type": "product",
              "type": "M",
              "image_path": this.imagesUrl,
              "alt": "",
              "image_x": "711",
              "image_y": "950",
              "http_image_path": this.imagesUrl,
              "https_image_path": this.imagesUrl,
              "absolute_path": this.imagesUrl,
              "relative_path": this.imagesUrl
          }
        }
      })
      console.log(features_array)
      const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };
      console.log(convertArrayToObject(features_array,'variant_id'))
      this.featuresService.updateOptions(18,{
        "feature_code": "brand",
        "company_id": "16",
        "feature_type": "E",
        "description": "",
        "variants": features_array
      })
      // this.getFeatures();
    })
  }

  onFileSelected(event){

    this.selectedFile = <File> event.target.files[0];  
    console.log(this.selectedFile)
    this.selectImage = this.selectedFile.name
  }
  
  //upload images
  onUpload(){
    const fd = new FormData();
    fd.append('file',this.selectedFile)
    fd.append("upload_preset", "my-preset"); 
  
    axios({
      // url:'https://api.cloudinary.com/v1_1/u1textile/image/upload',
      url:'https://api.cloudinary.com/v1_1/dvulec2jy/image/upload',
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },data:fd
    }).then((res: any) => {
        console.log(res)
        // this.mainImagesURl= res.data.url
        this.imagesUrl = res.data.url
        this.selectedFile=null;
        this.selectImage="Please Select File!!";     
      }).catch(function(err){
            console.error(err)
          }); 
  }   

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }


}
