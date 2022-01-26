import Router from "next/router";
import { action, makeAutoObservable } from "mobx";
import menuItems from "../components/SubscriptionPane/menu.json";

export default class Store {
  logs = [];
  websocketLogs = {};
  gnosisTransactions = [];
  currentGnosisOwners = [];
  web3 = {};
  tokens = {
    tokens: [],
  };
  currentGnosisTransaction = {
    sender: {},
    addresses: [],
  };
  currentGnosisSimulation = {
    contracts: [],
    transaction: {
      transaction_info: { logs: [] },
      gas_used: 0,
    },
    simulation: {},
    transferLogs: [],
  };
  web3Connected = false;
  websocketConnected = false;
  ready = false;
  menuState = JSON.parse(localStorage.getItem("menuState")) || {};
  websocket;
  simulationPending = true;
  subscriptionTopics = [];
  currentTopic;
  blockNumber = 0;
  gasPrice = 0;
  lastBlockTimestamp = Date.now();
  currentTimestamp = Date.now();
  lastBlockTimestampDelta = 0;
  selectedMenuIdx = -1;
  ychadAddress = "";

  constructor() {
    makeAutoObservable(this);
  }

  setWeb3 = (web3) => {
    this.web3 = web3;
  };

  setWeb3Connected = (status) => {
    this.web3Connected = true;
    this.checkSystemReady();
  };

  setWebsocket = (websocket) => {
    this.websocket = websocket;
  };

  setYchadAddress = (ychadAddress) => {
    this.ychadAddress = ychadAddress;
  };

  setCurrentGnosisTransaction = (transaction) => {
    this.currentGnosisTransaction = transaction;
  };

  setTokens = (payload) => {
    this.tokens = payload;
  };

  setCurrentGnosisSimulation = (simulation) => {
    if (!simulation) {
      this.simulationPending = true;
      return;
    }
    const logs = simulation.transaction.transaction_info.logs || [];
    const transferHash =
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
    const tokens = simulation.contracts.reduce((acc, contract) => {
      if (contract.standard === "erc20") {
        acc[contract.address] = contract.token_data;
      }
      return acc;
    }, {});

    const transferLogs = logs
      .filter((log) => log.raw.topics[0] === transferHash)
      .map((log) => ({ ...log, tokenData: tokens[log.raw.address] }))
      .filter((log) => log.tokenData)
      .map((log) => {
        const amount = log.inputs[2].value / 10 ** log.tokenData.decimals;
        const from = this.web3.utils.toChecksumAddress(log.inputs[0].value);
        const to = this.web3.utils.toChecksumAddress(log.inputs[1].value);
        const tokenAddress = log.raw.address;
        const tokenData = { ...log.tokenData, address: tokenAddress };
        return { ...log, tokenData, amount, from, to };
      });
    simulation.transferLogs = transferLogs;
    this.currentGnosisSimulation = simulation;
    this.simulationPending = false;
  };

  setSimulationPending() {
    this.simulationPending = true;
  }

  setCurrentGnosisOwners = (owners) => {
    this.currentGnosisOwners = owners;
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

  prependGnosisTransaction = (transaction) => {
    this.gnosisTransactions.unshift(transaction);
  };

  setGnosisTransactions = (transactions) => {
    this.gnosisTransactions = transactions;
  };

  setWebsocketConnected = (status) => {
    this.websocketConnected = true;
    this.checkSystemReady();
  };

  setCurrentTopic = action((root, subscriptionTopic) => {
    this.currentTopic = subscriptionTopic;
    const noLogs = this.websocketLogs[subscriptionTopic] == undefined;
    if (noLogs) {
      console.log("init logss");
      this.websocketLogs[subscriptionTopic] = [];
    }
  });

  setSubscriptionTopics = (subscriptionTopics) => {
    this.subscriptionTopics = subscriptionTopics;
  };

  setCurrentBlockNumber = (blockNumber) => {
    this.blockNumber = blockNumber;
    this.lastBlockTimestamp = Date.now();
  };

  setGasPrice = (gasPrice) => {
    this.gasPrice = gasPrice;
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

  websocketLog = action((topic, message) => {
    console.log("topic", topic);
    let queueLength;
    const currentTopic = topic;
    switch (currentTopic) {
      case "transactionReceipts":
        queueLength = 3;
        break;
      case "pendingTransactions":
        queueLength = 11;
        break;
      default:
        queueLength = 10;
    }
    const notSet = this.websocketLogs[currentTopic] == undefined;
    if (notSet) {
      this.websocketLogs[currentTopic] = [message];
      return;
    }
    if (
      currentTopic &&
      this.websocketLogs[currentTopic].length >= queueLength
    ) {
      this.websocketLogs[currentTopic].shift();
    }

    this.websocketLogs[currentTopic].push(message);
  });
}
