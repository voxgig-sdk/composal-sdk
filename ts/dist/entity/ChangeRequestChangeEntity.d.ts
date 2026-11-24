import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeRequestChange, ChangeRequestChangeCreateData } from '../ComposalTypes';
declare class ChangeRequestChangeEntity extends ComposalEntityBase<ChangeRequestChange> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeRequestChangeEntity): ChangeRequestChangeEntity;
    create(this: any, reqdata?: ChangeRequestChangeCreateData, ctrl?: Control): Promise<ChangeRequestChangeEntity>;
}
export { ChangeRequestChangeEntity };
