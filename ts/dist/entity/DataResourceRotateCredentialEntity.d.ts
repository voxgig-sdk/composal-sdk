import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DataResourceRotateCredential, DataResourceRotateCredentialCreateData } from '../ComposalTypes';
declare class DataResourceRotateCredentialEntity extends ComposalEntityBase<DataResourceRotateCredential> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DataResourceRotateCredentialEntity): DataResourceRotateCredentialEntity;
    create(this: any, reqdata?: DataResourceRotateCredentialCreateData, ctrl?: Control): Promise<DataResourceRotateCredentialEntity>;
}
export { DataResourceRotateCredentialEntity };
