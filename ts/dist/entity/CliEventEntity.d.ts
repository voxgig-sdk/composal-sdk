import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CliEvent, CliEventCreateData } from '../ComposalTypes';
declare class CliEventEntity extends ComposalEntityBase<CliEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CliEventEntity): CliEventEntity;
    create(this: any, reqdata?: CliEventCreateData, ctrl?: Control): Promise<CliEventEntity>;
}
export { CliEventEntity };
