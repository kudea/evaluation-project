import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Modal } from 'bootstrap';
import { IpInfo } from '../ipinfo';
import { isEmpty, isNonEmpty } from 'fp-ts/Array'
import * as O from "fp-ts/lib/Option";
import * as R from 'fp-ts/lib/Refinement';

declare let bootstrap: {
  Carousel: new (arg0: any, arg1: { ride: string; interval: number; }) => any;
  Modal: new (arg0: HTMLElement | null, arg1: { keyboard: boolean; }) => Modal | undefined;
}

// ensure the response is valid

type TypeGuard<T> = (val: unknown) => T;
const string: TypeGuard<string> = (val: unknown) => {
  if (typeof val !== 'string') { throw new Error('Invalid string'); }
  return val;
}
const number: TypeGuard<number> = (val: unknown) => {
  if (typeof val !== 'number') { throw new Error('Invalid number'); }
  return val;
}
const boolean: TypeGuard<boolean> = (val: unknown) => {
  if (typeof val !== 'boolean') { throw new Error('Invalid boolean'); }
  return val;
}
const array = <T>(inner: TypeGuard<T>) => (val: unknown): T[] => {
  if (!Array.isArray(val)) { throw new Error('Invalid array'); }
  return val.map(inner);
}
const object = <T extends Record<string, TypeGuard<any>>>(inner: T) => {
  return (val: unknown): { [P in keyof T]: ReturnType<T[P]> } => {
    if (val === null || typeof val !== 'object') { throw new Error('Invalid object'); }
    const out: { [P in keyof T]: ReturnType<T[P]> } = {} as any;
    for (const k in inner) {
      out[k] = inner[k]((val as any)[k])
    }
    return out
  }
}



const AutoComplete = object({
  categories: array(object({
    alias: string,
    title: string
  })),
  businesses: string,
  terms: array(object({
    text: string
  }))
})

const SearchResult = object({
  businesses: array(object({
    id: string,
    alias: string,
    name: string,
    image_url: string,
    is_closed: boolean,
    url: string,
    review_count: number,
    categories: array(object({
      alias: string,
      title: string
    })),
    rating: number,
    coordinates: object({
      latitude: number,
      longitude: number
    }),
    transactions: array(string),
    price: string,
    location: object({
      address1: string,
      address2: string,
      address3: string,
      city: string,
      zip_code: string,
      country: string,
      state: string,
      display_address: array(string),
    }),
    phone: string,
    display_phone: string,
    distance: number
  }))
})

const DetailResult = object({
  id: string,
  alias: string,
  name: string,
  image_url: string,
  is_claimed: boolean,
  is_closed: boolean,
  url: string,
  phone: string,
  display_phone: string,
  review_count: number,
  categories: array(object({
    alias: string,
    title: string
  })),
  rating: number,
  location: object({
    address1: string,
    address2: string,
    address3: string,
    city: string,
    zip_code: string,
    country: string,
    state: string,
    display_address: array(string),
    cross_streets: string
  }),
  coordinates: object({
    latitude: number,
    longitude: number
  }),
  photos: array(string),
  price: string,
  hours: array(object({
    open: array(object({
      is_overnight: boolean,
      start: string,
      end: string,
      day: number
    })),
    hours_type: string,
    is_open_now: boolean
  })),
  transactions: array(string)
})

const ReviewData = object({
  reviews: array(object({
    id: string,
    url: string,
    text: string,
    rating: number,
    time_created: string,
    user: object({
      id: string,
      profile_url: string,
      image_url: string,
      name: string
    })
  })),
  total: number,
  possible_languages: array(string)
})

type SuccessResponse = { success: true, payload: typeof AutoComplete }
type FailureResponse = { success: false, error: Error }
type ApiResponse = SuccessResponse | FailureResponse

const parseSuccessResponse = (res: ApiResponse): O.Option<SuccessResponse> => res.success === true ? O.some(res) : O.none
const isSuccessResponse = R.fromOptionK(parseSuccessResponse)
const handleApiResponse = (response: ApiResponse) => {
  if (isSuccessResponse(response)) {
    return response.payload // The type of response is inferred to be SuccessResponse
  }
  // The type of response is inferred to be FailureResponse
  throw new Error(response.error.message || 'Something went wrong')
}

