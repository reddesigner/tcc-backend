(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_controllers/auth/interceptor/auth.interceptor.ts":
/*!*******************************************************************!*\
  !*** ./src/app/_controllers/auth/interceptor/auth.interceptor.ts ***!
  \*******************************************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/auth.service */ "./src/app/_controllers/auth/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(auth) {
        this.auth = auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var started = Date.now();
        var ok;
        //const serverUrl = 'http://localhost:3000/';
        //const serverUrl = 'http://localhost:4200/';
        var serverUrl = 'http://ec2-18-228-31-157.sa-east-1.compute.amazonaws.com:4200/';
        request = request.clone({
            setHeaders: {
                'observe': 'response',
                'content-type': 'application/json',
                'authorization': "Bearer " + this.auth.getToken(),
                'x-access-token': "" + this.auth.getToken()
            },
            url: serverUrl + request.url,
        });
        /*
        'Content-Type': 'application/json'
        'Content-Type': 'x-www-form-urlencoded'
        'Content-Type': 'form-data'
        if POST change to: application/x-www-form-urlencoded
        };*/
        // return next.handle(request);
        return next.handle(request)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(
        // Succeeds when there is a response; ignore other events
        function (event) {
            ok = event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"] ? 'sucesso' : '';
            //console.log('auth.interceptor.ts ----- evento sucesso ', event);
            if (event['headers']) {
                //console.log('------------------------ --------------------- --------------------');
                //console.log('auth.interceptor.ts -----', event['headers'].getAll('X-Powered-By'));
                //console.log('auth.interceptor.ts -----', event['headers'].getAll('x-permissions'));
                //console.log('auth.interceptor.ts -----', event['headers'].getAll('x-refresh'));
                //console.log('------------------------ --------------------- --------------------');
                // envia as permissões para serviço de autenticação
                if (event['headers'].get('x-permissions'))
                    _this.auth.setPermissions(event['headers'].get('x-permissions'));
                if (event['headers'].get('x-refresh'))
                    _this.auth.setToken(event['headers'].get('x-refresh'));
            }
        }, 
        // Operation failed; error is an HttpErrorResponse
        function (error) {
            ok = 'falhou';
            console.error('auth.interceptor.ts ----- evento error', error); // se der erro, tipo 400, passa aqui com a msg... ler msg e decidir o que fazer...
            if (error.message && error.message == 'Http failure response for (unknown url): 0 Unknown Error') {
                //
                error.error.message = "Erro desconhecido";
                error.error.type = "error";
                //console.error('auth.interceptor.ts ----- erro desconhecido... servidor inativo?...');
            }
            if (error.body && error.body.action == 'logout') {
                // do logout
                //console.error('auth.interceptor.ts ----- servidor manda ação customizada de logout');
            }
            if (error.error && error.error.type == 'error') {
                //console.error('auth.interceptor.ts ----- Mensagem do servidor: ' + error.error.message);
            }
        }), 
        // Log when response observable either completes or errors
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
            var elapsed = Date.now() - started;
            var msg = request.method + " \"" + request.urlWithParams + "\" " + ok + " em " + elapsed + " ms.";
            //console.log('auth.interceptor.ts ----- HTTP Response: ' + msg + ' | objeto Request:', request);
        }));
    };
    TokenInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/_controllers/auth/service/auth-guard.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/_controllers/auth/service/auth-guard.service.ts ***!
  \*****************************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/_controllers/auth/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        //console.log('authGuard.service --- método canActivate');
        var url = state.url;
        return this.checkLogIn(url);
    };
    AuthGuardService.prototype.checkLogIn = function (url) {
        if (this.auth.isAuthenticated()) {
            //console.log('authGuard.service ----- está autenticado | tem permissão em:', this.auth.getPermissionForRoute(url));
            // checar se tem a permissão...
            if (this.auth.getPermissionForRoute(url))
                return true;
            else
                return false;
        }
        // Store the attempted URL for redirecting
        this.auth.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return true;
    };
    AuthGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/_controllers/auth/service/auth.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/_controllers/auth/service/auth.service.ts ***!
  \***********************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _message_service_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { decode } from 'jwt-decode';
// jwt-code de angular2-jwt (instalado com npm) não funcionou!
var AuthService = /** @class */ (function () {
    function AuthService(http, messageService, router) {
        this.http = http;
        this.messageService = messageService;
        this.router = router;
        this.currentUser = [];
        this.permissionList = [];
        this.authUrl = 'api/autenticar';
    }
    // descodifica o token (JWT)
    AuthService.prototype.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
    ;
    // verifica a data EXP do token com data local atual
    AuthService.prototype.isExpired = function (token) {
        // TODO este modelo está comparando data do servidor com data local... 
        // deve haver um jeito melhor... creio que é preciso grava a data de quando o token é recebido...
        //console.log('auth.service.ts --------------------------', token.exp);
        if (new Date().getTime() > (token.exp * 1000)) {
            //console.log('auth.service.ts -----------------------------------------> token expirado!', new Date().getTime() - (token.exp * 1000));
            return true;
        }
        else {
            //console.log(token);
            //console.log('auth.service.ts -----------------------------------------> token válido ainda...', new Date().getTime() - (token.exp * 1000));
            //console.log(new Date().getTime());
            //console.log(token.exp * 1000);
            return false;
        }
    };
    ;
    AuthService.prototype.getToken = function () {
        var _this = this;
        var tk;
        if (this.currenToken)
            tk = this.currenToken;
        else
            tk = localStorage.getItem('x-token');
        //
        if (tk) {
            //console.log('auth.service.ts ----- o token, recuperado do local storage, decodificado', this.parseJwt(tk));
            var parse = this.parseJwt(tk);
            if (this.isExpired(parse)) {
                this.logout();
                return '';
            }
            this.currentUser['name'] = parse.name;
            this.currentUser['email'] = parse.email;
            this.currentUser['role'] = parse.role;
            this.currenToken = tk;
            //
            //
            this.timer = setInterval(function (tm) {
                if (_this.currenToken) {
                    if (_this.isExpired(_this.parseJwt(_this.currenToken))) {
                        //console.log('token expirado.......');
                        clearInterval(_this.timer);
                        _this.logout();
                        _this.router.navigate(['/login']);
                        _this.messageService.info('Usuário desligado por inatividade', false);
                    }
                    //console.log('token NÃO expirado.......');
                }
            }, 1000 * 60 * 5 // 5 min
            );
            //
            //
            return tk;
        }
        else {
            return '';
        }
        //return  tk ? tk : '';
    };
    AuthService.prototype.setToken = function (token) {
        localStorage.setItem('x-token', token);
        this.currenToken = token;
    };
    AuthService.prototype.isAuthenticated = function () {
        var tk = this.getToken();
        //console.log('auth.service.ts ----- isAuthenticaed() tk é ', tk);
        // TODO verificar se token está expirado
        return tk ? true : false;
    };
    AuthService.prototype.setPermissions = function (list) {
        localStorage.setItem('x-permissions', list);
        if (list)
            this.permissionList = list.split(',');
    };
    AuthService.prototype.getPermissionForRoute = function (url) {
        if (this.permissionList.length == 0) {
            this.permissionList = localStorage.getItem('x-permissions').split(',');
        }
        var ret = this.permissionList.find(function (el) {
            // procura a url a que será navegada na lista de permissões
            var t = (url.indexOf(el) == 0 || url.indexOf(el + '/') == 0);
            return t;
        });
        //console.log('auth.service.js ----- getPermissions() return é '+ret+' ------>', this.permissionList);
        //console.log('auth.service.js ----- teste 1', this.permissionList.indexOf('/projeto'));
        return ret;
    };
    AuthService.prototype.login = function (model) {
        var _this = this;
        var pair = model;
        //return this.http.post(this.authUrl, model);
        return this.http.post(this.authUrl, pair).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (obj) {
            //console.log('auth.service.ts ----- to aqui no login', obj);
            //this.isLoggedIn = true;
            var tk = obj['x-access-token'];
            _this.setToken(tk);
            _this.currentUser['name'] = obj['x-user-name'];
            _this.currentUser['email'] = obj['x-user-email'];
            _this.currentUser['role'] = obj['x-user-role'];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('login')));
    };
    AuthService.prototype.logout = function () {
        //this.isLoggedIn = false;
        //console.log('auth.service.ts ----- logout');
        localStorage.removeItem('x-token');
        localStorage.removeItem('x-permissions');
        this.permissionList = [];
        this.currentUser = [];
        this.currenToken = '';
    };
    AuthService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'Operação'; }
        return function (error) {
            console.error('handleError em auth.service', error);
            if (error.error)
                _this.messageService.error(error.error.message, true);
            else
                _this.messageService.error('Erro indefinido. [aut.serv.' + operation + ']', true);
            // retorna um resultado vazio para app continuar rodando
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _message_service_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/_controllers/message/component/message.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/_controllers/message/component/message.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/_controllers/message/component/message.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/_controllers/message/component/message.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!--\r\n<button type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"#msgModal\">\r\n  modal msg test\r\n</button>\r\n<div class=\"modal fade\" id=\"msgModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"alert alert-success\" role=\"alert\" style=\"margin-bottom: 0\">\r\n        <div class=\"float-left\" style=\"margin-top: 1rem\">\r\n        <h4>Titulo da msg</h4>\r\n        <p>{{recievedMessage}}</p>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n-->\r\n\r\n<div *ngIf=\"recievedMessage.length > 0\" style=\"position: fixed; z-index: 9999; top: 50px; right: 50px; width: 360px;\">\r\n  <div *ngFor=\"let msg of recievedMessage\" [class]=\"cssClass(msg)\" alert-dismissable style=\"box-shadow: 0 0 30px rgba(0,0,0, .75); padding: 2rem 1.4rem 2.2rem 1.8rem;\">\r\n    <a class=\"close\" (click)=\"removeMessage(msg)\" style=\"margin-right: -14px; margin-top: -26px\">&times;</a>\r\n    <b>{{msg.message}}</b>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/_controllers/message/component/message.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/_controllers/message/component/message.component.ts ***!
  \*********************************************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
/* harmony import */ var _model_message_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/message.model */ "./src/app/_controllers/message/model/message.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageComponent = /** @class */ (function () {
    function MessageComponent(message) {
        this.message = message;
        this.recievedMessage = [];
    }
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.message.getMessage().subscribe(function (ms) {
            if (!ms) {
                _this.recievedMessage = [];
                return;
            }
            _this.recievedMessage.push(ms);
        });
    };
    MessageComponent.prototype.removeMessage = function (message) {
        this.recievedMessage = this.recievedMessage.filter(function (msg) { return msg !== message; });
    };
    MessageComponent.prototype.cssClass = function (message) {
        if (!message) {
            return;
        }
        // classe de alerta do bootstrap
        switch (message.type) {
            case _model_message_model__WEBPACK_IMPORTED_MODULE_2__["MessageType"].success:
                return 'alert alert-success';
            case _model_message_model__WEBPACK_IMPORTED_MODULE_2__["MessageType"].error:
                return 'alert alert-danger';
            case _model_message_model__WEBPACK_IMPORTED_MODULE_2__["MessageType"].info:
                return 'alert alert-info';
            case _model_message_model__WEBPACK_IMPORTED_MODULE_2__["MessageType"].warning:
                return 'alert alert-warning';
        }
    };
    MessageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-message',
            template: __webpack_require__(/*! ./message.component.html */ "./src/app/_controllers/message/component/message.component.html"),
            styles: [__webpack_require__(/*! ./message.component.css */ "./src/app/_controllers/message/component/message.component.css")]
        }),
        __metadata("design:paramtypes", [_service_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
    ], MessageComponent);
    return MessageComponent;
}());



/***/ }),

/***/ "./src/app/_controllers/message/model/message.model.ts":
/*!*************************************************************!*\
  !*** ./src/app/_controllers/message/model/message.model.ts ***!
  \*************************************************************/
/*! exports provided: Message, MessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());

var MessageType;
(function (MessageType) {
    MessageType[MessageType["success"] = 0] = "success";
    MessageType[MessageType["error"] = 1] = "error";
    MessageType[MessageType["info"] = 2] = "info";
    MessageType[MessageType["warning"] = 3] = "warning";
})(MessageType || (MessageType = {}));


/***/ }),

/***/ "./src/app/_controllers/message/service/message.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/_controllers/message/service/message.service.ts ***!
  \*****************************************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_message_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/message.model */ "./src/app/_controllers/message/model/message.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessageService = /** @class */ (function () {
    function MessageService(router) {
        var _this = this;
        this.router = router;
        this.messageList = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        /* BehaviorSubject foi inserido devido a erro no getMessage()
        https://stackoverflow.com/questions/41095801/subject-returning-undefined-in-constructor */
        this.keepAlive = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationStart"]) {
                if (_this.keepAlive) {
                    // only keep for a single route change
                    _this.keepAlive = false;
                }
                else {
                    // clear alert messages
                    _this.clearMessage();
                }
            }
        });
    }
    MessageService.prototype.getMessage = function () {
        return this.messageList.asObservable();
    };
    MessageService.prototype.clearMessage = function () {
        this.messageList.next();
    };
    // alertas
    MessageService.prototype.alert = function (message, type, keepAlive) {
        if (keepAlive === void 0) { keepAlive = false; }
        this.keepAlive = keepAlive;
        this.messageList.next({ message: message, type: type });
    };
    MessageService.prototype.success = function (message, keepAlive) {
        if (keepAlive === void 0) { keepAlive = false; }
        this.alert(message, _model_message_model__WEBPACK_IMPORTED_MODULE_3__["MessageType"].success, keepAlive);
    };
    MessageService.prototype.error = function (message, keepAlive) {
        if (keepAlive === void 0) { keepAlive = false; }
        this.alert(message, _model_message_model__WEBPACK_IMPORTED_MODULE_3__["MessageType"].error, keepAlive);
    };
    MessageService.prototype.warning = function (message, keepAlive) {
        if (keepAlive === void 0) { keepAlive = false; }
        this.alert(message, _model_message_model__WEBPACK_IMPORTED_MODULE_3__["MessageType"].warning, keepAlive);
    };
    MessageService.prototype.info = function (message, keepAlive) {
        if (keepAlive === void 0) { keepAlive = false; }
        this.alert(message, _model_message_model__WEBPACK_IMPORTED_MODULE_3__["MessageType"].info, keepAlive);
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/_models/indicador.model.ts":
/*!********************************************!*\
  !*** ./src/app/_models/indicador.model.ts ***!
  \********************************************/
/*! exports provided: Indicador */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Indicador", function() { return Indicador; });
var Indicador = /** @class */ (function () {
    function Indicador() {
    }
    return Indicador;
}());



/***/ }),

/***/ "./src/app/_models/permissao.model.ts":
/*!********************************************!*\
  !*** ./src/app/_models/permissao.model.ts ***!
  \********************************************/
/*! exports provided: Permissao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Permissao", function() { return Permissao; });
var Permissao = /** @class */ (function () {
    function Permissao() {
    }
    return Permissao;
}());



/***/ }),

/***/ "./src/app/_models/projeto.model.ts":
/*!******************************************!*\
  !*** ./src/app/_models/projeto.model.ts ***!
  \******************************************/
/*! exports provided: Projeto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projeto", function() { return Projeto; });
var Projeto = /** @class */ (function () {
    function Projeto() {
    }
    return Projeto;
}());



/***/ }),

/***/ "./src/app/_models/usuarios.model.ts":
/*!*******************************************!*\
  !*** ./src/app/_models/usuarios.model.ts ***!
  \*******************************************/
/*! exports provided: Usuario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Usuario", function() { return Usuario; });
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_controllers/auth/service/auth-guard.service */ "./src/app/_controllers/auth/service/auth-guard.service.ts");
/* harmony import */ var _autenticar_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autenticar/login.component */ "./src/app/autenticar/login.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ "./src/app/projeto-list/projeto-list.component.ts");
/* harmony import */ var _projeto_detail_projeto_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projeto-detail/projeto-detail.component */ "./src/app/projeto-detail/projeto-detail.component.ts");
/* harmony import */ var _projeto_create_projeto_create_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projeto-create/projeto-create.component */ "./src/app/projeto-create/projeto-create.component.ts");
/* harmony import */ var _projeto_edit_projeto_edit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./projeto-edit/projeto-edit.component */ "./src/app/projeto-edit/projeto-edit.component.ts");
/* harmony import */ var _projeto_indicador_projeto_indicador_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projeto-indicador/projeto-indicador.component */ "./src/app/projeto-indicador/projeto-indicador.component.ts");
/* harmony import */ var _projeto_indicador_fase_projeto_indicador_fase_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projeto-indicador-fase/projeto-indicador-fase.component */ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.ts");
/* harmony import */ var _projeto_equipe_projeto_equipe_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projeto-equipe/projeto-equipe.component */ "./src/app/projeto-equipe/projeto-equipe.component.ts");
/* harmony import */ var _projeto_status_projeto_status_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./projeto-status/projeto-status.component */ "./src/app/projeto-status/projeto-status.component.ts");
/* harmony import */ var _indicador_list_indicador_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./indicador-list/indicador-list.component */ "./src/app/indicador-list/indicador-list.component.ts");
/* harmony import */ var _indicador_create_indicador_create_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./indicador-create/indicador-create.component */ "./src/app/indicador-create/indicador-create.component.ts");
/* harmony import */ var _indicador_detail_indicador_detail_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./indicador-detail/indicador-detail.component */ "./src/app/indicador-detail/indicador-detail.component.ts");
/* harmony import */ var _indicador_edit_indicador_edit_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./indicador-edit/indicador-edit.component */ "./src/app/indicador-edit/indicador-edit.component.ts");
/* harmony import */ var _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./usuario-list/usuario-list.component */ "./src/app/usuario-list/usuario-list.component.ts");
/* harmony import */ var _usuario_create_usuario_create_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./usuario-create/usuario-create.component */ "./src/app/usuario-create/usuario-create.component.ts");
/* harmony import */ var _usuario_edit_usuario_edit_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./usuario-edit/usuario-edit.component */ "./src/app/usuario-edit/usuario-edit.component.ts");
/* harmony import */ var _usuario_detail_usuario_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./usuario-detail/usuario-detail.component */ "./src/app/usuario-detail/usuario-detail.component.ts");
/* harmony import */ var _permissao_list_permissao_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./permissao-list/permissao-list.component */ "./src/app/permissao-list/permissao-list.component.ts");
/* harmony import */ var _relatorio_list_relatorio_list_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./relatorio-list/relatorio-list.component */ "./src/app/relatorio-list/relatorio-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


 // guarda de rotas




















