import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Spark, SparkLoadMatch, SparkCreateData } from '../ComposalTypes';
declare class SparkEntity extends ComposalEntityBase<Spark> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkEntity): SparkEntity;
    load(this: any, reqmatch?: SparkLoadMatch, ctrl?: Control): Promise<SparkEntity>;
    create(this: any, reqdata?: SparkCreateData, ctrl?: Control): Promise<SparkEntity>;
}
export { SparkEntity };
