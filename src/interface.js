// @flow

export type IContainedEntity = any
export type IContainedType = string
export type IContainedDeps = Array<IContainedEntity>
export interface IContainedOpts {
  type: ?IContainedType,
  deps: ?IContainedDeps;
  lifecycle: ?string;
  immutable: ?boolean;
  alias: ?string;
  aliases: ?string[];
}
export type IContainerOpts = {}
export interface IContainer {
  constructor(opts: IContainerOpts): IContainer;
  opts: IContainerOpts;
  register(entity: IContainedEntity, opts: ?IContainedOpts): IContainer;
}

export type IInstance = any
export type IInstanceType = Function
export type IInstanceDeps = Array<IInstance>
export type IInstanceDepsTypes = Array<IInstanceType>
export type IInstanceFactory = {
  (type: IInstanceType, deps: IInstanceDeps): IInstance
}
export interface IProviderEntry {
  type: IInstanceType;
  deps: IInstanceDepsTypes;
  factory: IInstanceFactory;
}
export type IProviderEntryStack = Array<IProviderEntry>
export interface IProvider {
  stack: IProviderEntryStack;
  constructor(): IProvider;
  register(type: IInstanceType, deps: IInstanceDepsTypes, factory: IInstanceFactory): IProvider;
  resolve(type: IInstanceType): IInstance;
  getEntryByType(type: IInstanceType): ?IProviderEntry;
}
