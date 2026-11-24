import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Node, NodeListMatch } from '../ComposalTypes';
declare class NodeEntity extends ComposalEntityBase<Node> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NodeEntity): NodeEntity;
    list(this: any, reqmatch?: NodeListMatch, ctrl?: Control): Promise<NodeEntity[]>;
}
export { NodeEntity };
