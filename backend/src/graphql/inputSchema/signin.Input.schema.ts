import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignInInput {
  @Field()
  userName: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInputs {
  @Field()
  name: string;

  @Field()
  userName: string;

  @Field({ nullable: true })
  profile_pic: string;

  @Field()
  password: string;
}
