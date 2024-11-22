const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./schema');

const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(6)],
  }),
  Track: () => ({
    id: () => 'track_01',
    title: () => 'Astro Kitty, Space Explorer',
    author: () => {
      return {
        name: 'Grumpy Cat',
        photo:
          'https://media.istockphoto.com/id/1442849073/photo/the-earth-space-planet-3d-illustration-background-city-lights-on-planet.jpg?s=2048x2048&w=is&k=20&c=uOBRg2CaHH3pwifbcN-PICVlNug6RDaiBz5ouUSBgWc=',
      };
    },
    thumbnail: () =>
      'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:0,ch:0,q:80,w:650/QDwbMADmD6BYnjiaPy5D77.png.webp',
    length: () => 1210,
    modulesCount: () => 6,
  }),
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });
  const { url } = await startStandaloneServer(server);

  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
