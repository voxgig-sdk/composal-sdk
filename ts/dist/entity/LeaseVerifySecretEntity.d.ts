import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseVerifySecret, LeaseVerifySecretCreateData } from '../ComposalTypes';
declare class LeaseVerifySecretEntity extends ComposalEntityBase<LeaseVerifySecret> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseVerifySecretEntity): LeaseVerifySecretEntity;
    create(this: any, reqdata?: LeaseVerifySecretCreateData, ctrl?: Control): Promise<LeaseVerifySecretEntity>;
}
export { LeaseVerifySecretEntity };
