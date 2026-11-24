import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EnvironmentRevision, EnvironmentRevisionLoadMatch, EnvironmentRevisionCreateData, EnvironmentRevisionUpdateData } from '../ComposalTypes';
declare class EnvironmentRevisionEntity extends ComposalEntityBase<EnvironmentRevision> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EnvironmentRevisionEntity): EnvironmentRevisionEntity;
    load(this: any, reqmatch?: EnvironmentRevisionLoadMatch, ctrl?: Control): Promise<EnvironmentRevisionEntity>;
    create(this: any, reqdata?: EnvironmentRevisionCreateData, ctrl?: Control): Promise<EnvironmentRevisionEntity>;
    update(this: any, reqdata?: EnvironmentRevisionUpdateData, ctrl?: Control): Promise<EnvironmentRevisionEntity>;
}
export { EnvironmentRevisionEntity };
