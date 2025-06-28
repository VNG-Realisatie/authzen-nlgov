# Subject Search API {#subject-search-api}

The Subject Search API defines the message exchange pattern between a client (PEP) and an authorization service (PDP) for returning all of the subjects that match the search criteria.

The Subject Search API is based on the Access Evaluation information model, but omits the Subject ID.

## Subject Search Semantics

While the evaluation of a search is implementation-specific, it is expected that any returned results that are then fed into an `evaluation` call MUST result in a `decision: true` response.

In addition, it is RECOMMENDED that a subject search is performed transitively, traversing intermediate attributes and/or relationships. For example, if the members of group G are designated as viewers on a document D, then a search for all users that are viewers of document D will include all the members of group G.

## The Subject Search API Request {#subject-search-request}

The Subject Search request is a 4-tuple constructed of three previously defined entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject.  NOTE that the Subject type is REQUIRED but the Subject ID can be omitted, and if present, is IGNORED.

`action`:
: REQUIRED. The action (or verb) of type Action.

`resource`:
: REQUIRED. The resource of type Resource.

`context`:
: OPTIONAL. Contextual data about the request.

`page`:
: OPTIONAL. A page token for paged requests.

### Example (non-normative)

The following payload defines a request for the subjects of type `user` that can perform the `can_read` action on the resource of type `account` and ID `123`.

<pre class="json example" id="subject-search-request-example" title="Example Request">
{
  "subject": {
    "type": "user"
  },
  "action": {
    "name": "can_read"
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

## The Subject Search API Response {#subject-search-response}

The response is a paged array of Subjects.

~~~ json
{
  "results": [
    {
      "type": "user",
      "id": "alice@acmecorp.com"
    },
    {
      "type": "user",
      "id": "bob@acmecorp.com"
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
      "type": "user",
      "id": "alice@acmecorp.com"
    },
    {
      "type": "user",
      "id": "bob@acmecorp.com"
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
    "type": "user"
  },
  "action": {
    "name": "can_read"
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
~~~

Note: page size is implementation-dependent.
