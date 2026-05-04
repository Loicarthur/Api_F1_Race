import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';

export const GpType = new GraphQLObjectType({
  name: 'Gp',
  fields: {
    id: { type: GraphQLID },
    gp_id: { type: GraphQLInt },
    location: { type: GraphQLString },
    date_start: { type: GraphQLString },
    date_end: { type: GraphQLString },
    session_type: { type: GraphQLString },
    session_name: { type: GraphQLString },
    country_key: { type: GraphQLInt },
    country_code: { type: GraphQLString },
    country_name: { type: GraphQLString },
    circuit_key: { type: GraphQLInt },
    circuit_short_name: { type: GraphQLString },
    circuit_image: { type: GraphQLString },
    gmt_offset: { type: GraphQLString },
    year: { type: GraphQLInt },
  },
});
