import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var CodeMirror;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('editor') editorElement: ElementRef;

  defaultScript = '/ Enter your code here...';

  columnDefs = [
    { headerName: 'Column 1', field: 'make' },
    { headerName: 'Column 2', field: 'model' },
    { headerName: 'Column 3', field: 'price' },
    { headerName: 'Column 4', field: 'price' },
    { headerName: 'Column 5', field: 'price' },
    { headerName: 'Column 6', field: 'price' }
  ];

  rowData = [];
  /*
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];*/

  ngOnInit() {
    CodeMirror.fromTextArea(this.editorElement.nativeElement, {
      lineNumbers: true,
      theme: 'neat',
      mode: 'text/x-q'
    }).setValue(this.defaultScript.trim());
  }
}
