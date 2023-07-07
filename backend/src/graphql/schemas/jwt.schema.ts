import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JWT {
  @Field()
  id: string;

  @Field()
  role: 'admin' | 'regular';
}
