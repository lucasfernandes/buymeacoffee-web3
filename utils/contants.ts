export   const ftmChain: any = {
  url: process.env.NEXT_PUBLIC_GETBLOCK_FANTOM_URL,
  id: 250,
  name: "Fantom Opera",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom Opera",
    symbol: "FTM",
  },
  rpcUrls: {
    default: "https://rpc.ftm.tools",
  },
  blockExplorers: {
    default: { name: "ftmscan", url: "https://ftmscan.com" },
  },
  testnet: false,
};