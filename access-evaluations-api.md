# Access Evaluations API {#access-evaluations-api}

The Access Evaluations API defines the message exchange pattern between a client (PEP) and an authorization service (PDP) for evaluating multiple access evaluations within the scope of a single message exchange (also known as "boxcarring" requests).

## The Access Evaluations API Request {#access-evaluations-request}

The Access Evaluation API Request builds on the information model presented in [](#information-model) and the 4-tuple defined in the Access Evaluation Request ([](#access-evaluation-request)).

To send multiple access evaluation requests in a single message, the caller MAY add an `evaluations` key to the request. The `evaluations` key is an array which contains a list of JSON objects, each typed as the 4-tuple as defined in the Access Evaluation Request ([](#access-evaluation-request)), and specifying a discrete request.

If an `evaluations` array is NOT present, the Access Evaluations Request behaves in a backwards-compatible manner with the (single) Access Evaluation API Request ([](#access-evaluation-request)).

If an `evaluations` array IS present and contains one or more objects, these form distinct requests that the PDP will evaluate. These requests are independent from each other, and may be executed sequentially or in parallel, left to the discretion of each implementation.

If the `evaluations` array IS present and contains one or more objects, the top-level `subject`, `action`, `resource`, and `context` keys (4-tuple) in the request object MAY be omitted. However, if one or more of these values is present, they provide default values for their respective fields in the evaluation requests. This behavior is described in [](#default-values).

The following is a non-normative example for specifying three requests, with no default values:

~~~json
{
  "evaluations": [
    {
      "subject": {
        "type": "user",
        "id": "alice@acmecorp.com"
      },
      "action": {
        "name": "can_read"
      },
      "resource": {
        "type": "document",
        "id": "boxcarring.md"
      },
      "context": {
        "time": "2024-05-31T15:22-07:00"
      }
    },
    {
      "subject": {
        "type": "user",
        "id": "alice@acmecorp.com"
      },
      "action": {
        "name": "can_read"
      },
      "resource": {
        "type": "document",
        "id": "subject-search.md"
      },
      "context": {
        "time": "2024-05-31T15:22-07:00"
      }
    },
    {
      "subject": {
        "type": "user",
        "id": "alice@acmecorp.com"
      },
      "action": {
        "name": "can_read"
      },
      "resource": {
        "type": "document",
        "id": "resource-search.md"
      },
      "context": {
        "time": "2024-05-31T15:22-07:00"
      }
    }
  ]
}
~~~

### Default values

While the example above provides the most flexibility in specifying distinct values in each request for every evaluation, it is common for boxcarred requests to share one or more values of the 4-tuple. For example, evaluations MAY all refer to a single subject, and/or have the same contextual (environmental) attributes.

Default values offer a more compact syntax that avoids over-duplication of request data.

If any of the top-level `subject`, `action`, `resource`, and `context` keys are provided, the value of the top-level key is treated as the default value for the 4-tuples specified in the `evaluations` array. If a top-level key is specified in the 4-tuples present in the `evaluations` array then the value of that will take precedence over these default values.

The following is a non-normative example for specifying three requests that refer to a single subject and context:

~~~json
{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "context": {
    "time": "2024-05-31T15:22-07:00"
  },
  "evaluations": [
    {
      "action": {
        "name": "can_read"
      },
      "resource": {
        "type": "document",
        "id": "boxcarring.md"
      }
    },
    {
      "action": {
        "name": "can_read"
      },
      "resource": {
        "type": "document",
        "id": "subject-search.md"
      }
    },
    {
      "action": {
        "name": "can_read"
      },
      "resource": {
        "type": "document",
        "id": "resource-search.md"
      }
    }
  ]
}
~~~

The following is a non-normative example for specifying three requests that refer to a single `subject` and `context`, with a default value for `action`, that is overridden by the third request:

~~~json
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
~~~

### Evaluations options

The `evaluations` request payload includes an OPTIONAL `options` key, with a JSON value containing a set of key-value pairs.

This provides a general-purpose mechanism for providing caller-supplied metadata on how the request is to be executed.

One such option controls *evaluation semantics*, and is described in [](#evaluation-semantics).

A non-normative example of the `options` field is shown below, following an `evaluations` array provided for the sake of completeness:

~~~json
{
  "evaluations": [{
    "resource": {
      "type": "doc",
      "id": "1"
    },
    "subject": {
      "type": "doc",
      "id": "2"
    }
  }],
  "options": {
    "evaluation_semantics": "execute_all",
    "another_option": "value"
  }
}
~~~

#### Evaluations semantics {#evaluation-semantics}

By default, every request in the `evaluations` array is executed and a response returned in the same array order. This is the most common use-case for boxcarring multiple evaluation requests in a single payload.

With that said, three evaluation semantics are supported:

1. *Execute all of the requests (potentially in parallel), return all of the results.* Any failure can be denoted by `decision: false` and MAY provide a reason code in the context.
2. *Deny on first denial (or failure).* This semantic could be desired if a PEP wants to issue a few requests in a particular order, with any denial (error, or `decision: false`) "short-circuiting" the evaluations call and returning on the first denial. This essentially works like the `&&` operator in programming languages.
3. *Permit on first permit.* This is the converse "short-circuiting" semantic, working like the `||` operator in programming languages.

To select the desired evaluations semantic, a caller can pass in `options.evaluations_semantic` with exactly one of the following values:

  * `execute_all`
  * `deny_on_first_deny`
  * `permit_on_first_permit`

`execute_all` is the default semantic, so an `evaluations` request without the `options.evaluations_semantic` flag will execute using this semantic.

##### Example: Evaluate `read` action for three documents using all three semantics

Execute all requests:

~~~json
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "action": {
    "name": "read"
  },
  "options": {
    "evaluations_semantic": "execute_all"
  },
  "evaluations": [
    {
      "resource": {
        "type": "document",
        "id": "1"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "2"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "3"
      }
    }
  ]
}
~~~

Response:

~~~json
{
  "evaluations": [
    {
      "decision": true
    },
    {
      "decision": false
    },
    {
      "decision": true
    }
  ]
}
~~~

Deny on first deny:

~~~json
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "action": {
    "name": "read"
  },
  "options": {
    "evaluations_semantic": "deny_on_first_deny"
  },
  "evaluations": [
    {
      "resource": {
        "type": "document",
        "id": "1"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "2"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "3"
      }
    }
  ]
}
~~~

Response:

~~~json
{
  "evaluations": [
    {
      "decision": true
    },
    {
      "decision": false,
      "context": {
        "id": "200",
        "reason": "deny_on_first_deny"
      }
    }
  ]
}
~~~

Permit on first permit:

~~~json
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "action": {
    "name": "read"
  },
  "options": {
    "evaluations_semantic": "permit_on_first_permit"
  },
  "evaluations": [
    {
      "resource": {
        "type": "document",
        "id": "1"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "2"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "3"
      }
    }
  ]
}
~~~

Response:

~~~json
{
  "evaluations": [
    {
      "decision": true
    }
  ]
}
~~~

## Access Evaluations API Response {#access-evaluations-response}

Like the request format, the Access Evaluations Response format for an Access Evaluations Request adds an `evaluations` array that lists the decisions in the same order they were provided in the `evaluations` array in the request. Each value of the evaluations array is typed as an Access Evaluation Response ([](#access-evaluation-response)).

In case the `evaluations` array is present, it is RECOMMENDED that the `decision` key of the response will be omitted. If present, it can be ignored by the caller.

The following is a non-normative example of a Access Evaluations Response to an Access Evaluations Request containing three evaluation objects:

~~~json
{
  "evaluations": [
    {
      "decision": true
    },
    {
      "decision": false,
      "context": {
        "reason": "resource not found"
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
~~~

### Errors

There are two types of errors, and they are handled differently:
1. Transport-level errors, or errors that pertain to the entire payload.
2. Errors in individual evaluations.

The first type of error is handled at the transport level. For example, for the HTTP binding, the 4XX and 5XX codes indicate a general error that pertains to the entire payload, as described in Transport ([](#transport)).

The second type of error is handled at the payload level. Decisions default to *closed* (i.e. `false`), but the `context` field can include errors that are specific to that request.

The following is a non-normative example of a response to an Access Evaluations Request containing three evaluation objects, two of them demonstrating how errors can be returned for two of the evaluation requests:

~~~json
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
~~~
