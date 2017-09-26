import { Observable, Subject, BehaviorSubject } from 'rxjs/rx';

let name$ = new BehaviorSubject<string>("");
let lastName$ = new BehaviorSubject<string>("");
let age$ = new BehaviorSubject<number>(0);

let city$ = new BehaviorSubject<string>("");
let zip$ = new BehaviorSubject<string>("");
let country$ = new BehaviorSubject<string>("");

let info$ = Observable
    .combineLatest(name$, lastName$, age$)
    .map(x => {
        return {
            name: x[0],
            lastname: x[1],
            age: x[2]
        };

    });

let address$ = Observable
    .combineLatest(city$, zip$, country$)
    .map(x => {
        return {
            city: x[0],
            zip: x[1],
            country: x[2]
        };

    })


export const person$ = Observable
    .combineLatest(info$, address$)
    .map(x => {
        return {
            info: x[0] as {
                name: string,
                lastname: string,
                age: number
            },
            address: x[1] as {
                zip: string,
                country: string,
                city: string
            }
        } as IState;
    });

interface IState {
    info: {
        name: string,
        lastname: string,
        age: number
    },
    address: {
        zip: string,
        country: string,
        city: string
    }
}


export class State implements IState {
    select(selector: (x: IState) => any)  {
        return person$.map(x => selector(x)).distinctUntilChanged();
    }
    private set zip(value) {
        zip$.next(value);
    }

    private set country(value) {
        country$.next(value);
    }

    private set city(value) {
        city$.next(value);
    }

    private set name(value) {
        name$.next(value);
    }

    private set lastName(value) {
        lastName$.next(value);
    }

    private set age(value) {
        age$.next(value);
    }

    get info(): {
        name: string,
        lastname: string,
        age: number
    } {
        return {
            set name(value: string) { name$.next(value) },
            set lastname(value: string) { lastName$.next(value) },
            set age(value: number) { age$.next(value) }
        }
    }

    set info(value: {
        name: string,
        lastname: string,
        age: number
    }) {
        this.name = value.name;
        this.lastName = value.lastname;
        this.age = value.age;

    }


    get address(): {
        zip: string,
        country: string,
        city: string
    } {
        return {
            set zip(value: string) { zip$.next(value) },
            set country(value: string) { country$.next(value) },
            set city(value: string) { city$.next(value) }
        }
    }

    set address(value: {
        zip: string,
        country: string,
        city: string
    }) {
        this.zip = value.zip;
        this.country = value.country;
        this.city = value.city;

    }
}

export const STATE = new State();


