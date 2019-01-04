import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'system-view',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
    rowData = [];
    columnDefs = [
        { headerName: 'Feed', field: 'feed' },
        { headerName: 'Jobs', field: 'jobs' },
        { headerName: 'Success', field: 'success' },
        { headerName: 'Waiting', field: 'waiting' },
        { headerName: 'Failed', field: 'failed' },
    ];

    ngOnInit() {
        for (let i = 0; i < 25; i++) {
            this.rowData.push({
                feed: 'Accounts',
                jobs: 20,
                success: 5,
                waiting: 10,
                failed: 5
            })
        }
    }
}
