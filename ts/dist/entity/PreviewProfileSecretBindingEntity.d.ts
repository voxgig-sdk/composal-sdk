import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PreviewProfileSecretBinding, PreviewProfileSecretBindingListMatch, PreviewProfileSecretBindingCreateData, PreviewProfileSecretBindingRemoveMatch } from '../ComposalTypes';
declare class PreviewProfileSecretBindingEntity extends ComposalEntityBase<PreviewProfileSecretBinding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PreviewProfileSecretBindingEntity): PreviewProfileSecretBindingEntity;
    list(this: any, reqmatch?: PreviewProfileSecretBindingListMatch, ctrl?: Control): Promise<PreviewProfileSecretBindingEntity[]>;
    create(this: any, reqdata?: PreviewProfileSecretBindingCreateData, ctrl?: Control): Promise<PreviewProfileSecretBindingEntity>;
    remove(this: any, reqmatch?: PreviewProfileSecretBindingRemoveMatch, ctrl?: Control): Promise<PreviewProfileSecretBindingEntity>;
}
export { PreviewProfileSecretBindingEntity };
