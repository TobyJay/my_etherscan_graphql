// Import Apollo Server to create the GraphQL server
const { ApolloServer } = require("apollo-server"); 

// Import schema from the schema.graphql file
const { importSchema } = require("graphql-import");

// Import the custom EtherDataSource 
const EtherDataSource = require("./datasource/ethDatasource");

// Import the schema
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Resolvers map query fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      // Call etherBalanceByAddress method on ethDataSource
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther method on ethDataSource
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice method on ethDataSource
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime method on ethDataSource
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass ethDataSource into context
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Disable timeout
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});