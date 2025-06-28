# Transport

This specification defines an HTTPS binding which MUST be implemented by a compliant PDP.

Additional transport bindings (e.g. gRPC) MAY be defined in the future in the form of profiles, and MAY be implemented by a PDP.

## HTTPS Binding

### HTTPS Access Evaluation Request
The Access Evaluation Request is an HTTPS request with `content-type` of `application/json`. Its body is a JSON object that contains the Access Evaluation Request, as defined in [](#access-evaluation-request).

The following is a non-normative example of the HTTPS binding of the Access Evaluation Request:

<pre class="http example" id="example-access-evaluation-request" title="Example of an HTTPS Access Evaluation Request">
POST /access/v1/evaluation HTTP/1.1
Host: pdp.mycompany.com
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "resource": {
    "type": "todo",
    "id": "1"
  },
  "action": {
    "name": "can_read"
  },
  "context": {
    "time": "1985-10-26T01:22-07:00"
  }
}
</pre>

### HTTPS Access Evaluation Response
The success response to an Access Evaluation Request is an Access Evaluation Response. It is an HTTPS response with a `status` code of `200`, and `content-type` of `application/json`. Its body is a JSON object that contains the Access Evaluation Response, as defined in [](#access-evaluation-response).

Following is a non-normative example of an HTTPS Access Evaluation Response:

<pre class="http example" id="example-access-evaluation-response" title="Example of an HTTP Access Evaluation Response">
HTTP/1.1 OK
Content-type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "decision": true
}
</pre>

### HTTPS Access Evaluations Request
The Access Evaluations Request is an HTTPS request with `content-type` of `application/json`. Its body is a JSON object that contains the Access Evaluations Request, as defined in [](#access-evaluations-request).

The following is a non-normative example of a the HTTPS binding of the Access Evaluations Request:

<pre class="http example" id="example-access-evaluations-request" title="Example of an HTTPS Access Evaluations Request">
POST /access/v1/evaluations HTTP/1.1
Host: pdp.mycompany.com
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "context": {
    "time": "2024-05-31T15:22-07:00"
  },
  "action": {
    "name": "can_read"
  },
  "evaluations": [
    {
      "resource": {
        "type": "document",
        "id": "boxcarring.md"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "subject-search.md"
      }
    },
    {
      "action": {
        "name": "can_edit"
      },
      "resource": {
        "type": "document",
        "id": "resource-search.md"
      }
    }
  ]
}
</pre>

### HTTPS Access Evaluations Response
The success response to an Access Evaluations Request is an Access Evaluations Response. It is a HTTPS response with a `status` code of `200`, and `content-type` of `application/json`. Its body is a JSON object that contains the Access Evaluations Response, as defined in [](#access-evaluations-response).

The following is a non-normative example of an HTTPS Access Evaluations Response:

<pre class="http example" id="example-access-evaluations-response" title="Example of an HTTPS Access Evaluations Response">
HTTP/1.1 OK
Content-type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "evaluations": [
    {
      "decision": true
    },
    {
      "decision": false,
      "context": {
        "error": {
          "status": 404,
          "message": "Resource not found"
        }
      }
    },
    {
      "decision": false,
      "context": {
        "reason": "Subject is a viewer of the resource"
      }
    }
  ]
}
</pre>

### HTTPS Subject Search Request
The Subject Search Request is an HTTPS request with `content-type` of `application/json`. Its body is a JSON object that contains the Subject Search Request, as defined in [](#subject-search-request).

The following is a non-normative example of the HTTPS binding of the Subject Search Request:

<pre class="http example" id="example-subject-search-request" title="Example of an HTTPS Subject Search Request">
POST /access/v1/search/subject HTTP/1.1
Host: pdp.mycompany.com
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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
  }
}
</pre>

