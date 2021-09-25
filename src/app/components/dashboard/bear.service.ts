import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BearService {

  constructor(private http: HttpClient) { }

  getAllBears(){
    return this.http.get('https://api.punkapi.com/v2/beers').pipe(map(res => {
        const info = [];
        for(let key in res){
          info.push({ name : res[key].name,tagline : res[key].tagline,first_brewed : res[key].first_brewed,description : res[key].description,image_url : res[key].image_url,contributed_by : res[key].contributed_by,ingredients : res[key].ingredients});
        }
        return info;
    }))
  }


}
