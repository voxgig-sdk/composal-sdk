import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RoderCodeRepair, RoderCodeRepairLoadMatch, RoderCodeRepairCreateData } from '../ComposalTypes';
declare class RoderCodeRepairEntity extends ComposalEntityBase<RoderCodeRepair> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RoderCodeRepairEntity): RoderCodeRepairEntity;
    load(this: any, reqmatch?: RoderCodeRepairLoadMatch, ctrl?: Control): Promise<RoderCodeRepairEntity>;
    create(this: any, reqdata?: RoderCodeRepairCreateData, ctrl?: Control): Promise<RoderCodeRepairEntity>;
}
export { RoderCodeRepairEntity };
