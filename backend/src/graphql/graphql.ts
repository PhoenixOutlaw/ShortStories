
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignInInput {
    userName: string;
    password: string;
}

export interface RegisterInputs {
    name: string;
    userName: string;
    profile_pic?: Nullable<string>;
    password: string;
}

export interface AddStoryInput {
    title: string;
    content: string;
}

export interface StorySchema {
    id: string;
    title: string;
    content: string;
    created_at: DateTime;
    user: User;
}

export interface User {
    id?: Nullable<string>;
    name: string;
    userName: string;
    bio?: Nullable<string>;
    role: string;
    profile_pic?: Nullable<string>;
    stories?: Nullable<StorySchema[]>;
}

export interface UserSignin {
    user: User;
    jwttoken: string;
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface StoryPagination {
    items: StorySchema[];
    meta: Meta;
}

export interface UserPagination {
    items: User[];
    meta: Meta;
}

export interface IQuery {
    getLoggedUser(): User | Promise<User>;
    allStories(page?: Nullable<number>, limit?: Nullable<number>): StoryPagination | Promise<StoryPagination>;
    getstory(id: string): StorySchema | Promise<StorySchema>;
    allUsers(page?: Nullable<number>, limit?: Nullable<number>): UserPagination | Promise<UserPagination>;
    getUser(id: string): User | Promise<User>;
}

export interface IMutation {
    signIn(data: SignInInput): UserSignin | Promise<UserSignin>;
    register(data: RegisterInputs): UserSignin | Promise<UserSignin>;
    adminRegister(data: RegisterInputs): UserSignin | Promise<UserSignin>;
    addStory(data: AddStoryInput): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
