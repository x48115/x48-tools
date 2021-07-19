import Router from "next/router";
import { action, makeAutoObservable } from "mobx";
import menuItems from "../components/SubscriptionPane/menu.json";
export default class Store {
  logs = [];
  websocketLogs = [];
  web3Connected = false;
  websocketConnected = false;
  ready = false;
  menuState = JSON.parse(localStorage.getItem("menuState")) || {};
  websocket;
  subscriptionTopics = [];
  currentTopic;
  blockNumber = 0;
  lastBlockTimestamp = Date.now();
  currentTimestamp = Date.now();
  lastBlockTimestampDelta = 0;
  selectedMenuIdx = -1;

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

  setMenuSelection = action((root, child) => {
    let idx = 0;
    let returnIdx = -1;
    menuItems.forEach((rootItem, rootIdx) => {
      const rootMatch = rootItem.root === root;
      if (rootMatch && !child) {
        returnIdx = idx;
        return false;
      }
      rootItem.children.forEach((childItem, childIdx) => {
        const childMatch = childItem === child;
        if (rootMatch && childMatch) {
          returnIdx = idx + 1;
          const parentClosed = this.menuState[rootItem] !== true;
          if (parentClosed) {
            this.setMenuState(rootItem.root, true);
          }
          return false;
        }
        idx++;
      });
      idx++;
    });
    this.selectedMenuIdx = returnIdx;
  });

  setWebsocketConnected = (status) => {
    this.websocketConnected = true;
    this.checkSystemReady();
  };

  setCurrentTopic = action((root, subscriptionTopic) => {
    if (this.currentTopic != subscriptionTopic && root === "firehose") {
      const previousTopic = this.currentTopic;
      this.currentTopic = subscriptionTopic;
      this.websocketLogs = [];
      if (this.currentTopic == "pendingTransactions") {
      }
      if (previousTopic) {
        this.websocket.unsubscribe(previousTopic);
      }
      this.websocket.subscribe(subscriptionTopic);
    } else {
      console.log("root isss", root);
    }
  });

  setSubscriptionTopics = (subscriptionTopics) => {
    this.subscriptionTopics = subscriptionTopics;
  };

  setCurrentBlockNumber = (blockNumber) => {
    this.blockNumber = blockNumber;
    this.lastBlockTimestamp = Date.now();
  };

  toggleMenuState = action((key) => {
    this.setMenuState(key, !this.menuState[key]);
  });

  setMenuState = action((key, val) => {
    this.menuState[key] = val;
    localStorage.setItem("menuState", JSON.stringify(this.menuState));
  });

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
      this.log("[System] Initialization complete");
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
