// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Multicall.sol';
import '../interfaces/IAccessManagerV2.sol';

contract AccessManagerV2 is IAccessManagerV2, Multicall {
  bytes32 ADMIN_ROLE = keccak256('ADMIN');

  // Mapping role => user address => status
  mapping(bytes32 => mapping(address => bool)) private _roles;

  constructor(address[] memory _adminAddresses) {
    for (uint256 i = 0; i < _adminAddresses.length; i++) {
      _roles[ADMIN_ROLE][_adminAddresses[i]] = true;
      emit RoleUpdated(ADMIN_ROLE, _adminAddresses[i], true);
    }
  }

  modifier onlyRole(bytes32 role) {
    require(
      _roles[role][msg.sender],
      'AccessManager: insufficient permissions'
    );
    _;
  }

  function updateRole(
    bytes32 role,
    address account,
    bool status
  ) public onlyRole(ADMIN_ROLE) {
    _roles[role][account] = status;
    emit RoleUpdated(role, account, status);
  }

  function hasRole(bytes32 role, address account) public view returns (bool) {
    return _roles[role][account];
  }
}
