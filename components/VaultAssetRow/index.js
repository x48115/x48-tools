import styled from "styled-components";
import {
  formatUsdc,
  formatTokenAmount,
  abbreviateNumber,
} from "../../utilities/string";
import BigNumber from "bignumber.js";

const Cell = styled.div`
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  padding: 20px;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
`;

const Tr = styled.tr`
  &:first-of-type {
    & > td {
      padding-top: 40px;
    }
  }
  &:last-of-type {
    & > td {
      padding-bottom: 40px;
    }
  }
  & > td {
    &:first-of-type {
      padding-left: 40px;
    }
    &:last-of-type {
      padding-right: 40px;
    }
  }
`;

const Td = styled.td`
  padding: 20px;
  vertical-align: middle;
`;

const AssetName = styled.div`
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  padding-left: 10px;
`;

const TokenIcon = styled.img`
  width: 40px;
`;

const TokenIconAndName = styled.div`
  display: flex;
  align-items: center;
`;

export default function VaultAssetRow(asset) {
  const tokenId = asset.token.id;
  const tokenIconUrl = `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${tokenId}/logo.svg`;
  const tokenIcon = <TokenIcon src={tokenIconUrl} />;
  const underlyingTokenBalance =
    asset.underlyingTokenBalance.amount / 10 ** asset.token.decimals;
  const underlyingTokenBalanceUsdc = asset.underlyingTokenBalance.amountUsdc;
  const underlyingTokenBalanceNormalized = formatTokenAmount(
    underlyingTokenBalance
  );
  const underlyingTokenBalanceNormalizedUsdc = formatUsdc(
    underlyingTokenBalanceUsdc
  );
  const assetVersion = asset.version;
  const assetTokenSymbol = asset.token.symbol;
  const migrationAvailable = asset.metadata.migrationAvailable ? "Migrate" : "";

  const borrowLimitPercentage = new BigNumber(
    asset.underlyingTokenBalance.amount
  )
    .div(asset.metadata.depositLimit)
    .times(100)
    .toFixed(2);

  const tokenIconAndName = (
    <TokenIconAndName>
      {tokenIcon}
      <AssetName>{asset.name}</AssetName>
    </TokenIconAndName>
  );

  const assetPrice = asset.token.priceUsdc
    ? formatUsdc(asset.token.priceUsdc)
    : "";
  return (
    <Tr key={asset.id}>
      <Td>{tokenIconAndName}</Td>
      <Td>{assetVersion}</Td>
      <Td>{borrowLimitPercentage}%</Td>
      <Td>{underlyingTokenBalanceNormalized} </Td>
      <Td>{assetTokenSymbol}</Td>
      <Td>{assetPrice}</Td>
      <Td>{underlyingTokenBalanceNormalized}</Td>
      <Td>{migrationAvailable}</Td>
    </Tr>
  );
}
