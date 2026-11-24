import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { InvocationControl, InvocationControlCreateData } from '../ComposalTypes';
declare class InvocationControlEntity extends ComposalEntityBase<InvocationControl> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: InvocationControlEntity): InvocationControlEntity;
    create(this: any, reqdata?: InvocationControlCreateData, ctrl?: Control): Promise<InvocationControlEntity>;
}
export { InvocationControlEntity };
