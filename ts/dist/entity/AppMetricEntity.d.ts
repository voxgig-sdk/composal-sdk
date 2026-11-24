import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppMetric, AppMetricLoadMatch } from '../ComposalTypes';
declare class AppMetricEntity extends ComposalEntityBase<AppMetric> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppMetricEntity): AppMetricEntity;
    load(this: any, reqmatch?: AppMetricLoadMatch, ctrl?: Control): Promise<AppMetricEntity>;
}
export { AppMetricEntity };
