import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { A2aWellKnown, A2aWellKnownLoadMatch } from '../ComposalTypes';
declare class A2aWellKnownEntity extends ComposalEntityBase<A2aWellKnown> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: A2aWellKnownEntity): A2aWellKnownEntity;
    load(this: any, reqmatch?: A2aWellKnownLoadMatch, ctrl?: Control): Promise<A2aWellKnownEntity>;
}
export { A2aWellKnownEntity };
