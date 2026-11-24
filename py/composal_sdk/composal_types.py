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


class AgentConnection(AgentConnectionRequired, total=False):
    credential: str | None


class AgentConnectionLoadMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentConnectionListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentConnectionListMatch(AgentConnectionListMatchRequired, total=False):
    cursor: str
    limit: int
    selected_connection_id: str


class AgentConnectionCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str
    agent_card_url: str
    auth_scheme: str
    name: str


class AgentConnectionCreateData(AgentConnectionCreateDataRequired, total=False):
    credential: str | None
    remote_agent: str | None
    source_operation_id: str | None


class AgentConnectionUpdateDataRequired(TypedDict):
    agent_id: str
    id: str
    organization_id: str


class AgentConnectionUpdateData(AgentConnectionUpdateDataRequired, total=False):
    auth_scheme: str
    credential: str | None
    expected_generation: int
    name: str
    remote_agent: str | None


class AgentConnectionRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


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


class AgentIntegration(AgentIntegrationRequired, total=False):
    personal_creation_key_supported: bool


class AgentIntegrationListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentIntegrationListMatch(AgentIntegrationListMatchRequired, total=False):
    catalog_q: str
    cursor: str
    limit: int
    q: str
    toolkit: str


class AgentIntegrationCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str
    connection_id: str
    enabled: bool
    generation: int


class AgentIntegrationCreateData(AgentIntegrationCreateDataRequired, total=False):
    cursor: str
    limit: int
    q: str
    toolkit: str


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


class AgentRepositoryListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentRepositoryListMatch(AgentRepositoryListMatchRequired, total=False):
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


class AgentSetting(TypedDict):
    can_manage: bool
    expected_version: str
    instructions: str
    version: str


class AgentSettingListMatch(TypedDict):
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
    deployed_at: str
    deployments_count: int
    hostname: str
    https: str
    id: str
    name: str
    url: str
    visibility: str


class AgentSiteListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSiteListMatch(AgentSiteListMatchRequired, total=False):
    cursor: str
    limit: int


class AgentSkillRequired(TypedDict):
    available: bool
    can_configure: bool
    can_manage: bool
    description: str
    enabled: bool
    name: str
    skills: list
    version: str


class AgentSkill(AgentSkillRequired, total=False):
    configuration_state: str


class AgentSkillListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentSkillCreateData(TypedDict):
    agent_id: str
    organization_id: str
    enabled: bool
    name: str
    version: str


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


class AgentSubscriptionListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentSubscriptionListMatch(AgentSubscriptionListMatchRequired, total=False):
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


class AgentThreadRequired(TypedDict):
    can_create: bool
    local_activities: dict
    local_archived_count: int
    local_next_cursor: str | None
    local_scope_key: str | None
    local_status_pending: bool
    local_threads: list
    main_thread_id: str
    next_cursor: str | None
    selected_thread: Any
    thread: dict
    threads: list
    total_archived_count: int | None


class AgentThread(AgentThreadRequired, total=False):
    archived_count: int | None
    execution: Any
    first_input: Any
    first_input_key: str
    first_input_requester_membership_id: str
    id: str
    inherit_context: bool
    message: str
    parent_conversation_id: str
    requester_membership_id: str
    title: str


class AgentThreadListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentThreadListMatch(AgentThreadListMatchRequired, total=False):
    archived: bool
    conversation_id: str
    cursor: str
    local_cursor: str


class AgentThreadCreateDataRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentThreadCreateData(AgentThreadCreateDataRequired, total=False):
    execution: Any
    inherit_context: bool
    message: str
    parent_conversation_id: str
    requester_membership_id: str
    title: str


class AgentToolRequired(TypedDict):
    inputSchema: dict
    name: str


class AgentTool(AgentToolRequired, total=False):
    description: str


class AgentToolListMatch(TypedDict):
    agent_id: str
    organization_id: str


class AgentVerifyProject(TypedDict):
    available: bool
    can_manage: bool
    expected_version: int
    project_choices: list
    project_choices_truncated: bool
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


class AgentWorkflowListMatchRequired(TypedDict):
    agent_id: str
    organization_id: str


class AgentWorkflowListMatch(AgentWorkflowListMatchRequired, total=False):
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


class AllocationLogListMatchRequired(TypedDict):
    allocation_id: str
    app_id: str


class AllocationLogListMatch(AllocationLogListMatchRequired, total=False):
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


class AppCdnLoadMatch(TypedDict):
    app_id: str
    id: str


class AppCdnListMatch(TypedDict):
    app_id: str


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


class AppConfigVariableLoadMatch(TypedDict):
    app_id: str
    id: str


