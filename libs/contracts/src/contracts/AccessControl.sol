// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.20;
// import '@openzeppelin/contracts/access/AccessControl.sol';
// import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
// contract ACL is ERC20, AccessControl {
//     bytes32 public constant SUPER_ADMIN = keccak256('SUPER_ADMIN');

//     constructor(address superAdmin) {
//         _grantRole(SUPER_ADMIN, superAdmin);
//         _mint(superAdmin, 100000 * 10 ** decimals());
//         _setRoleAdmin(SUPER_ADMIN, SUPER_ADMIN);
//         _setRoleAdmin(ENTITY_MANAGER, SUPER_ADMIN);
//         _setRoleAdmin(PARTICIPANT, SUPER_ADMIN);
//     }

//     mapping(address => mapping(string => bool)) private roles;

//     ///@notice This function mints token for the finance_manager and entity
//     ///@param _address The address of the entity
//     ///@param amount The amount of tokens to mint
//     function mint(
//         address _address,
//         uint256 amount
//     ) external onlyRole(SUPER_ADMIN) {}

//     ///@notice This function assigns the role for entity, task_owner and participant
//     ///@param user The address of the user
//     ///@param role The role to be assigned
//     function assignRole(address user, string memory role) public {}

//     ///@notice This function will revoke role
//     ///@param user The address of the user
//     ///@param role The role to be revoked
//     function revokeRole(address user, string memory role) public {}

//     ///@notice This function will check role
//     ///@param user The address of the user
//     ///@param role The role to be checked
//     function hasRole(
//         address user,
//         string memory role
//     ) public view returns (bool) {}
// }
