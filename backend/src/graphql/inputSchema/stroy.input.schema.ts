import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddStoryInput {
  @Field()
  title: string;

  @Field()
  content: string;
}