var routes = [
    { path: 'projeto', component: _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_5__["ProjetoListComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/create', component: _projeto_create_projeto_create_component__WEBPACK_IMPORTED_MODULE_7__["ProjetoCreateComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/detail/:id', component: _projeto_detail_projeto_detail_component__WEBPACK_IMPORTED_MODULE_6__["ProjetoDetailComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/edit/:id', component: _projeto_edit_projeto_edit_component__WEBPACK_IMPORTED_MODULE_8__["ProjetoEditComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/indicador/:id', component: _projeto_indicador_projeto_indicador_component__WEBPACK_IMPORTED_MODULE_9__["ProjetoIndicadorComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/indicador-fase/:id', component: _projeto_indicador_fase_projeto_indicador_fase_component__WEBPACK_IMPORTED_MODULE_10__["ProjetoIndicadorFaseComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/equipe/:id', component: _projeto_equipe_projeto_equipe_component__WEBPACK_IMPORTED_MODULE_11__["ProjetoEquipeComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'projeto/status/:id', component: _projeto_status_projeto_status_component__WEBPACK_IMPORTED_MODULE_12__["ProjetoStatusComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'usuario', component: _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_17__["UsuarioListComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'usuario/create', component: _usuario_create_usuario_create_component__WEBPACK_IMPORTED_MODULE_18__["UsuarioCreateComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'usuario/detail/:id', component: _usuario_detail_usuario_detail_component__WEBPACK_IMPORTED_MODULE_20__["UsuarioDetailComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'usuario/edit/:id', component: _usuario_edit_usuario_edit_component__WEBPACK_IMPORTED_MODULE_19__["UsuarioEditComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'indicador', component: _indicador_list_indicador_list_component__WEBPACK_IMPORTED_MODULE_13__["IndicadorListComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'indicador/create', component: _indicador_create_indicador_create_component__WEBPACK_IMPORTED_MODULE_14__["IndicadorCreateComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'indicador/detail/:id', component: _indicador_detail_indicador_detail_component__WEBPACK_IMPORTED_MODULE_15__["IndicadorDetailComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'indicador/edit/:id', component: _indicador_edit_indicador_edit_component__WEBPACK_IMPORTED_MODULE_16__["IndicadorEditComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'permissao', component: _permissao_list_permissao_list_component__WEBPACK_IMPORTED_MODULE_21__["PermissaoListComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'relatorio', component: _relatorio_list_relatorio_list_component__WEBPACK_IMPORTED_MODULE_22__["RelatorioListComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"], canActivate: [_controllers_auth_service_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]] },
    { path: 'login', component: _autenticar_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' } // não deveria ser uma página padrão tipo 404?
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                // CommonModule
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\"><!-- .bg-light -->\r\n  <a class=\"navbar-brand\" routerLink=\"/home\">Portfolio <span class=\"small\">de</span> Projetos</a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n    <ul class=\"navbar-nav mr-auto\">\r\n    <!--\r\n      <li class=\"nav-item active\">\r\n        <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" href=\"#\">Link</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link disabled\" href=\"#\">Disabled</a>\r\n      </li>\r\n    -->\r\n      <li class=\"nav-item dropdown\" *ngIf=\"auth.permissionList.indexOf('/projeto') >= 0\">\r\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          Projetos\r\n        </a>\r\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n          <a class=\"dropdown-item\" routerLink=\"/projeto/create\">Criar Projeto</a>\r\n        <!--\r\n          <a class=\"dropdown-item\" routerLink=\"/projeto/indicador\">Indicadores de Projetos</a>\r\n          <a class=\"dropdown-item\" routerLink=\"/projeto/indicador-fase\">Indicadores de Projetos por Fase</a>\r\n          <a class=\"dropdown-item\" routerLink=\"/projeto/equipe\">Equipes de Projetos</a>\r\n        -->\r\n          <div class=\"dropdown-divider\"></div>\r\n          <a class=\"dropdown-item\" routerLink=\"/projeto\">Listar todos projetos</a>\r\n        </div>\r\n      </li>\r\n      <li class=\"nav-item dropdown\" *ngIf=\"auth.permissionList.indexOf('/usuario') >= 0\">\r\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown2\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          Usuários\r\n        </a>\r\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown2\">\r\n          <a class=\"dropdown-item\" routerLink=\"/usuario/create\">Criar Usuário</a>\r\n          <div class=\"dropdown-divider\"></div>\r\n          <a class=\"dropdown-item\" routerLink=\"/usuario\">Listar todos usuários</a>\r\n        </div>\r\n      </li>\r\n      <li class=\"nav-item dropdown\" *ngIf=\"auth.permissionList.indexOf('/indicador') >= 0\">\r\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown3\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          Indicadores\r\n        </a>\r\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown3\">\r\n          <a class=\"dropdown-item\" routerLink=\"/indicador/create\">Criar Indicador</a>\r\n          <div class=\"dropdown-divider\"></div>\r\n          <a class=\"dropdown-item\" routerLink=\"/indicador\">Listar todos indicadores</a>\r\n        </div>\r\n      </li>\r\n      <li class=\"nav-item\" *ngIf=\"auth.permissionList.indexOf('/permissao') >= 0\">\r\n          <a class=\"nav-link\" routerLink=\"/permissao\">Permissões de Telas</a>\r\n        </li>\r\n      <li class=\"nav-item\" *ngIf=\"auth.permissionList.indexOf('/relatorio') >= 0\">\r\n        <a class=\"nav-link\" routerLink=\"/relatorio\">Relatório de Projetos</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"form-inline my-2 my-lg-0\" *ngIf=\"auth.currentUser.name\">\r\n      <!--\r\n      <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\r\n      <button class=\"btn btn-primary my-2 my-sm-0\" type=\"button\">Search</button> .bg-light \r\n      -->\r\n      <span style=\"color:#fff; line-height: 1.2\">\r\n      <span>{{ auth.currentUser['name'] }}</span><br>\r\n      <small>{{ auth.currentUser['email'] }} - {{ auth.currentUser['role'] }}</small>\r\n      </span>\r\n      <button class=\"btn btn-secondary my-2 my-sm-0 btn-sm ml-3\" type=\"button\" (click)=\"onLogOut()\">Sair</button> <!-- .bg-light -->\r\n    </div>\r\n\r\n  </div>\r\n</nav>\r\n<!--\r\n<p>Portifólio de Projetos</p>\r\n-->\r\n<br>\r\n<router-outlet></router-outlet>\r\n<footer class=\"bg-dark\">PP - Projeto Portfolio &reg;</footer>\r\n<app-message></app-message>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _controllers_auth_service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_controllers/auth/service/auth.service */ "./src/app/_controllers/auth/service/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AppComponent.prototype.onLogOut = function () {
        this.auth.logout();
        this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_controllers_auth_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _controllers_auth_interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_controllers/auth/interceptor/auth.interceptor */ "./src/app/_controllers/auth/interceptor/auth.interceptor.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _autenticar_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./autenticar/login.component */ "./src/app/autenticar/login.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ "./src/app/projeto-list/projeto-list.component.ts");
/* harmony import */ var _projeto_detail_projeto_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projeto-detail/projeto-detail.component */ "./src/app/projeto-detail/projeto-detail.component.ts");
/* harmony import */ var _projeto_create_projeto_create_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projeto-create/projeto-create.component */ "./src/app/projeto-create/projeto-create.component.ts");
/* harmony import */ var _projeto_edit_projeto_edit_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./projeto-edit/projeto-edit.component */ "./src/app/projeto-edit/projeto-edit.component.ts");
/* harmony import */ var _projeto_indicador_projeto_indicador_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./projeto-indicador/projeto-indicador.component */ "./src/app/projeto-indicador/projeto-indicador.component.ts");
/* harmony import */ var _projeto_indicador_fase_projeto_indicador_fase_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projeto-indicador-fase/projeto-indicador-fase.component */ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.ts");
/* harmony import */ var _projeto_equipe_projeto_equipe_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./projeto-equipe/projeto-equipe.component */ "./src/app/projeto-equipe/projeto-equipe.component.ts");
/* harmony import */ var _projeto_status_projeto_status_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./projeto-status/projeto-status.component */ "./src/app/projeto-status/projeto-status.component.ts");
/* harmony import */ var _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./usuario-list/usuario-list.component */ "./src/app/usuario-list/usuario-list.component.ts");
/* harmony import */ var _usuario_create_usuario_create_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./usuario-create/usuario-create.component */ "./src/app/usuario-create/usuario-create.component.ts");
/* harmony import */ var _usuario_edit_usuario_edit_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./usuario-edit/usuario-edit.component */ "./src/app/usuario-edit/usuario-edit.component.ts");
/* harmony import */ var _usuario_detail_usuario_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./usuario-detail/usuario-detail.component */ "./src/app/usuario-detail/usuario-detail.component.ts");
/* harmony import */ var _indicador_list_indicador_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./indicador-list/indicador-list.component */ "./src/app/indicador-list/indicador-list.component.ts");
/* harmony import */ var _indicador_create_indicador_create_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./indicador-create/indicador-create.component */ "./src/app/indicador-create/indicador-create.component.ts");
/* harmony import */ var _indicador_detail_indicador_detail_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./indicador-detail/indicador-detail.component */ "./src/app/indicador-detail/indicador-detail.component.ts");
/* harmony import */ var _indicador_edit_indicador_edit_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./indicador-edit/indicador-edit.component */ "./src/app/indicador-edit/indicador-edit.component.ts");
/* harmony import */ var _permissao_list_permissao_list_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./permissao-list/permissao-list.component */ "./src/app/permissao-list/permissao-list.component.ts");
/* harmony import */ var _relatorio_list_relatorio_list_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./relatorio-list/relatorio-list.component */ "./src/app/relatorio-list/relatorio-list.component.ts");
/* harmony import */ var _controllers_message_component_message_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./_controllers/message/component/message.component */ "./src/app/_controllers/message/component/message.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



 // http!!!
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // mock api
// import { InMemoryDataService } from './_models/in-memory-data.service'; // mock api

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
                _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_9__["ProjetoListComponent"],
                _projeto_detail_projeto_detail_component__WEBPACK_IMPORTED_MODULE_10__["ProjetoDetailComponent"],
                _projeto_create_projeto_create_component__WEBPACK_IMPORTED_MODULE_11__["ProjetoCreateComponent"],
                _projeto_edit_projeto_edit_component__WEBPACK_IMPORTED_MODULE_12__["ProjetoEditComponent"],
                _projeto_indicador_projeto_indicador_component__WEBPACK_IMPORTED_MODULE_13__["ProjetoIndicadorComponent"],
                _projeto_indicador_fase_projeto_indicador_fase_component__WEBPACK_IMPORTED_MODULE_14__["ProjetoIndicadorFaseComponent"],
                _projeto_equipe_projeto_equipe_component__WEBPACK_IMPORTED_MODULE_15__["ProjetoEquipeComponent"],
                _projeto_status_projeto_status_component__WEBPACK_IMPORTED_MODULE_16__["ProjetoStatusComponent"],
                _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_17__["UsuarioListComponent"],
                _usuario_create_usuario_create_component__WEBPACK_IMPORTED_MODULE_18__["UsuarioCreateComponent"],
                _usuario_edit_usuario_edit_component__WEBPACK_IMPORTED_MODULE_19__["UsuarioEditComponent"],
                _usuario_detail_usuario_detail_component__WEBPACK_IMPORTED_MODULE_20__["UsuarioDetailComponent"],
                _indicador_list_indicador_list_component__WEBPACK_IMPORTED_MODULE_21__["IndicadorListComponent"],
                _indicador_create_indicador_create_component__WEBPACK_IMPORTED_MODULE_22__["IndicadorCreateComponent"],
                _indicador_detail_indicador_detail_component__WEBPACK_IMPORTED_MODULE_23__["IndicadorDetailComponent"],
                _indicador_edit_indicador_edit_component__WEBPACK_IMPORTED_MODULE_24__["IndicadorEditComponent"],
                _permissao_list_permissao_list_component__WEBPACK_IMPORTED_MODULE_25__["PermissaoListComponent"],
                _relatorio_list_relatorio_list_component__WEBPACK_IMPORTED_MODULE_26__["RelatorioListComponent"],
                _controllers_message_component_message_component__WEBPACK_IMPORTED_MODULE_27__["MessageComponent"],
                _autenticar_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                /*HttpClientInMemoryWebApiModule.forRoot( // mock api
                  InMemoryDataService, { dataEncapsulation: false }
                ),*/
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"]
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"],
                    useClass: _controllers_auth_interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_4__["TokenInterceptor"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/autenticar/login.component.css":
/*!************************************************!*\
  !*** ./src/app/autenticar/login.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.playtest {\r\n    font-size: 240%;\r\n    line-height: .75;\r\n    text-align: center;\r\n}\r\n.play {\r\n    border: 2px solid #bbc;\r\n    border-radius: 50%;\r\n    width: 60%;\r\n    padding-top: 60%;\r\n    margin: 0 20%;\r\n    position: relative;\r\n}\r\n.text {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n}\r\n.text span:first-child {\r\n    padding-bottom: 40px;\r\n}\r\n.text span:last-child {\r\n    padding-top: 40px;\r\n}\r\n.align-center {\r\n    text-align: center;\r\n}\r\n@media screen and (min-width: 901px) {\r\n  .text {\r\n    font-size: 120px;\r\n    line-height: 240px;\r\n    text-align: center;\r\n  }\r\n}\r\n@media screen and (min-width: 601px) and (max-width: 900px) {\r\n    .text {\r\n      font-size: 60px;\r\n      line-height: 120px;\r\n      text-align: center;\r\n    }\r\n  }\r\n@media screen and (min-width: 401px) and (max-width: 600px) {\r\n    .text {\r\n      font-size: 60px;\r\n      line-height: 120px;\r\n      text-align: center;\r\n    }\r\n  }\r\n@media screen and (max-width: 400px) {\r\n  .text {\r\n    font-size: 40px;\r\n    line-height: 80px;\r\n    text-align: center;\r\n  }\r\n}"

/***/ }),

/***/ "./src/app/autenticar/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/autenticar/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"container\">\n    <div class=\"row\">\n    <div class=\"col-4\">\n\n    </div>\n    <div class=\"col-4\">\n      \n      <div class=\"row mt-5\">\n        <div class=\"col\">\n          <div class=\"playtest\">\n            Portfolio <span class=\"small\">de</span> Projetos\n          </div>\n          <!--\n          <div class=\"play\">\n            <span class=\"text\">\n              <span>P</span>\n              <span>P</span>\n            </span>\n          </div>\n          -->\n        </div>\n      </div>\n      <div class=\"row mt-4\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label>E-mail</label>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"loginModel.email\">\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label>Senha</label>\n            <input type=\"password\" class=\"form-control\" [(ngModel)]=\"loginModel.password\">\n          </div>\n        </div>\n      </div>\n      <div class=\"row mt-3\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n             TEMP: redfrigerator@gmail.com | red123a\n            <button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"onLogin()\">Entrar</button>\n            <br>\n            <div class=\"align-center mt-1\">\n              <a href=\"#\">Esqueci minha senha</a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"col-4\">\n\n    </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/autenticar/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/autenticar/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_auth_service_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_controllers/auth/service/auth.service */ "./src/app/_controllers/auth/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(serv, router) {
        this.serv = serv;
        this.router = router;
        this.loginModel = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        // validação
        this.serv.login(this.loginModel).subscribe(function (obj) {
            //console.log('login.componente.ts ----- e ai... aconteceu algo?', obj);
            if (obj.action && obj.action == 'logged in') {
                //console.log('login.componente.ts ----- logado... indo para /home!', obj.action);
                _this.router.navigate(['/home/']);
            }
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/autenticar/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/autenticar/login.component.css")]
        }),
        __metadata("design:paramtypes", [_controllers_auth_service_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"jumbotron\">\r\n        <h1>Portfolio <span class=\"small\">de</span> Projetos</h1>\r\n        <p>Gerencie seus projetos a partir de seus indicadores e status. Acompanhe o andamento de projetos de alto risco e seja avisado de situações críticas.</p>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/indicador-create/indicador-create.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/indicador-create/indicador-create.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/indicador-create/indicador-create.component.html":
/*!******************************************************************!*\
  !*** ./src/app/indicador-create/indicador-create.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/indicador\">Indicadores</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Novo indicador</li>\r\n    </ol>\r\n  </nav>\r\n      <h2>Novo Indicador</h2>\r\n      <small>Líder do Escritório de Projetos</small>\r\n  <hr>\r\n  <form #insertForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n      <div class=\"row\">\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label>Nome</label>\r\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newIndicador.name\" name=\"name\" #name=\"ngModel\" required maxlength=\"30\">\r\n                  <div [hidden]=\"name.valid || name.pristine\"\r\n                    style=\"color: red\">\r\n                    O nome do Indicador é obrigatório.\r\n                  </div>\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col\">\r\n              <div class=\"form-group\">\r\n                  <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"!insertForm.form.valid\" (click)=\"onNewIndicator()\">Inserir</button>\r\n                  &nbsp;\r\n            <!--\r\n                  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"insertForm.reset()\">Limpar</button>\r\n                  &nbsp;\r\n              -->\r\n                  <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Voltar</button>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  </form>\r\n</div>"

/***/ }),

/***/ "./src/app/indicador-create/indicador-create.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/indicador-create/indicador-create.component.ts ***!
  \****************************************************************/
/*! exports provided: IndicadorCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicadorCreateComponent", function() { return IndicadorCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _models_indicador_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_models/indicador.model */ "./src/app/_models/indicador.model.ts");
/* harmony import */ var _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../indicador-service/indicador.service */ "./src/app/indicador-service/indicador.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IndicadorCreateComponent = /** @class */ (function () {
    function IndicadorCreateComponent(indicadorService, location) {
        this.indicadorService = indicadorService;
        this.location = location;
        // criar um modelo baseado no model de indicador
        // este modelo ficará ligado ao formulário na view pelo ngModel
        this.newIndicador = new _models_indicador_model__WEBPACK_IMPORTED_MODULE_2__["Indicador"]();
    }
    IndicadorCreateComponent.prototype.ngOnInit = function () {
    };
    IndicadorCreateComponent.prototype.onNewIndicator = function () {
        var _this = this;
        // console.log('o objeto indicador é:', this.newIndicador);
        this.indicadorService.postIndicador(this.newIndicador).subscribe(function () {
            // console.log('a promessa voltou para componente indicador-create');
            _this.goBack();
        });
    };
    IndicadorCreateComponent.prototype.onSubmit = function () {
        // console.dir(this.newIndicador);
        if (this.newIndicador.name && this.newIndicador.name != '') {
            // console.log('s');
            this.onNewIndicator();
        } /*else {
          // console.log('n');
        }*/
    };
    IndicadorCreateComponent.prototype.goBack = function () {
        this.location.back();
    };
    IndicadorCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-indicador-create',
            template: __webpack_require__(/*! ./indicador-create.component.html */ "./src/app/indicador-create/indicador-create.component.html"),
            styles: [__webpack_require__(/*! ./indicador-create.component.css */ "./src/app/indicador-create/indicador-create.component.css")]
        }),
        __metadata("design:paramtypes", [_indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_3__["IndicadorService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], IndicadorCreateComponent);
    return IndicadorCreateComponent;
}());



/***/ }),

/***/ "./src/app/indicador-detail/indicador-detail.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/indicador-detail/indicador-detail.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/indicador-detail/indicador-detail.component.html":
/*!******************************************************************!*\
  !*** ./src/app/indicador-detail/indicador-detail.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/indicador\">Indicadores</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Detalhes</li>\r\n    </ol>\r\n  </nav>\r\n      <h1>Detalhes do Indicador</h1>\r\n      <small>Líder do Escritório de Projetos</small>\r\n  <hr>\r\n  <h2>Info</h2>\r\n  <div class=\"row\">\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label class=\"form\">Nome</label>\r\n                  <span class=\"form-control-plaintext\" *ngIf=\"indicadorDetail\">{{indicadorDetail.name}}</span>\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col\">\r\n              <div class=\"form-group\">\r\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"goBack()\">Voltar</button>\r\n              </div>\r\n          </div>\r\n      </div>\r\n</div>"

/***/ }),

/***/ "./src/app/indicador-detail/indicador-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/indicador-detail/indicador-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: IndicadorDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicadorDetailComponent", function() { return IndicadorDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../indicador-service/indicador.service */ "./src/app/indicador-service/indicador.service.ts");
/* harmony import */ var _models_indicador_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/indicador.model */ "./src/app/_models/indicador.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IndicadorDetailComponent = /** @class */ (function () {
    function IndicadorDetailComponent(route, indicador, location) {
        this.route = route;
        this.indicador = indicador;
        this.location = location;
        this.indicadorDetail = new _models_indicador_model__WEBPACK_IMPORTED_MODULE_4__["Indicador"]();
    }
    IndicadorDetailComponent.prototype.ngOnInit = function () {
        this.getIndicadorUrl();
    };
    IndicadorDetailComponent.prototype.getIndicadorUrl = function () {
        var _this = this;
        // pegar o usuário no serviço atraves do ID enviado como parametro
        var id = this.route.snapshot.paramMap.get('id'); // este get() é sempre de 'id'
        // console.log('o id aqui é: ', id);
        // serviço get indicador
        this.indicador.getIndicadorById(id).subscribe(function (indicador) { return _this.indicadorDetail = indicador; });
    };
    IndicadorDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    IndicadorDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-indicador-detail',
            template: __webpack_require__(/*! ./indicador-detail.component.html */ "./src/app/indicador-detail/indicador-detail.component.html"),
            styles: [__webpack_require__(/*! ./indicador-detail.component.css */ "./src/app/indicador-detail/indicador-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_3__["IndicadorService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], IndicadorDetailComponent);
    return IndicadorDetailComponent;
}());



/***/ }),

/***/ "./src/app/indicador-edit/indicador-edit.component.css":
/*!*************************************************************!*\
  !*** ./src/app/indicador-edit/indicador-edit.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/indicador-edit/indicador-edit.component.html":
/*!**************************************************************!*\
  !*** ./src/app/indicador-edit/indicador-edit.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <nav aria-label=\"breadcrumb\">\r\n      <ol class=\"breadcrumb\">\r\n        <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n        <li class=\"breadcrumb-item\"><a routerLink=\"/indicador\">Indicadores</a></li>\r\n        <li class=\"breadcrumb-item active\" aria-current=\"page\">Editar</li>\r\n      </ol>\r\n    </nav>\r\n        <h2>Editção de Indicador</h2>\r\n        <small>Líder do Escritório de Projetos</small>\r\n    <hr>\r\n    <!--\r\n        <h2>Info</h2>\r\n    -->\r\n      <form #editForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n        <div class=\"row\">\r\n            <div class=\"col-6\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"form\">Nome</label>\r\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"indicadorEdit.name\" name=\"name\" #name=\"ngModel\" required maxlength=\"30\">\r\n                    <div [hidden]=\"name.valid || name.pristine\"\r\n                      style=\"color: red\">\r\n                      O nome do Indicador é obrigatório.\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col\">\r\n                <div class=\"form-group\">\r\n                    <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"!editForm.form.valid\" (click)=\"onEditIndicator()\">\r\n                      Salvar\r\n                    </button>\r\n                    &nbsp;\r\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">\r\n                      Voltar\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n      </form>\r\n  </div>"

/***/ }),

