# Access Evaluation API {#access-evaluation-api}

The Access Evaluation API defines the message exchange pattern between a client (PEP) and an authorization service (PDP) for executing a single access evaluation.

## The Access Evaluation API Request {#access-evaluation-request}
The Access Evaluation request is a 4-tuple constructed of the four previously defined entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject

`action`:
: REQUIRED. The action (or verb) of type Action.

`resource`:
: REQUIRED. The resource of type Resource.

`context`:
: OPTIONAL. The context (or environment) of type Context.

<span class="nlgov-add">The Access Evaluation Request MAY contain [[JSON-LD11]] keys starting with the `@`-symbol.</span>

### Example (non-normative)

<pre class="json example" id="request-example" title="Example Request">
{
  "subject": {
    "type": "user",
    "id": "alice@acmecorp.com"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "action": {
    "name": "can_read",
    "properties": {
      "method": "GET"
    }
  },
  "context": {
    "time": "1985-10-26T01:22-07:00"
  }
}
</pre>

## The Access Evaluation API Response {#access-evaluation-response}
The simplest form of a response is simply a boolean representing a Decision, indicated by a `"decision"` field. 

`decision`:
: REQUIRED. A boolean value that specifies whether the Decision is to allow or deny the operation.

In this specification, assuming the evaluation was successful, there are only 2 possible responses:

- `true`: The access request is permitted to go forward.
- `false`: The access request is denied and MUST NOT be permitted to go forward.

The response object MUST contain this boolean-valued Decision key.

### Access Evaluation Decision {#decision}
The following is a non-normative example of a simple Decision:

<pre class="json example" id="decision-example" title="Example Decision">
{
  "decision": true
}
</pre>

### Additional Context in a Response
In addition to a `"decision"`, a response may contain a `"context"` field which can be any JSON object.  This context can convey additional information that can be used by the PEP as part of the decision evaluation process. Examples include:

- XACML's notion of "advice" and "obligations"
- Hints for rendering UI state
- Instructions for step-up authentication

### Example Context
An implementation MAY follow a structured approach to `"context"`, in which it presents the reasons that an authorization request failed.

- A list of identifiers representing the items (policies, graph nodes, tuples) that were used in the decision-making process.
- A list of reasons as to why access is permitted or denied.

#### Reasons
Reasons MAY be provided by the PDP. 

##### Reason Field {#reason-field}
A Reason Field is a JSON object that has keys and values of type `string`. The following are non-normative examples of Reason Field objects:

<pre class="json example" id="reason-example" title="Example Reason">
{
  "en": "location restriction violation"
}
</pre>

##### Reason Object {#reason-object}
A Reason Object specifies a particular reason. It is a JSON object that has the following fields:

`id`:
: REQUIRED. A string value that specifies the reason within the scope of a particular response.

`reason_admin`:
: OPTIONAL. The reason, which MUST NOT be shared with the user, but useful for administrative purposes that indicates why the access was denied. The value of this field is a Reason Field object ([](#reason-field)).

`reason_user`:
: OPTIONAL. The reason, which MAY be shared with the user that indicates why the access was denied. The value of this field is a Reason Field object ([](#reason-field)).

The following is a non-normative example of a Reason Object:

<pre class="json example" id="example-reason-object" title="Example of a Reason Object">
{
  "id": "0",
  "reason_admin": {
    "en": "Request failed policy C076E82F"
  },
  "reason_user": {
    "en-403": "Insufficient privileges. Contact your administrator",
    "es-403": "Privilegios insuficientes. Póngase en contacto con su administrador"
  }
}
</pre>

### Sample Response with additional context (non-normative)

<pre class="json example" id="response-with-context-example" title="Example Response with Context">
{
  "decision": false,
  "context": {
    "id": "0",
    "reason_admin": {
      "en": "Request failed policy C076E82F"
    },
    "reason_user": {
      "en-403": "Insufficient privileges. Contact your administrator",
      "es-403": "Privilegios insuficientes. Póngase en contacto con su administrador"
    }
  }
}
</pre>
