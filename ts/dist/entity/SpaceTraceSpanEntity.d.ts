import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceTraceSpan, SpaceTraceSpanListMatch, SpaceTraceSpanCreateData } from '../ComposalTypes';
declare class SpaceTraceSpanEntity extends ComposalEntityBase<SpaceTraceSpan> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceTraceSpanEntity): SpaceTraceSpanEntity;
    list(this: any, reqmatch?: SpaceTraceSpanListMatch, ctrl?: Control): Promise<SpaceTraceSpanEntity[]>;
    create(this: any, reqdata?: SpaceTraceSpanCreateData, ctrl?: Control): Promise<SpaceTraceSpanEntity>;
}
export { SpaceTraceSpanEntity };