/***/ "./src/app/indicador-edit/indicador-edit.component.ts":
/*!************************************************************!*\
  !*** ./src/app/indicador-edit/indicador-edit.component.ts ***!
  \************************************************************/
/*! exports provided: IndicadorEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicadorEditComponent", function() { return IndicadorEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../indicador-service/indicador.service */ "./src/app/indicador-service/indicador.service.ts");
/* harmony import */ var _models_indicador_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/indicador.model */ "./src/app/_models/indicador.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IndicadorEditComponent = /** @class */ (function () {
    function IndicadorEditComponent(route, indicador, location) {
        this.route = route;
        this.indicador = indicador;
        this.location = location;
        this.indicadorEdit = new _models_indicador_model__WEBPACK_IMPORTED_MODULE_4__["Indicador"]();
    }
    IndicadorEditComponent.prototype.ngOnInit = function () {
        this.getIndicadorUrl();
    };
    IndicadorEditComponent.prototype.getIndicadorUrl = function () {
        var _this = this;
        // pegar o usuário no serviço atraves do ID enviado como parametro
        var id = this.route.snapshot.paramMap.get('id'); // este get() é sempre de 'id'
        // serviço get indicador
        this.indicador.getIndicadorById(id).subscribe(function (indicador) { return _this.indicadorEdit = indicador; });
    };
    IndicadorEditComponent.prototype.onEditIndicator = function () {
        var _this = this;
        // put
        console.log('edit...');
        this.indicador.putIndicador(this.indicadorEdit).subscribe(function () {
            _this.goBack();
        });
    };
    IndicadorEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    IndicadorEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-indicador-edit',
            template: __webpack_require__(/*! ./indicador-edit.component.html */ "./src/app/indicador-edit/indicador-edit.component.html"),
            styles: [__webpack_require__(/*! ./indicador-edit.component.css */ "./src/app/indicador-edit/indicador-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_3__["IndicadorService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], IndicadorEditComponent);
    return IndicadorEditComponent;
}());



/***/ }),

/***/ "./src/app/indicador-list/indicador-list.component.css":
/*!*************************************************************!*\
  !*** ./src/app/indicador-list/indicador-list.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/indicador-list/indicador-list.component.html":
/*!**************************************************************!*\
  !*** ./src/app/indicador-list/indicador-list.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a href=\"#\" routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Indicadores</li>\r\n    </ol>\r\n  </nav>\r\n<!--\r\n  <h1>Lista de Indicadores</h1>\r\n  <hr>\r\n-->\r\n<!--\r\n  <h2>Filtros</h2>\r\n  <div class=\"row\">\r\n    <div class=\"col-4\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <button type=\"button\" class=\"btn btn-primary\">Filtrar</button>\r\n            <button type=\"button\" class=\"btn btn-secondary\">Limpar</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"col-8\">\r\n\r\n    </div>\r\n  </div>\r\n  <hr>\r\n-->\r\n  <h2>\r\n    Lista de Indicadores\r\n    <div class=\"float-right\"><button type=\"button\" class=\"btn btn-primary\" (click)=\"onNewIndicator()\">+ novo indicador</button></div>\r\n  </h2>\r\n  <div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th class=\"w1p\"></th>\r\n          <th>Indicador</th>\r\n          <th class=\"w20p\">Ações</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let indicador of indicadorList; let i = index\">\r\n          <td>{{i + 1}}</td>\r\n          <td>{{indicador.name}}</td>\r\n          <td>\r\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"onSelectEditIndicador(indicador._id)\">\r\n              editar\r\n            </button>\r\n            &nbsp;\r\n            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#exampleModal\" (click)=\"onSelectDeleteIndicador(indicador._id)\">\r\n              excluir\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLabel\">Confirmação de Exclusão</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n            Deseja realmente excluir este Indicador?\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>\r\n            &nbsp;\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"onSelectDeleteOkIndicador()\">Excluir</button>\r\n        </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/indicador-list/indicador-list.component.ts":
/*!************************************************************!*\
  !*** ./src/app/indicador-list/indicador-list.component.ts ***!
  \************************************************************/
/*! exports provided: IndicadorListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicadorListComponent", function() { return IndicadorListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../indicador-service/indicador.service */ "./src/app/indicador-service/indicador.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndicadorListComponent = /** @class */ (function () {
    function IndicadorListComponent(indicadorService, route) {
        this.indicadorService = indicadorService;
        this.route = route;
    }
    IndicadorListComponent.prototype.ngOnInit = function () {
        this.getIndicadores();
    };
    IndicadorListComponent.prototype.getIndicadores = function () {
        var _this = this;
        // subscrive fica ouvindo o observable (do serviço) e dispara a função quando receber a lista de
        // indicadores... a função para a lista recebida para a variável local de lista de indicadores.
        this.indicadorService.getIndicadores().subscribe(function (inds) {
            _this.indicadorList = inds;
        });
    };
    // vai para tela de novo
    IndicadorListComponent.prototype.onNewIndicator = function () {
        this.route.navigate(['/indicador/create']);
    };
    // vai para tela de edição/detalhe
    IndicadorListComponent.prototype.onSelectEditIndicador = function (idIndicador) {
        console.log('indicador-list.componente onSelectEditIndicador()');
        this.route.navigate(['/indicador/edit/' + idIndicador]);
    };
    // grupo de funções para deletar (confirmação no popup)
    IndicadorListComponent.prototype.onSelectDeleteIndicador = function (idIndicador) {
        console.log('indicador-list.componente onSelectDeleteIndicador()');
        this.deleteIndicadorWait = idIndicador;
    };
    IndicadorListComponent.prototype.onSelectDeleteOkIndicador = function () {
        var _this = this;
        if (this.deleteIndicadorWait) {
            // chama serviço para deletar indicador
            this.indicadorService.deleteIndicador(this.deleteIndicadorWait).subscribe(function () {
                // console.log('voltou do DELETE indicador');
                _this.indicadorList = _this.indicadorList.filter(function (el) {
                    // console.log('el.id ', el._id);
                    // console.log('deleteIndicadorWait: ', this.deleteIndicadorWait);
                    return el._id !== _this.deleteIndicadorWait;
                });
                _this.deleteIndicadorWait = null;
            });
            // this.deleteIndicadorWait = null;
        }
    };
    IndicadorListComponent.prototype.onDeselectDeleteOkIndicador = function () {
        this.deleteIndicadorWait = null;
    };
    IndicadorListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-indicador-list',
            template: __webpack_require__(/*! ./indicador-list.component.html */ "./src/app/indicador-list/indicador-list.component.html"),
            styles: [__webpack_require__(/*! ./indicador-list.component.css */ "./src/app/indicador-list/indicador-list.component.css")]
        }),
        __metadata("design:paramtypes", [_indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_1__["IndicadorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], IndicadorListComponent);
    return IndicadorListComponent;
}());



/***/ }),

/***/ "./src/app/indicador-service/indicador.service.ts":
/*!********************************************************!*\
  !*** ./src/app/indicador-service/indicador.service.ts ***!
  \********************************************************/
/*! exports provided: IndicadorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicadorService", function() { return IndicadorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IndicadorService = /** @class */ (function () {
    function IndicadorService(http, message) {
        this.http = http;
        this.message = message;
        this.indicadoresApiUrl = 'api/indicador';
    }
    // listar todos
    IndicadorService.prototype.getIndicadores = function () {
        return this.http.get(this.indicadoresApiUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getIndicadores')));
    };
    // retorna um
    IndicadorService.prototype.getIndicadorById = function (id) {
        console.log('indicador.service --- id que vai para get by id...', id);
        return this.http.get(this.indicadoresApiUrl + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            //console.log('indicador.service --- TAP: editando indicador...');
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getIndicadorById')));
    };
    // inserir novo
    IndicadorService.prototype.postIndicador = function (indicador) {
        var _this = this;
        return this.http.post(this.indicadoresApiUrl, indicador).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (ind) {
            console.log('indicador.service --- TAP: gravando novo indicador no banco...', ind);
            // foi um sucesso!
            _this.message.success("O indicador " + ind.name + " foi inserido com sucesso", true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('postIndicador')));
    };
    // editar
    IndicadorService.prototype.putIndicador = function (indicador) {
        console.log('indicador.service --- o indicador aqui no put é...', indicador);
        return this.http.put(this.indicadoresApiUrl + '/' + indicador._id, indicador).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('putIndicador')));
    };
    // excluir
    IndicadorService.prototype.deleteIndicador = function (id) {
        var _this = this;
        return this.http.delete(this.indicadoresApiUrl + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            console.log('indicador.service --- sucesso na exclusão!');
            _this.message.error("O indicador foi exclu\u00EDdo com sucesso", true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('deleteIndicador')));
    };
    IndicadorService.prototype.log = function (message) {
        // message service
        console.log('indicador.service --- indicador.service.ts - ' + message);
    };
    IndicadorService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'Operação'; }
        return function (error) {
            // console.log('indicador.service.ts - ', error);
            // console.error('handleError em indicador.service', error);
            _this.log(operation + " falhou: " + error.message);
            // this.message.error(`Houve uma falha na operação ${operation}`, true);
            if (error.error.message)
                _this.message.error(error.error.message, true);
            else
                _this.message.error('Erro não identificado. [ind.ser.' + operation + ']', true);
            // retorna um resultado vazio para app continuar rodando
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    IndicadorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], IndicadorService);
    return IndicadorService;
}());



/***/ }),

/***/ "./src/app/permissao-list/permissao-list.component.css":
/*!*************************************************************!*\
  !*** ./src/app/permissao-list/permissao-list.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/permissao-list/permissao-list.component.html":
/*!**************************************************************!*\
  !*** ./src/app/permissao-list/permissao-list.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Permissões de Telas</li>\r\n    </ol>\r\n  </nav>\r\n      <h2>Permissões de Telas/Funcionalidades</h2>\r\n      <small>Atividade do Administrador do Sistema</small>\r\n  <hr>\r\n  <!--\r\n      <h4>Tela</h4>\r\n      <div class=\"row\">\r\n          <div class=\"col-md-5\">\r\n              <div class=\"form-group\">\r\n                  <select class=\"form-control custom-select\" (change)=\"onSelectViewToDisplay($event)\">\r\n                      <option ** * ng For=\"let view of viewViews\" value=\"{{view.value}}\">\r\n                        {{ view.view }}\r\n                      </option>\r\n                  </select>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  <hr>\r\n    -->\r\n\r\n  <div *ngFor=\"let oneview of viewPermission\">\r\n\r\n    <!--<div [ngSwitch]=\"showGroup\">-->\r\n\r\n        <div *ngIf=\"oneview.route == '/projeto'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'prj'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                            <!--<span class=\"badge badge-secondary badge-pill\">???</span>-->\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_1\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_1_1\" name=\"role[]\" #chRoleAdmin_1>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_1>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_1_1\" name=\"role[]\" #chRoleAdmin_1>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_1_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_1\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_1_2\" name=\"role[]\" #chRoleDirector_1>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_1>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_1_2\" name=\"role[]\" #chRoleDirector_1>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_1_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_1\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_1_3\" name=\"role[]\" #chRolePrincipal_1>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_1>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_1_3\" name=\"role[]\" #chRolePrincipal_1>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_1_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_1\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_1_4\" name=\"role[]\" #chRoleManager_1>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_1>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_1_4\" name=\"role[]\" #chRoleManager_1>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_1_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_1\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_1_5\" name=\"role[]\" #chRoleLeader_1>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_1>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_1_5\" name=\"role[]\" #chRoleLeader_1>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_1_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_1(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n        \r\n            <hr>\r\n\r\n        </div>\r\n\r\n        <!-- * * * -->\r\n\r\n        <div *ngIf=\"oneview.route == '/indicador'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'ind'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                            <!--<span class=\"badge badge-secondary badge-pill\">???</span>-->\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_2\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_2_1\" name=\"role[]\" #chRoleAdmin_2>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_2>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_2_1\" name=\"role[]\" #chRoleAdmin_2>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_2_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_2\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_2_2\" name=\"role[]\" #chRoleDirector_2>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_2>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_2_2\" name=\"role[]\" #chRoleDirector_2>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_2_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_2\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_2_3\" name=\"role[]\" #chRolePrincipal_2>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_2>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_2_3\" name=\"role[]\" #chRolePrincipal_2>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_2_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_2\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_2_4\" name=\"role[]\" #chRoleManager_2>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_2>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_2_4\" name=\"role[]\" #chRoleManager_2>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_2_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_2\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_2_5\" name=\"role[]\" #chRoleLeader_2>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_2>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_2_5\" name=\"role[]\" #chRoleLeader_2>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_2_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_2(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n\r\n            <hr>\r\n\r\n        </div>\r\n\r\n        <!-- * * * -->\r\n\r\n        <div *ngIf=\"oneview.route == '/usuario'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'usr'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                            <!--<span class=\"badge badge-secondary badge-pill\">???</span>-->\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_3\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_3_1\" name=\"role[]\" #chRoleAdmin_3>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_3>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_3_1\" name=\"role[]\" #chRoleAdmin_3>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_3_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_3\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_3_2\" name=\"role[]\" #chRoleDirector_3>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_3>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_3_2\" name=\"role[]\" #chRoleDirector_3>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_3_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_3\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_3_3\" name=\"role[]\" #chRolePrincipal_3>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_3>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_3_3\" name=\"role[]\" #chRolePrincipal_3>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_3_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_3\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_3_4\" name=\"role[]\" #chRoleManager_3>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_3>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_3_4\" name=\"role[]\" #chRoleManager_3>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_3_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_3\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_3_5\" name=\"role[]\" #chRoleLeader_3>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_3>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_3_5\" name=\"role[]\" #chRoleLeader_3>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_3_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_3(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n\r\n            <hr>\r\n\r\n        </div>\r\n\r\n        <!-- * * * -->\r\n\r\n        <div *ngIf=\"oneview.route == '/projeto-equipe'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'prj-eqp'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_4\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_4_1\" name=\"role[]\" #chRoleAdmin_4>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_4>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_4_1\" name=\"role[]\" #chRoleAdmin_4>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_4_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_4\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_4_2\" name=\"role[]\" #chRoleDirector_4>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_4>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_4_2\" name=\"role[]\" #chRoleDirector_4>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_4_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_4\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_4_3\" name=\"role[]\" #chRolePrincipal_4>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_4>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_4_3\" name=\"role[]\" #chRolePrincipal_4>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_4_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_4\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_4_4\" name=\"role[]\" #chRoleManager_4>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_4>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_4_4\" name=\"role[]\" #chRoleManager_4>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_4_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_4\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_4_5\" name=\"role[]\" #chRoleLeader_4>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_4>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_4_5\" name=\"role[]\" #chRoleLeader_4>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_4_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_4(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n\r\n            <hr>\r\n\r\n        </div>\r\n\r\n        <!-- * * * -->\r\n\r\n        <div *ngIf=\"oneview.route == '/projeto-indicador'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'prj-ind'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_5\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_5_1\" name=\"role[]\" #chRoleAdmin_5>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_5>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_5_1\" name=\"role[]\" #chRoleAdmin_5>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_5_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_5\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_5_2\" name=\"role[]\" #chRoleDirector_5>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_5>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_5_2\" name=\"role[]\" #chRoleDirector_5>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_5_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_5\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_5_3\" name=\"role[]\" #chRolePrincipal_5>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_5>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_5_3\" name=\"role[]\" #chRolePrincipal_5>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_5_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_5\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_5_4\" name=\"role[]\" #chRoleManager_5>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_5>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_5_4\" name=\"role[]\" #chRoleManager_5>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_5_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_5\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_5_5\" name=\"role[]\" #chRoleLeader_5>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_5>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_5_5\" name=\"role[]\" #chRoleLeader_5>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_5_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_5(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n\r\n            <hr>\r\n\r\n        </div>\r\n\r\n        <!-- * * * -->\r\n\r\n        <div *ngIf=\"oneview.route == '/projeto-indicador-fase'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'prj-ind-fas'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_6\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_6_1\" name=\"role[]\" #chRoleAdmin_6>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_6>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_6_1\" name=\"role[]\" #chRoleAdmin_6>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_6_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_6\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_6_2\" name=\"role[]\" #chRoleDirector_6>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_6>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_6_2\" name=\"role[]\" #chRoleDirector_6>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_6_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_6\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_6_3\" name=\"role[]\" #chRolePrincipal_6>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_6>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_6_3\" name=\"role[]\" #chRolePrincipal_6>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_6_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_6\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_6_4\" name=\"role[]\" #chRoleManager_6>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_6>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_6_4\" name=\"role[]\" #chRoleManager_6>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_6_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_6\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_6_5\" name=\"role[]\" #chRoleLeader_6>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_6>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_6_5\" name=\"role[]\" #chRoleLeader_6>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_6_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_6(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n\r\n            <hr>\r\n\r\n        </div>\r\n\r\n        <!-- * * * -->\r\n\r\n        <div *ngIf=\"oneview.route == '/projeto-status'\">\r\n\r\n            <form>\r\n                <div class=\"row\"> <!-- *ngSwitchCase=\"'prj-ind-fas'\" -->\r\n                    <div class=\"col-12 col-md-5 mb-3\">\r\n                        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                            <span class=\"text-muted\">{{ oneview.view }}</span>\r\n                        </h4>\r\n                        <h5>\r\n                            Perfis de usuário:\r\n                        </h5>\r\n                        <ul class=\"list-group mb-3\">\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Administrador')!==-1; else otherAdmin_7\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_7_1\" name=\"role[]\" #chRoleAdmin_7>\r\n                                    </ng-container>\r\n                                    <ng-template #otherAdmin_7>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_7_1\" name=\"role[]\" #chRoleAdmin_7>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_7_1\">Administrador</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('director')!==-1; else otherDirector_7\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_7_2\" name=\"role[]\" #chRoleDirector_7>\r\n                                    </ng-container>\r\n                                    <ng-template #otherDirector_7>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_7_2\" name=\"role[]\" #chRoleDirector_7>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_7_2\">Diretor</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team principal')!==-1; else otherPrincipal_7\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_7_3\" name=\"role[]\" #chRolePrincipal_7>\r\n                                    </ng-container>\r\n                                    <ng-template #otherPrincipal_7>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_7_3\" name=\"role[]\" #chRolePrincipal_7>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_7_3\">Líder do Escritório de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('Gerente de Projeto')!==-1; else otherManager_7\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_7_4\" name=\"role[]\" #chRoleManager_7>\r\n                                    </ng-container>\r\n                                    <ng-template #otherManager_7>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_7_4\" name=\"role[]\" #chRoleManager_7>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_7_4\">Gerente de Projetos</label>\r\n                                </div>\r\n                            </li>\r\n                            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                                <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                                    <ng-container *ngIf=\"oneview.role.indexOf('team leader')!==-1; else otherLeader_7\">\r\n                                        <input type=\"checkbox\" checked class=\"custom-control-input\" id=\"role_7_5\" name=\"role[]\" #chRoleLeader_7>\r\n                                    </ng-container>\r\n                                    <ng-template #otherLeader_7>\r\n                                        <input type=\"checkbox\" class=\"custom-control-input\" id=\"role_7_5\" name=\"role[]\" #chRoleLeader_7>\r\n                                    </ng-template>\r\n                                    <label class=\"custom-control-label\" for=\"role_7_5\">Líder de Projeto</label>\r\n                                </div>\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"form-group\">\r\n                                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveGroup_7(oneview._id)\">Salvar {{ oneview.view }}</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-1\"></div>\r\n                </div>\r\n            </form>\r\n\r\n            <hr>\r\n\r\n        </div>\r\n\r\n    <!--</div>-->\r\n\r\n  </div>\r\n\r\n  <br style=\"clear: both\">\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/permissao-list/permissao-list.component.ts":
/*!************************************************************!*\
  !*** ./src/app/permissao-list/permissao-list.component.ts ***!
  \************************************************************/