class AppConfigVariableListMatchRequired(TypedDict):
    app_id: str


class AppConfigVariableListMatch(AppConfigVariableListMatchRequired, total=False):
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


class AppDataResourceLoadMatch(TypedDict):
    app_id: str
    id: str


class AppDataResourceListMatch(TypedDict):
    app_id: str


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


class AppDeploymentLoadMatch(TypedDict):
    app_id: str
    id: str


class AppDeploymentListMatch(TypedDict):
    app_id: str


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


class AppEnvironmentLoadMatch(TypedDict):
    app_id: str
    id: str


class AppEnvironmentListMatch(TypedDict):
    app_id: str


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


class AppPreviewLoadMatch(TypedDict):
    app_id: str
    id: str


class AppPreviewListMatch(TypedDict):
    app_id: str


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


class AppPreviewProfileLoadMatch(TypedDict):
    app_id: str
    id: str


class AppPreviewProfileListMatch(TypedDict):
    app_id: str


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


class AppRunListMatch(TypedDict, total=False):
    id: str
    image: str


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


class AppServiceLoadMatch(TypedDict):
    app_id: str
    id: str


class AppServiceListMatch(TypedDict):
    app_id: str


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


class AppServiceBindingLoadMatch(TypedDict):
    app_id: str
    id: str


class AppServiceBindingListMatch(TypedDict):
    app_id: str


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


class AppStorageResourceLoadMatch(TypedDict):
    app_id: str
    id: str


class AppStorageResourceListMatch(TypedDict):
    app_id: str


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


class AttachmentPart(TypedDict, total=False):
    id: str


class AttachmentPartUpdateData(TypedDict):
    agent_id: str
    attachment_id: str
    id: str
    organization_id: str


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


class CatalogSelector(TypedDict):
    app: dict


class CatalogSelectorListMatch(TypedDict):
    app_id: str


class CdnDeployment(TypedDict, total=False):
    id: str


class CdnDeploymentLoadMatch(TypedDict):
    app_id: str
    cdn_id: str
    id: str


class CdnDeploymentListMatch(TypedDict):
    app_id: str
    cdn_id: str


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


class CdnHostnameLoadMatch(TypedDict):
    app_id: str
    cdn_id: str
    id: str


class CdnHostnameListMatch(TypedDict):
    app_id: str
    cdn_id: str


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


class CdnSpaceListMatch(TypedDict):
    organization_id: str


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


class CdnSpaceObjectLoadMatch(TypedDict):
    cdn_space_id: str
    id: str


class CdnSpaceObjectListMatch(TypedDict):
    cdn_space_id: str


class CdnSpaceObjectUpdateData(TypedDict):
    cdn_space_id: str


class CdnSpaceObjectRemoveMatch(TypedDict):
    cdn_space_id: str
    id: str


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
    id: str
    organization_id: str


class DeepScanLoadMatch(DeepScanLoadMatchRequired, total=False):
    agent_id: str
    evidence: str
    finding_id: str
    project_id: str


class DeepScanListMatchRequired(TypedDict):
    organization_id: str


class DeepScanListMatch(DeepScanListMatchRequired, total=False):
    finding: str
    page: int
    project_id: str
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


class DeepScanFinding(TypedDict):
    finding_count: int
    finding_ids: list
    findings: list
    findings_fix_prompt: str | None
    free_findings_pending: bool
    id: str
    mode: str
    permissions: dict
    priority: str | None
    priority_counts: dict
    project_id: str | None
    reproduction_of: dict | None
    reproductions: list
    reruns_available: bool
    status: str
    title: str
    unlock: dict
    web_url: str


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


class DeepScanMappedFlowListMatchRequired(TypedDict):
    organization_id: str
    environment_id: str


class DeepScanMappedFlowListMatch(DeepScanMappedFlowListMatchRequired, total=False):
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


class DeploymentDashboardNomad(TypedDict):
    pass


class DeploymentDashboardNomadLoadMatchRequired(TypedDict):
    app_id: str


class DeploymentDashboardNomadLoadMatch(DeploymentDashboardNomadLoadMatchRequired, total=False):
    environment: str
    location: str
    service: str


class DeploymentFile(TypedDict):
    pass


class DeploymentFileUpdateData(TypedDict):
    deployment_id: str
    static_site_id: str


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
    id: str
    organization_id: str


class EnvironmentLoadMatch(EnvironmentLoadMatchRequired, total=False):
    project_id: str


class EnvironmentListMatchRequired(TypedDict):
    organization_id: str


class EnvironmentListMatch(EnvironmentListMatchRequired, total=False):
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


class EnvironmentSecretBindingListMatch(TypedDict):
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


