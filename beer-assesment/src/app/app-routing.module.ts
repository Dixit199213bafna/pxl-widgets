import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeerComponentComponent } from './beer-component/beer-component.component';


const routes: Routes = [
  { path: 'beer', component: BeerComponentComponent },
  { path: '',
    redirectTo: '/beer',
    pathMatch: 'full'
  },
  { path: '**', component: BeerComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
