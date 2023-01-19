import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  autoComplete(data : string) {
    console.log('autoComplete get ', data)
    return this.http.get(`http://localhost:8080/search/autocomplete/?word=${data}`)
  }

  searchReview(data : string) {
    console.log('yelp get review ', data)
    return this.http.get(`http://localhost:8080/search/review/?id=${data}`)
  }


}
