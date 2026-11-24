import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeAsset, ChangeAssetCreateData } from '../ComposalTypes';
declare class ChangeAssetEntity extends ComposalEntityBase<ChangeAsset> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeAssetEntity): ChangeAssetEntity;
    create(this: any, reqdata?: ChangeAssetCreateData, ctrl?: Control): Promise<ChangeAssetEntity>;
}
export { ChangeAssetEntity };
