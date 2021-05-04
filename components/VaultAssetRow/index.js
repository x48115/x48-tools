import styled from "styled-components";
import { formatUsdc, formatTokenAmount } from "../../utilities/string";

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

export default function (asset) {
  console.log(asset);
  const tokenId = asset.token.id;
  const tokenIconUrl = `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${tokenId}/logo.svg`;
  const tokenIcon = <TokenIcon src={tokenIconUrl} />;
  const underlyingTokenBalance =
    asset.underlyingTokenBalance.amount / 10 ** asset.token.decimals;
  const underlyingTokenBalanceUsdc = asset.underlyingTokenBalance.amountUsdc;
  return (
    <Tr key={asset.id}>
      <Td>
        <TokenIconAndName>
          {tokenIcon}
          <AssetName>{asset.name}</AssetName>
        </TokenIconAndName>
      </Td>
      <Td>
        {formatTokenAmount(underlyingTokenBalance)} {asset.token.symbol}
      </Td>
      <Td>{formatUsdc(underlyingTokenBalanceUsdc)}</Td>
    </Tr>
  );
}
