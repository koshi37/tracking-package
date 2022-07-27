var TrackingChain = artifacts.require("./TrackingChain.sol");

module.exports = function(deployer) {
  deployer.deploy(TrackingChain);
};
