import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Edge, EdgeLoadMatch } from '../ComposalTypes';
declare class EdgeEntity extends ComposalEntityBase<Edge> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EdgeEntity): EdgeEntity;
    load(this: any, reqmatch?: EdgeLoadMatch, ctrl?: Control): Promise<EdgeEntity>;
}
export { EdgeEntity };