/*! exports provided: PermissaoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissaoListComponent", function() { return PermissaoListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_permissao_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_models/permissao.model */ "./src/app/_models/permissao.model.ts");
/* harmony import */ var _permissao_service_permissao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../permissao-service/permissao.service */ "./src/app/permissao-service/permissao.service.ts");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PermissaoListComponent = /** @class */ (function () {
    function PermissaoListComponent(service, message) {
        this.service = service;
        this.message = message;
        this.viewEditP = new _models_permissao_model__WEBPACK_IMPORTED_MODULE_1__["Permissao"]();
        this.viewViews = [
            { view: 'Projetos', value: 'prj', route: '/projeto' },
            { view: 'Projetos - Equipe', value: 'prj-eqp', route: '/projeto-equipe' },
            { view: 'Projetos - Indicadores', value: 'prj-ind', route: 'projeto-indicador' },
            { view: 'Projetos - Indicadores - Fases', value: 'prj-ind-fas', route: '/projeto-indicador-fase' },
            { view: 'Indicadores', value: 'ind', route: '/indicador' },
            { view: 'Usuários', value: 'usr', route: '/usuario' },
            { view: 'Relatórios', value: 'rel', route: '/relatorio' }
        ];
        this.showGroup = 'prj'; // inicia-se com o grupo de projetos sendo exibidos
        this.viewRoles = [
            { title: 'Administrador', role: 'Administrador' },
            { title: 'Diretor', role: 'director' },
            { title: 'Líder do Escritório de Projetos', role: 'team principal' },
            { title: 'Gerente de Projeto', role: 'Gerente de Projeto' },
            { title: 'Líder de Time', role: 'team leader' }
        ];
    }
    PermissaoListComponent.prototype.ngOnInit = function () {
        // getPermission
        // pega a relação de permissões e perfis
        this.getPermissionList();
    };
    PermissaoListComponent.prototype.getPermissionList = function () {
        var _this = this;
        this.service.get().subscribe(function (perm) {
            _this.viewPermission = perm;
        });
    };
    PermissaoListComponent.prototype.onEditPermission = function () {
        console.log();
        /*this.service.put('', this.viewEditP).subscribe(
          // alguma coisa aqui? a mensagem deve estar no serviço...
        );*/
    };
    PermissaoListComponent.prototype.onSaveGroup_1 = function (id) {
        this.viewEditP._id = id;
        /*console.log('value: ', this.chRoleAdmin_1.nativeElement.checked);
        console.log('value: ', this.chRoleDirector_1.nativeElement.value);
        console.log('value: ', this.chRolePrincipal_1.nativeElement.value);
        console.log('value: ', this.chRoleManager_1.nativeElement.value);
        console.log('value: ', this.chRoleLeader_1.nativeElement.value);*/
        var rolePack = [];
        if (this.chRoleAdmin_1.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_1.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_1.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_1.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_1.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade de Projetos.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        //console.log('value: ', this.viewEditP);
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSaveGroup_2 = function (id) {
        this.viewEditP._id = id;
        var rolePack = [];
        if (this.chRoleAdmin_2.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_2.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_2.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_2.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_2.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade de Indicadores.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSaveGroup_3 = function (id) {
        this.viewEditP._id = id;
        var rolePack = [];
        if (this.chRoleAdmin_3.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_3.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_3.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_3.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_3.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSaveGroup_4 = function (id) {
        this.viewEditP._id = id;
        var rolePack = [];
        if (this.chRoleAdmin_4.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_4.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_4.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_4.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_4.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSaveGroup_5 = function (id) {
        this.viewEditP._id = id;
        var rolePack = [];
        if (this.chRoleAdmin_5.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_5.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_5.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_5.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_5.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSaveGroup_6 = function (id) {
        this.viewEditP._id = id;
        var rolePack = [];
        if (this.chRoleAdmin_6.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_6.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_6.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_6.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_6.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSaveGroup_7 = function (id) {
        this.viewEditP._id = id;
        var rolePack = [];
        if (this.chRoleAdmin_7.nativeElement.checked) {
            rolePack.push('Administrador');
        }
        if (this.chRoleDirector_7.nativeElement.checked) {
            rolePack.push('director');
        }
        if (this.chRolePrincipal_7.nativeElement.checked) {
            rolePack.push('team principal');
        }
        if (this.chRoleManager_7.nativeElement.checked) {
            rolePack.push('Gerente de Projeto');
        }
        if (this.chRoleLeader_7.nativeElement.checked) {
            rolePack.push('team leader');
        }
        if (rolePack.length == 0) {
            this.message.warning('Atenção, deve haver ao menos um perfil escolhido para a tela/funcionalidade de alteração de status dos Projetos.', false);
            return;
        }
        this.viewEditP.role = rolePack;
        this.service.put(id, this.viewEditP).subscribe();
    };
    PermissaoListComponent.prototype.onSelectViewToDisplay = function ($event) {
        console.log('evento target: ', $event.target.value);
        this.showGroup = $event.target.value;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_1'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_1'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_1'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_1'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_1'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_2'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_2'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_2'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_2'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_2'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_3'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_3", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_3'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_3", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_3'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_3", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_3'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_3", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_3'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_3", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_4'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_4", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_4'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_4", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_4'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_4", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_4'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_4", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_4'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_4", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_5'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_5", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_5'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_5", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_5'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_5", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_5'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_5", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_5'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_5", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_6'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_6", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_6'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_6", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_6'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_6", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_6'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_6", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_6'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_6", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleAdmin_7'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleAdmin_7", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleDirector_7'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleDirector_7", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRolePrincipal_7'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRolePrincipal_7", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleManager_7'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleManager_7", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chRoleLeader_7'),
        __metadata("design:type", Object)
    ], PermissaoListComponent.prototype, "chRoleLeader_7", void 0);
    PermissaoListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-permissao-list',
            template: __webpack_require__(/*! ./permissao-list.component.html */ "./src/app/permissao-list/permissao-list.component.html"),
            styles: [__webpack_require__(/*! ./permissao-list.component.css */ "./src/app/permissao-list/permissao-list.component.css")]
        }),
        __metadata("design:paramtypes", [_permissao_service_permissao_service__WEBPACK_IMPORTED_MODULE_2__["PermissaoService"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], PermissaoListComponent);
    return PermissaoListComponent;
}());



/***/ }),

/***/ "./src/app/permissao-service/permissao.service.ts":
/*!********************************************************!*\
  !*** ./src/app/permissao-service/permissao.service.ts ***!
  \********************************************************/
/*! exports provided: PermissaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissaoService", function() { return PermissaoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PermissaoService = /** @class */ (function () {
    function PermissaoService(httpService, messageService) {
        this.httpService = httpService;
        this.messageService = messageService;
        this.permissaoApiUrl = 'api/permissao';
    }
    PermissaoService.prototype.get = function () {
        return this.httpService.get(this.permissaoApiUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (r) { return console.log(r); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('get')));
    };
    PermissaoService.prototype.getOne = function (id) {
        return this.httpService.get(this.permissaoApiUrl + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getOne')));
    };
    PermissaoService.prototype.put = function (id, obj) {
        var _this = this;
        return this.httpService.put(this.permissaoApiUrl + '/' + id, obj).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            _this.messageService.info('Permissões alteradas.', false);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('put')));
    };
    PermissaoService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'Operação'; }
        return function (error) {
            console.error('handleError em permissao.service', error);
            // this.log(`${operation} falhou: ${error.message}`);
            /*if (error.statusText == "Unknow Error") {
              this.messageService.error(`Falha na desconhecida na operação com o servidor.`, false);
            } else {
              this.messageService.error(`Houve uma falha na operação ${operation}`, true);
            }*/
            _this.messageService.error(error.error.message, true);
            // retorna um resultado vazio para app continuar rodando
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    PermissaoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], PermissaoService);
    return PermissaoService;
}());



/***/ }),

/***/ "./src/app/projeto-create/projeto-create.component.css":
/*!*************************************************************!*\
  !*** ./src/app/projeto-create/projeto-create.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-create/projeto-create.component.html":
/*!**************************************************************!*\
  !*** ./src/app/projeto-create/projeto-create.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/projeto\">Projetos</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Novo Projeto</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Novo Projeto</h2>\r\n  <!--<small>Líder do Escritório de Projetos</small>-->\r\n  <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n        <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newProject.name\">\r\n        </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data de Início</label>\r\n                <input class=\"form-control datepicker\" readonly style=\"background: #fff\" #dateStart>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data de Previsão de Términio</label>\r\n                <input class=\"form-control datepicker\" readonly style=\"background: #fff\" #datePrevision>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data <b>real</b> de Téminio</label>\r\n                <input class=\"form-control datepicker\" readonly style=\"background: #fff\" #dateEnd>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Descrição</label>\r\n                <textarea class=\"form-control\" [(ngModel)]=\"newProject.description\"></textarea>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-2\"></div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Gerente</label>\r\n                <select class=\"form-control custom-select\" #selectManager>\r\n                    <option value=''></option>\r\n                    <option *ngFor=\"let user of listUsers\" value=\"{{user._id}}\" [attr.data-name]=\"user.name\" [attr.data-email]=\"user.email\" [attr.data-role]=\"user.role\">{{user.name}}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Orçamento</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newProject.budget\">\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Riscos</label>\r\n                <select class=\"form-control custom-select\" #selectRisk>\r\n                    <option value=\"Baixo\">Baixo risco</option>\r\n                    <option value=\"Médio\">Médio risco</option>\r\n                    <option value=\"Alto\">Alto risco</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Status</label>\r\n                <select class=\"form-control custom-select\" #selectStatus>\r\n                    <option value=\"Em análise\">Em análise</option>\r\n                    <option value=\"Análise realizada\">Análise realizada</option>\r\n                    <option value=\"Análise aprovada\">Análise aprovada</option>\r\n                    <option value=\"Iniciado\">Iniciado</option>\r\n                    <option value=\"Planejado\">Planejado</option>\r\n                    <option value=\"Em andamento\">Em andamento</option>\r\n                    <option value=\"Encerrado\">Encerrado</option>\r\n                    <option value=\"Cancelado\">Cancelado</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-6\">\r\n            <!--\r\n            Este campo somente é útil na edição do status!\r\n            <div class=\"form-group\">\r\n                <label>Justificativa de mudança de Status</label>\r\n                <textarea class=\"form-control\" [(ngModel)]=\"newProject.justification\"></textarea>\r\n            </div>\r\n            -->\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- \r\n<script>\r\n  $(document).ready(function(){\r\n    $('.datepicker').datepicker({\r\n        format: 'dd/mm/yyyy',\r\n        language: 'pt-BR'\r\n    });\r\n  })\r\n</script>\r\n-->"

/***/ }),

/***/ "./src/app/projeto-create/projeto-create.component.ts":
/*!************************************************************!*\
  !*** ./src/app/projeto-create/projeto-create.component.ts ***!
  \************************************************************/
/*! exports provided: ProjetoCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoCreateComponent", function() { return ProjetoCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
/* harmony import */ var _models_projeto_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_models/projeto.model */ "./src/app/_models/projeto.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjetoCreateComponent = /** @class */ (function () {
    function ProjetoCreateComponent(projetoService, location) {
        this.projetoService = projetoService;
        this.location = location;
        this.newProject = new _models_projeto_model__WEBPACK_IMPORTED_MODULE_3__["Projeto"]();
    }
    ProjetoCreateComponent.prototype.ngOnInit = function () {
        // jquery datepicker
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR'
        });
        //
        this.getManagers();
    };
    ProjetoCreateComponent.prototype.getManagers = function () {
        var _this = this;
        this.projetoService.getGerentes().subscribe(function (obj) {
            _this.listUsers = obj;
        });
    };
    ProjetoCreateComponent.prototype.onSave = function () {
        var _this = this;
        if (this.validate()) {
            // post service
            this.projetoService.postProjeto(this.newProject).subscribe(function () {
                _this.goBack(); // ou faz uma rota para a lista de projetos?
            });
        }
    };
    ProjetoCreateComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjetoCreateComponent.prototype.validate = function () {
        if (this.dateStart.nativeElement.value != '')
            this.newProject.dateStart = new Date(this.formatDate(this.dateStart.nativeElement.value));
        if (this.dateEnd.nativeElement.value != '')
            this.newProject.dateEnd = new Date(this.formatDate(this.dateEnd.nativeElement.value));
        if (this.datePrevision.nativeElement.value != '')
            this.newProject.datePrevision = new Date(this.formatDate(this.datePrevision.nativeElement.value));
        this.newProject.risk = this.selectRisk.nativeElement.value;
        this.newProject.status = this.selectStatus.nativeElement.value;
        this.newProject.manager = {
            _id: this.selectManager.nativeElement.value,
            name: this.selectManager.nativeElement.selectedOptions[0].dataset.name,
            email: this.selectManager.nativeElement.selectedOptions[0].dataset.email,
            role: this.selectManager.nativeElement.selectedOptions[0].dataset.role
        };
        //
        return true;
    };
    ProjetoCreateComponent.prototype.formatDate = function (data) {
        if (data == '' || data == undefined)
            return null;
        var dia = data.substr(0, 2);
        var mes = data.substr(3, 2);
        var ano = data.substr(6, 4);
        return mes + '/' + dia + '/' + ano;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dateStart'),
        __metadata("design:type", Object)
    ], ProjetoCreateComponent.prototype, "dateStart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('datePrevision'),
        __metadata("design:type", Object)
    ], ProjetoCreateComponent.prototype, "datePrevision", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dateEnd'),
        __metadata("design:type", Object)
    ], ProjetoCreateComponent.prototype, "dateEnd", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectRisk'),
        __metadata("design:type", Object)
    ], ProjetoCreateComponent.prototype, "selectRisk", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectStatus'),
        __metadata("design:type", Object)
    ], ProjetoCreateComponent.prototype, "selectStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectManager'),
        __metadata("design:type", Object)
    ], ProjetoCreateComponent.prototype, "selectManager", void 0);
    ProjetoCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-create',
            template: __webpack_require__(/*! ./projeto-create.component.html */ "./src/app/projeto-create/projeto-create.component.html"),
            styles: [__webpack_require__(/*! ./projeto-create.component.css */ "./src/app/projeto-create/projeto-create.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_2__["ProjetoService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], ProjetoCreateComponent);
    return ProjetoCreateComponent;
}());



/***/ }),

/***/ "./src/app/projeto-detail/projeto-detail.component.css":
/*!*************************************************************!*\
  !*** ./src/app/projeto-detail/projeto-detail.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-detail/projeto-detail.component.html":
/*!**************************************************************!*\
  !*** ./src/app/projeto-detail/projeto-detail.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a href=\"#\">Library</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Data</li>\r\n    </ol>\r\n  </nav>\r\n      <h1>Novo Projeto</h1>\r\n      <small>Líder do Escritório de Projetos</small>\r\n  <hr>\r\n  <h2>Info</h2>\r\n  <div class=\"row\">\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label>Nome</label>\r\n                  <input type=\"text\" class=\"form-control\">\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col-4\">\r\n              <div class=\"form-group\">\r\n                  <label>Data de Início</label>\r\n                  <input class=\"form-control\">\r\n              </div>\r\n          </div>\r\n          <div class=\"col-4\">\r\n              <div class=\"form-group\">\r\n                  <label>Data de Previsão de Términio</label>\r\n                  <input class=\"form-control\">\r\n              </div>\r\n          </div>\r\n          <div class=\"col-4\">\r\n              <div class=\"form-group\">\r\n                  <label>Data <b>real</b> de Téminio</label>\r\n                  <input class=\"form-control\">\r\n              </div>\r\n          </div>\r\n      </div>\r\n  <div class=\"row\">\r\n          <div class=\"col-4\">\r\n              <div class=\"form-group\">\r\n                  <label>Orçamento</label>\r\n                  <input type=\"text\" class=\"form-control\">\r\n              </div>\r\n          </div>\r\n          <div class=\"col-4\">\r\n              <div class=\"form-group\">\r\n                  <label>Riscos</label>\r\n                  <select class=\"form-control custom-select\">\r\n                      <option>Baixo risco</option>\r\n                      <option>Médio risco</option>\r\n                      <option>Alto risco</option>\r\n                  </select>\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col-4\">\r\n              <div class=\"form-group\">\r\n                  <label>Status</label>\r\n                  <select class=\"form-control custom-select\">\r\n                      <option>Em análise</option>\r\n                      <option>Análise realizada</option>\r\n                      <option>Análise aprovada</option>\r\n                      <option>Iniciado</option>\r\n                      <option>Planejado</option>\r\n                      <option>Em andamento</option>\r\n                      <option>Encerrado</option>\r\n                      <option>Cancelado</option>\r\n                  </select>\r\n              </div>\r\n          </div>\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label>Justificativa de mudança de Status</label>\r\n                  <textarea class=\"form-control\"></textarea>\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label>Descrição</label>\r\n                  <textarea class=\"form-control\"></textarea>\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col\">\r\n              <div class=\"form-group\">\r\n                  <button type=\"button\" class=\"btn btn-primary\">Filtrar</button>\r\n                  <button type=\"button\" class=\"btn btn-secondary\">Limpar</button>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  <hr>\r\n  <h2>Equipe</h2>\r\n  <hr>\r\n      <h2>Indicadores</h2>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/projeto-detail/projeto-detail.component.ts":
/*!************************************************************!*\
  !*** ./src/app/projeto-detail/projeto-detail.component.ts ***!
  \************************************************************/
/*! exports provided: ProjetoDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoDetailComponent", function() { return ProjetoDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProjetoDetailComponent = /** @class */ (function () {
    function ProjetoDetailComponent(route, projeto) {
        this.route = route;
        this.projeto = projeto;
    }
    ProjetoDetailComponent.prototype.ngOnInit = function () {
        this.getProjetoUrl();
    };
    ProjetoDetailComponent.prototype.getProjetoUrl = function () {
        // pegar o usuário no serviço atraves do ID enviado como parametro
        var id = this.route.snapshot.paramMap.get('id');
        // serviço get projeto
        this.projeto.getProjetoById(id).subscribe();
    };
    ProjetoDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-detail',
            template: __webpack_require__(/*! ./projeto-detail.component.html */ "./src/app/projeto-detail/projeto-detail.component.html"),
            styles: [__webpack_require__(/*! ./projeto-detail.component.css */ "./src/app/projeto-detail/projeto-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_2__["ProjetoService"]])
    ], ProjetoDetailComponent);
    return ProjetoDetailComponent;
}());



/***/ }),

/***/ "./src/app/projeto-edit/projeto-edit.component.css":
/*!*********************************************************!*\
  !*** ./src/app/projeto-edit/projeto-edit.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-edit/projeto-edit.component.html":
/*!**********************************************************!*\
  !*** ./src/app/projeto-edit/projeto-edit.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/projeto\">Projetos</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Editar Projeto</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Editar Projeto</h2>\r\n  <!--<small>Líder do Escritório de Projetos</small>-->\r\n  <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n        <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentProject.name\">\r\n        </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data de Início</label>\r\n                <input class=\"form-control datepicker\" readonly style=\"background: #fff\" value=\"{{initDateStart}}\" #dateStart>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data de Previsão de Términio</label>\r\n                <input class=\"form-control datepicker\" readonly style=\"background: #fff\" value=\"{{initDatePrevision}}\" #datePrevision>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data <b>real</b> de Téminio</label>\r\n                <input class=\"form-control datepicker\" readonly style=\"background: #fff\" value=\"{{initDateEnd}}\" #dateEnd>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Descrição</label>\r\n                <textarea class=\"form-control\" [(ngModel)]=\"currentProject.description\"></textarea>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-2\"></div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Gerente</label>\r\n                <select class=\"form-control custom-select\" [compareWith]=\"byId\" [(ngModel)]=\"currentProject.manager\">\r\n                    <option></option>\r\n                    <ng-template [ngIf]=\"listUsers\">\r\n                        <option *ngFor=\"let c of listUsers\" [ngValue]=\"c\">{{c.name}}</option>\r\n                    </ng-template>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Orçamento</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentProject.budget\">\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Riscos</label>\r\n                <select class=\"form-control custom-select\" #selectRisk>\r\n                    <option value=\"Baixo\" [selected]=\"currentProject.risk == 'Baixo'\">Baixo risco</option>\r\n                    <option value=\"Médio\" [selected]=\"currentProject.risk == 'Médio'\">Médio risco</option>\r\n                    <option value=\"Alto\" [selected]=\"currentProject.risk == 'Alto'\">Alto risco</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Status</label>\r\n                <select class=\"form-control custom-select\" #selectStatus (change)=\"changeStatus($event)\">\r\n                    <option value=\"Em análise\" [selected]=\"currentProject.status == 'Em análise'\">Em análise</option>\r\n                    <option value=\"Análise realizada\" [selected]=\"currentProject.status == 'Análise realizada'\">Análise realizada</option>\r\n                    <option value=\"Análise aprovada\" [selected]=\"currentProject.status == 'Análise aprovada'\">Análise aprovada</option>\r\n                    <option value=\"Iniciado\" [selected]=\"currentProject.status == 'Iniciado'\">Iniciado</option>\r\n                    <option value=\"Planejado\" [selected]=\"currentProject.status == 'Planejado'\">Planejado</option>\r\n                    <option value=\"Em andamento\" [selected]=\"currentProject.status == 'Em andamento'\">Em andamento</option>\r\n                    <option value=\"Encerrado\" [selected]=\"currentProject.status == 'Encerrado'\">Encerrado</option>\r\n                    <option value=\"Cancelado\" [selected]=\"currentProject.status == 'Cancelado'\">Cancelado</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Justificativa de mudança de Status</label>\r\n                <textarea class=\"form-control\" [(ngModel)]=\"currentProject.justification\" [disabled]=\"disbleJustification\"></textarea>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/projeto-edit/projeto-edit.component.ts":
/*!********************************************************!*\
  !*** ./src/app/projeto-edit/projeto-edit.component.ts ***!
  \********************************************************/
