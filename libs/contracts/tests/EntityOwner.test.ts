// // const { ethers } = require('hardhat');
// // 
// import { ethers } from 'hardhat';

// describe('------ Entity Owner Smart Contract Tests ------', function () {
//   describe('Task', function () {
//     let superAdmin;
//     let entittyOwner;
//     let owner;
//     let participant;

//     beforeEach(async function () {
//       [owner, participant] = await ethers.getSigners();

//       const AccessControl = await ethers.getContractFactory('AccessControl');
//       const accessControl = await AccessControl.deploy();
//       await accessControl.deployed();

//     });

//     it('should create a task', async () => {
//       const task = {
//         id: 'chdu88cd3frvss',
//         detailsUrl: 'abc',
//         rewardToken: 'movie tickets',
//         rewardAmount: 20,
//         allowedWallets: ['a', 'b', 'c'],
//         expiryDate: '123',
//         owner: 'l',
//         isActive: true,
//       };
//     });
//   });
// });
