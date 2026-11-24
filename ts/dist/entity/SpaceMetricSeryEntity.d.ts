import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceMetricSery, SpaceMetricSeryListMatch, SpaceMetricSeryCreateData } from '../ComposalTypes';
declare class SpaceMetricSeryEntity extends ComposalEntityBase<SpaceMetricSery> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceMetricSeryEntity): SpaceMetricSeryEntity;
    list(this: any, reqmatch?: SpaceMetricSeryListMatch, ctrl?: Control): Promise<SpaceMetricSeryEntity[]>;
    create(this: any, reqdata?: SpaceMetricSeryCreateData, ctrl?: Control): Promise<SpaceMetricSeryEntity>;
}
export { SpaceMetricSeryEntity };
