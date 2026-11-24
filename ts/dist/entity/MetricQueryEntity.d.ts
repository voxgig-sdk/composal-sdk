import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MetricQuery, MetricQueryLoadMatch } from '../ComposalTypes';
declare class MetricQueryEntity extends ComposalEntityBase<MetricQuery> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MetricQueryEntity): MetricQueryEntity;
    load(this: any, reqmatch?: MetricQueryLoadMatch, ctrl?: Control): Promise<MetricQueryEntity>;
}
export { MetricQueryEntity };
