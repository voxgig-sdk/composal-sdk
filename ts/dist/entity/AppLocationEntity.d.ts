import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppLocation, AppLocationListMatch, AppLocationCreateData, AppLocationRemoveMatch } from '../ComposalTypes';
declare class AppLocationEntity extends ComposalEntityBase<AppLocation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppLocationEntity): AppLocationEntity;
    list(this: any, reqmatch?: AppLocationListMatch, ctrl?: Control): Promise<AppLocationEntity[]>;
    create(this: any, reqdata?: AppLocationCreateData, ctrl?: Control): Promise<AppLocationEntity>;
    remove(this: any, reqmatch?: AppLocationRemoveMatch, ctrl?: Control): Promise<AppLocationEntity>;
}
export { AppLocationEntity };
