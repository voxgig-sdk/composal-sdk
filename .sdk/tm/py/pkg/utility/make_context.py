# Composal SDK utility: make_context

from projectname_sdk.core.context import ComposalContext


def make_context_util(ctxmap, basectx):
    return ComposalContext(ctxmap, basectx)
