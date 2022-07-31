const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');

// circular reference resolved with closures
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const res = await axios(
          `http://localhost:3000/companies/${parentValue.id}/users`
        );
        return res.data;
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parentValue, args) {
        const res = await axios.get(
          `http://localhost:3000/companies/${parentValue.companyId}`
        );
        return res.data;
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      async resolve(parentValue, { firstName, age }) {
        const res = await axios.post(`http://localhost:3000/users`, {
          firstName,
          age,
        });
        return res.data;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, { id }) {
        const res = await axios.delete(`http://localhost:3000/users/${id}`);
        return res.data;
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        companyId: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(
          `http://localhost:3000/users/${args.id}`,
          args
        );
        return res.data;
      },
    },
  },
});

// Root Query represents entry point to data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // can query a user
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // acess db or data store for data
      async resolve(parentValue, args) {
        const res = await axios(`http://localhost:3000/users/${args.id}`);
        return res.data;
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const res = await axios(`http://localhost:3000/companies/${args.id}`);
        return res.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
