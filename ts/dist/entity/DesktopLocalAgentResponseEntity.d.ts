import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DesktopLocalAgentResponse, DesktopLocalAgentResponseCreateData } from '../ComposalTypes';
declare class DesktopLocalAgentResponseEntity extends ComposalEntityBase<DesktopLocalAgentResponse> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DesktopLocalAgentResponseEntity): DesktopLocalAgentResponseEntity;
    create(this: any, reqdata?: DesktopLocalAgentResponseCreateData, ctrl?: Control): Promise<DesktopLocalAgentResponseEntity>;
}
export { DesktopLocalAgentResponseEntity };
