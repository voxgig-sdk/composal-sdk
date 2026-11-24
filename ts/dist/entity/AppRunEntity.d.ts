import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppRun, AppRunLoadMatch, AppRunCreateData } from '../ComposalTypes';
declare class AppRunEntity extends ComposalEntityBase<AppRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppRunEntity): AppRunEntity;
    load(this: any, reqmatch?: AppRunLoadMatch, ctrl?: Control): Promise<AppRunEntity>;
    create(this: any, reqdata?: AppRunCreateData, ctrl?: Control): Promise<AppRunEntity>;
}
export { AppRunEntity };
