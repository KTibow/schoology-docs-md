# Blog Post Comment

Comments can be made for any blog post.

> [!IMPORTANT]
> Comments exist in districts, schools, users, groups, and sections.

## Fields

| Field       | Name              | Description                                    | Type     |
| ----------- | ----------------- | ---------------------------------------------- | -------- |
| `id`\*      | Schoology Blog ID | The internal Schoology ID of the blog          | `string` |
| `comment`\* | Comment           | The comment body                               | `string` |
| `uid`       | User ID           | The user ID of the user who posted the comment | `string` |

\* = Required

## GET `{realm}/posts/{post id}/comments`

View a list of post comments (paged)

**Return** A list of [comments](#fields)

::: code-group

```json [JSON]
{
  "comment": [
    {
      "id": 3570311,
      "uid": 45552,
      "comment": "No JS",
      "created": 1388167926,
      "status": 1,
      "links": {
        "self": "http:\/\/...\/comments\/3570311"
      }
    },
    {
      "id": 3570313,
      "uid": 45552,
      "comment": "Yes JS",
      "created": 1388168007,
      "status": 1,
      "links": {
        "self": "http:\/\/...\/comments\/3570313"
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <comment>
        <id>3570311</id>
        <uid>45552</uid>
        <comment>No JS</comment>
        <created>1388167926</created>
        <status>1</status>
        <links>
            <self>http://.../comments/3570311</self>
        </links>
    </comment>
    <comment>
        <id>3570313</id>
        <uid>45552</uid>
        <comment>Yes JS</comment>
        <created>1388168007</created>
        <status>1</status>
        <links>
            <self>http://.../comments/3570313</self>
        </links>
    </comment>
</result>
```

:::

## GET `{realm}/posts/{post id}/comments/{comment id}`

View a specified blog post comment

**Return** A [comment](#fields)

::: code-group

```json [JSON]
{
  "id": 3570311,
  "uid": 45552,
  "comment": "Noooooo JS",
  "created": 1388167926,
  "status": 1
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>3570311</id>
	<uid>45552</uid>
	<comment>Noooooo JS</comment>
	<created>1388167926</created>
	<status>1</status>
</result>
```

:::

## POST `{realm}/posts/{post id}/comments`

Create a blog post comment

**Content** An object containing blog post fields

::: code-group

```json [JSON]
{
  "comment": "See my comment?",
  "uid": "4656546"
}
```

```xml [XML]
<body>
  <comment>See my comment?</comment>
  <uid>4656546</uid>
</body>
```

:::

**Return** An object containing blog post fields

::: code-group

```json [JSON]
{
  "id": 3570311,
  "uid": 45552,
  "comment": "Noooooo JS",
  "created": 0,
  "status": 0,
  "links": {
    "self": "http:\/\/...\/comments\/3570311"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>3570311</id>
    <uid>45552</uid>
    <comment>Noooooo JS</comment>
    <created>0</created>
    <status>0</status>
    <links>
        <self>http://.../comments/3570311</self>
    </links>
</result>
```

:::

## DELETE `{realm}/posts/{post id}/comments/{comment id}`

Delete a blog post comment (cannot be undone)
