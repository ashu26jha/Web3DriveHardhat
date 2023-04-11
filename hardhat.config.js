require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          // // If you want to do some forking, uncomment this
          // forking: {
          //   url: MAINNET_RPC_URL
          // }
          chainId: 31337,
      },
      localhost: {
          chainId: 31337,
      },
      goerli: {
          url: GOERLI_RPC_URL,
          accounts: [PRIVATE_KEY],
          saveDeployments: true,
          chainId: 5,
          blockConfirmations: 6,
      },
      sepolia: {
          url: SEPOLIA_RPC_URL,
          accounts: [PRIVATE_KEY],
          chainId: 11155111,
          blockConfirmations: 6,
      },
      mumbai: {
        url: MUMBAI_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 80001,
        blockConfirmations: 6,
      }
  },
  etherscan: {
      // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
      apiKey: {
          goerli: ETHERSCAN_API_KEY,
          sepolia: ETHERSCAN_API_KEY,
          polygonMumbai: process.env.POLYSCAN_API_KEY,
      },
      customChains: [],
  },
  gasReporter: {
      enabled: REPORT_GAS,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
      // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
      runOnCompile: false,
      only: ["Raffle"],
  },
  namedAccounts: {
      deployer: {
          default: 0, // here this will by default take the first account as deployer
      },
      player: {
          default: 1,
      },
  },
  solidity: {
      compilers: [
          {
              version: "0.8.8",
          },
          {
              version: "0.6.6"
          },
      ],
  },
  mocha: {
      timeout: 500000, 
  },
}
