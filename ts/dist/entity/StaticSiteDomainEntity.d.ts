import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StaticSiteDomain, StaticSiteDomainLoadMatch, StaticSiteDomainListMatch, StaticSiteDomainCreateData, StaticSiteDomainUpdateData, StaticSiteDomainPatchData, StaticSiteDomainRemoveMatch } from '../ComposalTypes';
declare class StaticSiteDomainEntity extends ComposalEntityBase<StaticSiteDomain> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StaticSiteDomainEntity): StaticSiteDomainEntity;
    load(this: any, reqmatch?: StaticSiteDomainLoadMatch, ctrl?: Control): Promise<StaticSiteDomainEntity>;
    list(this: any, reqmatch?: StaticSiteDomainListMatch, ctrl?: Control): Promise<StaticSiteDomainEntity[]>;
    create(this: any, reqdata?: StaticSiteDomainCreateData, ctrl?: Control): Promise<StaticSiteDomainEntity>;
    update(this: any, reqdata?: StaticSiteDomainUpdateData, ctrl?: Control): Promise<StaticSiteDomainEntity>;
    patch(this: any, reqdata?: StaticSiteDomainPatchData, ctrl?: Control): Promise<StaticSiteDomainEntity>;
    remove(this: any, reqmatch?: StaticSiteDomainRemoveMatch, ctrl?: Control): Promise<StaticSiteDomainEntity>;
}
export { StaticSiteDomainEntity };
