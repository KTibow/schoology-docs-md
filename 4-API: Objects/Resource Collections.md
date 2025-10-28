# Resource Collections

Resource Collections are containers for user and group resource templates.

## Fields

| Field          | Name               | Description                                                                                                                     | Type      |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `id`           | Id                 | The Schoology id of the collection.                                                                                             | `integer` |
| `title`*       | Title              | The title of the collection.                                                                                                    | `string`  |
| `uid`          | User Id            | The owner (user id) of the collection.                                                                                          | `integer` |
| `is_default`   | Default Collection | Indicates default collection type: `0` = Regular collection, `1` = Default home collection, `2` = Default Downloads collection. | `0,1,2`   |
| `shared_users` | Shared Users       | The number of users this collection is shared with.                                                                             | `integer` |
| `realm`        | Realm              | The realm the collection is in.                                                                                                 | `string`  |
| `realm_id`     | Realm ID           | The realm id of the collection.                                                                                                 | `integer` |
| `realm_link`   | Realm Link         | A URL to the realm that owns the collection.                                                                                    | `string`  |

\* = Required

## GET `collections`

List a user's collections

**Return** A list of [collection objects](#fields)

## POST `collections`

Create a collection

**Content** An object containing collection fields (see fields)

::: code-group

```json [JSON]
{
  "title": "The title the collection"
}
```

```xml [XML]
<body>
  <title>The title the collection</title>
</body>
```

:::

**Return** A [collection object](#fields)

::: code-group

```json [JSON]
{
  "id": 5825417,
  "title": "New Collection",
  "shared_users": 0,
  "is_default": 0,
  "uid": 48289,
  "links": {
    "self": "http:\/\/..."
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5825417</id>
	<title>New Collection</title>
	<shared_users>0</shared_users>
	<is_default>0</is_default>
	<uid>48289</uid>
	<links>
		<self>http:\/\/...</self>
	</links>
</result>
```

:::

## GET `collections/{collection id}`

Get a single collection

**Return** A [collection object](#fields)

::: code-group

```json [JSON]
{
  "id": 5825417,
  "title": "New Collection",
  "shared_users": 1,
  "is_default": 0,
  "uid": 48289
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5825417</id>
	<title>New Collection</title>
	<shared_users>1</shared_users>
	<is_default>0</is_default>
	<uid>48289</uid>
</result>
```

:::

## PUT `collections/{collection id}`

Edit a collection

**Content** An object containing collection fields to update

::: code-group

```json [JSON]
{
  "title": "The updated title"
}
```

```xml [XML]
<body>
  <title>The updated title</title>
</body>
```

:::

## DELETE `collections/{collection id}`

Delete a collection
