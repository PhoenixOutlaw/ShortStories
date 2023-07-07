import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus } from "@nestjs/common/enums";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "src/orm/entity/User.entity";
import { serializeUser } from "src/util/serialization";
import { jwtSign } from "src/util/jwt";
import { RegisterInputs, SignInInput } from "src/graphql/graphql";
import { JWT } from "src/graphql/schemas/jwt.schema";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async register(data: RegisterInputs, role: string) {
    const hashpassword = await bcrypt.hash(data.password, 10);
    const user = this.user.create({
      ...data,
      role: role,
      password: hashpassword,
    });
    try {
      const res: any = await this.user.save(user);
      const token = jwtSign({ id: res.id, role: res.role });
      return { jwttoken: token, user: serializeUser(res) };
    } catch (err) {
      console.log(err);
      throw new HttpException("username already exsits", HttpStatus.CONFLICT);
    }
  }
  async signin(data: SignInInput) {
    try {
      const res = await this.user.findOneByOrFail({ userName: data.userName });
      if (!(await bcrypt.compare(data.password, res.password))) {
        throw new HttpException("Password incorrect", HttpStatus.FORBIDDEN);
      }
      const token = jwtSign({ id: res.id, role: res.role });
      return { jwttoken: token, user: serializeUser(res) };
    } catch (err) {
      throw new HttpException(
        err.response ? err.response : "Email does not exsits",
        err.status ? err.status : HttpStatus.NOT_FOUND
      );
    }
  }

  async getloggeduser(jwt: JWT) {
    try {
      const res = await this.user.findOneByOrFail({ id: jwt.id });
      return serializeUser(res);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
