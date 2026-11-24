import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NodeLease, NodeLeaseLoadMatch, NodeLeaseCreateData } from '../ComposalTypes';
declare class NodeLeaseEntity extends ComposalEntityBase<NodeLease> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NodeLeaseEntity): NodeLeaseEntity;
    load(this: any, reqmatch?: NodeLeaseLoadMatch, ctrl?: Control): Promise<NodeLeaseEntity>;
    create(this: any, reqdata?: NodeLeaseCreateData, ctrl?: Control): Promise<NodeLeaseEntity>;
}
export { NodeLeaseEntity };
