const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CoffeeModule", (m) => {
  const coffee = m.contract("coffee");

  return { coffee };
});
