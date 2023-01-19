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

  closeButton: any

  // close reserve modal
  closeModal() {
    if (this.reserveForm.invalid) {
      return
    }
    alert('Reservation edited!')
    this.closeButton = document.getElementById('closeModalB')
    this.closeButton.click()
    window.location.href = "/bookings"
  }

  // open reserve form
  myModal: Modal | undefined

  edit(name: string) {

    this.myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    console.log(name+' is editing!')
    this.myModal?.show()
    this.tableControl()
  }

  // html component
  part1: any
  part2: any
  title: any

  tableControl() {
    if (this.bookings.length == 0) {
      this.part1 = document.getElementById('part1')
      this.part1.innerHTML = ''
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
