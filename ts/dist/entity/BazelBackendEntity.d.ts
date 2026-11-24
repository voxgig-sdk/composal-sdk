import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BazelBackend, BazelBackendLoadMatch, BazelBackendCreateData, BazelBackendUpdateData, BazelBackendPatchData, BazelBackendRemoveMatch } from '../ComposalTypes';
declare class BazelBackendEntity extends ComposalEntityBase<BazelBackend> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BazelBackendEntity): BazelBackendEntity;
    load(this: any, reqmatch?: BazelBackendLoadMatch, ctrl?: Control): Promise<BazelBackendEntity>;
    create(this: any, reqdata?: BazelBackendCreateData, ctrl?: Control): Promise<BazelBackendEntity>;
    update(this: any, reqdata?: BazelBackendUpdateData, ctrl?: Control): Promise<BazelBackendEntity>;
    patch(this: any, reqdata?: BazelBackendPatchData, ctrl?: Control): Promise<BazelBackendEntity>;
    remove(this: any, reqmatch?: BazelBackendRemoveMatch, ctrl?: Control): Promise<BazelBackendEntity>;
}
export { BazelBackendEntity };
