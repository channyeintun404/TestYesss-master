import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
  export class StatesService extends AppService {
  states: any[];

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('states');
    }

  getAllState(){
    this.states = [
      {
        id: 1,
        code: "AYA",
        province: "Ayerwaddy",
        status: "Active"
      },
      {
        id: 2,
        code: "BG",
        province: "BaGo",
        status: "Active"
      },
      {
        id: 3,
        code: "BM",
        province: "Bha Maw",
        status: "Active"
      },
      {
        id: 4,
        code: "CS",
        province: "Chin",
        status: "Active"
      },
      {
        id: 5,
        code: "KC",
        province: "Kachin",
        status: "Active"
      },
      {
        id: 6,
        code: "KY",
        province: "Kayar",
        status: "Active"
      },
      {
        id: 7,
        code: "LSH",
        province: "Lashio",
        status: "Active"
      },
      {
        id: 8,
        code: "	MGW",
        province: "Ma Gway",
        status: "Active"
      },
      {
        id: 9,
        code: "MDY",
        province: "Mandalay",
        status: "Active"
      },
      {
        id: 10,
        code: "	MS",
        province: "Mon",
        status: "Active"
      },
      {
        id: 11,
        code: "MWA",
        province: "Mon Ywa",
        status: "Active"
      },
      {
        id: 12,
        code: "MGN",
        province: "Myit Gyi Na",
        status: "Active"
      },
      {
        id: 13,
        code: "NPD",
        province: "Nay Pyi Daw",
        status: "Active"
      },
      {
        id: 14,
        code: "PT",
        province: "Pa Thein",
        status: "Active"
      },
      {
        id: 15,
        code: "PKK",
        province: "Pakkoku",
        status: "Active"
      },
      {
        id: 16,
        code: "RK",
        province: "Ra Khaing",
        status: "Active"
      },
      {
        id: 17,
        code: "SB",
        province: "Shwe Bo",
        status: "Active"
      },
      {
        id: 18,
        code: "SG",
        province: "Sit Gai",
        status: "Active"
      },
      {
        id: 19,
        code: "TM",
        province: "Ta Mu",
        status: "Active"
      },
      {
        id: 20,
        code: "TG",
        province: "Taung Gyi",
        status: "Active"
      },
      {
        id: 21,
        code: "YGN",
        province: "Yangon",
        status: "Active"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.states);
     });
  }
  }
  