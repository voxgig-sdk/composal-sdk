import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RoderMachine, RoderMachineUpdateData } from '../ComposalTypes';
declare class RoderMachineEntity extends ComposalEntityBase<RoderMachine> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RoderMachineEntity): RoderMachineEntity;
    update(this: any, reqdata?: RoderMachineUpdateData, ctrl?: Control): Promise<RoderMachineEntity>;
}
export { RoderMachineEntity };
