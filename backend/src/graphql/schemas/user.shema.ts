import { Field, ObjectType } from "@nestjs/graphql";
import { JWT } from "./jwt.schema";
import { StorySchema } from "./story.schema";

@ObjectType()
export class User {
  @Field({ nullable: true })
  id: string;

  @Field()
  name: string;

  @Field()
  userName: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  role: "admin" | "regular";

  @Field({ nullable: true })
  profile_pic: string;

  @Field((type) => [StorySchema],{nullable: true})
  stories: [StorySchema];
}

@ObjectType()
export class UserSignin {
  @Field()
  user: User;

  @Field()
  jwttoken: string;
}
// @ObjectType()
// export class UserRegister extends User,UserSignin {

// }
