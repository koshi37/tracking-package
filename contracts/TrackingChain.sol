pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract TrackingChain {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function generateId() public view returns(uint){
        return (uint(keccak256(abi.encodePacked(block.timestamp)))%1000000000);
    }

    enum Status {
        Prepared, //delivery is prepared to receive by deliverer
        InDelivery, //deliverer took package
        Delivered //delivery is ready to pick up
    }

    struct Delivery {
        uint deliveryId;
        address delivererAddress;
        address receiverAddress;
        mapping(uint => DeliveryStatus) deliveryStatus;
        uint[] deliveryStatusIds;
    }

    struct DeliveryStatus {
        uint statusId;
        Status status;
        uint time;
        string localisation;
        string info;
    }

    uint[] public deliveryIds;

    mapping(uint => Delivery) deliveries;

    mapping(address => uint[]) delivererDeliveries;
    mapping(address => uint[]) receiverDeliveries;

    function prepareDelivery(address _receiverAddress, string memory _localisation, string memory _info) public returns(uint){
        uint _deliveryId = generateId();

        deliveries[_deliveryId].deliveryId = _deliveryId;
        deliveries[_deliveryId].delivererAddress = msg.sender;
        deliveries[_deliveryId].receiverAddress = _receiverAddress;
        deliveryIds.push(_deliveryId);

        uint _statusId = deliveries[_deliveryId].deliveryStatusIds.length;
        deliveries[_deliveryId].deliveryStatusIds.push(_statusId);
        deliveries[_deliveryId].deliveryStatus[_statusId].statusId = _statusId;
        deliveries[_deliveryId].deliveryStatus[_statusId].status = Status.Prepared;
        deliveries[_deliveryId].deliveryStatus[_statusId].time = block.timestamp;
        deliveries[_deliveryId].deliveryStatus[_statusId].localisation = _localisation;
        deliveries[_deliveryId].deliveryStatus[_statusId].info = _info;

        delivererDeliveries[msg.sender].push(_deliveryId);
        receiverDeliveries[_receiverAddress].push(_deliveryId);

        return _deliveryId;
    }

    function updateDeliveryStatus(uint _deliveryId, string memory _localisation, string memory _info) public{
        require(msg.sender == deliveries[_deliveryId].delivererAddress, 'must be deliverer of this package');
        
        uint _statusId = deliveries[_deliveryId].deliveryStatusIds.length;
        deliveries[_deliveryId].deliveryStatusIds.push(_statusId);
        deliveries[_deliveryId].deliveryStatus[_statusId].statusId = _statusId;
        deliveries[_deliveryId].deliveryStatus[_statusId].status = Status.InDelivery;
        deliveries[_deliveryId].deliveryStatus[_statusId].time = block.timestamp;
        deliveries[_deliveryId].deliveryStatus[_statusId].localisation = _localisation;
        deliveries[_deliveryId].deliveryStatus[_statusId].info = _info;
    }

    function deliveredStatus(uint _deliveryId, string memory _localisation, string memory _info) public {
        require(msg.sender == deliveries[_deliveryId].delivererAddress, 'must be deliverer of this package');
        
        uint _statusId = deliveries[_deliveryId].deliveryStatusIds.length;
        deliveries[_deliveryId].deliveryStatusIds.push(_statusId);
        deliveries[_deliveryId].deliveryStatus[_statusId].statusId = _statusId;
        deliveries[_deliveryId].deliveryStatus[_statusId].status = Status.Delivered;
        deliveries[_deliveryId].deliveryStatus[_statusId].time = block.timestamp;
        deliveries[_deliveryId].deliveryStatus[_statusId].localisation = _localisation;
        deliveries[_deliveryId].deliveryStatus[_statusId].info = _info;
    }

    function getDeliveryIds() public view returns(uint[] memory) {
        return deliveryIds;
    }

    function getReceiverDeliveryIds() public view returns(uint[] memory) {
        return receiverDeliveries[msg.sender];
    }

    function getDelivererDeliveryIds() public view returns(uint[] memory) {
        return delivererDeliveries[msg.sender];
    }

    function getStatusIdsForDelivery(uint _deliveryId) public view returns(uint[] memory) {
        return deliveries[_deliveryId].deliveryStatusIds;
    }

    function getLastStatusIdsForDelivery(uint _deliveryId) public view returns(DeliveryStatus memory) {
        uint id = 0;
        if(deliveries[_deliveryId].deliveryStatusIds.length > 0) {
            id = deliveries[_deliveryId].deliveryStatusIds.length-1;
        }
        uint statusId = deliveries[_deliveryId].deliveryStatusIds[id];
        return deliveries[_deliveryId].deliveryStatus[statusId];
    }

    function returnStatus(uint _deliveryId, uint _statusId) public view returns(DeliveryStatus memory){
        return deliveries[_deliveryId].deliveryStatus[_statusId];
    }
}