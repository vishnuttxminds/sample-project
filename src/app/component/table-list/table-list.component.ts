import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent {
  displayedColumns: string[] = ['event', 'created_date', 'live'];
  listItems: any[] = [];

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private apiService: HttpClientService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.apiService
      .getEventsList(this.pageIndex + 1, this.pageSize)
      .subscribe((res) => {
        console.log("Total >", res.response.total_items);
        this.listItems = res.response.result;
        this.totalItems = res.response.total_items;
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }
}
