import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ScenarioRunLesson, ScenarioRunLessonCreateData } from '../ComposalTypes';
declare class ScenarioRunLessonEntity extends ComposalEntityBase<ScenarioRunLesson> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ScenarioRunLessonEntity): ScenarioRunLessonEntity;
    create(this: any, reqdata?: ScenarioRunLessonCreateData, ctrl?: Control): Promise<ScenarioRunLessonEntity>;
}
export { ScenarioRunLessonEntity };
