import { Component, OnInit } from '@angular/core';
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
  category: Category;


  constructor(private categoryServ: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.categoryServ.getAll().subscribe(result => {
      this.categories = result;
    })

  }
  getCat(product: any) {
    this.category = product;
    this.getProducts();
    console.log("products", product);
  }
  getProducts() {
    this.categoryServ.getproductsByCategory(this.category).subscribe(resp => {
      console.log("Response...", resp);
    });
  }

}
