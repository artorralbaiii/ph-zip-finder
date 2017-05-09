import { Component, OnInit } from '@angular/core';
import {NavParams} from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  allZip: any[];
  cities : string[];
  displayCities: string[];
  region : string;
  searchText : string;
  title : string;
  zipCodes: any[];

  constructor( private navParams: NavParams ,private ds : DataService) {
    this.region = navParams.get('region') || 'MM';
    this.title = (this.region == 'MM' ? 'Metro Manila' : 'Provincial');  
  }

  ngOnInit() {
    this.ds.getData(this.region)
      .subscribe(data => {
        this.cities = _.keys(data) ;
        this.displayCities = this.cities;
        this.zipCodes = data;
        this.allZip = _.clone(this.zipCodes);
      });
  }
 
    searchData(ev: any) {
      let searchKey = ev.target.value;
      let excludedCities = [];

      for (let city of this.cities) {

        this.zipCodes[city] = this.allZip[city].filter(zip => {
          return zip.location.toLowerCase().indexOf(searchKey.toLowerCase()) >= 0;
        }); 

        if (this.zipCodes[city].length == 0 ) {
          excludedCities.push(city);
        }

        this.displayCities = _.difference(this.cities, excludedCities);
      }
    }
}
