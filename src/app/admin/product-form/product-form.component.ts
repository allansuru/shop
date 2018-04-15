import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor
  (
    public categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }

  save(product) {
    console.log(product);
    this.productService.create(product);
  }

  getCategories() {
    this.categoryService.getCategories()
    .subscribe(item => {
       console.log(item);
    });
  }
}
