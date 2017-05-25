import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { httpConnection } from './tokens';
import { HttpConnectionService } from './http-connection.service';

@Injectable()
export class CookieServiceCustom {


  private timeCookie = new Date(new Date().getTime() + (((60 * 1000)*60) * 24) * 365 ); // 1 year
  public isInit:boolean = false;

  constructor(private _cookieService:CookieService, @Inject(httpConnection) private _http:HttpConnectionService) { 
    debugger
    this.refreshStatus();

    this._http.authStream.subscribe((status:boolean)=>{
      this.refreshStatus();
    })
  }

  public setAuthStatus(status:string){
    this._cookieService.put('auth', status, {expires: this.timeCookie});
  }
  public getAuthStatus(){
    console.log(this._cookieService.get('auth'))
    debugger
    return this._cookieService.get('auth') == 'y';
  }

  public setAdminStatus(status:string){
    this._cookieService.put('admin', status,  {expires: this.timeCookie});
  }
  public getAdminStatus(){
     console.log(this._cookieService.get('auth'))
    debugger
    return  this._cookieService.get('admin') == 'y';
  }

  public setVerifStatus(status:string){
    this._cookieService.put('verif', status,  {expires: this.timeCookie});
  }
  public getVerifStatus(){
     console.log(this._cookieService.get('auth'))
    debugger
   return this._cookieService.get('verif') == 'y';
  }

  public refreshStatus(){
       this._http.getProfileInfo().subscribe((res)=>{
          this.isInit = true;
          if(res.user){
            let isWorker = res.user.isWorker ? 'y' : 'n',
                isAdmin = res.user.isAdmin ? 'y' : 'n';

            this.setAuthStatus('y');
            this.setVerifStatus(isWorker);
            this.setAdminStatus(isAdmin);
          }
          else{
            this.setAuthStatus('n');
            this.setVerifStatus('n');
            this.setAdminStatus('n');
          }
     
    });
  }
}
