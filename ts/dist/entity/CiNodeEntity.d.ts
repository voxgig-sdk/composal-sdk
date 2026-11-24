import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CiNode, CiNodeLoadMatch, CiNodeCreateData } from '../ComposalTypes';
declare class CiNodeEntity extends ComposalEntityBase<CiNode> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CiNodeEntity): CiNodeEntity;
    load(this: any, reqmatch?: CiNodeLoadMatch, ctrl?: Control): Promise<CiNodeEntity>;
    create(this: any, reqdata?: CiNodeCreateData, ctrl?: Control): Promise<CiNodeEntity>;
}
export { CiNodeEntity };
