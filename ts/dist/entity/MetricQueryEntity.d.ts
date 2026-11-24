import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MetricQuery, MetricQueryListMatch } from '../ComposalTypes';
declare class MetricQueryEntity extends ComposalEntityBase<MetricQuery> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MetricQueryEntity): MetricQueryEntity;
    list(this: any, reqmatch?: MetricQueryListMatch, ctrl?: Control): Promise<MetricQueryEntity[]>;
}
export { MetricQueryEntity };
