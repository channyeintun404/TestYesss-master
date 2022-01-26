import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeaturesService } from 'src/app/services/features.service';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {
  name: any;
  brand_array: any[];

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
        "variant_id":"110",
        "variant": this.name,
        "description": "<p><strong>Abbey Road Studios</strong> is a recording studio located at 3 Abbey Road, St John's Wood, City of Westminster, London, England. It was established in November 1931 by the Gramophone Company, a predecessor of British music company EMI, its present owner. Abbey Road Studios is most notable as being the venue in the 1960s for innovative recording techniques adopted by The Beatles, Pink Floyd, The Hollies, Badfinger and others.<br>\r\n</p>",
        "page_title": "",
        "meta_keywords": "",
        "meta_description": "",
        "lang_code": "en",
        "feature_id": "18",
        "url": "",
        "position": "99",
        "image_pair": {}
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
        "variants": features_array
      })
      // this.getFeatures();
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }


}
