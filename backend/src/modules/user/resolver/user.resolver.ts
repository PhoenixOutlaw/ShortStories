import { DefaultValuePipe, ParseIntPipe, UseGuards } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { AuthGuard } from "src/guards/auth.guard";
import Roles, { RoleGuard } from "src/guards/role.guard";
import { UserService } from "../services/user.service";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { UserPagination } from "src/graphql/schemas/pagination.schema";
import { User } from "src/graphql/schemas/user.shema";

@Resolver()
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard)
  @Roles(["admin"])
  @Query(() => UserPagination, { name: "allUsers" })
  getAllStories(
    @Args(
      { name: "page", nullable: true },
      new DefaultValuePipe(1),
      ParseIntPipe
    )
    page: number,
    @Args(
      { name: "limit", nullable: true },
      new DefaultValuePipe(5),
      ParseIntPipe
    )
    limit: number
  ) {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.userService.GetAllUsers(options);
  }

  @Query(() => User, { name: "getUser" })
  getUser(@Args("id") id: string, @Context() { req: { jwt } }: any) {
    if (["admin"].includes(jwt.role) || jwt.id === id)
      return this.userService.GetUser(id);

    throw new HttpException(
      "FORBIDDEN: Only ADMIN or RESOURCE OWNER can access this info",
      HttpStatus.FORBIDDEN
    );
  }
}
