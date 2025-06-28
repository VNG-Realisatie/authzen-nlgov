# Resource Search API {#resource-search-api}

The Resource Search API defines the message exchange pattern between a client (PEP) and an authorization service (PDP) for returning all of the resources that match the search criteria.

The Resource Search API is based on the Access Evaluation information model, but omits the Resource ID.

## Resource Search Semantics

While the evaluation of a search is implementation-specific, it is expected that any returned results that are then fed into an `evaluation` call MUST result in a `decision: true` response.

In addition, it is RECOMMENDED that a resource search is performed transitively, traversing intermediate attributes and/or relationships. For example, if user U is a viewer of folder F that contains a set of documents, then a search for all documents that user U can view will include all of the documents in folder F.

## The Resource Search API Request {#resource-search-request}

The Resource Search request is a 4-tuple constructed of three previously defined entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject.

`action`:
: REQUIRED. The action (or verb) of type Action.

`resource`:
: REQUIRED. The resource of type Resource. NOTE that the Resource type is REQUIRED but the Resource ID is omitted, and if present, is IGNORED.

`context`:
: OPTIONAL. Contextual data about the request.

`page`:
: OPTIONAL. A page token for paged requests.

### Example (non-normative)

The following payload defines a request for the resources of type `account` on which the subject of type `user` and ID `alice@acmecorp.com` can perform the `can_read` action.

<pre class="json example" id="resource-search-request-example" title="Example Request">
{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "action": {
    "name": "can_read"
  },
  "resource": {
    "type": "account"
  }
}
</pre>

## The Resource Search API Response {#resource-search-response}

The response is a paged array of Resources.

~~~ json
{
  "results": [
    {
      "type": "account",
      "id": "123"
    },
    {
      "type": "account",
      "id": "456"
    }
  ],
  "page": {
    "next_token": ""
  }
}
~~~

### Paged requests

A response that needs to be split across page boundaries returns a non-empty `page.next_token`.

#### Example

~~~ json
{
  "results": [
    {
      "type": "account",
      "id": "123"
    },
    {
      "type": "account",
      "id": "456"
    }
  ],
  "page": {
    "next_token": "alsehrq3495u8"
  }
}
~~~

To retrieve the next page, provide `page.next_token` in the next request:

~~~ json
{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "action": {
    "name": "can_read"
  },
  "resource": {
    "type": "account"
  },
  "page": {
    "next_token": "alsehrq3495u8"
  }
}
~~~

Note: page size is implementation-dependent.
