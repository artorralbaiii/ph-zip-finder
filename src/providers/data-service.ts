import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { MM } from  '../assets/data/MM'
import { PR } from  '../assets/data/PR'

@Injectable()
export class DataService {

  constructor(public http: Http) {
  }

  getData(region: string) : Observable<any> {
    let data$ : Observable<any>;

    if (region == 'MM') {
      data$ = Observable.of(MM);
    } else { 
      data$ = Observable.of(PR);
    }

    return data$;
  }

}
