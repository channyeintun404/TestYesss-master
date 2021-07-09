import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-top-slider',
  templateUrl: './home-top-slider.component.html',
  styleUrls: ['./home-top-slider.component.scss'],
})
export class HomeTopSliderComponent implements OnInit {

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: true,
    autoplay: true,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  constructor() { }

  ngOnInit() { }

}
