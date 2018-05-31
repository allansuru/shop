
import { Product } from 'shared/models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'underscore';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  lstProducts: Product[];
  lstFiltrado: any[] = [];
  filtrado_aux: object[] = [];
  subscription: Subscription;
  paginado: object[];
  paginacao: any[];
  porpagina = 10;
  pagina = 0;
  ordem: any;
  column = '';

  // DataTable
 // tableResourse: DataTableResource<Product>;
  items: Product[];
  itemCount: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterBySuru(query: string) {
    this.lstFiltrado = (query) ?
    this.lstProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.lstProducts;

    if (query.length === 0) {
        this.paginarConteudo();
    }

  }

  getProducts() {
     this.subscription = this.productService.getAll().subscribe(products => {
        this.lstProducts = products;
        this.lstFiltrado = products;
        console.log('Produtos: ', this.lstProducts);
        this.paginarConteudo();
      });
  }

  paginarConteudo() {
    this.lstFiltrado = this.lstProducts
      .slice(this.pagina * this.porpagina, (this.pagina + 1) * this.porpagina);
    // this.itensCategoria_filtrado = this.lstFiltrado;
    this.paginacao = [];
    for (let i = 0; i < this.lstProducts.length / this.porpagina; i++) {
      this.paginacao.push(i);
    }
  }

  mudarPagina(pagina) {
    if (pagina > 0 || pagina < Math.floor(this.lstProducts.length / this.porpagina)) {
      this.pagina = pagina;
      this.paginarConteudo();
    }
  }

  orderColumnCategoria(column) {
    let pagina_aux;
    this.column = column;
    this.ordem = !this.ordem;
    pagina_aux = this.paginacao.length;
    this.filtrado_aux = this.lstFiltrado
    .filter(item => (item['title'].toLowerCase()));
    this.filtrado_aux = _.sortBy(this.filtrado_aux, this.column);
    this.lstFiltrado = _.sortBy(this.filtrado_aux, this.column);
    if (this.ordem) {
      this.lstFiltrado = this.lstFiltrado.reverse();
    }
  }
}
