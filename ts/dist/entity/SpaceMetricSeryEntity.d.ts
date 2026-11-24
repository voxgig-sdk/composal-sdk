import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceMetricSery, SpaceMetricSeryLoadMatch, SpaceMetricSeryCreateData } from '../ComposalTypes';
declare class SpaceMetricSeryEntity extends ComposalEntityBase<SpaceMetricSery> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceMetricSeryEntity): SpaceMetricSeryEntity;
    load(this: any, reqmatch?: SpaceMetricSeryLoadMatch, ctrl?: Control): Promise<SpaceMetricSeryEntity>;
    create(this: any, reqdata?: SpaceMetricSeryCreateData, ctrl?: Control): Promise<SpaceMetricSeryEntity>;
}
export { SpaceMetricSeryEntity };
