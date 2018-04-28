import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll()
      .subscribe(product => {
        this.filterProducts = this.products = product;
        this.getParamsStart();
      });
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
