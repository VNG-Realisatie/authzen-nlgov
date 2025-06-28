# Policy Decision Point Metadata {#pdp-metadata}

Policy Decision Points can have metadata describing their configuration. 

## Data structure {#pdp-metadata-data}

The following Policy Decision Point metadata parameters are used by this specification and are registered in the IANA "AuthZEN PDP Metadata" registry established in [](#iana-pdp-registry).

### Endpoint Parameters {#pdp-metadata-data-endpoint}

`policy_decision_point`:
: REQUIRED. The policy decision point's policy decision point identifier, which is a URL that uses the "https" scheme and has no query or fragment components. Policy Decision Point metadata is published at a location that is ".well-known" according to [[RFC5785]] derived from this policy decision point identifier, as described in [](pdp-metadata-access#). The policy decision point identifier is used to prevent policy decision point mix-up attacks.

`access_evaluation_endpoint`:
: REQUIRED. URL of Policy Decision Point Access Evaluation API endpoint

`access_evaluations_endpoint`:
: OPTIONAL. URL of Policy Decision Point Access Evaluations API endpoint

`search_subject_endpoint`:
: OPTIONAL. URL of Policy Decision Point Search API endpoint for subject element

`search_action_endpoint`:
: OPTIONAL. URL of Policy Decision Point Search API endpoint for action element

`search_resource_endpoint`:
: OPTIONAL. URL of Policy Decision Point Search API endpoint for resource element

Note that the non presence of any of those parameter is sufficient for the policy enforcement point to determine that the policy decision point is not capable and therefore will not return a result for the associated API.

### Signature Parameter {#pdp-metadata-data-sig}

In addition to JSON elements, metadata values MAY also be provided as a `signed_metadata` value, which is a JSON Web Token [[RFC7519]] that asserts metadata values about the policy decision point as a bundle. A set of metadata parameters that can be used in signed metadata as claims are defined in [](#pdp-metadata-data-endpoint). The signed metadata MUST be digitally signed or MACed using JSON Web Signature [[RFC7515]] and MUST contain an `iss` (issuer) claim denoting the party attesting to the claims in the signed metadata.

Consumers of the metadata MAY ignore the signed metadata if they do not support this feature. If the consumer of the metadata supports signed metadata, metadata values conveyed in the signed metadata MUST take precedence over the corresponding values conveyed using plain JSON elements. Signed metadata is included in the policy decision point metadata JSON object using this OPTIONAL metadata parameter:

`signed_metadata`:
: A JWT containing metadata parameters about the protected resource as claims. This is a string value consisting of the entire signed JWT. A `signed_metadata` parameter SHOULD NOT appear as a claim in the JWT; it is RECOMMENDED to reject any metadata in which this occurs.

## Obtaining Policy Decision Point Metadata {#pdp-metadata-access}

Policy Decision Point supporting metadata MUST make a JSON document containing metadata as specified in [](#pdp-metadata-data-endpoint) available at a URL formed by inserting a well-known URI string between the host component and the path and/or query components, if any. The well-known URI string used is `/.well-known/authzen-configuration`.

The syntax and semantics of .well-known are defined in [[RFC8615]]. The well-known URI path suffix used is registered in the IANA "Well-Known URIs" registry [[IANA.well-known-uris]].

### Policy Decision Point Metadata Request {#pdp-metadata-access-request}

A policy decision point metadata document MUST be queried using an HTTP GET request at the previously specified URL. The consumer of the metadata would make the following request when the resource identifier is https://pdp.mycompany.com:

~~~ http
GET /.well-known/authzen-configuration HTTP/1.1
Host: pdp.mycompany.com
~~~

### Policy Decision Point Metadata Response {#pdp-metadata-access-response}

The response is a set of metadata parameters about the protected resource's configuration. A successful response MUST use the `200 OK HTTP` status code and return a JSON object using the `application/json` content type that contains a set of metadata parameters as its members that are a subset of the metadata parameters defined in [](#pdp-metadata-data-endpoint). Additional metadata parameters MAY be defined and used; any metadata parameters that are not understood MUST be ignored.

Parameters with multiple values are represented as JSON arrays. Parameters with zero values MUST be omitted from the response.

An error response uses the applicable HTTP status code value.

The following is a non-normative example response:

~~~ http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "policy_decision_point": "https://pdp.mycompany.com",
  "access_evaluation_endpoint": "https://pdp.mycompany.com/access/v1/evaluation",
  "search_subject_endpoint": "https://pdp.mycompany.com/access/v1/search/subject",
  "search_resource_endpoint": "https://pdp.mycompany.com/access/v1/search/resource"
}
~~~

### Policy Decision Point Metadata Validation {#pdp-metadata-data-endpoint-validation}

The "`policy_decision_point`" value returned MUST be identical to the policy decision point identifier value into which the well-known URI string was inserted to create the URL used to retrieve the metadata.  If these values are not identical, the data contained in the response MUST NOT be used.

The recipient MUST validate that any signed metadata was signed by a key belonging to the issuer and that the signature is valid. If the signature does not validate or the issuer is not trusted, the recipient SHOULD treat this as an error condition.
