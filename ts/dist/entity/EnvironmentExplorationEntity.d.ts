import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EnvironmentExploration, EnvironmentExplorationCreateData } from '../ComposalTypes';
declare class EnvironmentExplorationEntity extends ComposalEntityBase<EnvironmentExploration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EnvironmentExplorationEntity): EnvironmentExplorationEntity;
    create(this: any, reqdata?: EnvironmentExplorationCreateData, ctrl?: Control): Promise<EnvironmentExplorationEntity>;
}
export { EnvironmentExplorationEntity };
