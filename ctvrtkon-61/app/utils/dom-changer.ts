import { Observable, Subject } from 'rxjs/rx';

export function bindToHtml<T>(id: string, observedValue: Observable<T>, map?: (x: T) => any) {
    let valuee = document.getElementById(id);
    var isInputText = valuee instanceof HTMLInputElement;


    observedValue.map(data => map !== undefined ? map(data) : data).distinctUntilChanged().subscribe(x => isInputText? (valuee as HTMLInputElement).value = x   : valuee.innerHTML = x);
}


export function bindChildsToHtml(id: string, observedValue: Observable<HTMLLIElement[]>) {
    let parent = document.getElementById(id);
    observedValue.distinctUntilChanged().subscribe(x => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        x.forEach(element => {
            parent.appendChild(element);
        });
    });
}

export function updateValue<T>(observedValue: Observable<T>, subject: Subject<T>) {
    observedValue.subscribe(x => subject.next(x));
}


export function onKeyUpObserve<T>(id: string): Observable<any> {
    let valuee = document.getElementById(id);
    return Observable.fromEvent(valuee, "keyup").map((x: any) => x.target.value);
}


export function mapStringsToLis(values: string[]): HTMLLIElement[] {
    return values.map(x => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(x));
        return li;
    });
}
