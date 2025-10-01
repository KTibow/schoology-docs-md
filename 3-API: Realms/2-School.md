# School

Schools are the most basic groupings of courses, groups, and users. All courses/users are required to have unique usernames, course IDs, and School User IDs throughout the entire school.

## Fields

| Field         | Name                  | Description                                                                                                                            | Type     |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`          | School Id             | The internal Schoology ID that identifies the school. This field cannot be used in create operations; only update and read operations. | `string` |
| `title`\*     | School Title          | The name of the school                                                                                                                 | `string` |
| `address1`    | Street address line 1 | The first line of the school's street address                                                                                          | `string` |
| `address2`    | Street address line 2 | The second line of the school's street address                                                                                         | `string` |
| `city`        | City                  | The city where the school is located                                                                                                   | `string` |
| `state`       | State                 | The state/province where the school is located                                                                                         | `string` |
| `postal_code` | Postal code           | The postal code where the school is located                                                                                            | `string` |
| `country`     | Country               | The country where the school is located                                                                                                | `string` |
| `website`     | Website               | The school's website address                                                                                                           | `string` |
| `phone`       | Phone number          | The school's phone number                                                                                                              | `string` |
| `fax`         | Fax Number            | The school's fax number                                                                                                                | `string` |
| `picture_url` | Profile Picture URL   | The full URL of the school's profile picture                                                                                           | `string` |

\* = Required

## GET schools

?

## GET `schools/{id}`

View a specified school

**Return** A [school](#fields)

::: code-group

```json [JSON]
{
  "id": "344232",
  "title": "Hill Valley High School",
  "address1": "700 Western Ave",
  "address2": "",
  "city": "Petaluma",
  "state": "CA",
  "postal_code": "94952",
  "country": "US",
  "website": "",
  "phone": "234234324234",
  "fax": "",
  "building_code": "",
  "picture_url": ".. URL ..."
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>344232</id>
  <title>Hill Valley High School</title>
  <address1>700 Western Ave</address1>
  <address2 />
  <city>Petaluma</city>
  <state>CA</state>
  <postal_code>94952</postal_code>
  <country>US</country>
  <website />
  <phone>234234324234</phone>
  <fax />
  <building_code />
  <picture_url>.. URL ...</picture_url>
</result>
```

:::

## POST schools

Create a school

**Content** A [school](#fields)

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

## PUT `schools/{id}`

Edit a specified school

## DELETE `schools/{id}`

Delete a specified school

## Objects and realms

<RealmObjects realm="Schools" />
