
# IANA Considerations {#iana}

The following registration procedure is used for the registry established by this specification.

Values are registered on a Specification Required [[RFC8126]] basis after a two-week review period on the openid-specs-authzen@lists.openid.net mailing list, on the advice of one or more Designated Experts. However, to allow for the allocation of values prior to publication of the final version of a specification, the Designated Experts may approve registration once they are satisfied that the specification will be completed and published. However, if the specification is not completed and published in a timely manner, as determined by the Designated Experts, the Designated Experts may request that IANA withdraw the registration.

Registration requests sent to the mailing list for review should use an appropriate subject (e.g., "Request to register AuthZEN Policy Decision Point Metadata: example").

Within the review period, the Designated Experts will either approve or deny the registration request, communicating this decision to the review list and IANA. Denials should include an explanation and, if applicable, suggestions as to how to make the request successful. The IANA escalation process is followed when the Designated Experts are not responsive within 14 days.

Criteria that should be applied by the Designated Experts includes determining whether the proposed registration duplicates existing functionality, determining whether it is likely to be of general applicability or whether it is useful only for a single application, and whether the registration makes sense.

IANA must only accept registry updates from the Designated Experts and should direct all requests for registration to the review mailing list.

It is suggested that multiple Designated Experts be appointed who are able to represent the perspectives of different applications using this specification, in order to enable broadly-informed review of registration decisions. In cases where a registration decision could be perceived as creating a conflict of interest for a particular Expert, that Expert should defer to the judgment of the other Experts.

The reason for the use of the mailing list is to enable public review of registration requests, enabling both Designated Experts and other interested parties to provide feedback on proposed registrations. The reason to allow the Designated Experts to allocate values prior to publication as a final specification is to enable giving authors of specifications proposing registrations the benefit of review by the Designated Experts before the specification is completely done, so that if problems are identified, the authors can iterate and fix them before publication of the final specification.

## AuthZEN Policy Decision Point Metadata Registry {#iana-pdp-registry}

This specification establishes the IANA "AuthZEN Policy Decision Point Metadata" registry for AuthZEN policy decision point metadata names. The registry records the policy decision point metadata parameter and a reference to the specification that defines it.

### Registration Template {#iana-pdp-registry-template}

Metadata Name:
: The name requested (e.g., "resource"). This name is case-sensitive. Names may not match other registered names in a case-insensitive manner unless the Designated Experts state that there is a compelling reason to allow an exception.

Metadata Description:
: Brief description of the metadata (e.g., "Resource identifier URL").

Change Controller:
: For IETF stream RFCs, list the "IETF". For others, give the name of the responsible party. Other details (e.g., postal address, email address, home page URI) may also be included.

Specification Document(s):
: Reference to the document or documents that specify the parameter, preferably including URIs that can be used to retrieve copies of the documents. An indication of the relevant sections may also be included but is not required.

### Initial Registry Contents {#iana-pdp-registry-content}

Metadata name:
: `policy_decision_point`

Metadata description:
: Base URL of the Policy Decision Point

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Specification Document(s):
: Section [](#pdp-metadata-data-endpoint)



Metadata name:
: `access_evaluation_endpoint`

Metadata description:
: URL of Policy Decision Point Access Evaluation API endpoint

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Specification Document(s):
: Section [](#pdp-metadata-data-endpoint)



Metadata name:
: `access_evaluations_endpoint`

Metadata description:
: URL of Policy Decision Point Access Evaluations API endpoint

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Specification Document(s):
: Section [](#pdp-metadata-data-endpoint)



Metadata name:
: `search_subject_endpoint`

Metadata description:
: URL of the Search Endpooint based on Subject element

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Specification Document(s):
: Section [](#pdp-metadata-data-endpoint)




Metadata name:
: `search_resource_endpoint`

Metadata description:
: URL of the Search Endpooint based on Resource element

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Specification Document(s):
: Section [](#pdp-metadata-data-endpoint)



Metadata name:
: `signed_metadata`

Metadata description:
: JWT containing metadata parameters about the protected resource as claims.

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Specification Document(s):
: Section [](#pdp-metadata-data-endpoint)
      


## Well-Known URI Registry {#iana-wk-registry}

This specification registers the well-known URI defined in Section 3 in the IANA "Well-Known URIs" registry [[IANA.well-known-uris]].

### Registry Contents {#iana-wk-registry-content}

URI Suffix:
: authzen-configuration

Reference:
: Section [](#pdp-metadata-data-endpoint)

Status:
: permanent

Change Controller:
: OpenID_Foundation_AuthZEN_Working_Group
: mailto:openid-specs-authzen@lists.openid.net

Related Information:
: (none)