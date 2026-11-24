import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationInteraction, OrganizationInteractionCreateData } from '../ComposalTypes';
declare class OrganizationInteractionEntity extends ComposalEntityBase<OrganizationInteraction> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationInteractionEntity): OrganizationInteractionEntity;
    create(this: any, reqdata?: OrganizationInteractionCreateData, ctrl?: Control): Promise<OrganizationInteractionEntity>;
}
export { OrganizationInteractionEntity };
