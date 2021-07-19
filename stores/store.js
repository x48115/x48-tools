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
  lastBlockTimestamp = Date.now();
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

  setCurrentTopic = action((topic) => {
    this.currentTopic = topic;
    this.websocketLogs = [];
    if (this.currentTopic == "pendingTransactions") {
    }
  });

  setSubscriptionTopics = (subscriptionTopics) => {
    this.subscriptionTopics = subscriptionTopics;
  };

  setCurrentBlockNumber = (blockNumber) => {
    this.blockNumber = blockNumber;
    this.lastBlockTimestamp = Date.now();
  };

  startUpdatingTimestamp = () => {
    setInterval(() => {
      action(() => {
        this.currentTimestamp = Date.now();
        this.lastBlockTimestampDelta = (
          (this.currentTimestamp - this.lastBlockTimestamp) /
          1000
        ).toFixed(0);
      })();
    }, 500);
  };

  checkSystemReady = () => {
    if (this.web3Connected && this.websocketConnected) {
      this.ready = true;
    }
  };

  log = (message) => {
    this.logs.push(message);
  };

  clearWebsocketLogs = action(() => {
    this.websocketLogs = [];
  });

  websocketLog = action((message) => {
    let queueLength;
    switch (this.currentTopic) {
      case "transactionReceipts":
        queueLength = 3;
        break;
      case "pendingTransactions":
        queueLength = 11;
        break;
      default:
        queueLength = 10;
    }
    if (this.websocketLogs.length >= queueLength) {
      this.websocketLogs.shift();
    }
    this.websocketLogs.push(message);
  });
}
