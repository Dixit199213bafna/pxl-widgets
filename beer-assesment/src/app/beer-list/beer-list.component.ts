import {Component, OnInit} from '@angular/core';
import {BeerServiceService} from "../services/beer-service.service";
import * as _ from "lodash";
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  beerPerCategoryBackup = {}
  location = {};
  beerPerCategory = {};
  columnDefs = [
    {headerName: 'Name', field: 'nameDisplay'},
  ];
  groupBy = {};
  public filterFiled: string;
  filterDataUpdate = new Subject<string>();
  selectedValue = 'countryIsoCode';

  constructor(private beerServiceService: BeerServiceService) {

    this.filterDataUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.filterData(value);
      });
  }

  ngOnInit(): void {
    this.fetchBeerData('countryIsoCode');
  }

  filterData(value) {
    const newList = {};
    for (const country in this.beerPerCategoryBackup) {
      newList[country] = _.filter(this.beerPerCategoryBackup[country], function(beer){
        return beer.name.includes(value);
      });
    }
    this.beerPerCategory = {...newList};
  }

  someMethod(c) {
    this.location = {};
    this.beerPerCategory = {};
    this.groupBy = {};
    this.filterFiled = '';
    this.fetchBeerData(c);
    // this.filterData();
  }

  fetchBeerData(category) {
    this.beerServiceService.fetchLocation().subscribe(response => {
      response['data'].forEach(r => {
        if (!this.location[r[category]]) {
          this.location[r[category]] = [];
          if (category === 'countryIsoCode') {
            this.groupBy = {
              ...this.groupBy,
              [r[category]]: r['country'].displayName,
            }
          } else if (category === 'locationType') {
            this.groupBy = {
              ...this.groupBy,
              [r[category]]: r['locationTypeDisplay'],
            }
          }
        }
        !this.location[r[category]].includes(r.breweryId) ? this.location[r[category]].push(r.breweryId) : false;
      });
      this.beerPerCategory = {};
      for (const country in this.location) {
        if (!this.beerPerCategory[country]) {
          this.beerPerCategory[country] = [];
        }
        this.location[country].forEach(brewId => {
          this.beerServiceService.fetchBeerPerBrewId(brewId).subscribe(response => {
            this.beerPerCategory[country] = [
              ...this.beerPerCategory[country],
              ...response['data'],
            ];
            // console.log(this.beerPerCategory);
            this.beerPerCategoryBackup = {...this.beerPerCategory};
            console.log(this.beerPerCategoryBackup);
          });
        });
      }
    });
  }
}
