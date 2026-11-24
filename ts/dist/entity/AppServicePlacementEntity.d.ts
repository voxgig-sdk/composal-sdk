import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppServicePlacement, AppServicePlacementLoadMatch, AppServicePlacementListMatch, AppServicePlacementUpdateData } from '../ComposalTypes';
declare class AppServicePlacementEntity extends ComposalEntityBase<AppServicePlacement> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppServicePlacementEntity): AppServicePlacementEntity;
    load(this: any, reqmatch?: AppServicePlacementLoadMatch, ctrl?: Control): Promise<AppServicePlacementEntity>;
    list(this: any, reqmatch?: AppServicePlacementListMatch, ctrl?: Control): Promise<AppServicePlacementEntity[]>;
    update(this: any, reqdata?: AppServicePlacementUpdateData, ctrl?: Control): Promise<AppServicePlacementEntity>;
}
export { AppServicePlacementEntity };
