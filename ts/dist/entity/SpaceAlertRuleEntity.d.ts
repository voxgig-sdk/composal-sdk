import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceAlertRule, SpaceAlertRuleLoadMatch, SpaceAlertRuleListMatch, SpaceAlertRuleCreateData, SpaceAlertRuleUpdateData, SpaceAlertRulePatchData, SpaceAlertRuleRemoveMatch } from '../ComposalTypes';
declare class SpaceAlertRuleEntity extends ComposalEntityBase<SpaceAlertRule> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceAlertRuleEntity): SpaceAlertRuleEntity;
    load(this: any, reqmatch?: SpaceAlertRuleLoadMatch, ctrl?: Control): Promise<SpaceAlertRuleEntity>;
    list(this: any, reqmatch?: SpaceAlertRuleListMatch, ctrl?: Control): Promise<SpaceAlertRuleEntity[]>;
    create(this: any, reqdata?: SpaceAlertRuleCreateData, ctrl?: Control): Promise<SpaceAlertRuleEntity>;
    update(this: any, reqdata?: SpaceAlertRuleUpdateData, ctrl?: Control): Promise<SpaceAlertRuleEntity>;
    patch(this: any, reqdata?: SpaceAlertRulePatchData, ctrl?: Control): Promise<SpaceAlertRuleEntity>;
    remove(this: any, reqmatch?: SpaceAlertRuleRemoveMatch, ctrl?: Control): Promise<SpaceAlertRuleEntity>;
}
export { SpaceAlertRuleEntity };
