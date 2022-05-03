//const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = require('graphql');

const resolver = require('./resolver.js').resolver; // our resolver from resolver.js

const User = new GraphQLObjectType({
    name: 'User',
    extensions:{ 
        joinMonster: {
        sqlTable: 'users',
        uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(Post),
            extensions:{ 
                joinMonster: {
                    sqlJoin: (userTable, postTable, args) => `${userTable}.id = ${postTable}.author_id`
                }
            },
        }
    })
})

const Post = new GraphQLObjectType({
    name: 'Post',
    extensions:{ 
        joinMonster: {
        sqlTable: 'posts',
        uniqueKey: 'id',
        }
    },
    fields: () => ({
        id: { type: GraphQLInt },
        cleaned_title: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        created_at: { type: GraphQLString },
        views: { type: GraphQLInt },
        author_id: { type: GraphQLInt },
        user: {
            type: User,
            extensions:{ 
                joinMonster: {
                    sqlJoin: (postTable, userTable, args) => `${postTable}.author_id = ${userTable}.id`
                }
            },
        }
    })
})

const QueryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Hello world!"
          },
        users: {
            type: new GraphQLList(User),
            resolve: resolver.users
        },
        posts: {
            type: new GraphQLList(Post),
            resolve: resolver.posts
        }
    })
})

exports.schema = new GraphQLSchema({ query: QueryRoot });