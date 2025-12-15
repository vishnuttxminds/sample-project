import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css'],
})
export class CommonTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() data: any[] = [];
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Output() pageChange = new EventEmitter<PageEvent>();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngOnChanges() {
    this.dataSource.data = this.data;
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
