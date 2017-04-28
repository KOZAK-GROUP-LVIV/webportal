webpackJsonp([1,4],{

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return httpConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return socketConnection; });

var httpConnection = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* OpaqueToken */]('httpConnection');
var socketConnection = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* OpaqueToken */]('socketConnection');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 351;


/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(476);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(540),
            styles: [__webpack_require__(534)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tokens__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__http_connection_service__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__socket_connection_service__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat_list_chat_list_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__chat_messages_list_chat_messages_list_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__entry_entry_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_cookie_law__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__nav_nav_component__ = __webpack_require__(474);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var routers = [
    { path: 'entry/:mode', component: __WEBPACK_IMPORTED_MODULE_11__entry_entry_component__["a" /* EntryComponent */] },
    { path: 'chat', component: __WEBPACK_IMPORTED_MODULE_9__chat_list_chat_list_component__["a" /* ChatListComponent */] },
    { path: 'chat/:id', component: __WEBPACK_IMPORTED_MODULE_9__chat_list_chat_list_component__["a" /* ChatListComponent */] },
    { path: '**', redirectTo: 'entry/login' }];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__chat_list_chat_list_component__["a" /* ChatListComponent */],
                __WEBPACK_IMPORTED_MODULE_10__chat_messages_list_chat_messages_list_component__["a" /* ChatMessagesListComponent */],
                __WEBPACK_IMPORTED_MODULE_11__entry_entry_component__["a" /* EntryComponent */],
                __WEBPACK_IMPORTED_MODULE_13__nav_nav_component__["a" /* NavComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12_angular2_cookie_law__["a" /* CookieLawModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(routers)
            ],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_5__tokens__["a" /* httpConnection */], useClass: __WEBPACK_IMPORTED_MODULE_6__http_connection_service__["a" /* HttpConnectionService */] },
                { provide: __WEBPACK_IMPORTED_MODULE_5__tokens__["b" /* socketConnection */], useClass: __WEBPACK_IMPORTED_MODULE_7__socket_connection_service__["a" /* SocketConnectionService */] }],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tokens__ = __webpack_require__(132);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ChatListComponent = (function () {
    function ChatListComponent(_socket) {
        this._socket = _socket;
        this.getFriendList();
    }
    ChatListComponent.prototype.getFriendList = function () {
        var _this = this;
        this._socket.getFriendsList().subscribe(function (friends) {
            _this.friendList = friends;
        });
    };
    ChatListComponent.prototype.checkFriend = function (user) {
        this.msgList.currId = user.id;
        this.msgList.getHistory(user.id);
        this.msgList.currUser = user;
        this.currFriend = user;
    };
    ChatListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])('msgList'), 
        __metadata('design:type', Object)
    ], ChatListComponent.prototype, "msgList", void 0);
    ChatListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-chat-list',
            template: __webpack_require__(541),
            styles: [__webpack_require__(535)]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__tokens__["b" /* socketConnection */])), 
        __metadata('design:paramtypes', [Object])
    ], ChatListComponent);
    return ChatListComponent;
}());
//# sourceMappingURL=chat-list.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessagesListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChatMessagesListComponent = (function () {
    function ChatMessagesListComponent() {
    }
    ChatMessagesListComponent.prototype.ngOnInit = function () {
    };
    ChatMessagesListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-chat-messages-list',
            template: __webpack_require__(542),
            styles: [__webpack_require__(536)]
        }), 
        __metadata('design:paramtypes', [])
    ], ChatMessagesListComponent);
    return ChatMessagesListComponent;
}());
//# sourceMappingURL=chat-messages-list.component.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tokens__ = __webpack_require__(132);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var EntryComponent = (function () {
    function EntryComponent(_fb, _http, _socket, _actRoute, _roter) {
        var _this = this;
        this._fb = _fb;
        this._http = _http;
        this._socket = _socket;
        this._actRoute = _actRoute;
        this._roter = _roter;
        this.currForm = 'singin';
        this.validForm = true;
        this.submitedInvalidForm = false;
        this.entryForm = this._fb.group({
            'login': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(15)])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(7), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(15)])],
            'first_name': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(15)])],
            'last_name': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(15)])]
        });
        this._actRoute.params.subscribe(function (mode) {
            _this.currForm = mode.mode || 'login';
            _this._roter.navigate(['/entry', _this.currForm]);
        });
    }
    EntryComponent.prototype.login = function (form) {
        var _this = this;
        this.submitedInvalidForm = !form.valid;
        if (form.valid) {
            console.log(this._http);
            debugger;
            this._http.login(form.value).subscribe(function () {
                _this._roter.navigate(['/chat']);
            }, function () {
                _this._roter.navigate(['/entry', 'login']);
            });
        }
        console.log(form.value);
    };
    EntryComponent.prototype.singin = function (form) {
        var _this = this;
        this.submitedInvalidForm = !form.valid;
        if (form.valid) {
            this._http.singin(form.value).subscribe(function () {
                _this._roter.navigate(['/entry', 'login']);
            }, function (err) {
                _this._roter.navigate(['/entry', 'singin']);
            });
        }
    };
    EntryComponent.prototype.ngOnInit = function () {
    };
    EntryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-entry',
            template: __webpack_require__(543),
            styles: [__webpack_require__(537)]
        }),
        __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__tokens__["a" /* httpConnection */])),
        __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__tokens__["b" /* socketConnection */])), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */]) === 'function' && _a) || Object, Object, Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], EntryComponent);
    return EntryComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=entry.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_from__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_merge__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_fromEvent__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromPromise__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_mergeMap__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_mapTo__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_mapTo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_mapTo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMapTo__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMapTo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMapTo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_takeWhile__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_takeWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_takeWhile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_filter__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_do__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_catch__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpConnectionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var HttpConnectionService = (function () {
    function HttpConnectionService(http) {
        var _this = this;
        this.http = http;
        this.isAuth = false;
        this.authStream = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.getProfileInfo().subscribe(function (user) {
            _this.isAuth = true;
        }, function () {
            _this.isAuth = false;
        });
    }
    HttpConnectionService.prototype.singin = function (formData) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var body = JSON.stringify(formData);
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers, withCredentials: false });
            _this.http.post("http://localhost:3000/api/singin", body, options)
                .subscribe(function (responce) {
                var isSucces = JSON.parse(responce["_body"]).isSucces;
                console.log(responce);
                if (isSucces) {
                    observer.next(JSON.parse(responce["_body"]));
                }
                if (!isSucces) {
                    observer.error(JSON.parse(responce["_body"]));
                }
            });
        });
    };
    HttpConnectionService.prototype.login = function (formData) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var body = JSON.stringify({ username: formData.login, password: formData.password });
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers, withCredentials: true });
            _this.http.post("http://localhost:3000/api/login", body, options)
                .subscribe(function (responce) {
                var isSucces = JSON.parse(responce["_body"]).isSucces;
                console.log(responce);
                if (isSucces) {
                    _this.authStream.next(JSON.parse(responce["_body"]).user);
                    observer.next(JSON.parse(responce["_body"]));
                }
                if (!isSucces) {
                    observer.error(JSON.parse(responce["_body"]));
                }
            });
        });
    };
    HttpConnectionService.prototype.getProfileInfo = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers, withCredentials: true });
            _this.http.get("http://localhost:3000/api/getProfile", options)
                .subscribe(function (responce) {
                var isSucces = JSON.parse(responce["_body"]).isSucces;
                console.log(responce);
                if (isSucces) {
                    _this.authStream.next(JSON.parse(responce["_body"]).user);
                    observer.next(JSON.parse(responce["_body"]));
                }
                if (!isSucces) {
                    observer.error(JSON.parse(responce["_body"]));
                }
            });
        });
    };
    HttpConnectionService.prototype.logout = function () {
    };
    HttpConnectionService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object])
    ], HttpConnectionService);
    return HttpConnectionService;
    var _a;
}());
//# sourceMappingURL=http-connection.service.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tokens__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(194);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var NavComponent = (function () {
    function NavComponent(_http, _route) {
        var _this = this;
        this._http = _http;
        this._route = _route;
        this.isAuth = false;
        this._http.authStream.subscribe(function (user) {
            _this.user = user;
            _this.isAuth = true;
        });
    }
    NavComponent.prototype.logout = function () {
        var _this = this;
        this._http.logout().suscribe(function () {
            _this.isAuth = false;
            _this._route.navigate(['/entry', 'login']);
        }, function () {
        });
    };
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
            selector: 'app-nav',
            template: __webpack_require__(544),
            styles: [__webpack_require__(538)]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__tokens__["a" /* httpConnection */])), 
        __metadata('design:paramtypes', [Object, (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _a) || Object])
    ], NavComponent);
    return NavComponent;
    var _a;
}());
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_merge__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromEvent__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_mapTo__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_mapTo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_mapTo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMapTo__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMapTo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMapTo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_takeWhile__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_takeWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_takeWhile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_filter__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_do__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_catch__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketConnectionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var SocketConnectionService = (function () {
    function SocketConnectionService() {
        /*
        this.socket = io('//127.0.0.1:3000');
        this.socket.emit('auth', {login:'lemoonn1'});
        this.socket.on('connect', ()=>{
             this.socket.on('user', function(user){
            console.log(user);
        })
        this.socket.emit('getUser');
    
        })
    
       */
        this.friendsListExample = {
            friends: [{ first_name: 'Uriy', last_name: 'Grysuk', login: 'Ura123', _id: 123 },
                { first_name: 'Denya', last_name: 'Astahov', login: 'Denya123', _id: 1234 },
                { first_name: 'Dmitry', last_name: 'Dudik', login: 'Dmitry123', _id: 12345 }]
        };
        this.frientsHistoty = {
            123: [{}],
            1234: [{}],
            12345: [{}]
        };
    }
    SocketConnectionService.prototype.getFriendsList = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            observer.next(_this.friendsListExample.friends);
        });
    };
    SocketConnectionService.prototype.getFriendList = function (idUser) {
    };
    SocketConnectionService.prototype.getPersonHistory = function (idUser, pages) {
    };
    SocketConnectionService.prototype.sendMsg = function (dataActionMsg) {
    };
    SocketConnectionService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], SocketConnectionService);
    return SocketConnectionService;
}());
//# sourceMappingURL=socket-connection.service.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)();
// imports


