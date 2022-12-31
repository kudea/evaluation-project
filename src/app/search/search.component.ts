import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Modal } from 'bootstrap'
import { booking } from '../booking';
import { BOOKINGS } from '../bookingTable';
import { ActivatedRoute } from '@angular/router';

declare var bootstrap: any;
declare var window: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {
  
  faTwitter = faTwitter
  faFacebookSquare = faFacebookSquare
  faClock = faClock
  myControl = new FormControl('')
  defaultCate = "all"
  inputWord: any
  options = ['']

  myCarousel: any
  carousel: any

  startAuto(carouselExampleControls: any) {
    this.myCarousel = document.getElementById(`${carouselExampleControls}`)
    this.carousel = new bootstrap.Carousel(this.myCarousel, {
      ride: 'carousel',
      interval: 5000
    })
    this.carousel.cycle()
  }

  stopAuto() {
    this.myCarousel = document.getElementById('carouselExampleControls')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }
    
    this.myCarousel = document.getElementById('carouselExampleControls1')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls2')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls3')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls4')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls5')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls6')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls7')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls8')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }

    this.myCarousel = document.getElementById('carouselExampleControls9')
    try{
      this.carousel.pause()
    }catch(e){
      return
    }
  }

  myKeyword: any
  businessesDetailID: any
  detailCard = [{ detailName: ''}]
  detailCard1 = [{ detailName: ''}]
  detailCard2 = [{ detailName: ''}]
  detailCard3 = [{ detailName: ''}]
  detailCard4 = [{ detailName: ''}]
  detailCard5 = [{ detailName: ''}]
  detailCard6 = [{ detailName: ''}]
  detailCard7 = [{ detailName: ''}]
  detailCard8 = [{ detailName: ''}]
  detailCard9 = [{ detailName: ''}]

  detailfb = [{ detailName: '', twitterName: '' }]
  detailfb1 = [{ detailName: '', twitterName: '' }]
  detailfb2 = [{ detailName: '', twitterName: '' }]
  detailfb3 = [{ detailName: '', twitterName: '' }]
  detailfb4 = [{ detailName: '', twitterName: '' }]
  detailfb5 = [{ detailName: '', twitterName: '' }]
  detailfb6 = [{ detailName: '', twitterName: '' }]
  detailfb7 = [{ detailName: '', twitterName: '' }]
  detailfb8 = [{ detailName: '', twitterName: '' }]
  detailfb9 = [{ detailName: '', twitterName: '' }]

  detailPic = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic1 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic2 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic3 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic4 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic5 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic6 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic7 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic8 = [{ pic1: '', pic2: '', pic3: '' }]
  detailPic9 = [{ pic1: '', pic2: '', pic3: '' }]

  maplat: number = 0
  maplng: number = 0
  maplat1: number = 0
  maplng1: number = 0
  maplat2: number = 0
  maplng2: number = 0
  maplat3: number = 0
  maplng3: number = 0
  maplat4: number = 0
  maplng4: number = 0
  maplat5: number = 0
  maplng5: number = 0
  maplat6: number = 0
  maplng6: number = 0
  maplat7: number = 0
  maplng7: number = 0
  maplat8: number = 0
  maplng8: number = 0
  maplat9: number = 0
  maplng9: number = 0


  mapOptions: google.maps.MapOptions = {
    zoom: 14
  };

  bookings: booking | undefined

  constructor(private service: AppServiceService, private formBuilder: FormBuilder, private modalService: NgbModal, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.findWord()

    this.reserveForm = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm1 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm2 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm3 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm4 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm5 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm6 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm7 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm8 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
    this.reserveForm9 = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })
  }

  reserveForm !: FormGroup
  reserveForm1 !: FormGroup
  reserveForm2 !: FormGroup
  reserveForm3 !: FormGroup
  reserveForm4 !: FormGroup
  reserveForm5 !: FormGroup
  reserveForm6 !: FormGroup
  reserveForm7 !: FormGroup
  reserveForm8 !: FormGroup
  reserveForm9 !: FormGroup

  submitted = false
  submitted1 = false
  submitted2 = false
  submitted3 = false
  submitted4 = false
  submitted5 = false
  submitted6 = false
  submitted7 = false
  submitted8 = false
  submitted9 = false

  toBooking(name: any) {
    this.submitted = true
    if (this.reserveForm.invalid) {
      return
    }
    this.getBooking(this.reserveForm.value, name)
  }
  toBooking1(name: any) {
    this.submitted1 = true
    if (this.reserveForm1.invalid) {
      return
    }
    this.getBooking(this.reserveForm1.value, name)
  }
  toBooking2(name: any) {
    this.submitted2 = true
    if (this.reserveForm2.invalid) {
      return
    }
    this.getBooking(this.reserveForm2.value, name)
  }
  toBooking3(name: any) {
    this.submitted3 = true
    if (this.reserveForm3.invalid) {
      return
    }
    this.getBooking(this.reserveForm3.value, name)
  }
  toBooking4(name: any) {
    this.submitted4 = true
    if (this.reserveForm4.invalid) {
      return
    }
    this.getBooking(this.reserveForm4.value, name)
  }
  toBooking5(name: any) {
    this.submitted5 = true
    if (this.reserveForm5.invalid) {
      return
    }
    this.getBooking(this.reserveForm5.value, name)
  }
  toBooking6(name: any) {
    this.submitted6 = true
    if (this.reserveForm6.invalid) {
      return
    }
    this.getBooking(this.reserveForm6.value, name)
  }
  toBooking7(name: any) {
    this.submitted7 = true
    if (this.reserveForm7.invalid) {
      return
    }
    this.getBooking(this.reserveForm7.value, name)
  }
  toBooking8(name: any) {
    this.submitted8 = true
    if (this.reserveForm8.invalid) {
      return
    }
    this.getBooking(this.reserveForm8.value, name)
  }
  toBooking9(name: any) {
    this.submitted9 = true
    if (this.reserveForm9.invalid) {
      return
    }
    this.getBooking(this.reserveForm9.value, name)
  }

  getBooking(data: any, name: string) {
    BOOKINGS.push({ businessname: name, emailtext: data.emailtext, datetext: data.datetext, hourtext: data.hourtext, mintext: data.mintext })
    localStorage.setItem(name, JSON.stringify({ businessname: name, emailtext: data.emailtext, datetext: data.datetext, hourtext: data.hourtext, mintext: data.mintext }))
    console.log(localStorage)
  }

  action: any = 'Reserve Now'
  action1: any = 'Reserve Now'
  action2: any = 'Reserve Now'
  action3: any = 'Reserve Now'
  action4: any = 'Reserve Now'
  action5: any = 'Reserve Now'
  action6: any = 'Reserve Now'
  action7: any = 'Reserve Now'
  action8: any = 'Reserve Now'
  action9: any = 'Reserve Now'

  closeButton: any
  closeButton1: any
  closeButton2: any
  closeButton3: any
  closeButton4: any
  closeButton5: any
  closeButton6: any
  closeButton7: any
  closeButton8: any
  closeButton9: any

  changeButton() {
    if (this.reserveForm.invalid) {
      return
    }
    if (this.action == 'Reserve Now') {
      this.action = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton = document.getElementById('closeModalB')
      this.closeButton.click()
    }

  }
  changeButton1() {
    if (this.reserveForm1.invalid) {
      return
    }
    if (this.action1 == 'Reserve Now') {
      this.action1 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton1 = document.getElementById('closeModalB1')
      this.closeButton1.click()
    }
  }
  changeButton2() {
    if (this.reserveForm2.invalid) {
      return
    }
    if (this.action2 == 'Reserve Now') {
      this.action2 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton2 = document.getElementById('closeModalB2')
      this.closeButton2.click()
    }
  }
  changeButton3() {
    if (this.reserveForm3.invalid) {
      return
    }
    if (this.action3 == 'Reserve Now') {
      this.action3 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton3 = document.getElementById('closeModalB3')
      this.closeButton3.click()
    }
  }
  changeButton4() {
    if (this.reserveForm4.invalid) {
      return
    }
    if (this.action4 == 'Reserve Now') {
      this.action4 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton4 = document.getElementById('closeModalB4')
      this.closeButton4.click()
    }
  }
  changeButton5() {
    if (this.reserveForm5.invalid) {
      return
    }
    if (this.action5 == 'Reserve Now') {
      this.action5 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton5 = document.getElementById('closeModalB5')
      this.closeButton5.click()
    }
  }
  changeButton6() {
    if (this.reserveForm6.invalid) {
      return
    }
    if (this.action6 == 'Reserve Now') {
      this.action6 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton6 = document.getElementById('closeModalB6')
      this.closeButton6.click()
    }
  }
  changeButton7() {
    if (this.reserveForm7.invalid) {
      return
    }
    if (this.action7 == 'Reserve Now') {
      this.action7 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton7 = document.getElementById('closeModalB7')
      this.closeButton7.click()
    }
  }
  changeButton8() {
    if (this.reserveForm8.invalid) {
      return
    }
    if (this.action8 == 'Reserve Now') {
      this.action8 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton8 = document.getElementById('closeModalB8')
      this.closeButton8.click()
    }
  }
  changeButton9() {
    if (this.reserveForm9.invalid) {
      return
    }
    if (this.action9 == 'Reserve Now') {
      this.action9 = 'Cancel reservation'
      alert('Reservation created!')
      this.closeButton9 = document.getElementById('closeModalB9')
      this.closeButton9.click()
    }
  }

  myModal: Modal | undefined
  myModal1: Modal | undefined
  myModal2: Modal | undefined
  myModal3: Modal | undefined
  myModal4: Modal | undefined
  myModal5: Modal | undefined
  myModal6: Modal | undefined
  myModal7: Modal | undefined
  myModal8: Modal | undefined
  myModal9: Modal | undefined

  openBook(name: string) {
    if (this.action == 'Cancel reservation') {
      this.action = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
      })
      this.myModal?.show()
    }
  }
  openBook1(name: string) {
    if (this.action1 == 'Cancel reservation') {
      this.action1 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal1 = new bootstrap.Modal(document.getElementById('exampleModal1'), {
        keyboard: false
      })
      this.myModal1?.show()
    }
  }
  openBook2(name: string) {
    if (this.action2 == 'Cancel reservation') {
      this.action2 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal2 = new bootstrap.Modal(document.getElementById('exampleModal2'), {
        keyboard: false
      })
      this.myModal2?.show()
    }
  }
  openBook3(name: string) {
    if (this.action3 == 'Cancel reservation') {
      this.action3 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal3 = new bootstrap.Modal(document.getElementById('exampleModal3'), {
        keyboard: false
      })
      this.myModal3?.show()
    }
  }
  openBook4(name: string) {
    if (this.action4 == 'Cancel reservation') {
      this.action4 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal4 = new bootstrap.Modal(document.getElementById('exampleModal4'), {
        keyboard: false
      })
      this.myModal4?.show()
    }
  }
  openBook5(name: string) {
    if (this.action5 == 'Cancel reservation') {
      this.action5 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal5 = new bootstrap.Modal(document.getElementById('exampleModal5'), {
        keyboard: false
      })
      this.myModal5?.show()
    }
  }
  openBook6(name: string) {
    if (this.action6 == 'Cancel reservation') {
      this.action6 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal6 = new bootstrap.Modal(document.getElementById('exampleModal6'), {
        keyboard: false
      })
      this.myModal6?.show()
    }
  }
  openBook7(name: string) {
    if (this.action7 == 'Cancel reservation') {
      this.action7 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal7 = new bootstrap.Modal(document.getElementById('exampleModal7'), {
        keyboard: false
      })
      this.myModal7?.show()
    }
  }
  openBook8(name: string) {
    if (this.action8 == 'Cancel reservation') {
      this.action8 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal8 = new bootstrap.Modal(document.getElementById('exampleModal8'), {
        keyboard: false
      })
      this.myModal8?.show()
    }
  }
  openBook9(name: string) {
    if (this.action9 == 'Cancel reservation') {
      this.action9 = 'Reserve Now'
      alert('Reservation cancelled!')
      for( var i = 0; i < BOOKINGS.length; i++){ 
        if ( BOOKINGS[i].businessname == name) { 
          BOOKINGS.splice(i, 1)
          i--
        }
      }
      localStorage.removeItem(name)
    } else {
      this.myModal9 = new bootstrap.Modal(document.getElementById('exampleModal9'), {
        keyboard: false
      })
      this.myModal9?.show()
    }
  }



  getShow: any

  exitDetail() {
    this.part3 = document.getElementById("part3")
    this.part3.style.display = "block"
    this.getShow = document.getElementById("d0")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d1")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d2")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d3")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d4")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d5")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d6")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d7")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d8")
    this.getShow.style.display = "none"
    this.getShow = document.getElementById("d9")
    this.getShow.style.display = "none"
    this.stopAuto()
    this.tabIndex = 0
  }
  ngAfterViewChecked() {
    const e0 = document.getElementById('td0')
    const e1 = document.getElementById('td1')
    const e2 = document.getElementById('td2')
    const e3 = document.getElementById('td3')
    const e4 = document.getElementById('td4')
    const e5 = document.getElementById('td5')
    const e6 = document.getElementById('td6')
    const e7 = document.getElementById('td7')
    const e8 = document.getElementById('td8')
    const e9 = document.getElementById('td9')

    if (e0) {
      e0.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d0")
        this.getShow.style.display = "block"
      }
    }
    if (e1) {
      e1.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d1")
        this.getShow.style.display = "block"
      }
    }
    if (e2) {
      e2.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d2")
        this.getShow.style.display = "block"
      }
    }
    if (e3) {
      e3.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d3")
        this.getShow.style.display = "block"
      }
    }
    if (e4) {
      e4.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d4")
        this.getShow.style.display = "block"
      }
    }
    if (e5) {
      e5.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d5")
        this.getShow.style.display = "block"
      }
    }
    if (e6) {
      e6.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d6")
        this.getShow.style.display = "block"
      }
    }
    if (e7) {
      e7.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d7")
        this.getShow.style.display = "block"
      }
    }
    if (e8) {
      e8.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d8")
        this.getShow.style.display = "block"
      }
    }
    if (e9) {
      e9.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d9")
        this.getShow.style.display = "block"
      }
    }
  }
  wantSpinner = false

  findWord() {
   
    this.myControl.valueChanges.subscribe((response: any)=> {
      if(response.length > 1) {
        this.wantSpinner = true
        this.getAutoComplete(response)
      } else {
        this.getAutoComplete('')
      }
    })
  }

  getKeyword(keyword: any) {
    this.myKeyword = keyword
  }

  getAutoComplete(dataFromfindWord: any) {
    this.getKeyword(dataFromfindWord)
    
    this.service.autoComplete(dataFromfindWord).subscribe((response: any) => {
      this.options.length = 0
      this.wantSpinner = false
      if (Array.isArray(response.categories)) {
        for (var i = 0; i < response.categories.length; i++) {
          this.options.push(response.categories[i].title)
        }
      }
      if (Array.isArray(response.terms)) {
        for (var i = 0; i < response.terms.length; i++) {
          this.options.push(response.terms[i].text)
        }
      }
    }, (error) => {
      console.log('The error is', error)
    })
  }
  reviewRate = ['']
  reviewName = ['']
  reviewText = ['']
  reviewTime = ['']
  reviewRate1 = ['']
  reviewName1 = ['']
  reviewText1 = ['']
  reviewTime1 = ['']
  reviewRate2 = ['']
  reviewName2 = ['']
  reviewText2 = ['']
  reviewTime2 = ['']

  getReview(data: any, index: any) {
    this.service.searchReview(data).subscribe((response: any) => {
      if (response.reviews[0].rating) {
        this.reviewRate[index] = response.reviews[0].rating
      } else {
        this.reviewRate[index] = 'no Rating'
      }
      if (response.reviews[0].user.name) {
        this.reviewName[index] = response.reviews[0].user.name
      } else {
        this.reviewName[index] = 'no Name'
      }
      if (response.reviews[0].text ) {
        this.reviewText[index] = response.reviews[0].text
      } else {
        this.reviewText[index] = 'no Text'
      }
      if (response.reviews[0].time_created ) {
        this.reviewTime[index] = response.reviews[0].time_created.slice(0, 10)
      } else {
        this.reviewTime[index] = 'no Time'
      }
      if (response.reviews[1].rating) {
        this.reviewRate1[index] = response.reviews[1].rating
      } else {
        this.reviewRate1[index] = 'no Rating'
      }
      if (response.reviews[1].user.name) {
        this.reviewName1[index] = response.reviews[1].user.name
      } else {
        this.reviewName1[index] = 'no Name'
      }
      if (response.reviews[1].text ) {
        this.reviewText1[index] = response.reviews[1].text
      } else {
        this.reviewText1[index] = 'no Text'
      }
      if (response.reviews[1].time_created ) {
        this.reviewTime1[index] = response.reviews[1].time_created.slice(0, 10)
      } else {
        this.reviewTime1[index] = 'no Time'
      }
      if (response.reviews[2].rating) {
        this.reviewRate2[index] = response.reviews[2].rating
      } else {
        this.reviewRate2[index] = 'no Rating'
      }
      if (response.reviews[2].user.name) {
        this.reviewName2[index] = response.reviews[2].user.name
      } else {
        this.reviewName2[index] = 'no Name'
      }
      if (response.reviews[2].text ) {
        this.reviewText2[index] = response.reviews[2].text
      } else {
        this.reviewText2[index] = 'no Text'
      }
      if (response.reviews[2].time_created ) {
        this.reviewTime2[index] = response.reviews[2].time_created.slice(0, 10)
      } else {
        this.reviewTime2[index] = 'no Time'
      }
      
    }, (error) => {
      console.log('The error is', error)
      this.reviewName[index] = 'no Review'
      this.reviewName1[index] = 'no Review'
      this.reviewName2[index] = 'no Review'
    })
  }

  locC: any
  locationApi: any
  locControl(cB: any) {
    this.locC = document.getElementById("loc")
    this.locC.disabled = cB.srcElement.checked ? true : false
    // console.log(cB.srcElement.checked)
    if (cB.srcElement.checked) {
      this.locC.value = ""
      fetch('https://ipinfo.io/76.175.122.164?token=fa2da888e74da4')
        .then((response) => response.json())
        .then((data: any) => {
          this.locationApi = data.loc
          console.log(this.locationApi)
        })
    }
  }

  sleep(littletime: any) {
    var time = Date.now()
    let curTime = null
    do {
      curTime = Date.now()
    }
    while (curTime - time < littletime);
  }

  vectorStoreId: any
  tableWithDataHead: any
  invalidLogData: any
  Crazy: any
  tableWithData: any
  d_tableWithData: any
  alreadyBuild: any
  part3: any

  getDataFromAPI(data: any) {
    this.service.search(data).subscribe((response: any) => {
      console.log('The first table response is', response)
      if (response.status == "ZERO_RESULTS") {
        this.invalidLogData = document.getElementById("invalidLog")
        this.invalidLogData.innerHTML =
          `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
          <div style="border-radius: 30px; background-color: white;">No results available</div>
        </div>`
        return
      }
      if (response.error) {
        this.invalidLogData = document.getElementById("invalidLog")
        this.invalidLogData.innerHTML =
          `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
          <div style="border-radius: 30px; background-color: white;">No results available</div>
        </div>`
        return
      }
      if (Array.isArray(response.businesses)) {
        // for (var i = 0; i < response.businesses.length; i++) {
        //   this.getDetailTable(response.businesses[i].id, i)
        //   this.sleep(300)
        // }
        if (response.businesses.length == 0) {
          this.invalidLogData = document.getElementById("invalidLog")
          this.invalidLogData.innerHTML =
            `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
            <div style="border-radius: 30px; background-color: white;">No results available</div>
          </div>`
          return
        }
        if (0 < response.businesses.length) {
          this.getDetailTable(response.businesses[0].id, 0)
          this.sleep(300)
        }
        if (1 < response.businesses.length) {
          this.getDetailTable1(response.businesses[1].id, 1)
          this.sleep(300)
        }
        if (2 < response.businesses.length) {
          this.getDetailTable2(response.businesses[2].id, 2)
          this.sleep(300)
        }
        if (3 < response.businesses.length) {
          this.getDetailTable3(response.businesses[3].id, 3)
          this.sleep(300)
        }
        if (4 < response.businesses.length) {
          this.getDetailTable4(response.businesses[4].id, 4)
          this.sleep(300)
        }
        if (5 < response.businesses.length) {
          this.getDetailTable5(response.businesses[5].id, 5)
          this.sleep(300)
        }
        if (6 < response.businesses.length) {
          this.getDetailTable6(response.businesses[6].id, 6)
          this.sleep(300)
        }
        if (7 < response.businesses.length) {
          this.getDetailTable7(response.businesses[7].id, 7)
          this.sleep(300)
        }
        if (8 < response.businesses.length) {
          this.getDetailTable8(response.businesses[8].id, 8)
          this.sleep(300)
        }
        if (9 < response.businesses.length) {
          this.getDetailTable9(response.businesses[9].id, 9)
          this.sleep(300)
        }
      }

      function buildTable(response: any, tableWithData: any, part3: any, alreadyBuild: any, vectorStoreId: any) {
        alreadyBuild = false
        function goDetail(detail_api: any) {
          window.location.href = `"#d${detail_api}"`
        }
        if (Array.isArray(response.businesses)) {
          vectorStoreId = []
          var detail_api = 0
          var image_api = ""
          // var data_api = ""
          for (var i = 0; i < response.businesses.length; i++) {
            // data_api = response.businesses[i].id
            if (response.businesses[i].image_url == undefined) {
              image_api = ""
            } else {
              image_api = response.businesses[i].image_url
            }
            vectorStoreId.push(detail_api)
            var row = `
            <tr class="pointer" id="td${detail_api}" (click) = goDetail()>
              <td class="col-sm-1">${i + 1}</td>
              <td class="col-sm-1"><img src="${image_api}" style="display :block; width: 100%; height: 100%; max-height: 8vh; min-height: 8vh; object-fit:cover;"></td>
              <td class="col-sm-5">${response.businesses[i].name}</a></td>
              <td class="col-sm-1">${response.businesses[i].rating}</td>
              <td class="col-sm-3">${Math.round(response.businesses[i].distance / 1609.344)}</td>
            </tr>`
            tableWithData = document.getElementById("dataTable")
            tableWithData.innerHTML += row
            if (alreadyBuild == false) {
              // buildDetailTable(data, data_api, detail_api)
              detail_api = detail_api + 1
            }
          }
          alreadyBuild = true
          part3 = document.getElementById("part3")
          part3.style.display = "block"

        }
      }

      this.tableWithData = document.getElementById("dataTable")
      this.tableWithDataHead = document.getElementById("dataTableHead")
      this.tableWithDataHead.innerHTML =
        `<tr>
        <th class="col-sm-1" id="num">#</th>
        <th class="col-sm-1" id="image">Image</th>
        <th class="col-sm-5" id="bName">Business Name</th>
        <th class="col-sm-1" id="rate">Rating</th>
        <th class="col-sm-3" id="distMile">Distance (miles)</th>
      </tr>`
      buildTable(response, this.tableWithData, this.part3, this.alreadyBuild, this.vectorStoreId)
    }, (error) => {
      console.log('The error is', error)
    })
  }

  d_1html = ''
  d_2html = ''
  d_3html = ''
  d_4html = ''
  d_5html = ''
  d_6html = ''
  d_11html = ''
  d_12html = ''
  d_13html = ''
  d_14html = ''
  d_15html = ''
  d_16html = ''
  d_21html = ''
  d_22html = ''
  d_23html = ''
  d_24html = ''
  d_25html = ''
  d_26html = ''
  d_31html = ''
  d_32html = ''
  d_33html = ''
  d_34html = ''
  d_35html = ''
  d_36html = ''
  d_41html = ''
  d_42html = ''
  d_43html = ''
  d_44html = ''
  d_45html = ''
  d_46html = ''
  d_51html = ''
  d_52html = ''
  d_53html = ''
  d_54html = ''
  d_55html = ''
  d_56html = ''
  d_61html = ''
  d_62html = ''
  d_63html = ''
  d_64html = ''
  d_65html = ''
  d_66html = ''
  d_71html = ''
  d_72html = ''
  d_73html = ''
  d_74html = ''
  d_75html = ''
  d_76html = ''
  d_81html = ''
  d_82html = ''
  d_83html = ''
  d_84html = ''
  d_85html = ''
  d_86html = ''
  d_91html = ''
  d_92html = ''
  d_93html = ''
  d_94html = ''
  d_95html = ''
  d_96html = ''

  getDetailTable(data: any, id: any) {
    this.getReview(data, 0)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard[0].detailName = response.name
      this.detailfb[0].twitterName = response.name

      this.maplat = response.coordinates.latitude
      this.maplng = response.coordinates.longitude
      

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic[0].pic1 = ''
        this.detailPic[0].pic2 = ''
        this.detailPic[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic[0].pic1 = response.photos[0]
        } else {
          this.detailPic[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic[0].pic2 = response.photos[1]
        } else {
          this.detailPic[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic[0].pic3 = response.photos[2]
        } else {
          this.detailPic[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_1html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_1html = ``
      }

      if (d_2NeedHide == false) {
        this.d_2html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_2html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_3html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_3html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }
      }
      else {
        this.d_3html = ``
      }

      if (d_4NeedHide == false) {
        this.d_4html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_4html = ``
      }

      if (d_5NeedHide == false) {
        this.d_5html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_5html = ``
      }

      if (d_6NeedHide == false) {
        this.d_6html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_6html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable1(data: any, id: any) {
    this.getReview(data, 1)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard1[0].detailName = response.name
      this.detailfb1[0].twitterName = response.name

      this.maplat1 = response.coordinates.latitude
      this.maplng1 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb1[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic1[0].pic1 = ''
        this.detailPic1[0].pic2 = ''
        this.detailPic1[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic1[0].pic1 = response.photos[0]
        } else {
          this.detailPic1[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic1[0].pic2 = response.photos[1]
        } else {
          this.detailPic1[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic1[0].pic3 = response.photos[2]
        } else {
          this.detailPic1[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_11html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_11html = ``
      }

      if (d_2NeedHide == false) {
        this.d_12html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_12html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_13html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_13html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_13html = ``
      }

      if (d_4NeedHide == false) {
        this.d_14html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_14html = ``
      }

      if (d_5NeedHide == false) {
        this.d_15html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_15html = ``
      }

      if (d_6NeedHide == false) {
        this.d_16html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_16html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable2(data: any, id: any) {
    this.getReview(data, 2)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard2[0].detailName = response.name
      this.detailfb2[0].twitterName = response.name
      
      this.maplat2 = response.coordinates.latitude
      this.maplng2 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb2[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic2[0].pic1 = ''
        this.detailPic2[0].pic2 = ''
        this.detailPic2[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic2[0].pic1 = response.photos[0]
        } else {
          this.detailPic2[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic2[0].pic2 = response.photos[1]
        } else {
          this.detailPic2[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic2[0].pic3 = response.photos[2]
        } else {
          this.detailPic2[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_21html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_21html = ``
      }

      if (d_2NeedHide == false) {
        this.d_22html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_22html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_23html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_23html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_23html = ``
      }

      if (d_4NeedHide == false) {
        this.d_24html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_24html = ``
      }

      if (d_5NeedHide == false) {
        this.d_25html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_25html = ``
      }

      if (d_6NeedHide == false) {
        this.d_26html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_26html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable3(data: any, id: any) {
    this.getReview(data, 3)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard3[0].detailName = response.name
      this.detailfb3[0].twitterName = response.name

      this.maplat3 = response.coordinates.latitude
      this.maplng3 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb3[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic3[0].pic1 = ''
        this.detailPic3[0].pic2 = ''
        this.detailPic3[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic3[0].pic1 = response.photos[0]
        } else {
          this.detailPic3[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic3[0].pic2 = response.photos[1]
        } else {
          this.detailPic3[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic3[0].pic3 = response.photos[2]
        } else {
          this.detailPic3[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_31html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_31html = ``
      }

      if (d_2NeedHide == false) {
        this.d_32html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_32html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_33html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_33html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_33html = ``
      }

      if (d_4NeedHide == false) {
        this.d_34html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_34html = ``
      }

      if (d_5NeedHide == false) {
        this.d_35html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_35html = ``
      }

      if (d_6NeedHide == false) {
        this.d_36html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_36html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable4(data: any, id: any) {
    this.getReview(data, 4)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard4[0].detailName = response.name
      this.detailfb4[0].twitterName = response.name

      this.maplat4 = response.coordinates.latitude
      this.maplng4 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb4[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic4[0].pic1 = ''
        this.detailPic4[0].pic2 = ''
        this.detailPic4[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic4[0].pic1 = response.photos[0]
        } else {
          this.detailPic4[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic4[0].pic2 = response.photos[1]
        } else {
          this.detailPic4[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic4[0].pic3 = response.photos[2]
        } else {
          this.detailPic4[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_41html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_41html = ``
      }

      if (d_2NeedHide == false) {
        this.d_42html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_42html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_43html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_43html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_43html = ``
      }

      if (d_4NeedHide == false) {
        this.d_44html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_44html = ``
      }

      if (d_5NeedHide == false) {
        this.d_45html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_45html = ``
      }

      if (d_6NeedHide == false) {
        this.d_46html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_46html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable5(data: any, id: any) {
    this.getReview(data, 5)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard5[0].detailName = response.name
      this.detailfb5[0].twitterName = response.name

      this.maplat5 = response.coordinates.latitude
      this.maplng5 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb5[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic5[0].pic1 = ''
        this.detailPic5[0].pic2 = ''
        this.detailPic5[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic5[0].pic1 = response.photos[0]
        } else {
          this.detailPic5[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic5[0].pic2 = response.photos[1]
        } else {
          this.detailPic5[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic5[0].pic3 = response.photos[2]
        } else {
          this.detailPic5[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_51html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_51html = ``
      }

      if (d_2NeedHide == false) {
        this.d_52html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_52html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_53html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_53html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_53html = ``
      }

      if (d_4NeedHide == false) {
        this.d_54html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_54html = ``
      }

      if (d_5NeedHide == false) {
        this.d_55html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_55html = ``
      }

      if (d_6NeedHide == false) {
        this.d_56html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_56html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable6(data: any, id: any) {
    this.getReview(data, 6)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard6[0].detailName = response.name
      this.detailfb6[0].twitterName = response.name

      this.maplat6 = response.coordinates.latitude
      this.maplng6 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb6[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic6[0].pic1 = ''
        this.detailPic6[0].pic2 = ''
        this.detailPic6[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic6[0].pic1 = response.photos[0]
        } else {
          this.detailPic6[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic6[0].pic2 = response.photos[1]
        } else {
          this.detailPic6[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic6[0].pic3 = response.photos[2]
        } else {
          this.detailPic6[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_61html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_61html = ``
      }

      if (d_2NeedHide == false) {
        this.d_62html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_62html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_63html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_63html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_63html = ``
      }

      if (d_4NeedHide == false) {
        this.d_64html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_64html = ``
      }

      if (d_5NeedHide == false) {
        this.d_65html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_65html = ``
      }

      if (d_6NeedHide == false) {
        this.d_66html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_66html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable7(data: any, id: any) {
    this.getReview(data, 7)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard7[0].detailName = response.name
      this.detailfb7[0].twitterName = response.name

      this.maplat7 = response.coordinates.latitude
      this.maplng7 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb7[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic7[0].pic1 = ''
        this.detailPic7[0].pic2 = ''
        this.detailPic7[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic7[0].pic1 = response.photos[0]
        } else {
          this.detailPic7[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic7[0].pic2 = response.photos[1]
        } else {
          this.detailPic7[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic7[0].pic3 = response.photos[2]
        } else {
          this.detailPic7[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_71html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_71html = ``
      }

      if (d_2NeedHide == false) {
        this.d_72html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_72html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_73html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_73html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_73html = ``
      }

      if (d_4NeedHide == false) {
        this.d_74html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_74html = ``
      }

      if (d_5NeedHide == false) {
        this.d_75html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_75html = ``
      }

      if (d_6NeedHide == false) {
        this.d_76html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_76html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable8(data: any, id: any) {
    this.getReview(data, 8)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard8[0].detailName = response.name
      this.detailfb8[0].twitterName = response.name

      this.maplat8 = response.coordinates.latitude
      this.maplng8 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb8[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic8[0].pic1 = ''
        this.detailPic8[0].pic2 = ''
        this.detailPic8[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic8[0].pic1 = response.photos[0]
        } else {
          this.detailPic8[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic8[0].pic2 = response.photos[1]
        } else {
          this.detailPic8[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic8[0].pic3 = response.photos[2]
        } else {
          this.detailPic8[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_81html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_81html = ``
      }

      if (d_2NeedHide == false) {
        this.d_82html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_82html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_83html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_83html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_83html = ``
      }

      if (d_4NeedHide == false) {
        this.d_84html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_84html = ``
      }

      if (d_5NeedHide == false) {
        this.d_85html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_85html = ``
      }

      if (d_6NeedHide == false) {
        this.d_86html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_86html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  getDetailTable9(data: any, id: any) {
    this.getReview(data, 9)
    this.service.searchDetail(data).subscribe((response: any) => {
      this.d_tableWithData = document.getElementById("lastone")
      console.log(response)
      var statusInt = 0
      var d_1NeedHide = false
      var d_2NeedHide = false
      var d_3NeedHide = false
      var d_4NeedHide = false
      var d_5NeedHide = false
      var d_6NeedHide = false

      this.detailCard9[0].detailName = response.name
      this.detailfb9[0].twitterName = response.name

      this.maplat9 = response.coordinates.latitude
      this.maplng9 = response.coordinates.longitude

      var d_address = ""
      if (response.location.display_address == undefined) {
        d_1NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.location.display_address.length != 0) {
            for (var k = 0; k < response.location.display_address.length; k++) {
              d_address += response.location.display_address[k] + ' '
            }
          }
          else {
            d_1NeedHide = true
          }
        }
      }

      var d_phone = ""
      if (response.display_phone == undefined) {
        d_2NeedHide = true
      } else {
        d_phone = response.display_phone
      }

      if (response.hours == undefined) {
        d_3NeedHide = true;
      }
      else {
        if (response.hours[0].is_open_now == true) {
          statusInt = 0
        }
        else if (response.hours[0].is_open_now == false) {
          statusInt = 1
        }
      }

      var d_cate = ""
      if (response.categories == undefined) {
        d_4NeedHide = true
      }
      else {
        if (Array.isArray(response.categories)) {
          if (response.categories.length != 0) {
            for (var j = 0; j < response.categories.length; j++) {
              d_cate += response.categories[j].title
              if (j < response.categories.length - 1) {
                d_cate += " | "
              }
            }
          }
          else {
            d_4NeedHide = true
          }
        }
      }

      var d_price = ""
      if (response.price == undefined) {
        d_5NeedHide = true
      }
      else {
        d_price = response.price
      }

      var d_url = ""
      if (response.url == undefined) {
        d_6NeedHide = true
      }
      else {
        d_url = response.url
        this.detailfb9[0].detailName = response.url
      }

      // deal with no photo problem
      if (response.photos == undefined) {
        this.detailPic9[0].pic1 = ''
        this.detailPic9[0].pic2 = ''
        this.detailPic9[0].pic3 = ''
      }
      else {
        if (response.photos[0]) {
          this.detailPic9[0].pic1 = response.photos[0]
        } else {
          this.detailPic9[0].pic1 = ""
        }

        if (response.photos[1]) {
          this.detailPic9[0].pic2 = response.photos[1]
        } else {
          this.detailPic9[0].pic2 = ""
        }

        if (response.photos[2]) {
          this.detailPic9[0].pic3 = response.photos[2]
        } else {
          this.detailPic9[0].pic3 = ""
        }
      }

      if (d_1NeedHide == false) {
        this.d_91html = `
        <div class="eachInfo" id="d_1">
          <div class="d_title">Address</div>
          <div class="d_text">${d_address}</div>
        </div>`
      }
      else {
        this.d_91html = ``
      }

      if (d_2NeedHide == false) {
        this.d_92html = `
        <div class="eachInfo" id="d_2">
          <div class="d_title">Phone</div>
          <div class="d_text">${d_phone}</div>
        </div>`
      }
      else {
        this.d_92html = ``
      }

      if (d_3NeedHide == false) {
        if (statusInt == 0) {
          this.d_93html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status0">
              <div>Open Now</div>
            </div>
          </div>`
        } else {
          this.d_93html = `
          <div class="eachInfo" id="d_3">
            <div class="d_title">Status</div>
            <div class="d_status1">
              <div>Closed</div>
            </div>
          </div>`
        }

      }
      else {
        this.d_93html = ``
      }

      if (d_4NeedHide == false) {
        this.d_94html = `
        <div class="eachInfo" id="d_4">
          <div class="d_title">Category</div>
          <div class="d_text">${d_cate}</div>
        </div>`
      }
      else {
        this.d_94html = ``
      }

      if (d_5NeedHide == false) {
        this.d_95html = `
        <div class="eachInfo" id="d_5">
          <div class="d_title">Price range</div>
          <div class="d_text">${d_price}</div>
        </div>`
      }
      else {
        this.d_95html = ``
      }

      if (d_6NeedHide == false) {
        this.d_96html = `
        <div class="eachInfo" id="d_6">
          <div class="d_title">Visit yelp for more</div>
          <div class="d_text">
              <a href="${d_url}" target="_blank">Business link</a>
          </div>
        </div>`
      }
      else {
        this.d_96html = ``
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

  distance: any
  category: any
  onSubmit(form: any) {
    var data = ""
    var keyword = this.myKeyword
    this.distance = document.getElementById("dist")
    this.category = document.getElementById("cate")
    var location = form.value.loc
    var checkbox = this.locationApi

    if (this.distance.value != "") {
      console.log("Here comes value", this.distance.value)
    } else {
      console.log("Here comes default value", this.distance.value)
      this.distance.value = 10;
    }

    if (form.value.cB) {
      data = `kWord=${keyword}&dist=${this.distance.value}&cate=${this.category.value}&cB=${checkbox}`
    } else {
      data = `kWord=${keyword}&dist=${this.distance.value}&cate=${this.category.value}&loc=${location}`
    }
    this.getDataFromAPI(data)
  }

  tabIndex: any

  clearForm() {
    // set all things to default (orgin one)
    this.Crazy = document.getElementById("Crazy")
    this.Crazy.reset()
    this.tableWithData = document.getElementById("dataTable")
    this.tableWithData.innerHTML = ''
    // this.d_tableWithData = document.getElementById("lastone")
    // this.d_tableWithData.innerHTML = ''
    this.invalidLogData = document.getElementById("invalidLog")
    this.invalidLogData.innerHTML = ''

    this.alreadyBuild = false
    history.pushState("", document.title, window.location.pathname + window.location.search)
    this.locC = document.getElementById("loc")
    this.locC.disabled = false
    this.d_1html = ''
    this.d_2html = ''
    this.d_3html = ''
    this.d_4html = ''
    this.d_5html = ''
    this.d_6html = ''
    this.d_11html = ''
    this.d_12html = ''
    this.d_13html = ''
    this.d_14html = ''
    this.d_15html = ''
    this.d_16html = ''
    this.d_21html = ''
    this.d_22html = ''
    this.d_23html = ''
    this.d_24html = ''
    this.d_25html = ''
    this.d_26html = ''
    this.d_31html = ''
    this.d_32html = ''
    this.d_33html = ''
    this.d_34html = ''
    this.d_35html = ''
    this.d_36html = ''
    this.d_41html = ''
    this.d_42html = ''
    this.d_43html = ''
    this.d_44html = ''
    this.d_45html = ''
    this.d_46html = ''
    this.d_51html = ''
    this.d_52html = ''
    this.d_53html = ''
    this.d_54html = ''
    this.d_55html = ''
    this.d_56html = ''
    this.d_61html = ''
    this.d_62html = ''
    this.d_63html = ''
    this.d_64html = ''
    this.d_65html = ''
    this.d_66html = ''
    this.d_71html = ''
    this.d_72html = ''
    this.d_73html = ''
    this.d_74html = ''
    this.d_75html = ''
    this.d_76html = ''
    this.d_81html = ''
    this.d_82html = ''
    this.d_83html = ''
    this.d_84html = ''
    this.d_85html = ''
    this.d_86html = ''
    this.d_91html = ''
    this.d_92html = ''
    this.d_93html = ''
    this.d_94html = ''
    this.d_95html = ''
    this.d_96html = ''
    this.detailCard = [{ detailName: ''}]
    this.detailCard1 = [{ detailName: ''}]
    this.detailCard2 = [{ detailName: ''}]
    this.detailCard3 = [{ detailName: ''}]
    this.detailCard4 = [{ detailName: ''}]
    this.detailCard5 = [{ detailName: ''}]
    this.detailCard6 = [{ detailName: ''}]
    this.detailCard7 = [{ detailName: ''}]
    this.detailCard8 = [{ detailName: ''}]
    this.detailCard9 = [{ detailName: ''}]

    this.detailfb = [{ detailName: '', twitterName: '' }]
    this.detailfb1 = [{ detailName: '', twitterName: '' }]
    this.detailfb2 = [{ detailName: '', twitterName: '' }]
    this.detailfb3 = [{ detailName: '', twitterName: '' }]
    this.detailfb4 = [{ detailName: '', twitterName: '' }]
    this.detailfb5 = [{ detailName: '', twitterName: '' }]
    this.detailfb6 = [{ detailName: '', twitterName: '' }]
    this.detailfb7 = [{ detailName: '', twitterName: '' }]
    this.detailfb8 = [{ detailName: '', twitterName: '' }]
    this.detailfb9 = [{ detailName: '', twitterName: '' }]

    this.detailPic = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic1 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic2 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic3 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic4 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic5 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic6 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic7 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic8 = [{ pic1: '', pic2: '', pic3: '' }]
    this.detailPic9 = [{ pic1: '', pic2: '', pic3: '' }]

    this.exitDetail()

    this.part3 = document.getElementById("part3")
    this.part3.style.display = "none"

    this.tabIndex = 0

    this.action = "Reserve Now"
    this.action1 = 'Reserve Now'
    this.action2 = 'Reserve Now'
    this.action3 = 'Reserve Now'
    this.action4 = 'Reserve Now'
    this.action5 = 'Reserve Now'
    this.action6 = 'Reserve Now'
    this.action7 = 'Reserve Now'
    this.action8 = 'Reserve Now'
    this.action9 = 'Reserve Now'
    this.submitted = false
    this.submitted1 = false
    this.submitted2 = false
    this.submitted3 = false
    this.submitted4 = false
    this.submitted5 = false
    this.submitted6 = false
    this.submitted7 = false
    this.submitted8 = false
    this.submitted9 = false

  }
}

