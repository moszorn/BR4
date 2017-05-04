import * as moment_ from 'moment';

const singleDatePickerOptions: any = {
    locale: { 
        format: 'YYYY-MM-DD',
    },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    twoRangePicker: false,
    dateCompareMode: false, 
};

const rangerPickerOptions: any = {
        locale: { 
            format: 'YYYY-MM-DD',
            applyLabel:'确定',
            cancelLabel:'取消',
            compareToLabel: '相较於:',
            compareToItems: [
            { value: 'PreviousPeriod', text: "上一区间" },
            { value: 'PreviousMonth', text: '上月' },
            { value: 'PreviousYear', text: '上一年' } 
            ]
    },
    twoRangePicker: true,
    dateCompareMode: true
};


export class ComponentDate {
    private moment: any;
   constructor() { 
     this.moment = moment_; 
  }

  _startDate1 : Date;
  _startDate2: Date;
  _endDate1: Date;
  _endDate2: Date;
  
   public set startBegin(value: Date){       
        this._startDate2 = value;
        //console.log(`componentDate startBegin: %s`, moment_(this._startDate2).format('YYYY-MM-DD'));
   }
   public  set startEnd(value: Date){        
      this._endDate2 = value;
      //console.log(`componentDate startEnd: %s`, moment_(this._endDate2).format('YYYY-MM-DD'));
   }  

   public set stopBegin(value: Date){       
      this._startDate1 = value;
       //console.log(`componentDate stopBegin: %s`, moment_(this._startDate1).format('YYYY-MM-DD'));
   }  
  public  set stopEnd(value: Date){       
      this._endDate1 = value;
      //console.log(`componentDate stopEnd: %s`, moment_(this._endDate1).format('YYYY-MM-DD'));
   } 

  public get stopBegin(){  return this.moment(this._startDate1).format('YYYY-MM-DD');}   
  public get stopEnd(){ return this.moment(this._endDate1).format('YYYY-MM-DD');}

  public get startBegin(){ return this.moment(this._startDate2).format('YYYY-MM-DD');}
  public get startEnd(){return this.moment(this._endDate2).format('YYYY-MM-DD');}

  static singleDatePickerOptions: any = {
    locale: { 
        format: 'YYYY-MM-DD',
    },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    twoRangePicker: false,
    dateCompareMode: false, 
 };

static rangerPickerOptions: any = {
        locale: { 
            format: 'YYYY-MM-DD',
            applyLabel:'确定',
            cancelLabel:'取消',
            compareToLabel: '相较於:',
            compareToItems: [
            { value: 'PreviousPeriod', text: "上一区间" },
            { value: 'PreviousMonth', text: '上月' },
            { value: 'PreviousYear', text: '上一年' } 
            ]
    },
    singleDatePicker: false,
    twoRangePicker: true,
    dateCompareMode: true
};


 
}


    