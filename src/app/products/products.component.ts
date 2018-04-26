import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filterProducts: Product[] = [];
  categories: any[] = [];
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getAll()
    .subscribe(product => {
      this.filterProducts = this.products = product;
      this.getParamsStart();
    });
  }

  getAllCategories() {
    this.categoryService.getCategories()
    .subscribe(category => this.categories = category);
  }

  filterProductsByCategory(category: string) {
     this.filterProducts = (category) ?
     this.products.filter(f => f.category.toLowerCase().includes(category.toLowerCase())) :
     this.products;
  }

  getParamsStart() {
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filterProductsByCategory(this.category);
});
  }

}
