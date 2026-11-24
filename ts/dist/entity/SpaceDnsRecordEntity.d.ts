import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceDnsRecord, SpaceDnsRecordLoadMatch, SpaceDnsRecordCreateData, SpaceDnsRecordUpdateData, SpaceDnsRecordPatchData, SpaceDnsRecordRemoveMatch } from '../ComposalTypes';
declare class SpaceDnsRecordEntity extends ComposalEntityBase<SpaceDnsRecord> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceDnsRecordEntity): SpaceDnsRecordEntity;
    load(this: any, reqmatch?: SpaceDnsRecordLoadMatch, ctrl?: Control): Promise<SpaceDnsRecordEntity>;
    create(this: any, reqdata?: SpaceDnsRecordCreateData, ctrl?: Control): Promise<SpaceDnsRecordEntity>;
    update(this: any, reqdata?: SpaceDnsRecordUpdateData, ctrl?: Control): Promise<SpaceDnsRecordEntity>;
    patch(this: any, reqdata?: SpaceDnsRecordPatchData, ctrl?: Control): Promise<SpaceDnsRecordEntity>;
    remove(this: any, reqmatch?: SpaceDnsRecordRemoveMatch, ctrl?: Control): Promise<SpaceDnsRecordEntity>;
}
export { SpaceDnsRecordEntity };
