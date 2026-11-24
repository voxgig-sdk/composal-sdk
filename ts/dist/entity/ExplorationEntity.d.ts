import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Exploration, ExplorationLoadMatch, ExplorationListMatch, ExplorationCreateData } from '../ComposalTypes';
declare class ExplorationEntity extends ComposalEntityBase<Exploration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExplorationEntity): ExplorationEntity;
    load(this: any, reqmatch?: ExplorationLoadMatch, ctrl?: Control): Promise<ExplorationEntity>;
    list(this: any, reqmatch?: ExplorationListMatch, ctrl?: Control): Promise<ExplorationEntity[]>;
    create(this: any, reqdata?: ExplorationCreateData, ctrl?: Control): Promise<ExplorationEntity>;
}
export { ExplorationEntity };
