
export interface ICryptoData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply?: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr?: string;
  explorer?: string;
  visibility?: boolean;
}

// Interface for AssetHistory
export interface ICryptoHistoryData {
  cryptocurrency: string; // Reference to the cryptocurrency by name
  priceUsd: string;
  time: number; // Timestamp of the historical data
}
