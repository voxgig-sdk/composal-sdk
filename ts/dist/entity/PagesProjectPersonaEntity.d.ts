import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesProjectPersona, PagesProjectPersonaListMatch } from '../ComposalTypes';
declare class PagesProjectPersonaEntity extends ComposalEntityBase<PagesProjectPersona> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesProjectPersonaEntity): PagesProjectPersonaEntity;
    list(this: any, reqmatch?: PagesProjectPersonaListMatch, ctrl?: Control): Promise<PagesProjectPersonaEntity[]>;
}
export { PagesProjectPersonaEntity };
