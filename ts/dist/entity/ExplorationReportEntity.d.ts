import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExplorationReport, ExplorationReportLoadMatch, ExplorationReportCreateData } from '../ComposalTypes';
declare class ExplorationReportEntity extends ComposalEntityBase<ExplorationReport> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExplorationReportEntity): ExplorationReportEntity;
    load(this: any, reqmatch?: ExplorationReportLoadMatch, ctrl?: Control): Promise<ExplorationReportEntity>;
    create(this: any, reqdata?: ExplorationReportCreateData, ctrl?: Control): Promise<ExplorationReportEntity>;
}
export { ExplorationReportEntity };
