import { getAddress } from "@ethersproject/address";

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address, chars) {
  if (!address) {
    return "";
  }
  if (address.endsWith(".eth")) {
    return address;
  }

  if (!chars) {
    chars = 4;
  }
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}
