import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class filteropt {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  limit: string;
}
