// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

interface IAccessManagerV2 {
  /// @notice Emitted when a role is updated for an account.
  /// @param role The role being updated (as bytes32).
  /// @param account The address of the account being updated.
  /// @param status The new status of the role (true = granted, false = revoked).
  event RoleUpdated(bytes32 indexed role, address indexed account, bool status);

  /// @notice Updates the status of a role for a specific account.
  /// @dev Only callable by an account with the ADMIN role.
  /// @param role The role to update (as bytes32).
  /// @param account The address to assign or revoke the role for.
  /// @param status The new status of the role (true = granted, false = revoked).
  function updateRole(bytes32 role, address account, bool status) external;

  /// @notice Checks if a specific account has a given role.
  /// @param role The role to check (as bytes32).
  /// @param account The address to check for the role.
  /// @return A boolean indicating whether the account has the role.
  function hasRole(bytes32 role, address account) external view returns (bool);
}
