import { randomBytes } from 'crypto';
import { uuidV4 } from 'ethers';
import { commonLib } from './_common';

interface DeployedContract {
  address: string;
  startBlock: number;
}

class SeedProject extends commonLib {
  contracts: Record<string, DeployedContract>;

  constructor() {
    super();
    this.contracts = {};
  }

  static getUUID() {
    return uuidV4(randomBytes(16));
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async deployAccessManagerContract() {
    const deployerAccount = this.getDeployerWallet();

    console.log('--------Deploying Access Manager Contract---------')

    const AccessManager = await this.deployContract('AccessManagerV2', [])

    this.contracts['RahatToken'] = {
        address: AccessManager.contract.target as string,
        startBlock: AccessManager.blockNumber,
      };
      
    console.log(AccessManager)
  }
  
}

async function main() {
  const seedProject = new SeedProject();
  await seedProject.deployAccessManagerContract();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
