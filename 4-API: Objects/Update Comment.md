# Update Comment

Update Comments are comments made on updates found in the Edge for a given realm. They can be created, listed, viewed, and deleted for updates within the appropriate realm.

> [!IMPORTANT]
> Update Comments exist in users, groups, and sections.

## Fields

| Field       | Name    | Description                                | Type      |
| ----------- | ------- | ------------------------------------------ | --------- |
| `comment`\* | Comment | The comment text                           | `string`  |
| `uid`       | User ID | The ID of the user who created the comment | `integer` |

\* = Required

## GET `{realm}/updates/{update id}/comments`

View a list of comments (paged)

**Return** A list of [comment objects](#fields)

::: code-group

```json [JSON]
{
  "comment": [
    {
      "id": 3570319,
      "uid": 45552,
      "comment": "see my comment",
      "created": 1388170192,
      "parent_id": 0,
      "status": 1,
      "likes": 0,
      "user_like_action": false,
      "links": {
        "self": "http:\/\/...\/comments\/3570319"
      }
    },
    {
      "id": 3570321,
      "uid": 45552,
      "comment": "I see your comment",
      "created": 1388170340,
      "parent_id": 0,
      "status": 1,
      "likes": 0,
      "user_like_action": false,
      "links": {
        "self": "http:\/\/...\/comments\/3570321"
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <comment>
        <id>3570319</id>
        <uid>45552</uid>
        <comment>see my comment</comment>
        <created>1388170192</created>
        <parent_id>0</parent_id>
        <status>1</status>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <links>
            <self>http://.../comments/3570319</self>
        </links>
    </comment>
    <comment>
        <id>3570321</id>
        <uid>45552</uid>
        <comment>I see your comment</comment>
        <created>1388170340</created>
        <parent_id>0</parent_id>
        <status>1</status>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <links>
            <self>http://.../comments/3570321</self>
        </links>
    </comment>
</result>
```

:::

## GET `{realm}/updates/{update id}/comments/{id}`

View a specified comment

**Return** A [comment](#fields)

::: code-group

```json [JSON]
{
  "id": 3570319,
  "uid": 45552,
  "comment": "see my comment",
  "created": 1388170192,
  "parent_id": 0,
  "status": 1,
  "likes": 0,
  "user_like_action": false
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>3570319</id>
	<uid>45552</uid>
	<comment>see my comment</comment>
	<created>1388170192</created>
	<parent_id>0</parent_id>
	<status>1</status>
	<likes>0</likes>
	<user_like_action></user_like_action>
</result>
```

:::

## POST `{realm}/updates/{update id}/comments`

Create a comment

**Content** An object containing comment fields

::: code-group

```json [JSON]
{
  "comment": "This is an awesome topic",
  "uid": "23867876"
}
```

```xml [XML]
<body>
  <comment>This is an awesome update</comment>
  <uid>23867876</uid>
</body>
```

:::

**Return** An object containing comment fields

::: code-group

```json [JSON]
{
  "id": 3570319,
  "uid": 45552,
  "comment": "see my comment",
  "created": 1388170192,
  "parent_id": 0,
  "status": 1,
  "likes": 0,
  "user_like_action": false,
  "links": {
    "self": "http:\/\/...\/comments\/3570319"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>3570319</id>
    <uid>45552</uid>
    <comment>see my comment</comment>
    <created>1388170192</created>
    <parent_id>0</parent_id>
    <status>1</status>
    <likes>0</likes>
    <user_like_action></user_like_action>
    <links>
        <self>http://.../comments/3570319</self>
    </links>
</result>
```

:::

## DELETE `{realm}/updates/{update id}/comments/{id}`

Delete a comment (cannot be undone)
