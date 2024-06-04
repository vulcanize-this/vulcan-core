import { eMoltenNetwork, IAaveConfiguration } from "../../helpers/types";
import AaveMarket from "../aave";
import { strategyUSDC } from "../aave/reservesConfigs";

export const MoltenConfig: IAaveConfiguration = {
  ...AaveMarket,
  MarketId: "Molten Market",
  ATokenNamePrefix: "Molten",
  StableDebtTokenNamePrefix: "Molten",
  VariableDebtTokenNamePrefix: "Molten",
  SymbolPrefix: "Molten",
  ProviderId: 360,
  ReservesConfig: {
    USDC: strategyUSDC,
  },
  ReserveAssets: {
    [eMoltenNetwork.molten]: {
      USDC: "0x135B641E61CFC9a068b82E02fF0f051f6e5D4721",
    },
  },
  EModes: {},
};

export default MoltenConfig;
