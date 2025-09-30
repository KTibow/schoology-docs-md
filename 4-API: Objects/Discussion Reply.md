# Discussion Reply

Replies are comments made to discussion threads.

> [!IMPORTANT]
> Discussion replies exist in districts, schools, groups, and sections.

## Fields

| Field       | Name              | Description                                                                                                                                              | Type      |
| ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `uid`       | User Id           | The Schoology user id of the user who created the comment.                                                                                               | `integer` |
| `comment`\* | Comment           | The comment/reply text.                                                                                                                                  | `string`  |
| `created`   | Created timestamp | The Unix timestamp when the comment was created.                                                                                                         | `integer` |
| `parent_id` | Parent Id         | If this comment is in reply to another comment, specify it here. To reply to the discussion thread instead of a specific comment, set the parent to `0`. | `integer` |
| `status`    | Comment status    | Whether or not the comment was deleted. Only available for course admins with `manage discussion` permission.                                            | `integer` |

\* = Required

## GET `{realm}/discussions/{post id}/comments`

View a list of comments (paged)

**Return** A list of [comments](#fields)

::: code-group

```json [JSON]
{
  "comment": [
    {
      "id": 3570315,
      "uid": 45552,
      "comment": "SOAP vs REST",
      "created": 1388169292,
      "parent_id": 0,
      "status": 1,
      "likes": 0,
      "user_like_action": false,
      "links": {
        "self": "http:\/\/...\/comments\/3570315"
      }
    },
    {
      "id": 3570317,
      "uid": 45552,
      "comment": "RESTful vs SOAP",
      "created": 1388169354,
      "parent_id": 0,
      "status": 1,
      "likes": 0,
      "user_like_action": false,
      "links": {
        "self": "http:\/\/...\/comments\/3570317"
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <comment>
        <id>3570315</id>
        <uid>45552</uid>
        <comment>SOAP vs REST</comment>
        <created>1388169292</created>
        <parent_id>0</parent_id>
        <status>1</status>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <links>
            <self>http://.../comments/3570315</self>
        </links>
    </comment>
    <comment>
        <id>3570317</id>
        <uid>45552</uid>
        <comment>RESTful vs SOAP</comment>
        <created>1388169354</created>
        <parent_id>0</parent_id>
        <status>1</status>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <links>
            <self>http://.../comments/3570317</self>
        </links>
    </comment>
</result>
```

:::

## GET `{realm}/discussions/{post id}/comments/{id}`

View a specified comment

**Return** A [comment](#fields)

::: code-group

```json [JSON]
{
  "id": 3570315,
  "uid": 45552,
  "comment": "SOAP vs REST",
  "created": 1388169292,
  "parent_id": 0,
  "status": 1,
  "likes": 0,
  "user_like_action": false
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>3570315</id>
	<uid>45552</uid>
	<comment>SOAP vs REST</comment>
	<created>1388169292</created>
	<parent_id>0</parent_id>
	<status>1</status>
	<likes>0</likes>
	<user_like_action></user_like_action>
</result>
```

:::

## POST `{realm}/discussions/{post id}/comments`

Create a comment

**Content** An object containing discussion reply fields

::: code-group

```json [JSON]
{
  "uid": "23867876",
  "comment": "This is an awesome topic"
}
```

```xml [XML]
<body>
  <uid>23867876</uid>
  <comment>This is an awesome topic</comment>
</body>
```

:::

**Return** An object containing discussion reply fields

::: code-group

```json [JSON]
{
  "id": 3570315,
  "uid": 45552,
  "comment": "SOAP vs REST",
  "created": 1388169292,
  "parent_id": 0,
  "status": 1,
  "likes": 0,
  "user_like_action": false,
  "links": {
    "self": "http:\/\/...\/discussions\/5692161\/comments\/"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>3570315</id>
    <uid>45552</uid>
    <comment>SOAP vs REST</comment>
    <created>1388169292</created>
    <parent_id>0</parent_id>
    <status>1</status>
    <likes>0</likes>
    <user_like_action></user_like_action>
    <links>
        <self>http://.../discussions/5692161/comments/</self>
    </links>
</result>
```

:::

## DELETE `{realm}/discussions/{post id}/comments/{id}`

Delete a comment (cannot be undone)
