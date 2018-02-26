// @flow

export type IContainerOpts = {}
export interface IContainer {
  constructor(opts: IContainerOpts): IContainer;
  opts: IContainerOpts;
}
