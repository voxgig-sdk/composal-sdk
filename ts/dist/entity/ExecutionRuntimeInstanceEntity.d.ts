import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExecutionRuntimeInstance, ExecutionRuntimeInstanceLoadMatch, ExecutionRuntimeInstanceListMatch, ExecutionRuntimeInstanceCreateData, ExecutionRuntimeInstanceUpdateData, ExecutionRuntimeInstancePatchData, ExecutionRuntimeInstanceRemoveMatch } from '../ComposalTypes';
declare class ExecutionRuntimeInstanceEntity extends ComposalEntityBase<ExecutionRuntimeInstance> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExecutionRuntimeInstanceEntity): ExecutionRuntimeInstanceEntity;
    load(this: any, reqmatch?: ExecutionRuntimeInstanceLoadMatch, ctrl?: Control): Promise<ExecutionRuntimeInstanceEntity>;
    list(this: any, reqmatch?: ExecutionRuntimeInstanceListMatch, ctrl?: Control): Promise<ExecutionRuntimeInstanceEntity[]>;
    create(this: any, reqdata?: ExecutionRuntimeInstanceCreateData, ctrl?: Control): Promise<ExecutionRuntimeInstanceEntity>;
    update(this: any, reqdata?: ExecutionRuntimeInstanceUpdateData, ctrl?: Control): Promise<ExecutionRuntimeInstanceEntity>;
    patch(this: any, reqdata?: ExecutionRuntimeInstancePatchData, ctrl?: Control): Promise<ExecutionRuntimeInstanceEntity>;
    remove(this: any, reqmatch?: ExecutionRuntimeInstanceRemoveMatch, ctrl?: Control): Promise<ExecutionRuntimeInstanceEntity>;
}
export { ExecutionRuntimeInstanceEntity };
