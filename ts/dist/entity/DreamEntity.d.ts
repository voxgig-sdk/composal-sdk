import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Dream, DreamLoadMatch, DreamListMatch, DreamCreateData } from '../ComposalTypes';
declare class DreamEntity extends ComposalEntityBase<Dream> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DreamEntity): DreamEntity;
    load(this: any, reqmatch?: DreamLoadMatch, ctrl?: Control): Promise<DreamEntity>;
    list(this: any, reqmatch?: DreamListMatch, ctrl?: Control): Promise<DreamEntity[]>;
    create(this: any, reqdata?: DreamCreateData, ctrl?: Control): Promise<DreamEntity>;
}
export { DreamEntity };
