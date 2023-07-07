import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/orm/entity/Story.entity';
import { StoryService } from './services/story.service';
import { StoryResolver } from './resolver/story.resolver';


@Module({
    imports: [TypeOrmModule.forFeature([Story])],
    controllers:[],
    providers:[StoryService,StoryResolver]
})
export class StoryModule {}
