import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSetting, AgentSettingLoadMatch, AgentSettingUpdateData } from '../ComposalTypes';
declare class AgentSettingEntity extends ComposalEntityBase<AgentSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSettingEntity): AgentSettingEntity;
    load(this: any, reqmatch?: AgentSettingLoadMatch, ctrl?: Control): Promise<AgentSettingEntity>;
    update(this: any, reqdata?: AgentSettingUpdateData, ctrl?: Control): Promise<AgentSettingEntity>;
}
export { AgentSettingEntity };
