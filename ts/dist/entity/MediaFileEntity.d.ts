import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MediaFile, MediaFileLoadMatch } from '../ComposalTypes';
declare class MediaFileEntity extends ComposalEntityBase<MediaFile> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MediaFileEntity): MediaFileEntity;
    load(this: any, reqmatch?: MediaFileLoadMatch, ctrl?: Control): Promise<MediaFileEntity>;
}
export { MediaFileEntity };
