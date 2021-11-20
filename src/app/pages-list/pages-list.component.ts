import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

export interface Creator {
  firstName: string
  fullName: string
  lastName: string
  profile: string
  _id: string
}

export interface PageComponent {
  data: any
  default: boolean
  styles: string[]
  type: string
  _id: string
}

export interface Page {
  bookingInfo: any[]
  components: PageComponent[]
  createdAt: string
  creator: Creator
  hidePage: false
  hostTouristSpot: Page
  initialStatus: string
  otherServices: any[]
  pageType: string
  services: any[]
  bookings: any[]
  status: string
  visits: number
  updatedAt: string
  _id: string
}

export interface Location {
  barangay: string
  municipality: string
  city: string
}

export interface PageColumnData {
  creator: Creator
  title: string
  bannerPhoto: string
  location: Location
  category: string
  createdAt: string
  pageType: string
  bookings: any[]
  unfinished: number
  submitted: number
  cancelled: number
  visits: number
  _id: string
}


export interface SelectValue {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})


export class PagesListComponent implements OnInit {
  filterBy: string = 'none'
  sortBy: string = 'submitted'
  pageTypeSelected: string = 'all'
  all = { value: 'all', viewValue: "All" }
  pagesOldList = []
  categories = [this.all]
  selectedCategory: string = 'all'
  pages: PageColumnData[]
  loading = true
  types = { tourist_spot: "Tourist Spot", service: "Service" }
  constructor(public router: Router, public adminService: AdminService) { }

  ngOnInit(): void {
    this.getPages()
  }


  pageType: SelectValue[] = [
    { value: 'tourist_spot', viewValue: 'Tourist Spot' },
    { value: 'service', viewValue: 'Service' },
    { value: 'all', viewValue: 'All' },
  ];

  filters: SelectValue[] = [
    { value: 'category', viewValue: 'Category' },
    { value: 'dateRange', viewValue: 'Date Range' },
    { value: 'location', viewValue: 'Location' },
    { value: 'none', viewValue: 'None' }
  ];

  sortTypes: SelectValue[] = [
    { value: 'submitted', viewValue: 'Total submitted bookings' },
    { value: 'unfinished', viewValue: 'Total unfinished bookings' },
    { value: 'cancelled', viewValue: 'Total cancelled bookings' },
    { value: 'visits', viewValue: 'Total Visits' },
  ];

  filterByPageType() {
    this.getCategories()
    this.selectedCategory = 'all'
    if (this.pageTypeSelected != "all") {
      this.pages = this.pagesOldList.filter(page => page.pageType == this.pageTypeSelected)
    } else {
      this.pages = this.pagesOldList
      this.sortPages()
    }
  }

  filterPages() {
    if (this.selectedCategory != 'all') { this.pages = this.pagesOldList.filter(page => page.category == this.selectedCategory) }
    else {
      this.pages = this.pagesOldList
      this.sortPages()
    }
  }

  sortPages() {
    this.pages = this.pages.sort((a, b) => {
      return b[this.sortBy] - a[this.sortBy]
    })
  }

  getCategories() {
    let categoryValue = []
    this.pagesOldList.forEach(page => { if (!categoryValue.includes(page.category) && (page.pageType == this.pageTypeSelected || this.pageTypeSelected == 'all')) categoryValue.push(page.category) })
    this.categories = [this.all, ...categoryValue.map(category => { return { value: category, viewValue: category } })]
    console.log(this.categories)
  }

  getPages() {
    this.adminService.getPagesList("Online").subscribe((data: Page[]) => {
      this.loading = false
      this.pages = data.map(page => {
        let pageColData: PageColumnData = {_id: page._id, visits: page.visits, submitted: 0, cancelled: 0, unfinished: 0, bookings: page.bookings, bannerPhoto: page.components[0].data[0].url, creator: page.creator, title: "", location: { barangay: "", municipality: "", city: "" }, category: "", createdAt: page.createdAt, pageType: page.pageType }
        page.components.forEach(component => {
          const data = component.data
          if (data.defaultName == "pageName") { pageColData.title = data.text }
          if (data.defaultName == "barangay") { pageColData.location.barangay = data.text }
          if (data.defaultName == "municipality") { pageColData.location.municipality = data.text }
          if (data.defaultName == "province") { pageColData.location.city = data.text }
          if (data.defaultName == "category") { pageColData.category = data.text }
        });
        pageColData.bookings.forEach((bkng) => {
          if (bkng.status == "Unfinished") { pageColData.unfinished++ }
          else if (bkng.status == "Cancelled") { pageColData.cancelled++ }
          else { pageColData.submitted++ }
        })
        return pageColData
      })

      this.pagesOldList = this.pages
      this.getCategories()
      this.sortPages()
      console.log("pages: ", this.pages)
    })
  }

  viewPageStats(_id, pageTitle) {
    this.router.navigate([`/admin/reports/pageStats`, _id, pageTitle])
  }

}
