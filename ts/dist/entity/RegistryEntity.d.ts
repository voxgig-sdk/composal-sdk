import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Registry, RegistryLoadMatch } from '../ComposalTypes';
declare class RegistryEntity extends ComposalEntityBase<Registry> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RegistryEntity): RegistryEntity;
    load(this: any, reqmatch?: RegistryLoadMatch, ctrl?: Control): Promise<RegistryEntity>;
}
export { RegistryEntity };
