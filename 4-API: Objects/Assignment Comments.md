# Assignment Comments

Comments can be made for any assignment.

> [!IMPORTANT]
> Comments exist in sections.

## Fields

| Field              | Name              | Description                                                                                 | Type      |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------- | --------- |
| `id`               | ID                | The Schoology ID of the comment.                                                            | `integer` |
| `uid*`             | User Id           | The Schoology user id of the user who created the comment.                                  | `integer` |
| `comment*`         | Comment           | The comment text.                                                                           | `string`  |
| `created`          | Created timestamp | The Unix timestamp when the comment was created.                                            | `integer` |
| `parent_id`        | Parent ID         | The ID of the comment being replied to.                                                     | `integer` |
| `status`           | Comment status    | Whether the comment is deleted (`0`), available (`1`) or pending moderation approval (`3`). | `{0,1,3}` |
| `likes`            | Likes             | Number of likes the comment has.                                                            | `integer` |
| `user_like_action` | User like action  | Whether the current user has liked the comment (`true`/`false`).                            | `boolean` |
| `links`            | Links             | Links related to the comment (e.g., `self`).                                                | `object`  |

\* = Required

## GET `sections/{section id}/assignments/{assignment id}/comments`

View a list of comments (paged)

**Return** A list of [comment objects](#fields)

::: code-group

```json [JSON]
{
  "comment": [
    {
      "id": 3570325,
      "uid": 45552,
      "comment": "this is a test comment",
      "created": 1388422820,
      "parent_id": 0,
      "status": 1,
      "likes": 0,
      "user_like_action": false,
      "links": {
        "self": "http:\/\/...\/comments\/3570325"
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <comment>
        <id>3570325</id>
        <uid>45552</uid>
        <comment>this is a test comment</comment>
        <created>1388422820</created>
        <parent_id>0</parent_id>
        <status>1</status>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <links>
            <self>http://.../comments/3570325</self>
        </links>
    </comment>
</result>
```

:::

## GET `sections/{section id}/assignments/{assignment id}/comments/{id}`

View a specified comment

**Return** A [comment](#fields)

::: code-group

```json [JSON]
{
  "id": 3570325,
  "uid": 45552,
  "comment": "this is a test comment",
  "created": 1388422820,
  "parent_id": 0,
  "status": 1,
  "likes": 0,
  "user_like_action": false
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>3570325</id>
    <uid>45552</uid>
    <comment>this is a test comment</comment>
    <created>1388422820</created>
    <parent_id>0</parent_id>
    <status>1</status>
    <likes>0</likes>
    <user_like_action></user_like_action>
</result>
```

:::

## POST `sections/{section id}/assignments/{assignment id}/comments`

Create a comment

**Content** An object containing comment fields

::: code-group

```json [JSON]
{
  "uid": "2345467",
  "comment": "The comment text"
}
```

```xml [XML]
<body>
  <uid>2345467</uid>
  <comment>The comment text</comment>
</body>
```

:::

**Return** An object containing comment fields

::: code-group

```json [JSON]
{
  "id": 3570325,
  "uid": 45552,
  "comment": "this is a test comment",
  "created": 1388422820,
  "parent_id": 0,
  "status": 1,
  "likes": 0,
  "user_like_action": false,
  "links": {
    "self": "http:\/\/...\/comments\/"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>3570325</id>
    <uid>45552</uid>
    <comment>this is a test comment</comment>
    <created>1388422820</created>
    <parent_id>0</parent_id>
    <status>1</status>
    <likes>0</likes>
    <user_like_action></user_like_action>
    <links>
        <self>http://.../comments/</self>
    </links>
</result>
```

:::

## DELETE `sections/{section id}/assignments/{assignment id}/comments/{id}`

Delete a comment (cannot be undone)
