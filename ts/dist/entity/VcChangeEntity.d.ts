import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcChange, VcChangeLoadMatch, VcChangeListMatch, VcChangeCreateData, VcChangeUpdateData } from '../ComposalTypes';
declare class VcChangeEntity extends ComposalEntityBase<VcChange> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcChangeEntity): VcChangeEntity;
    load(this: any, reqmatch?: VcChangeLoadMatch, ctrl?: Control): Promise<VcChangeEntity>;
    list(this: any, reqmatch?: VcChangeListMatch, ctrl?: Control): Promise<VcChangeEntity[]>;
    create(this: any, reqdata?: VcChangeCreateData, ctrl?: Control): Promise<VcChangeEntity>;
    update(this: any, reqdata?: VcChangeUpdateData, ctrl?: Control): Promise<VcChangeEntity>;
}
export { VcChangeEntity };
