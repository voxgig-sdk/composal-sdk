import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Spark, SparkListMatch, SparkCreateData } from '../ComposalTypes';
declare class SparkEntity extends ComposalEntityBase<Spark> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkEntity): SparkEntity;
    list(this: any, reqmatch?: SparkListMatch, ctrl?: Control): Promise<SparkEntity[]>;
    create(this: any, reqdata?: SparkCreateData, ctrl?: Control): Promise<SparkEntity>;
}
export { SparkEntity };
