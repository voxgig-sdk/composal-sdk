import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Me, MeLoadMatch, MeCreateData, MeUpdateData, MeRemoveMatch } from '../ComposalTypes';
declare class MeEntity extends ComposalEntityBase<Me> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MeEntity): MeEntity;
    load(this: any, reqmatch?: MeLoadMatch, ctrl?: Control): Promise<MeEntity>;
    create(this: any, reqdata?: MeCreateData, ctrl?: Control): Promise<MeEntity>;
    update(this: any, reqdata?: MeUpdateData, ctrl?: Control): Promise<MeEntity>;
    remove(this: any, reqmatch?: MeRemoveMatch, ctrl?: Control): Promise<MeEntity>;
}
export { MeEntity };
