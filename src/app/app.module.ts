
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AgGridModule } from 'ag-grid-angular';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SystemComponent } from './component/system/system.component';
import { QueryComponent } from './component/query/query.component';
import { AuditComponent } from './component/audit/audit.component';
import { AppComponent } from './component/app/app.component';

@NgModule({
  declarations: [AppComponent, QueryComponent, AuditComponent, SystemComponent],
  imports: [
    // Angular Modules
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'query', component: QueryComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'system', component: SystemComponent },
      { path: '', redirectTo: '/query', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
    // Bootstrap Modules
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    // AgGrid Modules
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
