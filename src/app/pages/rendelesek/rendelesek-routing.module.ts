import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendelesekComponent } from './rendelesek.component';

const routes: Routes = [

  { path: '', component: RendelesekComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendelesekRoutingModule { }
