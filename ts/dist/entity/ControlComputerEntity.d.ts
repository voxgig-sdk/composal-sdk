import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ControlComputer, ControlComputerListMatch, ControlComputerUpdateData } from '../ComposalTypes';
declare class ControlComputerEntity extends ComposalEntityBase<ControlComputer> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ControlComputerEntity): ControlComputerEntity;
    list(this: any, reqmatch?: ControlComputerListMatch, ctrl?: Control): Promise<ControlComputerEntity[]>;
    update(this: any, reqdata?: ControlComputerUpdateData, ctrl?: Control): Promise<ControlComputerEntity>;
}
export { ControlComputerEntity };
