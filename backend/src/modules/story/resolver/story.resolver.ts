import { UseGuards, UsePipes } from "@nestjs/common";
import { DefaultValuePipe, ParseIntPipe } from "@nestjs/common/pipes";
import { IPaginationOptions } from "nestjs-typeorm-paginate/dist/interfaces";
import { AuthGuard } from "src/guards/auth.guard";
import { JoiValidationPipe } from "src/pipes/joi-validation.pipe";
import { createStorySchema } from "src/Schemas/story.shema";
import { StoryService } from "../services/story.service";
import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { StorySchema } from "src/graphql/schemas/story.schema";
import { StoryPagination } from "src/graphql/schemas/pagination.schema";
import { AddStoryInput } from "src/graphql/inputSchema/stroy.input.schema";

@Resolver((of) => StorySchema)
@UseGuards(AuthGuard)
export class StoryResolver {
  constructor(private readonly storyService: StoryService) {}
 
  @Query(() => StoryPagination, { name: "allStories" })
  getAllStories(
    @Args(
      { name: "page", nullable: true },
      new DefaultValuePipe(1),
      ParseIntPipe
    )
    page: number,
    @Args(
      { name: "limit", nullable: true },
      new DefaultValuePipe(5),
      ParseIntPipe
    )
    limit: number
  ) {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.storyService.getAllStories(options);
  }

  @Query(() => StorySchema, { name: "getstory" })
  getStory(@Args("id") id: string) {
    return this.storyService.getStory(id);
  }
  
  @Mutation(() => String, { name: "addStory" })
  createStory(
    @Args("data",new JoiValidationPipe(createStorySchema)) data: AddStoryInput,
    @Context() { req: { jwt } }: any
  ) {
    console.log(data,jwt)
    return this.storyService.createStory(data, jwt);
  }
}
