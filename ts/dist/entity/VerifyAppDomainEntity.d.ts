import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyAppDomain, VerifyAppDomainCreateData } from '../ComposalTypes';
declare class VerifyAppDomainEntity extends ComposalEntityBase<VerifyAppDomain> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyAppDomainEntity): VerifyAppDomainEntity;
    create(this: any, reqdata?: VerifyAppDomainCreateData, ctrl?: Control): Promise<VerifyAppDomainEntity>;
}
export { VerifyAppDomainEntity };
