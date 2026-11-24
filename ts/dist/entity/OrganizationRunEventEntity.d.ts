import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationRunEvent, OrganizationRunEventCreateData } from '../ComposalTypes';
declare class OrganizationRunEventEntity extends ComposalEntityBase<OrganizationRunEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationRunEventEntity): OrganizationRunEventEntity;
    create(this: any, reqdata?: OrganizationRunEventCreateData, ctrl?: Control): Promise<OrganizationRunEventEntity>;
}
export { OrganizationRunEventEntity };
