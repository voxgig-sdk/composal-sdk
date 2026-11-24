import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Artefact, ArtefactLoadMatch, ArtefactListMatch, ArtefactCreateData, ArtefactUpdateData, ArtefactPatchData, ArtefactRemoveMatch } from '../ComposalTypes';
declare class ArtefactEntity extends ComposalEntityBase<Artefact> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtefactEntity): ArtefactEntity;
    load(this: any, reqmatch?: ArtefactLoadMatch, ctrl?: Control): Promise<ArtefactEntity>;
    list(this: any, reqmatch?: ArtefactListMatch, ctrl?: Control): Promise<ArtefactEntity[]>;
    create(this: any, reqdata?: ArtefactCreateData, ctrl?: Control): Promise<ArtefactEntity>;
    update(this: any, reqdata?: ArtefactUpdateData, ctrl?: Control): Promise<ArtefactEntity>;
    patch(this: any, reqdata?: ArtefactPatchData, ctrl?: Control): Promise<ArtefactEntity>;
    remove(this: any, reqmatch?: ArtefactRemoveMatch, ctrl?: Control): Promise<ArtefactEntity>;
}
export { ArtefactEntity };
