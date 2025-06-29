# Security Considerations {#Security}

## Communication Integrity and Confidentiality {#security-integrity-confidentiality}

In the ABAC architecture, the PEP-PDP connection is the most sensitive one and needs to be secured to guarantee:

 - Integrity
 - Confidentiality

As a result, the connection between the PEP and the PDP MUST be secured using the most adequate means given the choice of transport (e.g. TLS for HTTP REST).

## Policy Confidentiality and Sender Authentication {#security-confidentiality-authn}

Additionally, the PDP SHOULD authenticate <span class="nlgov-add">requests from</span>the <span class="nlgov-del">calling</span> PEP. There are several ways authentication can be established. These ways are out of scope of this specification. They MAY include:

 - Mutual TLS
 - OAuth-based authentication
 - API key

The choice and strength of either mechanism is not in scope.

Authenticating <span class="nlgov-add">requests from</span> the PEP allows the PDP to avoid common attacks (such as DoS - see below) and/or reveal its internal policies. A malicious actor could craft a large number of requests to try and understand what policies the PDP is configured with. Requesting a client (PEP) be authenticated mitigates that risk.

## Trust {#security-trust}

In ABAC, there is occasionally conversations around the trust between PEP and PDP: how can the PDP trust the PEP to send the right values in? This is a misplaced concern. The PDP must trust the PEP as ultimately, the PEP is the one responsible for enforcing the decision the PDP produces.

## Availability & Denial of Service {#security-avail-dos}

The PDP SHOULD apply reasonable protections to avoid common attacks tied to request payload size, the number of requests, invalid JSON, nested JSON attacks, or memory consumption. Rate limiting is one such way to address such issues.

## Differences between Unsigned and Signed Metadata {#security-metadata-sig}

Unsigned metadata is integrity protected by use of TLS at the site where it is hosted. This means that its security is dependent upon the Internet Public Key Infrastructure (PKI) [[RFC9525]]. Signed metadata is additionally integrity protected by the JWS signature applied by the issuer, which is not dependent upon the Internet PKI.
When using unsigned metadata, the party issuing the metadata is the policy decision point itself. Whereas, when using signed metadata, the party issuing the metadata is represented by the `iss` (issuer) claim in the signed metadata. When using signed metadata, applications can make trust decisions based on the issuer that performed the signing -- information that is not available when using unsigned metadata. How these trust decisions are made is out of scope for this specification.

## Metadata Caching {#security-metadata-caching}

Policy decision point metadata is retrieved using an HTTP GET request, as specified in [](#pdp-metadata-access-request). Normal HTTP caching behaviors apply, meaning that the GET may retrieve a cached copy of the content, rather than the latest copy. Implementations should utilize HTTP caching directives such as Cache-Control with max-age, as defined in [[RFC7234]], to enable caching of retrieved metadata for appropriate time periods.

