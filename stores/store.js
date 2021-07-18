import { action, makeAutoObservable } from "mobx";
export default class Store {
  logs = [];
  websocketLogs = [];
  web3Connected = false;
  websocketConnected = false;
  ready = false;
  websocket;
  subscriptionTopics = [];
  currentTopic;
  blockNumber = 0;
  lastBlockTimestamp = 0;
  currentTimestamp = Date.now();
  lastBlockTimestampDelta = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setWeb3Connected = (status) => {
    this.web3Connected = true;
    this.checkSystemReady();
  };

  setWebsocket = (websocket) => {
    this.websocket = websocket;
  };

  setWebsocketConnected = (status) => {
    this.websocketConnected = true;
    this.checkSystemReady();
  };

  setCurrentTopic = (topic) => {
    this.currentTopic = topic;
    if (this.currentTopic == "pendingTransactions") {
      this.websocketLogs = [];
    }
  };

  setSubscriptionTopics = (subscriptionTopics) => {
    this.subscriptionTopics = subscriptionTopics;
  };

  setCurrentBlockNumber = (blockNumber) => {
    this.blockNumber = blockNumber;
    this.lastBlockTimestamp = Date.now();
  };

  startUpdatingTimestamp = () => {
    setInterval(
      action(() => {
        this.currentTimestamp = Date.now();
        this.lastBlockTimestampDelta = (
          (this.currentTimestamp - this.lastBlockTimestamp) /
          1000
        ).toFixed(2);
      }, 50)
    );
  };

  checkSystemReady = () => {
    if (this.web3Connected && this.websocketConnected) {
      this.ready = true;
    }
  };

  log = (message) => {
    this.logs.push(message);
  };

  websocketLog = (message) => {
    const queueLength = 30;
    if (this.websocketLogs.length >= queueLength) {
      this.websocketLogs.shift();
    }
    this.websocketLogs.push(message);
  };
}
