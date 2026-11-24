import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NodeCertificate, NodeCertificateCreateData } from '../ComposalTypes';
declare class NodeCertificateEntity extends ComposalEntityBase<NodeCertificate> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NodeCertificateEntity): NodeCertificateEntity;
    create(this: any, reqdata?: NodeCertificateCreateData, ctrl?: Control): Promise<NodeCertificateEntity>;
}
export { NodeCertificateEntity };
