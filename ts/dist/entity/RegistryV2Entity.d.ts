import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RegistryV2, RegistryV2CreateData } from '../ComposalTypes';
declare class RegistryV2Entity extends ComposalEntityBase<RegistryV2> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RegistryV2Entity): RegistryV2Entity;
    create(this: any, reqdata?: RegistryV2CreateData, ctrl?: Control): Promise<RegistryV2Entity>;
}
export { RegistryV2Entity };
