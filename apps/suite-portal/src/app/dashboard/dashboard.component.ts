import { Component, OnInit } from '@angular/core';
import {DetailsService} from '../services/details.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Account} from "../models/account";

@Component({
  selector: 'sp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  details = new Account() ;
  infos = [];

  constructor(private detailsService: DetailsService) {
  }

  ngOnInit(): void {
    this.detailsService.getMaintenanceRequests().subscribe(res => {
      // @ts-ignore
      this.infos = res.response;
    }, (error) => {
    });
  }

  delete(id: string): void {
    this.detailsService.deleteDetails(id).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
