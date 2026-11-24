import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SwarmNote, SwarmNoteCreateData } from '../ComposalTypes';
declare class SwarmNoteEntity extends ComposalEntityBase<SwarmNote> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SwarmNoteEntity): SwarmNoteEntity;
    create(this: any, reqdata?: SwarmNoteCreateData, ctrl?: Control): Promise<SwarmNoteEntity>;
}
export { SwarmNoteEntity };
