import { makeAutoObservable } from "mobx";

export default class Store {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase = () => {
    this.secondsPassed += 1;
  };
}
