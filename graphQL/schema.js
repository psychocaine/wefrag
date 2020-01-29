import db from "../database/db";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from "graphql";

const user = new GraphQLObjectType({
  name: "user",
  description: "This represents a user",
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(user) {
          return user.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        }
      },
      rank: {
        type: rank,
        resolve(user) {
          return user.getRankList();
        }
      }
    };
  }
});

const rank = new GraphQLObjectType({
  name: "rank",
  description: "This represents a rank",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(rank) {
          return rank.id;
        }
      },
      rankType: {
        type: GraphQLString,
        resolve(rank) {
          return rank.rankType;
        }
      },
      users: {
        type: new GraphQLList(user),
        resolve(rank) {
          return rank.getUsers();
        }
      }
    };
  }
});

const query = new GraphQLObjectType({
  name: "query",
  description: "Root query object",
  fields: () => {
    return {
      rank: {
        type: new GraphQLList(rank),
        args: {
          id: {
            type: GraphQLInt
          },
          rankType: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return db.models.rankList.findAll({ where: args });
        }
      },
      user: {
        type: new GraphQLList(user),
        args: {
          id: {
            type: GraphQLInt
          },
          lastName: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return db.models.user.findAll({ where: args });
        }
      }
    };
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutations",
  description: "Various functions",
  fields: () => {
    return {
      createUser: {
        type: user,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(source, args) {
          return db.models.user.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase()
          });
        }
      },
      updateUser: {
        type: user,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(source, args) {
          return db.models.user.update(
            {
              id: args.id,
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email.toLowerCase()
            },
            { where: { id: args.id } }
          );
        }
      },
      deleteUser: {
        type: user,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(source, args) {
          return db.models.user.destroy({ where: { id: args.id } });
        }
      },
      createRank: {
        type: rank,
        args: {
          rankType: {
            type: new GraphQLNonNull(GraphQLString)
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(source, args) {
          return db.models.user
            .findAll({ where: { id: args.userId } })
            .then(user => {
              return db.models.rankList.create({ rankType: args.rankType });
            });
        }
      }
    };
  }
});

const schema = new GraphQLSchema({
  query: query,
  mutation: mutation
});

export default schema;
