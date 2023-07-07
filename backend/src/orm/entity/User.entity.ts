import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { Story } from "./Story.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  userName: string;

  @Column({default: "regular",})
  role: string;
  
  @Column()
  password: string;

  @Column({default: null})
  bio: string;

  
  @Column({default: null})
  profile_pic: string;

  @JoinColumn()
  @OneToMany(() => Story, (story) => story.user)
  stories: Story[];
}
