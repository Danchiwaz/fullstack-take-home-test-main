import { GraphQLClient } from "graphql-request";
import { API_URL } from "../constants";

export const graphQLClient = new GraphQLClient(API_URL, {});