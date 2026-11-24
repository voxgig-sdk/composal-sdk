import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProactiveAgentWaitlistEntry, ProactiveAgentWaitlistEntryLoadMatch, ProactiveAgentWaitlistEntryCreateData } from '../ComposalTypes';
declare class ProactiveAgentWaitlistEntryEntity extends ComposalEntityBase<ProactiveAgentWaitlistEntry> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProactiveAgentWaitlistEntryEntity): ProactiveAgentWaitlistEntryEntity;
    load(this: any, reqmatch?: ProactiveAgentWaitlistEntryLoadMatch, ctrl?: Control): Promise<ProactiveAgentWaitlistEntryEntity>;
    create(this: any, reqdata?: ProactiveAgentWaitlistEntryCreateData, ctrl?: Control): Promise<ProactiveAgentWaitlistEntryEntity>;
}
export { ProactiveAgentWaitlistEntryEntity };
