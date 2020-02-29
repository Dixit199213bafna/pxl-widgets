import {Component, OnInit} from '@angular/core';
import {BeerServiceService} from "../../services/beer-service.service";
import * as _ from "lodash";
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  defaultColDef
  columnDefs;
  rowSelection;
  rowData;
  beerPerCategoryBackup = {}
  location = {};
  beerPerCategory = {};
  groupBy = {};
  public filterFiled: string;
  filterDataUpdate = new Subject<string>();
  selectedValue = 'countryIsoCode';
  isLoading;

  constructor(private beerServiceService: BeerServiceService) {
    this.columnDefs = [
      {headerName: 'Name', field: 'nameDisplay'},
    ];
    this.rowData = [];
    this.rowSelection = "single";
    this.filterDataUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.filterData(value);
      });
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };
  }

  ngOnInit(): void {
    this.fetchBeerData('countryIsoCode');
  }

  onSelectionChanged(event) {
    const selectedRows = event.api.getSelectedRows();
    this.fetchBeerPerId(selectedRows[0].id);
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
  }

  // onSelectionChanged(event) {
  //   this.fetchBeerPerId(event.node.data.id);
  //   console.log(event.node.data);
  // }

  fetchBeerPerId(id) {
    this.beerServiceService.fetchBeerPerBeerId(id).subscribe(response => {
      this.beerServiceService.changeBeer(response['data']);
    })
  }

  fetchBeerData(category) {
    this.isLoading = true;
    this.beerServiceService.fetchLocation().subscribe(response => {
      response['data'].forEach(r => {
        this.isLoading = false;
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
            this.beerPerCategoryBackup = {...this.beerPerCategory};
          });
        });
      }
    });
  }
}
