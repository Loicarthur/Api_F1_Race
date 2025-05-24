import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: {
    id: { type: GraphQLID },
    trackName: { type: GraphQLString },
    countryName: { type: GraphQLString },
    pictureCountry: { type: GraphQLString },
    pictureTrack: { type: GraphQLString }
  }
});

import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const TrackInputType = new GraphQLInputObjectType({
  name: 'TrackInput',
  fields: {
    trackName: { type: new GraphQLNonNull(GraphQLString) },
    countryName: { type: new GraphQLNonNull(GraphQLString) },
    pictureCountry: { type: new GraphQLNonNull(GraphQLString) },
    pictureTrack: { type: new GraphQLNonNull(GraphQLString) }
  }
});

