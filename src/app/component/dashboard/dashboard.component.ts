import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['event', 'created_date', 'live'];
  listItems: any[] = [];

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  id = this.apiService.getUserId();
  constructor(private apiService: HttpClientService, private router: Router) {}


  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.apiService
      .getEventsList(this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        this.listItems = res.response.result;
        this.totalItems = res.response.total_items;
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }

  getDetails() {
    this.apiService.getUserDetails(this.id!).subscribe({
      next: (res: any) => {
        const username = res?.response?.username;
        const email = res?.response?.email;
        console.log('API success:', res);
        alert(`Username: ${username}\nEmail: ${email}`);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }

  getFullList() {
   this.router.navigateByUrl('/table-list');
  }
}
