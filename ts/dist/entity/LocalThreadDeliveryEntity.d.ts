import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LocalThreadDelivery, LocalThreadDeliveryLoadMatch, LocalThreadDeliveryUpdateData } from '../ComposalTypes';
declare class LocalThreadDeliveryEntity extends ComposalEntityBase<LocalThreadDelivery> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LocalThreadDeliveryEntity): LocalThreadDeliveryEntity;
    load(this: any, reqmatch?: LocalThreadDeliveryLoadMatch, ctrl?: Control): Promise<LocalThreadDeliveryEntity>;
    update(this: any, reqdata?: LocalThreadDeliveryUpdateData, ctrl?: Control): Promise<LocalThreadDeliveryEntity>;
}
export { LocalThreadDeliveryEntity };
