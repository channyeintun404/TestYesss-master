import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
  export class StatesService extends AppService {
  states: any[];
  townships: any[];
  cities: any[];

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('states');
    }

  getAllTownship(){
    this.townships=[
      {
        id: 1,
        citycode: "Amarapura",
        name: "Amarapura",
        status: "Active"
      },
      {
        id: 2,
        citycode: "Patheingyi",
        name: "Patheingyi",
        status: "Active"
      },
      {
        id: 3,
        citycode: "Kyaukpadaung",
        name: "Kyaukpadaung",
        status: "Active"
      },
      {
        id: 4,
        citycode: "Kyukse",
        name: "Kyukse",
        status: "Active"
      },
      {
        id: 5,
        citycode: "Madaya",
        name: "Madaya",
        status: "Active"
      },
      {
        id: 6,
        citycode: "Meikhtila",
        name: "Meikhtila",
        status: "Active"
      },
      {
        id: 7,
        citycode: "Mandalay",
        name: "Aung Myay Thar Zan",
        status: "Active"
      },
      {
        id: 8,
        citycode: "Mandalay",
        name: "Chan Aye Thar Zan",
        status: "Active"
      },
      {
        id: 9,
        citycode: "Mandalay",
        name: "Chan Mya Thar Zi",
        status: "Active"
      },
      {
        id: 10,
        citycode: "Mandalay",
        name: "Maha Aung Myay",
        status: "Active"
      },
      {
        id: 11,
        citycode: "Mandalay",
        name: "Pyi Gyi Tagon",
        status: "Active"
      },
      {
        id: 12,
        citycode: "Myingyan",
        name: "Myingyan",
        status: "Active"
      },
      {
        id: 13,
        citycode: "Nyaung-U",
        name: "Bagan",
        status: "Active"
      },
      {
        id: 14,
        citycode: "Nyaung-U",
        name: "Nyaung-U",
        status: "Active"
      },
      {
        id: 15,
        citycode: "Natogyi",
        name: "Natogyi",
        status: "Active"
      },
      {
        id: 16,
        citycode: "Pyawbwe",
        name: "Pyawbwe",
        status: "Active"
      },
      {
        id: 17,
        citycode: "Pyinoolwin",
        name: "Pyinoolwin",
        status: "Active"
      },
      {
        id: 18,
        citycode: "Singu",
        name: "Singu",
        status: "Active"
      },
      {
        id: 19,
        citycode: "Sintgaing",
        name: "Sintgaing",
        status: "Active"
      },
      {
        id: 20,
        citycode: "Tada-U",
        name: "Tada-U",
        status: "Active"
      },
      {
        id: 21,
        citycode: "Thazi",
        name: "Thazi",
        status: "Active"
      },
      {
        id: 22,
        citycode: "Wundwin",
        name: "Wundwin",
        status: "Active"
      },
      {
        id: 23,
        citycode: "Yamethin",
        name: "Yamethin",
        status: "Active"
      },
      {
        id: 24,
        citycode: "Yangon",
        name: "Ahlone",
        status: "Active"
      },
      {
        id: 25,
        citycode: "Yangon",
        name: "Bahan",
        status: "Active"
      },
      {
        id: 26,
        citycode: "Yangon",
        name: "Botataung",
        status: "Active"
      },
      {
        id: 27,
        citycode: "Yangon",
        name: "Dagon Downtown",
        status: "Active"
      },
      {
        id: 28,
        citycode: "Yangon",
        name: "Dawbon",
        status: "Active"
      },
      {
        id: 29,
        citycode: "Yangon",
        name: "Hlaing",
        status: "Active"
      },
      {
        id: 30,
        citycode: "Yangon",
        name: "Hlaing Tharya",
        status: "Active"
      },
      {
        id: 31,
        citycode: "Yangon",
        name: "Insein",
        status: "Active"
      },
      {
        id: 32,
        citycode: "Yangon",
        name: "Kamayut",
        status: "Active"
      },
      {
        id: 33,
        citycode: "Yangon",
        name: "Kyauktada",
        status: "Active"
      },
      {
        id: 34,
        citycode: "Yangon",
        name: "Kyi Myin Daing",
        status: "Active"
      },
      {
        id: 35,
        citycode: "Yangon",
        name: "Lan Madaw",
        status: "Active"
      },
      {
        id: 36,
        citycode: "Yangon",
        name: "Latha",
        status: "Active"
      },
      {
        id: 37,
        citycode: "Yangon",
        name: "Mayangone 9 mile Pyay",
        status: "Active"
      },
      {
        id: 38,
        citycode: "Yangon",
        name: "Mayangone Kabaraye",
        status: "Active"
      },
      {
        id: 39,
        citycode: "Yangon",
        name: "Mayangone kyaik Waing",
        status: "Active"
      },
      {
        id: 40,
        citycode: "Yangon",
        name: "Sanchaung",
        status: "Active"
      },
      {
        id: 41,
        citycode: "Yangon",
        name: "Shwepyitha",
        status: "Active"
      },
      {
        id: 42,
        citycode: "Yangon",
        name: "South Oakalapa",
        status: "Active"
      },
      {
        id: 43,
        citycode: "Yangon",
        name: "Tamwe",
        status: "Active"
      },
      {
        id: 44,
        citycode: "Yangon",
        name: "Thakata",
        status: "Active"
      },
      {
        id: 45,
        citycode: "Yangon",
        name: "Thanlwin",
        status: "Active"
      },
      {
        id: 46,
        citycode: "Yangon",
        name: "Thingangkunn",
        status: "Active"
      },
      {
        id: 47,
        citycode: "Yangon",
        name: "Yankin",
        status: "Active"
      },
      {
        id: 48,
        citycode: "Yangon",
        name: "Pazundaung",
        status: "Active"
      },
      {
        id: 49,
        citycode: "Yangon",
        name: "Pabedan",
        status: "Active"
      },
      {
        id: 50,
        citycode: "Yangon",
        name: "North Oakalapa",
        status: "Active"
      },
      {
        id: 51,
        citycode: "Yangon",
        name: "Minglartaungnyunt",
        status: "Active"
      },
      {
        id: 52,
        citycode: "Yangon",
        name: "Mingaladon",
        status: "Active"
      },
      {
        id: 53,
        citycode: "Yangon",
        name: "Myawbi",
        status: "Active"
      },
      {
        id: 54,
        citycode: "Yangon",
        name: "Mayangone Thamine",
        status: "Active"
      },
      {
        id: 55,
        citycode: "Yangon",
        name: "Mayangone Parami",
        status: "Active"
      },
      {
        id: 56,
        citycode: "Cocokyun",
        name: "Cocokyun",
        status: "Active"
      },
      {
        id: 57,
        citycode: "Dala",
        name: "Dala",
        status: "Active"
      },
      {
        id: 58,
        citycode: "Hlegu",
        name: "Hlegu",
        status: "Active"
      },
      {
        id: 59,
        citycode: "Htantabin",
        name: "Htantabin",
        status: "Active"
      },
      {
        id: 60,
        citycode: "Htauk Kyant",
        name: "Htauk Kyant",
        status: "Active"
      },
      {
        id: 61,
        citycode: "Kawhmu",
        name: "Kawhmu",
        status: "Active"
      },
      {
        id: 62,
        citycode: "Kayan",
        name: "Kayan",
        status: "Active"
      },
      {
        id: 63,
        citycode: "Kungyangon",
        name: "Kungyangon",
        status: "Active"
      },
      {
        id: 64,
        citycode: "Seikgyikanaungto",
        name: "Seikgyikanaungto",
        status: "Active"
      },
      {
        id: 65,
        citycode: "Taikkyi",
        name: "Taikkyi",
        status: "Active"
      },
      {
        id: 66,
        citycode: "Thongwa",
        name: "Thongwa",
        status: "Active"
      },
      {
        id: 67,
        citycode: "Twantay",
        name: "Twantay",
        status: "Active"
      },
      {
        id: 68,
        citycode: "Dagon Myothit",
        name: "Dagon Seikkan",
        status: "Active"
      },
      {
        id: 69,
        citycode: "Dagon Myothit",
        name: "East Dagon",
        status: "Active"
      },
      {
        id: 70,
        citycode: "Dagon Myothit",
        name: "North Dagon Word 27-33",
        status: "Active"
      },
      {
        id: 71,
        citycode: "Dagon Myothit",
        name: "North Dagon Word 34-45",
        status: "Active"
      },
      {
        id: 72,
        citycode: "Dagon Myothit",
        name: "North Dagon Word 46-50",
        status: "Active"
      },
      {
        id: 73,
        citycode: "Dagon Myothit",
        name: "South Dagon",
        status: "Active"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.townships);
     });
  }

  getAllCity(){
    this.cities = [
      {
        id: 1,
        citycode: "Mandalay",
        statecode:"MDY",
        city: "Mandalay",
        status: "Active"
      },
      {
        id: 2,
        citycode: "Amarapura",
        statecode:"MDY",
        city: "Amarapura",
        status: "Active"
      },
      {
        id: 3,
        citycode: "Patheingyi",
        statecode:"MDY",
        city: "Patheingyi",
        status: "Active"
      },
      {
        id: 4,
        citycode: "Kyaukpadaung",
        statecode:"MDY",
        city: "Kyaukpadaung",
        status: "Active"
      },
      {
        id: 5,
        citycode: "Kyukse",
        statecode:"MDY",
        city: "Kyukse",
        status: "Active"
      },
      {
        id: 6,
        citycode: "Madaya",
        statecode:"MDY",
        city: "Madaya",
        status: "Active"
      },
      {
        id: 7,
        citycode: "Meikhtila",
        statecode:"MDY",
        city: "Meikhtila",
        status: "Active"
      },
      {
        id: 8,
        citycode: "Mogoke",
        statecode:"MDY",
        city: "Mogoke",
        status: "Active"
      },
      {
        id: 9,
        citycode: "Myingyan",
        statecode:"MDY",
        city: "Myingyan",
        status: "Active"
      },
      {
        id: 10,
        citycode: "Nyaung-U",
        statecode:"MDY",
        city: "Nyaung-U",
        status: "Active"
      },
      {
        id: 11,
        citycode: "Natogyi",
        statecode:"MDY",
        city: "Natogyi",
        status: "Active"
      },
      {
        id: 12,
        citycode: "Pyawbwe",
        statecode:"MDY",
        city: "Pyawbwe",
        status: "Active"
      },
      {
        id: 13,
        citycode: "Pyinoolwin",
        statecode:"MDY",
        city: "Pyinoolwin",
        status: "Active"
      },
      {
        id: 14,
        citycode: "Singu",
        statecode:"MDY",
        city: "Singu",
        status: "Active"
      },
      {
        id: 15,
        citycode: "Sintgaing",
        statecode:"MDY",
        city: "Sintgaing",
        status: "Active"
      },
      {
        id: 16,
        citycode: "Tada-U",
        statecode:"MDY",
        city: "Tada-U",
        status: "Active"
      },
      {
        id: 17,
        citycode: "Thazi",
        statecode:"MDY",
        city: "Thazi",
        status: "Active"
      },
      {
        id: 18,
        citycode: "Wundwin",
        statecode:"MDY",
        city: "Wundwin",
        status: "Active"
      },
      {
        id: 19,
        citycode: "Yamethin",
        statecode:"MDY",
        city: "Yamethin",
        status: "Active"
      },
      {
        id: 20,
        citycode: "Yangon",
        statecode:"YGN",
        city: "Yangon",
        status: "Active"
      },
      {
        id: 21,
        citycode: "Cocokyun",
        statecode:"YGN",
        city: "Cocokyun",
        status: "Active"
      },
      {
        id: 22,
        citycode: "Dala",
        statecode:"YGN",
        city: "Dala",
        status: "Active"
      },
      {
        id: 23,
        citycode: "Hlegu",
        statecode:"YGN",
        city: "Hlegu",
        status: "Active"
      },
      {
        id: 24,
        citycode: "Htantabin",
        statecode:"YGN",
        city: "Htantabin",
        status: "Active"
      },
      {
        id: 25,
        citycode: "Htauk Kyant",
        statecode:"YGN",
        city: "Htauk Kyant",
        status: "Active"
      },
      {
        id: 26,
        citycode: "Kawhmu",
        statecode:"YGN",
        city: "Kawhmu",
        status: "Active"
      },
      {
        id: 27,
        citycode: "Kayan",
        statecode:"YGN",
        city: "Kayan",
        status: "Active"
      },
      {
        id: 28,
        citycode: "Kungyangon",
        statecode:"YGN",
        city: "Kungyangon",
        status: "Active"
      },
      {
        id: 29,
        citycode: "Seikgyikanaungto",
        statecode:"YGN",
        city: "Seikgyikanaungto",
        status: "Active"
      },
      {
        id: 30,
        citycode: "Taikkyi",
        statecode:"YGN",
        city: "Taikkyi",
        status: "Active"
      },
      {
        id: 31,
        citycode: "Thongwa",
        statecode:"YGN",
        city: "YangoThongwan",
        status: "Active"
      },
      {
        id: 32,
        citycode: "Twantay",
        statecode:"YGN",
        city: "Twantay",
        status: "Active"
      },
      {
        id: 33,
        citycode: "Dagon Myothit",
        statecode:"YGN",
        city: "Dagon Myothit",
        status: "Active"
      },
      {
        id: 34,
        citycode: "Dhatkhina Thiri",
        statecode:"NPT",
        city: "Dhatkhina Thiri",
        status: "Active"
      },
      {
        id: 35,
        citycode: "Lewe",
        statecode:"NPT",
        city: "Lewe",
        status: "Active"
      },
      {
        id: 36,
        citycode: "Oattara Thiri",
        statecode:"NPT",
        city: "Oattara Thiri",
        status: "Active"
      },
      {
        id: 37,
        citycode: "Pobba Thiri",
        statecode:"NPT",
        city: "Pobba Thiri",
        status: "Active"
      },
      {
        id: 38,
        citycode: "Pyinmana",
        statecode:"NPT",
        city: "Pyinmana",
        status: "Active"
      },
      {
        id: 39,
        citycode: "Tatkon",
        statecode:"NPT",
        city: "Tatkon",
        status: "Active"
      },
      {
        id: 40,
        citycode: "Zebuthiri",
        statecode:"NPT",
        city: "Zebuthiri",
        status: "Active"
      },
      {
        id: 41,
        citycode: "Zayar Thiri",
        statecode:"NPT",
        city: "Zayar Thiri",
        status: "Active"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.cities);
     });
  }

  getAllState(){
    this.states = [
      {
        id: 1,
        code: "MDY",
        province: "Mandalay",
        status: "Active"
      },
      {
        id: 2,
        code: "YGN",
        province: "Yangon",
        status: "Active"
      },
      {
        id: 3,
        code: "NPT",
        province: "Naypyitaw",
        status: "Active"
      },
      {
        id: 4,
        code: "SAG",
        province: "Sagaing",
        status: "Active"
      },
      {
        id: 5,
        code: "AYA",
        province: "Ayeyarwaddy",
        status: "Active"
      },
      {
        id: 6,
        code: "Bago",
        province: "Bago",
        status: "Active"
      },
      {
        id: 7,
        code: "Magway",
        province: "Magway",
        status: "Active"
      },
      {
        id: 8,
        code: "Tanintharyi",
        province: "Tanintharyi",
        status: "Active"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.states);
     });
  }
  }
  