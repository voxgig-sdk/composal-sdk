import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CdnSpace, CdnSpaceLoadMatch, CdnSpaceCreateData, CdnSpaceUpdateData, CdnSpacePatchData, CdnSpaceRemoveMatch } from '../ComposalTypes';
declare class CdnSpaceEntity extends ComposalEntityBase<CdnSpace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CdnSpaceEntity): CdnSpaceEntity;
    load(this: any, reqmatch?: CdnSpaceLoadMatch, ctrl?: Control): Promise<CdnSpaceEntity>;
    create(this: any, reqdata?: CdnSpaceCreateData, ctrl?: Control): Promise<CdnSpaceEntity>;
    update(this: any, reqdata?: CdnSpaceUpdateData, ctrl?: Control): Promise<CdnSpaceEntity>;
    patch(this: any, reqdata?: CdnSpacePatchData, ctrl?: Control): Promise<CdnSpaceEntity>;
    remove(this: any, reqmatch?: CdnSpaceRemoveMatch, ctrl?: Control): Promise<CdnSpaceEntity>;
}
export { CdnSpaceEntity };
