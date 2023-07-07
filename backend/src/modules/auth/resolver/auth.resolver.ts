import { UsePipes } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  RegisterInputs,
  SignInInput,
} from "src/graphql/inputSchema/signin.Input.schema";
import { User, UserSignin } from "src/graphql/schemas/user.shema";
import { AuthGuard } from "src/guards/auth.guard";
import { JoiValidationPipe } from "src/pipes/joi-validation.pipe";
import { createUserSchema, loginUserSchema } from "src/Schemas/user.schema";
import { AuthService } from "../services/auth.service";

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: "getLoggedUser" })
  @UseGuards(AuthGuard)
  getuser(@Context() { req: { jwt } }: any) {
    return this.authService.getloggeduser(jwt);
  }

  @Mutation(() => UserSignin, { name: "signIn" })
  @UsePipes(new JoiValidationPipe(loginUserSchema))
  signin(@Args("data") data: SignInInput) {
    return this.authService.signin(data);
  }
  @Mutation(() => UserSignin, { name: "register" })
  @UsePipes(new JoiValidationPipe(createUserSchema))
  register(@Args("data") data: RegisterInputs) {
    return this.authService.register(data, "regular");
  }

  @Mutation(() => UserSignin, { name: "adminRegister" })
  @UsePipes(new JoiValidationPipe(createUserSchema))
  adminRegister(@Args("data") data: RegisterInputs) {
    return this.authService.register(data, "admin");
  }
}
