import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<RoleName>;
};


export type FlagInput = {
  id?: Maybe<Scalars['String']>;
  on?: Maybe<Scalars['Boolean']>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
  createUser: User;
  updateUser: User;
  deleteUser: User;
  login: UserOrTokenPayload;
  logout?: Maybe<Scalars['Boolean']>;
  setFlag?: Maybe<ServiceFlag>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationSetFlagArgs = {
  data: FlagInput;
};

export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  test?: Maybe<Scalars['String']>;
  getFlags?: Maybe<Array<Maybe<ServiceFlag>>>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export enum RoleName {
  Me = 'ME',
  Superadmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Employee = 'EMPLOYEE',
  Member = 'MEMBER',
  User = 'USER'
}

export type ServiceFlag = {
  __typename?: 'ServiceFlag';
  id?: Maybe<Scalars['String']>;
  on?: Maybe<Scalars['Boolean']>;
};

export type TokenPayload = {
  __typename?: 'TokenPayload';
  token: Scalars['String'];
  user: User;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<RoleName>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: RoleName;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserOrTokenPayload = User | TokenPayload;
