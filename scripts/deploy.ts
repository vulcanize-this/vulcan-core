import hre, { viem } from "hardhat";
import TreasuryModule from "../ignition/modules/Treasury";
import { getContract, encodeFunctionData } from "viem";
import { ZERO_ADDRESS } from "../helpers";

const main = async () => {
  const { TreasuryController, TreasuryImpl, TreasuryProxy } =
    await hre.ignition.deploy(TreasuryModule);


  const controllerContract = viem.getContractAt(
    "AaveEcosystemReserveController",
    TreasuryController.address
  );
  const treasuryImpl = viem.getContractAt(
    "AaveEcosystemReserveV2",
    TreasuryImpl.address
  );

  (await treasuryImpl).write.initialize([ZERO_ADDRESS]);

  const proxyContract = viem.getContractAt(
    "InitializableAdminUpgradeabilityProxy",
    TreasuryProxy.address
  );

  const payload = encodeFunctionData({
    abi: (await treasuryImpl).abi,
    functionName: "initialize",
    args: [(await treasuryImpl).address],
  });

  const treasuryOwner = await (await controllerContract).read.owner();
  // console.log(treasuryOwner);

  await (await proxyContract).write.initialize([(await treasuryImpl).address, treasuryOwner, payload]);


  
};

main().catch((e) => console.error(e));
