import { makeAutoObservable } from "mobx";

export default class Store {
  logs = [];
  web3Connected = false;
  websocketConnected = false;
  ready = false;

  constructor() {
    makeAutoObservable(this);
  }

  setWeb3Connected = (status) => {
    this.web3Connected = true;
    this.checkSystemReady();
  };

  setWebsocketConnected = (status) => {
    this.websocketConnected = true;
    this.checkSystemReady();
  };

  checkSystemReady = () => {
    if (this.web3Connected && this.websocketConnected) {
      this.ready = true;
    }
  };

  log = (message) => {
    this.logs.push(message);
  };
}
