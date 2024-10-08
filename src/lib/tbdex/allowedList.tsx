import { mockProviderDids } from "./pfiDiDMocks";

export interface PfiAllowlistConfig {
  pfiUri: string;
  pfiName: string;
}

export const pfiAllowlist: PfiAllowlistConfig[] = [
  {
    pfiUri: mockProviderDids.aquafinance_capital.uri,
    pfiName: mockProviderDids.aquafinance_capital.name,
  },
];