// module
exports.push([module.i, ".content-wrap{\r\n\tpadding-top: 100px;\r\n\twidth: 100%;\r\n\t\t\r\n}\r\n\r\n\r\n.entry-form{\r\n\twidth: 100%;\r\n\tdisplay: block;\r\n}\r\n.entry-form__form{\r\n\tmargin: 0 auto;\r\n}\r\n.content-wrap__content{\r\n\tmargin: 0 auto;\r\n}\r\n\r\n.content-wrap__submit {\r\n\tcursor: pointer;\r\n\tmargin: 50px auto;\r\n}\r\n\r\n.width100{\r\n\twidth: 100%;\r\n}\r\n\r\n.btn{\r\n\tcursor: pointer;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)();
// imports


// module
exports.push([module.i, "/* nav */\r\n.nav {\r\n\tposition: relative;\r\n\tmargin: 20px 0;\r\n\twidth: 100%;\r\n}\r\n.nav ul {\r\n\tmargin: 0;\r\n\twidth: 100%;\r\n\tpadding: 0;\r\n\ttext-align: right;\r\n}\r\n.nav li {\r\n\tmargin: 0 5px 10px 0;\r\n\tpadding: 0;\r\n\tlist-style: none;\r\n\tdisplay: inline-block;\r\n}\r\n.nav a {\r\n\tpadding: 3px 12px;\r\n\ttext-decoration: none;\r\n\tcolor: #999;\r\n\tline-height: 100%;\r\n}\r\n.nav a:hover {\r\n\tcolor: #000;\r\n}\r\n.nav a.current  {\r\n\tbackground: #999;\r\n\tcolor: #fff;\r\n\tborder-radius: 5px;\r\n}\r\n/* right nav */\r\n.nav.right ul {\r\n\ttext-align: right;\r\n}\r\n\r\n/* center nav */\r\n.nav.center ul {\r\n\ttext-align: center;\r\n}\r\n@media screen and (max-width: 600px) {\r\n\t.nav {\r\n\t\tposition: relative;\r\n\t\tmin-height: 40px;\r\n\t}\t\r\n\t.nav ul {\r\n\t\twidth: 180px;\r\n\t\tpadding: 5px 0;\r\n\t\tposition: absolute;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\tborder: solid 1px #aaa;\r\n\t\tborder-radius: 5px;\r\n\t\tbox-shadow: 0 1px 2px rgba(0,0,0,.3);\r\n\t}\r\n\t.nav li {\r\n\t\tdisplay: none; /* hide all <li> items */\r\n\t\tmargin: 0;\r\n\t}\r\n\t.nav .current {\r\n\t\tdisplay: block; /* show only current <li> item */\r\n\t}\r\n\t.nav a {\r\n\t\tdisplay: block;\r\n\t\tpadding: 5px 5px 5px 32px;\r\n\t\ttext-align: left;\r\n\t}\r\n\t.nav .current a {\r\n\t\tbackground: none;\r\n\t\tcolor: #666;\r\n\t}\r\n\r\n\t/* on nav hover */\r\n\t.nav ul:hover {\r\n\t\tbackground-image: none;\r\n\t}\r\n\t.nav ul:hover li {\r\n\t\tdisplay: block;\r\n\t\tmargin: 0 0 5px;\r\n\t}\r\n\r\n\t/* right nav */\r\n\t.nav.right ul {\r\n\t\tleft: auto;\r\n\t\tright: 0;\r\n\t}\r\n\r\n\t/* center nav */\r\n\t.nav.center ul {\r\n\t\tleft: 50%;\r\n\t\tmargin-left: -90px;\r\n\t}\r\n\t\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 540:
/***/ (function(module, exports) {

module.exports = "<section class=\"content-wrap\">\n\t\t<div class=\"content-wrap__nav\"><app-nav> </app-nav></div>\n\t\t<div class=\"content-wrap__content\">\n<router-outlet> </router-outlet></div>\n</section>\n\n"

/***/ }),

/***/ 541:
/***/ (function(module, exports) {

module.exports = "\n    <div class=\"container chat-contain clearfix\">\n    <div class=\"people-list\" id=\"people-list\">\n      <div class=\"search\">\n        <input type=\"text\" placeholder=\"search\">\n        <i class=\"fa fa-search\"></i>\n      </div>\n      <ul class=\"list\">\n      <li *ngFor=\"let friend of friendList\" class=\"clearfix\">\n          <img src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg\" alt=\"avatar\">\n          <div class=\"about\">\n            <div class=\"name\">{{friend?.first_name}} {{friend?.first_name }}</div>\n            <div class=\"status\">\n              <i class=\"fa fa-circle offline\"></i> offline since Oct 28\n            </div>\n          </div>\n        </li></ul>\n    </div>\n    <app-chat-messages-list #msgList> </app-chat-messages-list>\n    \n  </div>"

/***/ }),

/***/ 542:
/***/ (function(module, exports) {

module.exports = "    <div class=\"chat\">\n      <div class=\"chat-header clearfix\">\n        <img src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg\" alt=\"avatar\">\n        \n        <div class=\"chat-about\">\n          <div class=\"chat-with\">Chat with Vincent Porter</div>\n          <div class=\"chat-num-messages\">already 1 902 messages</div>\n        </div>\n        <i class=\"fa fa-star\"></i>\n      </div> <!-- end chat-header -->\n      \n      <div class=\"chat-history\">\n        <ul>\n          <li class=\"clearfix\">\n            <div class=\"message-data align-right\">\n              <span class=\"message-data-time\">10:10 AM, Today</span> &nbsp; &nbsp;\n              <span class=\"message-data-name\">Olia</span> <i class=\"fa fa-circle me\"></i>\n              \n            </div>\n            <div class=\"message other-message float-right\">\n              Hi Vincent, how are you? How is the project coming along?\n            </div>\n          </li>\n          \n          <li>\n            <div class=\"message-data\">\n              <span class=\"message-data-name\"><i class=\"fa fa-circle online\"></i> Vincent</span>\n              <span class=\"message-data-time\">10:12 AM, Today</span>\n            </div>\n            <div class=\"message my-message\">\n              Are we meeting today? Project has been already finished and I have results to show you.\n            </div>\n          </li>\n          \n          <li class=\"clearfix\">\n            <div class=\"message-data align-right\">\n              <span class=\"message-data-time\">10:14 AM, Today</span> &nbsp; &nbsp;\n              <span class=\"message-data-name\">Olia</span> <i class=\"fa fa-circle me\"></i>\n              \n            </div>\n            <div class=\"message other-message float-right\">\n              Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?\n            </div>\n          </li>\n          \n          <li>\n            <div class=\"message-data\">\n              <span class=\"message-data-name\"><i class=\"fa fa-circle online\"></i> Vincent</span>\n              <span class=\"message-data-time\">10:20 AM, Today</span>\n            </div>\n            <div class=\"message my-message\">\n              Actually everything was fine. I'm very excited to show this to our team.\n            </div>\n          </li>\n          \n          <li>\n            <div class=\"message-data\">\n              <span class=\"message-data-name\"><i class=\"fa fa-circle online\"></i> Vincent</span>\n              <span class=\"message-data-time\">10:31 AM, Today</span>\n            </div>\n            <i class=\"fa fa-circle online\"></i>\n            <i class=\"fa fa-circle online\" style=\"color: #AED2A6\"></i>\n            <i class=\"fa fa-circle online\" style=\"color:#DAE9DA\"></i>\n          </li>\n          \n        </ul>\n        \n      </div> <!-- end chat-history -->\n      \n      <div class=\"chat-message clearfix\">\n        <textarea name=\"message-to-send\" id=\"message-to-send\" placeholder=\"Type your message\" rows=\"3\"></textarea>\n                \n        <i class=\"fa fa-file-o\"></i> &nbsp;&nbsp;&nbsp;\n        <i class=\"fa fa-file-image-o\"></i>\n        \n        <button>Send</button>\n\n      </div> <!-- end chat-message -->\n      \n    </div> <!-- end chat -->"

/***/ }),

/***/ 543:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrap\">\n\t\n\t<div class=\"content-wrap__content container row\">\n\t\t<form *ngIf=\"currForm=='login'\" action=\"\" class=\"entry-form row\" [formGroup]=\"entryForm\" (submit)=\"login(entryForm)\">\n\t\t<div [ngClass]=\"{'has-success':\n\t\t!submitedInvalidForm&&entryForm.controls['login'].valid&&entryForm.controls['login'].touched&&\n\t\tentryForm.controls['login'].value.length>0}\" class=\"form-group entry-form__form col-lg-5\">\n\t\t  Введите логин\n\t\t  <br>\n\t\t<!--  <label class=\"form-control-label\" for=\"inputSuccess1\">Имя уникально</label> -->\n\t\t  <input type=\"text\" placeholder=\"Login\" class=\"form-control form-control-success\" id=\"inputSuccess1\"\n\t\t  formControlName=\"login\">\n\t\t  <div class=\"form-control-feedback\" *ngIf=\"entryForm.controls['login'].valid&&entryForm.controls['login'].touched&&entryForm.controls['login'].value.length>0\"  class=\"form-control-feedback\" class=\"form-control-feedback\">Отлично!</div>\n\t\t</div>\n\n\t\t<div [ngClass]=\"{'has-success':\n\t\t!submitedInvalidForm&&entryForm.controls['password'].valid&&entryForm.controls['password'].touched&&\n\t\tentryForm.controls['password'].value.length>0}\" class=\"form-group entry-form__form col-lg-5\">\n\t\t  Введите пароль\n\t\t  <br>\n\t\t  <input type=\"password\" placeholder=\"password\" class=\"form-control form-control-success\" id=\"inputSuccess1\"\n\t\t  formControlName=\"password\">\n\t\t  <div *ngIf=\"entryForm.controls['password'].valid&&entryForm.controls['password'].touched&&entryForm.controls['password'].value.length>0\" class=\"form-control-feedback\">Отлично!</div>\n\t\t</div>\n\n\t\t<div class=\"content-wrap__submit col-lg-2\">\n\t\t<button type=\"submit\" class=\"btn width100 btn-success\">Войти</button></div>\n\t\t</form>\n\n\n\t\t<form *ngIf=\"currForm=='singin'\" action=\"\" class=\"entry-form row\" [formGroup]=\"entryForm\" (submit)=\"singin(entryForm)\">\n\t\t<div [ngClass]=\"{'has-success':\n\t\t!submitedInvalidForm&&entryForm.controls['first_name'].valid&&entryForm.controls['first_name'].touched&&\n\t\tentryForm.controls['first_name'].value.length>0}\" \n\t\tclass=\"form-group entry-form__form col-lg-5\">\n\t\t  Введите Имя\n\t\t  <br>\n\t\t<!--  <label class=\"form-control-label\" for=\"inputSuccess1\">Имя уникально</label> -->\n\t\t  <input type=\"text\" placeholder=\"Иван\" class=\"form-control form-control-success\" id=\"inputSuccess1\"\n\t\t  formControlName=\"first_name\">\n\t\t  <div *ngIf=\"entryForm.controls['first_name'].valid&&entryForm.controls['first_name'].touched&&entryForm.controls['first_name'].value.length>0\"  class=\"form-control-feedback\">Отлично!</div>\n\t\t</div>\n\n\t\t\t<div [ngClass]=\"{'has-success':\n\t\t!submitedInvalidForm&&entryForm.controls['last_name'].valid&&entryForm.controls['last_name'].touched&&\n\t\tentryForm.controls['last_name'].value.length>0}\" class=\"form-group entry-form__form col-lg-5\">\n\t\t  Введите Фамилию\n\t\t  <br>\n\t\t<!--  <label class=\"form-control-label\" for=\"inputSuccess1\">Имя уникально</label> -->\n\t\t  <input type=\"text\" placeholder=\"Иванов\" class=\"form-control form-control-success\" id=\"inputSuccess1\"\n\t\t  formControlName=\"last_name\">\n\t\t   <div *ngIf=\"entryForm.controls['last_name'].valid&&entryForm.controls['last_name'].touched&&entryForm.controls['last_name'].value.length>0\"  class=\"form-control-feedback\">Отлично!</div>\n\t\t</div>\n\n\n\t\t<div [ngClass]=\"{'has-success':\n\t\t!submitedInvalidForm&&entryForm.controls['login'].valid&&entryForm.controls['login'].touched&&\n\t\tentryForm.controls['login'].value.length>0}\" class=\"form-group entry-form__form col-lg-5\">\n\t\t  Введите логин\n\t\t  <br>\n\t\t<!--  <label class=\"form-control-label\" for=\"inputSuccess1\">Имя уникально</label> -->\n\t\t  <input type=\"text\" placeholder=\"ivanLogin\" class=\"form-control form-control-success\" id=\"inputSuccess1\"\n\t\t  formControlName=\"login\">\n\t\t  <div *ngIf=\"entryForm.controls['login'].valid&&entryForm.controls['login'].touched&&entryForm.controls['login'].value.length>0\"  class=\"form-control-feedback\" class=\"form-control-feedback\">Отлично!</div>\n\t\t  <small class=\"form-text text-muted\">Данное имя будет использовано как личная подпись.</small>\n\t\t</div>\n\n\t\t<div [ngClass]=\"{'has-success':\n\t\t!submitedInvalidForm&&entryForm.controls['password'].valid&&entryForm.controls['password'].touched&&\n\t\tentryForm.controls['password'].value.length>0}\" class=\"form-group entry-form__form col-lg-5\">\n\t\t  Введите пароль\n\t\t  <br>\n\t\t  <input type=\"password\" placeholder=\"password\" class=\"form-control form-control-success\" id=\"inputSuccess1\"\n\t\t  formControlName=\"password\">\n\t\t  <div *ngIf=\"entryForm.controls['password'].valid&&entryForm.controls['password'].touched&&entryForm.controls['password'].value.length>0\"  class=\"form-control-feedback\" class=\"form-control-feedback\">Отлично!</div>\n\t\t</div>\n\n\t\t<div class=\"content-wrap__submit col-lg-2\">\n\t\t<button type=\"submit\" class=\"btn width100 btn-success\">Регистрировать</button></div>\n\t\t</form>\n\t</div>\n\n</div>\n"

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = "\n<nav class=\"nav\">\n\t<ul>\n\t\t<li *ngIf=\"!isAuth\" ><a routerLink=\"/entry/login\" routerLinkActive=\"current\">Войти</a></li>\n\t\t<li *ngIf=\"isAuth\" ><a (click)=\"logout()\">Выйти</a></li>\n\t\t<li><a routerLink=\"/entry/singin\" routerLinkActive=\"current\">Регистрироваться</a></li>\n\t</ul>\n</nav>"

/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(352);


/***/ })

},[568]);
//# sourceMappingURL=main.bundle.js.map