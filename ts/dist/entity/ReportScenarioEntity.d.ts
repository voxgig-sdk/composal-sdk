import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ReportScenario, ReportScenarioCreateData } from '../ComposalTypes';
declare class ReportScenarioEntity extends ComposalEntityBase<ReportScenario> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ReportScenarioEntity): ReportScenarioEntity;
    create(this: any, reqdata?: ReportScenarioCreateData, ctrl?: Control): Promise<ReportScenarioEntity>;
}
export { ReportScenarioEntity };
