import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyStaticSiteDomain, VerifyStaticSiteDomainCreateData } from '../ComposalTypes';
declare class VerifyStaticSiteDomainEntity extends ComposalEntityBase<VerifyStaticSiteDomain> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyStaticSiteDomainEntity): VerifyStaticSiteDomainEntity;
    create(this: any, reqdata?: VerifyStaticSiteDomainCreateData, ctrl?: Control): Promise<VerifyStaticSiteDomainEntity>;
}
export { VerifyStaticSiteDomainEntity };
