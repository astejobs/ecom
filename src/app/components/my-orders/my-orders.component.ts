import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AddEditComponent } from 'src/app/admin/components/category/add-edit.component';
import { OdrProduct } from 'src/app/shared/classes/odr-product';
import { Order } from 'src/app/shared/classes/order';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AddEditComponent) subForm: AddEditComponent;
  orderSearchForm: FormGroup;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  // MatPaginator Inputs
  totalRecords = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25];
  displayedColumns: string[] = ['id', 'orderedDate', 'deliveredDate', 'orderStatus', 'paymentStatus', 'address', 'items','quantity','action'];

  // MatPaginator Output
  pageEvent: PageEvent;
  dataSource: any;
  orders: Order[]=[];
  fetching = false;
  constructor(private orderService: OrderService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    let userIdd = currentuser.user.id;
    this.getAllOrders(userIdd);
    this.fetching = true;
    // this.orderService.getbasket(userIdd).subscribe(res=>{
    //     console.log(res.totalPrice);
    // });


  }
  public handlePage(e: any) {
    console.log(e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    //this.getPageData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllOrders(id) {
    this.orderService.getOrderss(id).subscribe((res) => {
      // console.log("All orders.......");
      this.orders = res;
      console.log(this.orders);
      this.fetching = false;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log(this.orders);
    })
  }
  getOrderForUpdate(order: Order) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to Cancel this Order?"
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do confirmation actions
        order.status="cancelled";
        this.orderService.updateOrder(order).subscribe(res => {
          console.log(res);

          this.dialogRef = null;
        });
      }
    });
  }



    // console.log("cancel order...",order);
    // order.status="cancelled";
    // this.orderService.updateOrder(order).subscribe(res=>{
    //   console.log(res);

    // });
  }
