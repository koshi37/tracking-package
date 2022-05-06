var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TrackingChain = artifacts.require("./TrackingChain.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TrackingChain);
};
