import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var CodeMirror;

@Component({
    selector: 'query-view',
    templateUrl: './query.component.html',
    styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
    @ViewChild('editor') editorElement: ElementRef;
    @ViewChild('preview') previewElement: ElementRef;

    playgroundApi: any;
    previewApi: any;
    defaultScript = '/ Enter your code here...';
    selected: '';

    columnDefs = [
        { headerName: 'Column 1', field: 'a' },
        { headerName: 'Column 2', field: 'b' },
        { headerName: 'Column 3', field: 'c' },
        { headerName: 'Column 4', field: 'd' },
        { headerName: 'Column 5', field: 'e' },
        { headerName: 'Column 6', field: 'f' }
    ];

    rowData = [];
    queries = [
        'Unique B520 Codes',
        'In Scope Accounts',
        'GZ09 Ref Data'
    ];

    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            this.rowData.push({ a: 'Value', b: 'Value', c: 'Value', d: 'Value', e: 'Value', f: 'Value' });
        }
        const playgroundScript = `
            / Write your script below, hit run to execute queries, see the results in the table below.
            / * Remember to create new canned queries for reocurring queries
            / * Make sure to test your queries before running them in production
            / * Visit https://code.kx.com for KDB/Q tutorials and tips

            / List of numbers
            numbers: 1 2 3 4 5;

            / Min/Max of the values
            minumum: min numbers;
            maximum: max numbers;

            / Double numbers
            double: numbers * 2;

            / Triple numbers
            triple: numbers * 3;

        `;

        this.playgroundApi = CodeMirror.fromTextArea(this.editorElement.nativeElement, {
            lineNumbers: true,
            theme: 'idea',
            mode: 'text/x-q'
        });

        this.playgroundApi.setValue(this.trimScriptText(playgroundScript));

        this.previewApi = CodeMirror.fromTextArea(this.previewElement.nativeElement, {
            lineNumbers: true,
            theme: 'idea',
            mode: 'text/x-q',
            readOnly: true
        });

        this.previewApi.setSize(null, '75vh');
    }

    openQuery() {
        const script = `
        / generate data for rdb demo

        sn:2 cut (
         \`AMD;"ADVANCED MICRO DEVICES";
         \`AIG;"AMERICAN INTL GROUP INC";
         \`AAPL;"APPLE INC COM STK";
         \`DELL;"DELL INC";
         \`DOW;"DOW CHEMICAL CO";
         \`GOOG;"GOOGLE INC CLASS A";
         \`HPQ;"HEWLETT-PACKARD CO";
         \`INTC;"INTEL CORP";
         \`IBM;"INTL BUSINESS MACHINES CORP";
         \`MSFT;"MICROSOFT CORP")
        
        s:first each sn
        n:last each sn
        p:33 27 84 12 20 72 36 51 42 29 / price
        m:" ABHILNORYZ" / mode
        c:" 89ABCEGJKLNOPRTWZ" / cond
        e:"NONNONONNN" / ex
        
        / init.q
        
        cnt:count s
        pi:acos -1
        gen:{exp 0.001 * normalrand x}
        normalrand:{(cos 2 * pi * x ? 1f) * sqrt neg 2 * log x ? 1f}
        randomize:{value "\\S ",string "i"$0.8*.z.p%1000000000}
        rnd:{0.01*floor 0.5+x*100}
        vol:{10+\`int$x?90}
        
        / randomize[]
        \\S 235721
        
        / =========================================================
        / generate a batch of prices
        / qx index, qb/qa margins, qp price, qn position
        batch:{
         d:gen x;
         qx::x?cnt;
         qb::rnd x?1.0;
         qa::rnd x?1.0;
         n:where each qx=/:til cnt;
         s:p*prds each d n;
         qp::x#0.0;
         (qp raze n):rnd raze s;
         p::last each s;
         qn::0}
        / gen feed for ticker plant
        
        len:10000
        batch len
        
        maxn:15 / max trades per tick
        qpt:5   / avg quotes per trade
        
        / =========================================================
        t:{
         if[not (qn+x)<count qx;batch len];
         i:qx n:qn+til x;qn+:x;
         (s i;qp n;\`int$x?99;1=x?20;x?c;e i)}
        
        q:{
         if[not (qn+x)<count qx;batch len];
         i:qx n:qn+til x;p:qp n;qn+:x;
         (s i;p-qb n;p+qa n;vol x;vol x;x?m;e i)}
        
        feed:{h$[rand 2;
         (".u.upd";\`trade;t 1+rand maxn);
         (".u.upd";\`quote;q 1+rand qpt*maxn)];}
        
        feedm:{h$[rand 2;
         (".u.upd";\`trade;(enlist a#x),t a:1+rand maxn);
         (".u.upd";\`quote;(enlist a#x),q a:1+rand qpt*maxn)];}
        
        init:{
         o:"t"$9e5*floor (.z.T-3600000)%9e5;
         d:.z.T-o;
         len:floor d%113;
         feedm each \`timespan$o+asc len?d;}
        
        h:neg hopen \`::5010
        / h(".u.upd";\`quote;q 15);
        / h(".u.upd";\`trade;t 5);
        
        init 0
        .z.ts:feed
        `;

        this.previewApi.setValue(this.trimScriptText(script));
    }

    trimScriptText(script: string) {
        return script.split('\n').map(x => x.trim()).join('\n');
    }

    startHeight = 0;
    startY = 0;
    dragging = false;

    onDrag(event) {
        if (this.dragging && event.y !== 0) {
            const newY = Math.max(0, (this.startHeight + event.y - this.startY));
            const curY = this.playgroundApi.getWrapperElement().offsetHeight;
            if (curY !== newY) {
                this.playgroundApi.setSize(null, newY + "px");
            }
        }
    }

    onDragStart(event) {
        this.dragging = true;
        this.startY = event.y;
        this.startHeight = this.playgroundApi.getWrapperElement().offsetHeight;
    }

    onDragEnd(event) {
        this.dragging = false;
    }
}
