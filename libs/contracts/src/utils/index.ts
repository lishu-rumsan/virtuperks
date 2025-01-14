import fs from 'fs'; // Importing the fs module
import path from 'path'; // Importing path module

// const { signMetaTxRequest } = require("./signer")
// module.exports = {
//   signMetaTxRequest,
// }

// const readAllJsonFiles = () => {
//   const jsonFiles = fs.readdirSync(`${__dirname}/../../build/artifacts/src/contracts`);
//   const contractArtifactPaths = [];
//   jsonFiles.forEach((file) => {
//     const files = fs.readdirSync(`${__dirname}/../../build/artifacts/src/contracts/${file}`);
//     files.forEach((f) => {
//       if (f.includes('.json')) {
//         //read the content of the file
//         //remove .dbg.json from file name string
//         const fileName = f.replace('.json', '');
//         const content = JSON.parse(fs.readFileSync(`${__dirname}/../../build/artifacts/src/contracts/${file}/${f}`, 'utf8'));
//         //only get the last id from this string format '../../../build-info/8b726545c8bf4ae06e6409c02d82af7e.json
//         buildFilePaths.push({ contract: fileName, buildInfoId: content.buildInfo.split('/').at(-1).replace('.json', '') });
//       }
//     });
//   });
//   return buildFilePaths;
// };

// Function to read and export contract JSON files

const CONTRACTS_TO_EXPORT = [
  'RewardClaimer',
  'RewardToken',
  'AccessManagerV1',
  'AccessManagerV2',
  'AccessManagerV3'
]
export const readContractArtifacts = () => {
  const buildFilePaths: any = [];
  const contractsDir = path.join(__dirname, '../../build/artifacts/src/contracts');

  CONTRACTS_TO_EXPORT.forEach(contract => {
    const filePath = path.join(contractsDir, `${contract}.json`);
    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      buildFilePaths.push({ contract, content });
    }
  });

  return buildFilePaths;
};

export const contract = () => {
  return 'contract.ts';
}