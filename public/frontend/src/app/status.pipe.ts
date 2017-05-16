import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class OnlineStatusPipe implements PipeTransform {


	private param = {
		online(value){
			return (value) ? 'Oнлайн' : 'Oфлайн';
		},
		yesNo(value){
			return (value) ? 'Так' : 'Ні'
		},
    interviewType(value){
      return (value) ? 'Багатозначний' : 'Однозначний';
    }
	}


  transform(value: any, args?: any): any {

  	if(this.param[args]){
  		return this.param[args](value);
  	}
  	else{
  		return value;
  	}

  }

}
