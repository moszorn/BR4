import { Injectable } from '@angular/core';

import * as moment_ from 'moment';


import { TDMY , TDMY_DateObject } from '../models/tdmy.model';

import { DecimalPipe } from '@angular/common';


/**
 *  這個service只限載入 thrid lib , 不允許載入 ./StaticService.service 否則會 memory leak
 */

@Injectable()
export class UtilService {

   private moment: any;
   private isDebug:boolean = false;

  constructor(private decPipe :DecimalPipe) { 
     this.moment = moment_; 
  }

   private  transYYYYMMDDStringToDateObject (dateString) {
       let dateTimeArray = dateString.split(' '),
        dateParts = dateTimeArray[0].split('-'),
        timeParts = dateTimeArray[1].split(':'),
        yyyy = Number.parseInt(dateParts[0]),
        MM = Number.parseInt(dateParts[1]),
        DD = Number.parseInt(dateParts[2]),
        HH = Number.parseInt(timeParts[0]),
        mm = Number.parseInt(timeParts[1]),
        ss = Number.parseInt(timeParts[2]);
        //console.log('transYYYYMMDDStringToDateObject = %s' , this.moment(new Date(yyyy,MM-1,DD,HH,mm,ss)).format('YYYY-MM-DD HH:mm:ss'));
        return (new Date(yyyy,MM-1,DD,HH,mm,ss)).valueOf();
  };

    /**
     * 取得美東日期幾日(fewDayAgo)前到指定日(fromDate),預設取美東日期包含指定日
     * 例如: fewDayAgo = 9 , fromDate= new Date(2017,4,14)五月14日 , 
     * 包含到今日就 2017-5-5 ~ 2017-5-14 共10天
     */
    public getFewDayAgoByFrom(fewDayAgo:number, fromDate = this.meidon.yesterday){
     
       const date = new Date(fromDate),
              last = new Date(date.getTime() - (fewDayAgo * 24 * 60 * 60 * 1000)),
              from = new Date( last.getFullYear(), (last.getMonth()) , last.getDate()); 
          
       return  {
          start: new TDMY_DateObject( this.moment(from).format('YYYY-MM-DD'), from) ,
          end: new TDMY_DateObject( this.moment(fromDate).format('YYYY-MM-DD'), fromDate)
        };         
    }
  
    /**
     * 取得指定美東日期幾日前到今日,預設取美東日期包含今日前10日
     * 例如: fewDayAgo = 9 , 包含到今日就是 9 + 1(今日), 9天前到今日總共10日,取得10天前日期到今日
     */
    public getTenDayAgoToday(fewDayAgo = 9){
       return this.getFewDayAgoByFrom(9 , this.meidon.YESTERDAY);
    }
  
    //美東物件
    /**
     * 取得美東物件
     */
    public get meidon(){
    
     let meiDonTimeSpan = this.transYYYYMMDDStringToDateObject( this.moment.tz("America/New_York").format('YYYY-MM-DD HH:mm:ss'));
      
       //因為4月前都沒資料,所以在此處寫死
       //let meiDonTimeSpan =  this.transYYYYMMDDStringToDateObject( "2017-02-10 00:00:00");    
           
           
              var USA_CurrentTime = new Date(meiDonTimeSpan) ,
                  now = this.moment(USA_CurrentTime).format('YYYY-MM-DD HH:mm:ss'),
                  USA_YesterDay = new Date(USA_CurrentTime),yesterday;
                
                  USA_YesterDay.setDate(USA_YesterDay.getDate()-1);
                  yesterday = this.moment(USA_YesterDay).format('YYYY-MM-DD HH:mm:ss');//美東時間之昨天

           return {   
                    now:now,
                    yesterday:yesterday,
                    nowWithoutTime:now.split(' ')[0],
                    yesterdayWithoutTime:yesterday.split(' ')[0],
                    NOW:USA_CurrentTime,
                    YESTERDAY:USA_YesterDay
                  };
    };
    /**
     * 取得美東日期美東今日
     */
     public get meiDonYesterday() {  
        return this.isDebug ?
         {
            start: new TDMY_DateObject('2017-02-28', this.meidon.YESTERDAY),
            end: new TDMY_DateObject('2017-02-28', this.meidon.YESTERDAY),
         }
                  :
         {
          start: new TDMY_DateObject(this.meidon.yesterdayWithoutTime, this.meidon.YESTERDAY) ,
          end: new TDMY_DateObject(this.meidon.yesterdayWithoutTime, this.meidon.YESTERDAY)
        };   
    };
    

