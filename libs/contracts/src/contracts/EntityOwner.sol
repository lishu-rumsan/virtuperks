// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
// import './AccessControl.sol';

// contract RewardSystem is ERC20, AccessControl {
//     AccessControl private acl;

//     bytes32 public constant SUPER_ADMIN = keccak256('SUPER_ADMIN');
//     bytes32 public constant ENTITY_OWNER = keccak256('ENTITY_OWNER');
//     bytes32 public constant TASK_OWNER = keccak256('TASK_OWNER');
//     bytes32 public constant PARTICIPANT = keccak256('PARTICIPANT');

//     event TaskCreated(string indexed id, address indexed createdBy);

//     event TaskAccepted(string indexed id);

//     event AssignmentAccepted(string indexed id);

//     event AssignmentCompleted(string indexed id);

//     event TaskApproved(string indexed id);

//     enum TaskStatus {
//         OPEN,
//         CLOSED
//     }

//     enum STATUS {
//         UNACCEPTED,
//         ACCEPTED,
//         COMPLETED,
//         VERIFIED
//     }

//     struct Task {
//         string detailsUrl;
//         address rewardToken;
//         uint256 rewardAmount;
//         address[] allowedWallets;
//         uint expiryDate;
//         address owner;
//         boolean isActive;
//     }

//     struct TaskAssignment {
//         address participant;
//         STATUS status;
//     }

//     mapping(string => Task) public tasks;
//     mapping(string => TaskAssignment) public taskAssignments;

//     constructor(string name, address superAdmin) ERC20('Reward System', 'RST') {
//         acl = AccessControl(aclAddress);
//     }

//     modifier onlyCreator(bytes32 role) {
//         require(acl.hasRole(role));
//         _;
//     }

//     ///@notice This function creates a new Task
//     ///@param task The task object
//     function createTask(Task memory task) public {
//         require(
//             hasRole(msg.sender, 'ENTITY_OWNER'),
//             'Caller is not a ENTITY_OWNER'
//         );
//         if (task.owner == address(0)) {
//             task.owner = msg.sender;
//         }

//         tasks[task.id] = task;
//         emit TaskCreated(task.id, task.owner);
//     }

//     ///@notice This function will provide access for participant to apply for the task
//     ///@param taskId The id of the task
//     function registerToTask(uint256 taskId) public onlyCreator(PARTICIPANT) {
//         require(tasks[taskId].isActive, 'Task is not active');
//         require(tasks[taskId].expiryDate > block.timestamp, 'Task is expired');
//         require(
//             tasks[taskId].allowedWallets[msg.sender],
//             'User is not allowed to apply for the task'
//         );
//         require(
//             taskAssignments[taskId].participant != address(0),
//             'User is already registered for the task'
//         );

//         TaskAssignment assignment = TaskAssignment({
//             participant: participantAddress,
//             status: STATUS.UNACCEPTED // Explicitly setting to default
//         });
//         taskAssignments[taskId] = assignment;
//     }

//     ///@notice This function will change the status of the task
//     ///@param taskId The id of the task
//     // only employee can complete task
//     function completeAssignment(
//         uint256 taskId
//     ) public onlyCreator(PARTICIPANT) {
//         require(
//             taskAssignments[taskId].participant == msg.sender,
//             'User is not allowed to complete the task'
//         );
//         require(
//             taskAssignments[taskId].status == STATUS.ACCEPTED,
//             'Task is not accepted or already completed'
//         );
//         require(tasks[taskId].expiryDate > block.timestamp, 'Task is expired');
//         require(tasks[taskId].isActive, 'Task is not active');

//         taskAssignments[taskId].status = STATUS.COMPLETED;
//     }

//     ///@notice This function will change the status of the task
//     ///@param taskId The id of the task
//     function approveTask(string memory taskId) external onlyRole(ENTITY_OWNER) {
//         require(tasks[taskId].owner != address(0), 'Task does not exist');
//         require(tasks[taskId].isActive, 'Task is not active');
//         require(
//             taskAssignments[taskId].status == STATUS.VERIFIED,
//             'Task is not completed'
//         );

//         tasks[taskId].isActive = false;

//         // _transfer(msg.sender, to, value);

//         emit TaskApproved(taskId);
//     }
// }
