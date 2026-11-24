import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerificationProjectPersona, VerificationProjectPersonaLoadMatch, VerificationProjectPersonaListMatch, VerificationProjectPersonaCreateData, VerificationProjectPersonaUpdateData, VerificationProjectPersonaPatchData, VerificationProjectPersonaRemoveMatch } from '../ComposalTypes';
declare class VerificationProjectPersonaEntity extends ComposalEntityBase<VerificationProjectPersona> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerificationProjectPersonaEntity): VerificationProjectPersonaEntity;
    load(this: any, reqmatch?: VerificationProjectPersonaLoadMatch, ctrl?: Control): Promise<VerificationProjectPersonaEntity>;
    list(this: any, reqmatch?: VerificationProjectPersonaListMatch, ctrl?: Control): Promise<VerificationProjectPersonaEntity[]>;
    create(this: any, reqdata?: VerificationProjectPersonaCreateData, ctrl?: Control): Promise<VerificationProjectPersonaEntity>;
    update(this: any, reqdata?: VerificationProjectPersonaUpdateData, ctrl?: Control): Promise<VerificationProjectPersonaEntity>;
    patch(this: any, reqdata?: VerificationProjectPersonaPatchData, ctrl?: Control): Promise<VerificationProjectPersonaEntity>;
    remove(this: any, reqmatch?: VerificationProjectPersonaRemoveMatch, ctrl?: Control): Promise<VerificationProjectPersonaEntity>;
}
export { VerificationProjectPersonaEntity };
