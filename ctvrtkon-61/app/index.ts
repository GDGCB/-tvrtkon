import './assets/bootstrap/css/bootstrap.css';
import { Observable, Subject, BehaviorSubject } from 'rxjs/rx';
import { bindChildsToHtml, bindToHtml, onKeyUpObserve, updateValue, mapStringsToLis } from './utils/dom-changer';
import { HTTP } from './server/http';
import { STATE, State } from './utils//state';

export default class Main {

  public state :State = STATE;
  constructor() {
    this.do();
  }

  do() {
   let name  = this.state.select(x=> x.info.name);
   name.subscribe(x=> console.log(x));
  }
}

(window as any).app = new Main();
