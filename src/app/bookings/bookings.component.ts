import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { booking } from '../booking';
import { BOOKINGS } from '../bookingTable';
import { faTrashAlt, faTrashCan, faEdit, faClock } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap'

declare var bootstrap: any;
declare var window: any;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: booking[] = []

  // icon
  faTrashAlt = faTrashAlt
  faTrashCan = faTrashCan
  faEdit = faEdit
  faClock = faClock

  constructor(private service: AppServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookingTable()
    this.tableControl()
    // reserve info validators
    this.reserveForm = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
  }

  localStoragedata: any = []

  // cancel reserve
  delete(name: string) {
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

  // control reserve form
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
    BOOKINGS.push({ businessname: name, emailtext: data.emailtext, datetext: data.datetext, hourtext: data.hourtext, mintext: data.mintext })
    localStorage.setItem(name, JSON.stringify({ businessname: name, emailtext: data.emailtext, datetext: data.datetext, hourtext: data.hourtext, mintext: data.mintext }))
    console.log(localStorage)
  }

  action: string = 'Reserve Now'
  closeButton: any

  // close modal
  changeButton() {
    if (this.reserveForm.invalid) {
      return
    }
    if (this.action == 'Reserve Now') {
      this.action = 'Cancel reservation'
      alert('Reservation edited!')
      this.closeButton = document.getElementById('closeModalB')
      this.closeButton.click()
    }
    window.location.href = "/bookings"
  }

  // open reserve form
  myModal: Modal | undefined

  edit(name: string) {

    this.myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.myModal?.show()
    this.tableControl()
  }

  // build booking table
  bookingTable(): void {
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

  // innerHTML
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
