import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CoreModule = buildModule("CoreModule", (m) => {
  const deployer = m.getAccount(0);

  const PoolAddressesProviderRegistry = m.contract(
    "PoolAddressesProviderRegistry",
    [deployer],
    {
      from: deployer,
    }
  );
  m.call(PoolAddressesProviderRegistry, "transferOwnership", [deployer]);

  const SupplyLogic = m.contract("SupplyLogic", [], { from: deployer });
  const BorrowLogic = m.contract("BorrowLogic", [], { from: deployer });
  const LiquidationLogic = m.contract("LiquidationLogic", [], {
    from: deployer,
  });
  const EModeLogic = m.contract("EModeLogic", [], {
    from: deployer,
  });
  const BridgeLogic = m.contract("BridgeLogic", [], {
    from: deployer,
  });
  const ConfiguratorLogic = m.contract("ConfiguratorLogic", [], {
    from: deployer,
  });  
  const FlashLoanLogic = m.contract("FlashLoanLogic", [], {
    from: deployer,
    libraries: {
      BorrowLogic: BorrowLogic
    }
  });
  const PoolLogic = m.contract("PoolLogic", [], {
    from: deployer,
  });

  return {
    PoolAddressesProviderRegistry,
    SupplyLogic,
    BorrowLogic,
    LiquidationLogic,
    EModeLogic,
    ConfiguratorLogic,
    BridgeLogic,
    FlashLoanLogic,
    PoolLogic,
  };
});

export default CoreModule;
