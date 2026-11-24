import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LocalAgentResponse, LocalAgentResponseCreateData } from '../ComposalTypes';
declare class LocalAgentResponseEntity extends ComposalEntityBase<LocalAgentResponse> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LocalAgentResponseEntity): LocalAgentResponseEntity;
    create(this: any, reqdata?: LocalAgentResponseCreateData, ctrl?: Control): Promise<LocalAgentResponseEntity>;
}
export { LocalAgentResponseEntity };
