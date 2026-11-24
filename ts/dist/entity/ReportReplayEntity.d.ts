import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ReportReplay, ReportReplayLoadMatch } from '../ComposalTypes';
declare class ReportReplayEntity extends ComposalEntityBase<ReportReplay> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ReportReplayEntity): ReportReplayEntity;
    load(this: any, reqmatch?: ReportReplayLoadMatch, ctrl?: Control): Promise<ReportReplayEntity>;
}
export { ReportReplayEntity };
