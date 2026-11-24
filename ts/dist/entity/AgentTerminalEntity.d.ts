import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentTerminal, AgentTerminalCreateData } from '../ComposalTypes';
declare class AgentTerminalEntity extends ComposalEntityBase<AgentTerminal> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentTerminalEntity): AgentTerminalEntity;
    create(this: any, reqdata?: AgentTerminalCreateData, ctrl?: Control): Promise<AgentTerminalEntity>;
}
export { AgentTerminalEntity };
