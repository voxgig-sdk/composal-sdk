import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesRegistry, PagesRegistryLoadMatch } from '../ComposalTypes';
declare class PagesRegistryEntity extends ComposalEntityBase<PagesRegistry> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesRegistryEntity): PagesRegistryEntity;
    load(this: any, reqmatch?: PagesRegistryLoadMatch, ctrl?: Control): Promise<PagesRegistryEntity>;
}
export { PagesRegistryEntity };
