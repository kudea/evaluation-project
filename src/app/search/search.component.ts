import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'bootstrap';
import { booking } from '../booking';
import axios from 'axios';

declare let bootstrap: { 
  Carousel: new (arg0: any, arg1: { ride: string; interval: number; }) => any; 
  Modal: new (arg0: HTMLElement | null, arg1: { keyboard: boolean; }) => Modal | undefined; 
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class SearchComponent implements OnInit {

  constructor(private service: AppServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.findWord()

    // reserve info validators
    this.reserveForm = this.formBuilder.group({
      emailtext: ['', [Validators.required, Validators.email]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })

  }

  // Search Form Part

  // input form
  myControl = new FormControl('')

  // search form spinner at auto complete
  wantSpinner: boolean = false
  // filter for autoConplete
  findWord() {
    this.myControl.valueChanges.subscribe((response: any) => {
      if (response.length > 1) {
        this.wantSpinner = true
        this.getAutoComplete(response)
      } else {
        this.getAutoComplete('')
      }
    })
  }

  getKeyword(keyword: string) {
    this.myKeyword = keyword
  }

  options = ['']
  getAutoComplete(dataFromfindWord: string) {
    this.getKeyword(dataFromfindWord)

    this.service.autoComplete(dataFromfindWord).subscribe((response: any) => {
      this.options.length = 0
      this.wantSpinner = false
      if (Array.isArray(response.categories)) {
        for (let i = 0; i < response.categories.length; i++) {
          this.options.push(response.categories[i].title)
        }
      }
      if (Array.isArray(response.terms)) {
        for (let i = 0; i < response.terms.length; i++) {
          this.options.push(response.terms[i].text)
        }
      }
    }, (error) => {
      console.log('The error is', error)
    })
  }


  // locC is the html component
  locC: HTMLInputElement = document.getElementById("loc") as HTMLInputElement
  
  // locationApi is a string store latitude and longitude as a string
  locationApi: string = ''
  // cB is the check button at html
  locControl(cB: any) {

    this.locC.disabled = cB.srcElement.checked ? true : false

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

  // Submit Search Form Part

  onSubmit(form: any) {
    let data : string = ""
    let keyword = this.myKeyword
    let distance : HTMLInputElement = document.getElementById("dist") as HTMLInputElement
    let category : HTMLInputElement = document.getElementById("cate") as HTMLInputElement
    let location = form.value.loc
    let checkbox = this.locationApi

    if (distance.value != "") {
      console.log("Here comes value", distance.value)
    } else {
      console.log("Here comes default value", distance.value)
      distance.value = '10';
    }

    if (form.value.cB) {
      data = `kWord=${keyword}&dist=${distance.value}&cate=${category.value}&cB=${checkbox}`
    } else {
      data = `kWord=${keyword}&dist=${distance.value}&cate=${category.value}&loc=${location}`
    }
    this.getDataFromAPI(data)
  }

  tabIndex: number = 0

  clearForm() {
    // set all things to default (orgin one)
    const submitFrom = document.getElementById("submitFrom") as HTMLFormElement
    submitFrom.reset()
    
    this.invalidLogData.innerHTML = ''

    history.pushState("", document.title, window.location.pathname + window.location.search)

    this.locC.disabled = false
    this.d_1html = ''
    this.d_2html = ''
    this.d_3html = ''
    this.d_4html = ''
    this.d_5html = ''
    this.d_6html = ''

    this.detailCard = [{ detailName: '' }]
    this.detailfb = [{ detailName: '', twitterName: '' }]
    this.detailPic = [{ pic1: '', pic2: '', pic3: '' }]

    this.exitDetail()

    this.part3 = document.getElementById("part3")
    this.part3.style.display = "none"
    this.tabIndex = 0
    this.action = "Reserve Now"
    this.submitted = false

  }

  // Search Result Part
  // declare html component
  invalidLogData : HTMLInputElement = document.getElementById("invalidLog") as HTMLInputElement
  part3: any

  // search result table
  resultTable: any = []

  async getDataFromAPI(data: string) {

    let url = `http://localhost:8080/search/?${data}`
    let result = await axios.get(url)

    if (result.data['businesses'].length > 0) {
      this.resultTable = result.data['businesses'];
      this.part3 = document.getElementById("part3")
      this.part3.style.display = "block"
      // transfer result table distance from meters to miles
      for (let i = 0; i < this.resultTable.length; ++i) {
        this.resultTable[i]['distance'] = Math.round(parseFloat(this.resultTable[i]['distance']) / 1609);
      }

    } else {
      
      this.invalidLogData.innerHTML =
        `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
          <div style="border-radius: 30px; background-color: white;">No results available</div>
        </div>`
    }

  }

  // Search Detail Part
  // for detail tab


  // icon
  faTwitter = faTwitter
  faFacebookSquare = faFacebookSquare
  faClock = faClock

  // detail section
  detailData: any = {
    name: null
  }

  // carousel image
  myCarousel: HTMLInputElement = document.getElementById('carouselExampleControls') as HTMLInputElement
  carousel: any

  startAuto(carouselExampleControls: string) {
    this.myCarousel = document.getElementById(`${carouselExampleControls}`) as HTMLInputElement
    this.carousel = new bootstrap.Carousel(this.myCarousel, {
      ride: 'carousel',
      interval: 2000
    })
    this.carousel.cycle()
  }

  stopAuto() {
    this.myCarousel = document.getElementById('carouselExampleControls')  as HTMLInputElement
    try {
      this.carousel.pause()
    } catch (e) {
      return
    }
  }

  // for detail tab
  myKeyword: string = ''
  detailCard = [{ detailName: '' }]
  detailfb = [{ detailName: '', twitterName: '' }]
  detailPic = [{ pic1: '', pic2: '', pic3: '' }]

  // for inner html
  d_1html: string = ''
  d_2html: string = ''
  d_3html: string = ''
  d_4html: string = ''
  d_5html: string = ''
  d_6html: string = ''


  async getDetailTable(data: string) {

    let url = `http://localhost:8080/search/businessesDetail/?id=${data}`
    let result = await axios.get(url)
    this.getReview(data)
    let response = result.data
    console.log(response)

    let d_tableWithData : HTMLInputElement = document.getElementById("lastone") as HTMLInputElement
    d_tableWithData.style.display = "block"
    let d_tableDetail : HTMLInputElement = document.getElementById("d0") as HTMLInputElement
    d_tableDetail.style.display = "block"


    let statusInt = 0
    let d_1NeedHide = false
    let d_2NeedHide = false
    let d_3NeedHide = false
    let d_4NeedHide = false
    let d_5NeedHide = false
    let d_6NeedHide = false

    this.detailData.name = response.name
    this.detailfb[0].twitterName = response.name

    this.maplat = response.coordinates.latitude
    this.maplng = response.coordinates.longitude


    let d_address = ""
    if (response.location.display_address == undefined) {
      d_1NeedHide = true
    }
    else {
      if (Array.isArray(response.categories)) {
        if (response.location.display_address.length != 0) {
          for (let k = 0; k < response.location.display_address.length; k++) {
            d_address += response.location.display_address[k] + ' '
          }
        }
        else {
          d_1NeedHide = true
        }
      }
    }

    let d_phone = ""
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

    let d_cate = ""
    if (response.categories == undefined) {
      d_4NeedHide = true
    }
    else {
      if (Array.isArray(response.categories)) {
        if (response.categories.length != 0) {
          for (let j = 0; j < response.categories.length; j++) {
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

    let d_price = ""
    if (response.price == undefined) {
      d_5NeedHide = true
    }
    else {
      d_price = response.price
    }

    let d_url = ""
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
  }

  // Dailog Part At Detail Tab
  // control reserve form
  bookings: booking[] = []
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

  action: string = 'Reserve Now'

  changeButton() {
    if (this.reserveForm.invalid) {
      return
    }
    if (this.action == 'Reserve Now') {
      this.action = 'Cancel reservation'
      alert('Reservation created!')
      let closeButton : HTMLInputElement = document.getElementById('closeModalB') as HTMLInputElement
      closeButton.click()
    }

  }

  // open reserve form
  myModal: Modal | undefined

  openBook(name: string) {
    if (this.action == 'Cancel reservation') {
      this.action = 'Reserve Now'
      alert('Reservation cancelled!')
      localStorage.removeItem(name)
    } else {
      this.myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
      })
      this.myModal?.show()
    }
  }

  getShow : HTMLInputElement = document.getElementById("d0") as HTMLInputElement

  exitDetail() {
    this.part3 = document.getElementById("part3")
    this.part3.style.display = "block"
    this.getShow.style.display = "none"
    this.stopAuto()
    this.tabIndex = 0
  }
  ngAfterViewChecked() {
    const e0 = document.getElementById('td0')

    if (e0) {
      e0.onclick = (e) => {
        this.part3 = document.getElementById("part3")
        this.part3.style.display = "none"
        this.getShow.style.display = "block"
      }
    }

  }

  // for location tab
  maplat: number = 0
  maplng: number = 0
  mapOptions: google.maps.MapOptions = {
    zoom: 14
  };

  // for review tab
  // deal with indivialual case
  reviewData: any = []

  getReview(data: string) {
    this.service.searchReview(data).subscribe((response: any) => {
      console.log(response.reviews)
      this.reviewData = response.reviews;
      for (let i = 0; i < this.reviewData.length; ++i) {
        this.reviewData[i].time_created = this.reviewData[i].time_created.slice(0, 10);
      }

    }, (error) => {
      console.log('The error is', error)
    })
  }

}

