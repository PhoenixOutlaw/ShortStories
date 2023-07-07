import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/orm/entity/User.entity";
import { UserResolver } from "./resolver/user.resolver";
import { UserService } from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService,UserResolver],
})
export class UserModule {}
