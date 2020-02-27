import { Component, OnInit } from '@angular/core';
import { BeerServiceService} from "../services/beer-service.service";
import { ResponseData } from '../response-data';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  location = {};
  beerPerCountry = {};
  columnDefs = [
    {headerName: 'Name', field: 'nameDisplay' },
  ];
  country = {};

  responseData = {
    data : []
  };
  panelOpenState = false;

  rowData = [];
  constructor(private beerServiceService: BeerServiceService) { }

  ngOnInit(): void {
    this.fetchBeerData();
  }

  keys() : Array<string> {
    return Object.keys(this.country);
  }

  fetchBeerData() {
    this.beerServiceService.fetchLocation().subscribe(response => {
      response['data'].forEach(r => {
        if(!this.location[r.countryIsoCode]) {
          this.location[r.countryIsoCode] = [];
          this.country = {
            ...this.country,
            [r.countryIsoCode]: r['country'].displayName,
          }
        }
        !this.location[r.countryIsoCode].includes(r.breweryId) ? this.location[r.countryIsoCode].push(r.breweryId) :  false;
        console.log(this.country);
      });
      this.beerPerCountry = {};
      for (const country in this.location) {
        if(!this.beerPerCountry[country]) {
          this.beerPerCountry[country] = [];
        }
        this.location[country].forEach(brewId => {
          this.beerServiceService.fetchBeerPerBrewId(brewId).subscribe(response => {
            this.beerPerCountry[country] = [
              ...this.beerPerCountry[country],
              ...response['data'],
            ];
            console.log(this.beerPerCountry);
          })
        });
      }
    });
  }
}
