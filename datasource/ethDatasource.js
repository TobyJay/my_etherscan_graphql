// Import the RESTDataSource class from Apollo to enable REST API calls
const { RESTDataSource } = require("apollo-datasource-rest"); 

// Vitalik's Ethereum address we will use for API requests
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Custom data source class to make Etherscan API requests
class EtherDataSource extends RESTDataSource {

  // Set base URL for Etherscan API 
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api"; 
  }

  // Get ETH balance for a specified address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Get total ETH supply
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}` 
    );
  }

  // Get latest ETH price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Get estimated block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;