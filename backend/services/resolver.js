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
    }
};