class ExplorationRequired(TypedDict):
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


class Exploration(ExplorationRequired, total=False):
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


class GithubConnectionRequired(TypedDict):
    accounts: list
    github_app_installation_id: str
    installations: list
    repositories: list


class GithubConnection(GithubConnectionRequired, total=False):
    project_id: str
    replace: bool


class GithubConnectionListMatchRequired(TypedDict):
    organization_id: str


class GithubConnectionListMatch(GithubConnectionListMatchRequired, total=False):
    github_app_installation_id: str
    project_id: str


class GithubConnectionCreateDataRequired(TypedDict):
    organization_id: str
    github_app_installation_id: str
    repositories: list


class GithubConnectionCreateData(GithubConnectionCreateDataRequired, total=False):
    project_id: str
    replace: bool


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


class HostingAppDomainLoadMatch(TypedDict):
    app_id: str
    id: str


class HostingAppDomainListMatchRequired(TypedDict):
    app_id: str


class HostingAppDomainListMatch(HostingAppDomainListMatchRequired, total=False):
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


class Integration(TypedDict):
    github: dict
    gitlab: dict
    permissions: dict
    slack: dict


class IntegrationListMatch(TypedDict):
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


class MetricQueryListMatch(TypedDict):
    pass


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


class NomadLogListMatchRequired(TypedDict):
    app_id: str


class NomadLogListMatch(NomadLogListMatchRequired, total=False):
    environment: str
    location: str
    offset: int
    origin: str
    service: str
    task: str
    type: str


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
    limit: int


class PageAgentListMatchRequired(TypedDict):
    organization_id: str


class PageAgentListMatch(PageAgentListMatchRequired, total=False):
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
    active_count: int
    credentials: list
    needs_attention_count: int
    permissions: dict
    persona_states: dict
    personas: list
    project: dict


class PagesProjectPersonaListMatch(TypedDict):
    organization_id: str
    project_id: str


class PagesProjectRun(TypedDict):
    environment_query: str
    environments: list
    environments_has_more: bool
    pagination: dict
    runs: list
    selected_environment: Any


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


class PersonalAccessToken(TypedDict, total=False):
    id: str


class PersonalAccessTokenListMatch(TypedDict, total=False):
    id: str


class PersonalAccessTokenCreateData(TypedDict):
    pass


class PersonalAccessTokenRemoveMatch(TypedDict):
    id: str


class PreviewOperation(TypedDict):
    pass


class PreviewOperationListMatch(TypedDict):
    app_id: str
    preview_id: str


class PreviewProfileSecretBindingRequired(TypedDict):
    env_key: str


class PreviewProfileSecretBinding(PreviewProfileSecretBindingRequired, total=False):
    id: str
    mode: str
    secret_id: str
    secret_version_id: str


class PreviewProfileSecretBindingListMatch(TypedDict):
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
    services: list
    snapshot_version: int


class PreviewSharingApproval(PreviewSharingApprovalRequired, total=False):
    build_keys: list
    build_secrets: list
    default_configuration: list
    default_secrets: list
    source_keys: list


class PreviewSharingApprovalListMatch(TypedDict):
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
    credentials: list
    environment_ids: list
    environments: list
    fixtures: list
    lock_version: int
    name: str
    pagination: dict
    permissions: dict
    persona_ids: list
    personas: list
    project: dict
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


class ProjectScenarioOptionListMatch(TypedDict):
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


class ProjectSettingListMatch(TypedDict):
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


class PullRequestSettingListMatchRequired(TypedDict):
    organization_id: str


class PullRequestSettingListMatch(PullRequestSettingListMatchRequired, total=False):
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


class RelayAgentLocalThread(TypedDict, total=False):
    id: str


class RelayAgentLocalThreadRemoveMatch(TypedDict):
    agent_id: str
    id: str
    organization_id: str


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


class ServiceEndpoint(TypedDict, total=False):
    id: str


class ServiceEndpointLoadMatch(TypedDict):
    app_id: str
    id: str
    service_id: str


class ServiceEndpointListMatch(TypedDict):
    app_id: str
    service_id: str


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


class SitePreview(TypedDict):
    icon_data_url: str | None
    title: str | None
    url: str


class SitePreviewLoadMatch(TypedDict):
    organization_id: str
    url: str


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


class ThreadPreview(TypedDict):
    expires_at: str | None
    port: int
    url: str


class ThreadPreviewCreateData(TypedDict):
    agent_id: str
    organization_id: str
    thread_id: str
    port: int


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


class WebBotAuth(TypedDict):
    expires_at: str
    origin: str
    signatures: list


class WebBotAuthCreateData(TypedDict):
    origin: str


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