/*! exports provided: ProjetoEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoEditComponent", function() { return ProjetoEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
/* harmony import */ var _models_projeto_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_models/projeto.model */ "./src/app/_models/projeto.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjetoEditComponent = /** @class */ (function () {
    function ProjetoEditComponent(projetoService, route, message, location) {
        this.projetoService = projetoService;
        this.route = route;
        this.message = message;
        this.location = location;
        this.currentProject = new _models_projeto_model__WEBPACK_IMPORTED_MODULE_5__["Projeto"]();
        this.disbleJustification = true;
        this.initDateStart = '';
        this.initDateEnd = '';
        this.initDatePrevision = '';
    }
    ProjetoEditComponent.prototype.ngOnInit = function () {
        // jquery datepicker
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR'
        });
        //
        this.getProjeto();
    };
    ProjetoEditComponent.prototype.getProjeto = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.projetoService.getProjetoById(id).subscribe(function (prj) {
            _this.currentProject = prj;
            //console.log('projeto-edit.componente.ts ----- ', this.currentProject);
            // formatar e imprimir datas
            if (_this.currentProject.dateStart) {
                var ds = new Date(_this.currentProject.dateStart);
                var ds1 = ds.getDate();
                var ds2 = ds.getMonth();
                var dss = (ds1.toString().length == 1 ? '0' + ds1 : ds1) + '/' + (ds2.toString().length == 1 ? '0' + ds2 : ds2) + '/' + ds.getFullYear();
                _this.initDateStart = dss;
            }
            if (_this.currentProject.dateEnd) {
                var ds = new Date(_this.currentProject.dateEnd);
                var ds1 = ds.getDate();
                var ds2 = ds.getMonth();
                var dss = (ds1.toString().length == 1 ? '0' + ds1 : ds1) + '/' + (ds2.toString().length == 1 ? '0' + ds2 : ds2) + '/' + ds.getFullYear();
                _this.initDateEnd = dss;
            }
            if (_this.currentProject.datePrevision) {
                var ds = new Date(_this.currentProject.datePrevision);
                var ds1 = ds.getDate();
                var ds2 = ds.getMonth();
                var dss = (ds1.toString().length == 1 ? '0' + ds1 : ds1) + '/' + (ds2.toString().length == 1 ? '0' + ds2 : ds2) + '/' + ds.getFullYear();
                _this.initDatePrevision = dss;
            }
        });
        //
        this.getManagers();
    };
    ProjetoEditComponent.prototype.getManagers = function () {
        var _this = this;
        this.projetoService.getGerentes().subscribe(function (obj) {
            _this.listUsers = obj;
        });
    };
    ProjetoEditComponent.prototype.byId = function (item1, item2) {
        return item1._id === item2._id;
    };
    ProjetoEditComponent.prototype.onSave = function () {
        var _this = this;
        if (this.validate()) {
            // post service
            this.projetoService.putProjeto(this.currentProject).subscribe(function () {
                _this.goBack(); // ou faz uma rota para a lista de projetos?
            });
        }
    };
    ProjetoEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjetoEditComponent.prototype.validate = function () {
        if (this.dateStart.nativeElement.value != '')
            this.currentProject.dateStart = new Date(this.formatDate(this.dateStart.nativeElement.value));
        if (this.dateEnd.nativeElement.value != '')
            this.currentProject.dateEnd = new Date(this.formatDate(this.dateEnd.nativeElement.value));
        if (this.datePrevision.nativeElement.value != '')
            this.currentProject.datePrevision = new Date(this.formatDate(this.datePrevision.nativeElement.value));
        this.currentProject.risk = this.selectRisk.nativeElement.value;
        this.currentProject.status = this.selectStatus.nativeElement.value;
        console.log('projeto-edit.component.ts ---- projeto antes de ser salvo', this.currentProject);
        if (!this.disbleJustification && this.currentProject.justification == undefined) {
            console.log('projeto-edit.componente.ts ----- É necessário escrever uma justificativa');
            this.message.warning('Essa mudança de status exige que uma justificativa seja informada');
            return false;
            // TODO mandar tbm o usuario e a data da alteração de status!!!!!!!!!! tenho que pegar o usuário logado!!!!!!!!!!!
            // o status não deve ser alterado aqui!!!!!!!!!!!! tem que ter uma tela só pra ele!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        //
        return true;
    };
    ProjetoEditComponent.prototype.formatDate = function (data) {
        if (data == '' || data == undefined)
            return null;
        var dia = data.substr(0, 2);
        var mes = data.substr(3, 2);
        var ano = data.substr(6, 4);
        return mes + '/' + dia + '/' + ano;
    };
    ProjetoEditComponent.prototype.changeStatus = function ($event) {
        //console.log($event.target.value);
        if ($event.target.value == 'Cancelado' || $event.target.value == 'Análise aprovada') {
            this.disbleJustification = false;
        }
        else {
            this.disbleJustification = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dateStart'),
        __metadata("design:type", Object)
    ], ProjetoEditComponent.prototype, "dateStart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('datePrevision'),
        __metadata("design:type", Object)
    ], ProjetoEditComponent.prototype, "datePrevision", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dateEnd'),
        __metadata("design:type", Object)
    ], ProjetoEditComponent.prototype, "dateEnd", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectRisk'),
        __metadata("design:type", Object)
    ], ProjetoEditComponent.prototype, "selectRisk", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectStatus'),
        __metadata("design:type", Object)
    ], ProjetoEditComponent.prototype, "selectStatus", void 0);
    ProjetoEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-edit',
            template: __webpack_require__(/*! ./projeto-edit.component.html */ "./src/app/projeto-edit/projeto-edit.component.html"),
            styles: [__webpack_require__(/*! ./projeto-edit.component.css */ "./src/app/projeto-edit/projeto-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__["ProjetoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], ProjetoEditComponent);
    return ProjetoEditComponent;
}());



/***/ }),

/***/ "./src/app/projeto-equipe/projeto-equipe.component.css":
/*!*************************************************************!*\
  !*** ./src/app/projeto-equipe/projeto-equipe.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-equipe/projeto-equipe.component.html":
/*!**************************************************************!*\
  !*** ./src/app/projeto-equipe/projeto-equipe.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/projeto\">Projetos</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Equipe do Projeto</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Equipe do Projeto</h2>\r\n  <hr>\r\n  <h3>Nome do Projeto: {{projetoRef.name}}</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4 mb-4\">\r\n            <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                <span class=\"text-muted\">Equipe do Projeto</span>\r\n                <span class=\"badge badge-secondary badge-pill\">{{projetoUsuariosAlocados.length}}</span>\r\n            </h4>\r\n            <ul class=\"list-group mb-3\">\r\n                <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let usu of projetoUsuariosAlocados\">\r\n                    <div>\r\n                        <h6 class=\"my-0\">{{usu.name}}</h6>\r\n                        <small class=\"text-muted\">{{usu.role}}</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"removeUser(usu)\">Retirar</button>\r\n                </li>\r\n              <!--\r\n                <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                    <div>\r\n                        <h6 class=\"my-0\">Beltrano</h6>\r\n                        <small class=\"text-muted\">Perfil</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\">Retirar</button>\r\n                </li>\r\n                <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                    <div>\r\n                        <h6 class=\"my-0\">Cicrano</h6>\r\n                        <small class=\"text-muted\">Perfil</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\">Retirar</button>\r\n                </li>\r\n                <li class=\"list-group-item d-flex justify-content-between\">\r\n                    <div class=\"text-success\">\r\n                        <h6 class=\"my-0\">Promo code </h6>\r\n                        <small>Perfil</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\">Retirar</button>\r\n                </li>\r\n              -->\r\n              <!--\r\n                <li class=\"list-group-item d-flex justify-content-between\">\r\n                    <span>Total</span>\r\n                    <strong>4</strong>\r\n                </li>\r\n              -->\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-md-1\"></div>\r\n        <div class=\"col-md-4 mb-4\">\r\n            <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                <span class=\"text-muted\">Membros disponíveis</span>\r\n                <span class=\"badge badge-secondary badge-pill\">{{usuarioRef.length}}</span>\r\n            </h4>\r\n            <ul class=\"list-group mb-3\">\r\n                <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let user of usuarioRef\">\r\n                    <div>\r\n                        <h6 class=\"my-0\">{{user.name}}</h6>\r\n                        <small class=\"text-muted\">{{user.role}}</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"insertUser(user)\">Inserir</button>\r\n                </li>\r\n                <!--\r\n                <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                    <div>\r\n                        <h6 class=\"my-0\">Beltrano</h6>\r\n                        <small class=\"text-muted\">Perfil</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\">Inserir</button>\r\n                </li>\r\n                <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\r\n                    <div>\r\n                        <h6 class=\"my-0\">Cicrano</h6>\r\n                        <small class=\"text-muted\">Perfil</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\">Inserir</button>\r\n                </li>\r\n                <li class=\"list-group-item d-flex justify-content-between bg-light\">\r\n                    <div class=\"text-success\">\r\n                        <h6 class=\"my-0\">Promo code fdjklfj jf dsfjklsdj fksdjfkl</h6>\r\n                        <small>Perfil</small>\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-secondary\">Inserir</button>\r\n                </li>\r\n                <li class=\"list-group-item d-flex justify-content-between\">\r\n                    <span>Total</span>\r\n                    <strong>4</strong>\r\n                </li>\r\n                -->\r\n            </ul>\r\n            <!-- \r\n            <form class=\"card p-2\">\r\n                <div class=\"input-group\">\r\n                    <input class=\"form-control\" placeholder=\"Promo code\" type=\"text\">\r\n                    <div class=\"input-group-append\">\r\n                        <button type=\"submit\" class=\"btn btn-secondary\">Redeem</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n            -->\r\n        </div>\r\n        <div class=\"col-md-3\"></div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <!-- -->\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/projeto-equipe/projeto-equipe.component.ts":
/*!************************************************************!*\
  !*** ./src/app/projeto-equipe/projeto-equipe.component.ts ***!
  \************************************************************/
/*! exports provided: ProjetoEquipeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoEquipeComponent", function() { return ProjetoEquipeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
/* harmony import */ var _usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../usuario-service/usuario.service */ "./src/app/usuario-service/usuario.service.ts");
/* harmony import */ var _models_projeto_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/projeto.model */ "./src/app/_models/projeto.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjetoEquipeComponent = /** @class */ (function () {
    function ProjetoEquipeComponent(projetoService, usuarioService, route, location, message) {
        this.projetoService = projetoService;
        this.usuarioService = usuarioService;
        this.route = route;
        this.location = location;
        this.message = message;
        this.projetoRef = new _models_projeto_model__WEBPACK_IMPORTED_MODULE_6__["Projeto"](); // cria um novo 'new ...()' pq ele precisa ser carregado, mesmo que vazio, na view antes do ajax retornar algo
        this.usuarioRef = [];
        this.projetoUsuariosAlocados = new Array();
    }
    ProjetoEquipeComponent.prototype.ngOnInit = function () {
        this.getProjetoById();
        this.getUsuarios();
    };
    ProjetoEquipeComponent.prototype.getProjetoById = function () {
        var _this = this;
        // pega ID da url
        var id = this.route.snapshot.paramMap.get('id');
        this.projetoService.getProjetoById(id).subscribe(function (prj) {
            _this.projetoRef = prj;
            _this.projetoUsuariosAlocados = prj.team;
            console.log('projeto-equipe.component.ts ----- get projeto', prj);
            _this.checkAlocadosDisponiveis();
        });
    };
    ProjetoEquipeComponent.prototype.getUsuarios = function () {
        var _this = this;
        this.usuarioService.getUsuarios().subscribe(function (usrs) {
            _this.usuarioRef = usrs;
            console.log('projeto-equipe.component.ts ----- get usuarios', usrs);
            _this.checkAlocadosDisponiveis();
        });
    };
    ProjetoEquipeComponent.prototype.onSave = function () {
        var _this = this;
        this.projetoRef.team = this.projetoUsuariosAlocados;
        this.projetoService.putProjeto(this.projetoRef, 'equipe').subscribe(function (prj) {
            console.log('projeto-equipe.component.ts ----- projeto editado', prj);
            if (_this.projetoRef.team.length == 0) {
                _this.message.warning('Nenhum projeto deveria ficar sem time', false);
            }
        });
    };
    ProjetoEquipeComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjetoEquipeComponent.prototype.removeUser = function (usuario) {
        this.projetoUsuariosAlocados = this.projetoUsuariosAlocados.filter(function (el) {
            return el._id !== usuario._id;
        });
        this.usuarioRef.push(usuario);
    };
    ProjetoEquipeComponent.prototype.insertUser = function (usuario) {
        //const newUsr = { _id: id, name: name };
        this.projetoUsuariosAlocados.push(usuario);
        this.usuarioRef = this.usuarioRef.filter(function (el) {
            return el._id !== usuario._id;
        });
    };
    ProjetoEquipeComponent.prototype.checkAlocadosDisponiveis = function () {
        var _this = this;
        // é chamada pelos métodos que recebem requisições
        // é verificado se as duas já foram feitas, então executa a compraração
        if (this.projetoRef._id !== '' && this.projetoRef._id !== undefined && this.usuarioRef.length > 0) {
            var _loop_1 = function (i) {
                // retira, com um filtro, do array dos disponíveis aqueles que encontrar
                this_1.usuarioRef = this_1.usuarioRef.filter(function (el) {
                    return el._id !== _this.projetoUsuariosAlocados[i]._id;
                });
            };
            var this_1 = this;
            // faz um loop na array dos alocados
            for (var i = 0; i < this.projetoUsuariosAlocados.length; i++) {
                _loop_1(i);
            }
        }
    };
    ProjetoEquipeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-equipe',
            template: __webpack_require__(/*! ./projeto-equipe.component.html */ "./src/app/projeto-equipe/projeto-equipe.component.html"),
            styles: [__webpack_require__(/*! ./projeto-equipe.component.css */ "./src/app/projeto-equipe/projeto-equipe.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__["ProjetoService"],
            _usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], ProjetoEquipeComponent);
    return ProjetoEquipeComponent;
}());



/***/ }),

/***/ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/projeto-indicador-fase/projeto-indicador-fase.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/projeto-indicador-fase/projeto-indicador-fase.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/projeto\">Projetos</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Indicadores do Projeto</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Indicadores do Projeto</h2>\r\n  <hr>\r\n\r\n  <h4>Nome do Projeto: {{projetoRef.name}}</h4>\r\n\r\n  <div class=\"accordion mt-3\" id=\"accordionExample\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\" id=\"headingOne\">\r\n      <h5 class=\"mb-0\">\r\n        <button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\r\n          Fase 1 - Iniciação ou Conceito\r\n          <span class=\"badge badge-secondary badge-pill ml-2\">{{projetoIndicadoresSelecionadosF1.length}}</span>\r\n        </button>\r\n      </h5>\r\n    </div>\r\n    <div id=\"collapseOne\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\"> <!-- class=show para iniciar aberto -->\r\n      <div class=\"card-body\">\r\n        \r\n          <div class=\"row\">\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores do Projeto - Fase 1</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{projetoIndicadoresSelecionadosF1.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind1 of projetoIndicadoresSelecionadosF1\">\r\n                        <div>\r\n                            <h6 class=\"mt-2\"><b>{{ind1.name}}</b></h6>\r\n                            <div class=\"row mt-3\">\r\n                              <div class=\"col-5\">\r\n                                <div class=\"form-group\">\r\n                                  <label class=\"small\">Valor</label>\r\n                                  <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"ind1.value\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row mt-1\">\r\n                              <div class=\"col-12\">\r\n                                  <label class=\"small\">Valores limítrofes (para controle do indicador)</label>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Mínimo\" type=\"text\" [(ngModel)]=\"ind1.min\">-->\r\n                                    Mínimo: {{ind1.min}}\r\n                                </div>\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Máximo\" type=\"text\" [(ngModel)]=\"ind1.max\">-->\r\n                                    Máximo: {{ind1.max}}\r\n                                </div>\r\n                                <div class=\"col-2\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                          <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"removeItem(ind1, 1)\">&times;</button>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores disponíveis</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{indicadoresRef1.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind of indicadoresRef1\">\r\n                        <div>\r\n                            <h6 class=\"my-0\">{{ind.name}}</h6>\r\n                        </div>\r\n                        <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"insertItem(ind, 1)\">Inserir</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\" id=\"headingTwo\">\r\n      <h5 class=\"mb-0\">\r\n        <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n          Fase 2 - Elaboração\r\n          <span class=\"badge badge-secondary badge-pill ml-2\">{{projetoIndicadoresSelecionadosF2.length}}</span>\r\n        </button>\r\n      </h5>\r\n    </div>\r\n    <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\" data-parent=\"#accordionExample\">\r\n      <div class=\"card-body\">\r\n        \r\n          <div class=\"row\">\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores do Projeto - Fase 2</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{projetoIndicadoresSelecionadosF2.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind2 of projetoIndicadoresSelecionadosF2\">\r\n                        <div>\r\n                            <h6 class=\"mt-2\"><b>{{ind2.name}}</b></h6>\r\n                            <div class=\"row mt-3\">\r\n                              <div class=\"col-5\">\r\n                                <div class=\"form-group\">\r\n                                  <label class=\"small\">Valor</label>\r\n                                  <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"ind2.value\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row mt-1\">\r\n                              <div class=\"col-12\">\r\n                                  <label class=\"small\">Valores limítrofes (para controle do indicador)</label>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Mínimo\" type=\"text\" [(ngModel)]=\"ind2.min\">-->\r\n                                    Mínimo: {{ind2.min}}\r\n                                </div>\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Máximo\" type=\"text\" [(ngModel)]=\"ind2.max\">-->\r\n                                    Máximo: {{ind2.max}}\r\n                                </div>\r\n                                <div class=\"col-2\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                          <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"removeItem(ind2, 2)\">&times;</button>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores disponíveis</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{indicadoresRef2.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind of indicadoresRef2\">\r\n                        <div>\r\n                            <h6 class=\"my-0\">{{ind.name}}</h6>\r\n                        </div>\r\n                        <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"insertItem(ind, 2)\">Inserir</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\" id=\"headingThree\">\r\n      <h5 class=\"mb-0\">\r\n        <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n          Fase 3 - Construção\r\n          <span class=\"badge badge-secondary badge-pill ml-2\">{{projetoIndicadoresSelecionadosF3.length}}</span>\r\n        </button>\r\n      </h5>\r\n    </div>\r\n    <div id=\"collapseThree\" class=\"collapse\" aria-labelledby=\"headingThree\" data-parent=\"#accordionExample\">\r\n      <div class=\"card-body\">\r\n        \r\n          <div class=\"row\">\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores do Projeto - Fase 3</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{projetoIndicadoresSelecionadosF3.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind3 of projetoIndicadoresSelecionadosF3\">\r\n                        <div>\r\n                            <h6 class=\"mt-2\"><b>{{ind3.name}}</b></h6>\r\n                            <div class=\"row mt-3\">\r\n                              <div class=\"col-5\">\r\n                                <div class=\"form-group\">\r\n                                  <label class=\"small\">Valor</label>\r\n                                  <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"ind3.value\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row mt-1\">\r\n                              <div class=\"col-12\">\r\n                                  <label class=\"small\">Valores limítrofes (para controle do indicador)</label>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Mínimo\" type=\"text\" [(ngModel)]=\"ind3.min\">-->\r\n                                    Mínimo: {{ind3.min}}\r\n                                </div>\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Máximo\" type=\"text\" [(ngModel)]=\"ind3.max\">-->\r\n                                    Máximo: {{ind3.max}}\r\n                                </div>\r\n                                <div class=\"col-2\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                          <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"removeItem(ind3, 3)\">&times;</button>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores disponíveis</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{indicadoresRef3.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind of indicadoresRef3\">\r\n                        <div>\r\n                            <h6 class=\"my-0\">{{ind.name}}</h6>\r\n                        </div>\r\n                        <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"insertItem(ind, 3)\">Inserir</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\" id=\"headingFour\">\r\n      <h5 class=\"mb-0\">\r\n        <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseFour\" aria-expanded=\"false\" aria-controls=\"collapseFour\">\r\n          Fase 4 - Transição\r\n          <span class=\"badge badge-secondary badge-pill ml-2\">{{projetoIndicadoresSelecionadosF4.length}}</span>\r\n        </button>\r\n      </h5>\r\n    </div>\r\n    <div id=\"collapseFour\" class=\"collapse\" aria-labelledby=\"headingFour\" data-parent=\"#accordionExample\">\r\n      <div class=\"card-body\">\r\n        \r\n          <div class=\"row\">\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores do Projeto - Fase 4</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{projetoIndicadoresSelecionadosF4.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind4 of projetoIndicadoresSelecionadosF4\">\r\n                        <div>\r\n                            <h6 class=\"mt-2\"><b>{{ind4.name}}</b></h6>\r\n                            <div class=\"row mt-3\">\r\n                              <div class=\"col-5\">\r\n                                <div class=\"form-group\">\r\n                                  <label class=\"small\">Valor</label>\r\n                                  <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"ind4.value\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                              <div class=\"col-12\">\r\n                                  <label class=\"small\">Valores limítrofes (para controle do indicador)</label>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row mt-1\">\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Mínimo\" type=\"text\" [(ngModel)]=\"ind4.min\">-->\r\n                                    Mínimo: {{ind4.min}}\r\n                                </div>\r\n                                <div class=\"col-5\">\r\n                                    <!--<input class=\"form-control form-control-sm\" placeholder=\"Máximo\" type=\"text\" [(ngModel)]=\"ind4.max\">-->\r\n                                    Máximo: {{ind4.max}}\r\n                                </div>\r\n                                <div class=\"col-2\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                          <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"removeItem(ind4, 4)\">&times;</button>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores disponíveis</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{indicadoresRef4.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind of indicadoresRef4\">\r\n                        <div>\r\n                            <h6 class=\"my-0\">{{ind.name}}</h6>\r\n                        </div>\r\n                        <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"insertItem(ind, 4)\">Inserir</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n    \r\n    <div class=\"row\">\r\n      <!-- -->\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/projeto-indicador-fase/projeto-indicador-fase.component.ts ***!
  \****************************************************************************/
