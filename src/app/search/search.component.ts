import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'bootstrap'
import { booking } from '../booking';
import { BOOKINGS } from '../bookingTable';
import axios from 'axios';

declare var bootstrap: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {

  // icon
  faTwitter = faTwitter
  faFacebookSquare = faFacebookSquare
  faClock = faClock

  // search result
  resultTable: any = []

  // detail section
  detailData: any = {
    name: null
  }

  // carousel image
  myCarousel: any
  carousel: any

  startAuto(carouselExampleControls: any) {
    this.myCarousel = document.getElementById(`${carouselExampleControls}`)
    this.carousel = new bootstrap.Carousel(this.myCarousel, {
      ride: 'carousel',
      interval: 2000
    })
    this.carousel.cycle()
  }

  stopAuto() {
    this.myCarousel = document.getElementById('carouselExampleControls')
    try {
      this.carousel.pause()
    } catch (e) {
      return
    }
  }

  myKeyword: string | undefined
  businessesDetailID: string | undefined
  detailCard = [{ detailName: '' }]
  detailfb = [{ detailName: '', twitterName: '' }]
  detailPic = [{ pic1: '', pic2: '', pic3: '' }]

  maplat: number = 0
  maplng: number = 0
  mapOptions: google.maps.MapOptions = {
    zoom: 14
  };

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

  // control reserve form
  bookings: booking | undefined
  reserveForm !: FormGroup
  submitted: boolean = false

  toBooking(name: any) {
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

  // open reserve form
  myModal: Modal | undefined

  openBook(name: string) {
    if (this.action == 'Cancel reservation') {
      this.action = 'Reserve Now'
      alert('Reservation cancelled!')
      for (var i = 0; i < BOOKINGS.length; i++) {
        if (BOOKINGS[i].businessname == name) {
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

  getShow: any

  exitDetail() {
    this.part3 = document.getElementById("part3")
    this.part3.style.display = "block"
    this.getShow = document.getElementById("d0")
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
        this.getShow = document.getElementById("d0")
        this.getShow.style.display = "block"
      }
    }

  }

  // search form
  wantSpinner = false

  // input form
  myControl = new FormControl('')

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
  reviewRate = ''
  reviewName = ''
  reviewText = ''
  reviewTime = ''
  reviewRate1 = ''
  reviewName1 = ''
  reviewText1 = ''
  reviewTime1 = ''
  reviewRate2 = ''
  reviewName2 = ''
  reviewText2 = ''
  reviewTime2 = ''

  getReview(data: any) {
    this.service.searchReview(data).subscribe((response: any) => {
      console.log(response.reviews)
      if (response.reviews[0].rating) {
        this.reviewRate = response.reviews[0].rating
      } else {
        this.reviewRate = 'no Rating'
      }
      if (response.reviews[0].user.name) {
        this.reviewName = response.reviews[0].user.name
      } else {
        this.reviewName = 'no Name'
      }
      if (response.reviews[0].text) {
        this.reviewText = response.reviews[0].text
      } else {
        this.reviewText = 'no Text'
      }
      if (response.reviews[0].time_created) {
        this.reviewTime = response.reviews[0].time_created.slice(0, 10)
      } else {
        this.reviewTime = 'no Time'
      }
      if (response.reviews[1].rating) {
        this.reviewRate1 = response.reviews[1].rating
      } else {
        this.reviewRate1 = 'no Rating'
      }
      if (response.reviews[1].user.name) {
        this.reviewName1 = response.reviews[1].user.name
      } else {
        this.reviewName1 = 'no Name'
      }
      if (response.reviews[1].text) {
        this.reviewText1 = response.reviews[1].text
      } else {
        this.reviewText1 = 'no Text'
      }
      if (response.reviews[1].time_created) {
        this.reviewTime1 = response.reviews[1].time_created.slice(0, 10)
      } else {
        this.reviewTime1 = 'no Time'
      }
      if (response.reviews[2].rating) {
        this.reviewRate2 = response.reviews[2].rating
      } else {
        this.reviewRate2 = 'no Rating'
      }
      if (response.reviews[2].user.name) {
        this.reviewName2 = response.reviews[2].user.name
      } else {
        this.reviewName2 = 'no Name'
      }
      if (response.reviews[2].text) {
        this.reviewText2 = response.reviews[2].text
      } else {
        this.reviewText2 = 'no Text'
      }
      if (response.reviews[2].time_created) {
        this.reviewTime2 = response.reviews[2].time_created.slice(0, 10)
      } else {
        this.reviewTime2 = 'no Time'
      }

    }, (error) => {
      console.log('The error is', error)
      this.reviewName = 'no Review'
      this.reviewName1 = 'no Review'
      this.reviewName2 = 'no Review'
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

  // control component at html
  tableWithDataHead: any
  invalidLogData: any
  submitFrom: any
  d_tableWithData: any
  d_tableDetail: any
  part3: any

  async getDataFromAPI(data: any) {
    var result
    let url = `http://localhost:8080/search/?${data}`
    result = await axios.get(url)

    if (result.data['businesses'].length > 0) {
      this.resultTable = result.data['businesses'];
      this.part3 = document.getElementById("part3")
      this.part3.style.display = "block"
      // transfer result table distance from meters to miles
      for (let i = 0; i < this.resultTable.length; ++i) {
        this.resultTable[i]['distance'] = Math.round(parseFloat(this.resultTable[i]['distance']) / 1609);
      }

    } else {
      this.invalidLogData = document.getElementById("invalidLog")
      this.invalidLogData.innerHTML =
        `<div class="container-sm text-center" style="max-width: 400px; color: red; font-size: 22px;">
          <div style="border-radius: 30px; background-color: white;">No results available</div>
        </div>`
    }

  }

  // for inner html
  d_1html = ''
  d_2html = ''
  d_3html = ''
  d_4html = ''
  d_5html = ''
  d_6html = ''


  async getDetailTable(data: any) {
    var result
    let url = `http://localhost:8080/search/businessesDetail/?id=${data}`
    result = await axios.get(url)
    this.getReview(data)
    let response = result.data
    console.log(response)

    this.d_tableWithData = document.getElementById("lastone")
    this.d_tableWithData.style.display = "block"
    this.d_tableDetail = document.getElementById("d0")
    this.d_tableDetail.style.display = "block"


    var statusInt = 0
    var d_1NeedHide = false
    var d_2NeedHide = false
    var d_3NeedHide = false
    var d_4NeedHide = false
    var d_5NeedHide = false
    var d_6NeedHide = false

    this.detailData.name = response.name
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
  }

  // control component at html
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
    this.submitFrom = document.getElementById("submitFrom")
    this.submitFrom.reset()
    this.invalidLogData = document.getElementById("invalidLog")
    this.invalidLogData.innerHTML = ''

    history.pushState("", document.title, window.location.pathname + window.location.search)
    this.locC = document.getElementById("loc")
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
}

