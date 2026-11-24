import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LocalThreadOperation, LocalThreadOperationLoadMatch, LocalThreadOperationCreateData } from '../ComposalTypes';
declare class LocalThreadOperationEntity extends ComposalEntityBase<LocalThreadOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LocalThreadOperationEntity): LocalThreadOperationEntity;
    load(this: any, reqmatch?: LocalThreadOperationLoadMatch, ctrl?: Control): Promise<LocalThreadOperationEntity>;
    create(this: any, reqdata?: LocalThreadOperationCreateData, ctrl?: Control): Promise<LocalThreadOperationEntity>;
}
export { LocalThreadOperationEntity };
