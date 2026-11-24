import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoCodeRule, RepoCodeRuleLoadMatch, RepoCodeRuleListMatch, RepoCodeRuleCreateData, RepoCodeRuleUpdateData, RepoCodeRulePatchData, RepoCodeRuleRemoveMatch } from '../ComposalTypes';
declare class RepoCodeRuleEntity extends ComposalEntityBase<RepoCodeRule> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoCodeRuleEntity): RepoCodeRuleEntity;
    load(this: any, reqmatch?: RepoCodeRuleLoadMatch, ctrl?: Control): Promise<RepoCodeRuleEntity>;
    list(this: any, reqmatch?: RepoCodeRuleListMatch, ctrl?: Control): Promise<RepoCodeRuleEntity[]>;
    create(this: any, reqdata?: RepoCodeRuleCreateData, ctrl?: Control): Promise<RepoCodeRuleEntity>;
    update(this: any, reqdata?: RepoCodeRuleUpdateData, ctrl?: Control): Promise<RepoCodeRuleEntity>;
    patch(this: any, reqdata?: RepoCodeRulePatchData, ctrl?: Control): Promise<RepoCodeRuleEntity>;
    remove(this: any, reqmatch?: RepoCodeRuleRemoveMatch, ctrl?: Control): Promise<RepoCodeRuleEntity>;
}
export { RepoCodeRuleEntity };