    /**
     * 取得美東日期前天
     */
    public get getMeiDonBeforeYesterday(){
        var t = this.meidon.YESTERDAY,
           year = t.getFullYear(), month = t.getMonth(), date = t.getDate(),
           beforeYesterDay = new Date(+new Date(year, month, date) - 1000*60*60*24);
     
        return {
          start: new TDMY_DateObject(this.moment(beforeYesterDay).format('YYYY-MM-DD'), beforeYesterDay),
          end: new TDMY_DateObject(this.moment(beforeYesterDay).format('YYYY-MM-DD'), beforeYesterDay) 
          }
    };

    /**
     * 取得美東日期大前天
     */
    public get getMeiDonBefore2Day(){
        var t = this.meidon.YESTERDAY,
           year = t.getFullYear(), month = t.getMonth(), date = t.getDate(),
           beforeYesterDay = new Date(+new Date(year, month, date) - (2 *1000*60*60*24));
     
        return {
          start: new TDMY_DateObject(this.moment(beforeYesterDay).format('YYYY-MM-DD'), beforeYesterDay),
          end: new TDMY_DateObject(this.moment(beforeYesterDay).format('YYYY-MM-DD'), beforeYesterDay) 
          }
    };

     //(2017-4-12 已改)
     /**
      * 取得美東日期本週, 本週星期一到美東今日
      */
     public get getMeiDonThisWeekToday() {
          var meiDonMow = this.meidon.NOW, 
          day =  meiDonMow.getDay(),
          diff = meiDonMow.getDate() - day + (day == 0 ? -6:1),
          weekFirstDay = new Date(meiDonMow.setDate(diff));       

          return {
          start: new TDMY_DateObject(this.moment(weekFirstDay).format('YYYY-MM-DD'), weekFirstDay),
          end: new TDMY_DateObject(this.moment(this.meidon.NOW).format('YYYY-MM-DD'), this.meidon.NOW) 
          }
     };
     //(2017-4-12 已改)
     /**
      * 取得美東日期時間上個禮拜 上週星期一到美東上週星期日
      */
     public get meiDonLastWeek(){           
             var meiDonThisWeekMonday = this.meidon.NOW, 
                    _d = meiDonThisWeekMonday.getDay(),
                    _diff = meiDonThisWeekMonday.getDate() - _d + (_d == 0 ? -6:1),
                    meiDonMonDay = new Date( meiDonThisWeekMonday.setDate(_diff) );

             var beforeOneWeek = meiDonMonDay;
                  beforeOneWeek.setTime(beforeOneWeek.getTime() - (6 * 24 * 60 * 60 * 1000));
              var  day = beforeOneWeek.getDay()
                  , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
                  , lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
                  , lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));

            return this.isDebug ?
            {
              start: new TDMY_DateObject('2017-02-10', this.meidon.YESTERDAY),
              end: new TDMY_DateObject('2017-02-10', this.meidon.YESTERDAY),
            }
            :
            {
              start: new TDMY_DateObject(this.moment(lastMonday).format('YYYY-MM-DD'), lastMonday),
              end: new TDMY_DateObject( this.moment(lastSunday).format('YYYY-MM-DD'), lastSunday)        
            };
    };
     //(2017-4-12 已改)
     /**
      * 取得美東日期時間上上個禮拜 上上週星期一到美東上上週星期日
      */
     public get meiDonLast2Week(){           
             var meiDonThisWeekMonday = this.meidon.NOW, 
                    _d = meiDonThisWeekMonday.getDay(),
                    _diff = meiDonThisWeekMonday.getDate() - _d + (_d == 0 ? -6:1),
                    meiDonMonDay = new Date( meiDonThisWeekMonday.setDate(_diff) );

             var beforeTwoWeek = meiDonMonDay;
                  beforeTwoWeek.setTime(beforeTwoWeek.getTime() - (12 * 24 * 60 * 60 * 1000));
              var  day = beforeTwoWeek.getDay()
                  , diffToMonday = beforeTwoWeek.getDate() - day + (day === 0 ? -6 : 1)
                  , last2Monday = new Date(beforeTwoWeek.setDate(diffToMonday))
                  , last2Sunday = new Date(beforeTwoWeek.setDate(diffToMonday + 6));

            return this.isDebug ?
            {
              start: new TDMY_DateObject('2017-02-10', this.meidon.YESTERDAY),
              end: new TDMY_DateObject('2017-02-10', this.meidon.YESTERDAY),
            }
            :
            {
              start: new TDMY_DateObject(this.moment(last2Monday).format('YYYY-MM-DD'), last2Monday),
              end: new TDMY_DateObject( this.moment(last2Sunday).format('YYYY-MM-DD'), last2Sunday)        
            };
    };
     //這個method沒更動過  取得今日算起30天前
     public get getMeiDonLastMonth(){
            var meidon = this.meidon,yes = meidon.YESTERDAY,lastMonth = new Date(yes);       
            lastMonth.setMonth(yes.getMonth() - 1);

             return this.isDebug ?
             {
              start: new TDMY_DateObject('2017-01-28', this.meidon.YESTERDAY),
              end: new TDMY_DateObject('2017-01-28', this.meidon.YESTERDAY),
            }
            :
            {
              start: new TDMY_DateObject(this.moment(lastMonth).format('YYYY-MM-DD'), lastMonth),
              end: new TDMY_DateObject(this.moment(yes).format('YYYY-MM-DD'), yes)
            };           
     }; 
   
    /*(2017-4-12 已改) 取本月1日到今日 */
    /**
     * 取得美東日期時間(本月),本月1日到美東今日
     */
      public get  getMeiDonThisMonthToday(){
        var meidon = this.meidon,yes = meidon.YESTERDAY,thisMonth = new Date(yes);  

        var thisMonthStart = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);

        return {
          start: new TDMY_DateObject(this.moment(thisMonthStart).format('YYYY-MM-DD'), thisMonthStart),
          end: new TDMY_DateObject(this.moment(yes).format('YYYY-MM-DD'), yes) 
        }              
      };
      /*(2017-4-12 已改) 只取上月1號到上月月底 */
     /**
     * 取得美東日期時間(上月),上月1日到美東上月最後1日
     */
      public get getMeiDonLastMonthOnly(){
        var meidon = this.meidon,yes = meidon.YESTERDAY, 
        _lastMonthStart = new Date(yes),
        lastMonthStart,  lastMonthEnd;  
        _lastMonthStart.setMonth(yes.getMonth() - 1);             
        lastMonthStart = new Date(_lastMonthStart.getFullYear(), _lastMonthStart.getMonth(), 1);
        lastMonthEnd = new Date(_lastMonthStart.getFullYear(), _lastMonthStart.getMonth() + 1, 0);
 
        return {
          start: new TDMY_DateObject(this.moment(lastMonthStart).format('YYYY-MM-DD'), lastMonthStart),
          end: new TDMY_DateObject(this.moment(lastMonthEnd).format('YYYY-MM-DD'), lastMonthEnd)
        };   
      };

     /*(2017-4-12 已改) 只取上上月1號到上上月底 */
     /**
     * 取得美東日期時間(上上月),上上月1日到美東上上月最後1日
     */
      public get getMeiDonLast2MonthOnly(){
        var meidon = this.meidon,yes = meidon.YESTERDAY, 
        _last2MonthStart = new Date(yes), last2MonthStart,  last2MonthEnd;  
      
        _last2MonthStart.setMonth(yes.getMonth() - 1); 
                    
        last2MonthStart = new Date(_last2MonthStart.getFullYear(), _last2MonthStart.getMonth()-1, 1);
        last2MonthEnd = new Date(_last2MonthStart.getFullYear(), _last2MonthStart.getMonth(), 0);
 
        return {
          start: new TDMY_DateObject(this.moment(last2MonthStart).format('YYYY-MM-DD'), last2MonthStart),
          end: new TDMY_DateObject(this.moment(last2MonthEnd).format('YYYY-MM-DD'), last2MonthEnd)
        };   
      };


    public getDateStringByDMY(dmy: string): TDMY {
       if(!dmy || dmy.length !== 1 || !(/^(?:d|m|w|D|M|W)$/.test(dmy))) dmy = 'D';
     
      let dateObj = this.meiDonYesterday;

      switch(dmy){
        case 'W': dateObj = this.meiDonLastWeek; break;
        case 'M': dateObj = this.getMeiDonLastMonth; break;
      }

     return new TDMY(dateObj,dmy);

    }


  /**
   *  '201712' ---> ['2017','12']
   */
   public handleYYYYMM = (yyyymm) =>{
      return [yyyymm.substring(0,4) , yyyymm.substring(4)];
   };

  /**
   * '2017-12' ---> ['2017','12']
   * '2017-12-23' ---> ['2017','12','23']
   */
   public handleYYYY_MM_DD = (yyyy_mm_dd) =>{    
      return yyyy_mm_dd.split('-');
   }; 

   public handleDateString = (dateString) =>{
      return dateString.includes('-')? this.handleYYYY_MM_DD(dateString) : this.handleYYYYMM(dateString);
   };

   public decimalPipe(value:number , format:string): string {
      return this.decPipe.transform(value, format);
   }
 
}
