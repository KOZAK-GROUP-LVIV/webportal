import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpConnectionService {

  public isAuth: boolean = false;
  public isAdmin:boolean = false;
  public authStream = new Subject();
  public adminStream = new Subject();
  public updateNewsStream = new Subject();
  public updateIntervieStream = new Subject();
  public domain = '';

  constructor(private http:Http) {


   }





  public getUsers(){

  	return	Observable.create((observer:Observer<any>)=>{


			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/getUsers`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){
			         	//this.authStream.next(JSON.parse(responce["_body"]).result);
			          	observer.next(JSON.parse(responce["_body"]).result);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });

	  	 })

  }


  public singin(formData){
  		return	Observable.create((observer:Observer<any>)=>{
  	 		let body = JSON.stringify(formData);
		    let headers = new Headers({ 'Content-Type': 'application/json' });
		    let options = new RequestOptions({ headers: headers, withCredentials: false});
		  	this.http.post(`${this.domain}/api/singin`,body,options)
		  	.subscribe((responce)=>{
		  		let isSucces = JSON.parse(responce["_body"]).isSucces;
		  		console.log(responce)

		         if(isSucces){
		          	observer.next(JSON.parse(responce["_body"]));
		        }
		         if(!isSucces){
		         	observer.error(JSON.parse(responce["_body"]));
		       }

		    });

  	 })
   }



   public login(formData){
	  		return	Observable.create((observer:Observer<any>)=>{
	  	 		let body = JSON.stringify({username:formData.login, password: formData.password});

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.post(`${this.domain}/api/login`,body,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){
			         	this.authStream.next(JSON.parse(responce["_body"]).isSucces);
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	this.authStream.next(JSON.parse(responce["_body"]).isSucces);
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });

	  	 })

   }


   public removeUser(id){

   	 	 return	Observable.create((observer:Observer<any>)=>{
	  	 		
			   	let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/removeUser/${id}`,options)
			  	.subscribe((responce)=>{
			  		console.log(responce)
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
	  	 })

   }


   public addToWorkers(id){
   	 return	Observable.create((observer:Observer<any>)=>{
	  	 		
			   	let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/addWorker/${id}`,options)
			  	.subscribe((responce)=>{
			  		console.log(responce)
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
	  	 })
   }

      public removeFromWorker(id){
   	 return	Observable.create((observer:Observer<any>)=>{
	  	 		
			   	let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/removeWorker/${id}`,options)
			  	.subscribe((responce)=>{
			  		console.log(responce)
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
	  	 })
   }



   public getProfileInfo(){
   		return	Observable.create((observer:Observer<any>)=>{

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/getProfile`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){
			         	//this.authStream.next(JSON.parse(responce["_body"]).isSucces);
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });

	  	 })

   }



   private editProfile(formData){
   	return Observable.create((observer:Observer<any>)=>{

		let options = new RequestOptions({withCredentials: true});
		this.http.post(`${this.domain}/api/editProfile`, formData, options)
		.subscribe((responce)=>{
				let isSucces = JSON.parse(responce["_body"]).isSucces;
			    if(isSucces){
			          	observer.next(true);
			        }
			    if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }
		});
   	})
   }


   public isAuthUser():Observable<any>{

   		return	Observable.create((observer:Observer<any>)=>{

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/getProfile`,options)
			  	.subscribe((responce)=>{
						
			  			let isSucces = JSON.parse(responce["_body"]).isSucces;
			  			this.isAuth = isSucces;
						this.authStream.next(isSucces);
			  			observer.next(isSucces);

			        })

			  })	
   }


   public isAuthWorker(){
   	
   	return	Observable.create((observer:Observer<any>)=>{

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/getWorkerProfile`,options)
			  	.subscribe((responce)=>{
			  			let isSucces = JSON.parse(responce["_body"]).isSucces;
			  			observer.next(isSucces);
			        })

			  })	
   }


   public isAdminUser():Observable<boolean>{
   		return Observable.create((observer:Observer<any>)=>{

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/getProfile`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
				  		if(isSucces){
				  			let isAdmin = JSON.parse(responce["_body"]).user.isAdmin;
				  			this.isAdmin = isSucces&&isAdmin;
				  			this.adminStream.next(isSucces&&isAdmin);
				  			observer.next(isSucces&&isAdmin);
				  		}
				  		else{
				  			observer.next(false);
				  		}

			        })

			  })	
   }




   public logout(){

   	return	Observable.create((observer:Observer<any>)=>{


			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.get(`${this.domain}/api/logout`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			         	this.authStream.next(!JSON.parse(responce["_body"]).isSucces);
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });

	  	 })

   }




   public getNewsList(pagination){
   	return  Observable.create((observer:Observer<any>)=>{

   		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers, withCredentials: true});

		    	this.http.get(`${this.domain}/api/getAllNews/${pagination}`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			         	this.updateNewsStream.next(JSON.parse(responce["_body"]).result);
			          	observer.next(JSON.parse(responce["_body"]).result);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }

			    });
			    
   	})
   }


   public getNews(id){
   	 	return  Observable.create((observer:Observer<any>)=>{

   		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers, withCredentials: true});

		    	this.http.get(`${this.domain}/api/getNews/${id}`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){

			          	observer.next(JSON.parse(responce["_body"]).result);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }

			    });
			    
   	})

   }


   		public addNews(data){

   		   	return Observable.create((observer:Observer<any>)=>{
   				let body = JSON.stringify(data);

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.post(`${this.domain}/api/addNews`,body,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){

			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
   		})

   	}


   	public updateNews(data){

   		   	return Observable.create((observer:Observer<any>)=>{
   				let body = JSON.stringify(data);

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.post(`${this.domain}/api/updateNews`,body,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){

			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
   		})

   	}

    public removeNews(id){
   	 	return  Observable.create((observer:Observer<any>)=>{

   		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers, withCredentials: true});

		    	this.http.get(`${this.domain}/api/removeNews/${id}`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			          	observer.next(JSON.parse(responce["_body"]).isSucces);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }

			    });
			    
   		})

   }

   public addInterview(data){

   	   	return Observable.create((observer:Observer<any>)=>{
   				let body = JSON.stringify(data);

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.post(`${this.domain}/api/addInterview`,body,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){

			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
   		})

   }

   public getInterviewList(){

   	return  Observable.create((observer:Observer<any>)=>{

   		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers, withCredentials: true});

		    	this.http.get(`${this.domain}/api/getAllInterview`,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			         	this.updateIntervieStream.next(JSON.parse(responce["_body"]).result);
			          	observer.next(JSON.parse(responce["_body"]).result);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }

			    });

		})
			    
   }


   public updateInterview(data){

   		  	return Observable.create((observer:Observer<any>)=>{
   				let body = JSON.stringify(data);

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.post(`${this.domain}/api/updateInterview`,body,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){

			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
   		})

   }


   public removeInterview(id){

   	return  Observable.create((observer:Observer<any>)=>{

   		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers, withCredentials: true});

		    	this.http.get(`${this.domain}/api/removeInterview/${id}`,options)
			  	.subscribe((responce)=>{
			  		console.log(responce)
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			          	observer.next(JSON.parse(responce["_body"]).result);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }

			    });

		})

   }



   public getInterview(id){

   		return  Observable.create((observer:Observer<any>)=>{

   		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers, withCredentials: true});

		    	this.http.get(`${this.domain}/api/getInterview/${id}`,options)
			  	.subscribe((responce)=>{
			  		console.log(responce)
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		
			         if(isSucces){
			          	observer.next(JSON.parse(responce["_body"]).result);
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]).err);
			       }

			    });

		})

   }


   public sendInterviewResult(masResult){

   
   	return Observable.create((observer:Observer<any>)=>{
   		let body = JSON.stringify(masResult);

			    let headers = new Headers({ 'Content-Type': 'application/json' });
			    let options = new RequestOptions({ headers: headers, withCredentials: true});
			  	this.http.post(`${this.domain}/api/setInterviewResult`,body,options)
			  	.subscribe((responce)=>{
			  		let isSucces = JSON.parse(responce["_body"]).isSucces;
			  		console.log(responce)

			         if(isSucces){
			         	//this.authStream.next(JSON.parse(responce["_body"]));
			          	observer.next(JSON.parse(responce["_body"]));
			        }
			         if(!isSucces){
			         	observer.error(JSON.parse(responce["_body"]));
			       }

			    });
   	})
   }











}
