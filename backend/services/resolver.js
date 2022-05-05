const { psql } = require('./psqlConnector.js')
const joinMonster = require('join-monster')

// should match type Query in schema.js
// one function per endpoint
exports.resolver = {
    users(parent, args, context, resolveInfo) {
        return joinMonster.default(resolveInfo, {}, sql => {
          return psql.query(sql)
        })
    },
    posts(parent, args, context, resolveInfo) {
        return joinMonster.default(resolveInfo, {}, sql => {
          return psql.query(sql)
        })
    },
    async user(parent, args, context, resolveInfo) {
        if(args.username) {
          const result = await psql.query(`SELECT * FROM users WHERE username = '${args.username}'`);
          return result[0];
        } else if(args.id) {
          const result = await psql.query(`SELECT * FROM users WHERE id = ${args.id}`);
          return result[0];
        }
        return null
      },
};