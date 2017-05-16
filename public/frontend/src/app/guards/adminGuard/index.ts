import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { httpConnection } from '../../tokens'

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
export class AdminGuard implements CanActivate {

    constructor(private router: Router, @Inject(httpConnection) private _http) {

     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer:Observer<any>)=>{
        	this._http.isAdminUser().subscribe(res=>{
        		if(res){
        			observer.next(res)
        		}
        		else{
        			this.router.navigate(['chat']);
        			observer.next(res);

        		}
        	})
        })
    }
}