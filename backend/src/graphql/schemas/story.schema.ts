import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.shema";

@ObjectType()
export class StorySchema {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  created_at: Date;

  @Field(type=>User)
  user: User;
}
