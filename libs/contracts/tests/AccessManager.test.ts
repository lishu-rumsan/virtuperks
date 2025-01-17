import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('AccessManager', function () {
  let AccessManager;
  let accessManager;
  let owner;
  let newAppOwner;
  let addr1;
  let account;
  let user;

  const appId = ethers.formatBytes32String('app1');
  const role = ethers.formatBytes32String('admin');

  beforeEach(async function () {
    [owner, newAppOwner, addr1, account, user] = await ethers.getSigners();

    AccessManager = await ethers.getContractFactory('AccessManager');
    accessManager = await AccessManager.deploy(owner);
  });

  describe('transferOwnership', async () => {
    it('should transfer ownership to a new owner and throw event', async () => {
      await accessManager.transferOwnership(appId, newAppOwner.address);

      const newAdmin = await accessManager._appAdmin(appId);
      expect(newAdmin).to.equal(newAppOwner.address);
      await expect(accessManager.transferOwnership(appId, newAppOwner.address))
        .to.emit(accessManager, 'OwnershipTransferred')
        .withArgs(appId, owner.address, newAppOwner.address);
    });

    it('should revert if the caller is not the admin', async () => {
      await expect(
        accessManager
          .connect(addr1)
          .transferOwnership(appId, newAppOwner.address)
      ).to.be.revertedWith('AccessManager: Not an admin');
    });
  });

  describe('createApp', async () => {
    it('should create new application and throw event', async () => {
      await accessManager.createApp(appId, account.address);

      const newAccount = await accessManager._appAdmin(appId);
      expect(newAccount).to.equal(account.address);
      await expect(accessManager.createApp(appId, account.address))
        .to.emit(accessManager, 'createApp')
        .withArgs(appId, account.address);
    });

    it('should revert if the app already exists', async () => {
      await expect(
        accessManager.createApp(appId, account.address)
      ).to.be.revertedWith('AccessManager: App already exists');
    });
  });

  describe('grantRole', async () => {
    it('should grant role to an account if called by the app admin', async () => {
      await accessManager
        .connect(owner)
        .grantRole(appId, role, account.address);

      const hasRole = accessManager.roles(appId, role, account.address);
      await expect(accessManager.grantRole(appId, role, account.address))
        .to.emit(accessManager, 'grantRole')
        .withArgs(appId, role, account.address);
      expect(hasRole).to.be(true);
    });

    it('should revert if called by a non-admin', async () => {
      await expect(
        accessManager.connect(owner).grantRole(appId, role, account.address)
      ).to.be.revertedWith('AccessManager: Not an admin');
    });
  });

  describe('revokeRole', async () => {
    it('should revoke role from user by admin', async () => {
      await accessManager.revokeRole(appId, role, user.address);

      const hasRole = await accessManager.roles(appId, role, user.address);
      await expect(accessManager.revokeRole(appId, role, user.address))
        .to.emit(accessManager, 'revokeRole')
        .withArgs(appId, role, user.address);
      expect(hasRole).to.equal(false);
    });

    it('should revert if called by a non-admin', async () => {
      await expect(
        accessManager.connect(user).revokeRole(appId, role, user.address)
      ).to.be.revertedWith('AccessManager: Not an admin');
    });
  });

  describe('hasRole', async () => {
    it('should return true if the user has the role', async () => {
      const findRole = await accessManager.hasRole(appId, role, user.address);
      expect(findRole).to.equal(true);
    });

    it('should return false if user does not have the role', async () => {
      await expect(accessManager.hasRole(appId, role, user.address)).to.be
        .false;
    });
  });
});
