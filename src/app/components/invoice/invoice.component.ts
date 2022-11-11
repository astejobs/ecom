import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  order;
  total:any=[];
  Gtotal=0;

  constructor(private orderService: OrderService ,private router:Router) {
    this.orderService.Fullorder.subscribe(res => {
      this.order = res;
    });
    console.log("invoice Order...",this.order);
  }

  ngOnInit(): void {
    for(let ord of this.order.odrProduct){
    let totl = (ord.productWeightPrice.price*ord.quantity-(ord.productWeightPrice.price*ord.quantity*ord.product.discount/100));
    this.total.push(totl);

  }

  for(let i=0;i<this.total.length;i++){
   this.Gtotal+=this.total[i];
  }
  console.log("totallllll",this.Gtotal);
  }


  printPage(e){
   window.print();
   this.router.navigate(['/home']);

  }
  goBack(){
    this.router.navigate(['/products']);
  }

}



