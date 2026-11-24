<?php
declare(strict_types=1);

// Composal SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ComposalMakeContext
{
    public static function call(array $ctxmap, ?ComposalContext $basectx): ComposalContext
    {
        return new ComposalContext($ctxmap, $basectx);
    }
}
