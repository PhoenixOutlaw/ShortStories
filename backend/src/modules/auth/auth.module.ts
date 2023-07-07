import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../orm/entity/User.entity';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [AuthService,AuthResolver],
})
export class AuthModule {}
