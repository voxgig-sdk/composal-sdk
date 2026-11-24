import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentIntegrationCallback, AgentIntegrationCallbackLoadMatch } from '../ComposalTypes';
declare class AgentIntegrationCallbackEntity extends ComposalEntityBase<AgentIntegrationCallback> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentIntegrationCallbackEntity): AgentIntegrationCallbackEntity;
    load(this: any, reqmatch?: AgentIntegrationCallbackLoadMatch, ctrl?: Control): Promise<AgentIntegrationCallbackEntity>;
}
export { AgentIntegrationCallbackEntity };
