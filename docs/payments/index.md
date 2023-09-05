## Authorize.NET

PCI-DSS SAQ A-EP

### API Endpoints & Authentication

All requests to the Authorize.net API are sent via the HTTP POST method to one
of our API endpoint URLs.

### HTTP Request Method: `POST`

| Environment             | API Endpoint                                       |
| ----------------------- | -------------------------------------------------- |
| Sandbox API Endpoint    | `https://apitest.authorize.net/xml/v1/request.api` |
| Production API Endpoint | `https://api.authorize.net/xml/v1/request.api`     |

|      | Content-Type       |
| ---- | ------------------ |
| JSON | `application/json` |
| XML  | `text/xml`         |

API Schema (XSD): `https://api.authorize.net/xml/v1/schema/AnetApiSchema.xsd`

All calls to the Authorize.net API require merchant authentication.

A Note Regarding JSON Support

The Authorize.net API, which is not based on REST, offers JSON support
through a translation of JSON elements to XML elements. While JSON does
not typically require a set order to the elements in an object,
XML requires strict ordering.

Developers using the Authorize.net API should force the ordering of elements
to match the API Reference.
