import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor( public router: Router) { }
  
  ngOnInit(): void {
  }

  goTo(clicked) {
    this.router.navigate(["/admin/reports/" + clicked])
  }

}
