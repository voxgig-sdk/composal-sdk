import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ScenarioRunScenarioEdit, ScenarioRunScenarioEditCreateData } from '../ComposalTypes';
declare class ScenarioRunScenarioEditEntity extends ComposalEntityBase<ScenarioRunScenarioEdit> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ScenarioRunScenarioEditEntity): ScenarioRunScenarioEditEntity;
    create(this: any, reqdata?: ScenarioRunScenarioEditCreateData, ctrl?: Control): Promise<ScenarioRunScenarioEditEntity>;
}
export { ScenarioRunScenarioEditEntity };
