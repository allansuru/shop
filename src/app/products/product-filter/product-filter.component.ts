import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
 categories$: any;
 categories: any[] = [];
 @Input('category') category: string;
  constructor(
    private categoryService: CategoryService,
  ) {
    // Facilita jogar no construtor pra fazer teste unitário desse componente
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
 //   this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories()
      .subscribe(category => this.categories$ = category);
  }

}
