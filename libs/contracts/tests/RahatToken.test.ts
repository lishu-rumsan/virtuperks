import { expect } from "chai";
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { deployRahatTokenFixture } from "./fixtures/tokenFixture.ts";
const getFunctionId = (signature: string) => {
  return hre.ethers.FunctionFragment.from(signature).selector;
}

describe('------ Rahat Token Tests ------', function () {


  describe("Deployment", function () {
    let rewardToken
    let rahatForwarder
    let accessManagerV2
    let deployer
    let manager
    // let provider: EthereumProvider;
    before(async function () {
      const fixtures = await loadFixture(deployRahatTokenFixture);
      deployer = fixtures.deployer;
      manager = fixtures.signers[1];
      rewardToken = fixtures.rewardToken;
      rahatForwarder = fixtures.rahatForwarder;
      accessManagerV2 = fixtures.accessManagerV2;
    });
    it("should deploy contracts with expected initial values", async function () {
      expect(await rewardToken.name()).to.equal('Rahat');
      expect(await rewardToken.symbol()).to.equal('RTH');
      expect(await rewardToken.decimals()).to.equal(0n);
      expect(await rewardToken.totalSupply()).to.equal(0n);
      expect(await rewardToken.authority()).to.equal(accessManagerV2.target);

    });
    it('should set manager', async function () {
      const functionSignature = rewardToken.interface.getFunction('mint').format();
      const mintId = getFunctionId(functionSignature);

      //set mint function to require manager role
      await accessManagerV2.connect(deployer).setTargetFunctionRole(rewardToken.target, [mintId], 1);

      //grant manager role to manager
      await accessManagerV2.connect(deployer).grantRole(1, manager.address, 0);

      //check if manager has access to mint function
      const canCall = await accessManagerV2.canCall(manager.address, rewardToken.target, mintId);

      //get target function role
      const targetFunctionRole = await accessManagerV2.getTargetFunctionRole(rewardToken.target, mintId);

      //get target admin delay
      const targetAdminDelay = await accessManagerV2.getTargetAdminDelay(rewardToken.target);

      //note: disable any acess if target is closed
      const isTargetClosed = await accessManagerV2.isTargetClosed(rewardToken.target);
      console.log({ canCall });
      console.log({ targetFunctionRole });
      console.log({ isTargetClosed, targetAdminDelay });

    })
    it("should mint tokens", async function () {
      await rewardToken.connect(manager).mint(manager.address, 100000n);
      //check if target is retricted with access management
      const isTargetClosedAfter = await accessManagerV2.isTargetClosed(rewardToken.target);
      console.log({ isTargetClosedAfter })
      expect(await rewardToken.balanceOf(manager.address)).to.equal(100000n);
    });

  });
});

