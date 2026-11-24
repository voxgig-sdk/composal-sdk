import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationMessageFile, OrganizationMessageFileCreateData } from '../ComposalTypes';
declare class OrganizationMessageFileEntity extends ComposalEntityBase<OrganizationMessageFile> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationMessageFileEntity): OrganizationMessageFileEntity;
    create(this: any, reqdata?: OrganizationMessageFileCreateData, ctrl?: Control): Promise<OrganizationMessageFileEntity>;
}
export { OrganizationMessageFileEntity };
