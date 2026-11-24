import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ImageRepository, ImageRepositoryListMatch, ImageRepositoryCreateData } from '../ComposalTypes';
declare class ImageRepositoryEntity extends ComposalEntityBase<ImageRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ImageRepositoryEntity): ImageRepositoryEntity;
    list(this: any, reqmatch?: ImageRepositoryListMatch, ctrl?: Control): Promise<ImageRepositoryEntity[]>;
    create(this: any, reqdata?: ImageRepositoryCreateData, ctrl?: Control): Promise<ImageRepositoryEntity>;
}
export { ImageRepositoryEntity };
