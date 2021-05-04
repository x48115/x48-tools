import registryAdapterAbi from "../../abi/registryAdapter.json";
import pricesHelperAbi from "../../abi/pricesHelper.json";
import VaultAssetRow from "../../components/VaultAssetRow";

const contractsConfig = [
  {
    name: "vaults",
    alias: "Vaults",
    type: "adapter",
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
    type: "adapter",
    address: "0x21670dDB429B6D80B5bE4e65532576bB14b7cC62",
    abi: registryAdapterAbi,
    positionsAliases: {
      LEND: "Lending",
      BORROW: "Borrowing",
    },
  },
  {
    name: "pricesHelper",
    address: "0xd73f0ce21bE7EB1834F91E68C55CE149B2E8dC46",
    abi: pricesHelperAbi,
  },
];

export default contractsConfig;
