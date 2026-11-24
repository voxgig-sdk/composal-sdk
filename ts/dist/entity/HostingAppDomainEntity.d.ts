import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { HostingAppDomain, HostingAppDomainLoadMatch, HostingAppDomainCreateData, HostingAppDomainUpdateData, HostingAppDomainPatchData, HostingAppDomainRemoveMatch } from '../ComposalTypes';
declare class HostingAppDomainEntity extends ComposalEntityBase<HostingAppDomain> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: HostingAppDomainEntity): HostingAppDomainEntity;
    load(this: any, reqmatch?: HostingAppDomainLoadMatch, ctrl?: Control): Promise<HostingAppDomainEntity>;
    create(this: any, reqdata?: HostingAppDomainCreateData, ctrl?: Control): Promise<HostingAppDomainEntity>;
    update(this: any, reqdata?: HostingAppDomainUpdateData, ctrl?: Control): Promise<HostingAppDomainEntity>;
    patch(this: any, reqdata?: HostingAppDomainPatchData, ctrl?: Control): Promise<HostingAppDomainEntity>;
    remove(this: any, reqmatch?: HostingAppDomainRemoveMatch, ctrl?: Control): Promise<HostingAppDomainEntity>;
}
export { HostingAppDomainEntity };
