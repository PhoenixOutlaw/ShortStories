import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import dbConfig, { typeOrmAsyncConfig } from "./db/db.config";
import { AuthModule } from "./modules/auth/auth.module";
import { StoryModule } from "./modules/story/story.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/graphql/schema.graphql"),
      definitions: {
        path: join(process.cwd(), "src/graphql/graphql.ts"),
      },
    }),
    AuthModule,
    StoryModule,
    UserModule,
  ],
})
export class AppModule {}
