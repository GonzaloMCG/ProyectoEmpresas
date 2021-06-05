import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../message-handler/message.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 500 || err.status === 401) {
        this.authenticationService.logout();
      }
      if (err.status === 502) {
        this.messageService.showError('Ocurrió un error con el Servidor.');
        return;
      }
      return throwError(err);
    }))
  }
}
