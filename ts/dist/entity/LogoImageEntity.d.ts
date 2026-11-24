import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LogoImage, LogoImageUpdateData, LogoImageRemoveMatch } from '../ComposalTypes';
declare class LogoImageEntity extends ComposalEntityBase<LogoImage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LogoImageEntity): LogoImageEntity;
    update(this: any, reqdata?: LogoImageUpdateData, ctrl?: Control): Promise<LogoImageEntity>;
    remove(this: any, reqmatch?: LogoImageRemoveMatch, ctrl?: Control): Promise<LogoImageEntity>;
}
export { LogoImageEntity };
