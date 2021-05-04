import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContracts } from "../../components/ConnectionProvider/hooks";
import { useEffect, useState } from "react";
import { sanitizeResponse } from "../../utilities/web3";
import contractsConfig from "../../components/ConnectionProvider/contractsConfig";

const Table = styled.table`
  border: 1px solid #ccc;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 100px;
  border-collapse: collapse;
`;

const mergeArraysById = (arr1, arr2) => {
  return arr1.map((item, i) => {
    if (item.id === arr2[i].id) {
      return Object.assign({}, item, arr2[i]);
    }
  });
};

export default function ({ Component, pageProps }) {
  const contracts = useContracts();
  const router = useRouter();
  const [assets, setAssets] = useState([]);
  const [adapterName, setAdapterName] = useState();
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState({});

  const fetchData = async (adapterName, method, args) => {
    const contract = contracts[adapterName];
    const rawResponse = await contract.methods[method]().call(args);
    const sanitizedResponse = sanitizeResponse(rawResponse);
    return sanitizedResponse;
  };

  const checkReadyState = () => {
    if (contracts && adapterName) {
      setReady(true);
    }
  };

  const routerLoaded = () => {
    const adapterNameArr = router.query["adapterName"];
    if (adapterNameArr) {
      const adapterName = adapterNameArr[0];
      setAdapterName(adapterName);
    }
  };

  const setAdapterConfig = () => {
    const adapterConfig = contractsConfig.find(
      (contract) => contract.name == adapterName
    );
    setConfig(adapterConfig);
  };

  const loadAssets = async () => {
    const assetsStaticData = await fetchData(adapterName, "assetsStatic");
    const assetsDynamicData = await fetchData(adapterName, "assetsDynamic");
    const assetsMerged = mergeArraysById(assetsStaticData, assetsDynamicData);
    setAssets(assetsMerged);
  };

  const initialize = async () => {
    if (!ready) {
      return;
    }
    loadAssets();
    setAdapterConfig();
  };

  useEffect(routerLoaded, [router]);
  useEffect(checkReadyState, [contracts, adapterName]);
  useEffect(initialize, [ready]);

  const assetsRows = assets.map((asset) => {
    return config.assetRow(asset);
  });

  return (
    <div>
      <Table border="1">
        <tbody>{assetsRows}</tbody>
      </Table>
    </div>
  );
}
