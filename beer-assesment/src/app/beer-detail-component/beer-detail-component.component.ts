import { Component, OnInit } from '@angular/core';
import {BeerServiceService} from "../services/beer-service.service";

@Component({
  selector: 'app-beer-detail-component',
  templateUrl: './beer-detail-component.component.html',
  styleUrls: ['./beer-detail-component.component.css']
})
export class BeerDetailComponentComponent implements OnInit {

  beer;
  photo = 'https://brewerydb-images.s3.amazonaws.com/beer/Y8Ar6h/upload_r6bhFI-icon.png';

  constructor(private beerServiceService: BeerServiceService) {
    this.beer = null;
  }

  ngOnInit() {
    this.beerServiceService.currentMessage.subscribe(beer => this.beer = beer)
  }

}
