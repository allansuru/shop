import { Shipping } from './../models/shipping';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping = {};
  constructor() { }

  ngOnInit() {
  }

  save(f) {
    console.log(f);
  }

}
