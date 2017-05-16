import { Pipe, PipeTransform } from '@angular/core';



import * as moment from 'moment';


@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(){
  	 moment.locale('ru');
  }

  transform(value: any, args?: any): any {

  	if(args == 'post'){
  		 return `${moment(value).format('L')} ${moment(value).format('LT')}`
  	}
  	if(args == 'chat'){
  		return	`${moment(value).format('LT')}`
  	}

   
  }

}
