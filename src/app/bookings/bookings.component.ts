import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { booking } from '../booking';
import { BOOKINGS } from '../bookingTable';
import { faTrashAlt, faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: booking[] = []

  faTrashAlt = faTrashAlt
  faTrashCan = faTrashCan
  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
    this.reserveTable()
    this.tableControl()
  }
  localStoragedata: any = []

  delete(name: any) {
    alert('Reservation cancelled!')
    for( var i = 0; i < this.bookings.length; i++){ 
      if ( this.bookings[i].businessname == name) { 
        this.bookings.splice(i, 1)
        i--
      }
    }
    for( var i = 0; i < BOOKINGS.length; i++){ 
      if ( BOOKINGS[i].businessname == name) { 
        BOOKINGS.splice(i, 1)
        i--
      }
    }
    localStorage.removeItem(name)
    this.tableControl()
  }
  reserveTable(): void {
    this.service.getBookings()
      .subscribe(bookings => {
        for (var i = 0, len = localStorage.length; i < len; i++) {
          this.localStoragedata[i] = localStorage.getItem(localStorage.key(i)||'')
          this.bookings.push(JSON.parse(this.localStoragedata[i]))
        }
        console.log(this.bookings)
        console.log(localStorage)
      })
  }

  part1: any
  part2: any
  title: any

  tableControl() {
    if (this.bookings.length == 0) {
      this.part1 = document.getElementById('part1')
      this.part1.innerHTML= ''
      this.part2 = document.getElementById('part2')
      this.part2.innerHTML = `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
      <div style="border-radius: 30px; background-color: white;">No reservations to show</div>
      </div>`
      this.bookings.length = 0 
    } else {
      this.part2 = document.getElementById('part2')
      this.part2.innerHTML = ''
    }
  }

  
}