/*! exports provided: ProjetoIndicadorFaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoIndicadorFaseComponent", function() { return ProjetoIndicadorFaseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
/* harmony import */ var _models_projeto_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_models/projeto.model */ "./src/app/_models/projeto.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { IndicadorService } from '../indicador-service/indicador.service';

var ProjetoIndicadorFaseComponent = /** @class */ (function () {
    function ProjetoIndicadorFaseComponent(projetoService, 
    //private indicadorService: IndicadorService,
    route, location, message) {
        this.projetoService = projetoService;
        this.route = route;
        this.location = location;
        this.message = message;
        this.projetoRef = new _models_projeto_model__WEBPACK_IMPORTED_MODULE_5__["Projeto"](); // cria um novo 'new ...()' pq ele precisa ser carregado, mesmo que vazio, na view antes do ajax retornar algo
        this.indicadoresRef1 = [];
        this.indicadoresRef2 = [];
        this.indicadoresRef3 = [];
        this.indicadoresRef4 = [];
        this.projetoIndicadoresSelecionadosF1 = new Array();
        this.projetoIndicadoresSelecionadosF2 = new Array();
        this.projetoIndicadoresSelecionadosF3 = new Array();
        this.projetoIndicadoresSelecionadosF4 = new Array();
    }
    ProjetoIndicadorFaseComponent.prototype.ngOnInit = function () {
        this.getProjetoById();
        //this.getIndicadores();
    };
    ProjetoIndicadorFaseComponent.prototype.getProjetoById = function () {
        var _this = this;
        // pega ID da url
        var id = this.route.snapshot.paramMap.get('id');
        this.projetoService.getProjetoById(id).subscribe(function (prj) {
            _this.projetoRef = prj;
            _this.projetoIndicadoresSelecionadosF1 = prj.phases['phase1'];
            _this.projetoIndicadoresSelecionadosF2 = prj.phases['phase2'];
            _this.projetoIndicadoresSelecionadosF3 = prj.phases['phase3'];
            _this.projetoIndicadoresSelecionadosF4 = prj.phases['phase4'];
            // JSON.stringfy() é usado aqui para criar clones de prj.indicators
            _this.indicadoresRef1 = JSON.parse(JSON.stringify(prj.indicators));
            _this.indicadoresRef2 = JSON.parse(JSON.stringify(prj.indicators));
            _this.indicadoresRef3 = JSON.parse(JSON.stringify(prj.indicators));
            _this.indicadoresRef4 = JSON.parse(JSON.stringify(prj.indicators));
            console.log('get projeto', prj);
            //this.checkSelecionadosDisponiveis();
        });
    };
    /*getIndicadores() {
      this.indicadorService.getIndicadores().subscribe(
        (inds) => {
          // usar JSON.parse(JSON.stringify(inds)); para criar 'clones' de inds
          this.indicadoresRef1 = JSON.parse(JSON.stringify(inds));
          this.indicadoresRef2 = JSON.parse(JSON.stringify(inds));
          this.indicadoresRef3 = JSON.parse(JSON.stringify(inds));
          this.indicadoresRef4 = JSON.parse(JSON.stringify(inds));
          console.log('get indicadores', inds);
          this.checkSelecionadosDisponiveis();
        }
      );
    }*/
    ProjetoIndicadorFaseComponent.prototype.onSave = function () {
        var _this = this;
        this.projetoRef.phases['phase1'] = this.projetoIndicadoresSelecionadosF1;
        this.projetoRef.phases['phase2'] = this.projetoIndicadoresSelecionadosF2;
        this.projetoRef.phases['phase3'] = this.projetoIndicadoresSelecionadosF3;
        this.projetoRef.phases['phase4'] = this.projetoIndicadoresSelecionadosF4;
        console.log('o que vai ser salvo', this.projetoRef);
        this.projetoService.putProjeto(this.projetoRef, 'indicador-fase').subscribe(function (prj) {
            console.log('projeto editado', prj);
            if (_this.projetoRef.phases.phase1.length == 0 &&
                _this.projetoRef.phases.phase2.length == 0 &&
                _this.projetoRef.phases.phase3.length == 0 &&
                _this.projetoRef.phases.phase4.length == 0) {
                _this.message.warning('Nenhum projeto deveria ficar sem indicadores', false);
            }
        });
        /**/
    };
    ProjetoIndicadorFaseComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjetoIndicadorFaseComponent.prototype.removeItem = function (indicador, fase) {
        switch (fase) {
            case 1:
                this.projetoIndicadoresSelecionadosF1 = this.projetoIndicadoresSelecionadosF1.filter(function (el) {
                    return el._id !== indicador._id;
                });
                this.indicadoresRef1.push(indicador);
                break;
            case 2:
                this.projetoIndicadoresSelecionadosF2 = this.projetoIndicadoresSelecionadosF2.filter(function (el) {
                    return el._id !== indicador._id;
                });
                this.indicadoresRef2.push(indicador);
                break;
            case 3:
                this.projetoIndicadoresSelecionadosF3 = this.projetoIndicadoresSelecionadosF3.filter(function (el) {
                    return el._id !== indicador._id;
                });
                this.indicadoresRef3.push(indicador);
                break;
            case 4:
                this.projetoIndicadoresSelecionadosF4 = this.projetoIndicadoresSelecionadosF4.filter(function (el) {
                    return el._id !== indicador._id;
                });
                this.indicadoresRef4.push(indicador);
                break;
        }
    };
    ProjetoIndicadorFaseComponent.prototype.insertItem = function (indicador, fase) {
        switch (fase) {
            case 1:
                this.projetoIndicadoresSelecionadosF1.push(indicador);
                this.indicadoresRef1 = this.indicadoresRef1.filter(function (el) {
                    return el._id !== indicador._id;
                });
                break;
            case 2:
                this.projetoIndicadoresSelecionadosF2.push(indicador);
                this.indicadoresRef2 = this.indicadoresRef2.filter(function (el) {
                    return el._id !== indicador._id;
                });
                break;
            case 3:
                this.projetoIndicadoresSelecionadosF3.push(indicador);
                this.indicadoresRef3 = this.indicadoresRef3.filter(function (el) {
                    return el._id !== indicador._id;
                });
                break;
            case 4:
                this.projetoIndicadoresSelecionadosF4.push(indicador);
                this.indicadoresRef4 = this.indicadoresRef4.filter(function (el) {
                    return el._id !== indicador._id;
                });
                break;
        }
    };
    ProjetoIndicadorFaseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-indicador-fase',
            template: __webpack_require__(/*! ./projeto-indicador-fase.component.html */ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.html"),
            styles: [__webpack_require__(/*! ./projeto-indicador-fase.component.css */ "./src/app/projeto-indicador-fase/projeto-indicador-fase.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__["ProjetoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], ProjetoIndicadorFaseComponent);
    return ProjetoIndicadorFaseComponent;
}());



/***/ }),

/***/ "./src/app/projeto-indicador/projeto-indicador.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/projeto-indicador/projeto-indicador.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-indicador/projeto-indicador.component.html":
/*!********************************************************************!*\
  !*** ./src/app/projeto-indicador/projeto-indicador.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/projeto\">Projetos</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Seleção de Indicadores do Projeto</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Seleção de Indicadores do Projeto</h2>\r\n  <hr>\r\n\r\n  <h4>Nome do Projeto: {{projetoRef.name}}</h4>\r\n        \r\n  <br>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores do Projeto</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{projetoIndicadoresSelecionados.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind1 of projetoIndicadoresSelecionados\">\r\n                        <div>\r\n                            <h6 class=\"mt-2\"><b>{{ind1.name}}</b></h6>\r\n                          <!--\r\n                            <div class=\"row mt-4\">\r\n                              <div class=\"col-5\">\r\n                                <div class=\"form-group\">\r\n                                  <label class=\"small\">Valor</label>\r\n                                  <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"ind1.value\">\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          -->\r\n                            <div class=\"row mt-2\">\r\n                              <div class=\"col-12\">\r\n                                  <label class=\"small\">Valores limítrofes (para controle do indicador)</label>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-5\">\r\n                                    <input class=\"form-control form-control-sm\" placeholder=\"Mínimo\" type=\"text\" [(ngModel)]=\"ind1.min\">\r\n                                </div>\r\n                                <div class=\"col-5\">\r\n                                    <input class=\"form-control form-control-sm\" placeholder=\"Máximo\" type=\"text\" [(ngModel)]=\"ind1.max\">\r\n                                </div>\r\n                                <div class=\"col-2\"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div>\r\n                          <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"removeItem(ind1)\">&times;</button>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n            <div class=\"col-md-5 mb-4\">\r\n                <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\r\n                    <span class=\"text-muted\">Indicadores disponíveis</span>\r\n                    <span class=\"badge badge-secondary badge-pill\">{{indicadoresRef.length}}</span>\r\n                </h4>\r\n                <ul class=\"list-group mb-3\">\r\n                    <li class=\"list-group-item d-flex justify-content-between lh-condensed\" *ngFor=\"let ind of indicadoresRef\">\r\n                        <div>\r\n                            <h6 class=\"my-0\">{{ind.name}}</h6>\r\n                        </div>\r\n                        <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"insertItem(ind)\">Inserir</button>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col-md-1\"></div>\r\n        </div>\r\n\r\n    <div class=\"row\">\r\n      <!-- -->\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/projeto-indicador/projeto-indicador.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/projeto-indicador/projeto-indicador.component.ts ***!
  \******************************************************************/
/*! exports provided: ProjetoIndicadorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoIndicadorComponent", function() { return ProjetoIndicadorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
/* harmony import */ var _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../indicador-service/indicador.service */ "./src/app/indicador-service/indicador.service.ts");
/* harmony import */ var _models_projeto_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/projeto.model */ "./src/app/_models/projeto.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjetoIndicadorComponent = /** @class */ (function () {
    function ProjetoIndicadorComponent(projetoService, indicadorService, route, location, message) {
        this.projetoService = projetoService;
        this.indicadorService = indicadorService;
        this.route = route;
        this.location = location;
        this.message = message;
        this.projetoRef = new _models_projeto_model__WEBPACK_IMPORTED_MODULE_6__["Projeto"](); // cria um novo 'new ...()' pq ele precisa ser carregado, mesmo que vazio, na view antes do ajax retornar algo
        this.indicadoresRef = [];
        this.projetoIndicadoresSelecionados = new Array();
    }
    ProjetoIndicadorComponent.prototype.ngOnInit = function () {
        this.getProjetoById();
        this.getIndicadores();
    };
    ProjetoIndicadorComponent.prototype.getProjetoById = function () {
        var _this = this;
        // pega ID da url
        var id = this.route.snapshot.paramMap.get('id');
        this.projetoService.getProjetoById(id).subscribe(function (prj) {
            _this.projetoRef = prj;
            _this.projetoIndicadoresSelecionados = prj.indicators;
            console.log('get projeto', prj);
            _this.checkSelecionadosDisponiveis();
        });
    };
    ProjetoIndicadorComponent.prototype.getIndicadores = function () {
        var _this = this;
        this.indicadorService.getIndicadores().subscribe(function (inds) {
            // usar JSON.parse(JSON.stringify(inds)); para criar 'clones' de inds
            _this.indicadoresRef = JSON.parse(JSON.stringify(inds));
            console.log('get indicadores', inds);
            _this.checkSelecionadosDisponiveis();
        });
    };
    ProjetoIndicadorComponent.prototype.onSave = function () {
        var _this = this;
        this.projetoRef.indicators = this.projetoIndicadoresSelecionados;
        console.log('o que vai ser salvo', this.projetoRef);
        this.projetoService.putProjeto(this.projetoRef, 'indicador').subscribe(function (prj) {
            console.log('projeto editado', prj);
            if (_this.projetoRef.indicators.length == 0) {
                _this.message.warning('Nenhum projeto deveria ficar sem indicadores', false);
            }
        });
        /**/
    };
    ProjetoIndicadorComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjetoIndicadorComponent.prototype.removeItem = function (indicador) {
        this.projetoIndicadoresSelecionados = this.projetoIndicadoresSelecionados.filter(function (el) {
            return el._id !== indicador._id;
        });
        this.indicadoresRef.push(indicador);
    };
    ProjetoIndicadorComponent.prototype.insertItem = function (indicador) {
        this.projetoIndicadoresSelecionados.push(indicador);
        this.indicadoresRef = this.indicadoresRef.filter(function (el) {
            return el._id !== indicador._id;
        });
    };
    ProjetoIndicadorComponent.prototype.checkSelecionadosDisponiveis = function () {
        var _this = this;
        // é chamada pelos métodos que recebem requisições
        // é verificado se as duas já foram feitas, então executa a compraração
        if (this.projetoRef._id !== '' && this.projetoRef._id !== undefined && this.indicadoresRef.length > 0) {
            var _loop_1 = function (i) {
                // retira, com um filtro, do array dos disponíveis aqueles que encontrar
                this_1.indicadoresRef = this_1.indicadoresRef.filter(function (el) {
                    return el._id !== _this.projetoIndicadoresSelecionados[i]._id;
                });
            };
            var this_1 = this;
            // faz um loop na array dos alocados
            for (var i = 0; i < this.projetoIndicadoresSelecionados.length; i++) {
                _loop_1(i);
            }
            //
        }
    };
    ProjetoIndicadorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-indicador',
            template: __webpack_require__(/*! ./projeto-indicador.component.html */ "./src/app/projeto-indicador/projeto-indicador.component.html"),
            styles: [__webpack_require__(/*! ./projeto-indicador.component.css */ "./src/app/projeto-indicador/projeto-indicador.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__["ProjetoService"],
            _indicador_service_indicador_service__WEBPACK_IMPORTED_MODULE_5__["IndicadorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], ProjetoIndicadorComponent);
    return ProjetoIndicadorComponent;
}());



/***/ }),

/***/ "./src/app/projeto-list/projeto-list.component.css":
/*!*********************************************************!*\
  !*** ./src/app/projeto-list/projeto-list.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-list/projeto-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/projeto-list/projeto-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Projetos</li>\r\n    </ol>\r\n  </nav>\r\n  <!--\r\n  <h1>Lista de Projetos</h1>\r\n  <hr>\r\n  <h2>Filtros</h2>\r\n  <div class=\"row\">\r\n    <div class=\"col-4\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <button type=\"button\" class=\"btn btn-primary\">Filtrar</button>\r\n            <button type=\"button\" class=\"btn btn-secondary\">Limpar</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"col-8\">\r\n\r\n    </div>\r\n  </div>\r\n-->\r\n  <hr>\r\n  <h2>\r\n    Lista de Projetos\r\n    <div class=\"float-right\"><button type=\"button\" class=\"btn btn-primary\" (click)=\"onNewProject()\">+ novo projeto</button></div>\r\n  </h2>\r\n  <div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th>Projeto</th>\r\n          <th>Equipe</th>\r\n          <th>Indicadores</th>\r\n          <th>Situação</th>\r\n          <th class=\"w20p\">Ações</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let projeto of projetoList\">\r\n          <td>{{projeto.name}}</td>\r\n          <td>\r\n             {{ projeto.team.length > 0 ? ( projeto.team.length > 1 ? projeto.team.length+' membros' : '1 membro' ) : 'Sem equipe' }}\r\n             &nbsp;\r\n             <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"onSelectTeam(projeto._id)\" *ngIf=\"auth.permissionList.indexOf('/projeto-equipe') >= 0\">\r\n              gerir equipe\r\n            </button>           \r\n          </td>\r\n          <td>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"onSelectIndicators(projeto._id)\" *ngIf=\"auth.permissionList.indexOf('/projeto-indicador') >= 0\">\r\n              relacionar indicadores ao projeto\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"onSelectIndicatorsPhases(projeto._id)\" *ngIf=\"auth.permissionList.indexOf('/projeto-indicador-fase') >= 0\">\r\n              gerir indicadores por fases\r\n            </button>\r\n          </td>\r\n          <td>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"onSelectStatus(projeto._id)\" *ngIf=\"auth.permissionList.indexOf('/projeto-status') >= 0\">\r\n              gerir status\r\n            </button>\r\n          </td>\r\n          <td>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"onSelectEditProjeto(projeto._id)\">\r\n              editar\r\n            </button>\r\n            &nbsp;\r\n            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#exampleModal\" (click)=\"onSelectDeleteProjeto(projeto._id)\">\r\n              excluir\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n  <!--\r\n    <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modal title</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"onDeselectDeleteOkProjeto()\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n  -->\r\n    <div class=\"modal-body\">\r\n        Deseja realmente excluir este Projeto?\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary btn-sm\" data-dismiss=\"modal\" (click)=\"onDeselectDeleteOkProjeto()\">Cancelar</button>\r\n        &nbsp;\r\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" data-dismiss=\"modal\" (click)=\"onSelectDeleteOkProjeto()\">Excluir</button>\r\n    </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/projeto-list/projeto-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/projeto-list/projeto-list.component.ts ***!
  \********************************************************/
