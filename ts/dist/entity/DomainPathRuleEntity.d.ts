import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DomainPathRule, DomainPathRuleLoadMatch, DomainPathRuleListMatch, DomainPathRuleCreateData, DomainPathRuleUpdateData, DomainPathRulePatchData, DomainPathRuleRemoveMatch } from '../ComposalTypes';
declare class DomainPathRuleEntity extends ComposalEntityBase<DomainPathRule> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DomainPathRuleEntity): DomainPathRuleEntity;
    load(this: any, reqmatch?: DomainPathRuleLoadMatch, ctrl?: Control): Promise<DomainPathRuleEntity>;
    list(this: any, reqmatch?: DomainPathRuleListMatch, ctrl?: Control): Promise<DomainPathRuleEntity[]>;
    create(this: any, reqdata?: DomainPathRuleCreateData, ctrl?: Control): Promise<DomainPathRuleEntity>;
    update(this: any, reqdata?: DomainPathRuleUpdateData, ctrl?: Control): Promise<DomainPathRuleEntity>;
    patch(this: any, reqdata?: DomainPathRulePatchData, ctrl?: Control): Promise<DomainPathRuleEntity>;
    remove(this: any, reqmatch?: DomainPathRuleRemoveMatch, ctrl?: Control): Promise<DomainPathRuleEntity>;
}
export { DomainPathRuleEntity };
