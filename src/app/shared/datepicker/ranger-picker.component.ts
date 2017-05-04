import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { DaterangepickerConfig } from 'ng2-daterangepicker';
/*** comeform https://embed.plnkr.co/94HAl4q2ITLnahjhYOY0/  **/

import * as moment from 'moment';
import * as $ from "jquery";
import { ComponentDate } from '../models/componentDate';
import { UtilService } from '../services/util.service';

@Component({
    selector: 'app-dateranger-picker',
    templateUrl: './ranger-picker.component.html',
    styleUrls: ['./ranger-picker.component.css']
})
export class RangerPickerComponent implements OnInit {

    @Input() useDatepicker: boolean = false;


    @Output() applySelect = new EventEmitter();

    constructor(private util: UtilService, public daterangepickerOptions: DaterangepickerConfig) { }

    ngOnInit() {
        if (this.useDatepicker) { // 日期選擇器
            this.daterangepickerOptions.settings = ComponentDate.singleDatePickerOptions;
        }
        else { //區間選擇器
            this.daterangepickerOptions.settings = ComponentDate.rangerPickerOptions;
        }
    }


    //單一日期選擇器
    singleDatePicker = new ComponentDate();

    // {{ dateRange3.stopBegin }} ~ {{ dateRange4.stopEnd }}
    //區間日期選擇器
    dateRange1 = new ComponentDate();
    dateRange2 = new ComponentDate();
    dateRange3 = new ComponentDate();
    dateRange4 = new ComponentDate();

    @Input() set startBegin(val) { this.dateRange1.startBegin = val; }
    @Input() set startEnd(val) { this.dateRange2.startEnd = val; }


    @Input() set stopBegin(val) { this.dateRange3.stopBegin = val; }
    @Input() set stopEnd(val) { this.dateRange4.stopEnd = val; }

    private selectedDate(event: any) {

        //  日期選擇器
        this.singleDatePicker.startBegin = event.startDate1._d;

        if (!this.useDatepicker) {
            console.log(`event: %o`, event);

            // 訖區間
            // this.dateRange3.stopBegin = event.startDate1._d;
            //this.dateRange4.stopEnd = event.endDate1._d;
            // 起區間  
            //this.dateRange1.startBegin = event.startDate2._d;
            // this.dateRange2.startEnd = event.endDate2._d;

            this.startBegin = event.startDate2._d;
            this.startEnd = event.endDate2._d;
            this.stopBegin = event.startDate1._d;
            this.stopEnd = event.endDate1._d;

            console.log(`
             this.startBegin: ${moment(this.startBegin).format('YYYY-MM-DD')}
             this.startEnd: ${moment(this.startEnd).format('YYYY-MM-DD')}
             this.stopBegin: ${moment(this.stopBegin).format('YYYY-MM-DD')}
             this.stopEnd: ${moment(this.stopEnd).format('YYYY-MM-DD')}
            `);

            /*
            console.log(`
                this.dateRange3.stopBegin: ${ moment(this.dateRange3.stopBegin).format('YYYY-MM-DD') }
                this.dateRange4.stopEnd: ${moment(this.dateRange4.stopEnd).format('YYYY-MM-DD')}
                this.dateRange1.startBegin: ${moment(this.dateRange1.startBegin).format('YYYY-MM-DD')}
                this.dateRange2.startEnd: ${moment(this.dateRange2.startEnd).format('YYYY-MM-DD')}
            `);
            */
        }

        //console.log('selectedDate: this.useDatepicker-> %o', this.useDatepicker); console.log('selectedDate: event-> %o', event);

        let result = this.useDatepicker ? { startFrom: event.startDate1._d } :
            {
                /*startFrom: event.startDate2._d,
                startTo: event.endDate2._d,
                endFrom: event.startDate1._d,
                endTo: event.endDate1._d*/
                
                 startFrom: event.startDate1._d,
                startTo: event.endDate1._d,
                endFrom: event.startDate2._d,
                endTo: event.endDate2._d
            };

        //console.log('selectedDate result: %o', result);
        this.applySelect.emit(result);
    }
}