import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ImageRepositoryTag, ImageRepositoryTagListMatch } from '../ComposalTypes';
declare class ImageRepositoryTagEntity extends ComposalEntityBase<ImageRepositoryTag> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ImageRepositoryTagEntity): ImageRepositoryTagEntity;
    list(this: any, reqmatch?: ImageRepositoryTagListMatch, ctrl?: Control): Promise<ImageRepositoryTagEntity[]>;
}
export { ImageRepositoryTagEntity };
