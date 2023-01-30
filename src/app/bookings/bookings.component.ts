import { Component, OnInit } from '@angular/core';
import { booking } from '../booking';
import { faTrashAlt, faTrashCan, faEdit, faClock } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { isEmpty, isNonEmpty } from 'fp-ts/Array';
import { Either, left, right } from 'fp-ts/Either'
import { chain } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const noSpace = (s: string): Either<string, string> =>
  s.indexOf(' ') == -1 ? right(s) : left('No Space Allow')

const formatCheck = (s: string): Either<string, string> =>
  s.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) ? right(s) : left('Invalid Email Format')

const validateEmail = (s: string): Either<string, string> =>
  pipe(
    noSpace(s),
    chain(formatCheck)
  )

declare let bootstrap: {
  Carousel: new (arg0: any, arg1: { ride: string; interval: number; }) => any;
  Modal: new (arg0: HTMLElement | null, arg1: { keyboard: boolean; }) => Modal | undefined;
}
declare let window: { location: { href: string; }; }

// === — strict equality (triple equals); == — loose equality (double equals)

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
      emailtext: ['', [Validators.required, this.noSpaceAllow, this.validateAtSign, this.validateAddress, this.validateDomain]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
  }

  // Customize Validator from angular form
  noSpaceAllow(control: FormGroup) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllow: true }
    }
    return null
  }

  validateAtSign(control: FormGroup) {
    if (!control.value.includes('@')) {
      return { validateAtSign: true }
      // Email must contain "@" sign
    }
    return null
  }

  validateAddress(control: FormGroup) {
    if (control.value.split('@')[0]?.length === 0) {
      return { validateAddress: true }
      // Email local-part must be present
    }
    return null
  }

  validateDomain(control: FormGroup) {
    if (!/\w+\.\w{2,}/ui.test(control.value.split('@')[1])) {
      return { validateDomain: true }
      // Email domain must be in form "example.tld"
    }
    return null
  }

  // icon
  faTrashAlt = faTrashAlt
  faTrashCan = faTrashCan
  faEdit = faEdit
  faClock = faClock

  // for booking table
  bookings: booking[] = []

  // build booking table
  getBookingTable() {

    for (let i = 0, len = localStorage.length; i < len; i++) {
      // get all data from localStorage
      let data: any = localStorage.getItem(localStorage.key(i)!);
      let parse_date = JSON.parse(data);
      this.bookings.push(parse_date);
    }
  }

  // cancel reserve form
  delete(name: string) {
    alert('Reservation cancelled!')

    let selectedIndex = this.bookings.findIndex(value => value.businessname == name)
    this.bookings.splice(selectedIndex, 1)
    localStorage.removeItem(name)

    this.tableControl()
  }

  // edit reserve form
  reserveForm !: FormGroup
  submitted: boolean = false

  // open edit reserve form
  editingName: string = ''
  edit(name: string) {

    let myModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement, {
      keyboard: false
    })
    console.log(name + ' is editing!')
    this.editingName = name
    myModal?.show()
    this.tableControl()
  }

  toBooking() {
    this.submitted = true
    if (this.reserveForm.invalid) {
      return
    }
    this.getBooking(this.reserveForm.value, this.editingName)
  }

  getBooking(data: any, name: string) {
    let checkedEmail = validateEmail(data.emailtext)
    if (checkedEmail._tag == 'Right') {
      localStorage.setItem(name, JSON.stringify({ businessname: name, emailtext: checkedEmail.right, datetext: data.datetext, hourtext: data.hourtext, mintext: data.mintext }))
    }
    else {
      console.error(checkedEmail)
    }
    
    console.log(localStorage)
  }

  // close reserve modal
  closeModal() {
    if (this.reserveForm.invalid) {
      return
    }
    alert('Reservation edited!')
    let closeButton: HTMLInputElement = document.getElementById('closeModalB') as HTMLInputElement
    closeButton.click()
    window.location.href = "/bookings"
  }

  // Action when localStorage is empty
  tableControl() {
    let part1: HTMLInputElement = document.getElementById('part1') as HTMLInputElement
    let part2: HTMLInputElement = document.getElementById('part2') as HTMLInputElement
    if (isEmpty(this.bookings)) {
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
