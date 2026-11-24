import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BackendRunnerPool, BackendRunnerPoolLoadMatch, BackendRunnerPoolCreateData, BackendRunnerPoolRemoveMatch } from '../ComposalTypes';
declare class BackendRunnerPoolEntity extends ComposalEntityBase<BackendRunnerPool> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BackendRunnerPoolEntity): BackendRunnerPoolEntity;
    load(this: any, reqmatch?: BackendRunnerPoolLoadMatch, ctrl?: Control): Promise<BackendRunnerPoolEntity>;
    create(this: any, reqdata?: BackendRunnerPoolCreateData, ctrl?: Control): Promise<BackendRunnerPoolEntity>;
    remove(this: any, reqmatch?: BackendRunnerPoolRemoveMatch, ctrl?: Control): Promise<BackendRunnerPoolEntity>;
}
export { BackendRunnerPoolEntity };
