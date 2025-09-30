# Media Album Comments

Media Album Comments are comments made on individual content within media albums.

> [!IMPORTANT]
> Media Album Comments exist in groups and sections.

## Fields

| Field        | Name              | Description                                                             | Type      |
| ------------ | ----------------- | ----------------------------------------------------------------------- | --------- |
| `content_id` | Content ID        | The ID of the content related to the comment. `content_id` is required. | `integer` |
| `uid`        | User ID           | The ID of the user who created the comment.                             | `integer` |
| `comment`    | Comment           | The comment text.                                                       | `string`  |
| `created`    | Created timestamp | The unix timestamp when the comment was created.                        | `integer` |

\* = Required

## GET `{realm}/albums/{id}/content/{content id}/comments`

View a list of comments (paged)

**Return** A list of [comment objects](#fields)

::: code-group

```json [JSON]
{
  "comment": [
    {
      "id": 229,
      "content_id": 17861,
      "uid": 45552,
      "comment": "This is a media album comment",
      "created": 1388420575,
      "status": 1
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <comment>
        <id>229</id>
        <content_id>17861</content_id>
        <uid>45552</uid>
        <comment>This is a media album comment</comment>
        <created>1388420575</created>
        <status>1</status>
    </comment>
</result>
```

:::

## GET `{realm}/albums/{id}/content/{content id}/comments/{comment id}`

View a specified comment

**Return** A [comment](#fields)

::: code-group

```json [JSON]
{
  "id": 229,
  "content_id": 17861,
  "uid": 45552,
  "comment": "This is a media album comment",
  "created": 1388420575,
  "status": 1
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>229</id>
	<content_id>17861</content_id>
	<uid>45552</uid>
	<comment>This is a media album comment</comment>
	<created>1388420575</created>
	<status>1</status>
</result>
```

:::

## POST `{realm}/albums/{id}/content/{content id}/comments`

Create a comment

**Content** An object containing comment fields

::: code-group

```json [JSON]
{
  "comment": "nice pic!"
}
```

```xml [XML]
<body>
  <comment>nice pic!</comment>
</body>
```

:::

**Return** An object containing comment fields

::: code-group

```json [JSON]
{
  "id": 229,
  "content_id": 0,
  "uid": 45552,
  "comment": "This is a media album comment",
  "created": 0,
  "status": 0,
  "links": {
    "self": "http:\/\/...\/comments\/229"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>229</id>
    <content_id>0</content_id>
    <uid>45552</uid>
    <comment>This is a media album comment</comment>
    <created>0</created>
    <status>0</status>
    <links>
        <self>http://.../comments/229</self>
    </links>
</result>
```

:::

## DELETE `{realm}/albums/{id}/content/{content id}/comments/{comment id}`

Delete a comment (cannot be undone)
