import registryAdapterAbi from "../../abi/registryAdapter.json";
import VaultAssetRow from "../../components/VaultAssetRow";

const contractsConfig = [
  {
    name: "vaults",
    alias: "Vaults",
    address: "0xE75E51566C5761896528B4698a88C92A54B3C954",
    abi: registryAdapterAbi,
    positionsAliases: {
      DEPOSIT: "Deposits",
    },
    assetRow: VaultAssetRow,
  },
  {
    name: "ironbank",
    alias: "Iron Bank",
    address: "0x21670dDB429B6D80B5bE4e65532576bB14b7cC62",
    abi: registryAdapterAbi,
    positionsAliases: {
      LEND: "Lending",
      BORROW: "Borrowing",
    },
  },
];

export default contractsConfig;
