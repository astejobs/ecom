import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/classes/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})

export class Section2Component implements OnInit {

  router: any;
  categories: Category[] = [];
  subs:Subscription[]=[];
  category: Category;



  constructor(private categoryServ: CategoryService,
              private productService: ProductService,
              private route:Router



    ) {
  }

  ngOnInit(): void {
    this.categoryServ.getAll().subscribe(result => {
      this.categories = result;
    })

  }
  getCat(category) {
    this.category = category;
    this.getProducts();
  }
  getProducts() {
    this.categoryServ.getproductsByCategory(this.category).subscribe(resp => {
      this.productService.productByCategory.next(resp);
      this.route.navigate(['./products']);
    });
  }

}
