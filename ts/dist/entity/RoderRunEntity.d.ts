import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RoderRun, RoderRunCreateData } from '../ComposalTypes';
declare class RoderRunEntity extends ComposalEntityBase<RoderRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RoderRunEntity): RoderRunEntity;
    create(this: any, reqdata?: RoderRunCreateData, ctrl?: Control): Promise<RoderRunEntity>;
}
export { RoderRunEntity };
