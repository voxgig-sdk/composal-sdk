import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NomadLog, NomadLogLoadMatch } from '../ComposalTypes';
declare class NomadLogEntity extends ComposalEntityBase<NomadLog> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NomadLogEntity): NomadLogEntity;
    load(this: any, reqmatch?: NomadLogLoadMatch, ctrl?: Control): Promise<NomadLogEntity>;
}
export { NomadLogEntity };
