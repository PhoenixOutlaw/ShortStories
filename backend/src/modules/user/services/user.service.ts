import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from "nestjs-typeorm-paginate";
import { User } from "src/orm/entity/User.entity";
import { serializeUser } from "src/util/serialization";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async GetAllUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    const qb = this.user
      .createQueryBuilder("user")
      .select(["user.id","user.name","user.userName","user.role",])
      .orderBy("user.userName", "DESC");
    return paginate<User>(qb, options);
  }
  async GetUser(id: string) {
    const res: any = await this.user.findOneOrFail({
      where: { id: id },
      relations: ["stories"],
    });
    return serializeUser(res);
  }
}
