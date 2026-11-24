import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PageArtefact, PageArtefactLoadMatch, PageArtefactListMatch } from '../ComposalTypes';
declare class PageArtefactEntity extends ComposalEntityBase<PageArtefact> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PageArtefactEntity): PageArtefactEntity;
    load(this: any, reqmatch?: PageArtefactLoadMatch, ctrl?: Control): Promise<PageArtefactEntity>;
    list(this: any, reqmatch?: PageArtefactListMatch, ctrl?: Control): Promise<PageArtefactEntity[]>;
}
export { PageArtefactEntity };
