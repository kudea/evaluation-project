import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { booking } from './booking';
import { BOOKINGS } from './bookingTable';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  autoComplete(data : any) {
    console.log('autoComplete get ', data)
    return this.http.get(`https://backend-ozaisotptq-wl.a.run.app/search/autocomplete/?word=${data}`)
    // return this.http.get(`/api/search/autocomplete/?word=${data}`)
  }

  searchReview(data : any) {
    console.log('yelp get review ', data)
    return this.http.get(`https://backend-ozaisotptq-wl.a.run.app/search/review/?id=${data}`)
    // return this.http.get(`/api/search/review/?id=${data}`)
  }

  getBookings(): Observable<booking[]>{
    const bookings = of(BOOKINGS);
    return bookings
  }

}
