import { Component, OnInit, Inject } from '@angular/core';
import { httpConnection } from '../tokens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verific-banner',
  templateUrl: './verific-banner.component.html',
  styleUrls: ['./verific-banner.component.css']
})
export class VerificBannerComponent implements OnInit {

  constructor(@Inject(httpConnection) private _http, private _router:Router) {

    this._http.isAuthUser().filter(isAuth=>isAuth).subscribe(isAuth=>{
      this._router.navigate(['news']);
    })
   }

  ngOnInit() {
  }

}
