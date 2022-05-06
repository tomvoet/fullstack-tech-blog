//const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');

const resolver = require('./resolver.js').resolver; // our resolver from resolver.js
const { psql } = require('./psqlConnector.js')

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
        intro: { type: GraphQLString },
        created_at: { type: GraphQLString },
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
        },
        user: {
            type: User,
            args: { username: { type: GraphQLString } },
            extensions: {
                joinMonster: {        
                    where: (userTable, args, context) => {
                        if(args.username) { return `${userTable}.username = '${args.username}'` }
                    },
                }
            },
            resolve: resolver.user
        },
        post: {
            type: Post,
            args: { cleaned_title: { type: GraphQLString } },
            extensions: {
                joinMonster: {        
                    where: (postTable, args, context) => {
                        if(args.cleaned_title) { return `${postTable}.cleaned_title = '${args.cleaned_title}'` }
                    },
                }
            },
            resolve: resolver.post
        }
    })
})

const MutationRoot = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      user: {
        type: User,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString) },
          password_hash: { type: new GraphQLNonNull(GraphQLString) },
          intro: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args, context, resolveInfo) => {
          try {
            var date = new Date();
            console.log(date.toISOString());
            var result = await psql.query(`INSERT INTO users (email, username, password_hash, created_at, last_login, intro) VALUES ('${args.email}', '${args.username}', '${args.password_hash}', '${date.toISOString()}', '${date.toISOString()}', '${args.intro}') RETURNING *`)
            return result[0];
          } catch (err) {
              console.log(err)
            throw new Error("Failed to insert new user")
          }
        }
      }
    })
  })

exports.schema = new GraphQLSchema({ 
    query: QueryRoot,
    mutation: MutationRoot
});