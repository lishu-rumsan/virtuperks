//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

//ERC20 Tokens
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import './interfaces/IRewardToken.sol';
// import '@openzeppelin/contracts/access/manager/AccessManaged.sol';
import './interfaces/IAccessManagerV2.sol';
import '@openzeppelin/contracts/metatx/ERC2771Forwarder.sol';
import '@openzeppelin/contracts/metatx/ERC2771Context.sol';

contract RewardToken is ERC20, ERC20Burnable, IRewardToken, ERC2771Context {
  uint8 private decimalPoints;

  IAccessManagerV2 public accessManager;

  bytes32 public constant MINTER_ROLE = keccak256('MINTER');
  bytes32 public appId;

  constructor(
    bytes32 _appId,
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    address _accessManager,
    address _forwarder
  )
    ERC20(_name, _symbol)
    // AccessManaged(_accessManager)
    ERC2771Context(_forwarder)
  {
    appId = _appId;
    decimalPoints = _decimals;
    accessManager = IAccessManagerV2(_accessManager);
  }

  ///@dev returns the decimals of the tokens
  function decimals() public view override returns (uint8) {
    return decimalPoints;
  }

  ///@dev Mint x amount of ERC20 token to given address
  ///@param _address Address to which ERC20 token will be minted
  ///@param _amount Amount of token to be minted
  function mint(address _address, uint256 _amount) public returns (uint256) {
    require(
      accessManager.hasRole(appId, MINTER_ROLE, _msgSender()),
      'Not a minter'
    );
    _mint(_address, _amount);
    return _amount;
  }

  /// @dev overriding the method to ERC2771Context
  function _msgSender()
    internal
    view
    override(Context, ERC2771Context)
    returns (address sender)
  {
    sender = ERC2771Context._msgSender();
  }

  /// @dev overriding the method to ERC2771Context
  function _msgData()
    internal
    view
    override(Context, ERC2771Context)
    returns (bytes calldata)
  {
    return ERC2771Context._msgData();
  }

  function _contextSuffixLength()
    internal
    view
    override(Context, ERC2771Context)
    returns (uint256)
  {
    return ERC2771Context._contextSuffixLength();
  }
}
