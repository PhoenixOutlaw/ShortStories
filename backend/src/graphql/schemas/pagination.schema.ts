import { Field, ObjectType } from "@nestjs/graphql";
import { StorySchema } from "./story.schema";
import { User } from "./user.shema";

@ObjectType()
class Meta {
  @Field()
  totalItems: number;
  @Field()
  itemCount: number;
  @Field()
  itemsPerPage: number;
  @Field()
  totalPages: number;
  @Field()
  currentPage: number;
}

@ObjectType()
export class StoryPagination {
  @Field((type) => [StorySchema])
  items: [StorySchema];
  @Field()
  meta: Meta;
}

@ObjectType()
export class UserPagination {
  @Field((type) => [User])
  items: [User];
  @Field()
  meta: Meta;
}
