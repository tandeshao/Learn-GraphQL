const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
} = require("graphql");
const { shops, items } = require("./data.js");

const shopType = new GraphQLObjectType({
  name: "Shop",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    items: {
      type: new GraphQLList(itemType),
      resolve(parent, args) {
        return items.filter((item) => item.shops.some(shop => shop.id === parent.id));
      },
    },
  }),
});

const itemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    shops: {
      type: new GraphQLList(shopType),
      resolve(parent, args) {
        return shops.filter((shop) => shop.items.some(item => item.id === parent.id));
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    shops: {
      type: new GraphQLList(shopType),
      resolve: (parent, args) => {
        return shops;
      },
    },
    items: {
      type: new GraphQLList(itemType),
      resolve: (parent, args) => {
        return items;
      },
    },
    selectShops: {
      type: new GraphQLList(shopType),
      args: {
        limit: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return shops.slice(0, args.limit);
      },
    },
    selectItems: {
      type: new GraphQLList(itemType),
      args: {
        limit: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return items.slice(0, args.limit);
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addShop: {
      type: shopType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const shop = {
          id: shops.length + 1,
          name: args.name,
          items: [],
        };
        shops.push(shop);
        return shop;
      },
    },
    addItem: {
      type: itemType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const item = {
          id: items.length + 1,
          name: args.name,
          price: args.price,
          shops: [],
        };
        items.push(item);
        return item;
      },
    },
    addItemsToShop: {
      type: shopType,
      args: {
        shopId: { type: GraphQLInt },
        itemIds: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const shop = shops.find((shop) => shop.id === args.shopId);
        args.itemIds.forEach((itemId) => {
          const item = items.find((item) => item.id === itemId);
          shop.items.push(item);
          item.shops.push(shop);
        });
        return shop;
      },
    },
    addShopsToItem: {
      type: itemType,
      args: {
        itemId: { type: GraphQLInt },
        shopIds: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const item = items.find((item) => item.id === args.itemId);
        args.shopIds.forEach((shopId) => {
          const shop = shops.find((shop) => shop.id === shopId);
          item.shops.push(shop);
          shop.items.push(item);
        });
        return item;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
