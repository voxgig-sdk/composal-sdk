<?php
declare(strict_types=1);

// Composal SDK base feature

class ComposalBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ComposalContext $ctx, array $options): void {}
    public function PostConstruct(ComposalContext $ctx): void {}
    public function PostConstructEntity(ComposalContext $ctx): void {}
    public function SetData(ComposalContext $ctx): void {}
    public function GetData(ComposalContext $ctx): void {}
    public function GetMatch(ComposalContext $ctx): void {}
    public function SetMatch(ComposalContext $ctx): void {}
    public function PrePoint(ComposalContext $ctx): void {}
    public function PreSpec(ComposalContext $ctx): void {}
    public function PreRequest(ComposalContext $ctx): void {}
    public function PreResponse(ComposalContext $ctx): void {}
    public function PreResult(ComposalContext $ctx): void {}
    public function PreDone(ComposalContext $ctx): void {}
    public function PreUnexpected(ComposalContext $ctx): void {}
}
