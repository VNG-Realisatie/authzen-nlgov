# Information Model
The information model for requests and responses include the following entities: Subject, Action, Resource, Context, and Decision. These are all defined below.

<span class="nlgov-add">The information model SHOULD be incorporated into the meta-information model of the organization according to [[MIM]]. It is RECOMMENDED to use [[JSON-LD11]] to enable automatic integration into existing semantic models</span>

## Subject {#subject}
A Subject is the user or machine principal about whom the Authorization API is being invoked. The Subject may be requesting access at the time the Authorization API is invoked.

A Subject is a JSON ([[RFC8259]]) object that contains two REQUIRED keys, `type` and `id`, which have a value typed `string`, and an OPTIONAL key, `properties`, with a value of a JSON object. <span class="nlgov-add">The Subject MAY contain [[JSON-LD11]] keys starting with the `@`-symbol.</span>


`type`:
: REQUIRED. A `string` value that specifies the type of the Subject.

`id`:
: REQUIRED. A `string` value containing the unique identifier of the Subject, scoped to the `type`.

`properties`:
: OPTIONAL. A JSON object containing any number of key-value pairs, which can be used to express additional properties of a Subject.

The following is a non-normative example of a Subject:

<pre class="json example" id="subject-example" title="Example Subject">
{
  "type": "user",
  "id": "alice@acmecorp.com"
}
</pre>

### Subject Properties {#subject-properties}
Many authorization systems are stateless, and expect the client (PEP) to pass in any properties or attributes that are expected to be used in the evaluation of the authorization policy. To satisfy this requirement, Subjects MAY include zero or more additional attributes as key-value pairs, under the `properties` object.

An attribute can be single-valued or multi-valued. It can be a primitive type (string, boolean, number) or a complex type such as a JSON object or JSON array.

The following is a non-normative example of a Subject which adds a string-valued `department` property:

<pre class="json example" id="subject-department-example" title="Example Subject with Additional Property">
{
  "type": "user",
  "id": "alice@acmecorp.com",
  "properties": {
    "department": "Sales"
  }
}
</pre>

To increase interoperability, a few common properties are specified below:

#### IP Address {#subject-ip-address}
The IP Address of the Subject, identified by an `ip_address` field, whose value is a textual representation of an IP Address, as defined in `Textual Conventions for Internet Network Addresses` [[RFC4001]].

The following is a non-normative example of a subject which adds the `ip_address` property:

<pre class="json example" id="subject-ip-address-example" title="Example Subject with IP Address">
{
  "type": "user",
  "id": "alice@acmecorp.com",
  "properties": {
    "department": "Sales",
    "ip_address": "172.217.22.14"
  }
}
</pre>


#### Device ID {#subject-device-id}
The Device Identifier of the Subject, identified by a `device_id` field, whose value is a string representation of the device identifier.

The following is a non-normative example of a subject which adds the `device_id` property:

<pre class="json example" id="subject-device-id-example" title="Example Subject with Device ID">
{
  "type": "user",
  "id": "alice@acmecorp.com",
  "properties": {
    "department": "Sales",
    "ip_address": "172.217.22.14",
    "device_id": "8:65:ee:17:7e:0b"
  }
}
</pre>

## Resource {#resource}
A Resource is the target of an access request. It is a JSON ([[RFC8259]]) object that is constructed similar to a Subject entity. It has the follow keys:

`type`:
: REQUIRED. A `string` value that specifies the type of the Resource.

`id`:
: REQUIRED. A `string` value containing the unique identifier of the Resource, scoped to the `type`.

`properties`:
: OPTIONAL. A JSON object containing any number of key-value pairs, which can be used to express additional properties of a Resource.

<span class="nlgov-add">The Resource MAY contain [[JSON-LD11]] keys starting with the `@`-symbol.</span>

### Examples (non-normative)

The following is a non-normative example of a Resource with a `type` and a simple `id`:

<pre class="json example" id="resource-example" title="Example Resource">
{
  "type": "book",
  "id": "123"
}
</pre>

The following is a non-normative example of a Resource containing a `library_record` property, that is itself a JSON object:

<pre class="json example" id="resource-example-structured" title="Example Resource with Additional Property">
{
  "type": "book",
  "id": "123",
  "properties": {
    "library_record":{
      "title": "AuthZEN in Action",
      "isbn": "978-0593383322"
    }
  }
}
</pre>

## Action {#action}
An Action is the type of access that the requester intends to perform.

Action is a JSON ([[RFC8259]]) object that contains a REQUIRED `name` key with a `string` value, and an OPTIONAL `properties` key with a JSON object value. <span class="nlgov-add">The Action MAY contain [[JSON-LD11]] keys starting with the `@`-symbol.</span>

`name`:
: REQUIRED. The name of the Action.

`properties`:
: OPTIONAL. A JSON object containing any number of key-value pairs, which can be used to express additional properties of an Action.

The following is a non-normative example of an action:

<pre class="json example" id="action-example" title="Example Action">
{
  "name": "can_read"
}
</pre>

### <span class="nlgov-add">Action Properties</span>
<span class="nlgov-add">Actions MAY include zero or more additional attributes as key-value pairs, under the properties object.</span>

<span class="nlgov-add">To increase interoperability, a few common properties are specified below:</span>

#### <span class="nlgov-add">Processing Activity and Algorithm identifiers</span>
<span class="nlgov-add">Under Dutch and EU legislation every action SHOULD include a relation to the processing activity - or algorithm under which it is performed. These identifiers SHOULD be included in the action properties and MUST use the property names as defined in [[Logboek dataverwerkingen]] standard and its extensions.</span>

## Context {#context}
The Context object is a set of attributes that represent environmental or contextual data about the request such as time of day. It is a JSON ([[RFC8259]]) object. <span class="nlgov-add">The Context MAY contain [[JSON-LD11]] keys starting with the `@`-symbol.</span>

The following is a non-normative example of a Context:

<pre class="json example" id="context-example" title="Example Context">
{
  "time": "1985-10-26T01:22-07:00"
}
</pre>

### <span class="nlgov-add">Context Properties</span>
<span class="nlgov-add">Context MAY include zero or more additional attributes as key-value pairs.</span>

<span class="nlgov-add">To increase interoperability, a few common properties are specified below:</span>

#### <span class="nlgov-add">Time</span>

<span class="nlgov-add">The logical time at which the action was considered to be initiated, identified by the `time` field, whose value is a textual representation of the time as defined in [[RFC3339]].</span>

<span class="nlgov-add">This timestamp SHOULD be used when a PDP evaluates the access request uses information from data sources that support temporal queries. See for example the [[REST API Design Rules]] and its [temporal extension](https://docs.geostandaarden.nl/api/API-Strategie-ext/#temporal).</span>

#### <span class="nlgov-add">W3C Trace Context</span>

<span class="nlgov-add">To enable tracing of requests request identifiers MUST be included in the evaluation request. Request identifiers SHOULD be included in the Context object. They SHOULD be in the form of `tracestate`, `traceparent` as defined by [[Trace-Context]].</span>