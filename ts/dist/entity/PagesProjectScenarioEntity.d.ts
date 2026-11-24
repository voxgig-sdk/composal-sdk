import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesProjectScenario, PagesProjectScenarioListMatch } from '../ComposalTypes';
declare class PagesProjectScenarioEntity extends ComposalEntityBase<PagesProjectScenario> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesProjectScenarioEntity): PagesProjectScenarioEntity;
    list(this: any, reqmatch?: PagesProjectScenarioListMatch, ctrl?: Control): Promise<PagesProjectScenarioEntity[]>;
}
export { PagesProjectScenarioEntity };
