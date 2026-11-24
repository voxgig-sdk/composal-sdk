import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DesktopLocalAgentModel, DesktopLocalAgentModelListMatch } from '../ComposalTypes';
declare class DesktopLocalAgentModelEntity extends ComposalEntityBase<DesktopLocalAgentModel> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DesktopLocalAgentModelEntity): DesktopLocalAgentModelEntity;
    list(this: any, reqmatch?: DesktopLocalAgentModelListMatch, ctrl?: Control): Promise<DesktopLocalAgentModelEntity[]>;
}
export { DesktopLocalAgentModelEntity };
