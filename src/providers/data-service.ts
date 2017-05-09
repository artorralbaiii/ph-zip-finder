import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: Http) {
  }

  getData(region: string) : Observable<any> {
    return this.http.get('../assets/data/' + region + '.json')
      .map(res => res.json());
  }

}
