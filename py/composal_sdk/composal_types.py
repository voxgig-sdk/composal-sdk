# Typed models for the Composal SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class A2aWellKnown(TypedDict):
    pass


class A2aWellKnownLoadMatch(TypedDict):
    a2a_id: str


class AdminOrgRequired(TypedDict):
    billing_email: str | None
    deployment_usage_visibility: str
    deployment_usage_visible: bool
    id: str
    monthly_price_override_cents: int | None
    name: str
    owner_email: str
    package_id: str | None
    slug: str


class AdminOrg(AdminOrgRequired, total=False):
    billing_reason: str
    customize_onboarding_packages: bool
    monthly_price_dollars: str | float
    onboarding_custom_pricing: bool
    onboarding_package_keys: list | None
    skip_payment: bool


class AdminOrgLoadMatch(TypedDict):
    id: str


class AdminOrgCreateDataRequired(TypedDict):
    name: str
    owner_email: str
    slug: str


class AdminOrgCreateData(AdminOrgCreateDataRequired, total=False):
    billing_reason: str
    customize_onboarding_packages: bool
    monthly_price_dollars: str | float
    onboarding_custom_pricing: bool
    onboarding_package_keys: list | None
    package_id: str | None
    skip_payment: bool


class AdminOrgUpdateDataRequired(TypedDict):
    id: str


class AdminOrgUpdateData(AdminOrgUpdateDataRequired, total=False):
    billing_email: str | None
    monthly_price_dollars: str | float
    package_id: str | None
    reason: Any


class AgentRequired(TypedDict):
    attention: str | None
    can_edit_configuration: bool
    can_manage: bool
    can_reconcile_save: bool
    configuration: Any
    configuration_revision: int
    configuration_version: str | None
    controlling_user_id: str
    created_at: str
    has_unread_updates: bool
    id: str
    last_reply_at: str | None
    lifecycle_actions: list
    lifecycle_version: str | None
    name: str
    organization_id: str
    reply_triage: dict | None
    setup_pending: bool
    slug: str
    status: str
    updated_at: str


class Agent(AgentRequired, total=False):
    avatar: str | None
    can_delete: bool
    can_manage_sharing: bool
    can_name_managers: bool
    can_queue_input: bool
    control_connections_available: bool
    coordination_available: bool
    direct_chat_available: bool
    local_agent_control_available: bool
    managers: list
    model_change_action: str | None
    persona: Any
    preview: Any
    preview_received_at: str | None
    provisioning: Any
    runtime_version: str
    sharing_fixed: bool
    sharing_version: int
    team_role: str
    url_slug: str
    visibility: str


class AgentLoadMatch(TypedDict):
    id: str
    organization_id: str


class AgentListMatchRequired(TypedDict):
    organization_id: str


class AgentListMatch(AgentListMatchRequired, total=False):
    cursor: str
    limit: int
    q: str
    runtime_version: str
    status: str


class AgentCreateDataRequired(TypedDict):
    organization_id: str
    name: str


class AgentCreateData(AgentCreateDataRequired, total=False):
    viewer_time_zone: str
    configuration: Any
    runtime_version: str
    slug: str
    visibility: str


class AgentUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentUpdateData(AgentUpdateDataRequired, total=False):
    name: str
    team_role: str
    visibility: str
    acknowledge_reset: Any
    after_id: Any
    before_id: Any
    conversation_id: Any
    expected_generation: Any
    expected_version: Any
    github_access: Any
    integration_id: Any
    keep_connections: Any
    memory_mb: Any
    model: Any
    profile: Any
    provider: Any
    reasoning: Any
    revoke_access: Any
    setup_only: Any
    value: Any


class AgentRemoveMatch(TypedDict):
    id: str
    organization_id: str


class AgentApp(TypedDict):
    author: dict
    can_message: bool
    deployments_count: int
    description: str
    hidden_install_count: int
    id: str
    install_count: int
    installed_by: list
    installed_target_ids: list
    mcp_url: str | None
    owner: dict
    thread: Any
    title: str
    url: str
    visibility: str


class AgentAppLoadMatch(TypedDict):
    id: str
    organization_id: str


class AgentAppListMatchRequired(TypedDict):
    organization_id: str


class AgentAppListMatch(AgentAppListMatchRequired, total=False):
    cursor: str


class AgentAppCreateDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentAppCreateData(AgentAppCreateDataRequired, total=False):
    surface: Any
    view: Any


class AgentAppInstallRequired(TypedDict):
    installed: bool


class AgentAppInstall(AgentAppInstallRequired, total=False):
    id: str


class AgentAppInstallUpdateData(TypedDict):
    agent_app_id: str
    id: str
    organization_id: str


class AgentAppInstallRemoveMatch(TypedDict):
    agent_app_id: str
    id: str
    organization_id: str


class AgentAttachmentRequired(TypedDict):
    byte_size: int
    content_type: str
    file_name: str


class AgentAttachment(AgentAttachmentRequired, total=False):
    id: str


class AgentAttachmentCreateData(TypedDict):
    agent_id: str
    organization_id: str
    byte_size: int
    content_type: str
    file_name: str


class AgentAutomation(TypedDict):
    can_manage: bool
    can_manage_events: bool
    can_run: bool
    can_schedule: bool
    definition: dict
    event_subscriptions: list
    event_triggers: list
    expected_revision: int
    id: str
    key: str
    name: str
    revision: int
    schedule: Any
    schedules: list
    version: dict


class AgentAutomationLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentAutomationListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentAutomationListMatch(AgentAutomationListMatchRequired, total=False):
    cursor: str
    limit: int


class AgentAutomationUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentAutomationUpdateData(AgentAutomationUpdateDataRequired, total=False):
    definition: dict
    expected_revision: int


class AgentAvatar(TypedDict):
    pass


class AgentAvatarLoadMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentAvatarLoadMatch(AgentAvatarLoadMatchRequired, total=False):
    style_catalog: int


class AgentAvatarCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentAvatarCreateData(AgentAvatarCreateDataRequired, total=False):
    style_catalog: int
    description: Any
    expected_generation: Any
    mode: Any
    pixel: Any
    style: Any


class AgentCommand(TypedDict):
    description: str
    display_name: str
    name: str
    skill_model_visible: bool
    source: str


class AgentCommandListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentCommandListMatch(AgentCommandListMatchRequired, total=False):
    conversation_id: str


class AgentComputer(TypedDict):
    pass


class AgentComputerLoadMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentComputerCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentComputerCreateData(AgentComputerCreateDataRequired, total=False):
    prepare: Any


class AgentConnectionRequired(TypedDict):
    actions: list
    activity: list
    authentication: str
    authorized_at: str | None
    capabilities: dict
    certification: str
    checked_at: str | None
    connection: dict
    consent: dict | None
    created_at: str
    custodian_id: str | None
    failure_code: str | None
    generation: int
    grants: list
    grants_pagination: dict
    id: str
    limits: dict
    name: str
    organization_id: str
    ownership_kind: str
    pagination: dict
    policy_digest: str
    provider: dict
    provider_identity: dict
    revoked_at: str | None
    schema_version: int
    status: str
    toolkit: str
    triggers: list
    updated_at: str
    user_id: str
    version: str


class AgentConnection(AgentConnectionRequired, total=False):
    admin_disabled_at: str | None
    agent_tools: bool
    can_create_account: bool
    catalog_section: str
    category: str
    creation_key: str
    description: str
    disabled_reason: str | None
    owner_name: str
    provider_disabled_reason: str | None


class AgentConnectionLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class AgentConnectionLoadMatch(AgentConnectionLoadMatchRequired, total=False):
    cursor: str
    grants_cursor: str
    grants_limit: int
    limit: int


class AgentConnectionListMatchRequired(TypedDict):
    organization_id: str


class AgentConnectionListMatch(AgentConnectionListMatchRequired, total=False):
    cursor: str
    limit: int


class AgentConnectionCreateDataRequired(TypedDict):
    organization_id: str
    name: str
    toolkit: str


class AgentConnectionCreateData(AgentConnectionCreateDataRequired, total=False):
    creation_key: str


class AgentConnectionUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentConnectionUpdateData(AgentConnectionUpdateDataRequired, total=False):
    name: str


class AgentConnectionPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentConnectionPatchData(AgentConnectionPatchDataRequired, total=False):
    name: str


class AgentConnectionRemoveMatch(TypedDict):
    id: str
    organization_id: str


class AgentConnectionDelegation(TypedDict):
    authorized_by_id: str
    automation_connection_grant_id: str
    created_at: str
    id: str
    member_name: str
    revoked_at: str | None
    roles: list
    usable: bool
    user_id: str


class AgentConnectionDelegationListMatch(TypedDict):
    agent_connection_id: str
    organization_id: str


class AgentConnectionGrant(TypedDict):
    actions: list
    agent_connection_id: str
    automation_id: str
    connection_generation: int
    created_at: str
    id: str
    organization_id: str
    revision: int
    revoked_at: str | None
    status: str
    usable: bool
    user_id: str


class AgentConnectionGrantListMatch(TypedDict):
    agent_connection_id: str
    organization_id: str


class AgentConnectionResourceRequired(TypedDict):
    next_cursor: str | None
    resources: list


class AgentConnectionResource(AgentConnectionResourceRequired, total=False):
    cursor: str | None
    query: str


class AgentConnectionResourceCreateDataRequired(TypedDict):
    agent_connection_id: str
    organization_id: str


class AgentConnectionResourceCreateData(AgentConnectionResourceCreateDataRequired, total=False):
    cursor: str | None
    query: str


class AgentConnectionSafetyControlRequired(TypedDict):
    authorized_at: str | None
    checked_at: str | None
    created_at: str
    custodian_id: str | None
    failure_code: str | None
    generation: int
    id: str
    name: str
    organization_id: str
    ownership_kind: str
    provider_identity: dict
    revoked_at: str | None
    status: str
    toolkit: str
    updated_at: str
    user_id: str


class AgentConnectionSafetyControl(AgentConnectionSafetyControlRequired, total=False):
    admin_disabled_at: str | None
    owner_name: str
    provider_disabled_reason: str | None


class AgentConnectionSafetyControlListMatchRequired(TypedDict):
    organization_id: str


class AgentConnectionSafetyControlListMatch(AgentConnectionSafetyControlListMatchRequired, total=False):
    cursor: str
    limit: int


class AgentConnectionTriggerSubscription(TypedDict):
    agent_connection_id: str
    configuration: dict
    created_at: str
    defaults: dict
    delivery: str
    enabled: bool
    failure_code: str | None
    failure_request_id: str | None
    id: str
    latency: str
    name: str
    reconcile_at: str
    reconciliation_uncertain: bool
    remote_enabled: bool | None
    replacement_id: str | None
    retired_at: str | None
    retirement_completed_at: str | None
    schema: dict
    slug: str
    status: str
    toolkit: str
    toolkit_version: str
    trigger_slug: str
    updated_at: str
    version: str
    waiting_for_retirement: bool


class AgentConnectionTriggerSubscriptionListMatchRequired(TypedDict):
    agent_connection_id: str
    organization_id: str


class AgentConnectionTriggerSubscriptionListMatch(AgentConnectionTriggerSubscriptionListMatchRequired, total=False):
    cursor: str
    limit: int


class AgentConnectionTriggerSubscriptionCreateData(TypedDict):
    agent_connection_id: str
    organization_id: str
    configuration: dict
    trigger_slug: str


class AgentConnectionTriggerSubscriptionUpdateDataRequired(TypedDict):
    agent_connection_id: str
    id: str
    organization_id: str


class AgentConnectionTriggerSubscriptionUpdateData(AgentConnectionTriggerSubscriptionUpdateDataRequired, total=False):
    enabled: bool


class AgentConnectionTriggerSubscriptionPatchDataRequired(TypedDict):
    agent_connection_id: str
    id: str
    organization_id: str


class AgentConnectionTriggerSubscriptionPatchData(AgentConnectionTriggerSubscriptionPatchDataRequired, total=False):
    enabled: bool


class AgentConnectionTriggerSubscriptionRemoveMatch(TypedDict):
    agent_connection_id: str
    id: str
    organization_id: str


class AgentContextCheckpoint(TypedDict, total=False):
    id: str


class AgentContextCheckpointLoadMatchRequired(TypedDict):
    change_id: str
    id: str
    organization_id: str
    repo_id: str
    expected_commit_id: str


class AgentContextCheckpointLoadMatch(AgentContextCheckpointLoadMatchRequired, total=False):
    max_byte: int


class AgentControlFlowRequired(TypedDict):
    can_cancel: bool
    cancellation_requested: bool
    device_name: str
    flow_id: str
    providers: list
    status_label: str
    step_count: int
    title: str | None


class AgentControlFlow(AgentControlFlowRequired, total=False):
    id: str
    repair_of_flow_id: str


class AgentControlFlowLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentControlFlowListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentControlFlowCreateData(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentCoordination(TypedDict, total=False):
    id: str


class AgentCoordinationCreateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentCoordinationCreateData(AgentCoordinationCreateDataRequired, total=False):
    include_source: Any


AgentEmailRequired = TypedDict('AgentEmailRequired', {
    "delivery": str | None,
    "direction": str,
    "from": str,
    "id": str,
    "received_at": str,
    "recipient_tag": str | None,
    "spam": bool,
    "subject": str | None,
    "text": str,
    "to": list,
})

AgentEmailOptional = TypedDict('AgentEmailOptional', {
    "preview": str,
}, total=False)


class AgentEmail(AgentEmailRequired, AgentEmailOptional):
    pass


class AgentEmailLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentEvent(TypedDict):
    pass


class AgentEventLoadMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentEventLoadMatch(AgentEventLoadMatchRequired, total=False):
    conversation_id: str
    device_activity_provider: str


class AgentFile(TypedDict):
    content_type: str
    download_url: str
    filename: str
    id: str
    size_bytes: int


class AgentFileLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentInputRequired(TypedDict):
    browser_context: dict
    client_time: dict
    conversation_id: str
    text: str


class AgentInput(AgentInputRequired, total=False):
    attachment_ids: list
    attachments: list
    model_policy: Any
    requester_membership_id: str
    speed: str


class AgentInputCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str
    browser_context: dict
    client_time: dict
    conversation_id: str
    text: str


class AgentInputCreateData(AgentInputCreateDataRequired, total=False):
    attachment_ids: list
    attachments: list
    model_policy: Any
    requester_membership_id: str
    speed: str


class AgentIntegrationRequired(TypedDict):
    account_counts: dict
    can_delete: bool
    can_disconnect: bool
    can_enable: bool
    can_manage: bool
    can_manage_sharing: bool
    can_reconnect: bool
    can_sync: bool
    catalog: list
    connected_by: str | None
    connected_by_you: bool
    connected_counts: dict
    connections: list
    generation: int
    id: str
    name: str
    pagination: dict
    pending_counts: dict
    provider_disabled_reason: str | None
    provider_identity: dict
    provider_name: str | None
    reference: str
    status: str
    team_sharing_enabled: bool
    team_sharing_version: int
    toolkit: str


class AgentIntegration(AgentIntegrationRequired, total=False):
    can_cancel_sign_in: bool
    creation_key: str
    creation_key_digest: str | None
    sharing_status: str


class AgentIntegrationLoadMatchRequired(TypedDict):
    organization_id: str


class AgentIntegrationLoadMatch(AgentIntegrationLoadMatchRequired, total=False):
    id: str
    cursor: str
    enableable: bool
    limit: int
    q: str
    toolkit: str


class AgentIntegrationCreateDataRequired(TypedDict):
    organization_id: str
    name: str
    toolkit: str


class AgentIntegrationCreateData(AgentIntegrationCreateDataRequired, total=False):
    creation_key: str


class AgentIntegrationRemoveMatch(TypedDict):
    id: str
    organization_id: str


class AgentIntegrationAccountRequired(TypedDict):
    can_delete: bool
    can_disconnect: bool
    can_enable: bool
    can_manage_sharing: bool
    can_reconnect: bool
    can_sync: bool
    connected_by: str | None
    connected_by_you: bool
    generation: int
    id: str
    name: str
    provider_disabled_reason: str | None
    provider_identity: dict
    reference: str
    status: str
    team_sharing_enabled: bool
    team_sharing_version: int
    toolkit: str


class AgentIntegrationAccount(AgentIntegrationAccountRequired, total=False):
    can_cancel_sign_in: bool
    creation_key_digest: str | None
    sharing_status: str


class AgentIntegrationAccountListMatchRequired(TypedDict):
    organization_id: str


class AgentIntegrationAccountListMatch(AgentIntegrationAccountListMatchRequired, total=False):
    cursor: str
    enableable: bool
    limit: int
    q: str
    toolkit: str


class AgentIntegrationCallback(TypedDict):
    pass


class AgentIntegrationCallbackLoadMatchRequired(TypedDict):
    connection_id: str
    state: str


class AgentIntegrationCallbackLoadMatch(AgentIntegrationCallbackLoadMatchRequired, total=False):
    code: str


class AgentInteractionRequired(TypedDict):
    interactions: list


class AgentInteraction(AgentInteractionRequired, total=False):
    id: str


class AgentInteractionLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str
    conversation_id: str


class AgentInteractionListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str
    conversation_id: str


class AgentInteractionListMatch(AgentInteractionListMatchRequired, total=False):
    ids: list


class AgentInteractionCreateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentInteractionCreateData(AgentInteractionCreateDataRequired, total=False):
    conversation_id: Any
    expected_revision: Any


class AgentLibrary(TypedDict, total=False):
    id: str


class AgentLibraryLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentManagerRequired(TypedDict):
    attention: str | None
    can_edit_configuration: bool
    can_manage: bool
    can_reconcile_save: bool
    configuration: Any
    configuration_revision: int
    configuration_version: str | None
    controlling_user_id: str
    created_at: str
    has_unread_updates: bool
    id: str
    last_reply_at: str | None
    lifecycle_actions: list
    lifecycle_version: str | None
    name: str
    organization_id: str
    reply_triage: dict | None
    setup_pending: bool
    slug: str
    status: str
    updated_at: str
    user_id: str


class AgentManager(AgentManagerRequired, total=False):
    avatar: str | None
    can_delete: bool
    can_manage_sharing: bool
    can_name_managers: bool
    can_queue_input: bool
    control_connections_available: bool
    coordination_available: bool
    direct_chat_available: bool
    local_agent_control_available: bool
    managers: list
    model_change_action: str | None
    persona: Any
    preview: Any
    preview_received_at: str | None
    provisioning: Any
    runtime_version: str
    sharing_fixed: bool
    sharing_version: int
    team_role: str
    url_slug: str
    visibility: str


class AgentManagerCreateData(TypedDict):
    agent_id: str
    organization_id: str
    user_id: str


class AgentManagerRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentManagerChoice(TypedDict):
    id: str
    name: str


class AgentManagerChoiceListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentManagerChoiceListMatch(AgentManagerChoiceListMatchRequired, total=False):
    q: str


class AgentMarketplaceRequired(TypedDict):
    bundle: dict
    can_manage: bool
    catalog_key: str | None
    categories: list
    category: str
    counts: dict
    created_at: str
    expected_version: int
    explainer: str | None
    featured: bool
    from_composal: bool
    id: str
    installs_count: int
    instructions: str
    integration_toolkits: list
    integrations: list
    listing: Any
    listings: list
    memories: list
    name: str
    next_page: int | None
    organization_name: str
    page_apps: list
    publisher_avatar_url: str | None
    publisher_name: str
    sections: list
    share_token: str | None
    skills: list
    slug: str
    summary: str
    updated_at: str
    version: int
    viewer: dict
    visibility: str


class AgentMarketplace(AgentMarketplaceRequired, total=False):
    source_agent_id: str


class AgentMarketplaceLoadMatch(TypedDict):
    id: str


class AgentMarketplaceCreateDataRequired(TypedDict):
    organization_id: str
    bundle: dict
    category: str
    name: str
    summary: str


class AgentMarketplaceCreateData(AgentMarketplaceCreateDataRequired, total=False):
    explainer: str | None
    source_agent_id: str
    visibility: str


class AgentMarketplaceUpdateData(TypedDict):
    id: str
    organization_id: str


class AgentMarketplacePatchDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentMarketplacePatchData(AgentMarketplacePatchDataRequired, total=False):
    bundle: dict
    category: str
    expected_version: int
    explainer: str | None
    name: str
    summary: str
    visibility: str


class AgentMarketplaceRemoveMatch(TypedDict):
    id: str
    organization_id: str


class AgentMarketplaceShared(TypedDict):
    can_manage: bool
    catalog_key: str | None
    category: str
    counts: dict
    created_at: str
    explainer: str | None
    featured: bool
    from_composal: bool
    id: str
    installs_count: int
    instructions: str
    integration_toolkits: list
    integrations: list
    listing: Any
    memories: list
    name: str
    organization_name: str
    page_apps: list
    publisher_avatar_url: str | None
    publisher_name: str
    share_token: str | None
    skills: list
    slug: str
    summary: str
    updated_at: str
    version: int
    viewer: dict
    visibility: str


class AgentMarketplaceSharedLoadMatchRequired(TypedDict):
    id: str


class AgentMarketplaceSharedLoadMatch(AgentMarketplaceSharedLoadMatchRequired, total=False):
    organization_id: str


class AgentMarketplaceSharedCreateData(TypedDict):
    id: str
    organization_id: str


class AgentMissionControl(TypedDict):
    pass


class AgentMissionControlCreateDataRequired(TypedDict):
    organization_id: str


class AgentMissionControlCreateData(AgentMissionControlCreateDataRequired, total=False):
    action: Any
    agent_id: Any
    agent_ids: Any
    at: Any


class AgentOperationRequired(TypedDict):
    arguments: dict
    key: str
    name: str
    operation: dict
    participant: str
    requester_id: str
    scope_key: str


class AgentOperation(AgentOperationRequired, total=False):
    id: str


class AgentOperationLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentOperationCreateData(TypedDict):
    agent_id: str
    organization_id: str
    arguments: dict
    key: str
    name: str
    requester_id: str


class AgentProvisioning(TypedDict):
    pass


class AgentProvisioningCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentProvisioningCreateData(AgentProvisioningCreateDataRequired, total=False):
    expected_version: Any


class AgentPullRequest(TypedDict):
    id: str
    number: int
    owners: list
    repository: str
    status: str
    title: str
    url: str


class AgentPullRequestListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentPullRequestListMatch(AgentPullRequestListMatchRequired, total=False):
    cursor: str
    scope: str


class AgentQuestion(TypedDict, total=False):
    id: str


class AgentQuestionCreateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentQuestionCreateData(AgentQuestionCreateDataRequired, total=False):
    answers: Any
    conversation_id: Any


class AgentRelayFileGrantRequired(TypedDict):
    access_mode: str
    connection_generation: int
    connection_id: str
    connection_name: str
    created_at: str
    expected_generation: int
    id: str
    key: str
    provider: str
    resource_id: str
    resource_kind: str
    revoked: bool
    revoked_at: str | None
    source_operation_id: str


class AgentRelayFileGrant(AgentRelayFileGrantRequired, total=False):
    snapshot_supported: bool


class AgentRelayFileGrantLoadMatch(TypedDict):
    id: str
    organization_id: str


class AgentRelayFileGrantListMatchRequired(TypedDict):
    organization_id: str


class AgentRelayFileGrantListMatch(AgentRelayFileGrantListMatchRequired, total=False):
    cursor: str
    limit: int
    request_key: str
    source_operation_id: str


class AgentRelayFileGrantCreateData(TypedDict):
    organization_id: str
    access_mode: str
    connection_id: str
    expected_generation: int
    key: str
    resource_id: str
    resource_kind: str
    source_operation_id: str


class AgentRelayFileGrantRemoveMatch(TypedDict):
    id: str
    organization_id: str


class AgentRelayFileGrantAccountRequired(TypedDict):
    generation: int
    id: str
    name: str
    provider: str
    resource_kind: str


class AgentRelayFileGrantAccount(AgentRelayFileGrantAccountRequired, total=False):
    access_modes: list


class AgentRelayFileGrantAccountListMatchRequired(TypedDict):
    organization_id: str
    source_operation_id: str


class AgentRelayFileGrantAccountListMatch(AgentRelayFileGrantAccountListMatchRequired, total=False):
    cursor: str


class AgentRepositoryRequired(TypedDict):
    can_manage: bool
    environments: dict
    expected_version: int
    repository_choices: list
    repository_choices_truncated: bool
    version: int
    work_repositories: list


class AgentRepository(AgentRepositoryRequired, total=False):
    id: str
    repository_choices_error: str | None


class AgentRepositoryLoadMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentRepositoryLoadMatch(AgentRepositoryLoadMatchRequired, total=False):
    q: str


class AgentRepositoryUpdateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentRepositoryUpdateData(AgentRepositoryUpdateDataRequired, total=False):
    expected_version: int
    work_repositories: list


class AgentResource(TypedDict):
    name: str
    uri: str


class AgentResourceListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentRoder(TypedDict):
    pass


class AgentRoderLoadMatch(TypedDict):
    organization_id: str


class AgentRoderCreateData(TypedDict, total=False):
    checkpoint_handoff: Any
    github_repository: Any
    organization_id: Any
    repository_slug: Any
    session_purpose: Any


class AgentRoutine(TypedDict):
    can_manage: bool
    consecutive_errors: int
    credit_wait: dict
    description: str | None
    enabled: bool
    id: str
    kind: str
    last_error: str | None
    last_run_at: str | None
    last_status: str | None
    managed: bool
    name: str
    next_run_at: str | None
    routine: dict
    schedule: dict
    schedule_label: str
    utility_model: dict


class AgentRoutineListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentRoutineListMatch(AgentRoutineListMatchRequired, total=False):
    cursor: str


class AgentRoutineUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentRoutineUpdateData(AgentRoutineUpdateDataRequired, total=False):
    enabled: bool
    utility_model: dict


class AgentRunRequired(TypedDict):
    run_id: str
    status: str


class AgentRun(AgentRunRequired, total=False):
    error: str | None
    id: str


class AgentRunLoadMatchRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentRunLoadMatch(AgentRunLoadMatchRequired, total=False):
    conversation_id: str


class AgentRuntimeRequired(TypedDict):
    can_manage: bool
    image: str
    memory_mb: int | None
    profile: str
    state: str
    version: str
    volume: dict | None


class AgentRuntime(AgentRuntimeRequired, total=False):
    available_profiles: list
    can_reset: bool
    platform: str
    provider: str


class AgentRuntimeCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentRuntimeCreateData(AgentRuntimeCreateDataRequired, total=False):
    acknowledge_data_loss: Any
    expected_version: Any


class AgentSession(TypedDict, total=False):
    id: str


class AgentSessionLoadMatchRequired(TypedDict):
    id: str


class AgentSessionLoadMatch(AgentSessionLoadMatchRequired, total=False):
    around_event: int
    checkpoint: str
    cursor: str
    event_digest: str
    include_tool: bool
    limit: int
    max_byte: int
    source_ref: str


class AgentSessionCheckpoint(TypedDict, total=False):
    id: str


class AgentSessionCheckpointLoadMatchRequired(TypedDict):
    agent_session_id: str
    organization_id: str
    repo_id: str


class AgentSessionCheckpointLoadMatch(AgentSessionCheckpointLoadMatchRequired, total=False):
    id: str


class AgentSessionCheckpointCreateData(TypedDict):
    agent_session_id: str
    organization_id: str
    repo_id: str


class AgentSessionRoderHandoff(TypedDict, total=False):
    checkpoint_id: str
    purpose: str


class AgentSessionRoderHandoffCreateDataRequired(TypedDict):
    agent_session_id: str
    organization_id: str
    repo_id: str


class AgentSessionRoderHandoffCreateData(AgentSessionRoderHandoffCreateDataRequired, total=False):
    checkpoint_id: str
    purpose: str


class AgentSetting(TypedDict):
    can_manage: bool
    expected_version: str
    instructions: str
    version: str


class AgentSettingLoadMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentSettingUpdateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSettingUpdateData(AgentSettingUpdateDataRequired, total=False):
    expected_version: str
    instructions: str


class AgentSharing(TypedDict):
    pass


class AgentSharingLoadMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentSite(TypedDict):
    author: dict
    can_message: bool
    deployments_count: int
    description: str | None
    icon_url: str | None
    id: str
    name: str
    owner: dict
    thread: Any
    title: str
    url: str
    visibility: str


class AgentSiteLoadMatch(TypedDict):
    id: str
    organization_id: str


class AgentSiteListMatchRequired(TypedDict):
    organization_id: str


class AgentSiteListMatch(AgentSiteListMatchRequired, total=False):
    cursor: str


class AgentSiteCreateDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentSiteCreateData(AgentSiteCreateDataRequired, total=False):
    surface: Any
    view: Any


class AgentSkillRequired(TypedDict):
    agents: list
    audience: dict
    can_manage_library: bool
    content: str
    files: list
    pending: bool
    revision: str
    skill: dict
    skills: list


class AgentSkill(AgentSkillRequired, total=False):
    id: str
    marketplace: str
    plugin: str
    source: str


class AgentSkillLoadMatchRequired(TypedDict):
    organization_id: str


class AgentSkillLoadMatch(AgentSkillLoadMatchRequired, total=False):
    id: str


class AgentSkillCreateDataRequired(TypedDict):
    organization_id: str
    audience: dict
    revision: str
    skills: list


class AgentSkillCreateData(AgentSkillCreateDataRequired, total=False):
    marketplace: str
    plugin: str
    source: str


class AgentSkillUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class AgentSkillUpdateData(AgentSkillUpdateDataRequired, total=False):
    agent_ids: Any
    mode: Any
    new_agents: Any


class AgentSkillRemoveMatch(TypedDict):
    id: str
    organization_id: str


class AgentSlack(TypedDict):
    pass


class AgentSlackCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSlackCreateData(AgentSlackCreateDataRequired, total=False):
    action: Any
    bot_token: Any
    callback: Any
    confirm_before_sending: Any
    expected_version: Any
    mode: Any
    show_sent_using: Any
    signing_secret: Any


class AgentSubagent(TypedDict):
    active: bool
    attention: dict | None
    ended_at: str | None
    id: str
    model: str | None
    parent_id: str
    preview: str | None
    started_at: str | None
    state: str | None
    status: str
    title: str
    updated_at: str | None


class AgentSubagentListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSubagentListMatch(AgentSubagentListMatchRequired, total=False):
    conversation_id: str
    cursor: str


class AgentSubscription(TypedDict):
    pass


class AgentSubscriptionLoadMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSubscriptionLoadMatch(AgentSubscriptionLoadMatchRequired, total=False):
    refresh_provider: str


class AgentSubscriptionCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSubscriptionCreateData(AgentSubscriptionCreateDataRequired, total=False):
    action_name: Any
    label: Any
    login_id: Any
    method: Any
    model: Any
    profile_id: Any
    provider: Any
    reasoning: Any
    step_id: Any
    token: Any
    value: Any
    version: Any


class AgentSwarmRequired(TypedDict):
    base_bookmark: str | None
    base_ref: str | None
    base_revision: str | None
    budget: dict
    canceled_at: str | None
    canceled_count: int
    concurrency_key: str | None
    created_at: str
    created_at_label: str | None
    creator_user_id: str | None
    deadline_at: str | None
    display_id: int
    done_count: int
    environment: dict
    failed_count: int
    finished_at: str | None
    finished_at_label: str | None
    github: dict
    goal: str | None
    id: str
    model: str | None
    model_provider: str | None
    number: int
    organization_id: str
    organization_slug: str | None
    outcome: str | None
    phase: str | None
    policy: dict
    queued_at: str | None
    queued_at_label: str | None
    repository_id: str | None
    repository_slug: str | None
    reserved: dict
    scheduler_generation: int
    skipped_count: int
    slug: str
    started_at: str | None
    started_at_label: str | None
    status: str
    summary: dict
    target: dict
    task_count: int
    task_template_json: str | None
    tasks: list
    updated_at: str
    updated_at_label: str | None
    usage: dict


class AgentSwarm(AgentSwarmRequired, total=False):
    repository: str


class AgentSwarmLoadMatch(TypedDict):
    id: str


class AgentSwarmListMatchRequired(TypedDict):
    org: str


class AgentSwarmListMatch(AgentSwarmListMatchRequired, total=False):
    page: int
    per_page: int


class AgentSwarmCreateDataRequired(TypedDict):
    organization_slug: str | None
    target: dict


class AgentSwarmCreateData(AgentSwarmCreateDataRequired, total=False):
    base_bookmark: str | None
    base_ref: str | None
    base_revision: str | None
    budget: dict
    concurrency_key: str | None
    environment: dict
    goal: str | None
    model: str | None
    model_provider: str | None
    policy: dict
    queued_at: str | None
    repository: str
    slug: str
    task_template_json: str | None
    tasks: list


class AgentSwarmUpdateDataRequired(TypedDict):
    id: str


class AgentSwarmUpdateData(AgentSwarmUpdateDataRequired, total=False):
    policy: dict


class AgentTeammateRequired(TypedDict):
    avatar: str | None
    id: str
    name: str
    slug: str


class AgentTeammate(AgentTeammateRequired, total=False):
    persona: Any


class AgentTeammateListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentTeammateListMatch(AgentTeammateListMatchRequired, total=False):
    q: str


class AgentTerminal(TypedDict):
    pass


class AgentTerminalCreateData(TypedDict):
    agent_id: str
    organization_id: str


class AgentThread(TypedDict, total=False):
    id: str


class AgentThreadLoadMatch(TypedDict):
    id: str


class AgentThreadCreateData(TypedDict):
    pass


class AgentToolRequired(TypedDict):
    inputSchema: dict
    name: str


class AgentTool(AgentToolRequired, total=False):
    description: str


class AgentToolListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentUsage(TypedDict):
    days: list
    ended_at: str
    pricing_version: str
    source: str
    started_at: str
    user_days: list
    users: list
    window: str


class AgentUsageLoadMatchRequired(TypedDict):
    organization_id: str


class AgentUsageLoadMatch(AgentUsageLoadMatchRequired, total=False):
    window: str


class AgentVerifyProject(TypedDict):
    available: bool
    can_manage: bool
    expected_version: int
    id: str
    name: str
    project_choices: list
    project_choices_truncated: bool
    slug: str
    verify_projects: list
    version: int


class AgentVerifyProjectListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentVerifyProjectUpdateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentVerifyProjectUpdateData(AgentVerifyProjectUpdateDataRequired, total=False):
    expected_version: int
    verify_projects: list


class AgentWait(TypedDict, total=False):
    id: str


class AgentWaitCreateData(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWebPreview(TypedDict):
    description: str | None
    icon_url: str | None
    image_url: str | None
    title: str | None


class AgentWebPreviewLoadMatchRequired(TypedDict):
    token: str


class AgentWebPreviewLoadMatch(AgentWebPreviewLoadMatchRequired, total=False):
    asset: str


class AgentWebhookRequired(TypedDict):
    action: str
    connection: dict
    deliveries: list
    event_types: list
    expected_generation: int
    max_events_per_day: int
    name: str
    purpose: str
    signing_key: str | None


class AgentWebhook(AgentWebhookRequired, total=False):
    id: str


class AgentWebhookLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWebhookCreateData(TypedDict):
    agent_id: str
    organization_id: str
    event_types: list
    max_events_per_day: int
    name: str
    purpose: str


class AgentWebhookUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWebhookUpdateData(AgentWebhookUpdateDataRequired, total=False):
    action: str
    expected_generation: int


class AgentWork(TypedDict, total=False):
    id: str


class AgentWorkCreateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkCreateData(AgentWorkCreateDataRequired, total=False):
    revision: Any


class AgentWorkflow(TypedDict):
    can_manage: bool
    expected_digest: str
    path: str
    source: str
    template: str
    templates: list
    truncated: bool
    workflows: list


class AgentWorkflowLoadMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentWorkflowLoadMatch(AgentWorkflowLoadMatchRequired, total=False):
    view: str
    workflow_path: str


class AgentWorkflowCreateData(TypedDict):
    agent_id: str
    organization_id: str
    path: str
    template: str


class AgentWorkflowUpdateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentWorkflowUpdateData(AgentWorkflowUpdateDataRequired, total=False):
    expected_digest: str
    path: str
    source: str


class AgentWorkflowProposalRequired(TypedDict):
    agent_steps: dict
    base_digest: str | None
    can_manage: bool
    can_revise: bool
    can_save: bool
    can_set_trigger: bool
    created_at: str
    definition: dict | None
    digest: str
    error: str | None
    id: str
    name: str
    path: str
    pipeline_checkpoints: dict
    pipeline_commands: dict
    runs_on_earlier_version: int | None
    saved: dict | None
    stale: bool
    starts: dict | None
    trigger_error: str | None


class AgentWorkflowProposal(AgentWorkflowProposalRequired, total=False):
    model_choices: list
    native_rows: list
    reasoning_choices: list


class AgentWorkflowProposalLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkflowProposalCreateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str
    digest: str


class AgentWorkflowProposalCreateData(AgentWorkflowProposalCreateDataRequired, total=False):
    model: Any
    reasoning: Any


class AgentWorkflowRun(TypedDict):
    action: str
    automation: dict | None
    budget_seconds: int | None
    budget_usd: float | None
    can_answer: bool
    can_approve: bool
    can_dismiss: bool
    checkpoint: dict | None
    conversation_id: str | None
    decision_history: dict
    error: str | None
    finished_at: str | None
    flow_steps: list | None
    id: str
    needs_you: bool
    note: str | None
    nothing_to_do_reason: str | None
    resume_count: int
    retry_step_id: str | None
    running_seconds: int
    source: str
    spent_tokens: int
    spent_usd: float
    stalled: bool
    started_at: str
    started_by: dict | None
    status: str
    step_count: int
    steps: list
    trigger_id: str | None
    wake_at: str | None
    workflow_digest: str | None
    workflow_path: str | None


class AgentWorkflowRunLoadMatchRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkflowRunLoadMatch(AgentWorkflowRunLoadMatchRequired, total=False):
    decision_cursor: str


class AgentWorkflowRunListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentWorkflowRunListMatch(AgentWorkflowRunListMatchRequired, total=False):
    automation_key: str
    cursor: str
    limit: int
    view: str
    workflow_path: str


class AgentWorkflowRunCreateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str
    checkpoint: dict | None
    resume_count: int


class AgentWorkflowRunCreateData(AgentWorkflowRunCreateDataRequired, total=False):
    answer: Any
    approved: Any
    question_at: Any


class AgentWorkflowTrigger(TypedDict):
    budget: dict | None
    can_manage: bool
    can_pause: bool
    can_resume: bool
    can_review: bool
    daily_limit: int | None
    day_resets_at: str | None
    id: str
    kind: str
    next_due_at: str | None
    pause_cause: str | None
    paused: bool
    read_at: str | None
    run_budget_usd: float | None
    schedule: dict | None
    settings_changed_at: str | None
    skipped_today: int
    stale_at: str | None
    stale_reason: str | None
    starts: dict | None
    subscription_id: str | None
    time_zone: str
    today_count: int | None
    trigger: dict
    workflow_path: str


class AgentWorkflowTriggerLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkflowTriggerListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentWorkflowTriggerUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkflowTriggerUpdateData(AgentWorkflowTriggerUpdateDataRequired, total=False):
    daily_limit: int | None
    read_at: str | None
    run_budget_usd: float | None


class AgentWorkflowTriggerRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkspace(TypedDict):
    action: str
    can_delete: bool
    can_keep: bool
    cleanup_after: str | None
    created_at: str
    id: str
    name: str
    reason: str
    state: str


class AgentWorkspaceListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentWorkspaceListMatch(AgentWorkspaceListMatchRequired, total=False):
    cursor: str


class AgentWorkspaceUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentWorkspaceUpdateData(AgentWorkspaceUpdateDataRequired, total=False):
    action: str


class AgentWritePermission(TypedDict):
    account: str
    granted_at: str
    granted_by: str | None
    id: str
    in_effect: bool
    last_used_at: str | None
    tool: str


class AgentWritePermissionListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentWritePermissionRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class Agreement(TypedDict):
    body: str | None
    effective_on_label: str
    key: str
    summary: str
    title: str
    version: str


class AgreementListMatch(TypedDict):
    organization_id: str


class AgreementAccessRequest(TypedDict):
    pass


class AgreementAccessRequestCreateData(TypedDict):
    organization_id: str


class AlertRuleEvent(TypedDict, total=False):
    id: str


class AlertRuleEventLoadMatchRequired(TypedDict):
    alert_rule_id: str
    space_id: str


class AlertRuleEventLoadMatch(AlertRuleEventLoadMatchRequired, total=False):
    id: str


class AlertRuleEventCreateData(TypedDict):
    alert_rule_id: str
    space_id: str


class AlertRuleEventRemoveMatch(TypedDict):
    alert_rule_id: str
    id: str
    space_id: str


class AllocationLogRequired(TypedDict):
    allocation_id: str
    fetched_at: str
    logs: str
    namespace: str
    offset: int
    origin: str
    task: str
    type: str


class AllocationLog(AllocationLogRequired, total=False):
    environment: str
    location: str | None
    service: str


class AllocationLogLoadMatchRequired(TypedDict):
    allocation_id: str
    app_id: str


class AllocationLogLoadMatch(AllocationLogLoadMatchRequired, total=False):
    offset: int
    origin: str
    task: str
    type: str


class App(TypedDict):
    created_at: str
    created_at_label: str | None
    description: str | None
    framework: str | None
    id: str
    name: str
    organization_id: str
    repository_id: str
    repository_kind: str | None
    root_path: str
    root_path_display: str
    slug: str
    status: str
    updated_at: str
    updated_at_label: str | None


class AppLoadMatch(TypedDict):
    id: str


class AppListMatch(TypedDict, total=False):
    organization_id: str


class AppCreateDataRequired(TypedDict):
    name: str
    organization_id: str
    repository_id: str
    root_path: str
    slug: str


class AppCreateData(AppCreateDataRequired, total=False):
    description: str | None
    framework: str | None
    status: str


class AppUpdateDataRequired(TypedDict):
    id: str


class AppUpdateData(AppUpdateDataRequired, total=False):
    description: str | None
    framework: str | None
    name: str
    organization_id: str
    repository_id: str
    root_path: str
    slug: str
    status: str


class AppPatchDataRequired(TypedDict):
    id: str


class AppPatchData(AppPatchDataRequired, total=False):
    description: str | None
    framework: str | None
    name: str
    organization_id: str
    repository_id: str
    root_path: str
    slug: str
    status: str


class AppRemoveMatch(TypedDict):
    id: str


class AppAccess(TypedDict):
    pass


class AppAccessLoadMatch(TypedDict):
    pass


class AppAccessJwk(TypedDict):
    pass


class AppAccessJwkLoadMatch(TypedDict):
    pass


class AppCdnRequired(TypedDict):
    app_environment_id: str | None
    app_service_id: str | None
    cache_settings_json: str | None
    created_at: str
    created_at_label: str | None
    distribution_kind: str
    edge_hostname: str | None
    failure_message: str | None
    hosted_app_id: str
    hostnames: list
    id: str
    last_deployed_at: str | None
    last_deployed_at_label: str | None
    last_purged_at: str | None
    last_purged_at_label: str | None
    last_synced_at: str | None
    last_synced_at_label: str | None
    name: str
    origin_url: str
    provisioned: bool
    routing_settings_json: str | None
    security_settings_json: str | None
    slug: str
    status: str
    updated_at: str
    updated_at_label: str | None


class AppCdn(AppCdnRequired, total=False):
    cache_path_prefix: str | None


class AppCdnLoadMatchRequired(TypedDict):
    app_id: str


class AppCdnLoadMatch(AppCdnLoadMatchRequired, total=False):
    id: str


class AppCdnCreateDataRequired(TypedDict):
    app_id: str
    name: str
    origin_url: str
    slug: str


class AppCdnCreateData(AppCdnCreateDataRequired, total=False):
    app_environment_id: str | None
    app_service_id: str | None
    cache_path_prefix: str | None
    cache_settings_json: str | None
    distribution_kind: str
    routing_settings_json: str | None
    security_settings_json: str | None
    status: str


class AppCdnUpdateDataRequired(TypedDict):
    app_id: str
    id: str


class AppCdnUpdateData(AppCdnUpdateDataRequired, total=False):
    app_environment_id: str | None
    app_service_id: str | None
    cache_path_prefix: str | None
    cache_settings_json: str | None
    distribution_kind: str
    name: str
    origin_url: str
    routing_settings_json: str | None
    security_settings_json: str | None
    slug: str
    status: str


class AppCdnPatchDataRequired(TypedDict):
    app_id: str
    id: str


class AppCdnPatchData(AppCdnPatchDataRequired, total=False):
    app_environment_id: str | None
    app_service_id: str | None
    cache_path_prefix: str | None
    cache_settings_json: str | None
    distribution_kind: str
    name: str
    origin_url: str
    routing_settings_json: str | None
    security_settings_json: str | None
    slug: str
    status: str


class AppCdnRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppConfigVariable(TypedDict):
    app_environment_id: str | None
    app_service_id: str | None
    created_at: str
    description: str | None
    exposed_to_build: bool
    has_value: bool
    hosted_app_id: str
    id: str
    key: str
    scope_kind: str
    updated_at: str
    value: str | None
    value_kind: str


class AppConfigVariableLoadMatchRequired(TypedDict):
    app_id: str


class AppConfigVariableLoadMatch(AppConfigVariableLoadMatchRequired, total=False):
    id: str
    app_environment_id: str


class AppConfigVariableCreateDataRequired(TypedDict):
    app_id: str
    exposed_to_build: bool
    key: str
    scope_kind: str
    value_kind: str


class AppConfigVariableCreateData(AppConfigVariableCreateDataRequired, total=False):
    app_environment_id: str | None
    app_service_id: str | None
    description: str | None
    value: str | None


class AppConfigVariableUpdateData(TypedDict):
    app_id: str
    id: str


class AppConfigVariablePatchData(TypedDict):
    app_id: str
    id: str


class AppConfigVariableRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppDataResource(TypedDict):
    app_environment_id: str | None
    created_at: str
    engine: str
    failure_message: str | None
    high_availability: bool
    hosted_app_id: str
    id: str
    kind: str
    name: str
    plan: str | None
    provider_metadata: dict
    region: str | None
    slug: str
    status: str
    storage_gb: int | None
    storage_label: str | None
    updated_at: str
    version: str | None


class AppDataResourceLoadMatchRequired(TypedDict):
    app_id: str


class AppDataResourceLoadMatch(AppDataResourceLoadMatchRequired, total=False):
    id: str


class AppDataResourceCreateDataRequired(TypedDict):
    app_id: str
    engine: str
    kind: str
    name: str
    slug: str


class AppDataResourceCreateData(AppDataResourceCreateDataRequired, total=False):
    app_environment_id: str | None
    high_availability: bool
    plan: str | None
    region: str | None
    storage_gb: int | None
    version: str | None


class AppDataResourceUpdateData(TypedDict):
    app_id: str
    id: str


class AppDataResourcePatchData(TypedDict):
    app_id: str
    id: str


class AppDataResourceRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppDeployRequired(TypedDict):
    image: str


class AppDeploy(AppDeployRequired, total=False):
    app_environment_id: str
    app_service_id: str
    channel: str
    command: str
    commit_sha: str
    desired_instances: int
    environment: str
    region: str
    rollout_predecessor: str
    service: str
    source_ref: str


class AppDeployCreateDataRequired(TypedDict):
    app_id: str
    image: str


class AppDeployCreateData(AppDeployCreateDataRequired, total=False):
    app_environment_id: str
    app_service_id: str
    channel: str
    command: str
    commit_sha: str
    desired_instances: int
    environment: str
    region: str
    rollout_predecessor: str
    service: str
    source_ref: str


class AppDeploymentRequired(TypedDict):
    app_environment_id: str
    app_service_id: str
    artifact_locator: str | None
    build_role: str | None
    commit_sha: str | None
    created_at: str
    created_at_label: str | None
    creator_user_id: str | None
    deployed_url: str | None
    display_id: int
    failure_message: str | None
    finished_at: str | None
    finished_at_label: str | None
    hosted_app_id: str
    id: str
    idempotency_key: str | None
    is_rollback: bool
    location: Any
    location_id: str
    number: int
    operation_key: str | None
    organization_id: str
    rollback_reason: str | None
    rollback_source_deployment_id: str | None
    rollback_source_release_id: str | None
    rollback_target_release_id: str | None
    source_ref: str | None
    started_at: str | None
    started_at_label: str | None
    status: str
    trigger_kind: str
    updated_at: str
    updated_at_label: str | None


class AppDeployment(AppDeploymentRequired, total=False):
    app_service_placement_id: str


class AppDeploymentLoadMatchRequired(TypedDict):
    app_id: str


class AppDeploymentLoadMatch(AppDeploymentLoadMatchRequired, total=False):
    id: str


class AppDeploymentCreateDataRequired(TypedDict):
    app_id: str


class AppDeploymentCreateData(AppDeploymentCreateDataRequired, total=False):
    app_environment_id: str
    app_service_id: str
    app_service_placement_id: str
    artifact_locator: str | None
    commit_sha: str | None
    deployed_url: str | None
    failure_message: str | None
    finished_at: str | None
    location_id: str
    source_ref: str | None
    started_at: str | None
    status: str
    trigger_kind: str


class AppDeploymentUpdateData(TypedDict):
    app_id: str
    id: str


class AppDeploymentPatchData(TypedDict):
    app_id: str
    id: str


class AppDeploymentRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppDeploymentOperationRequired(TypedDict):
    app: dict
    artifact_locator: str | None
    build_duration_seconds: int | None
    build_source: dict | None
    build_status: str
    children: list
    ci_pipeline_id: str | None
    ci_pipeline_run_id: str | None
    commit_sha: str | None
    created_at: str
    creator: dict | None
    deployed_url: str | None
    duration_seconds: int | None
    environment: dict
    history_kind: str
    history_reason: str | None
    id: str
    is_live: bool
    is_rollback: bool
    live_region_count: int
    number: int
    placement: dict | None
    region_count: int
    replicas_per_region: int
    rollback_reason: str | None
    rollback_source_release_id: str | None
    rollback_target_release_id: str | None
    rollout_predecessor_id: str | None
    rollout_status: str
    rollout_strategy: str
    service: dict
    source_ref: str | None
    status: str
    total_replicas: int
    trigger_kind: str
    updated_at: str


class AppDeploymentOperation(AppDeploymentOperationRequired, total=False):
    app_environment_id: str
    app_service_id: str
    app_service_placement_id: str
    failure_message: str
    finished_at: str
    location_id: str
    started_at: str


class AppDeploymentOperationLoadMatch(TypedDict):
    app_id: str
    id: str


class AppDeploymentOperationListMatchRequired(TypedDict):
    app_id: str


class AppDeploymentOperationListMatch(AppDeploymentOperationListMatchRequired, total=False):
    limit: int
    page: int


class AppDeploymentOperationCreateDataRequired(TypedDict):
    app_id: str


class AppDeploymentOperationCreateData(AppDeploymentOperationCreateDataRequired, total=False):
    app_environment_id: str
    app_service_id: str
    app_service_placement_id: str
    artifact_locator: str | None
    commit_sha: str | None
    deployed_url: str | None
    failure_message: str
    finished_at: str
    location_id: str
    source_ref: str | None
    started_at: str
    status: str
    trigger_kind: str


class AppDeploymentRollbackRequired(TypedDict):
    app_id: str
    blockers: list
    candidate_releases: list
    confirmation_text: str
    current_deployment: Any
    current_release: Any
    deployment: Any
    desired_state: Any
    environment: Any
    execution_allowed: bool
    force: bool
    idempotent_reuse: bool
    location: Any
    operation: Any
    reason: str | None
    rollback_release: Any
    rollout: Any
    service: Any
    target_artifact_locator: str | None
    target_release: Any
    warnings: list


class AppDeploymentRollback(AppDeploymentRollbackRequired, total=False):
    app_environment_id: str
    app_service_id: str
    idempotency_key: str
    to: str


class AppDeploymentRollbackCreateDataRequired(TypedDict):
    app_id: str


class AppDeploymentRollbackCreateData(AppDeploymentRollbackCreateDataRequired, total=False):
    app_environment_id: str
    app_service_id: str
    deployment: Any
    environment: Any
    force: bool
    idempotency_key: str
    reason: str | None
    service: Any
    to: str


class AppEnvironment(TypedDict):
    auto_deploy: bool
    base_domain: str | None
    branch_pattern: str | None
    created_at: str
    created_at_label: str | None
    hosted_app_id: str
    id: str
    kind: str
    location: Any
    location_id: str
    name: str
    slug: str
    status: str
    updated_at: str
    updated_at_label: str | None


class AppEnvironmentLoadMatchRequired(TypedDict):
    app_id: str


class AppEnvironmentLoadMatch(AppEnvironmentLoadMatchRequired, total=False):
    id: str


class AppEnvironmentCreateDataRequired(TypedDict):
    app_id: str
    auto_deploy: bool
    kind: str
    location_id: str
    name: str
    slug: str
    status: str


class AppEnvironmentCreateData(AppEnvironmentCreateDataRequired, total=False):
    base_domain: str | None
    branch_pattern: str | None


class AppEnvironmentUpdateDataRequired(TypedDict):
    app_id: str
    id: str


class AppEnvironmentUpdateData(AppEnvironmentUpdateDataRequired, total=False):
    auto_deploy: bool
    base_domain: str | None
    branch_pattern: str | None
    kind: str
    location_id: str
    name: str
    slug: str
    status: str


class AppEnvironmentPatchDataRequired(TypedDict):
    app_id: str
    id: str


class AppEnvironmentPatchData(AppEnvironmentPatchDataRequired, total=False):
    auto_deploy: bool
    base_domain: str | None
    branch_pattern: str | None
    kind: str
    location_id: str
    name: str
    slug: str
    status: str


class AppEnvironmentRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppLocation(TypedDict):
    code: str
    created_at: str
    id: str
    location_id: str
    name: str
    nomad_datacenter: str
    updated_at: str


class AppLocationListMatch(TypedDict):
    app_id: str


class AppLocationCreateData(TypedDict):
    app_id: str
    location_id: str


class AppLocationRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppMetric(TypedDict):
    pass


class AppMetricLoadMatch(TypedDict):
    app_id: str


class AppPreviewRequired(TypedDict):
    app_preview_profile_id: str
    name: str
    slug: str


class AppPreview(AppPreviewRequired, total=False):
    access: str
    change_number: str
    expected_generation: int
    expected_patchset: int
    expires_at: str
    id: str
    resource_overrides: dict
    retained: bool
    shared_data_binding_ids: list
    shared_service_binding_ids: list
    source_ref: str
    storage_binding_resources: dict


class AppPreviewLoadMatchRequired(TypedDict):
    app_id: str


class AppPreviewLoadMatch(AppPreviewLoadMatchRequired, total=False):
    id: str


class AppPreviewCreateDataRequired(TypedDict):
    app_id: str
    app_preview_profile_id: str
    name: str
    slug: str


class AppPreviewCreateData(AppPreviewCreateDataRequired, total=False):
    change_number: str
    expected_patchset: int
    source_ref: str


class AppPreviewUpdateData(TypedDict):
    app_id: str
    id: str


class AppPreviewPatchDataRequired(TypedDict):
    app_id: str
    id: str


class AppPreviewPatchData(AppPreviewPatchDataRequired, total=False):
    access: str
    expected_generation: int
    expires_at: str
    resource_overrides: dict
    retained: bool
    shared_data_binding_ids: list
    shared_service_binding_ids: list
    storage_binding_resources: dict


class AppPreviewRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppPreviewProfileRequired(TypedDict):
    hosted_app_id: str
    id: str
    name: str
    slug: str
    source_environment_id: str


class AppPreviewProfile(AppPreviewProfileRequired, total=False):
    automatic: bool
    configuration: dict
    created_at: str
    ttl_days: int
    updated_at: str


class AppPreviewProfileLoadMatchRequired(TypedDict):
    app_id: str


class AppPreviewProfileLoadMatch(AppPreviewProfileLoadMatchRequired, total=False):
    id: str


class AppPreviewProfileCreateDataRequired(TypedDict):
    app_id: str
    name: str
    slug: str
    source_environment_id: str


class AppPreviewProfileCreateData(AppPreviewProfileCreateDataRequired, total=False):
    automatic: bool
    configuration: dict
    ttl_days: int


class AppPreviewProfileUpdateData(TypedDict):
    app_id: str
    id: str


class AppPreviewProfilePatchDataRequired(TypedDict):
    app_id: str
    id: str


class AppPreviewProfilePatchData(AppPreviewProfilePatchDataRequired, total=False):
    automatic: bool
    configuration: dict
    name: str
    slug: str
    source_environment_id: str
    ttl_days: int


class AppPreviewProfileRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppRun(TypedDict, total=False):
    id: str
    image: str


class AppRunLoadMatch(TypedDict):
    id: str


class AppRunCreateData(TypedDict, total=False):
    image: str


class AppSecretRequired(TypedDict):
    hosted_app_id: str
    id: str
    name: str
    organization_id: str
    scope_kind: str
    slug: str
    status: str


class AppSecret(AppSecretRequired, total=False):
    created_at: str
    description: str | None
    env_key: str | None
    expose_to_build: bool
    has_value: bool
    latest_version_number: int | None
    rotation_policy: str | None
    updated_at: str
    value: str
    value_digest: str | None
    value_kind: str | None


class AppSecretLoadMatch(TypedDict):
    app_id: str
    id: str


class AppSecretListMatch(TypedDict):
    app_id: str


class AppSecretCreateDataRequired(TypedDict):
    app_id: str
    name: str
    slug: str


class AppSecretCreateData(AppSecretCreateDataRequired, total=False):
    description: str | None
    env_key: str | None
    expose_to_build: bool
    rotation_policy: str | None
    value: str
    value_kind: str | None


class AppSecretUpdateDataRequired(TypedDict):
    app_id: str
    id: str


class AppSecretUpdateData(AppSecretUpdateDataRequired, total=False):
    description: str | None
    env_key: str | None
    expose_to_build: bool
    name: str
    rotation_policy: str | None


class AppSecretPatchDataRequired(TypedDict):
    app_id: str
    id: str


class AppSecretPatchData(AppSecretPatchDataRequired, total=False):
    description: str | None
    env_key: str | None
    expose_to_build: bool
    name: str
    rotation_policy: str | None


class AppSecretRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppService(TypedDict):
    auto_deploy: bool
    bindings: list
    build_command: str | None
    cpu_label: str | None
    cpu_mhz: int | None
    created_at: str
    created_at_label: str | None
    deploy_paths: list
    desired_instances: int
    disk_label: str | None
    disk_mb: int | None
    effective_deploy_paths: list
    healthcheck_path: str | None
    hosted_app_id: str
    id: str
    internal_port: int | None
    kind: str
    memory_label: str | None
    memory_max_label: str | None
    memory_max_mb: int | None
    memory_mb: int | None
    name: str
    nomad_constraints_json: str | None
    nomad_kill_timeout_seconds: int | None
    nomad_namespace: str | None
    nomad_region: str | None
    nomad_shutdown_delay_seconds: int | None
    nomad_ulimits_json: str | None
    nomad_update_strategy_json: str | None
    prestart_command: str | None
    publicly_accessible: bool
    release_command: str | None
    repo_source_path: str
    runtime: str
    runtime_adapter_kind: str
    runtime_adapter_settings_json: str | None
    schedule: str | None
    slug: str
    source_path: str
    start_command: str | None
    updated_at: str
    updated_at_label: str | None


class AppServiceLoadMatchRequired(TypedDict):
    app_id: str


class AppServiceLoadMatch(AppServiceLoadMatchRequired, total=False):
    id: str


class AppServiceCreateDataRequired(TypedDict):
    app_id: str
    auto_deploy: bool
    desired_instances: int
    kind: str
    name: str
    publicly_accessible: bool
    runtime: str
    runtime_adapter_kind: str
    slug: str
    source_path: str
    start_command: str | None


class AppServiceCreateData(AppServiceCreateDataRequired, total=False):
    build_command: str | None
    cpu_mhz: int | None
    deploy_paths: list
    disk_mb: int | None
    healthcheck_path: str | None
    internal_port: int | None
    memory_max_mb: int | None
    memory_mb: int | None
    nomad_constraints_json: str | None
    nomad_kill_timeout_seconds: int | None
    nomad_namespace: str | None
    nomad_region: str | None
    nomad_shutdown_delay_seconds: int | None
    nomad_ulimits_json: str | None
    nomad_update_strategy_json: str | None
    prestart_command: str | None
    release_command: str | None
    runtime_adapter_settings_json: str | None
    schedule: str | None


class AppServiceUpdateDataRequired(TypedDict):
    app_id: str
    id: str


class AppServiceUpdateData(AppServiceUpdateDataRequired, total=False):
    auto_deploy: bool
    build_command: str | None
    cpu_mhz: int | None
    deploy_paths: list
    desired_instances: int
    disk_mb: int | None
    healthcheck_path: str | None
    internal_port: int | None
    kind: str
    memory_max_mb: int | None
    memory_mb: int | None
    name: str
    nomad_constraints_json: str | None
    nomad_kill_timeout_seconds: int | None
    nomad_namespace: str | None
    nomad_region: str | None
    nomad_shutdown_delay_seconds: int | None
    nomad_ulimits_json: str | None
    nomad_update_strategy_json: str | None
    prestart_command: str | None
    publicly_accessible: bool
    release_command: str | None
    runtime: str
    runtime_adapter_kind: str
    runtime_adapter_settings_json: str | None
    schedule: str | None
    slug: str
    source_path: str
    start_command: str | None


class AppServicePatchDataRequired(TypedDict):
    app_id: str
    id: str


class AppServicePatchData(AppServicePatchDataRequired, total=False):
    auto_deploy: bool
    build_command: str | None
    cpu_mhz: int | None
    deploy_paths: list
    desired_instances: int
    disk_mb: int | None
    healthcheck_path: str | None
    internal_port: int | None
    kind: str
    memory_max_mb: int | None
    memory_mb: int | None
    name: str
    nomad_constraints_json: str | None
    nomad_kill_timeout_seconds: int | None
    nomad_namespace: str | None
    nomad_region: str | None
    nomad_shutdown_delay_seconds: int | None
    nomad_ulimits_json: str | None
    nomad_update_strategy_json: str | None
    prestart_command: str | None
    publicly_accessible: bool
    release_command: str | None
    runtime: str
    runtime_adapter_kind: str
    runtime_adapter_settings_json: str | None
    schedule: str | None
    slug: str
    source_path: str
    start_command: str | None


class AppServiceRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppServiceBinding(TypedDict, total=False):
    id: str


class AppServiceBindingLoadMatchRequired(TypedDict):
    app_id: str


class AppServiceBindingLoadMatch(AppServiceBindingLoadMatchRequired, total=False):
    id: str


class AppServiceBindingCreateData(TypedDict):
    app_id: str


class AppServiceBindingUpdateData(TypedDict):
    app_id: str
    id: str


class AppServiceBindingPatchData(TypedDict):
    app_id: str
    id: str


class AppServiceBindingRemoveMatch(TypedDict):
    app_id: str
    id: str


class AppServicePlacement(TypedDict):
    app_environment_id: str
    app_service_id: str
    created_at: str
    deployment_channel: str | None
    hosted_app_id: str
    id: str
    mode: str
    organization_id: str
    region_count: int
    replicas_per_region: int
    rollout_strategy: str
    targets: list
    total_replicas: int
    updated_at: str


class AppServicePlacementLoadMatch(TypedDict):
    app_id: str
    id: str


class AppServicePlacementListMatchRequired(TypedDict):
    app_id: str


class AppServicePlacementListMatch(AppServicePlacementListMatchRequired, total=False):
    existing: bool
    service: str


class AppServicePlacementUpdateDataRequired(TypedDict):
    app_id: str


class AppServicePlacementUpdateData(AppServicePlacementUpdateDataRequired, total=False):
    app_environment_id: str
    app_service_id: str
    deployment_channel: str | None
    mode: str
    replicas_per_region: int
    rollout_strategy: str
    targets: list
    expected_generation: Any


class AppStorageResource(TypedDict):
    access_mode: str
    app_environment_id: str | None
    attachment: dict | None
    capacity_gb: int | None
    capacity_label: str | None
    created_at: str
    ephemeral: bool
    external_volume_id: str | None
    hosted_app_id: str
    id: str
    kind: str
    location_code: str | None
    location_id: str | None
    mount_path: str | None
    name: str
    provider: str
    provider_error: str | None
    region: str | None
    slug: str
    status: str
    updated_at: str


class AppStorageResourceLoadMatchRequired(TypedDict):
    app_id: str


class AppStorageResourceLoadMatch(AppStorageResourceLoadMatchRequired, total=False):
    id: str


class AppStorageResourceCreateDataRequired(TypedDict):
    app_id: str
    access_mode: str
    kind: str
    name: str
    provider: str
    slug: str
    status: str


class AppStorageResourceCreateData(AppStorageResourceCreateDataRequired, total=False):
    app_environment_id: str | None
    capacity_gb: int | None
    location_id: str | None
    mount_path: str | None
    region: str | None


class AppStorageResourceUpdateData(TypedDict):
    app_id: str
    id: str


class AppStorageResourcePatchData(TypedDict):
    app_id: str
    id: str


class AppStorageResourceRemoveMatch(TypedDict):
    app_id: str
    id: str


class ArtefactRequired(TypedDict):
    byte_size: int
    checksum_sha256: str
    content_type: str
    filename: str
    id: str
    kind: str
    organization_id: str
    slug: str
    source: str
    status: str
    title: str
    version: int
    view_url: str
    web_url: str


class Artefact(ArtefactRequired, total=False):
    automation_invocation_id: str | None
    created_at: str | None
    created_by_user_id: str | None
    description: str | None
    document_key: str
    entrypoint: str
    expires_at: str | None
    files: list
    harness: str | None
    harness_version: str | None
    model: str | None
    published_at: str | None
    repository_id: str | None
    vcs_agent_checkpoint_id: str | None
    vcs_agent_session_id: str | None


class ArtefactLoadMatch(TypedDict):
    id: str
    organization_id: str


class ArtefactListMatchRequired(TypedDict):
    organization_id: str


class ArtefactListMatch(ArtefactListMatchRequired, total=False):
    author: str
    created_by_agent: str
    cursor: str
    editable: str
    harness: str
    kind: str
    limit: int
    model: str
    q: str
    repo: str
    slug: str
    source: str


class ArtefactCreateData(TypedDict):
    organization_id: str


class ArtefactUpdateData(TypedDict):
    id: str
    organization_id: str


class ArtefactPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class ArtefactPatchData(ArtefactPatchDataRequired, total=False):
    description: str | None
    kind: str
    title: str


class ArtefactRemoveMatch(TypedDict):
    id: str
    organization_id: str


class ArtefactCommentThreadRequired(TypedDict):
    anchor: str
    body: str
    comments: list
    id: str
    resolved: bool


class ArtefactCommentThread(ArtefactCommentThreadRequired, total=False):
    quote: str


class ArtefactCommentThreadListMatch(TypedDict):
    artefact_id: str
    organization_id: str


class ArtefactCommentThreadCreateDataRequired(TypedDict):
    artefact_id: str
    organization_id: str
    anchor: str
    body: str


class ArtefactCommentThreadCreateData(ArtefactCommentThreadCreateDataRequired, total=False):
    quote: str


class ArtefactCommentThreadUpdateDataRequired(TypedDict):
    artefact_id: str
    id: str
    organization_id: str


class ArtefactCommentThreadUpdateData(ArtefactCommentThreadUpdateDataRequired, total=False):
    resolved: bool


class ArtefactRevision(TypedDict):
    base_version: int
    content: str


class ArtefactRevisionCreateData(TypedDict):
    artefact_id: str
    organization_id: str
    base_version: int
    content: str


class ArtefactViewTokenRequired(TypedDict):
    expires_in: int
    viewer_url: str


class ArtefactViewToken(ArtefactViewTokenRequired, total=False):
    file: str
    organization_slug: str
    version: int


class ArtefactViewTokenCreateDataRequired(TypedDict):
    artefact_id: str
    organization_id: str


class ArtefactViewTokenCreateData(ArtefactViewTokenCreateDataRequired, total=False):
    file: str
    organization_slug: str
    version: int


class Artifact(TypedDict, total=False):
    id: str


class ArtifactLoadMatch(TypedDict):
    id: str


class ArtifactCreateData(TypedDict):
    pass


class ArtifactUpdateData(TypedDict):
    id: str


class ArtifactPatchData(TypedDict):
    id: str


class ArtifactRemoveMatch(TypedDict):
    id: str


class ArtifactCacheNamespace(TypedDict, total=False):
    id: str


class ArtifactCacheNamespaceLoadMatch(TypedDict):
    id: str


class ArtifactCacheNamespaceCreateData(TypedDict):
    pass


class ArtifactCacheNamespaceUpdateData(TypedDict):
    id: str


class ArtifactCacheNamespacePatchData(TypedDict):
    id: str


class ArtifactCacheNamespaceRemoveMatch(TypedDict):
    id: str


class ArtifactImageRepository(TypedDict, total=False):
    id: str


class ArtifactImageRepositoryLoadMatch(TypedDict):
    id: str


class ArtifactImageRepositoryCreateData(TypedDict):
    pass


class ArtifactImageRepositoryUpdateData(TypedDict):
    id: str


class ArtifactImageRepositoryPatchData(TypedDict):
    id: str


class ArtifactImageRepositoryRemoveMatch(TypedDict):
    id: str


class ArtifactPackageMirror(TypedDict, total=False):
    id: str


class ArtifactPackageMirrorLoadMatch(TypedDict):
    id: str


class ArtifactPackageMirrorCreateData(TypedDict):
    pass


class ArtifactPackageMirrorUpdateData(TypedDict):
    id: str


class ArtifactPackageMirrorPatchData(TypedDict):
    id: str


class ArtifactPackageMirrorRemoveMatch(TypedDict):
    id: str


class ArtifactRetentionPolicy(TypedDict, total=False):
    id: str


class ArtifactRetentionPolicyLoadMatch(TypedDict):
    id: str


class ArtifactRetentionPolicyCreateData(TypedDict):
    pass


class ArtifactRetentionPolicyUpdateData(TypedDict):
    id: str


class ArtifactRetentionPolicyPatchData(TypedDict):
    id: str


class ArtifactRetentionPolicyRemoveMatch(TypedDict):
    id: str


class AttachmentPart(TypedDict, total=False):
    id: str


class AttachmentPartUpdateData(TypedDict):
    agent_id: str
    attachment_id: str
    id: str
    organization_id: str


class AuditEvent(TypedDict):
    action: str
    actor_kind: str
    actor_user_id: str | None
    created_at: str
    created_at_label: str | None
    id: str
    observability_space_id: str | None
    organization_id: str
    payload: Any
    request_id: str | None
    severity: str
    subject_id: str
    subject_kind: str
    subject_name: str | None
    updated_at: str
    updated_at_label: str | None


class AuditEventListMatch(TypedDict):
    organization_id: str


class Auth(TypedDict):
    pass


class AuthLoadMatch(TypedDict):
    pass


class AuthCreateData(TypedDict, total=False):
    cli_login_id: Any
    code: Any
    email: Any
    invite_code: Any
    login_id: Any
    name: Any
    organization_invitation_token: Any
    password: Any
    polling_token: Any
    redirect_uri: Any
    state: Any
    turnstile_token: Any


class AuthRemoveMatch(TypedDict):
    pass


class AuthCli(TypedDict):
    pass


class AuthCliCreateData(TypedDict, total=False):
    client_kind: Any
    intent: Any
    login_id: Any
    name: Any
    organization_id: Any
    organization_slug: Any


class AuthGithub(TypedDict):
    pass


class AuthGithubLoadMatch(TypedDict):
    redirect_uri: str


class AuthGoogle(TypedDict):
    pass


class AuthGoogleLoadMatch(TypedDict):
    redirect_uri: str


class AuthOpenai(TypedDict):
    pass


class AuthOpenaiLoadMatchRequired(TypedDict):
    state: str


class AuthOpenaiLoadMatch(AuthOpenaiLoadMatchRequired, total=False):
    code: str
    error: str


class AuthPasswordReset(TypedDict):
    email: str
    message: str
    password: str
    token: str


class AuthPasswordResetCreateData(TypedDict):
    email: str


class AuthPasswordResetUpdateData(TypedDict, total=False):
    password: str
    token: str


class AuthRegistrationOptionRequired(TypedDict):
    email_password_signup_enabled: bool
    turnstile_site_key: str | None
    waitlist_enabled: bool


class AuthRegistrationOption(AuthRegistrationOptionRequired, total=False):
    openai_sign_in_enabled: bool


class AuthRegistrationOptionLoadMatch(TypedDict, total=False):
    email_password_signup_enabled: bool
    openai_sign_in_enabled: bool
    turnstile_site_key: str | None
    waitlist_enabled: bool


class AutomationEventRequired(TypedDict):
    action: str
    can_manage: bool
    can_manage_events: bool
    can_run: bool
    can_schedule: bool
    event_subscriptions: list
    event_triggers: list
    expected_revision: str | None
    id: str
    key: str
    name: str
    revision: int
    schedule: Any
    schedules: list
    subscription_key: str
    version: dict


class AutomationEvent(AutomationEventRequired, total=False):
    settings: dict


class AutomationEventUpdateDataRequired(TypedDict):
    agent_id: str
    automation_id: str
    organization_id: str


class AutomationEventUpdateData(AutomationEventUpdateDataRequired, total=False):
    action: str
    expected_revision: str | None
    settings: dict
    subscription_key: str


class AutomationRun(TypedDict):
    action: str
    automation: dict | None
    budget_seconds: int | None
    budget_usd: float | None
    can_answer: bool
    can_approve: bool
    can_dismiss: bool
    checkpoint: dict | None
    conversation_id: str | None
    decision_history: dict
    error: str | None
    finished_at: str | None
    flow_steps: list | None
    id: str
    input: dict
    needs_you: bool
    note: str | None
    nothing_to_do_reason: str | None
    request_id: str
    resume_count: int
    retry_step_id: str | None
    running_seconds: int
    source: str
    spent_tokens: int
    spent_usd: float
    stalled: bool
    started_at: str
    started_by: dict | None
    status: str
    step_count: int
    steps: list
    trigger_id: str | None
    version_id: str
    wake_at: str | None
    workflow_digest: str | None
    workflow_path: str | None


class AutomationRunCreateData(TypedDict):
    agent_id: str
    automation_id: str
    organization_id: str
    input: dict
    request_id: str
    version_id: str


class BackendRunnerPool(TypedDict, total=False):
    id: str


class BackendRunnerPoolLoadMatch(TypedDict):
    backend_id: str


class BackendRunnerPoolCreateData(TypedDict):
    backend_id: str


class BackendRunnerPoolRemoveMatch(TypedDict):
    backend_id: str
    id: str


class Bazel(TypedDict):
    pass


class BazelCreateData(TypedDict):
    pass


class BazelActionResult(TypedDict, total=False):
    id: str


class BazelActionResultLoadMatch(TypedDict):
    action_result_id: str
    id: str


class BazelActionResultUpdateData(TypedDict):
    action_result_id: str
    id: str


class BazelBackend(TypedDict, total=False):
    id: str


class BazelBackendLoadMatch(TypedDict):
    id: str


class BazelBackendCreateData(TypedDict):
    pass


class BazelBackendUpdateData(TypedDict):
    id: str


class BazelBackendPatchData(TypedDict):
    id: str


class BazelBackendRemoveMatch(TypedDict):
    id: str


class BazelBlob(TypedDict, total=False):
    id: str


class BazelBlobLoadMatch(TypedDict):
    blob_id: str
    hash: str
    id: str


class BazelBlobUpdateData(TypedDict):
    blob_id: str
    hash: str
    id: str


class BazelExecution(TypedDict, total=False):
    id: str


class BazelExecutionLoadMatch(TypedDict):
    id: str


class BazelExecutionCreateData(TypedDict):
    pass


class BazelFindMissingBlob(TypedDict):
    pass


class BazelFindMissingBlobCreateData(TypedDict):
    pass


class Billing(TypedDict):
    addons: list
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    customer: Any
    deployment_usage_visible: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class BillingLoadMatch(TypedDict):
    organization_id: str


class BillingAddonRequired(TypedDict):
    addons: list
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    customer: Any
    deployment_usage_visible: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    quantity: int
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class BillingAddon(BillingAddonRequired, total=False):
    id: str


class BillingAddonUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class BillingAddonUpdateData(BillingAddonUpdateDataRequired, total=False):
    quantity: int


class BillingBudgetRequired(TypedDict):
    addons: list
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    customer: Any
    deployment_usage_visible: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class BillingBudget(BillingBudgetRequired, total=False):
    monthly_cap_cents: int | None


class BillingBudgetUpdateDataRequired(TypedDict):
    organization_id: str


class BillingBudgetUpdateData(BillingBudgetUpdateDataRequired, total=False):
    monthly_cap_cents: int | None


class BillingBudgetPatchData(TypedDict):
    organization_id: str


class BillingCheckoutSession(TypedDict, total=False):
    cancel_url: str
    coupon_code: str
    entry_point: str
    package_key: str
    package_revision: int
    success_url: str


class BillingCheckoutSessionCreateDataRequired(TypedDict):
    organization_id: str


class BillingCheckoutSessionCreateData(BillingCheckoutSessionCreateDataRequired, total=False):
    cancel_url: str
    coupon_code: str
    entry_point: str
    package_key: str
    package_revision: int
    success_url: str


class BillingContact(TypedDict):
    addons: list
    billing_email: str
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    customer: Any
    deployment_usage_visible: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class BillingContactUpdateData(TypedDict):
    organization_id: str


class BillingContactPatchDataRequired(TypedDict):
    organization_id: str


class BillingContactPatchData(BillingContactPatchDataRequired, total=False):
    billing_email: str


class BillingExtraSpendRequired(TypedDict):
    addons: list
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    customer: Any
    deployment_usage_visible: bool
    enabled: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class BillingExtraSpend(BillingExtraSpendRequired, total=False):
    monthly_cap_cents: int | None


class BillingExtraSpendUpdateDataRequired(TypedDict):
    organization_id: str


class BillingExtraSpendUpdateData(BillingExtraSpendUpdateDataRequired, total=False):
    enabled: bool
    monthly_cap_cents: int | None


class BillingExtraSpendPatchDataRequired(TypedDict):
    organization_id: str


class BillingExtraSpendPatchData(BillingExtraSpendPatchDataRequired, total=False):
    enabled: bool
    monthly_cap_cents: int | None


class BillingInvoiceRequired(TypedDict):
    amount_due_cents: int
    created_at: str
    currency: str
    id: str
    status: str
    total_cents: int


class BillingInvoice(BillingInvoiceRequired, total=False):
    hosted_invoice_url: str | None
    invoice_pdf: str | None
    metronome_invoice_id: str | None
    number: str | None
    period_ended_at: str | None
    period_started_at: str | None


class BillingInvoiceListMatch(TypedDict):
    organization_id: str


class BillingPackageRequired(TypedDict):
    addons: list
    base_price_cents: int
    billing_interval: str
    billing_policy: str
    currency: str
    key: str
    name: str
    pay_as_you_go_enabled: bool
    rates: list
    revision: int
    seat_price_cents: int
    trial_days: int
    visibility: str


class BillingPackage(BillingPackageRequired, total=False):
    ci_included_spend_cents: int
    max_seats: int | None
    roder_daily_run_limit: int
    roder_run_concurrency_limit: int


class BillingPackageListMatch(TypedDict, total=False):
    addons: list
    base_price_cents: int
    billing_interval: str
    billing_policy: str
    ci_included_spend_cents: int
    currency: str
    key: str
    max_seats: int | None
    name: str
    pay_as_you_go_enabled: bool
    rates: list
    revision: int
    roder_daily_run_limit: int
    roder_run_concurrency_limit: int
    seat_price_cents: int
    trial_days: int
    visibility: str


class BillingPortalSession(TypedDict, total=False):
    return_url: str


class BillingPortalSessionCreateDataRequired(TypedDict):
    organization_id: str


class BillingPortalSessionCreateData(BillingPortalSessionCreateDataRequired, total=False):
    return_url: str


class BillingPrepaidPeriod(TypedDict):
    activated_at: str | None
    created_at: str
    currency: str
    id: str
    last_error: str | None
    minutes: int
    net_amount_cents: int
    paid_at: str | None
    paid_total_cents: int | None
    payment_action_url: str | None
    period_ended_at: str
    period_started_at: str
    receipt_url: str | None
    refunded_net_cents: int
    state: str


class BillingPrepaidPeriodLoadMatch(TypedDict):
    id: str
    organization_id: str


class BillingPrepaidPurchase(TypedDict):
    activated_at: str | None
    created_at: str
    currency: str
    id: str
    last_error: str | None
    minutes: int
    net_amount_cents: int
    paid_at: str | None
    paid_total_cents: int | None
    payment_action_url: str | None
    prepaid: dict
    purchase: dict
    receipt_url: str | None
    refunded_net_cents: int
    request_key: str
    state: str


class BillingPrepaidPurchaseLoadMatch(TypedDict):
    id: str
    organization_id: str


class BillingPrepaidPurchaseListMatch(TypedDict):
    organization_id: str


class BillingPrepaidPurchaseCreateData(TypedDict):
    organization_id: str
    minutes: int
    request_key: str


class BillingSubscription(TypedDict):
    addons: list
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    cancel_at_period_end: bool
    customer: Any
    deployment_usage_visible: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class BillingSubscriptionUpdateData(TypedDict):
    organization_id: str


class BillingSubscriptionPatchDataRequired(TypedDict):
    organization_id: str


class BillingSubscriptionPatchData(BillingSubscriptionPatchDataRequired, total=False):
    cancel_at_period_end: bool


class BillingTokenTopUp(TypedDict):
    amount_cents: int
    request_key: str


class BillingTokenTopUpCreateData(TypedDict):
    organization_id: str
    amount_cents: int
    request_key: str


class BillingUsage(TypedDict):
    pass


class BillingUsageLoadMatchRequired(TypedDict):
    organization_id: str


class BillingUsageLoadMatch(BillingUsageLoadMatchRequired, total=False):
    meter: str
    window: str


class BinaryRequired(TypedDict):
    accepts_versions: bool
    archived_at: str | None
    binary: dict
    created_at: str
    download_url: str
    executable: str
    format: Any
    id: str
    idempotency_key: str
    latest_version: Any
    name: str
    needs_refresh: bool
    operation: dict
    pagination: dict
    permissions: dict
    project_id: str
    slug: str
    version: dict
    versions: list
    window_title: str


class Binary(BinaryRequired, total=False):
    arch: Any
    download_secret: str
    launch_args: list
    platform: Any
    sha256: str
    version_defaults: Any


class BinaryLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class BinaryLoadMatch(BinaryLoadMatchRequired, total=False):
    page: int


class BinaryListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class BinaryListMatch(BinaryListMatchRequired, total=False):
    page: int


class BinaryCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    download_url: str
    executable: str
    format: Any
    idempotency_key: str
    name: str
    slug: str
    window_title: str


class BinaryCreateData(BinaryCreateDataRequired, total=False):
    arch: Any
    download_secret: str
    launch_args: list
    platform: Any
    sha256: str


class BinaryVersionRequired(TypedDict):
    cancelable: bool
    configuration: dict
    configuration_digest: str
    created_at: str
    deletable: bool
    download_url: str
    environment_uses: list
    id: str
    idempotency_key: str
    operation: dict
    package_sha256: str | None
    package_size: int | None
    permissions: dict
    preparations: list
    retryable: bool
    status: str
    version: dict


class BinaryVersion(BinaryVersionRequired, total=False):
    arch: Any
    download_secret: str
    executable: str
    format: Any
    launch_args: list
    platform: Any
    sha256: str
    window_title: str


class BinaryVersionLoadMatch(TypedDict):
    binary_id: str
    id: str
    organization_id: str
    project_id: str


class BinaryVersionListMatchRequired(TypedDict):
    binary_id: str
    organization_id: str
    project_id: str


class BinaryVersionListMatch(BinaryVersionListMatchRequired, total=False):
    page: int


class BinaryVersionCreateDataRequired(TypedDict):
    binary_id: str
    organization_id: str
    project_id: str
    download_url: str
    idempotency_key: str


class BinaryVersionCreateData(BinaryVersionCreateDataRequired, total=False):
    arch: Any
    download_secret: str
    executable: str
    format: Any
    launch_args: list
    platform: Any
    sha256: str
    window_title: str


class BinaryVersionRemoveMatch(TypedDict):
    binary_id: str
    id: str
    organization_id: str
    project_id: str


class BookmarkProtectionRefreshGithubRequiredCheckRequired(TypedDict):
    exclusions: list
    github_branch: str
    proven: bool
    requirements: list
    stale: bool


class BookmarkProtectionRefreshGithubRequiredCheck(BookmarkProtectionRefreshGithubRequiredCheckRequired, total=False):
    fetched_at: str | None
    fetched_at_label: str | None
    github_owner: str | None
    github_repository_name: str | None
    last_error: str | None


class BookmarkProtectionRefreshGithubRequiredCheckCreateDataRequired(TypedDict):
    organization_id: str
    repo_id: str


class BookmarkProtectionRefreshGithubRequiredCheckCreateData(BookmarkProtectionRefreshGithubRequiredCheckCreateDataRequired, total=False):
    github_branch: str


class BrowserEgressCandidate(TypedDict):
    id: str


class BrowserEgressCandidateListMatchRequired(TypedDict):
    organization_id: str


class BrowserEgressCandidateListMatch(BrowserEgressCandidateListMatchRequired, total=False):
    cursor: str
    limit: int


class BrowserSessionRequired(TypedDict):
    authentication_status: str
    control_generation: int
    controller: str
    expires_at: str
    id: str
    initial_url: str
    status: str


class BrowserSession(BrowserSessionRequired, total=False):
    active_task_id: str | None
    authentication_task_id: str | None
    cdp_url: str | None
    closed_at: str | None
    closure_basis: str | None
    credential_id: str | None
    environment_id: str
    environment_revision_id: str | None
    failure_code: str | None
    idempotency_key: str
    max_seconds: int
    pending_control_id: str | None
    project_id: str | None
    reconciled_at: str | None
    started_at: str | None
    url: str
    viewer: dict | None


class BrowserSessionLoadMatch(TypedDict):
    id: str
    organization_id: str


class BrowserSessionCreateDataRequired(TypedDict):
    organization_id: str


class BrowserSessionCreateData(BrowserSessionCreateDataRequired, total=False):
    controller: str
    credential_id: str | None
    environment_id: str
    idempotency_key: str
    max_seconds: int
    project_id: str | None
    url: str


class BrowserSessionRemoveMatch(TypedDict):
    id: str
    organization_id: str


class BrowserSessionConnectionRequired(TypedDict):
    generation: int


class BrowserSessionConnection(BrowserSessionConnectionRequired, total=False):
    idempotency_key: str


class BrowserSessionConnectionCreateDataRequired(TypedDict):
    browser_session_id: str
    organization_id: str
    generation: int


class BrowserSessionConnectionCreateData(BrowserSessionConnectionCreateDataRequired, total=False):
    idempotency_key: str


class BrowserSessionControlRequired(TypedDict):
    browser_session_id: str
    id: str
    requested_controller: str
    requested_generation: int
    status: str


class BrowserSessionControl(BrowserSessionControlRequired, total=False):
    completed_at: str | None
    completed_generation: int | None
    connection: dict | None
    failure_code: str | None


class BrowserSessionControlLoadMatch(TypedDict):
    browser_session_id: str
    id: str
    organization_id: str


class BrowserSessionEventRequired(TypedDict):
    created_at: str
    id: str
    kind: str
    payload: dict


class BrowserSessionEvent(BrowserSessionEventRequired, total=False):
    browser_task_id: str | None
    source_sequence: int | None


class BrowserSessionEventListMatchRequired(TypedDict):
    browser_session_id: str
    organization_id: str


class BrowserSessionEventListMatch(BrowserSessionEventListMatchRequired, total=False):
    after: str


class BrowserSessionMediaRequired(TypedDict):
    browser_session_id: str
    files: list
    id: str
    kind: str
    partial: bool
    retention_expires_at: str
    status: str


class BrowserSessionMedia(BrowserSessionMediaRequired, total=False):
    capture_omissions: dict | None
    captured_at: str | None
    ended_at: str | None
    failure_code: str | None
    frames: int | None
    source: dict | None
    stop_requested_at: str | None


class BrowserSessionMediaLoadMatch(TypedDict):
    browser_session_id: str
    id: str
    organization_id: str


class BrowserSessionRecording(TypedDict, total=False):
    id: str
    idempotency_key: str
    wait: bool


class BrowserSessionRecordingCreateDataRequired(TypedDict):
    browser_session_id: str
    organization_id: str


class BrowserSessionRecordingCreateData(BrowserSessionRecordingCreateDataRequired, total=False):
    idempotency_key: str
    wait: bool


class BrowserSessionScreenshot(TypedDict, total=False):
    idempotency_key: str
    wait: bool


class BrowserSessionScreenshotCreateDataRequired(TypedDict):
    browser_session_id: str
    organization_id: str


class BrowserSessionScreenshotCreateData(BrowserSessionScreenshotCreateDataRequired, total=False):
    idempotency_key: str
    wait: bool


class BrowserSessionTaskRequired(TypedDict):
    browser_session_id: str
    deadline_at: str
    effects_unknown: bool
    id: str
    instruction: str
    max_rounds: int
    model_selection: dict
    result: dict
    status: str


class BrowserSessionTask(BrowserSessionTaskRequired, total=False):
    activity: dict | None
    cancel_requested_at: str | None
    completed_at: str | None
    control_generation: int | None
    failure_code: str | None
    idempotency_key: str
    max_seconds: int
    outcome: str | None
    started_at: str | None


class BrowserSessionTaskLoadMatch(TypedDict):
    browser_session_id: str
    id: str
    organization_id: str


class BrowserSessionTaskCreateDataRequired(TypedDict):
    browser_session_id: str
    organization_id: str
    instruction: str


class BrowserSessionTaskCreateData(BrowserSessionTaskCreateDataRequired, total=False):
    idempotency_key: str
    max_rounds: int
    max_seconds: int
    outcome: str | None


class CacheNamespaceEntry(TypedDict, total=False):
    id: str


class CacheNamespaceEntryLoadMatchRequired(TypedDict):
    cache_namespace_id: str


class CacheNamespaceEntryLoadMatch(CacheNamespaceEntryLoadMatchRequired, total=False):
    id: str


class CacheNamespaceEntryCreateData(TypedDict):
    cache_namespace_id: str


class CacheNamespaceEntryUpdateData(TypedDict):
    cache_namespace_id: str
    id: str


class CacheNamespaceEntryPatchData(TypedDict):
    cache_namespace_id: str
    id: str


class CacheNamespaceEntryRemoveMatch(TypedDict):
    cache_namespace_id: str
    id: str


class CatalogSelector(TypedDict):
    app: dict


class CatalogSelectorListMatch(TypedDict):
    app_id: str


class CdnDeployment(TypedDict, total=False):
    id: str


class CdnDeploymentLoadMatchRequired(TypedDict):
    app_id: str
    cdn_id: str


class CdnDeploymentLoadMatch(CdnDeploymentLoadMatchRequired, total=False):
    id: str


class CdnDeploymentCreateData(TypedDict):
    app_id: str
    cdn_id: str


class CdnHostname(TypedDict):
    app_cdn_distribution_id: str
    created_at: str
    dns_status: str
    force_ssl: bool
    hostname: str
    id: str
    provider_hostname_id: str | None
    tls_status: str
    updated_at: str


class CdnHostnameLoadMatchRequired(TypedDict):
    app_id: str
    cdn_id: str


class CdnHostnameLoadMatch(CdnHostnameLoadMatchRequired, total=False):
    id: str


class CdnHostnameCreateDataRequired(TypedDict):
    app_id: str
    cdn_id: str
    hostname: str


class CdnHostnameCreateData(CdnHostnameCreateDataRequired, total=False):
    dns_status: str
    force_ssl: bool
    tls_status: str


class CdnHostnameUpdateData(TypedDict):
    app_id: str
    cdn_id: str
    id: str


class CdnHostnamePatchData(TypedDict):
    app_id: str
    cdn_id: str
    id: str


class CdnHostnameRemoveMatch(TypedDict):
    app_id: str
    cdn_id: str
    id: str


class CdnSpace(TypedDict, total=False):
    id: str


class CdnSpaceLoadMatch(TypedDict):
    id: str


class CdnSpaceCreateData(TypedDict):
    organization_id: str


class CdnSpaceUpdateData(TypedDict):
    id: str


class CdnSpacePatchData(TypedDict):
    id: str


class CdnSpaceRemoveMatch(TypedDict):
    id: str


class CdnSpaceObject(TypedDict, total=False):
    id: str


class CdnSpaceObjectLoadMatchRequired(TypedDict):
    cdn_space_id: str


class CdnSpaceObjectLoadMatch(CdnSpaceObjectLoadMatchRequired, total=False):
    id: str


class CdnSpaceObjectUpdateData(TypedDict):
    cdn_space_id: str


class CdnSpaceObjectRemoveMatch(TypedDict):
    cdn_space_id: str
    id: str


class Change(TypedDict):
    counts: dict
    filters: dict
    github_sync: dict
    result: Any


class ChangeLoadMatchRequired(TypedDict):
    organization_id: str


class ChangeLoadMatch(ChangeLoadMatchRequired, total=False):
    author: str
    awaiting_review: bool
    direction: str
    group_page: str
    label: str
    mine: bool
    number: int
    page: int
    q: str
    repo: str
    sort: str
    source: str
    stack: str
    state: str
    target: str
    tips_only: bool
    view: str


class ChangeAssetRequired(TypedDict):
    alias: str
    byte_size: int
    checksum_md5: str
    checksum_sha256: str
    content_type: str
    filename: str


class ChangeAsset(ChangeAssetRequired, total=False):
    id: str


class ChangeAssetCreateData(TypedDict):
    organization_id: str
    repo_id: str
    alias: str
    byte_size: int
    checksum_md5: str
    checksum_sha256: str
    content_type: str
    filename: str


class ChangeCommentRequired(TypedDict):
    body: str
    capabilities: dict
    id: str
    outdated: bool
    patchset_number: int | None
    resolved: bool
    resolved_by: dict
    user: dict


class ChangeComment(ChangeCommentRequired, total=False):
    change_id: str | None
    created_at: str | None
    created_at_label: str | None
    kind: str | None
    line: int | None
    parent_comment_id: str | None
    patchset_id: str | None
    path: str | None
    replies: list
    resolved_at: str | None
    resolved_at_label: str | None
    side: str | None
    updated_at: str | None
    updated_at_label: str | None


class ChangeCommentListMatchRequired(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeCommentListMatch(ChangeCommentListMatchRequired, total=False):
    path: str
    resolved: bool


class ChangeCommentCreateDataRequired(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str
    body: str


class ChangeCommentCreateData(ChangeCommentCreateDataRequired, total=False):
    kind: str | None
    line: int | None
    parent_comment_id: str | None
    patchset_id: str | None
    path: str | None
    side: str | None


class ChangeFileReviewCheckpoint(TypedDict):
    patchset_id: str
    path: str
    request_id: str
    review_action: str


class ChangeFileReviewCheckpointCreateData(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str
    patchset_id: str
    path: str
    request_id: str
    review_action: str


class ChangeGitBranchSubmission(TypedDict):
    pass


class ChangeGitBranchSubmissionCreateData(TypedDict):
    organization_id: str
    repo_id: str


class ChangeGitCommitIdentityRequired(TypedDict):
    change_id: str
    change_number: int
    git_commit_id: str
    git_commit_ids: list
    identities: list
    missing_git_commit_ids: list
    patchset_number: int


class ChangeGitCommitIdentity(ChangeGitCommitIdentityRequired, total=False):
    id: str


class ChangeGitCommitIdentityLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class ChangeGitCommitIdentityCreateData(TypedDict):
    organization_id: str
    repo_id: str
    git_commit_ids: list


class ChangeGitPublicationRequired(TypedDict):
    expected_target_commit_id: str
    operation_key: str
    publication_id: str
    request: dict
    request_digest: str
    revisions: list
    status: str


class ChangeGitPublication(ChangeGitPublicationRequired, total=False):
    id: str
    transfer_refs: list


class ChangeGitPublicationLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class ChangeGitPublicationCreateData(TypedDict):
    organization_id: str
    repo_id: str
    operation_key: str
    request: dict


class ChangeGroupMemberRequired(TypedDict):
    change_id: str
    changes: list
    status: str
    title: str | None


class ChangeGroupMember(ChangeGroupMemberRequired, total=False):
    id: str
    name: str
    number: int


class ChangeGroupMemberCreateData(TypedDict):
    change_group_id: str
    organization_id: str
    repo_id: str
    change_id: str


class ChangeGroupMemberRemoveMatch(TypedDict):
    change_group_id: str
    id: str
    organization_id: str
    repo_id: str


class ChangeLabelRequired(TypedDict):
    approval: dict
    capabilities: dict
    current_patchset: dict
    github_pull_request: dict
    id: str
    landed_by: dict
    number: int
    status: str
    target_branch: str
    title: str


class ChangeLabel(ChangeLabelRequired, total=False):
    accepted: bool
    add: list
    assets: list
    author: Any
    change_key: str
    checks: list
    checks_status: str
    comments: list
    comments_count: int
    comments_count_label: str
    commit_message: str | None
    description: str | None
    draft: bool
    folded_into_number: int | None
    github_projection_status: str | None
    github_pull_requests: list
    group: dict | None
    has_description: bool
    jj_change_id: str | None
    labels: list
    landable: bool
    orphaned: bool
    orphaned_at: str
    orphaned_at_label: str
    orphaned_reason: str
    parent_change_id: str | None
    parent_change_number: int | None
    patchset_number: int | None
    patchsets: list
    primary_status: str | None
    public_id: str
    relation_chain: list
    remove: list
    requested_changes: bool
    restack_state: str
    reviewer_candidates: list
    reviewers: list
    stable_change_id: str
    stack: Any
    unresolved_comments_count_label: str
    url: str
    votes: list


class ChangeLabelUpdateDataRequired(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeLabelUpdateData(ChangeLabelUpdateDataRequired, total=False):
    add: list
    labels: list
    remove: list


class ChangeLandingHold(TypedDict):
    pass


class ChangeLandingHoldCreateData(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeLandingRequestRequired(TypedDict):
    count: int
    numbers: list
    scope_version: str
    state: str


class ChangeLandingRequest(ChangeLandingRequestRequired, total=False):
    change_ids: list
    defer_until_ready: bool
    expected_requirement_version: str
    expected_scope_version: str
    head_change_id: str
    id: str | None
    override_acknowledged: bool
    override_codes: list
    position: int
    priority: str
    version: int


class ChangeLandingRequestCreateDataRequired(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeLandingRequestCreateData(ChangeLandingRequestCreateDataRequired, total=False):
    defer_until_ready: bool
    expected_requirement_version: str
    expected_scope_version: str
    override_acknowledged: bool
    override_codes: list
    priority: str


class ChangeLandingRequestRemoveMatch(TypedDict):
    change_id: str
    id: str
    organization_id: str
    repo_id: str


class ChangeRequestChange(TypedDict, total=False):
    message: str | None


class ChangeRequestChangeCreateDataRequired(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeRequestChangeCreateData(ChangeRequestChangeCreateDataRequired, total=False):
    message: str | None


class ChangeReviewerRequired(TypedDict):
    email: str
    name: str | None
    removed_reviewers: list
    requested_reviewers: list
    reviewers: list


class ChangeReviewer(ChangeReviewerRequired, total=False):
    add: list
    remove: list


class ChangeReviewerListMatch(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeReviewerUpdateDataRequired(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeReviewerUpdateData(ChangeReviewerUpdateDataRequired, total=False):
    add: list
    remove: list


class ChangeTranscriptRequired(TypedDict):
    capture_kind: str
    captured_at: str
    harness: dict
    id: str
    patchset_commit_id: str
    patchset_number: int
    redaction_count: int
    status: str
    superseded: bool
    user: dict


class ChangeTranscript(ChangeTranscriptRequired, total=False):
    original_resume: Any
    session_id: str | None
    session_title: str | None


class ChangeTranscriptListMatch(TypedDict):
    change_id: str
    organization_id: str
    repo_id: str


class ChangeTranscriptSummary(TypedDict):
    summaries: dict


class ChangeTranscriptSummaryListMatch(TypedDict):
    organization_id: str
    ids: str


class CheckpointPrepareChunk(TypedDict):
    pass


class CheckpointPrepareChunkCreateData(TypedDict):
    agent_session_id: str
    organization_id: str
    repo_id: str


class CiNode(TypedDict):
    architecture: str | None
    bazel_enabled: bool
    bazel_properties_json: str | None
    ci_runner_pool_id: str
    cordoned_at: str | None
    cordoned_at_label: str | None
    created_at: str
    created_at_label: str | None
    health_state: str
    heartbeat_age_seconds: int | None
    id: str
    kind: str
    labels_csv: str | None
    last_seen_at: str | None
    last_seen_at_label: str | None
    name: str
    network_peer_id: str | None
    node_capabilities_csv: str | None
    node_certificate_expires_at: str | None
    node_certificate_expires_at_label: str | None
    node_certificate_fingerprint_sha256: str | None
    node_certificate_serial: str | None
    offline_at: str | None
    offline_at_label: str | None
    online_at: str | None
    online_at_label: str | None
    organization_id: str
    os: str | None
    revoked_at: str | None
    revoked_at_label: str | None
    schedulable: bool
    slug: str
    status: str
    updated_at: str
    updated_at_label: str | None
    version: str | None


class CiNodeLoadMatch(TypedDict):
    id: str


class CiNodeCreateData(TypedDict):
    pass


class CiPipeline(TypedDict):
    ci_runner_pool_id: str | None
    concurrency_key: str | None
    created_at: str
    default_branch: str | None
    description: str | None
    hosted_app_id: str | None
    id: str
    name: str
    organization_id: str
    repository_id: str | None
    required_capabilities_csv: str | None
    runner_pool: dict | None
    runs: list
    slug: str
    source_kind: str
    status: str
    status_label: str
    status_state: str
    status_tone: str
    trigger_on_pull_request: bool
    trigger_on_push: bool
    trigger_on_schedule: bool
    updated_at: str
    workflow_path: str | None


class CiPipelineLoadMatch(TypedDict):
    id: str


class CiPipelineListMatch(TypedDict, total=False):
    ci_runner_pool_id: str | None
    concurrency_key: str | None
    created_at: str
    default_branch: str | None
    description: str | None
    hosted_app_id: str | None
    id: str
    name: str
    organization_id: str
    repository_id: str | None
    required_capabilities_csv: str | None
    runner_pool: dict | None
    runs: list
    slug: str
    source_kind: str
    status: str
    status_label: str
    status_state: str
    status_tone: str
    trigger_on_pull_request: bool
    trigger_on_push: bool
    trigger_on_schedule: bool
    updated_at: str
    workflow_path: str | None


class CiPipelineCreateData(TypedDict):
    pass


class CiPipelineRun(TypedDict):
    active: bool
    canceled_at: str | None
    ci_pipeline_id: str
    ci_runner_pool_id: str | None
    commit_sha: str | None
    concurrency_key: str | None
    created_at: str
    creator_user_id: str | None
    display_id: int
    failed: bool
    finished_at: str | None
    hosted_app_id: str | None
    id: str
    jobs: list
    message: str | None
    number: int
    organization_id: str
    parameters_json: str | None
    queued_at: str | None
    ref_name: str | None
    repository_id: str | None
    required_capabilities_csv: str | None
    retry_number: int
    retryable: bool
    slug: str
    source_url: str | None
    started_at: str | None
    status: str
    status_label: str
    status_state: str
    status_tone: str
    trigger_kind: str
    updated_at: str


class CiPipelineRunLoadMatchRequired(TypedDict):
    pipeline_id: str


class CiPipelineRunLoadMatch(CiPipelineRunLoadMatchRequired, total=False):
    id: str


class CiPipelineRunCreateData(TypedDict):
    pipeline_id: str


class CiRunnerPool(TypedDict):
    bazel_enabled: bool
    bazel_properties_json: str | None
    created_at: str
    description: str | None
    elastic_config_json: str | None
    elastic_provider_kind: str | None
    id: str
    isolation_mode: str
    labels_csv: str | None
    max_concurrency: int
    modal_capacity: dict
    modal_runner_invocations: list
    name: str
    network_space_id: str | None
    node_capabilities_csv: str | None
    organization_id: str
    runner_count_label: str
    runner_kind: str
    runners: list
    slug: str
    status: str
    updated_at: str


class CiRunnerPoolLoadMatch(TypedDict):
    id: str


class CiRunnerPoolListMatch(TypedDict, total=False):
    organization_id: str


class CiRunnerPoolCreateData(TypedDict):
    pass


class CiRunnerPoolUpdateData(TypedDict):
    id: str


class CiRunnerPoolPatchDataRequired(TypedDict):
    id: str


class CiRunnerPoolPatchData(CiRunnerPoolPatchDataRequired, total=False):
    description: str | None
    elastic_config_json: str | None
    elastic_provider_kind: str | None
    isolation_mode: str
    labels_csv: str | None
    max_concurrency: int
    node_capabilities_csv: str | None
    runner_kind: str
    status: str


class CiStatus(TypedDict):
    pass


class CiStatusLoadMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class CiStatusLoadMatch(CiStatusLoadMatchRequired, total=False):
    ref: str


class CliEvent(TypedDict):
    event: str
    properties: dict


class CliEventCreateData(TypedDict):
    event: str
    properties: dict


class CliRelease(TypedDict):
    pass


class CliReleaseLoadMatch(TypedDict):
    pass


class CliReleaseCreateData(TypedDict):
    pass


class CloudWorkspaceBackupObject(TypedDict, total=False):
    id: str


class CloudWorkspaceBackupObjectLoadMatch(TypedDict):
    cloud_workspace_backup_id: str
    id: str
    organization_id: str
    repo_id: str


class CodeRuleEvaluationRequired(TypedDict):
    advisory: bool
    coverage: dict
    diff: str
    duration_ms: int
    requests: dict
    schema_version: int
    unchecked: list
    verdicts: list


class CodeRuleEvaluation(CodeRuleEvaluationRequired, total=False):
    evaluator_version: str
    input_digest: str | None
    limits: dict
    model: str
    snapshot_digest: str | None


class CodeRuleEvaluationCreateData(TypedDict):
    organization_id: str
    repo_id: str
    diff: str


class ComSiteAccess(TypedDict):
    pass


class ComSiteAccessLoadMatchRequired(TypedDict):
    host: str


class ComSiteAccessLoadMatch(ComSiteAccessLoadMatchRequired, total=False):
    return_to: str


class ComSiteAccessCreateData(TypedDict, total=False):
    host: Any
    token: Any


class ComSiteAccessSession(TypedDict):
    cookie_name: str
    host: str
    max_age: int
    session_token: str


class ComSiteAccessSessionCreateData(TypedDict):
    host: str


class CommentThreadComment(TypedDict):
    body: str


class CommentThreadCommentCreateData(TypedDict):
    artefact_id: str
    comment_thread_id: str
    organization_id: str
    body: str


class CommitDiffRequired(TypedDict):
    files: list
    parent_id: str | None


class CommitDiff(CommitDiffRequired, total=False):
    id: str


class CommitDiffLoadMatchRequired(TypedDict):
    commit_id: str
    id: str
    organization_id: str
    repo_id: str


class CommitDiffLoadMatch(CommitDiffLoadMatchRequired, total=False):
    parent: str


class ConnectionRequest(TypedDict):
    agent_card_url: str
    auth_scheme: str
    can_configure: bool
    can_disconnect: bool
    can_setup: bool
    error_code: str | None
    generation: int
    id: str
    name: str
    remote_agent: str | None
    retired_at: str | None
    revoked_at: str | None
    source_operation_id: str | None
    state: str


class ConnectionRequestLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class ConnectionSource(TypedDict):
    device_id: str
    device_name: str
    provider: str
    source_operation_id: str
    title: str


class ConnectionSourceListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class ConnectionSourceListMatch(ConnectionSourceListMatchRequired, total=False):
    cursor: str
    limit: int


class ContactSubmissionRequired(TypedDict):
    email: str
    message: str
    name: str


class ContactSubmission(ContactSubmissionRequired, total=False):
    company: str | None
    website: str | None


class ContactSubmissionCreateDataRequired(TypedDict):
    email: str
    message: str
    name: str


class ContactSubmissionCreateData(ContactSubmissionCreateDataRequired, total=False):
    company: str | None
    website: str | None


class ControlComputerRequired(TypedDict):
    connection: dict
    consent: dict
    device: dict


class ControlComputer(ControlComputerRequired, total=False):
    id: str
    provider_status: list


class ControlComputerListMatchRequired(TypedDict):
    organization_id: str
    persistent_agent_id: str


class ControlComputerListMatch(ControlComputerListMatchRequired, total=False):
    cursor: str
    observe_connection: bool


class ControlComputerUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class ControlComputerUpdateData(ControlComputerUpdateDataRequired, total=False):
    enabled: Any
    expected_revision: Any
    persistent_agent_id: Any
    providers: Any


class ControlComputerControlOperationRequired(TypedDict):
    action: str
    arguments: dict
    created_at: str
    delivery: dict
    device_id: str
    end: dict
    expires_at: str
    id: str
    key: str
    provider: str
    references: dict
    result: Any
    result_expired: bool
    state: str


class ControlComputerControlOperation(ControlComputerControlOperationRequired, total=False):
    diagnostic_code: str


class ControlComputerControlOperationLoadMatch(TypedDict):
    control_computer_id: str
    id: str
    organization_id: str


class ControlComputerControlOperationCreateData(TypedDict):
    control_computer_id: str
    organization_id: str
    action: str
    arguments: dict
    key: str


class CoordinationWait(TypedDict):
    can_stop: bool
    expires_at: str
    id: str
    status: str
    stop_state: str | None
    wake_outcome: str | None


class CoordinationWaitListMatchRequired(TypedDict):
    agent_id: str
    coordination_id: str
    organization_id: str


class CoordinationWaitListMatch(CoordinationWaitListMatchRequired, total=False):
    cursor: str


class CredentialSignInCheckRequired(TypedDict):
    agent_filters: dict
    agents: list
    concurrency: int
    covered_areas: list
    created_at: str
    deadline_at: str
    demo_project: dict | None
    ended_early: bool
    environment_id: str
    environment_name: str
    explorer_activity: dict
    finding_count: int
    findings: list
    findings_fix_prompt: str | None
    goal: str
    huntable_flows: list
    id: str
    max_seconds: int
    max_testers: int
    next_scan_improvements: list
    onboarding: bool
    paywalled: bool
    permissions: dict
    priority_counts: dict
    related_explorations: list
    report: dict
    reproduction_of: dict | None
    reproductions: list
    saves_scenarios: bool
    scannable_flows: list
    scenario_generation: dict
    sign_in_needs_answer: bool
    sign_in_outcome: str
    status: str
    time_limit_reached: bool
    unlock: Any
    web_url: str


class CredentialSignInCheck(CredentialSignInCheckRequired, total=False):
    can_continue: bool
    chat_messages: list
    finished_at: str | None
    mode: str
    observed_at: str
    project_id: str | None
    sign_in_question: str | None
    startup_retryable: bool
    title: str


class CredentialSignInCheckCreateData(TypedDict):
    credential_id: str
    organization_id: str
    project_id: str
    environment_id: str


class DataResourceRotateCredential(TypedDict):
    app_environment_id: str | None
    created_at: str
    engine: str
    failure_message: str | None
    high_availability: bool
    hosted_app_id: str
    id: str
    kind: str
    name: str
    plan: str | None
    provider_metadata: dict
    region: str | None
    slug: str
    status: str
    storage_gb: int | None
    storage_label: str | None
    updated_at: str
    version: str | None


class DataResourceRotateCredentialCreateData(TypedDict):
    app_id: str
    data_resource_id: str


class DeepScanRequired(TypedDict):
    active: list
    agent_filters: dict
    agents: list
    concurrency: int
    covered_areas: list
    created_at: str
    deadline_at: str
    demo_project: dict | None
    ended_early: bool
    environment_id: str
    environment_name: str
    explorations: list
    explorer_activity: dict
    finding_count: int
    findings: list
    findings_fix_prompt: str | None
    goal: str
    huntable_flows: list
    id: str
    launch_options: dict
    max_seconds: int
    max_testers: int
    next_scan_improvements: list
    onboarding: bool
    pagination: dict
    paywalled: bool
    permissions: dict
    priority_counts: dict
    related_explorations: list
    report: dict
    reproduction_of: dict | None
    reproductions: list
    saves_scenarios: bool
    scannable_flows: list
    scenario_generation: dict
    sign_in_needs_answer: bool
    sign_in_outcome: str
    status: str
    time_limit_reached: bool
    unlock: Any
    web_url: str


class DeepScan(DeepScanRequired, total=False):
    account_id: str | None
    can_continue: bool
    chat_messages: list
    finished_at: str | None
    idempotency_key: str
    mode: str
    observed_at: str
    project_id: str | None
    sign_in_question: str | None
    startup_retryable: bool
    title: str


class DeepScanLoadMatchRequired(TypedDict):
    organization_id: str


class DeepScanLoadMatch(DeepScanLoadMatchRequired, total=False):
    id: str
    agent_id: str
    evidence: str
    finding_id: str
    project_id: str
    finding: str
    page: int
    query: str
    status: str


class DeepScanCreateDataRequired(TypedDict):
    organization_id: str
    environment_id: str
    goal: str


class DeepScanCreateData(DeepScanCreateDataRequired, total=False):
    project_id: str
    account_id: str | None
    concurrency: int
    idempotency_key: str
    max_seconds: int
    max_testers: int


class DeepScanFindingRequired(TypedDict):
    actual: str
    agent_id: str
    agent_title: str
    checks: list
    confidence: str
    evidence_timestamp_ms: int | None
    expected: str
    fix_prompt: str
    id: str
    locked: bool
    reproduction_steps: list
    severity: str
    title: str
    tracked: dict | None
    url: str


class DeepScanFinding(DeepScanFindingRequired, total=False):
    area: str | None
    confirmed: bool
    evidence_step_ids: list
    has_recording: bool


class DeepScanFindingListMatchRequired(TypedDict):
    deep_scan_id: str
    organization_id: str


class DeepScanFindingListMatch(DeepScanFindingListMatchRequired, total=False):
    priority: str
    project_id: str


class DeepScanFlowRequired(TypedDict):
    flow_names: list


class DeepScanFlow(DeepScanFlowRequired, total=False):
    account_id: str | None
    concurrency: int
    environment_id: str
    exploration_id: str
    idempotency_key: str
    max_seconds: int
    max_testers: int
    note: str | None


class DeepScanFlowCreateDataRequired(TypedDict):
    organization_id: str
    flow_names: list


class DeepScanFlowCreateData(DeepScanFlowCreateDataRequired, total=False):
    project_id: str
    account_id: str | None
    concurrency: int
    environment_id: str
    exploration_id: str
    idempotency_key: str
    max_seconds: int
    max_testers: int
    note: str | None


class DeepScanMappedFlow(TypedDict):
    account_id: str | None
    environment_id: str
    flow_map: dict | None
    revision_id: str | None


class DeepScanMappedFlowLoadMatchRequired(TypedDict):
    organization_id: str
    environment_id: str


class DeepScanMappedFlowLoadMatch(DeepScanMappedFlowLoadMatchRequired, total=False):
    account_id: str
    project_id: str


class DeepScanOptionRequired(TypedDict):
    accounts: list
    flow_map: dict | None
    id: str
    name: str
    target_url: str | None


class DeepScanOption(DeepScanOptionRequired, total=False):
    deep_scan_defaults: Any
    personas: list
    preview: bool


class DeepScanOptionListMatchRequired(TypedDict):
    organization_id: str


class DeepScanOptionListMatch(DeepScanOptionListMatchRequired, total=False):
    environment_query: str
    project_id: str


class DemoShareRequired(TypedDict):
    head_sha: str
    recording: dict
    summary: str


class DemoShare(DemoShareRequired, total=False):
    id: str


class DemoShareLoadMatch(TypedDict):
    id: str


class DemoShareSegment(TypedDict, total=False):
    id: str


class DemoShareSegmentLoadMatch(TypedDict):
    demo_share_id: str
    id: str


class Deployment(TypedDict):
    app: dict
    artifact_locator: str | None
    build_duration_seconds: int | None
    build_source: dict | None
    build_status: str
    children: list
    ci_pipeline_id: str | None
    ci_pipeline_run_id: str | None
    commit_sha: str | None
    created_at: str
    creator: dict | None
    deployed_url: str | None
    duration_seconds: int | None
    environment: dict
    history_kind: str
    history_reason: str | None
    id: str
    is_live: bool
    is_rollback: bool
    live_region_count: int
    number: int
    placement: dict | None
    region_count: int
    replicas_per_region: int
    rollback_reason: str | None
    rollback_source_release_id: str | None
    rollback_target_release_id: str | None
    rollout_predecessor_id: str | None
    rollout_status: str
    rollout_strategy: str
    service: dict
    source_ref: str | None
    status: str
    total_replicas: int
    trigger_kind: str
    updated_at: str


class DeploymentLoadMatch(TypedDict):
    id: str
    organization_id: str


class DeploymentDashboardNomad(TypedDict):
    pass


class DeploymentDashboardNomadLoadMatchRequired(TypedDict):
    app_id: str


class DeploymentDashboardNomadLoadMatch(DeploymentDashboardNomadLoadMatchRequired, total=False):
    environment: str
    location: str
    service: str


class DeploymentDetail(TypedDict):
    activity: list
    app: Any
    app_id: str | None
    audit_events: list
    capacity: dict
    data_resources: list
    deploy_targets: list
    deployments: list
    desired_states: list
    environments: list
    filters: dict
    health: dict
    nomad: dict
    operations: list
    placements: list
    reconciler_ticks: list
    releases: list
    runtime_instances: list
    service_bindings: list
    service_views: list
    storage_resources: list


class DeploymentDetailLoadMatchRequired(TypedDict):
    organization_id: str


class DeploymentDetailLoadMatch(DeploymentDetailLoadMatchRequired, total=False):
    app: str
    environment: str
    service: str


class DeploymentFile(TypedDict):
    pass


class DeploymentFileUpdateData(TypedDict):
    deployment_id: str
    static_site_id: str


class DeploymentLog(TypedDict):
    allocation_id: str
    app_environment_id: str | None
    app_release_id: str | None
    app_service_id: str | None
    details: Any
    environment_name: str
    release_version: str | None
    service_name: str
    status: str
    task: str | None
    unreachable_reason: str | None


class DeploymentLogListMatchRequired(TypedDict):
    organization_id: str


class DeploymentLogListMatch(DeploymentLogListMatchRequired, total=False):
    app: str
    environment: str
    limit: int
    log_location: str
    log_service: str
    service: str


class DeploymentMetric(TypedDict):
    auto_deploy: bool
    environment_id: str
    environment_name: str
    placement_id: str
    redeploy: bool
    region_count: int
    replicas_per_region: int
    rollout_strategy: str
    service_id: str
    service_name: str
    source_ref: str | None


class DeploymentMetricListMatchRequired(TypedDict):
    organization_id: str


class DeploymentMetricListMatch(DeploymentMetricListMatchRequired, total=False):
    app: str
    environment: str
    metrics_range: str
    service: str


class DeploymentPreviewRequired(TypedDict):
    access: str
    app_environment_id: str
    app_name: str
    app_preview_profile_id: str
    app_slug: str
    change_number: int | None
    expires_at: str
    generation: int
    health: str
    hosted_app_id: str
    id: str
    latest_operation_status: str | None
    name: str
    owner_name: str | None
    profile_name: str
    retained: bool
    slug: str
    snapshot_version: int
    source_revision: str
    status: str
    urls: list


class DeploymentPreview(DeploymentPreviewRequired, total=False):
    created_at: str
    created_by_user_id: str
    resource_overrides: dict
    updated_at: str
    vcs_change_id: str | None


class DeploymentPreviewListMatchRequired(TypedDict):
    organization_id: str


class DeploymentPreviewListMatch(DeploymentPreviewListMatchRequired, total=False):
    app: str
    change: str
    expiry: str
    health: str
    owner: str
    page: int


class DeploymentSetting(TypedDict):
    code: str
    created_at: str
    id: str
    name: str
    nomad_datacenter: str
    updated_at: str


class DeploymentSettingListMatchRequired(TypedDict):
    organization_id: str


class DeploymentSettingListMatch(DeploymentSettingListMatchRequired, total=False):
    app: str
    environment: str
    service: str


class DesktopLocalAgentModel(TypedDict):
    id: str
    name: str


class DesktopLocalAgentModelListMatch(TypedDict):
    organization_id: str


class DesktopLocalAgentResponseRequired(TypedDict):
    input: list
    model: str
    store: bool
    stream: bool


class DesktopLocalAgentResponse(DesktopLocalAgentResponseRequired, total=False):
    max_output_tokens: int


class DesktopLocalAgentResponseCreateDataRequired(TypedDict):
    organization_id: str
    input: list
    model: str
    store: bool
    stream: bool


class DesktopLocalAgentResponseCreateData(DesktopLocalAgentResponseCreateDataRequired, total=False):
    max_output_tokens: int


class DeviceRequired(TypedDict):
    architecture: str
    channel: str
    coding_connection: dict | None
    connection_checked_at: str | None
    connection_status: str
    control_delivery_policy: dict
    control_spawn_policy: dict
    created_at: str
    device: dict
    environment: str
    execution_available: bool
    id: str
    name: str
    native_device_id: str
    paired_at: str
    pairing_generation: int
    platform: str
    project_visibility: dict
    revoked_at: str | None
    user_browser_access: str


class Device(DeviceRequired, total=False):
    provider_status: list
    scheduled_check_ins: bool


class DeviceLoadMatch(TypedDict):
    id: str
    organization_id: str


class DeviceListMatchRequired(TypedDict):
    organization_id: str


class DeviceListMatch(DeviceListMatchRequired, total=False):
    cursor: str
    include_revoked: bool


class DeviceCreateDataRequired(TypedDict):
    id: str
    organization_id: str
    architecture: str
    channel: str
    name: str
    pairing_generation: int
    platform: str


class DeviceCreateData(DeviceCreateDataRequired, total=False):
    access: Any
    folders: Any
    max_agents: Any
    mode: Any
    public_key: Any
    repositories: Any
    restricted: Any
    transport: Any
    version: Any


class DeviceBrowserOperation(TypedDict):
    command: str
    created_at: str
    id: str


class DeviceBrowserOperationListMatch(TypedDict):
    device_id: str
    organization_id: str


class DeviceBrowserOperationCreateDataRequired(TypedDict):
    device_id: str
    id: str
    organization_id: str


class DeviceBrowserOperationCreateData(DeviceBrowserOperationCreateDataRequired, total=False):
    claim_token: Any
    response: Any


class DeviceControlMessage(TypedDict):
    agent_id: str
    agent_name: str
    expires_at: str
    id: str
    sender: str | None
    text: str | None
    text_omitted: bool
    thread: dict


class DeviceControlMessageListMatchRequired(TypedDict):
    device_id: str
    organization_id: str


class DeviceControlMessageListMatch(DeviceControlMessageListMatchRequired, total=False):
    cursor: str


class DeviceControlOperationRequired(TypedDict):
    action: str
    arguments: dict
    created_at: str
    delivery: dict
    device_id: str
    end: dict
    expires_at: str
    id: str
    key: str
    provider: str
    references: dict
    result: Any
    result_expired: bool
    state: str


class DeviceControlOperation(DeviceControlOperationRequired, total=False):
    diagnostic_code: str


class DeviceControlOperationLoadMatch(TypedDict):
    device_id: str
    id: str
    organization_id: str


class DeviceControlOperationCreateData(TypedDict):
    device_id: str
    organization_id: str
    action: str
    arguments: dict
    key: str


class DeviceEnterpriseRelay(TypedDict):
    pass


class DeviceEnterpriseRelayLoadMatch(TypedDict):
    pass


class DeviceFolderListingRequired(TypedDict):
    id: str
    key: str
    state: str


class DeviceFolderListing(DeviceFolderListingRequired, total=False):
    code: str
    error: str
    folders: list
    parent: str | None
    path: str
    truncated: bool


class DeviceFolderListingLoadMatch(TypedDict):
    device_id: str
    id: str
    organization_id: str


class DeviceFolderListingCreateData(TypedDict):
    device_id: str
    organization_id: str
    key: str
    path: str


class DeviceGrant(TypedDict):
    agent_id: str
    agent_name: str | None
    can_edit: bool
    can_revoke: bool
    capabilities: list
    created_at: str
    id: str
    principal_id: str
    principal_name: str | None
    revision: int
    revoked_at: str | None
    updated_at: str


class DeviceGrantListMatchRequired(TypedDict):
    device_id: str
    organization_id: str


class DeviceGrantListMatch(DeviceGrantListMatchRequired, total=False):
    cursor: str


class DeviceGrantCreateData(TypedDict):
    device_id: str
    organization_id: str
    agent_id: str
    capabilities: list
    principal_id: str


class DeviceInvocation(TypedDict):
    pass


class DeviceInvocationCreateDataRequired(TypedDict):
    device_id: str
    organization_id: str


class DeviceInvocationCreateData(DeviceInvocationCreateDataRequired, total=False):
    challenge: Any
    invocation_id: Any
    request_hash: Any
    signature: Any


class DeviceLocalEvent(TypedDict):
    event: str
    recorded: bool


class DeviceLocalEventCreateData(TypedDict):
    device_id: str
    organization_id: str
    event: str


class DevicePairingRequired(TypedDict):
    architecture: str
    channel: str
    name: str
    platform: str
    public_key: str


class DevicePairing(DevicePairingRequired, total=False):
    id: str


class DevicePairingCreateData(TypedDict):
    organization_id: str
    architecture: str
    channel: str
    name: str
    platform: str
    public_key: str


class DeviceProject(TypedDict, total=False):
    id: str


class DeviceProjectRemoveMatch(TypedDict):
    device_id: str
    id: str
    organization_id: str


class DeviceScheduledCheckIn(TypedDict):
    enabled: bool


class DeviceScheduledCheckInCreateData(TypedDict):
    device_id: str
    organization_id: str
    enabled: bool


class DockerBuilderRequired(TypedDict):
    backend: str
    created_at: str | None
    generation: int
    id: str
    last_activity_at: str | None
    organization_id: str
    ready_at: str | None
    slept_at: str | None
    slug: str
    startup_attempt: int
    startup_failure: str | None
    startup_stage: str | None
    status: str
    updated_at: str | None


class DockerBuilder(DockerBuilderRequired, total=False):
    gateway_url: str | None


class DockerBuilderLoadMatch(TypedDict):
    id: str
    organization_id: str


class DockerBuilderListMatchRequired(TypedDict):
    organization_id: str


class DockerBuilderListMatch(DockerBuilderListMatchRequired, total=False):
    slug: str


class DockerBuilderCreateDataRequired(TypedDict):
    organization_id: str


class DockerBuilderCreateData(DockerBuilderCreateDataRequired, total=False):
    backend: str
    slug: str


class DockerBuilderUpdateData(TypedDict):
    id: str
    organization_id: str


class DockerBuilderPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class DockerBuilderPatchData(DockerBuilderPatchDataRequired, total=False):
    slug: str


class DockerBuilderSessionRequired(TypedDict):
    created_at: str
    docker_builder_id: str
    expires_at: str
    generation: int
    id: str
    organization_id: str
    revoked_at: str | None
    user_id: str


class DockerBuilderSession(DockerBuilderSessionRequired, total=False):
    gateway_url: str | None


class DockerBuilderSessionLoadMatch(TypedDict):
    id: str
    organization_id: str


class DockerBuilderSessionCreateData(TypedDict):
    docker_builder_id: str
    organization_id: str


class DockerBuilderSessionRemoveMatch(TypedDict):
    id: str
    organization_id: str


class DockerBuilderSetting(TypedDict):
    docker_builder_settings: dict
    idle_timeout_seconds: int
    max_concurrency: int
    organization_id: str
    region: str
    runtime_timeout_seconds: int


class DockerBuilderSettingListMatch(TypedDict):
    organization_id: str


class DockerBuilderSettingUpdateData(TypedDict):
    organization_id: str


class DockerBuilderSettingPatchDataRequired(TypedDict):
    organization_id: str


class DockerBuilderSettingPatchData(DockerBuilderSettingPatchDataRequired, total=False):
    idle_timeout_seconds: int
    max_concurrency: int
    region: str
    runtime_timeout_seconds: int


class DomainDnsIntegration(TypedDict):
    account_label: str | None
    api_token: str
    created_at: str
    failure_message: str | None
    has_token: bool
    id: str
    last_verified_at: str | None
    organization_id: str
    provider: str
    status: str
    updated_at: str


class DomainDnsIntegrationListMatch(TypedDict):
    organization_id: str


class DomainDnsIntegrationCreateDataRequired(TypedDict):
    organization_id: str
    api_token: str


class DomainDnsIntegrationCreateData(DomainDnsIntegrationCreateDataRequired, total=False):
    account_label: str | None


class DomainPathRule(TypedDict):
    action_kind: str
    app_service_endpoint_id: str | None
    app_service_id: str | None
    backend_ref: str | None
    created_at: str
    id: str
    last_error: str | None
    path_prefix: str
    status: str
    updated_at: str


class DomainPathRuleLoadMatch(TypedDict):
    app_id: str
    domain_id: str
    id: str


class DomainPathRuleListMatch(TypedDict):
    app_id: str
    domain_id: str


class DomainPathRuleCreateDataRequired(TypedDict):
    app_id: str
    domain_id: str
    app_service_id: str | None
    path_prefix: str


class DomainPathRuleCreateData(DomainPathRuleCreateDataRequired, total=False):
    app_service_endpoint_id: str | None


class DomainPathRuleUpdateDataRequired(TypedDict):
    app_id: str
    domain_id: str
    id: str


class DomainPathRuleUpdateData(DomainPathRuleUpdateDataRequired, total=False):
    app_service_endpoint_id: str | None
    app_service_id: str | None
    path_prefix: str


class DomainPathRulePatchDataRequired(TypedDict):
    app_id: str
    domain_id: str
    id: str


class DomainPathRulePatchData(DomainPathRulePatchDataRequired, total=False):
    app_service_endpoint_id: str | None
    app_service_id: str | None
    path_prefix: str


class DomainPathRuleRemoveMatch(TypedDict):
    app_id: str
    domain_id: str
    id: str


class Dream(TypedDict):
    attention: bool
    changes: list
    completed_at: str | None
    counts: dict
    dream: Any
    error_code: str | None
    id: str
    pagination: dict
    permissions: dict
    phase: str
    reason: str | None
    reviewed: int
    reviewed_date: str
    runs: list
    scope_name: str
    skipped: int
    tab: str
    timezone: str


class DreamLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class DreamLoadMatch(DreamLoadMatchRequired, total=False):
    page: int
    tab: str


class DreamListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class DreamListMatch(DreamListMatchRequired, total=False):
    page: int


class DreamCreateData(TypedDict):
    id: str
    organization_id: str
    project_id: str
    attention: bool
    changes: list
    completed_at: str | None
    counts: dict
    dream: Any
    error_code: str | None
    pagination: dict
    permissions: dict
    phase: str
    reason: str | None
    reviewed: int
    reviewed_date: str
    runs: list
    scope_name: str
    skipped: int
    tab: str
    timezone: str


class Edge(TypedDict):
    pass


class EdgeLoadMatch(TypedDict):
    pass


class EmailVerification(TypedDict):
    pass


class EmailVerificationCreateData(TypedDict, total=False):
    email: Any


class EnvironmentRequired(TypedDict):
    active_revision_id: str | None
    agent_sign_up_available: bool
    allowed_actions: str
    billing: dict
    cleanup: list
    connection: str
    created_at: str
    default_policy_json: dict
    discovery_defaults: dict
    environment: dict
    hosted_app_id: str | None
    id: str
    imessage_number: str | None
    included_deep_scan: bool
    lock_version: int
    managed_google_available: bool
    managed_google_email: str
    name: str
    network_connections: list
    organization_id: str
    permissions: dict
    project_id: str | None
    repository_id: str | None
    revisions: list
    sign_in_check_available: bool
    slug: str
    status: str
    target_kind: str | None
    target_url: str | None
    test_accounts: dict
    updated_at: str
    verify_network_connection_id: str | None


class Environment(EnvironmentRequired, total=False):
    default_policy: dict
    exploration_accounts: list
    explorations: list
    first_run: Any
    messaging_tester_number: str | None
    onboarding_discovery: Any
    pending_accounts: list
    setup_discovery_id: str | None
    version: int


class EnvironmentLoadMatchRequired(TypedDict):
    organization_id: str


class EnvironmentLoadMatch(EnvironmentLoadMatchRequired, total=False):
    id: str
    project_id: str


class EnvironmentCreateDataRequired(TypedDict):
    organization_id: str
    slug: str


class EnvironmentCreateData(EnvironmentCreateDataRequired, total=False):
    allowed_actions: str
    default_policy: dict
    imessage_number: str | None
    messaging_tester_number: str | None
    name: str
    project_id: str | None
    repository_id: str | None
    target_kind: str | None
    target_url: str | None


class EnvironmentUpdateData(TypedDict):
    id: str
    organization_id: str


class EnvironmentPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class EnvironmentPatchData(EnvironmentPatchDataRequired, total=False):
    allowed_actions: str
    imessage_number: str | None
    messaging_tester_number: str | None
    name: str
    target_url: str | None
    verify_network_connection_id: str | None
    version: int


class EnvironmentRemoveMatch(TypedDict):
    id: str
    organization_id: str


class EnvironmentDiscoveryRunRequired(TypedDict):
    account_id: str | None
    deadline_at: str
    environment_revision_id: str
    failure_code: str | None
    id: str
    queued_at: str
    recording: dict
    result: dict | None
    status: str


class EnvironmentDiscoveryRun(EnvironmentDiscoveryRunRequired, total=False):
    evidence: list


class EnvironmentDiscoveryRunLoadMatch(TypedDict):
    environment_id: str
    id: str
    organization_id: str


class EnvironmentDiscoveryRunCreateDataRequired(TypedDict):
    environment_id: str
    organization_id: str


class EnvironmentDiscoveryRunCreateData(EnvironmentDiscoveryRunCreateDataRequired, total=False):
    account_id: str | None


class EnvironmentExplorationRequired(TypedDict):
    agent_filters: dict
    agents: list
    concurrency: int
    covered_areas: list
    created_at: str
    deadline_at: str
    demo_project: dict | None
    ended_early: bool
    environment_id: str
    environment_name: str
    explorer_activity: dict
    finding_count: int
    findings: list
    findings_fix_prompt: str | None
    goal: str
    huntable_flows: list
    id: str
    max_seconds: int
    max_testers: int
    next_scan_improvements: list
    onboarding: bool
    paywalled: bool
    permissions: dict
    priority_counts: dict
    related_explorations: list
    report: dict
    reproduction_of: dict | None
    reproductions: list
    saves_scenarios: bool
    scannable_flows: list
    scenario_generation: dict
    sign_in_needs_answer: bool
    sign_in_outcome: str
    status: str
    time_limit_reached: bool
    unlock: Any
    web_url: str


class EnvironmentExploration(EnvironmentExplorationRequired, total=False):
    account_id: str | None
    can_continue: bool
    chat_messages: list
    finished_at: str | None
    idempotency_key: str
    mode: str
    observed_at: str
    persona_id: str | None
    project_id: str | None
    sign_in_question: str | None
    startup_retryable: bool
    title: str


class EnvironmentExplorationCreateDataRequired(TypedDict):
    environment_id: str
    organization_id: str
    project_id: str
    goal: str


class EnvironmentExplorationCreateData(EnvironmentExplorationCreateDataRequired, total=False):
    account_id: str | None
    concurrency: int
    idempotency_key: str
    max_seconds: int
    max_testers: int
    persona_id: str | None


class EnvironmentFirstRun(TypedDict):
    pass


class EnvironmentFirstRunCreateData(TypedDict):
    environment_id: str
    organization_id: str


class EnvironmentRevisionRequired(TypedDict):
    allowed_origins: list
    app_environment_id: str | None
    app_release_id: str | None
    blueprint: dict
    blueprint_json: dict
    cleanup_state: str
    created_at: str
    digest: str
    expires_at: str | None
    id: str
    organization_id: str
    ready_at: str | None
    resolved_manifest_json: dict
    retention_policy_json: dict
    revision: int
    revoked_at: str | None
    runner_environment_revision_id: str | None
    safety_policy_json: dict
    schema_version: int
    source_metadata_json: dict
    status: str
    updated_at: str
    validation_json: dict
    verify_environment_id: str


class EnvironmentRevision(EnvironmentRevisionRequired, total=False):
    dry_run: bool
    source_metadata: dict


class EnvironmentRevisionLoadMatch(TypedDict):
    environment_id: str
    id: str
    organization_id: str


class EnvironmentRevisionCreateDataRequired(TypedDict):
    environment_id: str
    organization_id: str
    blueprint: dict


class EnvironmentRevisionCreateData(EnvironmentRevisionCreateDataRequired, total=False):
    dry_run: bool
    source_metadata: dict


class EnvironmentRevisionUpdateData(TypedDict):
    environment_id: str
    id: str
    organization_id: str


class EnvironmentSecretBindingRequired(TypedDict):
    env_key: str


class EnvironmentSecretBinding(EnvironmentSecretBindingRequired, total=False):
    id: str
    mode: str
    secret_id: str
    secret_version_id: str


class EnvironmentSecretBindingLoadMatch(TypedDict):
    app_id: str
    environment_id: str


class EnvironmentSecretBindingCreateDataRequired(TypedDict):
    app_id: str
    environment_id: str
    env_key: str


class EnvironmentSecretBindingCreateData(EnvironmentSecretBindingCreateDataRequired, total=False):
    mode: str
    secret_id: str
    secret_version_id: str


class EnvironmentSecretBindingRemoveMatch(TypedDict):
    app_id: str
    environment_id: str
    id: str


class EnvironmentTestAccountRequired(TypedDict):
    configured: bool
    credentials: list
    persona: str
    revision_id: str
    role: str
    tenant: str


class EnvironmentTestAccount(EnvironmentTestAccountRequired, total=False):
    id: str


class EnvironmentTestAccountListMatch(TypedDict):
    environment_id: str
    organization_id: str


class EnvironmentTestAccountUpdateData(TypedDict):
    environment_id: str
    id: str
    organization_id: str


class EnvironmentTestAccountPatchDataRequired(TypedDict):
    environment_id: str
    id: str
    organization_id: str


class EnvironmentTestAccountPatchData(EnvironmentTestAccountPatchDataRequired, total=False):
    credentials: list
    revision_id: str


class Evidence(TypedDict, total=False):
    id: str


class EvidenceLoadMatchRequired(TypedDict):
    organization_id: str


class EvidenceLoadMatch(EvidenceLoadMatchRequired, total=False):
    id: str
    agent_id: str
    cursor: str
    exploration_id: str
    kind: str
    limit: int
    repository_id: str
    scenario_run_id: str


class ExecutionDesiredStateRequired(TypedDict):
    desired_state: dict
    stop_observed: bool


class ExecutionDesiredState(ExecutionDesiredStateRequired, total=False):
    id: str


class ExecutionDesiredStateLoadMatch(TypedDict):
    id: str


class ExecutionDesiredStateCreateData(TypedDict):
    pass


class ExecutionDesiredStateUpdateData(TypedDict):
    id: str


class ExecutionDesiredStatePatchData(TypedDict):
    id: str


class ExecutionDesiredStateRemoveMatch(TypedDict):
    id: str


class ExecutionReconcilerTick(TypedDict, total=False):
    id: str


class ExecutionReconcilerTickLoadMatch(TypedDict):
    id: str


class ExecutionReconcilerTickCreateData(TypedDict):
    pass


class ExecutionRelease(TypedDict, total=False):
    id: str


class ExecutionReleaseLoadMatch(TypedDict):
    id: str


class ExecutionReleaseCreateData(TypedDict):
    pass


class ExecutionRuntimeInstance(TypedDict):
    adapter_kind: str
    app_environment_id: str
    app_release_id: str | None
    app_service_id: str
    booted_at: str | None
    booted_at_label: str | None
    created_at: str
    created_at_label: str | None
    hosted_app_id: str
    id: str
    instance_key: str
    last_reconciled_at: str | None
    last_reconciled_at_label: str | None
    last_seen_at: str | None
    last_seen_at_label: str | None
    location: Any
    location_id: str
    network_peer_id: str | None
    nomad_allocation_id: str | None
    nomad_task_name: str | None
    organization_id: str
    private_ipv4: str | None
    private_ipv6: str | None
    provider_instance_id: str | None
    public_endpoint: str | None
    service_name: str
    slug: str
    status: str
    terminated_at: str | None
    terminated_at_label: str | None
    updated_at: str
    updated_at_label: str | None


class ExecutionRuntimeInstanceLoadMatch(TypedDict):
    id: str


class ExecutionRuntimeInstanceListMatch(TypedDict, total=False):
    app_environment_id: str
    app_service_id: str
    hosted_app_id: str
    limit: int
    page: int


class ExecutionRuntimeInstanceCreateData(TypedDict):
    pass


class ExecutionRuntimeInstanceUpdateData(TypedDict):
    id: str


class ExecutionRuntimeInstancePatchData(TypedDict):
    id: str


class ExecutionRuntimeInstanceRemoveMatch(TypedDict):
    id: str


class ExplorationRequired(TypedDict):
    agent_filters: dict
    agents: list
    check_count: int
    concurrency: int
    covered_areas: list
    created_at: str
    deadline_at: str
    demo_project: dict | None
    duration_ms: int | None
    ended_early: bool
    environment_id: str
    environment_name: str
    explorer_activity: dict
    finding_count: int
    findings: list
    findings_fix_prompt: str | None
    goal: str
    huntable_flows: list
    id: str
    max_seconds: int
    max_testers: int
    next_scan_improvements: list
    onboarding: bool
    paywalled: bool
    permissions: dict
    priority_counts: dict
    related_explorations: list
    report: dict
    reproduction_of: dict | None
    reproductions: list
    saves_scenarios: bool
    scannable_flows: list
    scenario_generation: dict
    sign_in_needs_answer: bool
    sign_in_outcome: str
    started_at: str
    status: str
    time_limit_reached: bool
    unlock: Any
    web_url: str


class Exploration(ExplorationRequired, total=False):
    account_id: str | None
    can_continue: bool
    chat_messages: list
    credential_name: str | None
    finished_at: str | None
    idempotency_key: str
    mode: str
    observed_at: str
    persona_id: str | None
    project_id: str | None
    scenario_count: int
    scenarios_pending: bool
    sign_in_question: str | None
    startup_retryable: bool
    title: str


class ExplorationLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class ExplorationLoadMatch(ExplorationLoadMatchRequired, total=False):
    agent_id: str
    evidence: str
    finding_id: str
    project_id: str


class ExplorationListMatchRequired(TypedDict):
    organization_id: str


class ExplorationListMatch(ExplorationListMatchRequired, total=False):
    launch: bool
    page: int
    project_id: str


class ExplorationCreateDataRequired(TypedDict):
    organization_id: str
    environment_id: str
    goal: str


class ExplorationCreateData(ExplorationCreateDataRequired, total=False):
    project_id: str
    account_id: str | None
    concurrency: int
    idempotency_key: str
    max_seconds: int
    max_testers: int
    persona_id: str | None


class ExplorationMessageRequired(TypedDict):
    agent_filters: dict
    agents: list
    concurrency: int
    covered_areas: list
    created_at: str
    deadline_at: str
    demo_project: dict | None
    ended_early: bool
    environment_id: str
    environment_name: str
    explorer_activity: dict
    finding_count: int
    findings: list
    findings_fix_prompt: str | None
    goal: str
    huntable_flows: list
    id: str
    max_seconds: int
    max_testers: int
    next_scan_improvements: list
    onboarding: bool
    paywalled: bool
    permissions: dict
    priority_counts: dict
    related_explorations: list
    report: dict
    reproduction_of: dict | None
    reproductions: list
    saves_scenarios: bool
    scannable_flows: list
    scenario_generation: dict
    sign_in_needs_answer: bool
    sign_in_outcome: str
    status: str
    text: str
    time_limit_reached: bool
    unlock: Any
    web_url: str


class ExplorationMessage(ExplorationMessageRequired, total=False):
    can_continue: bool
    chat_messages: list
    finished_at: str | None
    mode: str
    observed_at: str
    project_id: str | None
    sign_in_question: str | None
    startup_retryable: bool
    title: str


class ExplorationMessageCreateDataRequired(TypedDict):
    exploration_id: str
    organization_id: str
    text: str


class ExplorationMessageCreateData(ExplorationMessageCreateDataRequired, total=False):
    project_id: str


class ExplorationReport(TypedDict):
    pass


class ExplorationReportLoadMatchRequired(TypedDict):
    exploration_id: str
    organization_id: str


class ExplorationReportLoadMatch(ExplorationReportLoadMatchRequired, total=False):
    project_id: str


class ExplorationReportCreateDataRequired(TypedDict):
    exploration_id: str
    organization_id: str


class ExplorationReportCreateData(ExplorationReportCreateDataRequired, total=False):
    project_id: str
    source_ids: Any


class ExplorationScenarioRequired(TypedDict):
    agent_filters: dict
    agents: list
    concurrency: int
    covered_areas: list
    created_at: str
    deadline_at: str
    demo_project: dict | None
    ended_early: bool
    environment_id: str
    environment_name: str
    explorer_activity: dict
    finding_count: int
    findings: list
    findings_fix_prompt: str | None
    goal: str
    huntable_flows: list
    id: str
    max_seconds: int
    max_testers: int
    next_scan_improvements: list
    onboarding: bool
    paywalled: bool
    permissions: dict
    priority_counts: dict
    related_explorations: list
    report: dict
    reproduction_of: dict | None
    reproductions: list
    saves_scenarios: bool
    scannable_flows: list
    scenario_generation: dict
    sign_in_needs_answer: bool
    sign_in_outcome: str
    status: str
    time_limit_reached: bool
    unlock: Any
    web_url: str


class ExplorationScenario(ExplorationScenarioRequired, total=False):
    can_continue: bool
    chat_messages: list
    finished_at: str | None
    mode: str
    observed_at: str
    project_id: str | None
    sign_in_question: str | None
    startup_retryable: bool
    title: str


class ExplorationScenarioCreateDataRequired(TypedDict):
    exploration_id: str
    organization_id: str


class ExplorationScenarioCreateData(ExplorationScenarioCreateDataRequired, total=False):
    project_id: str


class FindingRequired(TypedDict):
    confidence: str
    created_at: str
    finding: dict
    fingerprint: str
    first_seen_at: str
    id: str
    last_seen_at: str
    locked: bool
    occurrence_count: int
    organization_id: str
    permissions: dict
    reported_occurrence: dict | None
    repository_id: str | None
    safe_summary: str
    severity: str
    status: str
    title: str
    updated_at: str
    verification: Any


class Finding(FindingRequired, total=False):
    deferred_until: str | None
    reason: str
    scenario_occurrences: list


class FindingLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class FindingLoadMatch(FindingLoadMatchRequired, total=False):
    repository_id: str


class FindingListMatchRequired(TypedDict):
    organization_id: str


class FindingListMatch(FindingListMatchRequired, total=False):
    status: str


class FindingUpdateData(TypedDict):
    id: str
    organization_id: str


class FindingPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class FindingPatchData(FindingPatchDataRequired, total=False):
    repository_id: str
    deferred_until: str | None
    reason: str
    status: str


class GhRequired(TypedDict):
    capabilities: dict
    content: dict
    fetched_at: str
    magic_merge: dict | None
    pull_request: Any
    stack: dict
    transcript_paths: list


class Gh(GhRequired, total=False):
    id: str


class GhLoadMatchRequired(TypedDict):
    gh_id: str
    github_repo: str
    id: str
    organization_id: str


class GhLoadMatch(GhLoadMatchRequired, total=False):
    check_id: str
    cursor: str
    job_id: str
    page: int
    run_id: str
    section: str
    thread_id: str


class GitImportRequired(TypedDict):
    destination_mode: str
    git_status: str
    git_url: str
    id: str
    idempotency_key: str
    native_status: str
    organization: str
    root_path: str
    slug: str
    source_branch: str
    target_branch: str


class GitImport(GitImportRequired, total=False):
    error: str | None
    git_default_branch: str
    name: str
    repository_id: str | None


class GitImportLoadMatch(TypedDict):
    id: str


class GitImportCreateDataRequired(TypedDict):
    organization_id: str
    destination_mode: str
    idempotency_key: str
    root_path: str
    slug: str
    source_branch: str


class GitImportCreateData(GitImportCreateDataRequired, total=False):
    git_default_branch: str
    name: str
    target_branch: str


class Github(TypedDict):
    pass


class GithubLoadMatch(TypedDict):
    name: str
    owner: str


class GithubApp(TypedDict):
    pass


class GithubAppCreateData(TypedDict):
    pass


class GithubAppImportableRepository(TypedDict):
    account_login: str
    github_app_installation_id: str
    next_page: int | None
    repositories: list


class GithubAppImportableRepositoryListMatch(TypedDict, total=False):
    github_app_installation_id: str
    page: int


class GithubAppInstallation(TypedDict):
    account_avatar_url: str | None
    account_id: str | None
    account_login: str
    created_at: str
    created_at_label: str | None
    id: str
    installation_id: str
    installed_at: str | None
    installed_at_label: str | None
    manage_access_url: str
    organization_id: str
    permission_entries: list
    permissions: dict
    status: str
    suspended_at: str | None
    suspended_at_label: str | None
    updated_at: str
    updated_at_label: str | None


class GithubAppInstallationListMatch(TypedDict):
    organization_id: str


class GithubAppInstallationCreateData(TypedDict):
    id: str
    organization_id: str
    account_avatar_url: str | None
    account_id: str | None
    account_login: str
    created_at: str
    created_at_label: str | None
    installation_id: str
    installed_at: str | None
    installed_at_label: str | None
    manage_access_url: str
    permission_entries: list
    permissions: dict
    status: str
    suspended_at: str | None
    suspended_at_label: str | None
    updated_at: str
    updated_at_label: str | None


class GithubAppInstallationRemoveMatchRequired(TypedDict):
    id: str
    organization_id: str


class GithubAppInstallationRemoveMatch(GithubAppInstallationRemoveMatchRequired, total=False):
    force: bool
    uninstall_on_github: bool


class GithubAppInstallationAuthorization(TypedDict):
    installation_url: str
    organization_slug: str
    return_target: str


class GithubAppInstallationAuthorizationCreateData(TypedDict):
    organization_slug: str
    return_target: str


class GithubAppUserAuthorization(TypedDict):
    pass


class GithubAppUserAuthorizationCreateData(TypedDict):
    pass


class GithubCiRepository(TypedDict):
    adoption_mode: str
    check_name_prefix: str
    ci_runner_pool_id: str | None
    created_at: str
    created_at_label: str | None
    default_branch: str
    github_app_installation_id: str
    github_repository_id: str
    id: str
    last_compatibility_status: str | None
    last_error_message: str | None
    last_head_sha: str | None
    last_pull_request_number: int | None
    last_ref: str | None
    last_webhook_action: str | None
    last_webhook_at: str | None
    last_webhook_at_label: str | None
    last_webhook_delivery_id: str | None
    last_webhook_event: str | None
    metadata: dict
    organization_id: str
    permission_status: str
    repository_full_name: str
    repository_name: str
    repository_owner: str
    status: str
    updated_at: str
    updated_at_label: str | None
    webhook_delivery_count: int


class GithubCiRepositoryLoadMatch(TypedDict):
    id: str
    organization_id: str


class GithubCiRepositoryListMatchRequired(TypedDict):
    organization_id: str


class GithubCiRepositoryListMatch(GithubCiRepositoryListMatchRequired, total=False):
    adoption_mode: str
    status: str


class GithubCiRepositoryCreateDataRequired(TypedDict):
    organization_id: str
    github_app_installation_id: str
    github_repository_id: str
    repository_name: str
    repository_owner: str


class GithubCiRepositoryCreateData(GithubCiRepositoryCreateDataRequired, total=False):
    adoption_mode: str
    check_name_prefix: str
    ci_runner_pool_id: str | None
    default_branch: str
    status: str


class GithubCiRepositoryUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class GithubCiRepositoryUpdateData(GithubCiRepositoryUpdateDataRequired, total=False):
    adoption_mode: str
    check_name_prefix: str
    ci_runner_pool_id: str | None
    default_branch: str
    permission_status: str
    status: str


class GithubCiRepositoryPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class GithubCiRepositoryPatchData(GithubCiRepositoryPatchDataRequired, total=False):
    adoption_mode: str
    check_name_prefix: str
    ci_runner_pool_id: str | None
    default_branch: str
    permission_status: str
    status: str


class GithubCiRepositoryCompatibilityReport(TypedDict):
    analyzed_at: str
    analyzed_at_label: str | None
    ci_pipeline_id: str | None
    ci_pipeline_run_id: str | None
    created_at: str
    created_at_label: str | None
    diagnostics: list
    errors: list
    event_action: str | None
    event_name: str
    execution_allowed: bool
    github_ci_repository_id: str
    head_sha: str | None
    id: str
    metadata: dict
    organization_id: str
    parser_version: str
    pull_request_number: int | None
    ref_name: str | None
    referenced_actions: list
    required_secrets: list
    runner_labels: list
    source_blob_sha: str | None
    source_sha: str
    status: str
    supported_features: dict
    updated_at: str
    updated_at_label: str | None
    warnings: list
    workflow_name: str | None
    workflow_path: str


class GithubCiRepositoryCompatibilityReportLoadMatch(TypedDict):
    github_ci_repository_id: str
    id: str
    organization_id: str


class GithubCiRepositoryCompatibilityReportListMatchRequired(TypedDict):
    github_ci_repository_id: str
    organization_id: str


class GithubCiRepositoryCompatibilityReportListMatch(GithubCiRepositoryCompatibilityReportListMatchRequired, total=False):
    event_name: str
    source_sha: str
    status: str


class GithubConnectionRequired(TypedDict):
    accounts: list
    github_app_installation_id: str
    installations: list
    repositories: list


class GithubConnection(GithubConnectionRequired, total=False):
    project_id: str
    replace: bool


class GithubConnectionLoadMatchRequired(TypedDict):
    organization_id: str


class GithubConnectionLoadMatch(GithubConnectionLoadMatchRequired, total=False):
    github_app_installation_id: str
    project_id: str


class GithubConnectionCreateDataRequired(TypedDict):
    organization_id: str
    github_app_installation_id: str
    repositories: list


class GithubConnectionCreateData(GithubConnectionCreateDataRequired, total=False):
    project_id: str
    replace: bool


class GithubIntegration(TypedDict):
    account_avatar_url: str | None
    account_login: str
    connection_status: str
    connection_status_label: str
    github_installation: Any
    health: dict
    id: str
    imported_repositories_count: int
    imported_repositories_count_label: str
    organization: dict
    pagination: dict
    repositories: list


class GithubIntegrationLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class GithubIntegrationLoadMatch(GithubIntegrationLoadMatchRequired, total=False):
    page: int


class GithubIntegrationListMatch(TypedDict):
    organization_id: str


class GithubOnboarding(TypedDict):
    accounts: list
    active_batch_id: str | None
    batches: list
    capabilities: dict
    installations: list


class GithubOnboardingLoadMatch(TypedDict):
    organization_id: str


class GithubOnboardingBranch(TypedDict):
    branches: list


class GithubOnboardingBranchListMatch(TypedDict):
    organization_id: str
    github_app_installation_id: str
    name: str
    owner: str


class GithubOnboardingImport(TypedDict):
    account_login: str
    complete: bool
    created_at: str
    failed_item_count: int
    github_app_installation_id: str
    id: str
    imported_item_count: int
    item_count: int
    items: list
    repositories: Any
    status: str
    terminal_item_count: int
    updated_at: str


class GithubOnboardingImportCreateData(TypedDict):
    organization_id: str
    github_app_installation_id: str
    repositories: Any


class GithubOnboardingImportBatch(TypedDict):
    account_login: str
    complete: bool
    created_at: str
    failed_item_count: int
    github_app_installation_id: str
    id: str
    imported_item_count: int
    item_count: int
    items: list
    status: str
    terminal_item_count: int
    updated_at: str


class GithubOnboardingImportBatchLoadMatch(TypedDict):
    id: str
    organization_id: str


class GithubOnboardingImportItem(TypedDict, total=False):
    id: str


class GithubOnboardingImportItemCreateData(TypedDict):
    id: str
    organization_id: str


class GithubPullRequestRequired(TypedDict):
    capabilities: dict
    content: dict
    fetched_at: str
    magic_merge: dict | None
    pull_request: Any
    stack: dict
    transcript_paths: list


class GithubPullRequest(GithubPullRequestRequired, total=False):
    id: str


class GithubPullRequestLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    pull_request_id: str


class GithubPullRequestLoadMatch(GithubPullRequestLoadMatchRequired, total=False):
    check_id: str
    cursor: str
    job_id: str
    page: int
    run_id: str
    section: str
    thread_id: str


class GithubPullRequestCreateData(TypedDict):
    organization_id: str


class GithubRunnerAdmission(TypedDict):
    pass


class GithubRunnerAdmissionCreateData(TypedDict):
    pass


class GithubRunnerCacheRequired(TypedDict):
    ok: bool
    operation: str


class GithubRunnerCache(GithubRunnerCacheRequired, total=False):
    entry_id: str
    key: str
    matched_key: str
    restore_keys: list
    signed_download_url: str
    size_bytes: str
    upload_path: str
    version: str


class GithubRunnerCacheCreateDataRequired(TypedDict):
    operation: str


class GithubRunnerCacheCreateData(GithubRunnerCacheCreateDataRequired, total=False):
    entry_id: str
    key: str
    restore_keys: list
    size_bytes: str
    version: str


class GithubRunnerEgress(TypedDict):
    can_request: bool
    cidr: str | None
    ipv4: str | None
    requested_at_label: str | None
    status: str


class GithubRunnerEgressLoadMatch(TypedDict):
    organization_id: str


class GithubRunnerEgressCreateData(TypedDict):
    organization_id: str


class GithubRunnerHistoryRequired(TypedDict):
    activity: list
    counts: dict
    observed_at: str
    pagination: dict
    repositories: list
    runs: list
    success_rate: int | None
    usage: dict


class GithubRunnerHistory(GithubRunnerHistoryRequired, total=False):
    setup: Any


class GithubRunnerHistoryLoadMatchRequired(TypedDict):
    organization_id: str


class GithubRunnerHistoryLoadMatch(GithubRunnerHistoryLoadMatchRequired, total=False):
    day: int
    page: int
    q: str
    repository: str
    status: str


class GithubRunnerImage(TypedDict):
    created_at: str
    id: str
    image_reference: str
    last_error: str | None
    modal_image_id: str | None
    name: str
    registry_secret_name: str | None
    status: str
    updated_at: str


class GithubRunnerImageLoadMatch(TypedDict):
    id: str
    organization_id: str


class GithubRunnerImageListMatch(TypedDict):
    organization_id: str


class GithubRunnerImageCreateDataRequired(TypedDict):
    organization_id: str
    image_reference: str
    name: str


class GithubRunnerImageCreateData(GithubRunnerImageCreateDataRequired, total=False):
    registry_secret_name: str | None


class GithubRunnerPoolRequired(TypedDict):
    cpu_millicores: int
    enabled: bool
    github_app_installation_id: str
    github_repository_id: str
    github_runner_image: Any
    id: str
    invocations: list
    label: str
    last_error: str | None
    last_polled_at: str | None
    max_concurrency: int
    memory_mb: int
    organization_id: str
    provider: str
    repository_full_name: str
    runtime_kind: str
    timeout_seconds: int


class GithubRunnerPool(GithubRunnerPoolRequired, total=False):
    image: str | None


class GithubRunnerPoolListMatch(TypedDict):
    organization_id: str


class GithubRunnerPoolCreateDataRequired(TypedDict):
    organization_id: str
    github_app_installation_id: str
    repository_full_name: str


class GithubRunnerPoolCreateData(GithubRunnerPoolCreateDataRequired, total=False):
    enabled: bool
    image: str | None
    label: str
    max_concurrency: int
    provider: str
    timeout_seconds: int


class GithubRunnerPoolUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class GithubRunnerPoolUpdateData(GithubRunnerPoolUpdateDataRequired, total=False):
    enabled: bool
    image: str | None
    max_concurrency: int
    provider: str
    timeout_seconds: int


class GithubRunnerSetup(TypedDict):
    error: str | None
    github_repository_connection_id: str
    id: str
    pull_request_url: str | None
    repository_full_name: str
    roder_thread_id: str | None
    runner_labels: list
    status: str
    status_label: str
    summary: str | None


class GithubRunnerSetupLoadMatch(TypedDict):
    organization_id: str
    id: str


class GithubRunnerSetupCreateData(TypedDict):
    organization_id: str
    github_repository_connection_id: str


class GitlabRequired(TypedDict):
    configured: bool
    connections: list
    integrations: list
    next_page: int | None
    organization: dict
    projects: list
    redirect_uri: str | None
    selected_integration_id: str | None


class Gitlab(GitlabRequired, total=False):
    inventory_error: str | None


class GitlabLoadMatchRequired(TypedDict):
    organization_id: str


class GitlabLoadMatch(GitlabLoadMatchRequired, total=False):
    connection_id: str
    integration_id: str
    page: int
    search: str
    sort: str


class GitlabCreateDataRequired(TypedDict):
    organization_id: str


class GitlabCreateData(GitlabCreateDataRequired, total=False):
    client_id: Any
    client_secret: Any
    instance_url: Any
    integration_id: Any
    return_target: Any
    webhook_authentication: Any


class GitlabConnection(TypedDict, total=False):
    id: str


class GitlabConnectionCreateDataRequired(TypedDict):
    id: str
    organization_id: str


class GitlabConnectionCreateData(GitlabConnectionCreateDataRequired, total=False):
    action_name: Any
    integration_id: Any
    source_branch: Any


class GitlabImportRequired(TypedDict):
    integration_id: str
    project_id: int


class GitlabImport(GitlabImportRequired, total=False):
    repo_slug: str
    source_branch: str


class GitlabImportCreateDataRequired(TypedDict):
    organization_id: str
    integration_id: str
    project_id: int


class GitlabImportCreateData(GitlabImportCreateDataRequired, total=False):
    repo_slug: str
    source_branch: str


class GitlabOauth(TypedDict):
    pass


class GitlabOauthLoadMatch(TypedDict):
    pass


class GrantAllAgent(TypedDict):
    all_agents_access: bool
    enabled: bool
    execution_available: bool


class GrantAllAgentCreateData(TypedDict):
    device_id: str
    organization_id: str
    enabled: bool


class HostingAppDomain(TypedDict):
    app_environment_id: str | None
    app_service_id: str | None
    certificate: dict | None
    created_at: str
    dns_mode: str
    dns_status: str
    failure_message: str | None
    hosted_app_id: str
    hostname: str
    id: str
    kind: str
    last_checked_at: str | None
    path_rules: list
    record_name: str | None
    record_type: str | None
    record_value: str | None
    redirect_to: str | None
    static_site_id: str | None
    target_kind: str
    tls_status: str
    updated_at: str
    verification_record: dict | None
    verification_status: str


class HostingAppDomainLoadMatchRequired(TypedDict):
    app_id: str


class HostingAppDomainLoadMatch(HostingAppDomainLoadMatchRequired, total=False):
    id: str
    app_environment_id: str


class HostingAppDomainCreateDataRequired(TypedDict):
    app_id: str
    app_service_id: str | None
    hostname: str
    kind: str


class HostingAppDomainCreateData(HostingAppDomainCreateDataRequired, total=False):
    app_environment_id: str | None
    dns_status: str
    redirect_to: str | None
    tls_status: str


class HostingAppDomainUpdateData(TypedDict):
    app_id: str
    id: str


class HostingAppDomainPatchData(TypedDict):
    app_id: str
    id: str


class HostingAppDomainRemoveMatch(TypedDict):
    app_id: str
    id: str


class IdentityOrganization(TypedDict, total=False):
    id: str


class IdentityOrganizationLoadMatch(TypedDict):
    id: str


class ImageRepositoryRequired(TypedDict):
    auth_configured: bool
    created_at: str
    created_at_label: str | None
    hosted_app_id: str | None
    id: str
    name: str
    organization_id: str
    provider_kind: str
    repository_path: str
    slug: str
    status: str
    updated_at: str
    updated_at_label: str | None
    visibility: str


class ImageRepository(ImageRepositoryRequired, total=False):
    registry_auth_token: str


class ImageRepositoryListMatch(TypedDict):
    organization_id: str


class ImageRepositoryCreateDataRequired(TypedDict):
    organization_id: str
    name: str
    slug: str


class ImageRepositoryCreateData(ImageRepositoryCreateDataRequired, total=False):
    hosted_app_id: str | None
    provider_kind: str
    registry_auth_token: str
    repository_path: str
    status: str
    visibility: str


class ImageRepositoryTag(TypedDict):
    image_repository: dict
    name: str
    registry_url: str
    tags: list


class ImageRepositoryTagListMatch(TypedDict):
    image_repository_id: str


class ImportBranchPolicy(TypedDict):
    can_manage_pr_scenario_writing: bool
    can_manage_sandbox_region: bool
    dedicated_outbound_ip_addresses: list
    default_trunk_bookmark: str
    organization: dict
    sandbox_regions: list


class ImportBranchPolicyLoadMatch(TypedDict):
    organization_id: str


class ImportBranchPolicyUpdateData(TypedDict):
    organization_id: str


class ImportBranchPolicyPatchDataRequired(TypedDict):
    organization_id: str


class ImportBranchPolicyPatchData(ImportBranchPolicyPatchDataRequired, total=False):
    default_trunk_bookmark: str


class Integration(TypedDict):
    github: dict
    gitlab: dict
    permissions: dict
    slack: dict


class IntegrationLoadMatch(TypedDict):
    organization_id: str


class InteractionResponse(TypedDict):
    answer: dict
    conversation_id: str
    expected_revision: int


class InteractionResponseCreateData(TypedDict):
    agent_id: str
    interaction_id: str
    organization_id: str
    answer: dict
    conversation_id: str
    expected_revision: int


class InvitationRequired(TypedDict):
    accepted_at: str | None
    accepted_by_user: Any
    created_at: str
    created_at_label: str | None
    email: str
    expires_at: str | None
    expires_at_label: str | None
    id: str
    invite_url: str | None
    invited_by_user: Any
    organization: dict
    revoked_at: str | None
    role: str
    status: str
    updated_at: str
    updated_at_label: str | None


class Invitation(InvitationRequired, total=False):
    email_delivery_status: str


class InvitationListMatch(TypedDict):
    organization_id: str


class InvitationCreateData(TypedDict):
    organization_id: str
    email: str
    role: str


class InvitationRemoveMatch(TypedDict):
    id: str
    organization_id: str


class InvocationControl(TypedDict):
    pass


class InvocationControlCreateDataRequired(TypedDict):
    device_id: str
    organization_id: str


class InvocationControlCreateData(InvocationControlCreateDataRequired, total=False):
    challenge: Any
    invocation_id: Any
    request_hash: Any
    signature: Any


class JobLogChunk(TypedDict):
    byte_size: int
    ci_job_id: str | None
    ci_pipeline_run_id: str | None
    ci_step_id: str | None
    content: str
    content_format: str
    created_at: str
    id: str
    organization_id: str
    sequence_number: int
    stream: str
    updated_at: str


class JobLogChunkListMatchRequired(TypedDict):
    job_id: str
    pipeline_id: str
    run_id: str


class JobLogChunkListMatch(JobLogChunkListMatchRequired, total=False):
    after_sequence: int


class JobLogChunkCreateData(TypedDict):
    job_id: str
    pipeline_id: str
    run_id: str


class JobStep(TypedDict, total=False):
    id: str


class JobStepLoadMatch(TypedDict):
    job_id: str
    pipeline_id: str
    run_id: str


class JobStepCreateData(TypedDict):
    job_id: str
    pipeline_id: str
    run_id: str


class JobStepUpdateData(TypedDict):
    id: str
    job_id: str
    pipeline_id: str
    run_id: str


class JobStepPatchData(TypedDict):
    id: str
    job_id: str
    pipeline_id: str
    run_id: str


class JobWorkspace(TypedDict, total=False):
    id: str


class JobWorkspaceLoadMatch(TypedDict):
    job_id: str
    pipeline_id: str
    run_id: str


class JobWorkspaceCreateData(TypedDict):
    job_id: str
    pipeline_id: str
    run_id: str


class JobWorkspaceUpdateData(TypedDict):
    id: str
    job_id: str
    pipeline_id: str
    run_id: str


class JobWorkspacePatchData(TypedDict):
    id: str
    job_id: str
    pipeline_id: str
    run_id: str


class JourneyVariantReplayRequired(TypedDict):
    actor_id: str | None
    can_request_qualification: bool
    created_at: str
    failure_code: str | None
    failure_message: str | None
    id: str
    idempotency_key: str
    preparation_receipt: dict | None
    qualification: Any
    qualification_status: str
    replay_required: bool
    review_reason: str
    run_id: str | None
    scenario_file: dict
    scenario_run_id: str | None
    source_digest: str
    status: str
    updated_at: str
    variant_id: str


class JourneyVariantReplay(JourneyVariantReplayRequired, total=False):
    max_seconds: int


class JourneyVariantReplayCreateDataRequired(TypedDict):
    journey_variant_id: str
    organization_id: str
    project_id: str
    idempotency_key: str
    review_reason: str
    scenario_file: dict


class JourneyVariantReplayCreateData(JourneyVariantReplayCreateDataRequired, total=False):
    actor_id: str | None
    max_seconds: int


class Knowledge(TypedDict):
    content_digest: str
    content_json: dict
    document: dict
    documents: list
    dreaming: dict
    expected_digest: str
    history: list
    id: str
    kind: str
    markdown: str
    observed_at: str
    organization: dict
    permissions: dict
    project_id: str
    project_name: str
    projects: list
    selected_project_id: str | None
    source: dict
    title: str
    total: int


class KnowledgeLoadMatchRequired(TypedDict):
    organization_id: str


class KnowledgeLoadMatch(KnowledgeLoadMatchRequired, total=False):
    id: str
    project_id: str
    q: str


class KnowledgeCreateData(TypedDict):
    organization_id: str
    markdown: str
    project_id: str
    title: str


class KnowledgeUpdateData(TypedDict):
    id: str
    organization_id: str


class KnowledgePatchDataRequired(TypedDict):
    id: str
    organization_id: str


class KnowledgePatchData(KnowledgePatchDataRequired, total=False):
    expected_digest: str
    markdown: str
    title: str


class KnowledgeRemoveMatch(TypedDict):
    id: str
    organization_id: str


class Known(TypedDict):
    pass


class KnownLoadMatch(TypedDict):
    pass


class Label(TypedDict):
    changes_count: int
    id: str
    name: str
    slug: str


class LabelListMatchRequired(TypedDict):
    organization_id: str


class LabelListMatch(LabelListMatchRequired, total=False):
    include_unused: bool
    limit: int
    q: str


class LeaseArtifact(TypedDict):
    pass


class LeaseArtifactCreateData(TypedDict):
    lease_id: str
    node_id: str


class LeaseCache(TypedDict):
    pass


class LeaseCacheCreateData(TypedDict):
    lease_id: str
    node_id: str


class LeaseLogChunk(TypedDict):
    pass


class LeaseLogChunkCreateData(TypedDict):
    lease_id: str
    node_id: str


class LeaseReconciliation(TypedDict, total=False):
    id: str


class LeaseReconciliationCreateData(TypedDict):
    id: str
    lease_id: str
    node_id: str


class LeaseStep(TypedDict, total=False):
    id: str


class LeaseStepUpdateData(TypedDict):
    id: str
    lease_id: str
    node_id: str


class LeaseVerifyDiagnosticRequired(TypedDict):
    browser_events: dict
    live_browser: dict
    live_view: dict


class LeaseVerifyDiagnostic(LeaseVerifyDiagnosticRequired, total=False):
    steps: list


class LeaseVerifyDiagnosticCreateDataRequired(TypedDict):
    lease_id: str
    swarm_id: str
    task_id: str
    browser_events: dict
    live_browser: dict
    live_view: dict


class LeaseVerifyDiagnosticCreateData(LeaseVerifyDiagnosticCreateDataRequired, total=False):
    steps: list


class LeaseVerifySecret(TypedDict):
    pass


class LeaseVerifySecretCreateData(TypedDict):
    lease_id: str
    swarm_id: str
    task_id: str


class LeaseWorkspace(TypedDict, total=False):
    id: str


class LeaseWorkspaceUpdateData(TypedDict):
    id: str
    lease_id: str
    node_id: str


class LocalAgentDecision(TypedDict):
    request: dict


class LocalAgentDecisionCreateData(TypedDict):
    organization_id: str
    request: dict


class LocalAgentResponseRequired(TypedDict):
    input: list
    model: str
    store: bool
    stream: bool


class LocalAgentResponse(LocalAgentResponseRequired, total=False):
    service_tier: str | None
    tools: list


class LocalAgentResponseCreateDataRequired(TypedDict):
    organization_id: str
    input: list
    model: str
    store: bool
    stream: bool


class LocalAgentResponseCreateData(LocalAgentResponseCreateDataRequired, total=False):
    service_tier: str | None
    tools: list


class LocalThreadDeliveryRequired(TypedDict):
    decision: str
    decision_pending: bool
    delivery: dict
    expected_version: int
    policy: dict
    recovery_message: str | None


class LocalThreadDelivery(LocalThreadDeliveryRequired, total=False):
    id: str


class LocalThreadDeliveryLoadMatchRequired(TypedDict):
    agent_id: str
    id: str
    local_thread_id: str
    organization_id: str


class LocalThreadDeliveryLoadMatch(LocalThreadDeliveryLoadMatchRequired, total=False):
    expected_version: int


class LocalThreadDeliveryUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    local_thread_id: str
    organization_id: str


class LocalThreadDeliveryUpdateData(LocalThreadDeliveryUpdateDataRequired, total=False):
    decision: str
    expected_version: int


class LocalThreadOperationRequired(TypedDict):
    action: str
    arguments: dict
    created_at: str
    delivery: dict
    device_id: str
    end: dict
    expires_at: str
    id: str
    key: str
    provider: str
    references: dict
    result: Any
    result_expired: bool
    state: str


class LocalThreadOperation(LocalThreadOperationRequired, total=False):
    diagnostic_code: str


class LocalThreadOperationLoadMatchRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class LocalThreadOperationLoadMatch(LocalThreadOperationLoadMatchRequired, total=False):
    local_thread_id: str


class LocalThreadOperationCreateData(TypedDict):
    agent_id: str
    local_thread_id: str
    organization_id: str
    action: str
    arguments: dict
    key: str


class Location(TypedDict):
    code: str
    created_at: str
    id: str
    name: str
    nomad_datacenter: str
    updated_at: str


class LocationListMatch(TypedDict, total=False):
    code: str
    created_at: str
    id: str
    name: str
    nomad_datacenter: str
    updated_at: str


class LogStreamChunk(TypedDict, total=False):
    id: str


class LogStreamChunkLoadMatchRequired(TypedDict):
    log_stream_id: str
    space_id: str


class LogStreamChunkLoadMatch(LogStreamChunkLoadMatchRequired, total=False):
    id: str


class LogStreamChunkCreateData(TypedDict):
    log_stream_id: str
    space_id: str


class LogoImageRequired(TypedDict):
    activated_products: list
    can_activate_products: bool
    created_at: str
    created_at_label: str | None
    github_prs_authored_by_change_author: bool
    id: str
    logo_url: str | None
    member_count: int
    name: str
    pending_invitation_count: int
    personal: bool
    repository_count: int
    role: str | None
    sandbox_region: str
    slug: str
    timezone: str
    updated_at: str
    updated_at_label: str | None
    verify_pr_scenario_writing_enabled: bool


class LogoImage(LogoImageRequired, total=False):
    agents_only: bool
    shared_agent_personal_accounts_enabled: bool
    source_control_providers: list
    source_ui_enabled: bool


class LogoImageUpdateData(TypedDict):
    organization_id: str


class LogoImageRemoveMatch(TypedDict):
    organization_id: str


class MarketingSetting(TypedDict):
    call_first: bool


class MarketingSettingLoadMatch(TypedDict, total=False):
    call_first: bool


class McpOauth(TypedDict):
    pass


class McpOauthLoadMatch(TypedDict):
    request: str


class McpOauthCreateData(TypedDict, total=False):
    all_organizations: Any
    approve: Any
    organization_id: Any
    request: Any


class MeRequired(TypedDict):
    active_organization: Any
    analytics_internal: bool
    app_promotion: dict
    commit_author_email: str
    email: str
    enabled_features: list
    github_pr_user_authorization_connected: bool
    github_pr_user_authorization_login: str | None
    github_prs_authored_by_change_author: bool
    id: str
    impersonation: dict | None
    name: str | None
    onboarding: dict
    organizations: list
    pending_organization_invitation_count: int
    pending_organization_invitation_count_label: str
    picture_url: str | None


class Me(MeRequired, total=False):
    analytics_distinct_id: str
    api_base_url: str
    api_token: str
    next_path: str
    openai_sign_in_connected: bool
    openai_sign_in_enabled: bool
    superadmin: bool
    time_zone: str | None


class MeLoadMatchRequired(TypedDict):
    id: str


class MeLoadMatch(MeLoadMatchRequired, total=False):
    active_organization: Any
    analytics_distinct_id: str
    analytics_internal: bool
    api_base_url: str
    api_token: str
    app_promotion: dict
    commit_author_email: str
    email: str
    enabled_features: list
    github_pr_user_authorization_connected: bool
    github_pr_user_authorization_login: str | None
    github_prs_authored_by_change_author: bool
    impersonation: dict | None
    name: str | None
    next_path: str
    onboarding: dict
    openai_sign_in_connected: bool
    openai_sign_in_enabled: bool
    organizations: list
    pending_organization_invitation_count: int
    pending_organization_invitation_count_label: str
    picture_url: str | None
    superadmin: bool
    time_zone: str | None


class MeCreateData(TypedDict, total=False):
    action_name: Any
    confirmation: Any


class MeUpdateData(TypedDict):
    pass


class MeRemoveMatchRequired(TypedDict):
    id: str


class MeRemoveMatch(MeRemoveMatchRequired, total=False):
    active_organization: Any
    analytics_distinct_id: str
    analytics_internal: bool
    api_base_url: str
    api_token: str
    app_promotion: dict
    commit_author_email: str
    email: str
    enabled_features: list
    github_pr_user_authorization_connected: bool
    github_pr_user_authorization_login: str | None
    github_prs_authored_by_change_author: bool
    impersonation: dict | None
    name: str | None
    next_path: str
    onboarding: dict
    openai_sign_in_connected: bool
    openai_sign_in_enabled: bool
    organizations: list
    pending_organization_invitation_count: int
    pending_organization_invitation_count_label: str
    picture_url: str | None
    superadmin: bool
    time_zone: str | None


class MeEmailRequired(TypedDict):
    account: bool
    can_delete: bool
    can_resend_verification: bool
    can_set_account: bool
    can_set_commit_author: bool
    commit_author: bool
    email: str
    emails: list
    id: str
    verification_status: str
    verified: bool


class MeEmail(MeEmailRequired, total=False):
    message: str


class MeEmailListMatch(TypedDict, total=False):
    account: bool
    can_delete: bool
    can_resend_verification: bool
    can_set_account: bool
    can_set_commit_author: bool
    commit_author: bool
    email: str
    emails: list
    id: str
    message: str
    verification_status: str
    verified: bool


class MeEmailCreateData(TypedDict):
    email: str


class MeEmailUpdateData(TypedDict):
    id: str


class MeEmailPatchDataRequired(TypedDict):
    id: str


class MeEmailPatchData(MeEmailPatchDataRequired, total=False):
    account: bool
    commit_author: bool


class MeEmailRemoveMatch(TypedDict):
    id: str


class MeOnboarding(TypedDict):
    pass


class MeOnboardingCreateData(TypedDict, total=False):
    step: Any


class MediaFile(TypedDict, total=False):
    id: str


class MediaFileLoadMatchRequired(TypedDict):
    browser_session_id: str
    id: str
    media_id: str
    organization_id: str


class MediaFileLoadMatch(MediaFileLoadMatchRequired, total=False):
    inline: bool


class MemberRequired(TypedDict):
    accepted_at: str | None
    accepted_by_user: Any
    created_at: str
    created_at_label: str | None
    email: str
    expires_at: str | None
    expires_at_label: str | None
    id: str
    invite_url: str | None
    invited_by_user: Any
    is_self: bool
    organization: dict
    revoked_at: str | None
    role: str
    status: str
    updated_at: str
    updated_at_label: str | None
    user: dict


class Member(MemberRequired, total=False):
    email_delivery_status: str


class MemberListMatch(TypedDict):
    organization_id: str


class MemberUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class MemberUpdateData(MemberUpdateDataRequired, total=False):
    role: str


class MemberPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class MemberPatchData(MemberPatchDataRequired, total=False):
    role: str


class MemberRemoveMatch(TypedDict):
    id: str
    organization_id: str


class MemoryRequired(TypedDict):
    confidence: str
    created_at: str
    finding: str
    history: list
    id: str
    indexed_at: str | None
    memory: dict
    scope: dict
    source: dict
    title: str


class Memory(MemoryRequired, total=False):
    environment_id: str
    project_id: str
    response: str
    tags: list
    workaround: str


class MemoryLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class MemoryLoadMatch(MemoryLoadMatchRequired, total=False):
    environment_id: str
    project_id: str


class MemoryListMatchRequired(TypedDict):
    organization_id: str


class MemoryListMatch(MemoryListMatchRequired, total=False):
    environment_id: str
    include_environment: bool
    project_id: str
    q: str
    tag: str


class MemoryCreateDataRequired(TypedDict):
    organization_id: str
    finding: str
    title: str


class MemoryCreateData(MemoryCreateDataRequired, total=False):
    environment_id: str
    project_id: str
    response: str
    tags: list
    workaround: str


class MemoryRemoveMatchRequired(TypedDict):
    id: str
    organization_id: str


class MemoryRemoveMatch(MemoryRemoveMatchRequired, total=False):
    project_id: str


class MergeQueueEntryRequired(TypedDict):
    analytics: dict
    expected_version: int
    idempotency_key: str
    kind: str
    policy: dict
    queue: dict


class MergeQueueEntry(MergeQueueEntryRequired, total=False):
    change_id: str | None
    expected_target_commit_id: str | None
    expected_target_version: int | None
    github_pr_number: int | None
    id: str
    priority: str
    target_branches: list
    when_ready: bool | None


class MergeQueueEntryCreateDataRequired(TypedDict):
    merge_queue_id: str
    organization_id: str
    repo_id: str
    expected_version: int
    idempotency_key: str
    kind: str


class MergeQueueEntryCreateData(MergeQueueEntryCreateDataRequired, total=False):
    change_id: str | None
    expected_target_commit_id: str | None
    expected_target_version: int | None
    github_pr_number: int | None
    priority: str
    when_ready: bool | None


class MergeQueueEntryRemoveMatch(TypedDict):
    id: str
    merge_queue_id: str
    organization_id: str
    repo_id: str


class MergeRequestRequired(TypedDict):
    available_tests: list
    base_sha: str
    comment_url: str | None
    draft: bool
    findings: list
    github_repository: str | None
    github_url: str | None
    head_sha: str
    id: str
    idempotency_key: str
    number: int
    pagination: dict
    permissions: dict
    preview_cleanup_ready: bool
    project_id: str | None
    project_slug: str | None
    provider: str
    pull_request: dict
    repository_id: str
    request_label: str
    requested_run_id: str | None
    runs: list
    source_branch: str | None
    source_repository: str | None
    source_url: str | None
    state: str
    title: str
    updated_at: str
    web_path: str


class MergeRequest(MergeRequestRequired, total=False):
    branch: str
    current_run: Any
    preview_url: str | None
    project: Any


class MergeRequestLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class MergeRequestLoadMatch(MergeRequestLoadMatchRequired, total=False):
    page: int


class MergeRequestCreateDataRequired(TypedDict):
    organization_id: str
    idempotency_key: str
    number: int


class MergeRequestCreateData(MergeRequestCreateDataRequired, total=False):
    branch: str
    head_sha: str
    project_id: str | None
    repository_id: str


class MergeResolutionRequired(TypedDict):
    action: str
    base: str
    duration_ms: int
    fallback: bool
    ours: str
    resolved: bool
    theirs: str


class MergeResolution(MergeResolutionRequired, total=False):
    content: str | None
    context: dict
    model: str
    path: str


class MergeResolutionCreateDataRequired(TypedDict):
    base: str
    ours: str
    theirs: str


class MergeResolutionCreateData(MergeResolutionCreateDataRequired, total=False):
    context: dict
    path: str


class MessagingConversationMessageRequired(TypedDict):
    attachment_limit: int
    attachment_max_bytes: int
    client_operation_id: str
    content: str
    media: dict
    messages: list
    send_blocked_reason: str | None


class MessagingConversationMessage(MessagingConversationMessageRequired, total=False):
    id: str
    media_upload_ids: list
    reply_to: str
    retry_attachment: bool
    send_disposition: str
    send_error: str | None
    send_style: str | None


class MessagingConversationMessageCreateDataRequired(TypedDict):
    messaging_conversation_id: str
    organization_id: str
    project_id: str
    client_operation_id: str
    content: str
    media: dict


class MessagingConversationMessageCreateData(MessagingConversationMessageCreateDataRequired, total=False):
    media_upload_ids: list
    reply_to: str
    retry_attachment: bool
    send_style: str | None


class MessagingConversationUpload(TypedDict):
    attachment: dict
    upload_id: str


class MessagingConversationUploadCreateData(TypedDict):
    messaging_conversation_id: str
    organization_id: str
    project_id: str


class MetricQuery(TypedDict):
    pass


class MetricQueryLoadMatch(TypedDict):
    pass


class MetronomeWebhook(TypedDict):
    pass


class MetronomeWebhookCreateData(TypedDict):
    pass


class ModelSubscriptionAccountRequired(TypedDict):
    accounts: list
    agents: list
    can_disconnect: bool
    connection_agent: dict | None
    id: str
    label: str
    provider: str
    saved: bool
    status: str
    usable: bool


class ModelSubscriptionAccount(ModelSubscriptionAccountRequired, total=False):
    email: str


class ModelSubscriptionAccountListMatch(TypedDict, total=False):
    accounts: list
    agents: list
    can_disconnect: bool
    connection_agent: dict | None
    email: str
    id: str
    label: str
    provider: str
    saved: bool
    status: str
    usable: bool


class ModelSubscriptionAccountCreateDataRequired(TypedDict):
    label: str


class ModelSubscriptionAccountCreateData(ModelSubscriptionAccountCreateDataRequired, total=False):
    action_name: Any
    agent_id: Any
    profile_id: Any
    token: Any


class ModelSubscriptionAccountUpdateData(TypedDict):
    id: str


class ModelSubscriptionAccountPatchDataRequired(TypedDict):
    id: str


class ModelSubscriptionAccountPatchData(ModelSubscriptionAccountPatchDataRequired, total=False):
    label: str


class ModelSubscriptionAccountRemoveMatch(TypedDict):
    id: str


class ModelSubscriptionAccountConnection(TypedDict, total=False):
    id: str


class ModelSubscriptionAccountConnectionLoadMatch(TypedDict):
    id: str


class ModelSubscriptionAccountConnectionUpdateDataRequired(TypedDict):
    id: str


class ModelSubscriptionAccountConnectionUpdateData(ModelSubscriptionAccountConnectionUpdateDataRequired, total=False):
    action_name: Any
    login_id: Any
    method: Any
    step_id: Any
    value: Any


class NetworkConnectionRequired(TypedDict):
    created_at: str
    id: str
    name: str
    updated_at: str


class NetworkConnection(NetworkConnectionRequired, total=False):
    aws_client_vpn_profile: str
    device_tag: str
    oauth_client_id: str
    oauth_client_secret: str
    provider: str
    status: str


class NetworkConnectionCreateDataRequired(TypedDict):
    organization_id: str
    name: str


class NetworkConnectionCreateData(NetworkConnectionCreateDataRequired, total=False):
    aws_client_vpn_profile: str
    device_tag: str
    oauth_client_id: str
    oauth_client_secret: str
    provider: str
    status: str


class NetworkConnectionUpdateData(TypedDict):
    id: str
    organization_id: str


class NetworkConnectionPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class NetworkConnectionPatchData(NetworkConnectionPatchDataRequired, total=False):
    aws_client_vpn_profile: str
    device_tag: str
    name: str
    oauth_client_id: str
    oauth_client_secret: str
    provider: str
    status: str


class NetworkingSpace(TypedDict, total=False):
    id: str


class NetworkingSpaceLoadMatch(TypedDict):
    id: str


class NetworkingSpaceCreateData(TypedDict):
    pass


class NetworkingSpaceUpdateData(TypedDict):
    id: str


class NetworkingSpacePatchData(TypedDict):
    id: str


class NetworkingSpaceRemoveMatch(TypedDict):
    id: str


class Node(TypedDict):
    account_avatar_url: str | None
    account_id: str | None
    account_login: str
    created_at: str
    created_at_label: str | None
    id: str
    installation_id: str
    installed_at: str | None
    installed_at_label: str | None
    manage_access_url: str
    organization_id: str
    permission_entries: list
    permissions: dict
    status: str
    suspended_at: str | None
    suspended_at_label: str | None
    updated_at: str
    updated_at_label: str | None


class NodeListMatch(TypedDict):
    organization_id: str


class NodeCertificate(TypedDict):
    pass


class NodeCertificateCreateData(TypedDict):
    node_id: str


class NodeLease(TypedDict, total=False):
    id: str


class NodeLeaseLoadMatch(TypedDict):
    node_id: str


class NodeLeaseCreateData(TypedDict):
    id: str
    node_id: str


class NomadAllocationRequired(TypedDict):
    allocation_id: str
    client_status: str | None
    create_time: str | None
    datacenter: str | None
    desired_description: str | None
    desired_status: str | None
    fetched_at: str
    job_id: str | None
    modify_time: str | None
    name: str | None
    namespace: str
    node_id: str | None
    node_name: str | None
    resources: dict
    task_group: str | None
    task_states: list


class NomadAllocation(NomadAllocationRequired, total=False):
    id: str
    verify_runner_images: list


class NomadAllocationLoadMatch(TypedDict):
    app_id: str
    id: str


class NomadLogRequired(TypedDict):
    allocation_id: str
    fetched_at: str
    logs: str
    namespace: str
    offset: int
    origin: str
    task: str
    type: str


class NomadLog(NomadLogRequired, total=False):
    environment: str
    location: str | None
    service: str


class NomadLogLoadMatchRequired(TypedDict):
    app_id: str


class NomadLogLoadMatch(NomadLogLoadMatchRequired, total=False):
    environment: str
    location: str
    offset: int
    origin: str
    service: str
    task: str
    type: str


class Now(TypedDict):
    needs_attention: list
    pagination: dict
    recently_landed: list
    shipping_now: list
    summary: dict


class NowLoadMatchRequired(TypedDict):
    organization_id: str


class NowLoadMatch(NowLoadMatchRequired, total=False):
    page: int


class ObservabilityClickhouseCluster(TypedDict, total=False):
    id: str


class ObservabilityClickhouseClusterLoadMatch(TypedDict):
    id: str


class ObservabilityClickhouseClusterCreateData(TypedDict):
    pass


class ObservabilityClickhouseClusterUpdateData(TypedDict):
    id: str


class ObservabilityClickhouseClusterPatchData(TypedDict):
    id: str


class ObservabilityClickhouseClusterRemoveMatch(TypedDict):
    id: str


class ObservabilityQuickwitCluster(TypedDict, total=False):
    id: str


class ObservabilityQuickwitClusterLoadMatch(TypedDict):
    id: str


class ObservabilityQuickwitClusterCreateData(TypedDict):
    pass


class ObservabilityQuickwitClusterUpdateData(TypedDict):
    id: str


class ObservabilityQuickwitClusterPatchData(TypedDict):
    id: str


class ObservabilityQuickwitClusterRemoveMatch(TypedDict):
    id: str


class ObservabilitySpace(TypedDict, total=False):
    id: str


class ObservabilitySpaceLoadMatch(TypedDict):
    id: str


class ObservabilitySpaceCreateData(TypedDict):
    pass


class ObservabilitySpaceUpdateData(TypedDict):
    id: str


class ObservabilitySpacePatchData(TypedDict):
    id: str


class ObservabilitySpaceRemoveMatch(TypedDict):
    id: str


class Openapi(TypedDict):
    pass


class OpenapiLoadMatch(TypedDict):
    pass


class OrgInvitationRequired(TypedDict):
    invitation: dict
    registration_options: Any
    requires_password_setup: bool
    start_guided_setup: bool


class OrgInvitation(OrgInvitationRequired, total=False):
    id: str


class OrgInvitationLoadMatch(TypedDict):
    id: str


class OrgInvitationCreateData(TypedDict):
    id: str


class OrganizationRequired(TypedDict):
    activated_products: list
    can_activate_products: bool
    created_at: str
    created_at_label: str | None
    github_prs_authored_by_change_author: bool
    id: str
    logo_url: str | None
    member_count: int
    name: str
    pending_invitation_count: int
    personal: bool
    repository_count: int
    role: str | None
    sandbox_region: str
    slug: str
    timezone: str
    updated_at: str
    updated_at_label: str | None
    verify_pr_scenario_writing_enabled: bool


class Organization(OrganizationRequired, total=False):
    agents_only: bool
    google_workspace_domain: str | None
    shared_agent_personal_accounts_enabled: bool
    source_control_providers: list
    source_ui_enabled: bool


class OrganizationLoadMatch(TypedDict):
    id: str


class OrganizationListMatch(TypedDict, total=False):
    activated_products: list
    agents_only: bool
    can_activate_products: bool
    created_at: str
    created_at_label: str | None
    github_prs_authored_by_change_author: bool
    google_workspace_domain: str | None
    id: str
    logo_url: str | None
    member_count: int
    name: str
    pending_invitation_count: int
    personal: bool
    repository_count: int
    role: str | None
    sandbox_region: str
    shared_agent_personal_accounts_enabled: bool
    slug: str
    source_control_providers: list
    source_ui_enabled: bool
    timezone: str
    updated_at: str
    updated_at_label: str | None
    verify_pr_scenario_writing_enabled: bool


class OrganizationCreateDataRequired(TypedDict):
    name: str
    slug: str


class OrganizationCreateData(OrganizationCreateDataRequired, total=False):
    timezone: str


class OrganizationUpdateDataRequired(TypedDict):
    id: str


class OrganizationUpdateData(OrganizationUpdateDataRequired, total=False):
    github_prs_authored_by_change_author: bool
    google_workspace_domain: str | None
    name: str
    sandbox_region: str
    shared_agent_personal_accounts_enabled: bool
    slug: str
    timezone: str
    verify_pr_scenario_writing_enabled: bool


class OrganizationPatchDataRequired(TypedDict):
    id: str


class OrganizationPatchData(OrganizationPatchDataRequired, total=False):
    github_prs_authored_by_change_author: bool
    google_workspace_domain: str | None
    name: str
    sandbox_region: str
    shared_agent_personal_accounts_enabled: bool
    slug: str
    timezone: str
    verify_pr_scenario_writing_enabled: bool


class OrganizationApp(TypedDict, total=False):
    id: str


class OrganizationAppLoadMatchRequired(TypedDict):
    organization_id: str
    native_agent_id: str


class OrganizationAppLoadMatch(OrganizationAppLoadMatchRequired, total=False):
    context: bool
    installed: bool


class OrganizationAppUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationAppRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationControl(TypedDict):
    pass


class OrganizationControlCreateDataRequired(TypedDict):
    organization_id: str


class OrganizationControlCreateData(OrganizationControlCreateDataRequired, total=False):
    device_id: Any
    native_device_id: Any
    pairing_generation: Any


class OrganizationDevice(TypedDict, total=False):
    id: str


class OrganizationDeviceCreateDataRequired(TypedDict):
    id: str
    organization_id: str


class OrganizationDeviceCreateData(OrganizationDeviceCreateDataRequired, total=False):
    payload: Any
    signature: Any


class OrganizationIdentityCertificate(TypedDict, total=False):
    id: str


class OrganizationIdentityCertificateLoadMatchRequired(TypedDict):
    organization_id: str


class OrganizationIdentityCertificateLoadMatch(OrganizationIdentityCertificateLoadMatchRequired, total=False):
    id: str


class OrganizationIdentityCertificateCreateData(TypedDict):
    organization_id: str


class OrganizationIdentityCertificateUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationIdentityCertificatePatchData(TypedDict):
    id: str
    organization_id: str


class OrganizationIdentityCertificateRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationInteraction(TypedDict):
    pass


class OrganizationInteractionCreateData(TypedDict):
    organization_id: str


class OrganizationInvitationRequired(TypedDict):
    email: str
    role: str


class OrganizationInvitation(OrganizationInvitationRequired, total=False):
    id: str


class OrganizationInvitationCreateData(TypedDict):
    organization_id: str
    email: str
    role: str


class OrganizationInvitationRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationMessageFile(TypedDict):
    pass


class OrganizationMessageFileCreateData(TypedDict):
    organization_id: str


class OrganizationOidcTrust(TypedDict, total=False):
    id: str


class OrganizationOidcTrustLoadMatchRequired(TypedDict):
    organization_id: str


class OrganizationOidcTrustLoadMatch(OrganizationOidcTrustLoadMatchRequired, total=False):
    id: str


class OrganizationOidcTrustCreateData(TypedDict):
    organization_id: str


class OrganizationOidcTrustUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationOidcTrustPatchData(TypedDict):
    id: str
    organization_id: str


class OrganizationOidcTrustRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationRunEvent(TypedDict):
    pass


class OrganizationRunEventCreateData(TypedDict):
    organization_id: str


class OrganizationRunOutcome(TypedDict):
    pass


class OrganizationRunOutcomeCreateData(TypedDict):
    organization_id: str


class OrganizationRunUsage(TypedDict):
    pass


class OrganizationRunUsageCreateData(TypedDict):
    organization_id: str


class OrganizationSandbox(TypedDict):
    pass


class OrganizationSandboxCreateData(TypedDict):
    organization_id: str


class OrganizationSecret(TypedDict):
    app_environment_id: str | None
    app_service_id: str | None
    created_at: str
    created_at_label: str | None
    created_by: dict | None
    current_version: dict | None
    description: str | None
    env_key: str
    expose_to_build: bool
    expose_to_ci: bool
    hosted_app_id: str | None
    id: str
    last_accessed_at: str | None
    last_accessed_at_label: str | None
    last_accessed_by: dict | None
    latest_version_number: int | None
    name: str
    organization_id: str | None
    owner_service_account_id: str | None
    rotation_policy: str | None
    scope_kind: str
    slug: str
    status: str
    updated_at: str
    updated_at_label: str | None


class OrganizationSecretLoadMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationSecretListMatch(TypedDict):
    organization_id: str


class OrganizationSecretCreateData(TypedDict):
    organization_id: str


class OrganizationSecretUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationSecretPatchData(TypedDict):
    id: str
    organization_id: str


class OrganizationSecretRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationServiceAccount(TypedDict, total=False):
    id: str


class OrganizationServiceAccountLoadMatchRequired(TypedDict):
    organization_id: str


class OrganizationServiceAccountLoadMatch(OrganizationServiceAccountLoadMatchRequired, total=False):
    id: str


class OrganizationServiceAccountCreateData(TypedDict):
    organization_id: str


class OrganizationServiceAccountUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationServiceAccountPatchData(TypedDict):
    id: str
    organization_id: str


class OrganizationServiceAccountRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationSetting(TypedDict, total=False):
    concurrent_run_limit_override: int | None
    customize_onboarding_packages: bool
    daily_run_limit_override: int | None
    deployment_usage_visibility: str
    monthly_browser_minutes_limit_override: int | None
    monthly_budget_dollars: str | float | None
    name: str
    onboarding_custom_pricing: bool
    onboarding_package_keys: list


class OrganizationSettingUpdateDataRequired(TypedDict):
    organization_id: str


class OrganizationSettingUpdateData(OrganizationSettingUpdateDataRequired, total=False):
    concurrent_run_limit_override: int | None
    customize_onboarding_packages: bool
    daily_run_limit_override: int | None
    deployment_usage_visibility: str
    monthly_browser_minutes_limit_override: int | None
    monthly_budget_dollars: str | float | None
    name: str
    onboarding_custom_pricing: bool
    onboarding_package_keys: list


class OrganizationSite(TypedDict, total=False):
    id: str


class OrganizationSiteLoadMatch(TypedDict):
    organization_id: str
    native_agent_id: str


class OrganizationSiteCreateData(TypedDict):
    organization_id: str


class OrganizationSiteUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationSiteRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OrganizationSubscription(TypedDict):
    pass


class OrganizationSubscriptionCreateData(TypedDict):
    organization_id: str


class OrganizationTool(TypedDict):
    arguments: dict
    native_agent_id: str
    tool: str


class OrganizationToolCreateData(TypedDict):
    organization_id: str
    arguments: dict
    native_agent_id: str
    tool: str


class OrganizationWorkloadIdentity(TypedDict, total=False):
    id: str


class OrganizationWorkloadIdentityLoadMatchRequired(TypedDict):
    organization_id: str


class OrganizationWorkloadIdentityLoadMatch(OrganizationWorkloadIdentityLoadMatchRequired, total=False):
    id: str


class OrganizationWorkloadIdentityCreateData(TypedDict):
    organization_id: str


class OrganizationWorkloadIdentityUpdateData(TypedDict):
    id: str
    organization_id: str


class OrganizationWorkloadIdentityPatchData(TypedDict):
    id: str
    organization_id: str


class OrganizationWorkloadIdentityRemoveMatch(TypedDict):
    id: str
    organization_id: str


class OtelIngest(TypedDict):
    pass


class OtelIngestCreateData(TypedDict):
    pass


class PageRequired(TypedDict):
    active_runs: list
    checkout_required: bool
    cli_signed_in_at: str | None
    counts: dict
    demo_project: dict | None
    environments: list
    included_deep_scan: bool
    organization: dict
    permissions: dict
    project: Any
    repositories: list
    runs: list
    runs_pagination: dict
    suggested_app_url: str | None
    url_first_start: bool


class Page(PageRequired, total=False):
    onboarding_discovery: Any
    pull_request_launch_options: list
    pull_requests: list


class PageLoadMatchRequired(TypedDict):
    organization_id: str


class PageLoadMatch(PageLoadMatchRequired, total=False):
    page: int
    project_id: str
    query: str
    section: str
    status: str
    verify_environment_id: str


class PageAgentRequired(TypedDict):
    agents: list
    can_edit_integration_connections: bool
    creation_enabled: bool
    integration_choices: list
    integration_choices_truncated: bool
    integration_selected: list
    new_configuration: Any
    organization_id: str
    pagination: dict
    pinned_agent: Any
    platform_event_types: list
    repository_choices: list
    repository_choices_truncated: bool
    selected_agent: Any
    selected_reference: str | None
    viewer_id: str


class PageAgent(PageAgentRequired, total=False):
    inbox: Any
    model_choices: list
    runtime_versions: list


class PageAgentLoadMatchRequired(TypedDict):
    organization_id: str


class PageAgentLoadMatch(PageAgentLoadMatchRequired, total=False):
    agent: str
    agent_search: str
    agent_visibility: str
    cursor: str
    integration_search: str
    limit: int


class PageAgentCreateDataRequired(TypedDict):
    organization_id: str


class PageAgentCreateData(PageAgentCreateDataRequired, total=False):
    agent_ids: Any


class PageArtefactRequired(TypedDict):
    artefact: Any
    automation: dict | None
    byte_size: int
    checksum_sha256: str
    comment_threads: list
    content_type: str
    draft: dict | None
    filename: str
    id: str
    kind: str
    kinds: list
    organization: dict
    organization_id: str
    pagination: dict
    permissions: dict
    preview: dict
    published_at_label: str | None
    publisher: dict | None
    repository: dict | None
    slug: str
    source: str
    status: str
    title: str
    version: int
    versions: list
    view_url: str
    web_url: str


class PageArtefact(PageArtefactRequired, total=False):
    automation_invocation_id: str | None
    created_at: str | None
    created_by_user_id: str | None
    description: str | None
    document_key: str
    entrypoint: str
    expires_at: str | None
    files: list
    harness: str | None
    harness_version: str | None
    model: str | None
    published_at: str | None
    repository_id: str | None
    selected_path: str
    vcs_agent_checkpoint_id: str | None
    vcs_agent_session_id: str | None


class PageArtefactLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class PageArtefactLoadMatch(PageArtefactLoadMatchRequired, total=False):
    file: str
    version: int
    versions_page: int


class PageArtefactListMatchRequired(TypedDict):
    organization_id: str


class PageArtefactListMatch(PageArtefactListMatchRequired, total=False):
    author: str
    harness: str
    kind: str
    model: str
    page: int
    q: str
    repo: str
    slug: str
    source: str


class PageCiPipelineRunRequired(TypedDict):
    error: str | None
    jobs: list


class PageCiPipelineRun(PageCiPipelineRunRequired, total=False):
    id: str


class PageCiPipelineRunLoadMatch(TypedDict):
    id: str
    pipeline_id: str


class PageProjectRunRequired(TypedDict):
    available_tests: list
    fix_scenario_count: int
    fix_scenarios: list
    fixable_count: int
    pagination: dict
    permissions: dict
    preparation_reason: str | None
    project: dict
    run: dict
    scenario_runs: list
    selected_scenario_run: Any
    web_path: str


class PageProjectRun(PageProjectRunRequired, total=False):
    id: str


class PageProjectRunLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class PageProjectRunLoadMatch(PageProjectRunLoadMatchRequired, total=False):
    browser: str
    detail: bool
    page: int


class PageRepoVcCommitRequired(TypedDict):
    commit: Any
    diff_path: str


class PageRepoVcCommit(PageRepoVcCommitRequired, total=False):
    id: str


class PageRepoVcCommitLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class PageRepoVcCommitLoadMatch(PageRepoVcCommitLoadMatchRequired, total=False):
    parent: str


class PagesBilling(TypedDict):
    addons: list
    breakdown: Any
    budget: Any
    can_manage_contact: bool
    can_manage_extra_spend: bool
    can_manage_local_subscription: bool
    can_manage_payment_method: bool
    can_set_up_billing: bool
    customer: Any
    deployment_usage_visible: bool
    entitlements: dict
    extra_spend_enabled: bool
    feature_enabled: bool
    organization_id: str
    package: Any
    prepaid: Any
    preview: Any
    storage_usage: dict
    stripe: dict
    subscription: Any
    token_account: dict


class PagesBillingLoadMatch(TypedDict):
    organization_id: str


class PagesGithubOnboarding(TypedDict):
    onboarding: dict
    organization: dict


class PagesGithubOnboardingLoadMatchRequired(TypedDict):
    organization_id: str


class PagesGithubOnboardingLoadMatch(PagesGithubOnboardingLoadMatchRequired, total=False):
    github_app_installation_id: str
    github_import_batch_id: str


class PagesMemberRequired(TypedDict):
    accepted_at: str | None
    accepted_by_user: Any
    created_at: str
    created_at_label: str | None
    email: str
    expires_at: str | None
    expires_at_label: str | None
    id: str
    invite_url: str | None
    invited_by_user: Any
    organization: dict
    revoked_at: str | None
    role: str
    status: str
    updated_at: str
    updated_at_label: str | None


class PagesMember(PagesMemberRequired, total=False):
    email_delivery_status: str


class PagesMemberListMatch(TypedDict):
    organization_id: str


class PagesProjectCredentialRequired(TypedDict):
    composal_address: str | None
    configured: bool
    credential_keys: dict
    description: str | None
    email_link_auth_origins: list
    has_inbox: bool
    id: str
    identity_provider: dict | None
    instructions: str | None
    login_method: str
    login_url: str
    managed: bool
    mfa_enabled: bool
    name: str
    project_id: str
    provider_guidance: str
    sign_in_verified: bool
    sign_in_verified_at: str | None
    status: str
    updated_at: str
    username: str


class PagesProjectCredential(PagesProjectCredentialRequired, total=False):
    browser_authentication: dict | None


class PagesProjectCredentialListMatch(TypedDict):
    organization_id: str
    project_id: str


class PagesProjectPersona(TypedDict):
    access_mode: str
    active_run_count: int
    archived_at: str | None
    attention: list
    capabilities: str | None
    created_at: str
    credential: Any
    credential_id: str | None
    goals: str | None
    health: dict
    id: str
    lock_version: int
    name: str
    project_id: str
    role: str
    scenario_count: int
    updated_at: str


class PagesProjectPersonaListMatch(TypedDict):
    organization_id: str
    project_id: str


class PagesProjectRun(TypedDict):
    archived_at: str | None
    browser_seconds: float | None
    can_archive: bool
    can_restore: bool
    cleanup_state: str
    commit_sha: str | None
    created_at: str
    duration_seconds: float | None
    environment_name: str | None
    finished_at: str | None
    id: str
    outcome: str | None
    pull_request: Any
    pull_request_label: str | None
    scenario_count: int
    source_run: dict | None
    started_at: str | None
    state: str
    title: str
    trigger_kind: str
    triggered_by: str | None
    web_path: str


class PagesProjectRunListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class PagesProjectRunListMatch(PagesProjectRunListMatchRequired, total=False):
    environment_id: str
    environment_query: str
    page: int
    query: str
    status: str
    trigger: str


class PagesProjectScenario(TypedDict):
    base_url: str | None
    id: str
    kind: str | None
    name: str


class PagesProjectScenarioListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class PagesProjectScenarioListMatch(PagesProjectScenarioListMatchRequired, total=False):
    limit: int
    sort: str


class PagesRegistry(TypedDict):
    active_repository_count: int
    error: str | None
    pagination: dict
    repositories: list
    repository_count: int


class PagesRegistryLoadMatchRequired(TypedDict):
    organization_id: str


class PagesRegistryLoadMatch(PagesRegistryLoadMatchRequired, total=False):
    page: int


PagesSessionRequired = TypedDict('PagesSessionRequired', {
    "created_at": str | None,
    "ended_at": str | None,
    "external_session_id": str,
    "facets": dict,
    "harness": str,
    "id": str,
    "last_activity_at": str | None,
    "last_checkpoint_at": str | None,
    "markers": list,
    "pagination": dict,
    "repository": Any,
    "session": Any,
    "sessions": list,
    "started_at": str | None,
    "stats": dict,
    "title": str | None,
    "token_stats": Any,
    "transcript_index": Any,
    "transcript_stats": Any,
    "updated_at": str | None,
    "user": Any,
})

PagesSessionOptional = TypedDict('PagesSessionOptional', {
    "adapter": str,
    "cursor": str,
    "from": str,
    "github_access_warnings": list,
    "limit": int,
    "max_bytes": int,
    "mode": str,
    "offset": int,
    "query": str,
    "repo": str,
    "search": Any,
    "search_enabled": bool,
    "status": str,
    "to": str,
    "user_id": str,
}, total=False)


class PagesSession(PagesSessionRequired, PagesSessionOptional):
    pass


class PagesSessionLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class PagesSessionLoadMatch(PagesSessionLoadMatchRequired, total=False):
    around_event: int
    checkpoint: str
    event_digest: str


PagesSessionListMatchRequired = TypedDict('PagesSessionListMatchRequired', {
    "organization_id": str,
})

PagesSessionListMatchOptional = TypedDict('PagesSessionListMatchOptional', {
    "adapter": str,
    "from": str,
    "limit": int,
    "offset": int,
    "repo": str,
    "session": str,
    "status": str,
    "to": str,
    "user_id": str,
}, total=False)


class PagesSessionListMatch(PagesSessionListMatchRequired, PagesSessionListMatchOptional):
    pass


PagesSessionCreateDataRequired = TypedDict('PagesSessionCreateDataRequired', {
    "organization_id": str,
})

PagesSessionCreateDataOptional = TypedDict('PagesSessionCreateDataOptional', {
    "adapter": str,
    "cursor": str,
    "from": str,
    "limit": int,
    "max_bytes": int,
    "mode": str,
    "offset": int,
    "query": str,
    "repo": str,
    "status": str,
    "to": str,
    "user_id": str,
}, total=False)


class PagesSessionCreateData(PagesSessionCreateDataRequired, PagesSessionCreateDataOptional):
    pass


class Pairing(TypedDict, total=False):
    id: str


class PairingLoadMatch(TypedDict):
    id: str


class PairingCreateData(TypedDict):
    pass


class PairingEvent(TypedDict):
    pass


class PairingEventLoadMatch(TypedDict):
    pairing_id: str


class ParallelV1(TypedDict):
    pass


class ParallelV1CreateData(TypedDict):
    organization_id: str


class PatchsetDiffRequired(TypedDict):
    files: list
    patchset: dict


class PatchsetDiff(PatchsetDiffRequired, total=False):
    id: str


class PatchsetDiffLoadMatch(TypedDict):
    change_id: str
    id: str
    organization_id: str
    patchset_id: str
    repo_id: str


class PersonalAccessToken(TypedDict, total=False):
    id: str


class PersonalAccessTokenLoadMatch(TypedDict):
    id: str


class PersonalAccessTokenCreateData(TypedDict):
    pass


class PersonalAccessTokenRemoveMatch(TypedDict):
    id: str


class PreviewOperation(TypedDict):
    pass


class PreviewOperationLoadMatch(TypedDict):
    app_id: str
    preview_id: str


class PreviewProfileSecretBindingRequired(TypedDict):
    env_key: str


class PreviewProfileSecretBinding(PreviewProfileSecretBindingRequired, total=False):
    id: str
    mode: str
    secret_id: str
    secret_version_id: str


class PreviewProfileSecretBindingLoadMatch(TypedDict):
    app_id: str
    preview_profile_id: str


class PreviewProfileSecretBindingCreateDataRequired(TypedDict):
    app_id: str
    preview_profile_id: str
    env_key: str


class PreviewProfileSecretBindingCreateData(PreviewProfileSecretBindingCreateDataRequired, total=False):
    mode: str
    secret_id: str
    secret_version_id: str


class PreviewProfileSecretBindingRemoveMatch(TypedDict):
    app_id: str
    id: str
    preview_profile_id: str


class PreviewSecretRequired(TypedDict):
    env_key: str
    name: str
    slug: str
    value: str


class PreviewSecret(PreviewSecretRequired, total=False):
    id: str


class PreviewSecretCreateData(TypedDict):
    app_id: str
    preview_id: str
    env_key: str
    name: str
    slug: str
    value: str


class PreviewSecretRemoveMatch(TypedDict):
    app_id: str
    id: str
    preview_id: str


class PreviewSharingApprovalRequired(TypedDict):
    approved_build_keys: list
    approved_build_secrets: list
    approved_default_configuration: list
    approved_default_secrets: list
    approved_source_keys: list
    build_secrets: list
    default_configuration: list
    default_secrets: list
    services: list
    snapshot_version: int
    source_keys: list


class PreviewSharingApproval(PreviewSharingApprovalRequired, total=False):
    build_keys: list


class PreviewSharingApprovalLoadMatch(TypedDict):
    app_id: str
    preview_id: str


class PreviewSharingApprovalCreateDataRequired(TypedDict):
    app_id: str
    preview_id: str
    snapshot_version: int


class PreviewSharingApprovalCreateData(PreviewSharingApprovalCreateDataRequired, total=False):
    build_keys: list
    build_secrets: list
    default_configuration: list
    default_secrets: list
    source_keys: list


class ProactiveAgentWaitlistEntryRequired(TypedDict):
    email: str
    places_per_referral: int
    position: int
    position_after_next_referral: int
    referral_code: str
    referral_count: int
    total: int


class ProactiveAgentWaitlistEntry(ProactiveAgentWaitlistEntryRequired, total=False):
    first_task: str | None
    invite_code: str | None
    website: str | None


class ProactiveAgentWaitlistEntryLoadMatch(TypedDict):
    id: str


class ProactiveAgentWaitlistEntryCreateDataRequired(TypedDict):
    email: str


class ProactiveAgentWaitlistEntryCreateData(ProactiveAgentWaitlistEntryCreateDataRequired, total=False):
    first_task: str | None
    invite_code: str | None
    website: str | None


class ProductRequired(TypedDict):
    activated_products: list
    can_activate_products: bool
    created_at: str
    created_at_label: str | None
    github_prs_authored_by_change_author: bool
    id: str
    logo_url: str | None
    member_count: int
    name: str
    pending_invitation_count: int
    personal: bool
    product: str
    repository_count: int
    role: str | None
    sandbox_region: str
    slug: str
    timezone: str
    updated_at: str
    updated_at_label: str | None
    verify_pr_scenario_writing_enabled: bool


class Product(ProductRequired, total=False):
    agents_only: bool
    shared_agent_personal_accounts_enabled: bool
    source_control_providers: list
    source_ui_enabled: bool


class ProductCreateData(TypedDict):
    organization_id: str
    product: str


class ProductMapIdentityDecision(TypedDict):
    observations: list
    operation: str
    reason: str
    target: dict


class ProductMapIdentityDecisionCreateData(TypedDict):
    organization_id: str
    project_id: str
    observations: list
    operation: str
    reason: str
    target: dict


class ProductMapJourneyRequired(TypedDict):
    goal: str
    id: str
    journey: dict
    next_cursor: str | None
    scope: dict
    title: str
    tree: dict
    variant_count: int
    variants: list


class ProductMapJourney(ProductMapJourneyRequired, total=False):
    default_variant_id: str | None
    preview: Any
    tree_loaded: bool


class ProductMapJourneyLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProductMapJourneyLoadMatch(ProductMapJourneyLoadMatchRequired, total=False):
    account_id: str
    after: str
    area: str
    before: str
    include_tree: bool
    persona_id: str
    query: str
    revision_id: str
    since: str
    variant_id: str


class ProductMapJourneyListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProductMapJourneyListMatch(ProductMapJourneyListMatchRequired, total=False):
    account_id: str
    after: str
    area: str
    before: str
    include_coverage: bool
    journey_query: str
    persona_id: str
    query: str
    revision_id: str
    since: str


class ProductMapJourneyReplay(TypedDict):
    actor_id: str | None
    can_request_qualification: bool
    created_at: str
    failure_code: str | None
    failure_message: str | None
    id: str
    preparation_receipt: dict | None
    qualification: Any
    qualification_status: str
    replay_required: bool
    review_reason: str
    run_id: str | None
    scenario_run_id: str | None
    source_digest: str
    status: str
    updated_at: str
    variant_id: str


class ProductMapJourneyReplayLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProductMapJourneyReplayCreateData(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProductMapObservationRequired(TypedDict):
    capture: dict
    events: list
    evidence_id: str
    observation_id: str
    scope: dict
    state: Any
    status: str


class ProductMapObservation(ProductMapObservationRequired, total=False):
    id: str


class ProductMapObservationLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProductMapObservationLoadMatch(ProductMapObservationLoadMatchRequired, total=False):
    account_id: str
    area: str
    before: str
    persona_id: str
    query: str
    revision_id: str
    since: str


class ProductMapQuestionRequired(TypedDict):
    claims: list
    evidence_truncated: bool
    model: str
    question: str
    reasoning_effort: str
    scope: dict
    status: str
    unknowns: list


class ProductMapQuestion(ProductMapQuestionRequired, total=False):
    account_id: str
    area: str
    before: str
    persona_id: str
    query: str
    revision_id: str
    since: str
    state_id: str


class ProductMapQuestionCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    question: str


class ProductMapQuestionCreateData(ProductMapQuestionCreateDataRequired, total=False):
    account_id: str
    area: str
    before: str
    persona_id: str
    query: str
    revision_id: str
    since: str
    state_id: str


class ProductMapState(TypedDict):
    account_id: str | None
    attempts: list
    captured_at: str
    id: str
    incoming: list
    labels: dict
    layout: dict
    observation_id: str
    omitted_controls: int
    outgoing: list
    revision_id: str
    scope: dict
    screenshot_url: str | None
    state: dict
    truncated: bool
    url: str


class ProductMapStateLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProductMapStateLoadMatch(ProductMapStateLoadMatchRequired, total=False):
    account_id: str
    area: str
    before: str
    include_connection: bool
    observation_id: str
    persona_id: str
    query: str
    revision_id: str
    since: str


class ProductMapStateListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProductMapStateListMatch(ProductMapStateListMatchRequired, total=False):
    account_id: str
    after: str
    area: str
    before: str
    persona_id: str
    query: str
    revision_id: str
    since: str


class ProjectRequired(TypedDict):
    archived_at: str | None
    context: str | None
    created_at: str
    credentials: list
    demo: bool
    documentation_urls: list
    environments: list
    execution_mode: str
    icon_url: str | None
    id: str
    identity_provider: dict
    lock_version: int
    name: str
    network_connections: list
    organization_id: str
    overview: dict
    permissions: dict
    personas: list
    project: dict
    pull_request_options: dict
    pull_requests: list
    purpose: str | None
    runs: list
    scenario_history: dict
    scenario_states: dict
    scenarios: list
    slug: str
    updated_at: str
    verifier_preferences: dict
    version: int
    website_url: str | None


class Project(ProjectRequired, total=False):
    setup_required: bool


class ProjectLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class ProjectLoadMatch(ProjectLoadMatchRequired, total=False):
    overview: bool
    page: int
    query: str
    scenario_id: str
    status: str
    verify_environment_id: str
    view: str


class ProjectListMatch(TypedDict):
    organization_id: str


class ProjectCreateDataRequired(TypedDict):
    organization_id: str
    name: str


class ProjectCreateData(ProjectCreateDataRequired, total=False):
    context: str | None
    documentation_urls: list
    execution_mode: str
    purpose: str | None
    slug: str
    verifier_preferences: dict
    website_url: str | None


class ProjectUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class ProjectUpdateData(ProjectUpdateDataRequired, total=False):
    context: str | None
    documentation_urls: list
    execution_mode: str
    name: str
    purpose: str | None
    slug: str
    verifier_preferences: dict
    version: int
    website_url: str | None


class ProjectPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class ProjectPatchData(ProjectPatchDataRequired, total=False):
    context: str | None
    documentation_urls: list
    execution_mode: str
    name: str
    purpose: str | None
    slug: str
    verifier_preferences: dict
    version: int
    website_url: str | None


class ProjectAndroidApkRequired(TypedDict):
    android: dict
    description: str
    image: str
    ios: dict
    managed_binary: dict


class ProjectAndroidApk(ProjectAndroidApkRequired, total=False):
    artifact_paths: list
    launch_command: str
    platform: str
    provider: str
    setup_command: str


class ProjectAndroidApkCreateData(TypedDict):
    organization_id: str
    project_id: str


class ProjectCodeMapRequired(TypedDict):
    can_scan: bool
    commit_sha: str
    configured: bool
    error_code: str | None
    id: str
    name: str
    repository_id: str
    revision: dict
    slug: str
    status: str


class ProjectCodeMap(ProjectCodeMapRequired, total=False):
    ref: str


class ProjectCodeMapListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProjectCodeMapListMatch(ProjectCodeMapListMatchRequired, total=False):
    ref: str
    repository_id: str


class ProjectCodeMapCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    repository_id: str


class ProjectCodeMapCreateData(ProjectCodeMapCreateDataRequired, total=False):
    ref: str


class ProjectEnvironmentRequired(TypedDict):
    allowed_actions: str
    allowed_origins: list
    archived_at: str | None
    base_url: str | None
    base_url_changeable: bool
    conversation_only_messaging: bool
    created_at: str
    desktop: dict | None
    execution_mode: str
    id: str
    imessage_number: str | None
    kind: str
    lock_version: int
    messaging_conversation: Any
    messaging_problem: str | None
    messaging_source: Any
    messaging_tester_number: str | None
    name: str
    project_id: str
    pull_request: dict | None
    source_branch: str | None
    updated_at: str
    verify_network_connection_id: str | None
    version: int


class ProjectEnvironment(ProjectEnvironmentRequired, total=False):
    binary: str


class ProjectEnvironmentLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectEnvironmentListMatch(TypedDict):
    organization_id: str
    project_id: str


class ProjectEnvironmentCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    name: str


class ProjectEnvironmentCreateData(ProjectEnvironmentCreateDataRequired, total=False):
    allowed_actions: str
    allowed_origins: list
    base_url: str | None
    binary: str
    desktop: dict | None
    imessage_number: str | None
    kind: str
    messaging_tester_number: str | None


class ProjectEnvironmentUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectEnvironmentUpdateData(ProjectEnvironmentUpdateDataRequired, total=False):
    allowed_actions: str
    allowed_origins: list
    base_url: str | None
    binary: str
    imessage_number: str | None
    kind: str
    messaging_tester_number: str | None
    name: str
    verify_network_connection_id: str | None
    version: int


class ProjectEnvironmentPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectEnvironmentPatchData(ProjectEnvironmentPatchDataRequired, total=False):
    allowed_actions: str
    allowed_origins: list
    base_url: str | None
    binary: str
    imessage_number: str | None
    kind: str
    messaging_tester_number: str | None
    name: str
    verify_network_connection_id: str | None
    version: int


class ProjectFindingRequired(TypedDict):
    environment_name: str
    id: str
    last_seen_at: str
    locked: bool
    severity: str
    source: str
    source_title: str
    status: str
    title: str
    verification: Any
    web_path: str


class ProjectFinding(ProjectFindingRequired, total=False):
    deferred_until: str | None


class ProjectFindingListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProjectFindingListMatch(ProjectFindingListMatchRequired, total=False):
    page: int
    priority: str
    query: str
    run_id: str
    source: str
    state: str


class ProjectFixtureRequired(TypedDict):
    assignments: list
    byte_size: int
    content_type: str
    credential_ids: list
    environment_ids: list
    lock_version: int
    name: str
    persona_ids: list
    sha256: str
    url: str
    version: int


class ProjectFixture(ProjectFixtureRequired, total=False):
    id: str


class ProjectFixtureLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectFixtureListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProjectFixtureListMatch(ProjectFixtureListMatchRequired, total=False):
    credential_id: str
    environment_id: str
    page: int
    persona_id: str
    q: str


class ProjectFixtureCreateData(TypedDict):
    organization_id: str
    project_id: str


class ProjectFixtureUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectFixtureUpdateData(ProjectFixtureUpdateDataRequired, total=False):
    credential_ids: list
    environment_ids: list
    name: str
    persona_ids: list
    version: int


class ProjectFixturePatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectFixturePatchData(ProjectFixturePatchDataRequired, total=False):
    credential_ids: list
    environment_ids: list
    name: str
    persona_ids: list
    version: int


class ProjectFixtureRemoveMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str
    version: int


class ProjectIosAppRequired(TypedDict):
    android: dict
    description: str
    image: str
    ios: dict
    managed_binary: dict


class ProjectIosApp(ProjectIosAppRequired, total=False):
    artifact_paths: list
    launch_command: str
    platform: str
    provider: str
    setup_command: str


class ProjectIosAppCreateData(TypedDict):
    organization_id: str
    project_id: str


class ProjectMessagingConversationRequired(TypedDict):
    assistant_number: str
    attachment_limit: int
    attachment_max_bytes: int
    environment_name: str
    id: str
    leased: bool
    messages: list
    reconciled_at: str | None
    retirable: bool
    seeded: bool
    send_blocked_reason: str | None
    tester_number: str
    unknown_send: bool
    verify_environment_id: str


class ProjectMessagingConversation(ProjectMessagingConversationRequired, total=False):
    send_disposition: str
    send_error: str | None


class ProjectMessagingConversationLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectMessagingConversationCreateData(TypedDict):
    organization_id: str
    project_id: str
    assistant_number: str
    tester_number: str
    verify_environment_id: str


class ProjectMessagingConversationUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectMessagingConversationUpdateData(ProjectMessagingConversationUpdateDataRequired, total=False):
    assistant_number: str
    tester_number: str


class ProjectMessagingConversationPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectMessagingConversationPatchData(ProjectMessagingConversationPatchDataRequired, total=False):
    assistant_number: str
    tester_number: str


class ProjectOverviewMetric(TypedDict):
    counts: dict


class ProjectOverviewMetricListMatch(TypedDict):
    organization_id: str
    project_id: str


class ProjectOverviewPullRequest(TypedDict):
    base_sha: str
    can_verify: bool
    comment_url: str | None
    draft: bool
    github_repository: str | None
    github_url: str | None
    head_sha: str
    id: str
    latest_created_at: str | None
    latest_current: bool
    latest_head_sha: str | None
    latest_reason: str | None
    latest_run_id: str | None
    latest_state: str | None
    number: int
    project_id: str | None
    project_slug: str | None
    provider: str
    repository_id: str
    request_label: str
    source_branch: str | None
    source_repository: str | None
    source_url: str | None
    state: str
    title: str
    updated_at: str
    web_path: str


class ProjectOverviewPullRequestListMatch(TypedDict):
    organization_id: str
    project_id: str


class ProjectProductMap(TypedDict):
    pass


class ProjectProductMapLoadMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProjectProductMapLoadMatch(ProjectProductMapLoadMatchRequired, total=False):
    account_id: str
    area: str
    before: str
    persona_id: str
    query: str
    revision_id: str
    since: str
    source: str
    target: str
    compare_revision_id: str
    after: str
    view_id: str


class ProjectProductMapCreateData(TypedDict):
    organization_id: str
    project_id: str


class ProjectRecordingRequired(TypedDict):
    browser: dict
    created_at: str
    draft: Any
    environment_id: str
    error: str | None
    event_count: int
    id: str
    persona_id: str
    phase: str
    signed_in_during_recording: bool
    status: str
    updated_at: str


class ProjectRecording(ProjectRecordingRequired, total=False):
    start_path: str


class ProjectRecordingLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRecordingCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    environment_id: str
    persona_id: str


class ProjectRecordingCreateData(ProjectRecordingCreateDataRequired, total=False):
    start_path: str


class ProjectRecordingRemoveMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunPlan(TypedDict):
    archived_at: str | None
    base_url: str | None
    created_at: str
    dependencies: list
    id: str
    identity_probe: dict | None
    kind: str | None
    lock_version: int
    name: str
    nodes: list
    preview: Any
    project_id: str
    updated_at: str
    version: int


class ProjectRunPlanLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunPlanListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProjectRunPlanListMatch(ProjectRunPlanListMatchRequired, total=False):
    page: int


class ProjectRunPlanCreateData(TypedDict):
    organization_id: str
    project_id: str
    dependencies: list
    identity_probe: dict | None
    name: str
    nodes: list


class ProjectRunPlanUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunPlanUpdateData(ProjectRunPlanUpdateDataRequired, total=False):
    dependencies: list
    identity_probe: dict | None
    name: str
    nodes: list
    version: int


class ProjectRunPlanPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunPlanPatchData(ProjectRunPlanPatchDataRequired, total=False):
    dependencies: list
    identity_probe: dict | None
    name: str
    nodes: list
    version: int


class ProjectRunScheduleRequired(TypedDict):
    credential_ids: dict
    environment_id: str
    history: list
    id: str
    labels: list
    lock_version: int
    name: str
    next_run_at: str
    scenario_count: int
    selection_mode: str
    state: str
    time_of_day: str
    time_zone: str
    version: int


class ProjectRunSchedule(ProjectRunScheduleRequired, total=False):
    cron_expression: str | None
    environment_name: str
    notification_channel: str
    slack_subscription_id: str | None
    source_scenario_id: str | None


class ProjectRunScheduleLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunScheduleListMatch(TypedDict):
    organization_id: str
    project_id: str


class ProjectRunScheduleCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    credential_ids: dict
    environment_id: str
    labels: list
    name: str
    selection_mode: str
    state: str
    time_of_day: str
    time_zone: str


class ProjectRunScheduleCreateData(ProjectRunScheduleCreateDataRequired, total=False):
    notification_channel: str
    slack_subscription_id: str | None


class ProjectRunScheduleUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunScheduleUpdateData(ProjectRunScheduleUpdateDataRequired, total=False):
    credential_ids: dict
    environment_id: str
    labels: list
    name: str
    notification_channel: str
    selection_mode: str
    slack_subscription_id: str | None
    state: str
    time_of_day: str
    time_zone: str
    version: int


class ProjectRunSchedulePatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class ProjectRunSchedulePatchData(ProjectRunSchedulePatchDataRequired, total=False):
    credential_ids: dict
    environment_id: str
    labels: list
    name: str
    notification_channel: str
    selection_mode: str
    slack_subscription_id: str | None
    state: str
    time_of_day: str
    time_zone: str
    version: int


class ProjectScenarioOptionRequired(TypedDict):
    environments: list
    permissions: dict
    personas: list
    project: dict
    scenario_states: dict
    scenarios: list


class ProjectScenarioOption(ProjectScenarioOptionRequired, total=False):
    schedule_options: Any
    schedules: list


class ProjectScenarioOptionLoadMatch(TypedDict):
    organization_id: str
    project_id: str


class ProjectScenarioRow(TypedDict):
    actor_count: int
    dependency_count: int
    health: dict
    id: str
    labels: list
    name: str
    persona_id: str
    selectable_for_run: bool
    step_count: int


class ProjectScenarioRowListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class ProjectScenarioRowListMatch(ProjectScenarioRowListMatchRequired, total=False):
    page: int
    sort: str
    state: str


class ProjectSetting(TypedDict):
    available_messaging_environments: list
    messaging_conversations: list
    messaging_enabled: bool
    permissions: dict
    project: dict
    tester_numbers: list


class ProjectSettingLoadMatch(TypedDict):
    organization_id: str
    project_id: str


class PullRequestRequired(TypedDict):
    available_tests: list
    findings: list
    idempotency_key: str
    pagination: dict
    permissions: dict
    preview_cleanup_ready: bool
    pull_request: dict
    runs: list


class PullRequest(PullRequestRequired, total=False):
    branch: str
    cleanup_only: bool
    current_run: Any
    head_sha: str
    id: str
    imessage_number: str
    number: int
    preview_url: str | None
    project: Any
    project_id: str
    repository_id: str


class PullRequestLoadMatchRequired(TypedDict):
    id: str
    organization_id: str


class PullRequestLoadMatch(PullRequestLoadMatchRequired, total=False):
    page: int


class PullRequestCreateDataRequired(TypedDict):
    organization_id: str
    idempotency_key: str


class PullRequestCreateData(PullRequestCreateDataRequired, total=False):
    branch: str
    cleanup_only: bool
    head_sha: str
    imessage_number: str
    number: int
    preview_url: str | None
    project_id: str
    repository_id: str


class PullRequestRemoveMatch(TypedDict):
    id: str
    organization_id: str


class PullRequestActionRequired(TypedDict):
    action_name: str
    operation_key: str


class PullRequestAction(PullRequestActionRequired, total=False):
    body: str
    comment_id: str
    comments: list
    event: str
    expected_head_sha: str
    id: str | None
    label: str
    line: int
    node_id: str | None
    path: str
    run_id: str
    side: str
    start_line: int
    start_side: str
    thread_id: str


class PullRequestActionCreateDataRequired(TypedDict):
    number: str
    organization_id: str
    pull_request_id: str
    action_name: str
    operation_key: str


class PullRequestActionCreateData(PullRequestActionCreateDataRequired, total=False):
    body: str
    comment_id: str
    comments: list
    event: str
    expected_head_sha: str
    label: str
    line: int
    path: str
    run_id: str
    side: str
    start_line: int
    start_side: str
    thread_id: str


class PullRequestMagicMerge(TypedDict):
    pass


class PullRequestMagicMergeCreateDataRequired(TypedDict):
    number: str
    organization_id: str
    pull_request_id: str


class PullRequestMagicMergeCreateData(PullRequestMagicMergeCreateDataRequired, total=False):
    expected_base_sha: Any
    expected_head_sha: Any
    idempotency_key: Any
    mode: Any
    resolutions: Any


class PullRequestSettingRequired(TypedDict):
    bots: list
    browser_options_available: bool
    ci_preview: dict | None
    configured_repository: Any
    demo_videos: bool
    deployment: str | None
    enabled: bool
    environment: str
    environments: list
    hosting_presets: list
    id: str
    imessage_comment_prefix: str | None
    imessage_number: str | None
    imessage_number_source: str
    limits: dict
    link_pattern: str | None
    links: str | None
    messaging_enabled: bool
    messaging_tester_number: str | None
    permissions: dict
    pr_check: bool
    preview_comment_wildcard: str | None
    preview_profile: str | None
    preview_profiles: list
    previews: str
    project_id: str
    project_repositories: list
    provider: str
    repositories: list
    repository: str
    repository_id: str
    repository_kind: str
    selected_repository: Any
    service: str | None
    settings: list
    setup: Any
    setup_defaults: dict
    source_repository: str
    target_mode: str
    tester_numbers: list
    trigger_label: str
    triggers: dict
    verify_environment_id: str
    write_scenarios: bool


class PullRequestSetting(PullRequestSettingRequired, total=False):
    app_preview_profile_id: str | None
    app_service_id: str | None
    concurrency: int
    demo_videos_enabled: bool
    deployment_environment: str
    github_check_enabled: bool
    max_seconds: int
    non_product_paths: list
    preview_access: str
    preview_comment_authors: list
    preview_comment_pattern: str
    trigger_on_comment: bool
    trigger_on_label: bool
    trigger_on_push: bool
    trigger_on_ready: bool


class PullRequestSettingLoadMatchRequired(TypedDict):
    organization_id: str


class PullRequestSettingLoadMatch(PullRequestSettingLoadMatchRequired, total=False):
    project_id: str
    provider: str
    repository_id: str


class PullRequestSettingCreateDataRequired(TypedDict):
    organization_id: str
    bots: list
    demo_videos: bool
    deployment: str | None
    enabled: bool
    environment: str
    imessage_comment_prefix: str | None
    imessage_number: str | None
    imessage_number_source: str
    limits: dict
    link_pattern: str | None
    links: str | None
    messaging_tester_number: str | None
    pr_check: bool
    preview_comment_wildcard: str | None
    preview_profile: str | None
    previews: str
    project_id: str
    provider: str
    repository: str
    repository_id: str
    repository_kind: str
    service: str | None
    target_mode: str
    trigger_label: str
    triggers: dict
    verify_environment_id: str
    write_scenarios: bool


class PullRequestSettingCreateData(PullRequestSettingCreateDataRequired, total=False):
    app_preview_profile_id: str | None
    app_service_id: str | None
    concurrency: int
    demo_videos_enabled: bool
    deployment_environment: str
    github_check_enabled: bool
    max_seconds: int
    non_product_paths: list
    preview_access: str
    preview_comment_authors: list
    preview_comment_pattern: str
    trigger_on_comment: bool
    trigger_on_label: bool
    trigger_on_push: bool
    trigger_on_ready: bool


class PullRequestSettingAddRepositoryRequired(TypedDict):
    project_id: str
    repositories: list


class PullRequestSettingAddRepository(PullRequestSettingAddRepositoryRequired, total=False):
    replace: bool


class PullRequestSettingAddRepositoryCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    repositories: list


class PullRequestSettingAddRepositoryCreateData(PullRequestSettingAddRepositoryCreateDataRequired, total=False):
    replace: bool


class PullRequestSettingDetectCommentRequired(TypedDict):
    kind: str
    project_id: str


class PullRequestSettingDetectComment(PullRequestSettingDetectCommentRequired, total=False):
    bots: list
    deployment: str
    example_url: str
    imessage_comment_prefix: str
    imessage_number: str | None
    link_pattern: str
    provider: str
    repository_id: str
    request_number: int


class PullRequestSettingDetectCommentCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str


class PullRequestSettingDetectCommentCreateData(PullRequestSettingDetectCommentCreateDataRequired, total=False):
    repository_id: str


class PullRequestTranscript(TypedDict):
    adapter: str
    created_at: str | None
    ended_at: str | None
    external_session_id: str
    harness: str
    id: str
    last_activity_at: str | None
    last_checkpoint_at: str | None
    repository: Any
    started_at: str | None
    stats: dict
    status: str
    title: str | None
    updated_at: str | None
    user: Any


class PullRequestTranscriptListMatchRequired(TypedDict):
    organization_id: str
    pull_request_id: str
    repo_id: str


class PullRequestTranscriptListMatch(PullRequestTranscriptListMatchRequired, total=False):
    cursor: str
    limit: int
    paginated: bool


class PullZone(TypedDict):
    id: str
    name: str
    slug: str


class PullZoneListMatchRequired(TypedDict):
    organization_id: str


class PullZoneListMatch(PullZoneListMatchRequired, total=False):
    app: str


class Recorder(TypedDict):
    id: str
    name: str
    slug: str


class RecorderLoadMatch(TypedDict):
    organization_id: str


class Registry(TypedDict):
    pass


class RegistryLoadMatch(TypedDict):
    pass


class RegistryV2(TypedDict):
    pass


class RegistryV2CreateData(TypedDict):
    pass


class RelayAgentConnectionRequired(TypedDict):
    agent_card_url: str
    auth_scheme: str
    can_configure: bool
    can_disconnect: bool
    can_setup: bool
    connection: dict
    error_code: str | None
    expected_generation: int
    generation: int
    id: str
    name: str
    remote_agent: str | None
    requester_id: str
    retired_at: str | None
    revoked_at: str | None
    scope_key: str
    source_operation_id: str | None
    state: str


class RelayAgentConnection(RelayAgentConnectionRequired, total=False):
    credential: str | None


class RelayAgentConnectionLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class RelayAgentConnectionListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class RelayAgentConnectionListMatch(RelayAgentConnectionListMatchRequired, total=False):
    cursor: str
    limit: int
    selected_connection_id: str


class RelayAgentConnectionCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str
    agent_card_url: str
    auth_scheme: str
    name: str


class RelayAgentConnectionCreateData(RelayAgentConnectionCreateDataRequired, total=False):
    credential: str | None
    remote_agent: str | None
    source_operation_id: str | None


class RelayAgentConnectionUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class RelayAgentConnectionUpdateData(RelayAgentConnectionUpdateDataRequired, total=False):
    auth_scheme: str
    credential: str | None
    expected_generation: int
    name: str
    remote_agent: str | None


class RelayAgentConnectionRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class RelayAgentLocalThread(TypedDict, total=False):
    id: str


class RelayAgentLocalThreadRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class RelaySignal(TypedDict):
    pass


class RelaySignalCreateData(TypedDict):
    pass


class ReleaseRollout(TypedDict, total=False):
    id: str


class ReleaseRolloutLoadMatchRequired(TypedDict):
    release_id: str


class ReleaseRolloutLoadMatch(ReleaseRolloutLoadMatchRequired, total=False):
    id: str


class ReleaseRolloutCreateData(TypedDict):
    release_id: str


class RepoRequired(TypedDict):
    can_retry_import: bool
    can_retry_sync: bool
    disclaimer: str | None
    federated_in_home: bool
    github_repository: str | None
    icon_name: str
    id: str
    import_item_id: str | None
    is_home: bool
    name: str
    root_path: str | None
    slug: str
    sync_error_message: str | None
    sync_status: str


class Repo(RepoRequired, total=False):
    remote_repository: str | None
    sync_provider: str


class RepoLoadMatch(TypedDict):
    id: str
    organization_id: str


class RepoListMatchRequired(TypedDict):
    organization_id: str


class RepoListMatch(RepoListMatchRequired, total=False):
    direction: str
    page: int
    q: str
    sort: str


class RepoRemoveMatch(TypedDict):
    id: str
    organization_id: str


class RepoAccessTokenRequired(TypedDict):
    access_token: dict
    active: bool
    created_at: str
    created_at_label: str | None
    expires_at: str | None
    expires_at_label: str | None
    id: str
    last_used_at: str | None
    last_used_at_label: str | None
    name: str
    plain_text_token: str
    revoked_at: str | None
    revoked_at_label: str | None
    token_preview: str
    updated_at: str
    updated_at_label: str | None


class RepoAccessToken(RepoAccessTokenRequired, total=False):
    credential_purpose: str
    expires_in_days: int | None
    permission_level: str


class RepoAccessTokenListMatch(TypedDict):
    organization_id: str
    repo_id: str


class RepoAccessTokenCreateDataRequired(TypedDict):
    organization_id: str
    repo_id: str
    name: str


class RepoAccessTokenCreateData(RepoAccessTokenCreateDataRequired, total=False):
    credential_purpose: str
    expires_in_days: int | None
    permission_level: str


class RepoAccessTokenRemoveMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoAction(TypedDict):
    pipeline: dict
    run: dict


class RepoActionListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoActionListMatch(RepoActionListMatchRequired, total=False):
    pipeline_id: str
    range: str


class RepoAgentCheckpoint(TypedDict, total=False):
    id: str


class RepoAgentCheckpointLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoAgentSessionRequired(TypedDict):
    agent_session: dict


class RepoAgentSession(RepoAgentSessionRequired, total=False):
    adapter: str
    external_session_id: str
    id: str
    status: str
    title: str | None


class RepoAgentSessionLoadMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoAgentSessionLoadMatch(RepoAgentSessionLoadMatchRequired, total=False):
    id: str


class RepoAgentSessionCreateData(TypedDict):
    organization_id: str
    repo_id: str


class RepoAgentSessionUpdateData(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoAgentSessionPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoAgentSessionPatchData(RepoAgentSessionPatchDataRequired, total=False):
    agent_session: dict


class RepoBookmarkProtection(TypedDict):
    actor_policy: dict
    bypass_mode: str
    created_at: str
    created_by_user_id: str | None
    enabled: bool
    id: str
    name: str
    organization_id: str
    priority: int
    repository_id: str
    requirements: dict
    target_kind: str
    target_pattern: str | None
    updated_at: str
    updated_by_user_id: str | None


class RepoBookmarkProtectionLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionListMatch(TypedDict):
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionCreateDataRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionCreateData(RepoBookmarkProtectionCreateDataRequired, total=False):
    actor_policy: dict
    bypass_mode: str
    enabled: bool
    name: str
    priority: int
    requirements: dict
    target_kind: str
    target_pattern: str | None


class RepoBookmarkProtectionUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionUpdateData(RepoBookmarkProtectionUpdateDataRequired, total=False):
    actor_policy: dict
    bypass_mode: str
    enabled: bool
    name: str
    priority: int
    requirements: dict
    target_kind: str
    target_pattern: str | None


class RepoBookmarkProtectionPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionPatchData(RepoBookmarkProtectionPatchDataRequired, total=False):
    actor_policy: dict
    bypass_mode: str
    enabled: bool
    name: str
    priority: int
    requirements: dict
    target_kind: str
    target_pattern: str | None


class RepoBookmarkProtectionRemoveMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionEvent(TypedDict):
    action: str
    actor_kind: str
    actor_label: str | None
    actor_user_id: str | None
    bookmark_name: str
    bookmark_protection_rule_id: str | None
    created_at: str
    created_at_label: str | None
    decision: str
    id: str
    intent: str | None
    metadata: dict
    new_target: str | None
    old_target: str | None
    organization_id: str
    reason_codes: list
    repository_id: str
    source_request_id: str | None
    updated_at: str
    updated_at_label: str | None


class RepoBookmarkProtectionEventListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoBookmarkProtectionEventListMatch(RepoBookmarkProtectionEventListMatchRequired, total=False):
    bookmark: str
    limit: int


class RepoCloudWorkspaceBackup(TypedDict, total=False):
    id: str


class RepoCloudWorkspaceBackupLoadMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoCloudWorkspaceBackupLoadMatch(RepoCloudWorkspaceBackupLoadMatchRequired, total=False):
    id: str


class RepoCloudWorkspaceBackupCreateData(TypedDict):
    organization_id: str
    repo_id: str


class RepoCodeRule(TypedDict):
    active_revision_number: int | None
    capabilities: dict
    code_rule: Any
    created_at: str
    definition: dict
    draft_pending: bool
    enabled: bool
    expected_version: int
    id: str
    latest_revision_number: int
    name: str
    repository: dict
    scope: list
    slug: str
    state_version: int
    updated_at: str
    web_url: str


class RepoCodeRuleLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoCodeRuleListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoCodeRuleListMatch(RepoCodeRuleListMatchRequired, total=False):
    rule: str


class RepoCodeRuleCreateData(TypedDict):
    organization_id: str
    repo_id: str
    definition: dict


class RepoCodeRuleUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoCodeRuleUpdateData(RepoCodeRuleUpdateDataRequired, total=False):
    definition: dict
    expected_version: int


class RepoCodeRulePatchDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoCodeRulePatchData(RepoCodeRulePatchDataRequired, total=False):
    definition: dict
    expected_version: int


class RepoCodeRuleRemoveMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class RepoSetting(TypedDict):
    active: bool
    created_at: str
    created_at_label: str | None
    description: str | None
    expires_at: str | None
    expires_at_label: str | None
    icon_name: str
    id: str
    last_used_at: str | None
    last_used_at_label: str | None
    merge_authority: str
    name: str
    organization_id: str
    permission_level: str
    revoked_at: str | None
    revoked_at_label: str | None
    slug: str
    status: str
    token_preview: str
    updated_at: str
    updated_at_label: str | None


class RepoSettingListMatch(TypedDict):
    organization_id: str
    repo_id: str


class RepoSettingUpdateDataRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoSettingUpdateData(RepoSettingUpdateDataRequired, total=False):
    description: str | None
    icon_name: str
    name: str
    status: str


class RepoStat(TypedDict):
    repository_stats: dict


class RepoStatListMatch(TypedDict):
    organization_id: str
    repo_id: str


class RepoStatCreateData(TypedDict):
    organization_id: str
    repo_id: str
    repository_stats: dict


class RepoVc(TypedDict):
    pass


class RepoVcLoadMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoVcLoadMatch(RepoVcLoadMatchRequired, total=False):
    path: str
    ref: str


RepoVcCreateDataRequired = TypedDict('RepoVcCreateDataRequired', {
    "organization_id": str,
    "repo_id": str,
})

RepoVcCreateDataOptional = TypedDict('RepoVcCreateDataOptional', {
    "from": Any,
    "into": Any,
}, total=False)


class RepoVcCreateData(RepoVcCreateDataRequired, RepoVcCreateDataOptional):
    pass


class RepoVcUpdateDataRequired(TypedDict):
    organization_id: str
    repo_id: str


class RepoVcUpdateData(RepoVcUpdateDataRequired, total=False):
    auto_land_enabled: Any
    expected_version: Any
    github_merge_gate: Any
    merge_authority: Any
    merge_github_repository_connection_id: Any
    queue_concurrency: Any
    queue_validation_mode: Any


class RepoVcCommit(TypedDict):
    name: str
    target_commit_id: str


class RepoVcCommitListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str
    ref: str


class RepoVcCommitListMatch(RepoVcCommitListMatchRequired, total=False):
    limit: int
    offset: int
    page: int
    path: str
    q: str


class ReportReplayRequired(TypedDict):
    agent_id: str
    generated_at: str
    recording: dict
    replay_steps: list


class ReportReplay(ReportReplayRequired, total=False):
    id: str


class ReportReplayLoadMatchRequired(TypedDict):
    exploration_id: str
    id: str
    organization_id: str


class ReportReplayLoadMatch(ReportReplayLoadMatchRequired, total=False):
    generated_at: str
    project_id: str


class ReportScenario(TypedDict):
    environment_name: str
    goal: str
    id: str
    mode: str
    permissions: dict
    project_id: str | None
    related_explorations: list
    report: dict
    saves_scenarios: bool
    scenario_generation: dict
    status: str


class ReportScenarioCreateDataRequired(TypedDict):
    exploration_id: str
    organization_id: str


class ReportScenarioCreateData(ReportScenarioCreateDataRequired, total=False):
    project_id: str


class RepositoryAccess(TypedDict):
    pass


class RepositoryAccessLoadMatch(TypedDict, total=False):
    organization_slug: str


class RepositoryAccessCreateData(TypedDict):
    pass


class RepositoryAccessResolveRequired(TypedDict):
    default_branch: str
    git_auth_username: str
    git_https_clone_url: str | None
    git_https_supported: bool
    membership_role: str
    organization_id: str
    organization_name: str
    organization_slug: str
    repository_id: str
    repository_name: str
    repository_slug: str


class RepositoryAccessResolve(RepositoryAccessResolveRequired, total=False):
    github_access_warnings: list
    id: str


class RepositoryAccessResolveLoadMatch(TypedDict):
    id: str
    resolve_id: str


class RepositoryEvent(TypedDict):
    pass


class RepositoryEventCreateData(TypedDict):
    pass


class RepositoryImport(TypedDict):
    can_manage_connections: bool
    github_imports: list
    github_installations: list
    gitlab_configured: bool
    gitlab_imports: list
    gitlab_integrations: list
    gitlab_redirect_uri: str | None
    gitlab_self_managed_available: bool
    inventory_errors: list
    organization_id: str
    repositories: list


class RepositoryImportLoadMatchRequired(TypedDict):
    organization_id: str


class RepositoryImportLoadMatch(RepositoryImportLoadMatchRequired, total=False):
    accounts_only: bool
    search: str


class RepositoryImportSessionRequired(TypedDict):
    can_authorize_github: bool
    client_name: str | None
    client_version: str | None
    created_at: str
    error_message: str | None
    expires_at: str
    git_imports: list
    github_app_installation_id: str | None
    github_connected: bool
    id: str
    idempotency_key: str
    organization_id: str
    organization_slug: str
    status: str
    updated_at: str


class RepositoryImportSession(RepositoryImportSessionRequired, total=False):
    action_required: str
    authorization_endpoint: str


class RepositoryImportSessionLoadMatch(TypedDict):
    id: str


class RepositoryImportSessionCreateDataRequired(TypedDict):
    organization_id: str
    idempotency_key: str


class RepositoryImportSessionCreateData(RepositoryImportSessionCreateDataRequired, total=False):
    client_name: str | None
    client_version: str | None
    github_app_installation_id: str | None


class RepositoryImportSessionRepositoryRequired(TypedDict):
    default_branch: str | None
    full_name: str
    name: str
    owner: str
    private: bool
    selectable: bool
    status: str
    visibility: str


class RepositoryImportSessionRepository(RepositoryImportSessionRepositoryRequired, total=False):
    reason: str | None


class RepositoryImportSessionRepositoryListMatchRequired(TypedDict):
    repository_import_session_id: str


class RepositoryImportSessionRepositoryListMatch(RepositoryImportSessionRepositoryListMatchRequired, total=False):
    q: str


class RepositoryImportSessionSelection(TypedDict):
    repositories: Any


class RepositoryImportSessionSelectionCreateData(TypedDict):
    repository_import_session_id: str
    repositories: Any


class RepositorySandboxEnvironment(TypedDict, total=False):
    id: str


class RepositorySandboxEnvironmentLoadMatch(TypedDict):
    id: str
    repository_id: str


class RepositorySandboxEnvironmentCreateData(TypedDict):
    repository_id: str


class RoderCodeRepair(TypedDict):
    base_sha: str
    cancel_requested: bool
    failure_code: str | None
    id: str
    launch_state: str
    organization_id: str
    repository_slug: str
    roder_thread_id: str | None
    roder_turn_id: str | None
    scenario_run_id: str
    task: dict | None
    trigger_kind: str


class RoderCodeRepairLoadMatch(TypedDict):
    id: str


class RoderCodeRepairCreateData(TypedDict):
    base_sha: str
    organization_id: str
    repository_slug: str
    scenario_run_id: str


class RoderCodeRepairSetting(TypedDict):
    available: bool
    daily_limit: int
    enabled: bool
    enabled_at: str | None
    operator_user_id: str | None
    organization_id: str
    repository_slug: str | None


class RoderCodeRepairSettingLoadMatch(TypedDict):
    organization_id: str


class RoderCodeRepairSettingCreateDataRequired(TypedDict):
    enabled: bool
    organization_id: str


class RoderCodeRepairSettingCreateData(RoderCodeRepairSettingCreateDataRequired, total=False):
    repository_slug: str | None


class RoderMachine(TypedDict, total=False):
    id: str


class RoderMachineUpdateData(TypedDict):
    id: str


class RoderRun(TypedDict):
    pass


class RoderRunCreateData(TypedDict, total=False):
    events: Any


class RoderWorkspaceCredential(TypedDict):
    api_token: str
    author_email: str
    author_name: str
    clone_url: str
    default_branch: str
    expires_at: str
    organization_id: str
    repository_id: str
    repository_slug: str
    repository_spec: str
    required_lifetime_seconds: int
    token: str
    username: str


class RoderWorkspaceCredentialCreateData(TypedDict):
    required_lifetime_seconds: int


class RunArtifact(TypedDict):
    pass


class RunArtifactLoadMatch(TypedDict):
    pipeline_id: str
    run_id: str


class RunArtifactCreateData(TypedDict):
    pipeline_id: str
    run_id: str


class RunJobRequired(TypedDict):
    active: bool
    allow_failure: bool
    cache_archive_observations: dict | None
    ci_pipeline_run_id: str
    ci_runner_id: str | None
    created_at: str
    dependencies_csv: str | None
    display_id: int
    environment_csv: str | None
    execution_order: int
    exit_code: int | None
    failed: bool
    finished_at: str | None
    id: str
    kind: str
    log_chunks: list
    name: str
    number: int
    organization_id: str
    queued_at: str | None
    retry_number: int
    reuse: dict | None
    runner_label_selector: str | None
    slug: str
    started_at: str | None
    status: str
    status_label: str
    status_state: str
    status_tone: str
    steps: list
    timeout_seconds: int | None
    updated_at: str


class RunJob(RunJobRequired, total=False):
    execution_profile: str | None
    reconciliation_id: str | None


class RunJobLoadMatchRequired(TypedDict):
    pipeline_id: str
    run_id: str


class RunJobLoadMatch(RunJobLoadMatchRequired, total=False):
    id: str


class RunJobCreateData(TypedDict):
    pipeline_id: str
    run_id: str


class RunScenarioRun(TypedDict, total=False):
    id: str


class RunScenarioRunLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str
    run_id: str


class RunScenarioRunUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str
    run_id: str


class RunScenarioRunUpdateData(RunScenarioRunUpdateDataRequired, total=False):
    outcomes: Any
    steps: Any
    version: Any


class RunScheduleOption(TypedDict):
    id: str
    name: str


class RunScheduleOptionListMatch(TypedDict):
    organization_id: str
    project_id: str


class RunSearch(TypedDict):
    runs: list


class RunSearchLoadMatchRequired(TypedDict):
    organization_id: str


class RunSearchLoadMatch(RunSearchLoadMatchRequired, total=False):
    query: str


class RunUpdate(TypedDict):
    base_sha: str
    can_verify: bool
    comment_url: str | None
    draft: bool
    github_repository: str | None
    github_url: str | None
    head_sha: str
    id: str
    latest_created_at: str | None
    latest_current: bool
    latest_head_sha: str | None
    latest_reason: str | None
    latest_run_id: str | None
    latest_state: str | None
    number: int
    project_id: str | None
    project_slug: str | None
    provider: str
    repository_id: str
    request_label: str
    source_branch: str | None
    source_repository: str | None
    source_url: str | None
    state: str
    title: str
    updated_at: str
    web_path: str


class RunUpdateListMatchRequired(TypedDict):
    organization_id: str


class RunUpdateListMatch(RunUpdateListMatchRequired, total=False):
    page: int
    query: str
    status: str
    verify_environment_id: str


class RunWorkspaceCredential(TypedDict):
    pass


class RunWorkspaceCredentialCreateData(TypedDict):
    pass


class RunnerLease(TypedDict, total=False):
    id: str


class RunnerLeaseLoadMatch(TypedDict):
    runner_id: str
    runner_pool_id: str


class RunnerLeaseCreateData(TypedDict):
    runner_id: str
    runner_pool_id: str


class RunnerPoolNodeEnrollmentToken(TypedDict):
    capabilities_csv: str | None
    ci_runner_pool_id: str
    created_at: str
    created_at_label: str | None
    creator_user_id: str | None
    description: str | None
    expires_at: str | None
    expires_at_label: str | None
    id: str
    kind: str
    last_used_at: str | None
    last_used_at_label: str | None
    name: str
    organization_id: str
    raw_token: str | None
    revoked_at: str | None
    status: str
    token_hint: str
    updated_at: str
    updated_at_label: str | None
    usage_count: int
    usage_count_label: str


class RunnerPoolNodeEnrollmentTokenListMatch(TypedDict):
    runner_pool_id: str


class RunnerPoolNodeEnrollmentTokenCreateDataRequired(TypedDict):
    runner_pool_id: str
    name: str


class RunnerPoolNodeEnrollmentTokenCreateData(RunnerPoolNodeEnrollmentTokenCreateDataRequired, total=False):
    capabilities_csv: str | None
    description: str | None
    expires_at: str | None
    kind: str


class RunnerPoolRunner(TypedDict, total=False):
    id: str


class RunnerPoolRunnerLoadMatchRequired(TypedDict):
    runner_pool_id: str


class RunnerPoolRunnerLoadMatch(RunnerPoolRunnerLoadMatchRequired, total=False):
    id: str


class RunnerPoolRunnerCreateData(TypedDict):
    runner_pool_id: str


class RunnerPoolRunnerUpdateData(TypedDict):
    id: str
    runner_pool_id: str


class RunnerPoolRunnerPatchData(TypedDict):
    id: str
    runner_pool_id: str


class RuntimeInstanceHealthSnapshot(TypedDict):
    pass


class RuntimeInstanceHealthSnapshotLoadMatch(TypedDict):
    runtime_instance_id: str


class RuntimeInstanceHealthSnapshotCreateData(TypedDict):
    runtime_instance_id: str


class SandboxIntegration(TypedDict):
    can_manage: bool
    catalog: list
    configuration: dict
    connected_profiles: dict
    credentials: dict
    enabled: bool
    id: str
    integrations: list
    name: str
    provider: str
    version: int


class SandboxIntegrationLoadMatchRequired(TypedDict):
    organization_id: str


class SandboxIntegrationLoadMatch(SandboxIntegrationLoadMatchRequired, total=False):
    provider: str


class SandboxIntegrationCreateData(TypedDict):
    organization_id: str
    configuration: dict
    credentials: dict
    name: str
    provider: str


class SandboxIntegrationUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class SandboxIntegrationUpdateData(SandboxIntegrationUpdateDataRequired, total=False):
    credentials: dict
    enabled: bool
    name: str
    version: int


class SandboxIntegrationPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class SandboxIntegrationPatchData(SandboxIntegrationPatchDataRequired, total=False):
    credentials: dict
    enabled: bool
    name: str
    version: int


class ScenarioRevision(TypedDict):
    action: str
    batch: str
    created_at: str
    definition: dict
    id: str
    source: str
    user: Any
    version: int


class ScenarioRevisionListMatchRequired(TypedDict):
    organization_id: str
    project_id: str
    scenario_id: str


class ScenarioRevisionListMatch(ScenarioRevisionListMatchRequired, total=False):
    page: int


class ScenarioRunLessonRequired(TypedDict):
    finding: str
    workaround: str


class ScenarioRunLesson(ScenarioRunLessonRequired, total=False):
    title: str


class ScenarioRunLessonCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    run_id: str
    scenario_run_id: str
    finding: str
    workaround: str


class ScenarioRunLessonCreateData(ScenarioRunLessonCreateDataRequired, total=False):
    title: str


class ScenarioRunScenarioEdit(TypedDict):
    pass


class ScenarioRunScenarioEditCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    run_id: str
    scenario_run_id: str


class ScenarioRunScenarioEditCreateData(ScenarioRunScenarioEditCreateDataRequired, total=False):
    idempotency_key: Any
    outcomes: Any
    prompt: Any
    steps: Any
    version: Any
    viewer_time_zone: Any


class SecretGrant(TypedDict, total=False):
    id: str


class SecretGrantLoadMatchRequired(TypedDict):
    organization_id: str
    secret_id: str


class SecretGrantLoadMatch(SecretGrantLoadMatchRequired, total=False):
    id: str


class SecretGrantCreateData(TypedDict):
    organization_id: str
    secret_id: str


class SecretGrantUpdateData(TypedDict):
    id: str
    organization_id: str
    secret_id: str


class SecretGrantPatchData(TypedDict):
    id: str
    organization_id: str
    secret_id: str


class SecretGrantRemoveMatch(TypedDict):
    id: str
    organization_id: str
    secret_id: str


class SecretVersion(TypedDict, total=False):
    id: str


class SecretVersionLoadMatchRequired(TypedDict):
    organization_id: str
    secret_id: str


class SecretVersionLoadMatch(SecretVersionLoadMatchRequired, total=False):
    id: str


class SecretVersionCreateData(TypedDict):
    organization_id: str
    secret_id: str


class SecretVersionUpdateData(TypedDict):
    id: str
    organization_id: str
    secret_id: str


class SecretVersionPatchData(TypedDict):
    id: str
    organization_id: str
    secret_id: str


class SecretVersionRemoveMatch(TypedDict):
    id: str
    organization_id: str
    secret_id: str


class ServiceEndpoint(TypedDict, total=False):
    id: str


class ServiceEndpointLoadMatchRequired(TypedDict):
    app_id: str
    service_id: str


class ServiceEndpointLoadMatch(ServiceEndpointLoadMatchRequired, total=False):
    id: str


class ServiceEndpointCreateData(TypedDict):
    app_id: str
    service_id: str


class ServiceEndpointUpdateData(TypedDict):
    app_id: str
    id: str
    service_id: str


class ServiceEndpointPatchData(TypedDict):
    app_id: str
    id: str
    service_id: str


class ServiceEndpointRemoveMatch(TypedDict):
    app_id: str
    id: str
    service_id: str


class Setting(TypedDict):
    can_manage_pr_scenario_writing: bool
    can_manage_sandbox_region: bool
    dedicated_outbound_ip_addresses: list
    default_trunk_bookmark: str
    organization: dict
    sandbox_regions: list


class SettingLoadMatch(TypedDict):
    organization_id: str


class SettingMutationLease(TypedDict):
    pass


class SettingMutationLeaseCreateDataRequired(TypedDict):
    organization_id: str
    repo_id: str


class SettingMutationLeaseCreateData(SettingMutationLeaseCreateDataRequired, total=False):
    reason: Any


class Signal(TypedDict):
    acked_at: str | None
    acked_by: dict | None
    agent_runs: dict
    app_service_id: str | None
    attribution: dict
    created_at: str
    dedupe_key: str | None
    hosted_app_id: str | None
    id: str
    kind: str
    links: dict
    occurred_at: str
    organization_id: str
    payload: dict
    recovery: dict
    resolution: dict
    severity: str
    source: dict
    subject_id: str | None
    subject_type: str | None
    summary: str


class SignalLoadMatch(TypedDict):
    id: str
    organization_id: str


class SignalListMatchRequired(TypedDict):
    organization_id: str


class SignalListMatch(SignalListMatchRequired, total=False):
    after_id: str
    before_id: str
    hosted_app_id: str
    integration_id: str
    kind: str
    limit: int
    min_severity: str
    order: str
    severity: str
    since: str
    source: str
    subscription_id: str
    unacked: bool


class SignalCreateData(TypedDict):
    pass


class SignalInbound(TypedDict, total=False):
    id: str


class SignalInboundUpdateData(TypedDict):
    id: str
    inbound_id: str


class SignalIntegrationRequired(TypedDict):
    api_token_stored: bool
    config: dict
    failure_message: str | None
    id: str
    inbound_path: str
    inbound_url: str
    mode: str
    name: str
    organization_id: str
    provider: str
    rejected_signature_count: int
    status: str
    target_count: int
    unmapped_delivery_count: int
    webhook_secret_stored: bool


class SignalIntegration(SignalIntegrationRequired, total=False):
    api_token: str
    created_at: str | None
    last_received_at: str | None
    last_verified_at: str | None
    updated_at: str | None
    webhook_secret: str


class SignalIntegrationLoadMatch(TypedDict):
    id: str
    organization_id: str


class SignalIntegrationListMatch(TypedDict):
    organization_id: str


class SignalIntegrationCreateDataRequired(TypedDict):
    organization_id: str
    name: str
    provider: str


class SignalIntegrationCreateData(SignalIntegrationCreateDataRequired, total=False):
    api_token: str
    config: dict
    mode: str
    webhook_secret: str


class SignalIntegrationUpdateDataRequired(TypedDict):
    id: str
    organization_id: str


class SignalIntegrationUpdateData(SignalIntegrationUpdateDataRequired, total=False):
    api_token: str
    config: dict
    mode: str
    name: str
    status: str
    webhook_secret: str


class SignalIntegrationPatchDataRequired(TypedDict):
    id: str
    organization_id: str


class SignalIntegrationPatchData(SignalIntegrationPatchDataRequired, total=False):
    api_token: str
    config: dict
    mode: str
    name: str
    status: str
    webhook_secret: str


class SignalIntegrationRemoveMatch(TypedDict):
    id: str
    organization_id: str


class SignalIntegrationDeliveryRequired(TypedDict):
    attempt_count: int
    delivery_id: str
    id: str
    organization_id: str
    provider: str
    signal_integration_id: str
    state: str


class SignalIntegrationDelivery(SignalIntegrationDeliveryRequired, total=False):
    created_at: str | None
    event_kind: str | None
    last_error: str | None
    ops_signal_id: str | None
    processed_at: str | None
    received_at: str | None


class SignalIntegrationDeliveryListMatchRequired(TypedDict):
    organization_id: str
    signal_integration_id: str


class SignalIntegrationDeliveryListMatch(SignalIntegrationDeliveryListMatchRequired, total=False):
    limit: int


class SignalIntegrationTargetRequired(TypedDict):
    enabled: bool
    external_id: str
    external_kind: str
    id: str
    organization_id: str
    signal_integration_id: str
    signal_integration_targets: list
    targets: list


class SignalIntegrationTarget(SignalIntegrationTargetRequired, total=False):
    app_service_id: str | None
    created_at: str | None
    display_name: str | None
    external_slug: str | None
    hosted_app_id: str | None
    updated_at: str | None


class SignalIntegrationTargetListMatch(TypedDict):
    organization_id: str
    signal_integration_id: str


class SignalIntegrationTargetUpdateDataRequired(TypedDict):
    organization_id: str
    signal_integration_id: str


class SignalIntegrationTargetUpdateData(SignalIntegrationTargetUpdateDataRequired, total=False):
    targets: list


class SignalSubscription(TypedDict, total=False):
    id: str


class SignalSubscriptionLoadMatchRequired(TypedDict):
    organization_id: str


class SignalSubscriptionLoadMatch(SignalSubscriptionLoadMatchRequired, total=False):
    id: str


class SignalSubscriptionCreateData(TypedDict):
    organization_id: str


class SignalSubscriptionUpdateData(TypedDict):
    id: str
    organization_id: str


class SignalSubscriptionPatchData(TypedDict):
    id: str
    organization_id: str


class SignalSubscriptionRemoveMatch(TypedDict):
    id: str
    organization_id: str


class Site(TypedDict):
    activated_at: str | None
    activated_at_label: str | None
    commit_sha: str | None
    created_at: str
    created_at_label: str | None
    creator_user_id: str | None
    deploy_slug: str
    failure_message: str | None
    file_count: int
    file_count_label: str
    finished_at: str | None
    finished_at_label: str | None
    id: str
    is_active: bool
    source_ref: str | None
    started_at: str | None
    started_at_label: str | None
    static_site_id: str
    status: str
    total_bytes: int
    total_bytes_label: str
    trigger_kind: str
    updated_at: str
    updated_at_label: str | None
    uploaded_at: str | None
    uploaded_at_label: str | None


class SiteListMatchRequired(TypedDict):
    organization_id: str


class SiteListMatch(SiteListMatchRequired, total=False):
    site: str


class SiteAccessKey(TypedDict, total=False):
    id: str


class SiteAccessKeyLoadMatch(TypedDict):
    organization_id: str
    site_id: str


class SiteAccessKeyCreateData(TypedDict):
    organization_id: str
    site_id: str


class SiteAccessKeyRemoveMatch(TypedDict):
    id: str
    organization_id: str
    site_id: str


class SitePreview(TypedDict):
    icon_data_url: str | None
    title: str | None
    url: str


class SitePreviewLoadMatch(TypedDict):
    organization_id: str
    url: str


class SiteSecretRequired(TypedDict):
    native_agent_id: str
    value: str


class SiteSecret(SiteSecretRequired, total=False):
    id: str


class SiteSecretUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    site_id: str


class SiteSecretUpdateData(SiteSecretUpdateDataRequired, total=False):
    native_agent_id: str
    value: str


class SiteSecretRemoveMatch(TypedDict):
    id: str
    organization_id: str
    site_id: str


class SlackChannel(TypedDict):
    id: str
    is_member: bool
    is_private: bool
    is_slack_connect: bool
    name: str
    published: bool


class SlackChannelListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class SlackChannelListMatch(SlackChannelListMatchRequired, total=False):
    cursor: str
    kind: str
    q: str
    refresh: bool


class SourceConnection(TypedDict, total=False):
    id: str


class SourceConnectionCreateData(TypedDict):
    id: str


class SpaceAlertRule(TypedDict, total=False):
    id: str


class SpaceAlertRuleLoadMatchRequired(TypedDict):
    space_id: str


class SpaceAlertRuleLoadMatch(SpaceAlertRuleLoadMatchRequired, total=False):
    id: str


class SpaceAlertRuleCreateData(TypedDict):
    space_id: str


class SpaceAlertRuleUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceAlertRulePatchData(TypedDict):
    id: str
    space_id: str


class SpaceAlertRuleRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceAuditEvent(TypedDict):
    pass


class SpaceAuditEventLoadMatch(TypedDict):
    space_id: str


class SpaceAuditEventCreateData(TypedDict):
    space_id: str


class SpaceDnsRecord(TypedDict, total=False):
    id: str


class SpaceDnsRecordLoadMatchRequired(TypedDict):
    space_id: str


class SpaceDnsRecordLoadMatch(SpaceDnsRecordLoadMatchRequired, total=False):
    id: str


class SpaceDnsRecordCreateData(TypedDict):
    space_id: str


class SpaceDnsRecordUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceDnsRecordPatchData(TypedDict):
    id: str
    space_id: str


class SpaceDnsRecordRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceEnrollmentToken(TypedDict, total=False):
    id: str


class SpaceEnrollmentTokenLoadMatchRequired(TypedDict):
    space_id: str


class SpaceEnrollmentTokenLoadMatch(SpaceEnrollmentTokenLoadMatchRequired, total=False):
    id: str


class SpaceEnrollmentTokenCreateData(TypedDict):
    space_id: str


class SpaceEnrollmentTokenUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceEnrollmentTokenPatchData(TypedDict):
    id: str
    space_id: str


class SpaceEnrollmentTokenRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceGateway(TypedDict, total=False):
    id: str


class SpaceGatewayLoadMatchRequired(TypedDict):
    space_id: str


class SpaceGatewayLoadMatch(SpaceGatewayLoadMatchRequired, total=False):
    id: str


class SpaceGatewayCreateData(TypedDict):
    space_id: str


class SpaceGatewayUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceGatewayPatchData(TypedDict):
    id: str
    space_id: str


class SpaceGatewayRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceGroup(TypedDict, total=False):
    id: str


class SpaceGroupLoadMatch(TypedDict):
    space_id: str


class SpaceGroupCreateData(TypedDict):
    space_id: str


class SpaceGroupUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceGroupPatchData(TypedDict):
    id: str
    space_id: str


class SpaceGroupRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceGroupMembership(TypedDict, total=False):
    id: str


class SpaceGroupMembershipLoadMatch(TypedDict):
    space_id: str


class SpaceGroupMembershipCreateData(TypedDict):
    space_id: str


class SpaceGroupMembershipUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceGroupMembershipPatchData(TypedDict):
    id: str
    space_id: str


class SpaceGroupMembershipRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceLogStream(TypedDict):
    pass


class SpaceLogStreamLoadMatch(TypedDict):
    space_id: str


class SpaceLogStreamCreateData(TypedDict):
    space_id: str


class SpaceMetricSery(TypedDict):
    pass


class SpaceMetricSeryLoadMatch(TypedDict):
    space_id: str


class SpaceMetricSeryCreateData(TypedDict):
    space_id: str


class SpaceOtelCollector(TypedDict, total=False):
    id: str


class SpaceOtelCollectorLoadMatchRequired(TypedDict):
    space_id: str


class SpaceOtelCollectorLoadMatch(SpaceOtelCollectorLoadMatchRequired, total=False):
    id: str


class SpaceOtelCollectorCreateData(TypedDict):
    space_id: str


class SpaceOtelCollectorUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceOtelCollectorPatchData(TypedDict):
    id: str
    space_id: str


class SpaceOtelCollectorRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpacePeer(TypedDict, total=False):
    id: str


class SpacePeerLoadMatchRequired(TypedDict):
    space_id: str


class SpacePeerLoadMatch(SpacePeerLoadMatchRequired, total=False):
    id: str


class SpacePeerCreateData(TypedDict):
    space_id: str


class SpacePeerUpdateData(TypedDict):
    id: str
    space_id: str


class SpacePeerPatchData(TypedDict):
    id: str
    space_id: str


class SpacePeerRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpacePeerAttachment(TypedDict, total=False):
    id: str


class SpacePeerAttachmentLoadMatch(TypedDict):
    space_id: str


class SpacePeerAttachmentCreateData(TypedDict):
    space_id: str


class SpacePeerAttachmentUpdateData(TypedDict):
    id: str
    space_id: str


class SpacePeerAttachmentPatchData(TypedDict):
    id: str
    space_id: str


class SpacePeerAttachmentRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpacePolicy(TypedDict, total=False):
    id: str


class SpacePolicyLoadMatchRequired(TypedDict):
    space_id: str


class SpacePolicyLoadMatch(SpacePolicyLoadMatchRequired, total=False):
    id: str


class SpacePolicyCreateData(TypedDict):
    space_id: str


class SpacePolicyUpdateData(TypedDict):
    id: str
    space_id: str


class SpacePolicyPatchData(TypedDict):
    id: str
    space_id: str


class SpacePolicyRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceSegment(TypedDict, total=False):
    id: str


class SpaceSegmentLoadMatchRequired(TypedDict):
    space_id: str


class SpaceSegmentLoadMatch(SpaceSegmentLoadMatchRequired, total=False):
    id: str


class SpaceSegmentCreateData(TypedDict):
    space_id: str


class SpaceSegmentUpdateData(TypedDict):
    id: str
    space_id: str


class SpaceSegmentPatchData(TypedDict):
    id: str
    space_id: str


class SpaceSegmentRemoveMatch(TypedDict):
    id: str
    space_id: str


class SpaceTraceSpan(TypedDict):
    pass


class SpaceTraceSpanLoadMatch(TypedDict):
    space_id: str


class SpaceTraceSpanCreateData(TypedDict):
    space_id: str


class SparkRequired(TypedDict):
    activated_products: list
    can_activate_products: bool
    can_manage: bool
    compute_credit_cents: int | None
    created_at: str
    created_at_label: str | None
    credit_cents: int | None
    first_spark: dict | None
    github_connected: bool
    github_prs_authored_by_change_author: bool
    id: str
    jsonrpc: str
    logo_url: str | None
    member_count: int
    method: str
    name: str
    pending_invitation_count: int
    personal: bool
    repository_count: int
    role: str | None
    sandbox_region: str
    slug: str
    started: bool
    timezone: str
    updated_at: str
    updated_at_label: str | None
    verify_pr_scenario_writing_enabled: bool


class Spark(SparkRequired, total=False):
    agents_only: bool
    params: dict
    shared_agent_personal_accounts_enabled: bool
    source_control_providers: list
    source_ui_enabled: bool


class SparkLoadMatch(TypedDict):
    organization_id: str


class SparkCreateDataRequired(TypedDict):
    jsonrpc: str
    method: str


class SparkCreateData(SparkCreateDataRequired, total=False):
    id: str
    params: dict


class SparkAgentIntegrationRequired(TypedDict):
    account_counts: dict
    accounts_path: str
    added_toolkits: list
    can_manage: bool
    can_manage_organization: bool
    catalog: list
    connect_as: str | None
    connect_as_by_toolkit: dict
    connected_counts: dict
    connection_id: str
    connections: list
    email: dict
    enabled: bool
    enabled_toolkits: list
    generation: int
    pagination: dict
    pending_counts: dict
    private_agent: bool
    shared_agent_personal_accounts_enabled: bool
    slack: dict
    webhook_connections: list
    webhooks_available: bool


class SparkAgentIntegration(SparkAgentIntegrationRequired, total=False):
    personal_creation_key_supported: bool


class SparkAgentIntegrationLoadMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class SparkAgentIntegrationLoadMatch(SparkAgentIntegrationLoadMatchRequired, total=False):
    catalog_q: str
    cursor: str
    limit: int
    q: str
    toolkit: str


class SparkAgentIntegrationCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str
    connection_id: str
    enabled: bool
    generation: int


class SparkAgentIntegrationCreateData(SparkAgentIntegrationCreateDataRequired, total=False):
    cursor: str
    limit: int
    q: str
    toolkit: str


class SparkAgentLocalThreadRequired(TypedDict):
    action: str
    archived: bool
    can_archive: bool
    can_end: bool
    can_interrupt: bool
    can_send: bool
    created_at: str
    delivery: dict
    device_id: str
    device_name: str
    end: Any
    expires_at: str
    full_title: str
    id: str
    key: str
    last_activity_at: str | None
    native_thread_id: str
    parent_conversation_id: str | None
    provider: str
    references: dict
    relay_participant: dict
    result: Any
    result_expired: bool
    section: str
    state: str
    status: str | None
    task_configured: bool
    thread_id: str
    title: str


class SparkAgentLocalThread(SparkAgentLocalThreadRequired, total=False):
    can_disconnect_relay: bool
    diagnostic_code: str
    relay_disconnected_at: str | None
    result_schema: dict | bool


class SparkAgentLocalThreadLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class SparkAgentLocalThreadCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str
    device_id: str
    key: str
    provider: str
    thread_id: str


class SparkAgentLocalThreadCreateData(SparkAgentLocalThreadCreateDataRequired, total=False):
    result_schema: dict | bool


class SparkAgentLocalThreadUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class SparkAgentLocalThreadUpdateData(SparkAgentLocalThreadUpdateDataRequired, total=False):
    allowed_senders: Any
    ask_first: Any
    expected_version: Any
    reply_with_final_answer: Any
    restricted: Any


class SparkAgentSite(TypedDict):
    deployed_at: str
    deployments_count: int
    hostname: str
    https: str
    id: str
    name: str
    url: str
    visibility: str


class SparkAgentSiteListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class SparkAgentSiteListMatch(SparkAgentSiteListMatchRequired, total=False):
    cursor: str
    limit: int


class SparkAgentSkillRequired(TypedDict):
    available: bool
    can_configure: bool
    can_manage: bool
    description: str
    enabled: bool
    name: str
    skills: list
    version: str


class SparkAgentSkill(SparkAgentSkillRequired, total=False):
    configuration_state: str


class SparkAgentSkillListMatch(TypedDict):
    agent_id: str
    organization_id: str


class SparkAgentSkillCreateData(TypedDict):
    agent_id: str
    organization_id: str
    enabled: bool
    name: str
    version: str


class SparkAgentThreadRequired(TypedDict):
    archived: bool
    attention: dict | None
    can_archive: bool
    can_compact: bool
    can_snooze: bool
    group: str
    has_active_run: bool
    id: str
    is_main: bool
    kind: str
    older: bool
    snoozed_until: str | None
    thread: dict
    updated_at: str | None


class SparkAgentThread(SparkAgentThreadRequired, total=False):
    archive_deletes_sandbox: bool
    coordination_status: str | None
    execution: Any
    first_input: Any
    first_input_key: str
    first_input_requester_membership_id: str
    inherit_context: bool
    message: str
    parent_conversation_id: str
    parent_conversation_title: str
    requester_membership_id: str
    title: str


class SparkAgentThreadListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class SparkAgentThreadListMatch(SparkAgentThreadListMatchRequired, total=False):
    archived: bool
    conversation_id: str
    cursor: str
    local_cursor: str


class SparkAgentThreadCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class SparkAgentThreadCreateData(SparkAgentThreadCreateDataRequired, total=False):
    execution: Any
    inherit_context: bool
    message: str
    parent_conversation_id: str
    requester_membership_id: str
    title: str


class SparkCreditRequired(TypedDict):
    autofill: Any
    autofill_payment_unconfirmed: bool
    available_usd: str
    can_manage: bool
    compute_minutes: dict
    credits_per_usd: int
    kind: str
    payment_method: dict | None
    payments_enabled: bool
    plan: str | None
    plans: list
    refill_limits_cents: list
    refill_options: list
    refill_thresholds_cents: list
    request_key: str
    settings: Any
    starter_cents: int
    top_up_max_cents: int
    top_up_step_cents: int


class SparkCredit(SparkCreditRequired, total=False):
    amount_cents: int
    billing_unit: str
    compute_usd: str
    inference_usd: str
    quoted_credits_cents: int
    quoted_price_cents: int


class SparkCreditLoadMatchRequired(TypedDict):
    organization_id: str


class SparkCreditLoadMatch(SparkCreditLoadMatchRequired, total=False):
    view: str


class SparkCreditCreateDataRequired(TypedDict):
    organization_id: str
    kind: str
    request_key: str


class SparkCreditCreateData(SparkCreditCreateDataRequired, total=False):
    amount_cents: int
    billing_unit: str
    plan: str | None
    quoted_credits_cents: int
    quoted_price_cents: int


class SparkCreditUpdateData(TypedDict):
    organization_id: str


class SparkCreditPatchDataRequired(TypedDict):
    organization_id: str


class SparkCreditPatchData(SparkCreditPatchDataRequired, total=False):
    view: str
    settings: Any


class SparkCreditAgentUsageRequired(TypedDict):
    agents: list
    all: dict
    days: list
    owners: list


class SparkCreditAgentUsage(SparkCreditAgentUsageRequired, total=False):
    id: str


class SparkCreditAgentUsageLoadMatch(TypedDict):
    id: str
    organization_id: str


class SparkCreditUsageTotal(TypedDict):
    compute_minutes_used: str
    compute_usd: str
    inference_usd: str


class SparkCreditUsageTotalLoadMatch(TypedDict):
    organization_id: str


class StaticSite(TypedDict):
    active_deployment_id: str | None
    cdn_hostname: str
    cdn_url: str
    cname_target: str
    created_at: str
    default_url: str
    description: str | None
    error_document: str | None
    failure_message: str | None
    hosted_app_id: str | None
    id: str
    index_document: str
    name: str
    organization_id: str
    provisioned: bool
    provisioned_at: str | None
    region: str | None
    replication_regions: list
    repository_id: str | None
    slug: str
    status: str
    updated_at: str


class StaticSiteLoadMatch(TypedDict):
    id: str


class StaticSiteListMatch(TypedDict):
    organization_id: str


class StaticSiteCreateDataRequired(TypedDict):
    organization_id: str
    name: str
    slug: str


class StaticSiteCreateData(StaticSiteCreateDataRequired, total=False):
    description: str | None
    error_document: str | None
    hosted_app_id: str | None
    index_document: str
    region: str | None
    replication_regions: list
    repository_id: str | None


class StaticSiteUpdateData(TypedDict):
    id: str


class StaticSitePatchData(TypedDict):
    id: str


class StaticSiteRemoveMatch(TypedDict):
    id: str


class StaticSiteDeployment(TypedDict):
    activated_at: str | None
    activated_at_label: str | None
    commit_sha: str | None
    created_at: str
    created_at_label: str | None
    creator_user_id: str | None
    deploy_slug: str
    failure_message: str | None
    file_count: int
    file_count_label: str
    finished_at: str | None
    finished_at_label: str | None
    id: str
    is_active: bool
    source_ref: str | None
    started_at: str | None
    started_at_label: str | None
    static_site_id: str
    status: str
    total_bytes: int
    total_bytes_label: str
    trigger_kind: str
    updated_at: str
    updated_at_label: str | None
    uploaded_at: str | None
    uploaded_at_label: str | None


class StaticSiteDeploymentLoadMatch(TypedDict):
    id: str
    static_site_id: str


class StaticSiteDeploymentListMatch(TypedDict):
    static_site_id: str


class StaticSiteDeploymentCreateData(TypedDict):
    static_site_id: str


class StaticSiteDomain(TypedDict):
    app_environment_id: str | None
    app_service_id: str | None
    created_at: str
    dns_mode: str
    dns_status: str
    failure_message: str | None
    hosted_app_id: str | None
    hostname: str
    id: str
    kind: str
    last_checked_at: str | None
    record_name: str | None
    record_type: str | None
    record_value: str | None
    redirect_to: str | None
    static_site_id: str | None
    target_kind: str
    tls_status: str
    updated_at: str
    verification_status: str


class StaticSiteDomainLoadMatch(TypedDict):
    id: str
    static_site_id: str


class StaticSiteDomainListMatch(TypedDict):
    static_site_id: str


class StaticSiteDomainCreateDataRequired(TypedDict):
    static_site_id: str
    hostname: str


class StaticSiteDomainCreateData(StaticSiteDomainCreateDataRequired, total=False):
    dns_mode: str
    kind: str
    redirect_to: str | None


class StaticSiteDomainUpdateData(TypedDict):
    id: str
    static_site_id: str


class StaticSiteDomainPatchData(TypedDict):
    id: str
    static_site_id: str


class StaticSiteDomainRemoveMatch(TypedDict):
    id: str
    static_site_id: str


class StatusChangeRequired(TypedDict):
    change_id: str
    patchsets: list
    status: str
    status_label: str
    status_state: str
    status_tone: str


class StatusChange(StatusChangeRequired, total=False):
    id: str


class StatusChangeLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class StatusCommitRequired(TypedDict):
    checks: list
    commit_sha: str
    counts: dict
    status: str
    status_label: str
    status_state: str
    status_tone: str
    total: int


class StatusCommit(StatusCommitRequired, total=False):
    id: str


class StatusCommitLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class StatusPatchsetRequired(TypedDict):
    checks: list
    checks_status: str | None
    commit_sha: str | None
    counts: dict
    patchset_id: str
    status: str
    status_label: str
    status_state: str
    status_tone: str
    total: int


class StatusPatchset(StatusPatchsetRequired, total=False):
    id: str


class StatusPatchsetLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class StripeWebhook(TypedDict):
    pass


class StripeWebhookCreateData(TypedDict):
    pass


class SubmitTelemetry(TypedDict):
    pass


class SubmitTelemetryCreateData(TypedDict):
    pass


class SubscriptionModelRequired(TypedDict):
    id: str
    name: str
    provider: str


class SubscriptionModel(SubscriptionModelRequired, total=False):
    default_reasoning: str
    reasoning: list
    speeds: list


class SubscriptionModelListMatch(TypedDict):
    agent_id: str
    organization_id: str
    profile_id: str


class SwarmEvent(TypedDict):
    agent_swarm_id: str
    attempt_id: str | None
    created_at: str
    created_at_label: str | None
    id: int
    kind: str
    payload: dict
    reason: str | None
    scheduler_generation: int | None
    task_id: str | None


class SwarmEventListMatchRequired(TypedDict):
    swarm_id: str


class SwarmEventListMatch(SwarmEventListMatchRequired, total=False):
    after: int
    kind: str
    limit: int


class SwarmLive(TypedDict):
    pass


class SwarmLiveLoadMatchRequired(TypedDict):
    swarm_id: str


class SwarmLiveLoadMatch(SwarmLiveLoadMatchRequired, total=False):
    after_event_id: int
    after_seq: int
    cursor: str
    limit: int


class SwarmNoteRequired(TypedDict):
    text: str


class SwarmNote(SwarmNoteRequired, total=False):
    task_id: str | None


class SwarmNoteCreateDataRequired(TypedDict):
    swarm_id: str
    text: str


class SwarmNoteCreateData(SwarmNoteCreateDataRequired, total=False):
    task_id: str | None


class SwarmTask(TypedDict):
    acceptance_commands: list
    agent_swarm_id: str
    assigned_runner_id: str | None
    blocked_reason: str | None
    changes: list
    commit_count: int
    commit_sha_result: str | None
    created_at: str
    created_at_label: str | None
    current_attempt_id: str | None
    deadline_at: str | None
    depends_on_task_ids: list
    depth: int
    diff_artifact_url: str | None
    display_id: int
    environment_profile: str | None
    error_message: str | None
    failure_code: str | None
    finished_at: str | None
    finished_at_label: str | None
    harness: str
    id: str
    input_revision: str | None
    iteration: int
    landing_state: str
    model: str | None
    model_provider: str | None
    number: int
    organization_id: str
    owned_paths: list
    parent_task_id: str | None
    position: int
    prompt: str
    queued_at: str | None
    queued_at_label: str | None
    reasoning_effort: str | None
    recent_activity: list
    repo_url: str
    result: dict
    retry_number: int
    role: str
    run_id: str | None
    stack_after_task_id: str | None
    started_at: str | None
    started_at_label: str | None
    status: str
    title: str | None
    updated_at: str
    updated_at_label: str | None


class SwarmTaskLoadMatchRequired(TypedDict):
    id: str
    swarm_id: str


class SwarmTaskLoadMatch(SwarmTaskLoadMatchRequired, total=False):
    after_seq: int
    limit: int


class SwarmTaskListMatch(TypedDict):
    swarm_id: str


class TaskLease(TypedDict, total=False):
    id: str


class TaskLeaseCreateData(TypedDict):
    swarm_id: str
    task_id: str


class ThreadPreview(TypedDict):
    expires_at: str | None
    port: int
    url: str


class ThreadPreviewCreateData(TypedDict):
    agent_id: str
    organization_id: str
    thread_id: str
    port: int


class ThreadPreviewAccess(TypedDict):
    pass


class ThreadPreviewAccessLoadMatchRequired(TypedDict):
    host: str


class ThreadPreviewAccessLoadMatch(ThreadPreviewAccessLoadMatchRequired, total=False):
    return_to: str


class ThreadPreviewAccessCreateData(TypedDict, total=False):
    host: Any
    token: Any


class ToolFeedback(TypedDict):
    category: str
    created_at: str
    details: str
    feedback: dict
    id: str
    metadata: dict
    organization_id: str
    source: str
    summary: str
    user_id: str


class ToolFeedbackLoadMatch(TypedDict):
    id: str
    organization_id: str


class ToolFeedbackCreateData(TypedDict):
    organization_id: str
    feedback: dict


class Transcript(TypedDict):
    agent: str
    author: dict
    checkpoint_pagination: dict
    checkpoints: list
    id: str
    last_checkpoint_at: str | None
    selected_checkpoint: Any
    source_url: str
    started_at: str
    status: str
    title: str | None


class TranscriptLoadMatch(TypedDict, total=False):
    around_event: int
    cursor: str
    event_digest: str
    include_tool: bool
    limit: int
    max_byte: int
    source_ref: str


class TranscriptListMatchRequired(TypedDict):
    repo: str


class TranscriptListMatch(TranscriptListMatchRequired, total=False):
    change: str
    checkpoint_cursor: str
    commit: str
    cursor: str
    limit: int
    patchset: int
    pr: str
    session: str


TranscriptCreateDataRequired = TypedDict('TranscriptCreateDataRequired', {
    "organization_id": str,
    "status": str,
})

TranscriptCreateDataOptional = TypedDict('TranscriptCreateDataOptional', {
    "adapter": Any,
    "cursor": Any,
    "from": Any,
    "limit": Any,
    "max_bytes": Any,
    "mode": Any,
    "query": Any,
    "repo": Any,
    "to": Any,
    "user": Any,
}, total=False)


class TranscriptCreateData(TranscriptCreateDataRequired, TranscriptCreateDataOptional):
    pass


class V1Message(TypedDict):
    pass


class V1MessageCreateData(TypedDict):
    organization_id: str


class VcBranchRequired(TypedDict):
    name: str
    target_commit_id: str


class VcBranch(VcBranchRequired, total=False):
    id: str


class VcBranchListMatch(TypedDict):
    organization_id: str
    repo_id: str


class VcBranchCreateData(TypedDict):
    organization_id: str
    repo_id: str


class VcBranchRemoveMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcBrowser(TypedDict):
    pass


class VcBrowserLoadMatchRequired(TypedDict):
    organization_id: str
    repo_id: str
    ref: str


class VcBrowserLoadMatch(VcBrowserLoadMatchRequired, total=False):
    file: str
    path: str
    recursive: bool


class VcChangeRequired(TypedDict):
    activity: list
    canonical_path: str
    change: Any
    id: str
    landing: dict
    number: int
    previews: list
    related_changes: list
    relation_chain: list
    status: str
    sync: dict
    target: dict
    target_advanced: bool
    target_branch: str
    title: str


class VcChange(VcChangeRequired, total=False):
    checks: list
    checks_status: str
    description: str | None
    group: dict | None
    jj_change_id: str | None
    labels: list
    patchset_number: int | None
    primary_status: str | None
    public_id: str
    restack_state: str
    review_summary: dict
    stack: Any
    url: str


class VcChangeLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcChangeListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class VcChangeListMatch(VcChangeListMatchRequired, total=False):
    group: str
    label: str
    limit: int
    mine: bool
    page: int
    status: str
    target: str


class VcChangeCreateDataRequired(TypedDict):
    organization_id: str
    repo_id: str
    title: str


class VcChangeCreateData(VcChangeCreateDataRequired, total=False):
    id: str
    description: str | None
    labels: list
    assets: Any
    base: Any
    draft: Any
    dry_run: Any
    expected_base_commit_id: Any
    expected_head_commit_id: Any
    expected_review_head_commit_id: Any
    expected_review_patchset_number: Any
    git_publication_id: Any
    head: Any
    into: Any
    message: Any
    remove_reviewers: Any
    request_id: Any
    reviewers: Any
    transcript_chat: Any


class VcChangeUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcChangeUpdateData(VcChangeUpdateDataRequired, total=False):
    description: str | None
    assets: Any


class VcChangeGroupRequired(TypedDict):
    changes: list
    status: str
    title: str | None


class VcChangeGroup(VcChangeGroupRequired, total=False):
    id: str
    name: str
    number: int


class VcChangeGroupLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcChangeGroupListMatch(TypedDict):
    organization_id: str
    repo_id: str


class VcChangeGroupCreateDataRequired(TypedDict):
    organization_id: str
    repo_id: str
    name: str


class VcChangeGroupCreateData(VcChangeGroupCreateDataRequired, total=False):
    title: str | None


class VcFile(TypedDict):
    paths: list
    truncated: bool


class VcFileListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str
    ref: str


class VcFileListMatch(VcFileListMatchRequired, total=False):
    prefix: str


class VcMergeQueueRequired(TypedDict):
    analytics: dict
    policy: dict
    queue: dict


class VcMergeQueue(VcMergeQueueRequired, total=False):
    id: str
    target_branches: list


class VcMergeQueueLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcMergeQueueLoadMatch(VcMergeQueueLoadMatchRequired, total=False):
    change: str
    entry_id: str
    page: int
    window_day: int


class VcMergeQueueListMatchRequired(TypedDict):
    organization_id: str
    repo_id: str


class VcMergeQueueListMatch(VcMergeQueueListMatchRequired, total=False):
    change: str
    entry_id: str
    page: int
    target: str
    window_day: int


class VcMergeQueueCreateDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcMergeQueueCreateData(VcMergeQueueCreateDataRequired, total=False):
    expected_version: Any


class VcMergeQueueUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcMergeQueueUpdateData(VcMergeQueueUpdateDataRequired, total=False):
    concurrency: Any
    enabled: Any
    expected_version: Any


class VcStackRequired(TypedDict):
    alias_ref_name: str | None
    changes: list
    code: str
    landing: dict
    member_count: int
    name: str | None
    ref_name: str
    status: str
    tip_change_number: int | None
    updated_at: str
    updated_at_label: str


class VcStack(VcStackRequired, total=False):
    id: str


class VcStackLoadMatch(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcStackListMatch(TypedDict):
    organization_id: str
    repo_id: str


class VcStackUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    repo_id: str


class VcStackUpdateData(VcStackUpdateDataRequired, total=False):
    name: str | None


class VcsNode(TypedDict):
    account_avatar_url: str | None
    account_id: str | None
    account_login: str
    created_at: str
    created_at_label: str | None
    id: str
    installation_id: str
    installed_at: str | None
    installed_at_label: str | None
    manage_access_url: str
    organization_id: str
    permission_entries: list
    permissions: dict
    status: str
    suspended_at: str | None
    suspended_at_label: str | None
    updated_at: str
    updated_at_label: str | None


class VcsNodeListMatch(TypedDict):
    organization_id: str


class VcsSetting(TypedDict):
    can_manage_pr_scenario_writing: bool
    can_manage_sandbox_region: bool
    dedicated_outbound_ip_addresses: list
    default_trunk_bookmark: str
    organization: dict
    sandbox_regions: list


class VcsSettingLoadMatch(TypedDict):
    organization_id: str


class VerificationProjectCredentialRequired(TypedDict):
    composal_address: str | None
    configured: bool
    credential_keys: dict
    description: str | None
    email_link_auth_origins: list
    has_inbox: bool
    id: str
    identity_provider: dict | None
    instructions: str | None
    login_method: str
    login_url: str
    managed: bool
    mfa_enabled: bool
    name: str
    project_id: str
    provider_guidance: str
    sign_in_verified: bool
    sign_in_verified_at: str | None
    status: str
    updated_at: str
    username: str


class VerificationProjectCredential(VerificationProjectCredentialRequired, total=False):
    browser_authentication: dict | None
    browser_session: str
    composal_inbox: bool
    composal_inbox_user: str
    composal_managed_google: bool
    cookies: str
    oidc: dict
    passkey: str
    password: str
    remove_browser_authentication: bool
    remove_totp: bool
    totp_secret: str


class VerificationProjectCredentialLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectCredentialListMatch(TypedDict):
    organization_id: str
    project_id: str


class VerificationProjectCredentialCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    login_method: str
    name: str


class VerificationProjectCredentialCreateData(VerificationProjectCredentialCreateDataRequired, total=False):
    browser_session: str
    composal_inbox: bool
    composal_inbox_user: str
    composal_managed_google: bool
    cookies: str
    description: str | None
    email_link_auth_origins: list
    instructions: str | None
    login_url: str
    oidc: dict
    passkey: str
    password: str
    remove_browser_authentication: bool
    remove_totp: bool
    totp_secret: str
    username: str


class VerificationProjectCredentialUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectCredentialUpdateData(VerificationProjectCredentialUpdateDataRequired, total=False):
    browser_session: str
    composal_inbox: bool
    composal_inbox_user: str
    composal_managed_google: bool
    cookies: str
    description: str | None
    email_link_auth_origins: list
    instructions: str | None
    login_method: str
    login_url: str
    name: str
    oidc: dict
    passkey: str
    password: str
    remove_browser_authentication: bool
    remove_totp: bool
    totp_secret: str
    username: str


class VerificationProjectCredentialPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectCredentialPatchData(VerificationProjectCredentialPatchDataRequired, total=False):
    browser_session: str
    composal_inbox: bool
    composal_inbox_user: str
    composal_managed_google: bool
    cookies: str
    description: str | None
    email_link_auth_origins: list
    instructions: str | None
    login_method: str
    login_url: str
    name: str
    oidc: dict
    passkey: str
    password: str
    remove_browser_authentication: bool
    remove_totp: bool
    totp_secret: str
    username: str


class VerificationProjectCredentialRemoveMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectCredentialRemoveMatch(VerificationProjectCredentialRemoveMatchRequired, total=False):
    permanent: bool


class VerificationProjectPersona(TypedDict):
    access_mode: str
    archived_at: str | None
    capabilities: str | None
    created_at: str
    credential_id: str | None
    goals: str | None
    id: str
    lock_version: int
    name: str
    project_id: str
    role: str
    updated_at: str
    version: int


class VerificationProjectPersonaLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectPersonaListMatch(TypedDict):
    organization_id: str
    project_id: str


class VerificationProjectPersonaCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    name: str
    role: str


class VerificationProjectPersonaCreateData(VerificationProjectPersonaCreateDataRequired, total=False):
    access_mode: str
    capabilities: str | None
    credential_id: str | None
    goals: str | None


class VerificationProjectPersonaUpdateDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectPersonaUpdateData(VerificationProjectPersonaUpdateDataRequired, total=False):
    access_mode: str
    capabilities: str | None
    credential_id: str | None
    goals: str | None
    name: str
    role: str
    version: int


class VerificationProjectPersonaPatchDataRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectPersonaPatchData(VerificationProjectPersonaPatchDataRequired, total=False):
    access_mode: str
    capabilities: str | None
    credential_id: str | None
    goals: str | None
    name: str
    role: str
    version: int


class VerificationProjectPersonaRemoveMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectRunRequired(TypedDict):
    approved_at: str | None
    approved_digest: str | None
    archived_at: str | None
    available_tests: list
    can_archive: bool
    can_restore: bool
    can_start_another_run: bool
    cleanup_state: str
    concurrency: int
    created_at: str
    creator_name: str | None
    definition_mode: str
    environment_id: str | None
    id: str
    lock_version: int
    max_seconds: int
    outcome: str | None
    permissions: dict
    plan_digest: str | None
    preparation_error_code: str | None
    progress: dict
    project: dict
    project_id: str
    pull_request: Any
    queued_at: str | None
    run: dict
    scenario_runs: list
    source_run_id: str | None
    source_versions: list | None
    start_when_prepared: bool
    state: str
    target_snapshot: dict
    title: str
    updated_at: str
    verifier_preferences_snapshot: dict
    web_path: str


class VerificationProjectRun(VerificationProjectRunRequired, total=False):
    run_plan_id: str | None


class VerificationProjectRunLoadMatchRequired(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectRunLoadMatch(VerificationProjectRunLoadMatchRequired, total=False):
    diagnostic: bool


class VerificationProjectRunListMatchRequired(TypedDict):
    organization_id: str
    project_id: str


class VerificationProjectRunListMatch(VerificationProjectRunListMatchRequired, total=False):
    page: int
    status: str


class VerificationProjectRunCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    concurrency: int
    environment_id: str | None
    max_seconds: int
    start_when_prepared: bool


class VerificationProjectRunCreateData(VerificationProjectRunCreateDataRequired, total=False):
    id: str
    run_plan_id: str | None
    digest: Any
    idempotency_key: Any
    mode: Any
    run_plan_version: Any
    scenario_files: Any
    scenario_ids: Any
    viewer_time_zone: Any


VerificationProjectScenarioRequired = TypedDict('VerificationProjectScenarioRequired', {
    "allowed_actions": str,
    "archived_at": str | None,
    "created_at": str,
    "dependencies": list,
    "health": dict,
    "id": str,
    "labels": list,
    "last_revision": Any,
    "lock_version": int,
    "name": str,
    "outcomes": list,
    "persona_id": str,
    "project_id": str,
    "selectable_for_run": bool,
    "starting_conditions": str | None,
    "steps": list,
    "triggers": list,
    "updated_at": str,
    "version": int,
})

VerificationProjectScenarioOptional = TypedDict('VerificationProjectScenarioOptional', {
    "actors": dict,
    "cleanup": list,
    "fixtures": list,
    "identity_probe": Any,
    "if": str | None,
    "on": Any,
    "primary_actor": str | None,
}, total=False)


class VerificationProjectScenario(VerificationProjectScenarioRequired, VerificationProjectScenarioOptional):
    pass


class VerificationProjectScenarioLoadMatch(TypedDict):
    id: str
    organization_id: str
    project_id: str


class VerificationProjectScenarioListMatch(TypedDict):
    organization_id: str
    project_id: str


VerificationProjectScenarioCreateDataRequired = TypedDict('VerificationProjectScenarioCreateDataRequired', {
    "organization_id": str,
    "project_id": str,
    "name": str,
})

VerificationProjectScenarioCreateDataOptional = TypedDict('VerificationProjectScenarioCreateDataOptional', {
    "actors": dict,
    "allowed_actions": str,
    "cleanup": list,
    "dependencies": list,
    "fixtures": list,
    "identity_probe": Any,
    "if": str | None,
    "labels": list,
    "on": Any,
    "outcomes": list,
    "persona_id": str,
    "primary_actor": str | None,
    "starting_conditions": str | None,
    "steps": list,
    "triggers": list,
}, total=False)


class VerificationProjectScenarioCreateData(VerificationProjectScenarioCreateDataRequired, VerificationProjectScenarioCreateDataOptional):
    pass


VerificationProjectScenarioUpdateDataRequired = TypedDict('VerificationProjectScenarioUpdateDataRequired', {
    "id": str,
    "organization_id": str,
    "project_id": str,
})

VerificationProjectScenarioUpdateDataOptional = TypedDict('VerificationProjectScenarioUpdateDataOptional', {
    "actors": dict,
    "allowed_actions": str,
    "cleanup": list,
    "dependencies": list,
    "fixtures": list,
    "identity_probe": Any,
    "if": str | None,
    "labels": list,
    "name": str,
    "on": Any,
    "outcomes": list,
    "persona_id": str,
    "primary_actor": str | None,
    "starting_conditions": str | None,
    "steps": list,
    "triggers": list,
    "version": int,
}, total=False)


class VerificationProjectScenarioUpdateData(VerificationProjectScenarioUpdateDataRequired, VerificationProjectScenarioUpdateDataOptional):
    pass


VerificationProjectScenarioPatchDataRequired = TypedDict('VerificationProjectScenarioPatchDataRequired', {
    "id": str,
    "organization_id": str,
    "project_id": str,
})

VerificationProjectScenarioPatchDataOptional = TypedDict('VerificationProjectScenarioPatchDataOptional', {
    "actors": dict,
    "allowed_actions": str,
    "cleanup": list,
    "dependencies": list,
    "fixtures": list,
    "identity_probe": Any,
    "if": str | None,
    "labels": list,
    "name": str,
    "on": Any,
    "outcomes": list,
    "persona_id": str,
    "primary_actor": str | None,
    "starting_conditions": str | None,
    "steps": list,
    "triggers": list,
    "version": int,
}, total=False)


class VerificationProjectScenarioPatchData(VerificationProjectScenarioPatchDataRequired, VerificationProjectScenarioPatchDataOptional):
    pass


class VerifyAppDomain(TypedDict, total=False):
    id: str


class VerifyAppDomainCreateData(TypedDict):
    app_id: str
    id: str


class VerifyBrowserSessionRequired(TypedDict):
    account_id: str
    expires_at: str
    id: str
    origin: str
    project_id: str
    status: str
    url: str
    viewer_url: str | None


class VerifyBrowserSession(VerifyBrowserSessionRequired, total=False):
    name: str


class VerifyBrowserSessionLoadMatch(TypedDict):
    id: str
    organization_id: str


class VerifyBrowserSessionCreateDataRequired(TypedDict):
    organization_id: str
    project_id: str
    url: str


class VerifyBrowserSessionCreateData(VerifyBrowserSessionCreateDataRequired, total=False):
    account_id: str
    name: str


class VerifyBrowserSessionRemoveMatch(TypedDict):
    id: str
    organization_id: str


class VerifyEmailVerification(TypedDict):
    pass


class VerifyEmailVerificationLoadMatch(TypedDict):
    pass


class VerifySignalIntegrationRequired(TypedDict):
    api_token_stored: bool
    config: dict
    failure_message: str | None
    id: str
    inbound_path: str
    inbound_url: str
    mode: str
    name: str
    organization_id: str
    provider: str
    rejected_signature_count: int
    status: str
    target_count: int
    unmapped_delivery_count: int
    webhook_secret_stored: bool


class VerifySignalIntegration(VerifySignalIntegrationRequired, total=False):
    created_at: str | None
    last_received_at: str | None
    last_verified_at: str | None
    updated_at: str | None


class VerifySignalIntegrationCreateData(TypedDict):
    id: str
    organization_id: str


class VerifyStaticSiteDomain(TypedDict):
    app_environment_id: str | None
    app_service_id: str | None
    created_at: str
    dns_mode: str
    dns_status: str
    failure_message: str | None
    hosted_app_id: str | None
    hostname: str
    id: str
    kind: str
    last_checked_at: str | None
    record_name: str | None
    record_type: str | None
    record_value: str | None
    redirect_to: str | None
    static_site_id: str | None
    target_kind: str
    tls_status: str
    updated_at: str
    verification_status: str


class VerifyStaticSiteDomainCreateData(TypedDict):
    id: str
    static_site_id: str


class VersionLog(TypedDict):
    base_image: str
    failure_phase: str | None
    id: str
    image_digest: str | None
    image_reference: str | None
    installer_version: str
    ready_at: str | None
    receipt: dict | None
    safe_error: str | None
    started_at: str | None
    status: str


class VersionLogListMatch(TypedDict):
    binary_id: str
    organization_id: str
    version_id: str
    project_id: str


class WaitlistApplication(TypedDict):
    pass


class WaitlistApplicationCreateData(TypedDict, total=False):
    company_name: Any
    company_size: Any
    email: Any
    invite_code: Any
    name: Any
    use_case: Any


class WebBotAuth(TypedDict):
    expires_at: str
    origin: str
    signatures: list


class WebBotAuthCreateData(TypedDict):
    origin: str


class WebhookGitlab(TypedDict, total=False):
    id: str


class WebhookGitlabUpdateData(TypedDict):
    id: str


class WorkflowRunStep(TypedDict, total=False):
    id: str


class WorkflowRunStepLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str
    workflow_run_id: str


class WorkflowRunStopNotice(TypedDict):
    pass


class WorkflowRunStopNoticeCreateData(TypedDict):
    agent_id: str
    organization_id: str
    workflow_run_id: str


class WorkflowTriggerSkipped(TypedDict, total=False):
    id: str


class WorkflowTriggerSkippedCreateData(TypedDict):
    agent_id: str
    id: str
    organization_id: str
    workflow_trigger_id: str


class WorkspaceActivity(TypedDict):
    live_activity: list
    recent_items: list
    unresolved_notification_count: int


class WorkspaceActivityLoadMatch(TypedDict):
    organization_id: str


class WorkspaceActivityNotification(TypedDict, total=False):
    id: str


class WorkspaceActivityNotificationUpdateData(TypedDict):
    id: str
    organization_id: str


class WorkspaceSpaceRequired(TypedDict):
    created_at: str
    description: str | None
    hidden: bool
    icon_name: str
    id: str
    import_status: str | None
    name: str
    organization_id: str
    position: int | None
    repository_id: str
    repository_slug: str
    slug: str
    status: str
    updated_at: str


class WorkspaceSpace(WorkspaceSpaceRequired, total=False):
    default_branch: str


class WorkspaceSpaceLoadMatch(TypedDict):
    id: str
    organization_id: str


class WorkspaceSpaceListMatch(TypedDict):
    organization_id: str


class WorkspaceSpaceCreateDataRequired(TypedDict):
    organization_id: str
    icon_name: str
    name: str
    slug: str


class WorkspaceSpaceCreateData(WorkspaceSpaceCreateDataRequired, total=False):
    default_branch: str
    description: str | None


class WorkspaceSpacePreference(TypedDict):
    preferences: list
    spaces: list


class WorkspaceSpacePreferenceUpdateDataRequired(TypedDict):
    organization_id: str


class WorkspaceSpacePreferenceUpdateData(WorkspaceSpacePreferenceUpdateDataRequired, total=False):
    preferences: list
