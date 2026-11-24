import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkCredit, SparkCreditLoadMatch, SparkCreditCreateData, SparkCreditUpdateData, SparkCreditPatchData } from '../ComposalTypes';
declare class SparkCreditEntity extends ComposalEntityBase<SparkCredit> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkCreditEntity): SparkCreditEntity;
    load(this: any, reqmatch?: SparkCreditLoadMatch, ctrl?: Control): Promise<SparkCreditEntity>;
    create(this: any, reqdata?: SparkCreditCreateData, ctrl?: Control): Promise<SparkCreditEntity>;
    update(this: any, reqdata?: SparkCreditUpdateData, ctrl?: Control): Promise<SparkCreditEntity>;
    patch(this: any, reqdata?: SparkCreditPatchData, ctrl?: Control): Promise<SparkCreditEntity>;
}
export { SparkCreditEntity };
