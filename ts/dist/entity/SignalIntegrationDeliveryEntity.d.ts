import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SignalIntegrationDelivery, SignalIntegrationDeliveryListMatch } from '../ComposalTypes';
declare class SignalIntegrationDeliveryEntity extends ComposalEntityBase<SignalIntegrationDelivery> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SignalIntegrationDeliveryEntity): SignalIntegrationDeliveryEntity;
    list(this: any, reqmatch?: SignalIntegrationDeliveryListMatch, ctrl?: Control): Promise<SignalIntegrationDeliveryEntity[]>;
}
export { SignalIntegrationDeliveryEntity };
