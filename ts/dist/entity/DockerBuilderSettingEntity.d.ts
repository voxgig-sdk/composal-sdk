import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DockerBuilderSetting, DockerBuilderSettingLoadMatch, DockerBuilderSettingUpdateData, DockerBuilderSettingPatchData } from '../ComposalTypes';
declare class DockerBuilderSettingEntity extends ComposalEntityBase<DockerBuilderSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DockerBuilderSettingEntity): DockerBuilderSettingEntity;
    load(this: any, reqmatch?: DockerBuilderSettingLoadMatch, ctrl?: Control): Promise<DockerBuilderSettingEntity>;
    update(this: any, reqdata?: DockerBuilderSettingUpdateData, ctrl?: Control): Promise<DockerBuilderSettingEntity>;
    patch(this: any, reqdata?: DockerBuilderSettingPatchData, ctrl?: Control): Promise<DockerBuilderSettingEntity>;
}
export { DockerBuilderSettingEntity };
