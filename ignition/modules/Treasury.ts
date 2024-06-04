import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ZERO_ADDRESS } from "../../helpers";
import hre from "hardhat";
import { encodeFunctionData } from "viem";

const initializeAbi = {
  inputs: [
    {
      internalType: "address",
      name: "fundsAdmin",
      type: "address",
    },
  ],
  name: "initialize",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};

const TreasuryModule = buildModule("TreasuryModule", (m) => {
  const deployer = m.getAccount(0);
  const TreasuryProxy = m.contract(
    "InitializableAdminUpgradeabilityProxy",
    [],
    { from: deployer }
  );

  const TreasuryController = m.contract(
    "AaveEcosystemReserveController",
    [deployer],
    { from: deployer }
  );

  const TreasuryImpl = m.contract("AaveEcosystemReserveV2", []);

  return {
    TreasuryProxy,
    TreasuryController,
    TreasuryImpl,
  };
});

const InitializeModule = buildModule("IntializeModule", (m) => {
  const { TreasuryController, TreasuryImpl, TreasuryProxy } =
    m.useModule(TreasuryModule);

  const controller = m.contractAt(
    "AaveEcosystemReserveController",
    TreasuryController
  );
  const treasuryImpl = m.contractAt("AaveEcosystemReserveV2", TreasuryImpl);
  const proxy = m.contractAt(
    "InitializableAdminUpgradeabilityProxy",
    TreasuryProxy
  );

  //console.log(controller.address);
});

export default TreasuryModule;
