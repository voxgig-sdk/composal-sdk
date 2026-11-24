import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ControlComputerControlOperation, ControlComputerControlOperationLoadMatch, ControlComputerControlOperationCreateData } from '../ComposalTypes';
declare class ControlComputerControlOperationEntity extends ComposalEntityBase<ControlComputerControlOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ControlComputerControlOperationEntity): ControlComputerControlOperationEntity;
    load(this: any, reqmatch?: ControlComputerControlOperationLoadMatch, ctrl?: Control): Promise<ControlComputerControlOperationEntity>;
    create(this: any, reqdata?: ControlComputerControlOperationCreateData, ctrl?: Control): Promise<ControlComputerControlOperationEntity>;
}
export { ControlComputerControlOperationEntity };
