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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ComponentIdAndType = {
  __typename?: 'ComponentIdAndType';
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<ComponentType>;
};

export enum ComponentType {
  Page = 'Page',
  Nav = 'Nav',
  Text = 'Text',
  Image = 'Image',
  Container = 'Container',
  Button = 'Button'
}

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  orgRole?: Maybe<OrgRole>;
};


export type DefaultData = {
  __typename?: 'DefaultData';
  name?: Maybe<Scalars['String']>;
  resolution?: Maybe<Resolution>;
  forwardTransition?: Maybe<Transition>;
  backwardTransition?: Maybe<Transition>;
  loadingTransition?: Maybe<Transition>;
  moduleTransition?: Maybe<Transition>;
};

export type FlagInput = {
  id?: Maybe<Scalars['String']>;
  on?: Maybe<Scalars['Boolean']>;
};



export enum LanguageName {
  English = 'English',
  French = 'French',
  Chinese = 'Chinese'
}

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['ID'];
  locked?: Maybe<Scalars['Boolean']>;
  page_ids?: Maybe<Array<Maybe<Scalars['String']>>>;
  moduleId: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Module = {
  __typename?: 'Module';
  id: Scalars['ID'];
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  default_language?: Maybe<Scalars['String']>;
  resolutions?: Maybe<Array<Maybe<Resolution>>>;
  lesson_ids: Array<Maybe<Scalars['ID']>>;
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  forward_transition_id?: Maybe<Scalars['String']>;
  backward_transition_id?: Maybe<Scalars['String']>;
  loading_transition_id?: Maybe<Scalars['String']>;
  module_transition_id?: Maybe<Scalars['String']>;
  requesting_user_role?: Maybe<Scalars['String']>;
  transitions?: Maybe<Array<Maybe<Transition>>>;
};

export type ModuleData = {
  __typename?: 'ModuleData';
  module?: Maybe<Module>;
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  transitions?: Maybe<Array<Maybe<Transition>>>;
  courseWideComponentIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  pages?: Maybe<Array<Maybe<Page>>>;
  componentIdsAndTypes?: Maybe<Array<Maybe<ComponentIdAndType>>>;
};

export type ModuleRolesAndPermissions = {
  __typename?: 'ModuleRolesAndPermissions';
  user_ids_and_roles?: Maybe<Scalars['JSON']>;
  role_and_user_permissions?: Maybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLesson?: Maybe<Lesson>;
  addPage?: Maybe<Page>;
  addUserToModule?: Maybe<Scalars['Boolean']>;
  createModule?: Maybe<Module>;
  createUser: User;
  deleteLesson?: Maybe<Scalars['ID']>;
  deleteModule?: Maybe<Scalars['ID']>;
  deletePage?: Maybe<Scalars['ID']>;
  deleteUser: User;
  login: UserOrTokenPayload;
  logout?: Maybe<Scalars['Boolean']>;
  root?: Maybe<Scalars['String']>;
  setFlag?: Maybe<ServiceFlag>;
  test?: Maybe<Scalars['String']>;
  updateModuleSettings?: Maybe<Module>;
  updateUser: User;
};


export type MutationAddLessonArgs = {
  data?: Maybe<LessonInput>;
};


export type MutationAddPageArgs = {
  data?: Maybe<PageInput>;
};


export type MutationAddUserToModuleArgs = {
  data?: Maybe<AddUserInput>;
};


export type MutationCreateModuleArgs = {
  data: CreateModuleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteLessonArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteModuleArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateModuleSettingsArgs = {
  data: UpdateModuleSettingsInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateUserInput;
};

export enum OrgRole {
  Me = 'ME',
  Superadmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Employee = 'EMPLOYEE',
  Member = 'MEMBER',
  User = 'USER'
}

export type Page = {
  __typename?: 'Page';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<PageType>;
  page_component_id: Scalars['ID'];
  component_ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  flowchart_id?: Maybe<Scalars['String']>;
  moduleId: Scalars['String'];
};

export enum PageType {
  Regular = 'regular',
  Custom = 'custom'
}

export type Query = {
  __typename?: 'Query';
  getDefaults?: Maybe<ModuleData>;
  getFlags?: Maybe<Array<Maybe<ServiceFlag>>>;
  getModule?: Maybe<Module>;
  getModuleRolesAndPermissions?: Maybe<ModuleRolesAndPermissions>;
  getModules?: Maybe<Array<Maybe<Module>>>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
  root?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetModuleArgs = {
  id: Scalars['ID'];
};


export type QueryGetModuleRolesAndPermissionsArgs = {
  moduleId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type Resolution = {
  __typename?: 'Resolution';
  name: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  breakpoint: Scalars['Int'];
  moduleId: Scalars['String'];
};

export type ResolutionInput = {
  name?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  breakpoint?: Maybe<Scalars['Int']>;
};

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

export type Transition = {
  __typename?: 'Transition';
  id: Scalars['ID'];
  name: TransitionName;
  type: TransitionType;
  enter?: Maybe<Scalars['String']>;
  enterDuration?: Maybe<Scalars['Int']>;
  exit?: Maybe<Scalars['String']>;
  exitDuration?: Maybe<Scalars['Int']>;
  moduleId: Scalars['String'];
};

export type TransitionInput = {
  name?: Maybe<Scalars['String']>;
  type: TransitionType;
  enter?: Maybe<Scalars['String']>;
  enterDuration?: Maybe<Scalars['Int']>;
  exit?: Maybe<Scalars['String']>;
  exitDuration?: Maybe<Scalars['Int']>;
};

export enum TransitionName {
  ForwardTransition = 'forwardTransition',
  BackwardTransition = 'backwardTransition',
  LoadingTransition = 'loadingTransition',
  ModuleTransition = 'moduleTransition'
}

export enum TransitionType {
  Simultaneous = 'simultaneous',
  OutIn = 'outIn',
  Show = 'show',
  In = 'in',
  Hide = 'hide',
  Out = 'out'
}

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  orgRole?: Maybe<OrgRole>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  orgRole: OrgRole;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserOrTokenPayload = User | TokenPayload;

export type AddUserInput = {
  userId?: Maybe<Scalars['ID']>;
  moduleID?: Maybe<Scalars['ID']>;
  role?: Maybe<Scalars['String']>;
};

export type CreateModuleInput = {
  name: Scalars['String'];
  numOfResolutions?: Maybe<Scalars['Int']>;
};

export type LessonInput = {
  locked?: Maybe<Scalars['Boolean']>;
  moduleId?: Maybe<Scalars['ID']>;
};

export type PageInput = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<PageType>;
  moduleId?: Maybe<Scalars['ID']>;
  lessionId?: Maybe<Scalars['ID']>;
};

export type UpdateModuleSettingsInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  resolutions?: Maybe<Array<Maybe<ResolutionInput>>>;
  transitions?: Maybe<Array<Maybe<TransitionInput>>>;
};
