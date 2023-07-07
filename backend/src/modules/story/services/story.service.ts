import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { paginate } from "nestjs-typeorm-paginate/dist/paginate";
import { Pagination } from "nestjs-typeorm-paginate/dist/pagination";
import { Story } from "src/orm/entity/Story.entity";
import { Repository } from "typeorm";
@Injectable()
export class StoryService {
  constructor(@InjectRepository(Story) private story: Repository<Story>) {}

  async getAllStories(options: IPaginationOptions): Promise<Pagination<Story>> {
    const qb = this.story.createQueryBuilder("story");
    qb.innerJoinAndSelect("story.user", "user")
      .select(["story", "user.userName", "user.id"])
      .orderBy("story.created_at", "DESC");
    return paginate<Story>(qb, options);
  }

  async createStory(data: any,jwt:any) {
    const newStory = this.story.create({ ...data, user: jwt.id });

    try {
      const res = await this.story.save(newStory);
      return "New Story Created";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getStory(id: string) {
    try {
      const res = await this.story.findOneOrFail({
        where: { id },
        select: {
          user: {
            userName: true,
          },
        },
        relations: {
          user: true,
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  }
}
