# Updates

Updates are short, Twitter-style posts shown in the Edge for a given realm. They contain a `body` and may include attachments (links, files, videos) or polls. The API supports listing, viewing, creating, editing, and deleting updates within the supported realms.

> [!IMPORTANT]
> Updates exist in users, groups, and sections.

## Fields

| Field                   | Name                      | Description                                                                                        | Type                      |
| ----------------------- | ------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| `body*`                 | Body                      | The body text of the update.                                                                       | `string`                  |
| `uid`                   | Posting user ID           | The user ID of the user who posted the update.                                                     | `string`                  |
| `display_name`          | Posting user display name | The display name of the user who posted the update.                                                | `string`                  |
| `last_updated`          | Last updated timestamp    | The unix timestamp of the most recent time the post was created/modified.                          | `string`                  |
| `attachment/type`       | Attachment type           | For updates with attachments, the type of the attachment. Valid values: `{'file','link','video'}`. | `{'file','link','video'}` |
| `attachment/title`      | Attachment title          | The display value of the link to the attachment.                                                   | `string`                  |
| `attachment/url`        | Attachment URL            | The absolute URL of the attachment.                                                                | `string`                  |
| `attachment/thumbnail`  | Attachment thumbnail      | For attachments of type `link`, a thumbnail screenshot of the linked page.                         | `string`                  |
| `poll/options`          | Poll options              | For updates with polls attached, this array holds the poll's options.                              | `array`                   |
| `poll/options/title`    | Poll option title         | The title and displayable name of the given poll option.                                           | `string`                  |
| `poll/options/count`    | Poll option vote count    | The number of users who have selected this option in the poll.                                     | `int`                     |
| `poll/options/selected` | Poll option selected      | `true` if the current user selected this poll item.                                                | `bool`                    |

\* = Required

## GET `{realm}/updates`

View a list of updates (paged). Optional query parameter: `with_attachments`.

**Return** A list of update objects

::: code-group

```json [JSON]
{
  "update": [
    {
      "id": 5692167,
      "body": "this is another message",
      "uid": 45552,
      "created": 1388169887,
      "likes": 0,
      "user_like_action": false,
      "realm": "user",
      "user_id": 45552,
      "num_comments": 0
    },
    {
      "id": 5692165,
      "body": "this is new messag",
      "uid": 45552,
      "created": 1388169771,
      "likes": 0,
      "user_like_action": false,
      "realm": "user",
      "user_id": 45552,
      "num_comments": 0
    },
    {
      "id": 344360,
      "body": "adfasdfasdf cccccc",
      "uid": 45552,
      "created": 1348781638,
      "likes": 0,
      "user_like_action": false,
      "realm": "user",
      "user_id": 45552,
      "num_comments": 0
    }
  ],
  "links": {
    "self": "http:\/\/...\/updates?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <update>
        <id>5692167</id>
        <body>this is another message</body>
        <uid>45552</uid>
        <created>1388169887</created>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <realm>user</realm>
        <user_id>45552</user_id>
        <num_comments>0</num_comments>
    </update>
    <update>
        <id>5692165</id>
        <body>this is new messag</body>
        <uid>45552</uid>
        <created>1388169771</created>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <realm>user</realm>
        <user_id>45552</user_id>
        <num_comments>0</num_comments>
    </update>
    <update>
        <id>344360</id>
        <body>adfasdfasdf cccccc</body>
        <uid>45552</uid>
        <created>1348781638</created>
        <likes>0</likes>
        <user_like_action></user_like_action>
        <realm>user</realm>
        <user_id>45552</user_id>
        <num_comments>0</num_comments>
    </update>
    <links>
        <self>http://.../updates?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## GET `{realm}/updates/{id}`

View a specified update. Optional query parameter: `with_attachments`.

**Return** An update object

::: code-group

```json [JSON]
{
  "id": 5692167,
  "body": "this is another message",
  "uid": 45552,
  "created": 1388169887,
  "likes": 0,
  "user_like_action": false,
  "realm": "user",
  "user_id": 45552,
  "num_comments": 0
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5692167</id>
  <body>this is another message</body>
  <uid>45552</uid>
  <created>1388169887</created>
  <likes>0</likes>
  <user_like_action></user_like_action>
  <realm>user</realm>
  <user_id>45552</user_id>
  <num_comments>0</num_comments>
</result>
```

:::

## POST `{realm}/updates`

Create an update for the signed-in user.

**Content** An object containing update fields

::: code-group

```json [JSON]
{
  "body": "this is new message",
  "attachments": [
    {
      "type": "link",
      "title": "g.0",
      "url": "http:\/\/www.google.com"
    }
  ]
}
```

```xml [XML]
<body>
  <body>this is new message</body>
  <attachments>
    <attachment>
      <type>link</type>
      <title>g.0</title>
      <url>http://www.google.com</url>
    </attachment>
  </attachments>
</body>
```

:::

**Return** An update object

::: code-group

```json [JSON]
{
  "id": 5692165,
  "body": "this is new message",
  "uid": 45552,
  "created": 1388169771,
  "likes": 0,
  "user_like_action": false,
  "realm": "user",
  "user_id": 45552,
  "attachments": {
    "links": {
      "link": [
        {
          "id": 1458865,
          "type": "link",
          "url": "http:\/\/www.google.com",
          "title": "g.O",
          "summary": ""
        }
      ]
    }
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5692165</id>
  <body>this is new message</body>
  <uid>45552</uid>
  <created>1388169771</created>
  <likes>0</likes>
  <user_like_action></user_like_action>
  <realm>user</realm>
  <user_id>45552</user_id>
  <attachments>
      <links>
          <link>
              <id>1458865</id>
              <type>link</type>
              <url>http://www.google.com</url>
              <title>g.O</title>
              <summary />
          </link>
      </links>
  </attachments>
</result>
```

:::

## PUT `{realm}/updates/{id}`

Edit the body of an update. If somebody other than the user who created the update edits it (for example, an Admin), the posting user ID will not be changed.

**Content** An object containing update fields

::: code-group

```json [JSON]
{
  "body": "this is new (updated) message",
  "attachments": [
    {
      "type": "link",
      "title": "y.0",
      "url": "http:\/\/www.yahoo.com"
    }
  ]
}
```

```xml [XML]
<body>
  <body>this is new (updated) message</body>
  <attachments>
    <attachment>
      <type>link</type>
      <title>y.0</title>
      <url>http://www.yahoo.com</url>
    </attachment>
  </attachments>
</body>
```

:::

**Return** An update object

## DELETE `{realm}/updates/{id}`

Delete an update (cannot be undone).
