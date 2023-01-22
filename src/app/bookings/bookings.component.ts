import { Component, OnInit } from '@angular/core';
import { booking } from '../booking';
import { faTrashAlt, faTrashCan, faEdit, faClock } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

declare let bootstrap: { 
  Carousel: new (arg0: any, arg1: { ride: string; interval: number; }) => any; 
  Modal: new (arg0: HTMLElement | null, arg1: { keyboard: boolean; }) => Modal | undefined; 
}
declare let window: { location: { href: string; }; }

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBookingTable()
    this.tableControl()
    // reserve info validators
    this.reserveForm = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
  }

  // icon
  faTrashAlt = faTrashAlt
  faTrashCan = faTrashCan
  faEdit = faEdit
  faClock = faClock

  // for booking table
  bookings: booking[] = []

  // for web storage
  localStoragedata: any = []

  // build booking table
  getBookingTable(): void {
    for (let i = 0, len = localStorage.length; i < len; i++) {
      // get data from localStorage
      let data: any = localStorage.getItem(localStorage.key(i)!);
      let parse_date = JSON.parse(data || null);
      this.bookings.push(parse_date);
    }
  }

  // cancel reserve form
  delete(name: string) {
    alert('Reservation cancelled!')
    
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].businessname == name) {
        this.bookings.splice(i, 1)
        break
      }
    }

    localStorage.removeItem(name)
    this.tableControl()
  }

  // isBooking(bookings: booking, name: string) {
  //   if (bookings.businessname == name) {
  //     const index = bookings.businessname.indexOf(name, 0);
  //     this.bookings.splice(index, 1)
  //   }
  //   return bookings;
  // }

  // edit reserve form
  reserveForm !: FormGroup
  submitted: boolean = false

  toBooking(name: string) {
    this.submitted = true
    if (this.reserveForm.invalid) {
      return
    }
    this.getBooking(this.reserveForm.value, name)
  }

  getBooking(data: any, name: string) {

    localStorage.setItem(name, JSON.stringify({ businessname: name, emailtext: data.emailtext, datetext: data.datetext, hourtext: data.hourtext, mintext: data.mintext }))
    console.log(localStorage)
  }

  // close reserve modal
  closeModal() {
    if (this.reserveForm.invalid) {
      return
    }
    alert('Reservation edited!')
    let closeButton : HTMLInputElement = document.getElementById('closeModalB') as HTMLInputElement
    closeButton.click()
    window.location.href = "/bookings"
  }

  // open edit reserve form
  edit(name: string) {

    let myModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement, {
      keyboard: false
    })
    console.log(name+' is editing!')
    myModal?.show()
    this.tableControl()
  }


  tableControl() {
    let part1 : HTMLInputElement = document.getElementById('part1') as HTMLInputElement
    let part2 : HTMLInputElement = document.getElementById('part2') as HTMLInputElement
    if (this.bookings.length == 0) {
      part1.innerHTML = ''
      part2.innerHTML = `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
      <div style="border-radius: 30px; background-color: white;">No reservations to show</div>
      </div>`
      this.bookings.length = 0
    } else {
      part2.innerHTML = ''
    }
  }
}
