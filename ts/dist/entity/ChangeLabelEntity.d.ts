import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeLabel, ChangeLabelUpdateData } from '../ComposalTypes';
declare class ChangeLabelEntity extends ComposalEntityBase<ChangeLabel> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeLabelEntity): ChangeLabelEntity;
    update(this: any, reqdata?: ChangeLabelUpdateData, ctrl?: Control): Promise<ChangeLabelEntity>;
}
export { ChangeLabelEntity };
