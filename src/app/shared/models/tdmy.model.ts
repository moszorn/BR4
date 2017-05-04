export class TDMY {
  start:TDMY_DateObject;
  end:TDMY_DateObject;
  queryType:string;
  constructor(dateObj: any, queryType: string){
    this.start = dateObj.start;
    this.end = dateObj.end;
    this.queryType = queryType;
  }
}

export class TDMY_DateObject {
  constructor(public string: string, public value: Date){  }
}

export interface finItem {
  bite?: number | null |undefined; 
  category?: string | undefined; 
  commissionableSums?: number;
  memberCounts?: number | null |undefined; 
  payoffSums?: number | null |undefined; 
  wagersCounts?: number | null |undefined; 
  isRise?: boolean;
}

export interface finObject {
  bite?: any | undefined;
  category?: any| undefined;
  commissionableSums?: any| undefined;
  memberCounts?: any| undefined;
  payoffSums?: any| undefined;
  wagersCounts?: any| undefined;
  isRise?: boolean;
}


/** DashBoard Query Date , include select date type and compare date*/
export interface dashBoardQueryDateObject{
  compareDate : { start: string , end: string },
  currentDate : { start: string , end: string },
  queryType: string
};


export interface queryObject  {
      start?: {
        dateStart: string ,
        dateEnd: string
      } | undefined ,
      end?: {
         dateStart:  string , 
         dateEnd:string
      } | undefined , 
      dateStart?: string| undefined ,
      dateEnd?: string| undefined ,  
      queryType: string| undefined,
      dataCount?: string | undefined
    };


/** dmember.comonent QueryObject */
export interface dmemberQueryDateObject{

dateStart: string | undefined | null,
dateEnd: string | undefined | null,
isCompanyDeposit?: string | undefined | null,
isOnlinePay?: string | undefined | null,
depositAmount1?: string | undefined | null,
depositAmount2?: string | undefined | null,
depositTimes1?: string | undefined | null,
depositTimes2?: string | undefined | null,
commissionable1?: string | undefined | null,
commissionable2?: string | undefined | null,
payoff1?: string | undefined | null,
payoff2?: string | undefined | null,
wagersCount1?: string | undefined | null,
wagersCount2?: string | undefined | null,
diffDays?: string | undefined | null,
page?: string | undefined | null,
itemsPerPage?: string | undefined  | null     
}