import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import { addToCart } from './resolvers/addToCart';
import { checkOut } from './resolvers/checkOut';

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkOut(token: String!): Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkOut,
    },
  },
});
