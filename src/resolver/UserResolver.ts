import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("take", () => Int, { nullable: true }) take: number,
    @Arg("name", { nullable: true }) name: string
  ) {
    const query = User.createQueryBuilder("user");

    if (name) {
      query.where("user.name LIKE :name", { name: `%${name}%` });
    }

    if (skip) {
      query.skip(skip);
    }

    if (take) {
      query.take(take);
    }

    return query.getMany();
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string, @Arg("email") email: string) {
    const user = User.create({ name, email });
    await user.save();
    return user;
  }
}
