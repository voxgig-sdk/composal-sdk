import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentAppInstall, AgentAppInstallUpdateData, AgentAppInstallRemoveMatch } from '../ComposalTypes';
declare class AgentAppInstallEntity extends ComposalEntityBase<AgentAppInstall> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentAppInstallEntity): AgentAppInstallEntity;
    update(this: any, reqdata?: AgentAppInstallUpdateData, ctrl?: Control): Promise<AgentAppInstallEntity>;
    remove(this: any, reqmatch?: AgentAppInstallRemoveMatch, ctrl?: Control): Promise<AgentAppInstallEntity>;
}
export { AgentAppInstallEntity };
