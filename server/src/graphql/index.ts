import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import GqlTypes from "./GqlTypes";
import Queries from "./Queries";

import type { GraphQLFieldConfigMap } from "graphql";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLFieldReturn = GraphQLFieldConfigMap<any, any>;
type Entity = Category | Product;

async function getObjectFromGlobalId(globalId, ctx): Promise<Entity> {
  const { type, id } = fromGlobalId(globalId);

  if (type === "Category") return await ctx.entityManager.findOne(Category, id);
  if (type === "Product") return await ctx.entityManager.findOne(Product, id);
}

const { nodeInterface, nodeField } = nodeDefinitions(getObjectFromGlobalId);
const types = new GqlTypes(nodeInterface);
const {
  fetchCategories,
  fetchCategory,
  searchProducts,
  fetchProduct,
  sendContactMessage,
  sendQuoteRequest,
} = new Queries(types);

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: (): GraphQLFieldReturn => ({
    node: nodeField,
    fetchCategories,
    fetchCategory,
    searchProducts,
    fetchProduct,
    sendContactMessage,
    sendQuoteRequest,
  }),
});

const schema = new GraphQLSchema({ query: queryType });

export default schema;
