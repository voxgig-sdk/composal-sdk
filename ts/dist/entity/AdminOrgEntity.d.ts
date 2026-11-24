import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AdminOrg, AdminOrgLoadMatch, AdminOrgListMatch, AdminOrgCreateData, AdminOrgUpdateData } from '../ComposalTypes';
declare class AdminOrgEntity extends ComposalEntityBase<AdminOrg> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AdminOrgEntity): AdminOrgEntity;
    load(this: any, reqmatch?: AdminOrgLoadMatch, ctrl?: Control): Promise<AdminOrgEntity>;
    list(this: any, reqmatch?: AdminOrgListMatch, ctrl?: Control): Promise<AdminOrgEntity[]>;
    create(this: any, reqdata?: AdminOrgCreateData, ctrl?: Control): Promise<AdminOrgEntity>;
    update(this: any, reqdata?: AdminOrgUpdateData, ctrl?: Control): Promise<AdminOrgEntity>;
}
export { AdminOrgEntity };
