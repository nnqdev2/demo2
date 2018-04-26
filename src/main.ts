import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/skip';
// import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Observable';
import { catchError, tap, retry, map, skip, switchMap} from 'rxjs/operators';

const debuggerOn = true;

Observable.prototype.debug = function(message: string) {
  return this.do (
    nextValue => {
      if (debuggerOn) {
        console.log('***rxjs nextValue debug');
        console.log(message, nextValue);
      }
    },
    error => {
      if (debuggerOn) {
        console.log('***rxjs error debug');
        console.error(message, error);
      }
    },
    () => {
      if (debuggerOn) {
        console.log('***rxjs completed debug completed ', message);
      }
    }
  );
};

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
