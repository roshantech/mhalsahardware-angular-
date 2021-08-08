import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {exhaustMap, map ,take} from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  constructor(private http: HttpClient,private auth: AuthService) { }
   mainUrl = 'http://localhost:3000/items';
   token ;
  getAllItems() {
     
        return this.http.get<any>('http://localhost:3000/auth/items/all').pipe(
         map(res => {
        const posts = [];
        for(let key in res){
          posts.push( { Description: res[key].Description , id : res[key]._id , AU:res[key].AU ,Quantity:res[key].Quantity,Amount:res[key].Amount,PPrice:res[key].PPrice,SPrice:res[key].SPrice });
        }
        return posts;
      }) )
  }

  getById(id: any){
    return this.http.get<any>(`http://localhost:3000/auth/items/${id}`)
  }

  updateById(id: any , body :any){
    return this.http.put<any>(`http://localhost:3000/auth/items/${id}`,body)
  }

  deleteById(id:any) {
    return this.http.delete<any>(`http://localhost:3000/auth/items/${id}`)
  }

  addItem(data:any){
    return this.http.post<any>(`http://localhost:3000/auth/items`,data)

  }


}
