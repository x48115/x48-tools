import { makeAutoObservable } from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
    this.secondsPassed = 5;
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

export default new Store();