### HTTPS Subject Search Response
The success response to a Subject Search Request is a Subject Search Response. It is an HTTPS response with a `status` code of `200`, and `content-type` of `application/json`. Its body is a JSON object that contains the Subject Search Response, as defined in [](#subject-search-response).

The following is a non-normative example of an HTTPS Subject Search Response:

<pre class="http example" id="example-subject-search-response" title="Example of an HTTPS Subject Search Response">
HTTP/1.1 OK
Content-type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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
</pre>

### HTTPS Resource Search Request
The Resource Search Request is an HTTPS request with `content-type` of `application/json`. Its body is a JSON object that contains the Resource Search Request, as defined in [](#resource-search-request).

The following is a non-normative example of the HTTPS binding of the Resource Search Request:

<pre class="http example" id="example-resource-search-request" title="Example of an HTTPS Resource Search Request">
POST /access/v1/search/resource HTTP/1.1
Host: pdp.mycompany.com
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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

### HTTPS Resource Search Response
The success response to a Resource Search Request is a Resource Search Response. It is an HTTPS response with a `status` code of `200`, and `content-type` of `application/json`. Its body is a JSON object that contains the Resource Search Response, as defined in [](#resource-search-response).

The following is a non-normative example of an HTTPS Resource Search Response:

<pre class="http example" id="example-resource-search-response" title="Example of an HTTPS Resource Search Response">
HTTP/1.1 OK
Content-type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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
</pre>

### HTTPS Action Search Request
The Action Search Request is an HTTPS request with `content-type` of `application/json`. Its body is a JSON object that contains the Action Search Request, as defined in [](#action-search-request).

The following is a non-normative example of the HTTPS binding of the Action Search Request:

<pre class="http example" id="example-action-search-request" title="Example of an HTTPS Action Search Request">
POST /access/v1/search/action HTTP/1.1
Host: pdp.mycompany.com
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "context": {
    "time": "2024-10-26T01:22-07:00"
  },
}
</pre>

### HTTPS Action Search Response
The success response to an Action Search Request is an Action Search Response. It is an HTTPS response with a `status` code of `200`, and `content-type` of `application/json`. Its body is a JSON object that contains the Action Search Response, as defined in [](#action-search-response).

The following is a non-normative example of an HTTPS Action Search Response:

<pre class="http example" id="example-action-search-response" title="Example of an HTTPS Action Search Response">
HTTP/1.1 OK
Content-type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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

### Error Responses
The following error responses are common to all methods of the Authorization API. The error response is indicated by an HTTPS status code (Section 15 of [[RFC9110]]) that indicates error.

The following errors are indicated by the status codes defined below:

| Code | Description  | HTTPS Body Content |
|------|--------------|-------------------|
| 400  | Bad Request  | An error message string |
| 401  | Unauthorized | An error message string |
| 403  | Forbidden    | An error message string |
| 500  | Internal error | An error message string |
{: #table-error-status-codes title="HTTPS Error status codes"}

Note: HTTPS errors are returned by the PDP to indicate an error condition relating to the request or its processing, and are unrelated to the outcome of an authorization decision, which is always returned with a `200` status code and a response payload.

To make this concrete:

- a `401` HTTPS status code indicates that the caller (policy enforcement point) did not properly authenticate to the PDP - for example, by omitting a required `Authorization` header, or using an invalid access token.
- the PDP indicates to the caller that the authorization request is denied by sending a response with a `200` HTTPS status code, along with a payload of `{ "decision": false }`.

### Request Identification
All requests to the API MAY have request identifiers to uniquely identify them. The API client (PEP) is responsible for generating the request identifier. If present, the request identifier SHALL be provided using the HTTPS Header `X-Request-ID`. The value of this header is an arbitrary string. The following non-normative example describes this header:

<pre class="http example" id="request-id-example" title="Example HTTPS request with a Request Id Header">
POST /access/v1/evaluation HTTP/1.1
Authorization: Bearer mF_9.B5f-4.1JqM
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716
</pre>

### Request Identification in a Response
A PDP responding to an Authorization API request that contains an `X-Request-ID` header MUST include a request identifier in the response. The request identifier is specified in the HTTPS Response header: `X-Request-ID`. If the PEP specified a request identifier in the request, the PDP MUST include the same identifier in the response to that request.

The following is a non-normative example of an HTTPS Response with this header:

<pre class="http example" id="example-response-request-id" title="Example HTTPS response with a Request Id Header">
HTTP/1.1 OK
Content-type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716
</pre>
