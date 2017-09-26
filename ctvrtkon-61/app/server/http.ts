import { Observable, Subject, BehaviorSubject } from 'rxjs/rx';

const fake_data = ["petr", "marek", "jiri", "jenicek", "marenka"];

class Http {
    search(searchString: any)  {
        return Observable.of(fake_data.filter(x => x.indexOf(searchString) !== -1)).delay(200);
    }

    currencyInfo() : Observable<number>{
        return Observable.interval(400).map(x => Math.random());
    }
}


export const HTTP = new Http();