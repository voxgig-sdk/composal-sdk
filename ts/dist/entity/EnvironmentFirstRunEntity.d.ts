import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EnvironmentFirstRun, EnvironmentFirstRunCreateData } from '../ComposalTypes';
declare class EnvironmentFirstRunEntity extends ComposalEntityBase<EnvironmentFirstRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EnvironmentFirstRunEntity): EnvironmentFirstRunEntity;
    create(this: any, reqdata?: EnvironmentFirstRunCreateData, ctrl?: Control): Promise<EnvironmentFirstRunEntity>;
}
export { EnvironmentFirstRunEntity };
