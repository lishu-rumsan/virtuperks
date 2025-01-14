import { randomBytes } from 'crypto';
import { uuidV4 } from 'ethers';
import * as dotenv from 'dotenv';
import { commonLib } from './_common';
dotenv.config();

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

    const AccessManager = await this.deployContract('AccessManagerV2', [])

    this.contracts['RahatToken'] = {
        address: AccessManager.contract.target as string,
        startBlock: AccessManager.blockNumber,
      };
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
