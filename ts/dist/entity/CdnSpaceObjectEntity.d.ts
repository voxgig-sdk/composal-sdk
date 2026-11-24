import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CdnSpaceObject, CdnSpaceObjectLoadMatch, CdnSpaceObjectUpdateData, CdnSpaceObjectRemoveMatch } from '../ComposalTypes';
declare class CdnSpaceObjectEntity extends ComposalEntityBase<CdnSpaceObject> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CdnSpaceObjectEntity): CdnSpaceObjectEntity;
    load(this: any, reqmatch?: CdnSpaceObjectLoadMatch, ctrl?: Control): Promise<CdnSpaceObjectEntity>;
    update(this: any, reqdata?: CdnSpaceObjectUpdateData, ctrl?: Control): Promise<CdnSpaceObjectEntity>;
    remove(this: any, reqmatch?: CdnSpaceObjectRemoveMatch, ctrl?: Control): Promise<CdnSpaceObjectEntity>;
}
export { CdnSpaceObjectEntity };
