import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExplorationScenario, ExplorationScenarioCreateData } from '../ComposalTypes';
declare class ExplorationScenarioEntity extends ComposalEntityBase<ExplorationScenario> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExplorationScenarioEntity): ExplorationScenarioEntity;
    create(this: any, reqdata?: ExplorationScenarioCreateData, ctrl?: Control): Promise<ExplorationScenarioEntity>;
}
export { ExplorationScenarioEntity };
