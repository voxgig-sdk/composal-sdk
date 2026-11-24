import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ScenarioRevision, ScenarioRevisionListMatch } from '../ComposalTypes';
declare class ScenarioRevisionEntity extends ComposalEntityBase<ScenarioRevision> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ScenarioRevisionEntity): ScenarioRevisionEntity;
    list(this: any, reqmatch?: ScenarioRevisionListMatch, ctrl?: Control): Promise<ScenarioRevisionEntity[]>;
}
export { ScenarioRevisionEntity };
