# Model
The Authorization API is a transport-agnostic API published by the PDP, to which the PEP acts as a client. Possible bindings of this specification, such as HTTPS or gRPC, are described in Transport ([](#transport)).

Authorization for the Authorization API itself is out of scope for this document, since authorization for APIs is well-documented elsewhere. For example, the Authorization API's HTTPS binding MAY support authorization using an `Authorization` header, using a `basic` or `bearer` token. Support for OAuth 2.0 ([[RFC6749]]) is RECOMMENDED.