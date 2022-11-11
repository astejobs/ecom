import { Subscription } from 'rxjs';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
products: any[]=[];
subs: Subscription[] = [];
searchText:string = '';
productByCat:Product[]=[];
  constructor(private productService: ProductService,
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    let s1 = this.productService.getAll().subscribe(products => {
      this.products = products;
      console.log("products...",products);

    });
    this.subs.push(s1);
    this.getAllCategories();

  }
  getAllCategories(){
    this.categoryService.getAll().subscribe((item:any)=>{
      this.productByCat=item;
    })
  }
  getProductByCat(product){
    this.categoryService.getproductsByCategory(product).subscribe((Result:any)=>{
      console.log(Result);
      this.products=Result;
    });

  }
  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }

}
