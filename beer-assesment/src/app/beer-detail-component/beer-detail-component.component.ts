import { Component, OnInit } from '@angular/core';
import {BeerServiceService} from "../services/beer-service.service";

@Component({
  selector: 'app-beer-detail-component',
  templateUrl: './beer-detail-component.component.html',
  styleUrls: ['./beer-detail-component.component.css']
})
export class BeerDetailComponentComponent implements OnInit {

  beer:Object;
  constructor(private beerServiceService: BeerServiceService) { }

  ngOnInit() {
    this.beerServiceService.currentMessage.subscribe(beer => this.beer = beer)
  }

}
