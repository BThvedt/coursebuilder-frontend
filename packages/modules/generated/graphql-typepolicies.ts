import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type MutationKeySpecifier = ('root' | 'createUser' | 'updateUser' | 'deleteUser' | 'login' | 'logout' | 'setFlag' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	root?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUser?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	setFlag?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('root' | 'me' | 'getUser' | 'users' | 'test' | 'getFlags' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	root?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	getUser?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	test?: FieldPolicy<any> | FieldReadFunction<any>,
	getFlags?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ServiceFlagKeySpecifier = ('id' | 'on' | ServiceFlagKeySpecifier)[];
export type ServiceFlagFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	on?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenPayloadKeySpecifier = ('token' | 'user' | TokenPayloadKeySpecifier)[];
export type TokenPayloadFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'name' | 'email' | 'password' | 'orgRole' | 'createdAt' | 'updatedAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	orgRole?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	ServiceFlag?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ServiceFlagKeySpecifier | (() => undefined | ServiceFlagKeySpecifier),
		fields?: ServiceFlagFieldPolicy,
	},
	TokenPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenPayloadKeySpecifier | (() => undefined | TokenPayloadKeySpecifier),
		fields?: TokenPayloadFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};