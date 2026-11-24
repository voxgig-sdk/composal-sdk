import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerificationProjectScenario, VerificationProjectScenarioLoadMatch, VerificationProjectScenarioListMatch, VerificationProjectScenarioCreateData, VerificationProjectScenarioUpdateData, VerificationProjectScenarioPatchData } from '../ComposalTypes';
declare class VerificationProjectScenarioEntity extends ComposalEntityBase<VerificationProjectScenario> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerificationProjectScenarioEntity): VerificationProjectScenarioEntity;
    load(this: any, reqmatch?: VerificationProjectScenarioLoadMatch, ctrl?: Control): Promise<VerificationProjectScenarioEntity>;
    list(this: any, reqmatch?: VerificationProjectScenarioListMatch, ctrl?: Control): Promise<VerificationProjectScenarioEntity[]>;
    create(this: any, reqdata?: VerificationProjectScenarioCreateData, ctrl?: Control): Promise<VerificationProjectScenarioEntity>;
    update(this: any, reqdata?: VerificationProjectScenarioUpdateData, ctrl?: Control): Promise<VerificationProjectScenarioEntity>;
    patch(this: any, reqdata?: VerificationProjectScenarioPatchData, ctrl?: Control): Promise<VerificationProjectScenarioEntity>;
}
export { VerificationProjectScenarioEntity };
