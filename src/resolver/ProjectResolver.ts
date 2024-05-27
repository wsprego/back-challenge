import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Project } from "../entity/Project";


@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects(
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("take", () => Int, { nullable: true }) take: number,
    @Arg("name", { nullable: true }) name: string
  ) {
    const query = Project.createQueryBuilder("project");

    if (name) {
      query.where("project.name LIKE :name", { name: `%${name}%` });
    }

    if (skip) {
      query.skip(skip);
    }

    if (take) {
      query.take(take);
    }

    return query.getMany();
  }

  @Mutation(() => Project)
  async createProject(@Arg("name") name: string, @Arg("price") price: number) {
    const project = Project.create({ name, price });
    await project.save();
    return project;
  }
}
