import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { httpConnection } from './tokens';
import { HttpConnectionService } from './http-connection.service';

@Injectable()
export class CookieServiceCustom {


  private timeCookie = new Date(new Date().getTime() + (((60 * 1000)*60) * 24) * 365 ); // 1 year
  public isInit:boolean = false;

  constructor(private _cookieService:CookieService, @Inject(httpConnection) private _http:HttpConnectionService) { 
    this.refreshStatus();

    this._http.authStream.subscribe((status:boolean)=>{
      let s = status ? 'y' : 'n';
      this.setAuthStatus(s);
      this.refreshStatus();
    })
  }

  public setAuthStatus(status:string){
    this._cookieService.put('auth', status, {expires: this.timeCookie});
  }
  public getAuthStatus(){
    return this._cookieService.get('auth') == 'y';
  }

  public setAdminStatus(status:string){
    this._cookieService.put('admin', status,  {expires: this.timeCookie});
  }
  public getAdminStatus(){
    return  this._cookieService.get('admin') == 'y';
  }

  public setVerifStatus(status:string){
    this._cookieService.put('verif', status,  {expires: this.timeCookie});
  }
  public getVerifStatus(){
   return this._cookieService.get('verif') == 'y';
  }

  public refreshStatus(){
       this._http.getProfileInfo().subscribe((res)=>{
            this.isInit = true;
            let isWorker = res.user.isWorker ? 'y' : 'n',
                isAdmin = res.user.isAdmin ? 'y' : 'n';

            this.setAuthStatus('y');
            this.setVerifStatus(isWorker);
            this.setAdminStatus(isAdmin);   
    },(err)=>{
            this.isInit = true;
            this.setAuthStatus('n');
            this.setAdminStatus('n');
    });
  }
}
