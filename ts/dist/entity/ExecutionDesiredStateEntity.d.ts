import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExecutionDesiredState, ExecutionDesiredStateLoadMatch, ExecutionDesiredStateCreateData, ExecutionDesiredStateUpdateData, ExecutionDesiredStatePatchData, ExecutionDesiredStateRemoveMatch } from '../ComposalTypes';
declare class ExecutionDesiredStateEntity extends ComposalEntityBase<ExecutionDesiredState> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExecutionDesiredStateEntity): ExecutionDesiredStateEntity;
    load(this: any, reqmatch?: ExecutionDesiredStateLoadMatch, ctrl?: Control): Promise<ExecutionDesiredStateEntity>;
    create(this: any, reqdata?: ExecutionDesiredStateCreateData, ctrl?: Control): Promise<ExecutionDesiredStateEntity>;
    update(this: any, reqdata?: ExecutionDesiredStateUpdateData, ctrl?: Control): Promise<ExecutionDesiredStateEntity>;
    patch(this: any, reqdata?: ExecutionDesiredStatePatchData, ctrl?: Control): Promise<ExecutionDesiredStateEntity>;
    remove(this: any, reqmatch?: ExecutionDesiredStateRemoveMatch, ctrl?: Control): Promise<ExecutionDesiredStateEntity>;
}
export { ExecutionDesiredStateEntity };