// fetch data
const fetchData = async (request: RequestInfo): Promise<any> => {
  const response = await fetch(request)
  const body = await response.json()
  return body
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class SearchComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.findWord()

    // reserve info validators
    this.reserveForm = this.formBuilder.group({
      emailtext: ['', [Validators.required, this.noSpaceAllow, this.validateAtSign, this.validateAddress, this.validateDomain]],
      datetext: ['', Validators.required],
      hourtext: ['', Validators.required],
      mintext: ['', Validators.required]
    })

  }

  // Validator
  noSpaceAllow(control: FormGroup) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllow: true }
    }
    return null
  }

  validateAtSign(control: FormGroup) {
    if (!control.value.includes('@')) {
      return { validateAtSign: true }
      // return E.right(true);
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

  // Search Form Part
  // input form
  myControl = new FormControl('')

  // search form spinner at auto complete
  wantSpinner: boolean = false
  // filter for autoConplete
  findWord() {
    this.myControl.valueChanges.subscribe((response: string | null) => {
      if (response != null) {
        // make it start AutoComplete function with 2 charactors
        if (response.length > 1) {
          this.wantSpinner = true
          this.getAutoComplete(response)
        } else {
          this.getAutoComplete('')
        }
      }
      else {
        console.error('error response')
      }
    })
  }

  options: Array<string> = ['']
  async getAutoComplete(dataFromfindWord: string) {

    this.myKeyword = dataFromfindWord
    type AutoComplete = ReturnType<typeof AutoComplete>
    // try {
    //   const ACData: AutoComplete = await fetchData(`http://localhost:8080/search/autocomplete/?word=${dataFromfindWord}`)
    //   return handleApiResponse({success: true, payload: ACData})
    // } catch(error) {
    //   handleApiResponse({success: false, error: error instanceof Error ? error : new Error('unknown error')})
    // }
    const ACData: AutoComplete = await fetchData(`http://localhost:8080/search/autocomplete/?word=${dataFromfindWord}`)
    this.options.length = 0
    this.wantSpinner = false
    if (isNonEmpty(ACData.categories)) {
      for (let i = 0; i < ACData.categories.length; i++) {
        this.options.push(ACData.categories[i].title)
      }
    }
    if (isNonEmpty(ACData.terms)) {
      for (let i = 0; i < ACData.terms.length; i++) {
        this.options.push(ACData.terms[i].text)
      }
    }
    console.log(ACData)

  }

  // locationApi is a string store latitude and longitude as a string
  locationApi: string = ''
  // cB is the check button at html

  locControl(cB: any) {
    let locC: HTMLInputElement = document.getElementById('loc') as HTMLInputElement
    locC.disabled = cB.srcElement.checked ? true : false

    if (cB.srcElement.checked) {
      locC.value = ""
      // transfer to JSON then do processing
      fetch('https://ipinfo.io/76.175.122.164?token=fa2da888e74da4')
        .then((response: Response) => response.json())
        .then((data: IpInfo) => {
          // data is the response data from ipinfo api
          this.locationApi = data.loc
          console.log(this.locationApi)
        })
    }
  }

  // Submit Search Form Part

  onSubmit(form: any) {
    let data: string = ""
    let keyword: string = this.myKeyword
    let distance: HTMLInputElement = document.getElementById("dist") as HTMLInputElement
    let category: HTMLInputElement = document.getElementById("cate") as HTMLInputElement
    let location = form.value.loc
    let checkbox: string = this.locationApi

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
    this.invalidLogData = document.getElementById("invalidLog") as HTMLInputElement
    this.invalidLogData.innerHTML = ''

    history.pushState("", document.title, window.location.pathname + window.location.search)

    // return location input to default setting
    let locC: HTMLInputElement = document.getElementById('loc') as HTMLInputElement
    locC.disabled = false
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
    this.part3 = document.getElementById("part3") as HTMLInputElement
    this.part3.style.display = "none"
    this.tabIndex = 0
    this.submitted = false

  }

  // Search Result Part
  // declare html component
  invalidLogData: HTMLInputElement = document.getElementById("invalidLog") as HTMLInputElement
  part3: HTMLInputElement = document.getElementById("part3") as HTMLInputElement
  // search result table
  resultTable: any = []

  async getDataFromAPI(data: string) {

    type SearchResult = ReturnType<typeof SearchResult>
    const result: SearchResult = await fetchData(`http://localhost:8080/search/?${data}`)

    if (result.businesses.length > 0) {
      this.resultTable = result.businesses
      this.part3 = document.getElementById("part3") as HTMLInputElement
      this.part3.style.display = "block"
      // transfer result table distance from meters to miles
      for (let i = 0; i < this.resultTable.length; ++i) {
        this.resultTable[i].distance = Math.round(parseFloat(this.resultTable[i].distance) / 1609);
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
  detailData: { name: string; } = { name: '' }

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
    this.myCarousel = document.getElementById('carouselExampleControls') as HTMLInputElement
    try {
      this.carousel.pause()
    } catch (e) {
      return
    }
  }

  // for detail tab
  myKeyword: string = ''
  detailCard: {
    detailName: string;
  }[] = [{ detailName: '' }]
  detailfb: {
    detailName: string;
    twitterName: string;
  }[] = [{ detailName: '', twitterName: '' }]
  detailPic: {
    pic1: string;
    pic2: string;
    pic3: string;
  }[] = [{ pic1: '', pic2: '', pic3: '' }]

  // for inner html
  d_1html: string = ''
  d_2html: string = ''
  d_3html: string = ''
  d_4html: string = ''
  d_5html: string = ''
  d_6html: string = ''


  async getDetailTable(data: string) {

    type DetailResult = ReturnType<typeof DetailResult>
    const result: DetailResult = await fetchData(`http://localhost:8080/search/businessesDetail/?id=${data}`)

    this.getReview(data)
    let response = result
    console.log(response)

    let d_tableWithData: HTMLInputElement = document.getElementById("lastone") as HTMLInputElement
    d_tableWithData.style.display = "block"
    let d_tableDetail: HTMLInputElement = document.getElementById("d0") as HTMLInputElement
    d_tableDetail.style.display = "block"


    let statusInt: number = 0
    let d_1NeedHide: boolean = false
    let d_2NeedHide: boolean = false
    let d_3NeedHide: boolean = false
    let d_4NeedHide: boolean = false
    let d_5NeedHide: boolean = false
    let d_6NeedHide: boolean = false

    this.detailData.name = response.name
    this.detailfb[0].twitterName = response.name

    this.maplat = response.coordinates.latitude
    this.maplng = response.coordinates.longitude


    let d_address: string = ""
    if (response.location.display_address == undefined) {
      d_1NeedHide = true
    }
    else {
      if (isNonEmpty(response.categories)) {
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

    let d_phone: string = ""
    if (response.display_phone == undefined) {
      d_2NeedHide = true
    } 
    else {
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

    let d_cate: string = ""
    if (response.categories == undefined) {
      d_4NeedHide = true
    }
    else {
      if (isNonEmpty(response.categories)) {
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

    let d_price: string = ""
    if (response.price == undefined) {
      d_5NeedHide = true
    }
    else {
      d_price = response.price
    }

    let d_url: string = ""
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


  changeButton() {
    if (this.reserveForm.invalid) {
      return
    }

    alert('Reservation created!')
    let closeButton: HTMLInputElement = document.getElementById('closeModalB') as HTMLInputElement
    closeButton.click()


  }

  // open reserve form
  openBook(name: string) {

    let myModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement, {
      keyboard: false
    })
    myModal?.show()

  }

  getShow: HTMLInputElement = document.getElementById("d0") as HTMLInputElement

  exitDetail() {
    this.part3 = document.getElementById("part3") as HTMLInputElement
    this.part3.style.display = "block"
    this.getShow = document.getElementById("d0") as HTMLInputElement
    this.getShow.style.display = "none"
    this.stopAuto()
    this.tabIndex = 0
  }
  ngAfterViewChecked() {
    const e0 = document.getElementById('td0')

    if (e0) {
      e0.onclick = (e) => {
        this.part3 = document.getElementById("part3") as HTMLInputElement
        this.part3.style.display = "none"
        this.getShow = document.getElementById("d0") as HTMLInputElement
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

  async getReview(data: string) {

    type ReviewData = ReturnType<typeof ReviewData>
    const response: ReviewData = await fetchData(`http://localhost:8080/search/review/?id=${data}`)

    console.log(response.reviews)
    this.reviewData = response.reviews;
    for (let i = 0; i < this.reviewData.length; ++i) {
      this.reviewData[i].time_created = this.reviewData[i].time_created.slice(0, 10);
    }
  }
}