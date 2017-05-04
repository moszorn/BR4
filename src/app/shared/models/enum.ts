//How to use TypeScript : https://www.gurustop.net/blog/2016/05/24/how-to-use-typescript-enum-with-angular2/

//financial
export enum FIN {
  wager,payoff,commissionable,bite,member
};

export enum BR {
  group,category,hall,game
};

export enum DATER {
  second = 0,
  minute = 1,
  hour = 2,
  day = 3,
  week = 4,
  month = 5,
  yesterday = 10,
  thisWeek = 11,
  lastWeek = 12,
  thisMonth = 13,
  lastMonth = 14
};


//讀取傳入的 DMY參數
//將傳入的文字轉成enum數值 TDMY[params['DMY']]
//將數值轉成enum項目 TDMY[3]
//console.log('dmy: %s , enum: %d , enum string: %s', params['DMY'] , TDMY[params['DMY']] , TDMY[3]);

/**
 *  get all the values of a TypeScript enum type
 *  The options list has the numeric keys, followed by the string keys
     So, the first half is numeric, the 2nd half is strings
 */
  // let options : string[] = Object.keys(TDMY);
       