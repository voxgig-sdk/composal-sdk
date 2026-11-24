import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExecutionReconcilerTick, ExecutionReconcilerTickLoadMatch, ExecutionReconcilerTickListMatch, ExecutionReconcilerTickCreateData } from '../ComposalTypes';
declare class ExecutionReconcilerTickEntity extends ComposalEntityBase<ExecutionReconcilerTick> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExecutionReconcilerTickEntity): ExecutionReconcilerTickEntity;
    load(this: any, reqmatch?: ExecutionReconcilerTickLoadMatch, ctrl?: Control): Promise<ExecutionReconcilerTickEntity>;
    list(this: any, reqmatch?: ExecutionReconcilerTickListMatch, ctrl?: Control): Promise<ExecutionReconcilerTickEntity[]>;
    create(this: any, reqdata?: ExecutionReconcilerTickCreateData, ctrl?: Control): Promise<ExecutionReconcilerTickEntity>;
}
export { ExecutionReconcilerTickEntity };
