pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract TrackingChain {
    address owner;

    constructor() public {
        owner = msg.sender;
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
        // DeliveryStatus[] deliveryStatus;
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

    event Prepared(uint deliveryId);
    event InDelivery(uint deliveryId);
    event UpdatedPackageStatus(uint deliveryId);
    event Delivered(uint deliveryId);

    function prepareDelivery(address _delivererAddress, address _receiverAddress, string memory _localisation, string memory _info) public returns(uint){
        uint _deliveryId = deliveryIds.length;

        deliveries[_deliveryId].deliveryId = _deliveryId;
        deliveries[_deliveryId].delivererAddress = _delivererAddress;
        deliveries[_deliveryId].receiverAddress = _receiverAddress;
        deliveryIds.push(_deliveryId);

        uint _statusId = deliveries[_deliveryId].deliveryStatusIds.length;
        deliveries[_deliveryId].deliveryStatusIds.push(_statusId);
        deliveries[_deliveryId].deliveryStatus[_statusId].statusId = _statusId;
        deliveries[_deliveryId].deliveryStatus[_statusId].status = Status.Prepared;
        deliveries[_deliveryId].deliveryStatus[_statusId].time = block.timestamp;
        deliveries[_deliveryId].deliveryStatus[_statusId].localisation = _localisation;
        deliveries[_deliveryId].deliveryStatus[_statusId].info = _info;

        return _deliveryId;
    }

    function updateDeliveryStatus(uint _deliveryId, string memory _localisation, string memory _info) public{
        uint _statusId = deliveries[_deliveryId].deliveryStatusIds.length;
        deliveries[_deliveryId].deliveryStatusIds.push(_statusId);
        deliveries[_deliveryId].deliveryStatus[_statusId].statusId = _statusId;
        deliveries[_deliveryId].deliveryStatus[_statusId].status = Status.InDelivery;
        deliveries[_deliveryId].deliveryStatus[_statusId].time = block.timestamp;
        deliveries[_deliveryId].deliveryStatus[_statusId].localisation = _localisation;
        deliveries[_deliveryId].deliveryStatus[_statusId].info = _info;
    }

    function deliveredStatus(uint _deliveryId, string memory _localisation, string memory _info) public {
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

    function getStatusIdsForDelivery(uint _deliveryId) public view returns(uint[] memory) {
        return deliveries[_deliveryId].deliveryStatusIds;
    }

    function returnStatus(uint _deliveryId, uint _statusId) public view returns(DeliveryStatus memory){
        return deliveries[_deliveryId].deliveryStatus[_statusId];
    }
}