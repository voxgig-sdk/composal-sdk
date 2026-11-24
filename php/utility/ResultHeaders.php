<?php
declare(strict_types=1);

// Composal SDK utility: result_headers

class ComposalResultHeaders
{
    public static function call(ComposalContext $ctx): ?ComposalResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
