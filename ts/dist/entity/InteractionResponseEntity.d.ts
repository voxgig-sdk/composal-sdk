import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { InteractionResponse, InteractionResponseCreateData } from '../ComposalTypes';
declare class InteractionResponseEntity extends ComposalEntityBase<InteractionResponse> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: InteractionResponseEntity): InteractionResponseEntity;
    create(this: any, reqdata?: InteractionResponseCreateData, ctrl?: Control): Promise<InteractionResponseEntity>;
}
export { InteractionResponseEntity };