/*! exports provided: ProjetoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoListComponent", function() { return ProjetoListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_auth_service_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_controllers/auth/service/auth.service */ "./src/app/_controllers/auth/service/auth.service.ts");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjetoListComponent = /** @class */ (function () {
    function ProjetoListComponent(projetoService, router, auth) {
        this.projetoService = projetoService;
        this.router = router;
        this.auth = auth;
    }
    ProjetoListComponent.prototype.ngOnInit = function () {
        // inicia a página e carrega a lista de produtos do serviço
        this.getProjetos();
    };
    ProjetoListComponent.prototype.getProjetos = function () {
        // this.projeto_list = this.projetoService.getProjetos();
        var that = this;
        this.projetoService.getProjetos().subscribe(function (projetos) {
            //console.log('projeto-list.component.js --- getProjetos()', projetos);
            that.projetoList = projetos;
        });
    };
    ProjetoListComponent.prototype.onNewProject = function () {
        //console.log('projeto-list.component.js --- indo para um novo projeto...');
        this.router.navigate(['/projeto/create']);
    };
    ProjetoListComponent.prototype.onSelectTeam = function (id) {
        //console.log('projeto-list.component.js --- selecionar time para projeto id', id);
        this.router.navigate(['/projeto/equipe/' + id]);
    };
    ProjetoListComponent.prototype.onSelectStatus = function (id) {
        //console.log('projeto-list.component.js --- selecionar status para projeto id', id);
        this.router.navigate(['/projeto/status/' + id]);
    };
    ProjetoListComponent.prototype.onSelectIndicators = function (id) {
        //console.log('projeto-list.component.js --- selecionar indicadores para projeto id', id);
        this.router.navigate(['/projeto/indicador/' + id]);
    };
    ProjetoListComponent.prototype.onSelectIndicatorsPhases = function (id) {
        //console.log('projeto-list.component.js --- selecionar indicadores para projeto id', id);
        this.router.navigate(['/projeto/indicador-fase/' + id]);
    };
    ProjetoListComponent.prototype.onSelectEditProjeto = function (idProjeto) {
        //console.log('projeto-list.component.js --- onSelectEditProjeto()');
        this.router.navigate(['/projeto/edit/' + idProjeto]);
    };
    ProjetoListComponent.prototype.onSelectDeleteProjeto = function (idProjeto) {
        //console.log('projeto-list.component.js --- onSelectDeleteProjeto()');
        this.deleteProjectWait = idProjeto;
    };
    ProjetoListComponent.prototype.onSelectDeleteOkProjeto = function () {
        var _this = this;
        //console.log('projeto-list.component.js --- deletando...');
        if (this.deleteProjectWait) {
            //console.log('projeto-list.component.js --- realmente deletando...');
            // chama serviço para deletar Projeto
            this.projetoService.deleteProjeto(this.deleteProjectWait).subscribe(function (obj) {
                //console.log('projeto-list.component.js --- deletado!', obj);
                // o delete retorna uma msg, não um objeto do tipo que o Observable espera
                if (obj && obj['type'] && obj['type'] == 'success') {
                    // atualiza lista de projetos na view
                    _this.projetoList = _this.projetoList.filter(function (el) {
                        return el._id !== _this.deleteProjectWait;
                    });
                    _this.deleteProjectWait = null;
                }
            });
            //this.deleteProjectWait = null;
        }
    };
    ProjetoListComponent.prototype.onDeselectDeleteOkProjeto = function () {
        this.deleteProjectWait = null;
    };
    ProjetoListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-lista',
            template: __webpack_require__(/*! ./projeto-list.component.html */ "./src/app/projeto-list/projeto-list.component.html"),
            styles: [__webpack_require__(/*! ./projeto-list.component.css */ "./src/app/projeto-list/projeto-list.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_3__["ProjetoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _controllers_auth_service_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], ProjetoListComponent);
    return ProjetoListComponent;
}());



/***/ }),

/***/ "./src/app/projeto-services/projeto.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/projeto-services/projeto.service.ts ***!
  \*****************************************************/
/*! exports provided: ProjetoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoService", function() { return ProjetoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjetoService = /** @class */ (function () {
    function ProjetoService(http, message) {
        this.http = http;
        this.message = message;
        this.projetoURL = 'api/projeto';
        this.projetoEquipeURL = 'api/projeto-equipe';
        this.projetoIndicadorURL = 'api/projeto-indicador';
        this.projetoIndicadorFaseURL = 'api/projeto-indicador-fase';
        this.projetoManagerURL = 'api/projeto/manager';
    }
    ProjetoService.prototype.getProjetos = function () {
        return this.http.get(this.projetoURL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getProjetos', [])));
    };
    ProjetoService.prototype.getGerentes = function () {
        return this.http.get(this.projetoManagerURL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getGerentes', [])));
    };
    ProjetoService.prototype.getProjetoById = function (id) {
        return this.http.get(this.projetoURL + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getProjeto')));
    };
    ProjetoService.prototype.postProjeto = function (projeto) {
        var _this = this;
        return this.http.post(this.projetoURL, projeto).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            _this.message.success('Projeto salvo com sucesso.', true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('postProjeto')));
    };
    ProjetoService.prototype.putProjeto = function (projeto, subtype) {
        var _this = this;
        if (subtype === void 0) { subtype = 'projeto'; }
        var putProjetoUrl;
        switch (subtype) {
            case 'projeto':
                putProjetoUrl = this.projetoURL;
                break;
            case 'equipe':
                putProjetoUrl = this.projetoEquipeURL;
                break;
            case 'indicador':
                putProjetoUrl = this.projetoIndicadorURL;
                break;
            case 'indicador-fase':
                putProjetoUrl = this.projetoIndicadorFaseURL;
                break;
        }
        return this.http.put(putProjetoUrl + '/' + projeto._id, projeto).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            _this.message.success('Projeto editado e salvo com sucesso.', true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('putProjeto')));
    };
    ProjetoService.prototype.deleteProjeto = function (id) {
        var _this = this;
        return this.http.delete(this.projetoURL + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (obj) {
            // delete volta apenas mensagem, não um Projeto
            _this.message.success(obj['message'], true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getProjeto')));
    };
    ProjetoService.prototype.log = function (message) {
        // message service
        console.log(message);
    };
    ProjetoService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'Operação '; }
        return function (error) {
            console.error('projeto.service.ts ----- ', error); // log to console instead
            _this.log(operation + " falhou: " + error.message);
            // this.message.error(`${operation} falhou: ${error.message}`, true);
            if (error.error && error.error.message)
                _this.message.error(error.error.message, true);
            else
                _this.message.error('Erro não identificado. [pro.sev.' + operation + ']', true);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    ProjetoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], ProjetoService);
    return ProjetoService;
}());



/***/ }),

/***/ "./src/app/projeto-status/projeto-status.component.css":
/*!*************************************************************!*\
  !*** ./src/app/projeto-status/projeto-status.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projeto-status/projeto-status.component.html":
/*!**************************************************************!*\
  !*** ./src/app/projeto-status/projeto-status.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/projeto\">Projetos</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Editar Status do Projeto</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Editar Status</h2>\r\n  <!--<small>Líder do Escritório de Projetos</small>-->\r\n  <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n        <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"currentProject.name\">\r\n        </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data de Início</label>\r\n                <input class=\"form-control datepicker\" readonly value=\"{{initDateStart}}\" #dateStart>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data de Previsão de Términio</label>\r\n                <input class=\"form-control datepicker\" readonly value=\"{{initDatePrevision}}\" #datePrevision>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Data <b>real</b> de Téminio</label>\r\n                <input class=\"form-control datepicker\" readonly value=\"{{initDateEnd}}\" #dateEnd>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Descrição</label>\r\n                <textarea class=\"form-control\" [(ngModel)]=\"currentProject.description\"></textarea>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Orçamento</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentProject.budget\">\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Riscos</label>\r\n                <select class=\"form-control custom-select\" #selectRisk>\r\n                    <option value=\"Baixo\">Baixo risco</option>\r\n                    <option value=\"Médio\">Médio risco</option>\r\n                    <option value=\"Alto\">Alto risco</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    -->\r\n    <div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Status</label>\r\n                <select class=\"form-control custom-select\" #selectStatus (change)=\"changeStatus($event)\">\r\n                  <option value=\"Em análise\" [selected]=\"currentProject.status == 'Em análise'\">Em análise</option>\r\n                  <option value=\"Análise realizada\" [selected]=\"currentProject.status == 'Análise realizada'\">Análise realizada</option>\r\n                  <option value=\"Análise aprovada\" [selected]=\"currentProject.status == 'Análise aprovada'\">Análise aprovada</option>\r\n                  <option value=\"Iniciado\" [selected]=\"currentProject.status == 'Iniciado'\">Iniciado</option>\r\n                  <option value=\"Planejado\" [selected]=\"currentProject.status == 'Planejado'\">Planejado</option>\r\n                  <option value=\"Em andamento\" [selected]=\"currentProject.status == 'Em andamento'\">Em andamento</option>\r\n                  <option value=\"Encerrado\" [selected]=\"currentProject.status == 'Encerrado'\">Encerrado</option>\r\n                  <option value=\"Cancelado\" [selected]=\"currentProject.status == 'Cancelado'\">Cancelado</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Justificativa de mudança de Status</label>\r\n                <textarea class=\"form-control\" [(ngModel)]=\"currentProject.justification\" [disabled]=\"disbleJustification\"></textarea>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/projeto-status/projeto-status.component.ts":
/*!************************************************************!*\
  !*** ./src/app/projeto-status/projeto-status.component.ts ***!
  \************************************************************/
/*! exports provided: ProjetoStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoStatusComponent", function() { return ProjetoStatusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
/* harmony import */ var _projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../projeto-services/projeto.service */ "./src/app/projeto-services/projeto.service.ts");
/* harmony import */ var _models_projeto_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_models/projeto.model */ "./src/app/_models/projeto.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjetoStatusComponent = /** @class */ (function () {
    function ProjetoStatusComponent(projetoService, route, message, location) {
        this.projetoService = projetoService;
        this.route = route;
        this.message = message;
        this.location = location;
        this.currentProject = new _models_projeto_model__WEBPACK_IMPORTED_MODULE_5__["Projeto"]();
        this.disbleJustification = true;
        this.initDateStart = '';
        this.initDateEnd = '';
        this.initDatePrevision = '';
    }
    ProjetoStatusComponent.prototype.ngOnInit = function () {
        this.getProjeto();
    };
    ProjetoStatusComponent.prototype.getProjeto = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.projetoService.getProjetoById(id).subscribe(function (prj) {
            _this.currentProject = prj;
            console.log('projeto por id', _this.currentProject);
            // formatar e imprimir datas
            /**/
            if (_this.currentProject.dateStart) {
                var ds = new Date(_this.currentProject.dateStart);
                var ds1 = ds.getDate();
                var ds2 = ds.getMonth();
                var dss = (ds1.toString().length == 1 ? '0' + ds1 : ds1) + '/' + (ds2.toString().length == 1 ? '0' + ds2 : ds2) + '/' + ds.getFullYear();
                _this.initDateStart = dss;
            }
            if (_this.currentProject.dateEnd) {
                var ds = new Date(_this.currentProject.dateEnd);
                var ds1 = ds.getDate();
                var ds2 = ds.getMonth();
                var dss = (ds1.toString().length == 1 ? '0' + ds1 : ds1) + '/' + (ds2.toString().length == 1 ? '0' + ds2 : ds2) + '/' + ds.getFullYear();
                _this.initDateEnd = dss;
            }
            if (_this.currentProject.datePrevision) {
                var ds = new Date(_this.currentProject.datePrevision);
                var ds1 = ds.getDate();
                var ds2 = ds.getMonth();
                var dss = (ds1.toString().length == 1 ? '0' + ds1 : ds1) + '/' + (ds2.toString().length == 1 ? '0' + ds2 : ds2) + '/' + ds.getFullYear();
                _this.initDatePrevision = dss;
            }
            /**/
        });
    };
    ProjetoStatusComponent.prototype.onSave = function () {
        var _this = this;
        if (this.validate()) {
            // post service
            this.projetoService.putProjeto(this.currentProject).subscribe(function () {
                _this.goBack(); // ou faz uma rota para a lista de projetos?
            });
        }
    };
    ProjetoStatusComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjetoStatusComponent.prototype.validate = function () {
        /*
        if (this.dateStart.nativeElement.value != '')
          this.currentProject.dateStart = new Date(this.formatDate(this.dateStart.nativeElement.value));
        if (this.dateEnd.nativeElement.value != '')
          this.currentProject.dateEnd = new Date(this.formatDate(this.dateEnd.nativeElement.value));
        if (this.datePrevision.nativeElement.value != '')
          this.currentProject.datePrevision = new Date(this.formatDate(this.datePrevision.nativeElement.value));
        this.currentProject.risk = this.selectRisk.nativeElement.value;
        */
        this.currentProject.status = this.selectStatus.nativeElement.value;
        console.log(this.currentProject);
        if (!this.disbleJustification && this.currentProject.justification == undefined) {
            console.log('É necessário escrever uma justificativa');
            this.message.warning('Essa mudança de status exige que uma justificativa seja informada');
            return false;
            // TODO mandar tbm o usuario e a data da alteração de status!!!!!!!!!! tenho que pegar o usuário logado!!!!!!!!!!!
        }
        //
        return true;
    };
    /*
    formatDate(data: string): string {
      if (data == '' || data == undefined)
        return null;
      let dia = data.substr(0, 2);
      let mes = data.substr(3, 2);
      let ano = data.substr(6, 4);
      return mes + '/' + dia + '/' + ano;
    }
    */
    ProjetoStatusComponent.prototype.changeStatus = function ($event) {
        //console.log($event.target.value);
        if ($event.target.value == 'Cancelado' || $event.target.value == 'Análise aprovada') {
            this.disbleJustification = false;
        }
        else {
            this.disbleJustification = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('selectStatus'),
        __metadata("design:type", Object)
    ], ProjetoStatusComponent.prototype, "selectStatus", void 0);
    ProjetoStatusComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projeto-status',
            template: __webpack_require__(/*! ./projeto-status.component.html */ "./src/app/projeto-status/projeto-status.component.html"),
            styles: [__webpack_require__(/*! ./projeto-status.component.css */ "./src/app/projeto-status/projeto-status.component.css")]
        }),
        __metadata("design:paramtypes", [_projeto_services_projeto_service__WEBPACK_IMPORTED_MODULE_4__["ProjetoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], ProjetoStatusComponent);
    return ProjetoStatusComponent;
}());



/***/ }),

/***/ "./src/app/relatorio-list/relatorio-list.component.css":
/*!*************************************************************!*\
  !*** ./src/app/relatorio-list/relatorio-list.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table tbody {\r\n    border-top: 3px solid #bec2c6; /* #dee2e6; */\r\n}"

/***/ }),

/***/ "./src/app/relatorio-list/relatorio-list.component.html":
/*!**************************************************************!*\
  !*** ./src/app/relatorio-list/relatorio-list.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Relatório</li>\r\n    </ol>\r\n  </nav>\r\n  <h2>Relatório de Acompanhamento de Projetos</h2>\r\n  <hr>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-4\">\r\n      <div class=\"form-group\">\r\n        <label>Listar Projetos</label>\r\n        <select class=\"form-control custom-select\" #selectProject (change)=\"onChangeFilter($event)\">\r\n          <option value=\"\">Todos</option>\r\n          <option *ngFor=\"let item of reportProjectLis\" value=\"{{item._id}}\">{{item.name}}</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n  </div>\r\n<!--\r\n  <h4>Filtros</h4>\r\n  <div class=\"row\">\r\n    <div class=\"col-4\">\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label>De</label>\r\n                  <input class=\"form-control datepicker\">\r\n              </div>\r\n          </div>\r\n          <div class=\"col-6\">\r\n              <div class=\"form-group\">\r\n                  <label>Até</label>\r\n                  <input class=\"form-control datepicker\">\r\n              </div>\r\n          </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <button type=\"button\" class=\"btn btn-primary\">Filtrar</button>\r\n            &nbsp;\r\n            <button type=\"button\" class=\"btn btn-secondary\">Limpar</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-8\">\r\n    </div>\r\n  </div>\r\n  <hr>\r\n  <h4>\r\n    Lista\r\n  </h4>\r\n-->\r\n  <div>\r\n    <table class=\"table\">\r\n      <!--\r\n      <thead>\r\n        <tr>\r\n          <th>cabeça</th>\r\n          <th>cabeça</th>\r\n        </tr>\r\n      </thead>\r\n      -->\r\n      <tbody *ngFor=\"let item of reportProjectLis_Filtered\" style=\"margin-bottom:40px\">\r\n        <tr>\r\n          <td colspan=\"4\">\r\n            <div class=\"small\">Projeto:</div>\r\n            <b>{{item.name}}</b>\r\n          </td>\r\n        <tr>\r\n          <td>\r\n            <div class=\"small\">Data de início:</div>\r\n            <b>{{ ( item.dateStartReport ? item.dateStartReport : '-' ) }}</b>\r\n          </td>\r\n          <td>\r\n            <div class=\"small\">Data de previsão de términio:</div>\r\n            <b>{{ ( item.datePrevisionReport ? item.datePrevisionReport : '-' ) }}</b>\r\n          </td>\r\n          <td>\r\n            <div class=\"small\">Data real de términio:</div>\r\n            <b>{{ ( item.dateEndReport ? item.dateEndReport : '-' ) }}</b>\r\n          </td>\r\n          <td></td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"4\">\r\n            <div class=\"small\">Descrição:</div>\r\n              {{ item.description }}\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"4\">\r\n            <div class=\"small\">Membro(s) do time:</div>\r\n            <div *ngFor=\"let team of item.team\">\r\n              {{ team.name }}\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"4\">\r\n            <span class=\"small\">\r\n              Indicadores\r\n            </span>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td style=\"border-top: none\">\r\n            <div class=\"small\">Fase 1:</div>\r\n            <div *ngFor=\"let ind of item.phases.phase1\">\r\n              {{ ind.name }}: {{ ind.value }}\r\n              <div class=\"small mb-2\">mínimo: {{ ind.min }} | máximo: {{ ind.max }}</div>\r\n            </div>\r\n          </td>\r\n          <td style=\"border-top: none\">\r\n            <div class=\"small\">Fase 2:</div>\r\n            <div *ngFor=\"let ind of item.phases.phase2\">\r\n              {{ ind.name }}: {{ ind.value }}\r\n              <div class=\"small mb-2\">mínimo: {{ ind.min }} | máximo: {{ ind.max }}</div>\r\n            </div>\r\n          </td>\r\n          <td style=\"border-top: none\">\r\n            <div class=\"small\">Fase 3:</div>\r\n            <div *ngFor=\"let ind of item.phases.phase3\">\r\n              {{ ind.name }}: {{ ind.value }}\r\n              <div class=\"small mb-2\">mínimo: {{ ind.min }} | máximo: {{ ind.max }}</div>\r\n            </div>\r\n          </td>\r\n          <td style=\"border-top: none\">\r\n            <div class=\"small\">Fase 4:</div>\r\n            <div *ngFor=\"let ind of item.phases.phase4\">\r\n              {{ ind.name }}: {{ ind.value }}\r\n              <div class=\"small mb-2\">mínimo: {{ ind.min }} | máximo: {{ ind.max }}</div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"4\">\r\n            <div class=\"small\">Orçamento:</div>\r\n              {{ item.budget }}\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"4\">\r\n            <div class=\"small\">Risco:</div>\r\n              {{ item.risk }}\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n          <td colspan=\"2\">\r\n            <div class=\"small\">Status:</div>\r\n              {{ item.status }}\r\n          </td>\r\n          <td colspan=\"2\" *ngIf=\"item.userChangeStatus\">\r\n            <div class=\"small\">Última alteração de status:</div>\r\n              {{ item.dateChangeStatusReport }}\r\n              <br>\r\n              {{ item.userChangeStatus.name }}\r\n              <br>\r\n              <span class=\"small\">\r\n                  {{ item.userChangeStatus.role }}\r\n              </span>\r\n          </td>\r\n        </tr>\r\n        <tr *ngIf=\"manager\">\r\n          <td colspan=\"4\">\r\n            <div class=\"small\">Gerente:</div>\r\n              {{ manager.name }} <span class=\"small\"> {{ manager.role }} </span>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/relatorio-list/relatorio-list.component.ts":
/*!************************************************************!*\
  !*** ./src/app/relatorio-list/relatorio-list.component.ts ***!
  \************************************************************/
/*! exports provided: RelatorioListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelatorioListComponent", function() { return RelatorioListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _relatorio_service_relatorio_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../relatorio-service/relatorio.service */ "./src/app/relatorio-service/relatorio.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RelatorioListComponent = /** @class */ (function () {
    function RelatorioListComponent(relatorio) {
        this.relatorio = relatorio;
    }
    RelatorioListComponent.prototype.ngOnInit = function () {
        // jquery datepicker
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR'
        });
        //
        this.getDataAll();
    };
    RelatorioListComponent.prototype.getDataAll = function () {
        var _this = this;
        this.relatorio.getAll().subscribe(function (res) {
            _this.reportProjectLis = res;
            _this.reportProjectLis_Filtered = res;
        });
    };
    RelatorioListComponent.prototype.onChangeFilter = function ($event) {
        console.log($event.target.value);
        if ($event.target.value) {
            this.reportProjectLis_Filtered = this.reportProjectLis.filter(function (el) { return el._id == $event.target.value; });
        }
        else {
            this.reportProjectLis_Filtered = this.reportProjectLis;
        }
    };
    RelatorioListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-relatorio-list',
            template: __webpack_require__(/*! ./relatorio-list.component.html */ "./src/app/relatorio-list/relatorio-list.component.html"),
            styles: [__webpack_require__(/*! ./relatorio-list.component.css */ "./src/app/relatorio-list/relatorio-list.component.css")]
        }),
        __metadata("design:paramtypes", [_relatorio_service_relatorio_service__WEBPACK_IMPORTED_MODULE_1__["RelatorioService"]])
    ], RelatorioListComponent);
    return RelatorioListComponent;
}());



