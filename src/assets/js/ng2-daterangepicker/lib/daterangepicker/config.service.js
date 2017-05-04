"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var $ = require("jquery");
var DaterangepickerConfig = (function() {
    function DaterangepickerConfig() {
        this.skipCSS = false;
        this.addedCSS = false;
        this.settings = {};
    }
    DaterangepickerConfig.prototype.embedCSS = function() {
        if (this.addedCSS) {
            return;
        }
        if (this.skipCSS === false) {
            $('head').append('<style>' +
                /*".daterangepicker.single .calendar,.daterangepicker.single .ranges,.ranges{float:none}.daterangepicker{position:absolute;color:#111;background:#fff;border-radius:4px;width:278px;padding:4px;margin-top:1px;top:100px;left:20px}.daterangepicker:after,.daterangepicker:before{position:absolute;display:inline-block;content:''}.daterangepicker:before{top:-7px;border-right:7px solid transparent;border-left:7px solid transparent;border-bottom:7px solid #ccc}.daterangepicker:after{top:-6px;border-right:6px solid transparent;border-bottom:6px solid #fff;border-left:6px solid transparent}.daterangepicker.opensleft:before{right:9px}.daterangepicker.opensleft:after{right:10px}.daterangepicker.openscenter:after,.daterangepicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.daterangepicker.opensright:before{left:9px}.daterangepicker.opensright:after{left:10px}.daterangepicker.dropup{margin-top:-5px}.daterangepicker.dropup:before{top:initial;bottom:-7px;border-bottom:initial;border-top:7px solid #ccc}.daterangepicker.dropup:after{top:initial;bottom:-6px;border-bottom:initial;border-top:6px solid #fff}.daterangepicker.dropdown-menu{max-width:none;z-index:3001}.daterangepicker.show-calendar .calendar{display:block}.daterangepicker .calendar{display:none;max-width:270px;margin:4px}.daterangepicker .calendar.single .calendar-table{border:none}.daterangepicker .calendar td,.daterangepicker .calendar th{white-space:nowrap;text-align:center;min-width:32px}.daterangepicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background:#fff}.daterangepicker table{width:100%;margin:0}.daterangepicker td,.daterangepicker th{text-align:center;width:20px;height:20px;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer}.daterangepicker td.available:hover,.daterangepicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit}.daterangepicker td.week,.daterangepicker th.week{font-size:80%;color:#ccc}.daterangepicker td.off,.daterangepicker td.off.end-date,.daterangepicker td.off.in-range,.daterangepicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}.daterangepicker td.in-range{background-color:#ebf4f8;border-color:transparent;color:#000;border-radius:0}.daterangepicker td.start-date{border-radius:4px 0 0 4px}.daterangepicker td.end-date{border-radius:0 4px 4px 0}.daterangepicker td.start-date.end-date{border-radius:4px}.daterangepicker td.active,.daterangepicker td.active:hover{background-color:#357ebd;border-color:transparent;color:#fff}.daterangepicker th.month{width:auto}.daterangepicker option.disabled,.daterangepicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.daterangepicker select.monthselect,.daterangepicker select.yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default}.daterangepicker select.monthselect{margin-right:2%;width:56%}.daterangepicker select.yearselect{width:40%}.daterangepicker select.ampmselect,.daterangepicker select.hourselect,.daterangepicker select.minuteselect,.daterangepicker select.secondselect{width:50px;margin-bottom:0}.daterangepicker .input-mini{border:1px solid #ccc;border-radius:4px;color:#555;height:30px;line-height:30px;display:block;vertical-align:middle;margin:0 0 5px;padding:0 6px 0 28px;width:100%}.daterangepicker .input-mini.active{border:1px solid #08c;border-radius:4px}.daterangepicker .daterangepicker_input{position:relative}.daterangepicker .daterangepicker_input i{position:absolute;left:8px;top:8px}.daterangepicker.rtl .input-mini{padding-right:28px;padding-left:6px}.daterangepicker.rtl .daterangepicker_input i{left:auto;right:8px}.daterangepicker .calendar-time{text-align:center;margin:5px auto;line-height:30px;position:relative;padding-left:28px}.daterangepicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.ranges{font-size:11px;margin:4px;text-align:left}.ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.ranges li{font-size:13px;background:#f5f5f5;border:1px solid #f5f5f5;border-radius:4px;color:#08c;padding:3px 12px;margin-bottom:8px;cursor:pointer}.ranges li.active,.ranges li:hover{background:#08c;border:1px solid #08c;color:#fff}@media (min-width:564px){.daterangepicker.ltr .calendar.right .calendar-table,.daterangepicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.ltr .calendar.left .calendar-table,.daterangepicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker{width:auto}.daterangepicker .ranges ul{width:160px}.daterangepicker.single .ranges ul{width:100%}.daterangepicker.single .calendar.left{clear:none}.daterangepicker.single.ltr .calendar,.daterangepicker.single.ltr .ranges{float:left}.daterangepicker.single.rtl .calendar,.daterangepicker.single.rtl .ranges{float:right}.daterangepicker.ltr{direction:ltr;text-align:left}.daterangepicker.ltr .calendar.left{clear:left;margin-right:0}.daterangepicker.ltr .calendar.right{margin-left:0}.daterangepicker.ltr .calendar.left .calendar-table,.daterangepicker.ltr .left .daterangepicker_input{padding-right:12px}.daterangepicker.ltr .calendar,.daterangepicker.ltr .ranges{float:left}.daterangepicker.rtl{direction:rtl;text-align:right}.daterangepicker.rtl .calendar.left{clear:right;margin-left:0}.daterangepicker.rtl .calendar.right{margin-right:0}.daterangepicker.rtl .calendar.left .calendar-table,.daterangepicker.rtl .left .daterangepicker_input{padding-left:12px}.daterangepicker.rtl .calendar,.daterangepicker.rtl .ranges{text-align:right;float:right}}@media (min-width:730px){.daterangepicker .ranges{width:auto}.daterangepicker.ltr .ranges{float:left}.daterangepicker.rtl .ranges{float:right}.daterangepicker .calendar.left{clear:none!important}}"*/
                ".daterangepicker.single .calendar,.daterangepicker.single .ranges,.ranges{float:none}" +
                ".daterangepicker .header_table td{cursor:default;border:none;height:40px}.daterangepicker .header_table .tdone{width:12px!important;cursor:default;border:none;line-height:40px}" +
                ".daterangepicker{position:absolute;color:#111;background:#fff;border-radius:4px;padding:0px;margin-top:0px;top:100px;left:20px}" +

                ".daterangepicker:after,.daterangepicker:before{position:absolute;display:inline-block;content:''}" +
                /* 箭頭無法固定於某側，暫時不顯示 */
                /*
                ".daterangepicker:before{top:-8px;border-right:8px solid transparent;border-left:8px solid transparent;border-bottom:8px solid #555}" +
                ".daterangepicker:after{top:-7px;border-right:7px solid transparent;border-bottom:7px solid #555;border-left:7px solid transparent}" +
                */
                ".daterangepicker.opensleft:before{right:9px}.daterangepicker.opensleft:after{right:10px}" +
                ".daterangepicker.openscenter:after,.daterangepicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}" +
                ".daterangepicker.opensright:before{left:9px}.daterangepicker.opensright:after{left:10px}.daterangepicker.dropup{margin-top:-5px}" +
                ".daterangepicker.dropup:before{top:initial;bottom:-7px;border-bottom:initial;border-top:7px solid #ccc}" +
                ".daterangepicker.dropup:after{top:initial;bottom:-6px;border-bottom:initial;border-top:6px solid #fff}" +
                ".daterangepicker.dropdown-menu{max-width:none;z-index:3001}.daterangepicker.show-calendar .calendar{display:block}" +
                ".daterangepicker .calendar{display:none;max-width:270px;margin:10px 0 6px 0}.daterangepicker .calendar.single .calendar-table{border:none}" +
                ".daterangepicker .calendar td,.daterangepicker .calendar th{white-space:nowrap;text-align:center;min-width:32px}" +
                ".daterangepicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background:#fff}" +
                ".daterangepicker table{width:100%;margin:0}.daterangepicker td,.daterangepicker th{text-align:center;height:22px;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer}" +
                ".daterangepicker td.available:hover,.daterangepicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit}" +
                ".daterangepicker td.week,.daterangepicker th.week{font-size:80%;color:#ccc}" +
                ".daterangepicker td.off,.daterangepicker td.off.end-date,.daterangepicker td.off.in-range,.daterangepicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}" +
                ".daterangepicker td.in-range{background-color:#ebf4f8;border-color:transparent;color:#000;border-radius:0}" +
                ".daterangepicker td.start-date{border-radius:4px 0 0 4px}.daterangepicker td.end-date{border-radius:0 4px 4px 0}" +
                ".daterangepicker td.start-date.end-date{border-radius:4px}.daterangepicker td.active,.daterangepicker td.active:hover{background-color:#22a8d8;border-color:transparent;color:#fff}" +
                ".daterangepicker th.month{width:auto}.daterangepicker option.disabled,.daterangepicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}" +

                /* 相較於設定 */
                ".daterangepicker td.in-range2 {background-color: #f5dbaf;border-color: transparent;color: #000;border-radius: 0;}" +
                ".daterangepicker td.start-date2 {border-radius: 4px 0 0 4px;}.daterangepicker td.end-date2 {border-radius: 0 4px 4px 0;}" +
                ".daterangepicker td.start-date2.end-date2 {border-radius: 4px;}.daterangepicker td.active2, .daterangepicker td.active2:hover {background-color: #bd9235;border-color: transparent;color: #fff;}" +


                /** checkbox css **/
                ".daterangepicker input[type='radio'], input[type='checkbox']{margin: 4px 0 0;margin-top: 1px; line-height: normal;}.regular-checkbox, .regular-checkbox2 {display: none;}" +
                ".daterangepicker .regular-checkbox + label, .regular-checkbox2+ label { background-color: #444;border:none;box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);padding: 6px 7px;border-radius: 3px;display: inline-block;position: relative;line-height: 36px; height: 16px;vertical-align: middle;}" +
                ".daterangepicker .regular-checkbox + label:active, .regular-checkbox:checked + label:active,.regular-checkbox2 + label:active, " +
                ".regular-checkbox2:checked + label:active {box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);}" +
                ".regular-checkbox:checked + label,.regular-checkbox2:checked + label {	background-color: #444;	border:none;box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);	color: #99a1a7;}" +
                ".regular-checkbox:checked + label:after {content:'√';font-size:14px;position:absolute;top:-10px;left:2px;color: #fff;}" +
                ".regular-checkbox2 + label:after {	content: '√';font-size: 14px;position: absolute;top: -9px;left: 3px;color: #fff;}" +
                ".regular-checkbox2:checked + label:after {content:'';font-size:14px;position: absolute;top: -9px;	left: 3px;	color: #fff;}" +

                /* select css*/
                "select.form-control{background:#444!important;color:#fff!important}" +
                ".mySelect {display: inline-block;vertical-align: bottom;background: #444;position: relative;height: 33px;line-height: 33px;width: auto;padding-left: 20px;padding-right: 30px;border-radius: 4px;/* border: 1px solid #838f93; */font-size: 14px;/* overflow: hidden; */color: #fff;z-index: 500;transition: all ease-out .3s;cursor: pointer;}" +
                ".mySelect .selected {min-width: 1px;min-height: 100%;}.mySelect .selectedTxt:after {content: '';width: 0;height: 0;display: block;outline: none;/* position: absolute; */float: right;margin-right: -18px;margin-top: 14px;border-top: 4px solid #eee;border-left: 4px solid transparent;border-right: 4px solid transparent;}.mySelect:hover {border-color: #6666;}" +
                ".mySelect .selectList {display: none;float: left;margin-top: 1px;margin-left: -20px;width: calc(100% + 50px);box-shadow: 0 0 5px #aaa;transition: all ease-out .3s;}" +
                ".mySelect.focus .selectList {max-height: auto;overflow-y: auto;overflow-x: hidden;}.mySelect:focus,.mySelect .selected,.mySelect .option,.mySelect .selectList {outline: none;}.mySelect .selected:focus+*+.selectList {display: block;}" +
                ".mySelect .selectList .option {border: 1px solid #555;height: 40px;box-sizing: border-box;line-height: 40px;/*padding-left: 20px;*/cursor: pointer;background-color: #444;color: #fff;transition: all ease-out .3s;}" +
                ".mySelect .selectList .option:hover {background-color: #666;}.mySelect.hover .selectList:hover {display: block;}.mySelect.hover .selectList:focus {display: none;}" +

                /*".daterangepicker select { border:none; border-radius:8x; background-color:#444;height:36px;line-height:36px;appearance:none; -moz-appearance:none; -webkit-appearance:none;}" +
                ".daterangepicker select::-ms-expand { display: none; }" +*/

                ".daterangepicker .seleckday{border:1px solid #ccc;border-radius:4px;color:#555;height:26px;line-height:28px;display:block;vertical-align:middle;}" +
                ".daterangepicker select.monthselect,.daterangepicker select.yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default}" +
                ".daterangepicker #forold,.daterangepicker label{margin-right:3px;padding-right:3px}" +
                ".daterangepicker select.monthselect{margin-right:2%;width:56%}.daterangepicker select.yearselect{width:40%}" +
                ".daterangepicker select.ampmselect,.daterangepicker select.hourselect,.daterangepicker select.minuteselect,.daterangepicker select.secondselect{width:50px;margin-bottom:0}" +
                /*".daterangepicker .input-mini{border:1px solid #ccc;border-radius:4px;color:#555;height:26px;line-height:28px;display:block;vertical-align:middle;margin:0 0 5px;padding:0 6px 0 28px;width:100%}.daterangepicker .input-mini.active{border:1px solid #08c;border-radius:4px}" +*/
                ".daterangepicker label{margin:0px}" +
                ".daterangepicker .input-mini{border:0px;color:#fff;height:34px;line-height:30px;display:block;background:#444;vertical-align:middle;margin:5px 0;padding:5px;text-align:center;width:100%}" +
                ".daterangepicker .input-mini.active{border:1px solid #999;}" +
                '.daterangepicker .input-mini:disabled{background:#444;color:#999}' +

                ".daterangepicker input[type='checkbox']{margin-top:3px;background:#444;border:none;color:#fff}" +

                ".daterangepicker .daterangepicker_input{position:relative}.daterangepicker .daterangepicker_input i{position:absolute;left:8px;top:8px}" +
                ".daterangepicker.rtl .input-mini{padding-right:28px;padding-left:6px}.daterangepicker.rtl .daterangepicker_input i{left:auto;right:8px}" +
                ".daterangepicker .calendar-time{text-align:center;margin:5px auto;line-height:30px;position:relative;padding-left:28px}" +
                ".daterangepicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}" +

                ".daterangepicker .btn-sm{line-height:34px;background-color:#444;padding: 0 15px;border-radius: 4px;cursor: pointer;color:#CCC}" +
                ".daterangepicker .btn-success{background-color:#22a8d8;color:#fff;margin-right:5px}" +

                ".apply_line {line-height: 30px;margin: 5px 0;padding:0px 0 3px 0;}" +

                ".ranges{border-top-left-radius:4px;border-bottom-left-radius:4px;background:#555;width:255px!important;font-size:11px;text-align:left;padding:10px}.ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}" +
                ".ranges li{font-size:13px;background:#f5f5f5;border:1px solid #f5f5f5;border-radius:4px;color:#08c;padding:3px 12px;margin-bottom:8px;cursor:pointer}" +
                ".ranges li.active,.ranges li:hover{background:#22a8d8;border:1px solid #22a8d8;color:#fff}" +
                "@media (max-width:730px){.ranges{width:100%!important;padding:15px}.daterangepicker .calendar{margin:5px}}" +

                "@media (max-width:564px){.daterangepicker .calendar{max-width:100%;width:97%}.daterangepicker .calendar{margin:8px 0px}}" +
                "@media (min-width:564px){.ranges{padding:10px}.daterangepicker.ltr .calendar.right .calendar-table,.daterangepicker.rtl .calendar.left .calendar-table{width:100%;border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}" +
                ".daterangepicker.ltr .calendar.left .calendar-table,.daterangepicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker{width:auto}.daterangepicker .ranges ul{width:160px}.daterangepicker.single .ranges ul{width:100%}.daterangepicker.single .calendar.left{clear:none}.daterangepicker.single.ltr .calendar,.daterangepicker.single.ltr .ranges{float:left}.daterangepicker.single.rtl .calendar,.daterangepicker.single.rtl .ranges{float:right}.daterangepicker.ltr{direction:ltr;text-align:left}.daterangepicker.ltr .calendar.left{clear:left;margin-right:0}.daterangepicker.ltr .calendar.right{margin-left:0}.daterangepicker.ltr .calendar.left .calendar-table,.daterangepicker.ltr .left .daterangepicker_input{padding-right:12px}.daterangepicker.ltr .calendar,.daterangepicker.ltr .ranges{float:left}.daterangepicker.rtl{direction:rtl;text-align:right}.daterangepicker.rtl .calendar.left{clear:right;margin-left:0}.daterangepicker.rtl .calendar.right{margin-right:0}.daterangepicker.rtl .calendar.left .calendar-table,.daterangepicker.rtl .left .daterangepicker_input{padding-left:12px}.daterangepicker.rtl .calendar,.daterangepicker.rtl .ranges{text-align:right;float:right}}" +

                "@media (min-width:730px){.daterangepicker .ranges{width:auto}.daterangepicker.ltr .ranges{float:left}.daterangepicker.rtl .ranges{float:right}.daterangepicker .calendar.left{clear:none!important}}" +
                '</style>');
        }
    };
    return DaterangepickerConfig;
}());
DaterangepickerConfig.decorators = [
    { type: core_1.Injectable },
];
DaterangepickerConfig.ctorParameters = function() { return []; };
exports.DaterangepickerConfig = DaterangepickerConfig;
//# sourceMappingURL=config.service.js.map