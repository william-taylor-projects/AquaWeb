
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './component/app/app.component';
import { QueryComponent } from './component/query/query.component';
import { SystemComponent } from './component/system/system.component';
import { AuditComponent } from './component/audit/audit.component';

let routes: Routes = [
  { path: 'query', component: QueryComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'system', component: SystemComponent },
  { path: '', redirectTo: '/query', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    QueryComponent,
    AuditComponent,
    SystemComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
