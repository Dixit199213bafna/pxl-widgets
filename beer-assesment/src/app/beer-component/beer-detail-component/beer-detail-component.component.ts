import { Component, OnInit } from '@angular/core';
import {BeerServiceService} from "../../services/beer-service.service";

@Component({
  selector: 'app-beer-detail-component',
  templateUrl: './beer-detail-component.component.html',
  styleUrls: ['./beer-detail-component.component.css']
})
export class BeerDetailComponentComponent implements OnInit {

  beer;

  constructor(private beerServiceService: BeerServiceService) {
    this.beer = null;
  }

  ngOnInit() {
    this.beerServiceService.currentBeer.subscribe(beer => this.beer = beer)
  }

}
