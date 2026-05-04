import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const GPType = new GraphQLObjectType({
  name: 'GP',
  fields: {
    id: { type: GraphQLID },
    position: { type: GraphQLString },
    driver: { type: GraphQLString },
    team: { type: GraphQLString },
    number: { type: GraphQLString },
    scraped_at: { type: GraphQLString },
  },
});
