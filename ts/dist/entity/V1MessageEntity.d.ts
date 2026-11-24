import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { V1Message, V1MessageCreateData } from '../ComposalTypes';
declare class V1MessageEntity extends ComposalEntityBase<V1Message> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: V1MessageEntity): V1MessageEntity;
    create(this: any, reqdata?: V1MessageCreateData, ctrl?: Control): Promise<V1MessageEntity>;
}
export { V1MessageEntity };
