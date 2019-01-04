import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'audit-view',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
    rowData = [];
    columnDefs = [
        { headerName: 'User', field: 'user' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Canned', field: 'canned' },
        { headerName: 'Duration', field: 'duration' },
        { headerName: 'Success', field: 'success' }
    ];

    ngOnInit() {
        for(let i = 0; i < 25; i++) {
            this.rowData.push({
                user: 'wiltaylo',
                name: 'Simple Query',
                date: '2018/01/01',
                canned: false,
                duration: 100.0,
                success: true
            });
        }
    }
}