/***/ }),

/***/ "./src/app/relatorio-service/relatorio.service.ts":
/*!********************************************************!*\
  !*** ./src/app/relatorio-service/relatorio.service.ts ***!
  \********************************************************/
/*! exports provided: RelatorioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelatorioService", function() { return RelatorioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RelatorioService = /** @class */ (function () {
    function RelatorioService(http, message) {
        this.http = http;
        this.message = message;
        this.urlApi = 'api/relatorio';
    }
    RelatorioService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.urlApi).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.log('Serviço de relatorios retornou consulta getAll'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getProjetoRelatorio-All')));
    };
    RelatorioService.prototype.getOne = function (id) {
        var _this = this;
        return this.http.get(this.urlApi + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.log('Serviço de relatorios retornou consulta getOne'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError('getProjetoRelatorio-One')));
    };
    RelatorioService.prototype.log = function (message) {
        // message service
        console.log(message);
    };
    RelatorioService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'Operação '; }
        return function (error) {
            console.error(error); // log to console instead
            _this.log(operation + " falhou: " + error.message);
            // this.message.error(`${operation} falhou: ${error.message}`, true);
            _this.message.error(error.error.message, true);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    RelatorioService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], RelatorioService);
    return RelatorioService;
}());



/***/ }),

/***/ "./src/app/usuario-create/usuario-create.component.css":
/*!*************************************************************!*\
  !*** ./src/app/usuario-create/usuario-create.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/usuario-create/usuario-create.component.html":
/*!**************************************************************!*\
  !*** ./src/app/usuario-create/usuario-create.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\t\t<nav aria-label=\"breadcrumb\">\r\n\t\t\t<ol class=\"breadcrumb\">\r\n\t\t\t\t<li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n\t\t\t\t<li class=\"breadcrumb-item\"><a routerLink=\"/usuario\">Usuários</a></li>\r\n                <li class=\"breadcrumb-item active\" aria-current=\"page\">Novo Usuário</li>\r\n\t\t\t</ol>\r\n\t\t</nav>\r\n    <h2>Novo Usuário</h2>\r\n\t<hr>\r\n    <form #insertForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\t<div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Nome</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newUser.name\" name=\"name\" #name=\"ngModel\" required>\r\n                <div [hidden]=\"name.valid || name.pristine\"\r\n                    style=\"color: red\">\r\n                    O nome do Usuário é obrigatório.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\t<div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Email</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newUser.email\" name=\"email\" #email=\"ngModel\" required>\r\n                <div [hidden]=\"email.valid || email.pristine\"\r\n                    style=\"color: red\">\r\n                    O Email é obrigatório.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Confirme o email</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"confirmMail\" name=\"emailconfirm\" #emailconfirm=\"ngModel\" required>\r\n                <div [hidden]=\"emailconfirm.valid || emailconfirm.pristine\"\r\n                    style=\"color: red\">\r\n                    O email deve ser o mesmo nos dois campos.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col small\">\r\n            O endereço de email será usado como identidade de usuário para efetuar o login.\r\n            <br>\r\n            Um email será enviado para o endereço com uma senha provisória que deverá ser trocada ao efetuar-se o primeiro acesso ao sistema.\r\n        </div>\r\n    </div>\r\n    <!--\r\n\t<div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Login</label>\r\n                <input type=\"text\" class=\"form-control\">\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Senha</label>\r\n                <input type=\"password\" class=\"form-control\">\r\n            </div>\r\n        </div>\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Confirmar a senha</label>\r\n                <input type=\"password\" class=\"form-control\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n    -->\r\n    <div class=\"row mt-3\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Perfíl</label>\r\n                <select class=\"form-control custom-select\" [(ngModel)]=\"newUser.role\"  name=\"perfil\" #perfil=\"ngModel\" required>\r\n                    <optgroup label=\"escolha um perfil...\">\r\n                    <option value=\"Administrador\">Administrador</option>\r\n                    <option value=\"Diretor\">Membro Alta Direção</option>\r\n                    <option value=\"Líder do Escritório de Projetos\">Líder do Escritório de Projetos</option>\r\n                    <option value=\"Gerente de Projeto\">Gerente de Projeto</option>\r\n                    <option value=\"Líder de Time\">Líder de Projeto</option>\r\n                    <option selected>Membro de time</option>\r\n                    </optgroup>\r\n                </select>\r\n                <div [hidden]=\"perfil.valid || perfil.pristine || false\"\r\n                    style=\"color: red\">\r\n                    É necessário informar um perfil de usuário.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!insertForm.form.valid\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "./src/app/usuario-create/usuario-create.component.ts":
/*!************************************************************!*\
  !*** ./src/app/usuario-create/usuario-create.component.ts ***!
  \************************************************************/
/*! exports provided: UsuarioCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioCreateComponent", function() { return UsuarioCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _models_usuarios_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_models/usuarios.model */ "./src/app/_models/usuarios.model.ts");
/* harmony import */ var _usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../usuario-service/usuario.service */ "./src/app/usuario-service/usuario.service.ts");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsuarioCreateComponent = /** @class */ (function () {
    function UsuarioCreateComponent(usuario, message, location) {
        this.usuario = usuario;
        this.message = message;
        this.location = location;
        this.newUser = new _models_usuarios_model__WEBPACK_IMPORTED_MODULE_2__["Usuario"]();
    }
    UsuarioCreateComponent.prototype.ngOnInit = function () {
    };
    UsuarioCreateComponent.prototype.onSubmit = function () {
        console.log('on submit...');
        this.OnSave();
    };
    UsuarioCreateComponent.prototype.OnSave = function () {
        var _this = this;
        if (this.validate()) {
            this.usuario.newUsuario(this.newUser).subscribe(function (usu) {
                _this.goBack();
            });
        }
    };
    UsuarioCreateComponent.prototype.validate = function () {
        // verifica se email é igual
        if (this.confirmMail != this.newUser.email) {
            this.message.warning('O email deve ser confirmado.');
            return false;
        }
        // verifica se perfil foi escolhido
        return true;
    };
    UsuarioCreateComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsuarioCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usuario-create',
            template: __webpack_require__(/*! ./usuario-create.component.html */ "./src/app/usuario-create/usuario-create.component.html"),
            styles: [__webpack_require__(/*! ./usuario-create.component.css */ "./src/app/usuario-create/usuario-create.component.css")]
        }),
        __metadata("design:paramtypes", [_usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioService"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], UsuarioCreateComponent);
    return UsuarioCreateComponent;
}());



/***/ }),

/***/ "./src/app/usuario-detail/usuario-detail.component.css":
/*!*************************************************************!*\
  !*** ./src/app/usuario-detail/usuario-detail.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/usuario-detail/usuario-detail.component.html":
/*!**************************************************************!*\
  !*** ./src/app/usuario-detail/usuario-detail.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  usuario-detail works!\r\n  <br>\r\n  mas não deve ser necessário...\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/usuario-detail/usuario-detail.component.ts":
/*!************************************************************!*\
  !*** ./src/app/usuario-detail/usuario-detail.component.ts ***!
  \************************************************************/
/*! exports provided: UsuarioDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioDetailComponent", function() { return UsuarioDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsuarioDetailComponent = /** @class */ (function () {
    function UsuarioDetailComponent(route, location
    // serviço usuario
    ) {
        this.route = route;
        this.location = location;
    }
    UsuarioDetailComponent.prototype.ngOnInit = function () {
        this.getUsuario();
    };
    UsuarioDetailComponent.prototype.getUsuario = function () {
        // pegar o usuário no serviço atraves do ID enviado como parametro
        this.route.snapshot.paramMap.get('id');
    };
    UsuarioDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usuario-detail',
            template: __webpack_require__(/*! ./usuario-detail.component.html */ "./src/app/usuario-detail/usuario-detail.component.html"),
            styles: [__webpack_require__(/*! ./usuario-detail.component.css */ "./src/app/usuario-detail/usuario-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]
            // serviço usuario
        ])
    ], UsuarioDetailComponent);
    return UsuarioDetailComponent;
}());



/***/ }),

/***/ "./src/app/usuario-edit/usuario-edit.component.css":
/*!*********************************************************!*\
  !*** ./src/app/usuario-edit/usuario-edit.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/usuario-edit/usuario-edit.component.html":
/*!**********************************************************!*\
  !*** ./src/app/usuario-edit/usuario-edit.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\t\t<nav aria-label=\"breadcrumb\">\r\n\t\t\t<ol class=\"breadcrumb\">\r\n\t\t\t\t<li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n\t\t\t\t<li class=\"breadcrumb-item\"><a routerLink=\"/usuario\">Usuários</a></li>\r\n                <li class=\"breadcrumb-item active\" aria-current=\"page\">Editar Usuário</li>\r\n\t\t\t</ol>\r\n\t\t</nav>\r\n    <h2>Editar Usuário</h2>\r\n\t<hr>\r\n    <form #insertForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\t<div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Nome</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentUser.name\" name=\"name\" #name=\"ngModel\" required>\r\n                <div [hidden]=\"name.valid || name.pristine\"\r\n                    style=\"color: red\">\r\n                    O nome do Usuário é obrigatório.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\t<div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Email</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"currentUser.email\" name=\"email\" #email=\"ngModel\" required>\r\n                <div [hidden]=\"email.valid || email.pristine\"\r\n                    style=\"color: red\">\r\n                    O Email é obrigatório.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" [hidden]=\"email.pristine\">\r\n        <div class=\"col-6\">\r\n            <div class=\"form-group\">\r\n                <label>Confirme o email</label>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"confirmMail\" name=\"emailconfirm\" #emailconfirm=\"ngModel\">\r\n                <div [hidden]=\"emailconfirm.valid || emailconfirm.pristine\"\r\n                    style=\"color: red\">\r\n                    O email deve ser o mesmo nos dois campos.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"custom-control custom-checkbox mr-sm-2\">\r\n                <input type=\"checkbox\" class=\"custom-control-input\" id=\"resetpassword\" name=\"resetpassword\" [(ngModel)]=\"resetPassword\">\r\n                <label class=\"custom-control-label\" for=\"resetpassword\">Gerar nova senha</label>\r\n            </div>\r\n            <span class=\"small\">Um email será enviado para o endereço com uma senha provisória que deverá ser trocada ao efetuar-se o próximo acesso ao sistema.</span>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row mt-3\">\r\n        <div class=\"col-4\">\r\n            <div class=\"form-group\">\r\n                <label>Perfíl</label>\r\n                <select class=\"form-control custom-select\" [(ngModel)]=\"currentUser.role\"  name=\"perfil\" #perfil=\"ngModel\" required>\r\n                    <optgroup label=\"escolha um perfil...\">\r\n                    <option [selected]=\"currentUser.role == 'Administrador'\" value=\"Administrador\">Administrador</option>\r\n                    <option [selected]=\"currentUser.role == 'Diretor'\" value=\"Diretor\">Membro Alta Direção</option>\r\n                    <option [selected]=\"currentUser.role == 'Líder do Escritório de Projetos'\" value=\"Líder do Escritório de Projetos\">Líder do Escritório de Projetos</option>\r\n                    <option [selected]=\"currentUser.role == 'Gerente de Projeto'\" value=\"Gerente de Projeto\">Gerente de Projeto</option>\r\n                    <option [selected]=\"currentUser.role == 'Líder de Time'\" value=\"Líder de Time\">Líder de Projeto</option>\r\n                    <option>Membro de time</option>\r\n                    </optgroup>\r\n                </select>\r\n                <div [hidden]=\"perfil.valid || perfil.pristine || false\"\r\n                    style=\"color: red\">\r\n                    É necessário informar um perfil de usuário.\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <hr>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <div class=\"form-group\">\r\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!insertForm.form.valid\">Salvar</button>\r\n                &nbsp;\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"goBack()\">Voltar</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "./src/app/usuario-edit/usuario-edit.component.ts":
/*!********************************************************!*\
  !*** ./src/app/usuario-edit/usuario-edit.component.ts ***!
  \********************************************************/
/*! exports provided: UsuarioEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioEditComponent", function() { return UsuarioEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_usuarios_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_models/usuarios.model */ "./src/app/_models/usuarios.model.ts");
/* harmony import */ var _usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../usuario-service/usuario.service */ "./src/app/usuario-service/usuario.service.ts");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsuarioEditComponent = /** @class */ (function () {
    function UsuarioEditComponent(usuario, route, message, location) {
        this.usuario = usuario;
        this.route = route;
        this.message = message;
        this.location = location;
        this.currentUser = new _models_usuarios_model__WEBPACK_IMPORTED_MODULE_3__["Usuario"]();
        // public alertConfirmMail: Boolean = false;
        this.resetPassword = false;
    }
    UsuarioEditComponent.prototype.ngOnInit = function () {
        this.getUsuario();
    };
    UsuarioEditComponent.prototype.getUsuario = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.usuario.getOneUsuario(id).subscribe(function (usr) {
            _this.currentUser = usr;
            _this.confirmMail = usr.email;
        });
    };
    UsuarioEditComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.validate()) {
            this.usuario.editUsuario(this.currentUser._id, this.currentUser).subscribe(function (usu) {
                _this.goBack();
            });
        }
    };
    UsuarioEditComponent.prototype.validate = function () {
        if (this.resetPassword) {
            this.currentUser.firsttime = true;
        }
        console.log('na validação do usuario, antes de salvar', this.currentUser);
        // verifica se email é igual
        if (this.confirmMail != this.currentUser.email) {
            // this.alertConfirmMail = true;
            this.message.warning('O email deve ser confirmado.');
            return false;
        }
        // verifica se perfil foi escolhido
        return true;
    };
    UsuarioEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsuarioEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usuario-edit',
            template: __webpack_require__(/*! ./usuario-edit.component.html */ "./src/app/usuario-edit/usuario-edit.component.html"),
            styles: [__webpack_require__(/*! ./usuario-edit.component.css */ "./src/app/usuario-edit/usuario-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], UsuarioEditComponent);
    return UsuarioEditComponent;
}());



/***/ }),

/***/ "./src/app/usuario-list/usuario-list.component.css":
/*!*********************************************************!*\
  !*** ./src/app/usuario-list/usuario-list.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/usuario-list/usuario-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/usuario-list/usuario-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <nav aria-label=\"breadcrumb\">\r\n    <ol class=\"breadcrumb\">\r\n      <li class=\"breadcrumb-item\"><a routerLink=\"/home\">Home</a></li>\r\n      <li class=\"breadcrumb-item active\" aria-current=\"page\">Usuários</li>\r\n    </ol>\r\n  </nav>\r\n  <!--\r\n  <h2>Lista de Usuários\r\n  </h2>\r\n  <hr>\r\n  <h2>Filtros</h2>\r\n  <div class=\"row\">\r\n    <div class=\"col-4\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <label>Nome</label>\r\n            <input type=\"text\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"form-group\">\r\n            <button type=\"button\" class=\"btn btn-primary\">Filtrar</button>\r\n            <button type=\"button\" class=\"btn btn-secondary\">Limpar</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"col-8\">\r\n\r\n    </div>\r\n  </div>\r\n  <hr>\r\n-->\r\n  <h2>\r\n    Lista de Usuários\r\n    <div class=\"float-right\"><button type=\"button\" class=\"btn btn-primary\" (click)=\"onNewUsuario()\">+ novo usuário</button></div>\r\n  </h2>\r\n\r\n  <div>\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th class=\"w1p\"></th>\r\n          <th>Usuário</th>\r\n          <th class=\"w20p\">Perfil</th>\r\n          <th class=\"w20p\">Ações</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let usuario of usuariosList; let i = index\">\r\n          <td>{{ i + 1 }}</td>\r\n          <td>{{ usuario.name }}</td>\r\n          <td>{{ usuario.role }}</td>\r\n          <td>\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"onSelectUsuario(usuario._id)\">\r\n              editar\r\n            </button>\r\n            &nbsp;\r\n            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#exampleModal\" (click)=\"onDeleteUsuario(usuario._id)\">\r\n              excluir\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n        <!--\r\n        <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"exampleModalLabel\">Exclusão</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n        </div>\r\n      -->\r\n        <div class=\"modal-body\">\r\n            Deseja realmente excluir este usuário?\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default btn-sm\" data-dismiss=\"modal\">Cancelar</button>\r\n            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-dismiss=\"modal\" (click)=\"onConfirmDeleteUsuario()\">Excluir</button>\r\n        </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/usuario-list/usuario-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/usuario-list/usuario-list.component.ts ***!
  \********************************************************/
/*! exports provided: UsuarioListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioListComponent", function() { return UsuarioListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../usuario-service/usuario.service */ "./src/app/usuario-service/usuario.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsuarioListComponent = /** @class */ (function () {
    function UsuarioListComponent(usuarioService, route) {
        this.usuarioService = usuarioService;
        this.route = route;
    }
    UsuarioListComponent.prototype.ngOnInit = function () {
        this.getUsuarios();
    };
    UsuarioListComponent.prototype.getUsuarios = function () {
        var that = this;
        this.usuarioService.getUsuarios().subscribe(function (usu) {
            that.usuariosList = usu;
        });
    };
    UsuarioListComponent.prototype.onNewUsuario = function () {
        this.route.navigate(['/usuario/create/']);
    };
    UsuarioListComponent.prototype.onSelectUsuario = function (idUsuario) {
        this.route.navigate(['/usuario/edit/' + idUsuario]);
    };
    UsuarioListComponent.prototype.onDeleteUsuario = function (id) {
        this.usuarioDeleteWait = id;
    };
    UsuarioListComponent.prototype.onConfirmDeleteUsuario = function () {
        var _this = this;
        this.usuarioService.deleteUsuario(this.usuarioDeleteWait).subscribe(
        // retirar usuario excluído da lista!
        // TODO deve haver uma verficação aqui se foi um sucesso... antes de tirar da lista
        function () {
            _this.usuariosList = _this.usuariosList.filter(function (el) {
                return el._id !== _this.usuarioDeleteWait;
            });
        });
    };
    UsuarioListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usuario-list',
            template: __webpack_require__(/*! ./usuario-list.component.html */ "./src/app/usuario-list/usuario-list.component.html"),
            styles: [__webpack_require__(/*! ./usuario-list.component.css */ "./src/app/usuario-list/usuario-list.component.css")]
        }),
        __metadata("design:paramtypes", [_usuario_service_usuario_service__WEBPACK_IMPORTED_MODULE_2__["UsuarioService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], UsuarioListComponent);
    return UsuarioListComponent;
}());



/***/ }),

/***/ "./src/app/usuario-service/usuario.service.ts":
/*!****************************************************!*\
  !*** ./src/app/usuario-service/usuario.service.ts ***!
  \****************************************************/
/*! exports provided: UsuarioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioService", function() { return UsuarioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_controllers/message/service/message.service */ "./src/app/_controllers/message/service/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, message) {
        this.http = http;
        this.message = message;
        this.usuarioUrl = 'api/usuario';
    }
    UsuarioService.prototype.getUsuarios = function () {
        return this.http.get(this.usuarioUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler('getUsuarios')));
    };
    UsuarioService.prototype.getOneUsuario = function (id) {
        return this.http.get(this.usuarioUrl + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler('getUsuario')));
    };
    UsuarioService.prototype.newUsuario = function (usu) {
        var _this = this;
        return this.http.post(this.usuarioUrl, usu).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.message.success('Usuario criado.'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler('newUsuario')));
    };
    UsuarioService.prototype.editUsuario = function (id, usu) {
        var _this = this;
        return this.http.put(this.usuarioUrl + '/' + id, usu).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.message.success('Usuario salvo.'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler('editUsuario')));
    };
    UsuarioService.prototype.deleteUsuario = function (id) {
        var _this = this;
        return this.http.delete(this.usuarioUrl + '/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return _this.message.success('Usuario excluído.'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler('deleteUsuario')));
    };
    UsuarioService.prototype.errorHandler = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'Operação'; }
        return function (error) {
            console.error(error);
            console.log("Houve uma falha na opera\u00E7\u00E3o " + operation);
            if (error.error && error.error.message)
                _this.message.error(error.error.message, true);
            else
                _this.message.error('Erro não identificado. [usu.ser.' + operation + ']', true);
            /*if (error.error.message.indexOf('jwt expired') > 0) {
              // TODO logout
            }*/
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(result);
        };
    };
    UsuarioService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _controllers_message_service_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], UsuarioService);
    return UsuarioService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\zupa\PUC\tcc-frontend\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map