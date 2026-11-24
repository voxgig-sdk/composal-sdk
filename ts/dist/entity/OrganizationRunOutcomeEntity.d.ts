import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationRunOutcome, OrganizationRunOutcomeCreateData } from '../ComposalTypes';
declare class OrganizationRunOutcomeEntity extends ComposalEntityBase<OrganizationRunOutcome> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationRunOutcomeEntity): OrganizationRunOutcomeEntity;
    create(this: any, reqdata?: OrganizationRunOutcomeCreateData, ctrl?: Control): Promise<OrganizationRunOutcomeEntity>;
}
export { OrganizationRunOutcomeEntity };
