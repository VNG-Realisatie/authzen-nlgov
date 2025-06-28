# Action Search API {#action-search-api}

The Action Search API defines the message exchange pattern between a client (PEP) and an authorization service (PDP) for returning all of the actions that match the search criteria.

The Action Search API is based on the Access Evaluation information model, but omits the Action Name.

## Action Search Semantics

While the evaluation of a search is implementation-specific, it is expected that any returned results that are then fed into an `evaluation` call MUST result in a `decision: true` response.

## The Action Search API Request {#action-search-request}

The Action Search request is a 3-tuple constructed of three previously defined entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject.

`resource`:
: REQUIRED. The resource of type Resource.

`context`:
: OPTIONAL. Contextual data about the request.

`page`:
: OPTIONAL. A page token for paged requests.

### Example (non-normative)

The following payload defines a request for the actions that the subject of type user and ID may perform on the resource of type account and ID 123 at 01:22 AM.

<pre class="json example" id="action-search-request-example" title="Example Request">
{
  "subject": {
    "type": "user",
    "id": "123"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "context": {
    "time": "2024-10-26T01:22-07:00"
  }
}
</pre>

## The Action Search API Response {#action-search-response}

The response is a paged array of Actions.

<pre class="json example" id="action-search-response-example" title="Example Response">
{
  "results": [
    {
      "name": "can_read"
    },
    {
      "name": "can_write"
    }
  ],
  "page": {
    "next_token": ""
  }
}
</pre>

### Paged requests

A response that needs to be split across page boundaries returns a non-empty `page.next_token`.

#### Example

<pre class="json example" id="action-search-response-paged-example" title="Example Paged Response">
{
  "results": [
    {
      "name": "can_read"
    },
    {
      "name": "can_write"
    }
  ],
  "page": {
    "next_token": "alsehrq3495u8"
  }
}
</pre>

To retrieve the next page, provide `page.next_token` in the next request:

<pre class="json example" id="action-search-request-paged-example" title="Example Paged Request">
{
  "subject": {
    "type": "user",
    "id": "123"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "context": {
    "time": "2024-10-26T01:22-07:00"
  },
  "page": {
    "next_token": "alsehrq3495u8"
  }
}
</pre>

Note: page size is implementation-dependent.