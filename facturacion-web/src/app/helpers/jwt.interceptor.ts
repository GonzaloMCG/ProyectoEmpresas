import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authenticationService.$currentUserSubject.getValue();
    console.log('paso por el interceptor');
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }



  //   @Injectable()
  // export class JwtInterceptor implements HttpInterceptor {
  //   constructor(private injector: Injector, private router: Router) {
  //   }

  //   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //     const authReq = req.clone({
  //       headers: req.headers.set('Authorization', /* here you fetch your jwt */this.getToken())
  //         .append('Access-Control-Allow-Origin', '*')
  //     });
  //     return next.handle(authReq).do((event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse) {
  //         // do stuff with response if you want
  //       }
  //     }, (response: HttpErrorResponse) => { });
  //   }

  //   getToken() {
  //     let headers: HttpHeaders = new HttpHeaders();
  //     headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  //     return this.http.post('http://myapi/api.php/user', {
  //       username: 'admin',
  //       password: 'password'
  //     }, { headers });
  //   }
  // }
}
