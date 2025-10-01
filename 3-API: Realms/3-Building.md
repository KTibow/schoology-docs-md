# Building

Buildings (AKA campuses), are further separations of courses, groups, and users that all belong to the same system.

## Fields

Buildings use the same fields as [schools](./2-School), although may have a `building_code`, a configurable external ID string (used for imports and synchronization).

## GET, PUT, DELETE `schools/{id}`

Buildings use the same endpoints as [schools](./2-School) for GET, PUT, and DELETE.

## POST `schools/{school id}/buildings`

Create a building in a school

**Content** A [building](#fields)

::: code-group

```json [JSON]
{
  "title": "Example school name",
  "address1": "750 West Road",
  "city": "New York",
  "state": "New York"
}
```

```xml [XML]
<body>
  <title>Example school name</title>
  <address1>750 West Road</address1>
  <city>New York</city>
  <state>New York</state>
</body>
```

:::

**Return** A [building](#fields)

::: code-group

```json [JSON]
{
  "id": "5592393",
  "title": "Example school 2 name",
  "address1": "750 West Road",
  "address2": null,
  "city": "NYC",
  "state": "NY",
  "postal_code": null,
  "country": null,
  "website": "",
  "phone": null,
  "fax": null,
  "building_code": "",
  "picture_url": "... URL ...",
  "links": {
    "self": "... URL ..."
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5592395</id>
  <title>Example school 2 name</title>
  <address1>750 West Road</address1>
  <address2 />
  <city>NYC</city>
  <state>NY</state>
  <postal_code />
  <country />
  <website />
  <phone />
  <fax />
  <building_code />
  <picture_url>...URL...</picture_url>
    <links>
      <self>...URL ...</self>
    </links>
</result>
```

:::

## GET schools/{school id}/buildings

View the buildings for a school

**Return** [buildings](#fields)

::: code-group

```json [JSON]
{
  "building": [
    {
      "id": "5171921",
      "title": "Cave High",
      "address1": "800 Underground Ave",
      "address2": "",
      "city": "Petaluma",
      "state": "CA",
      "postal_code": "94952",
      "country": "US",
      "website": "",
      "phone": "234234324",
      "fax": "",
      "building_code": "",
      "picture_url": " ... URL ... "
    },
    {
      "id": "5592393",
      "title": "Example school 2 name",
      "address1": "750 West Road",
      "address2": "",
      "city": "NYC",
      "state": "NY",
      "postal_code": "",
      "country": "",
      "website": "",
      "phone": "",
      "fax": "",
      "building_code": "",
      "picture_url": " ... URL ... "
    },
    {
      "id": "5592395",
      "title": "Example school 2 name",
      "address1": "750 West Road",
      "address2": "",
      "city": "NYC",
      "state": "NY",
      "postal_code": "",
      "country": "",
      "website": "",
      "phone": "",
      "fax": "",
      "building_code": "",
      "picture_url": " ... URL ... "
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
        <building>
                <id>5171921</id>
                <title>Cave High</title>
                <address1>800 Underground Ave</address1>
                <address2 />
                <city>Petaluma</city>
                <state>CA</state>
                <postal_code>94952</postal_code>
                <country>US</country>
                <website />
                <phone>234234324</phone>
                <fax />
                <building_code />
                <picture_url> ... URL ... </picture_url>
        </building>
        <building>
                <id>5592393</id>
                <title>Example school 2 name</title>
                <address1>750 West Road</address1>
                <address2 />
                <city>NYC</city>
                <state>NY</state>
                <postal_code />
                <country />
                <website />
                <phone />
                <fax />
                <building_code />
                <picture_url> ... URL ... >
        </building>
        <building>
                <id>5592395</id>
                <title>Example school 2 name</title>
                <address1>750 West Road</address1>
                <address2 />
                <city>NYC</city>
                <state>NY</state>
                <postal_code />
                <country />
                <website />
                <phone />
                <fax />
                <building_code />
                <picture_url> ... URL ... >
        </building>
</result>
```

:::

## Objects and realms

<RealmObjects realm="Buildings" />
