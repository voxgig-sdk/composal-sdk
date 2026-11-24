import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NomadLog, NomadLogListMatch } from '../ComposalTypes';
declare class NomadLogEntity extends ComposalEntityBase<NomadLog> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NomadLogEntity): NomadLogEntity;
    list(this: any, reqmatch?: NomadLogListMatch, ctrl?: Control): Promise<NomadLogEntity[]>;
}
export { NomadLogEntity };
