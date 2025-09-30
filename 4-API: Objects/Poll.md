# Poll

Polls are currently only available on updates. The only operation supported is voting on a poll. A valid vote request has two fields in the POST body: `{"id": 961, "select": true}` where `id` is the poll option the signed-in user would like to vote in and `select` indicates whether to vote or un-vote that choice. If the logged-in user tries to repeat an action already taken on a poll option, the Schoology API returns a 400. To see possible polls to vote on, make an updates call with the query parameter `with_attachments=TRUE`.

## Fields

| Field                      | Name               | Description                                         | Type      |
| -------------------------- | ------------------ | --------------------------------------------------- | --------- |
| `id`\*                     | ID                 | The Schoology ID of the update containing the poll. | `integer` |
| `body`                     | Body               | The text body of the update.                        | `string`  |
| `uid`                      | User ID            | ID of the user who created the update.              | `integer` |
| `created`                  | Created            | Unix timestamp when the update was created.         | `integer` |
| `likes`                    | Likes              | Number of likes on the update.                      | `integer` |
| `user_like_action`         | User Like Action   | Whether the current user has liked the update.      | `boolean` |
| `realm`                    | Realm              | The realm of the update (for example `school`).     | `string`  |
| `school_id`                | School ID          | ID of the school associated with the update.        | `integer` |
| `num_comments`             | Number of Comments | Number of comments on the update.                   | `integer` |
| `poll`\*                   | Poll               | Object containing poll details and options.         | `object`  |
| `poll.options[] .id`\*     | Option ID          | ID of the poll option.                              | `integer` |
| `poll.options[] .title`\*  | Option Title       | Title/label of the poll option.                     | `string`  |
| `poll.options[] .count`    | Option Count       | Number of votes for the option.                     | `integer` |
| `poll.options[] .selected` | Option Selected    | Whether the current user has selected this option.  | `boolean` |

\* = Required

## POST `poll/{id}/vote`

Vote on a poll option

**Content** An object indicating what sort of action the user would like to take on the poll

::: code-group

```json [JSON]
{
  "id": "961",
  "select": "true"
}
```

```xml [XML]
<body>
  <id>961</id>
  <select>true</select>
</body>
```

:::

**Return** An entire update object with attachments included

::: code-group

```json [JSON]
{
  "id": 5825455,
  "body": "Best Gaming",
  "uid": 45552,
  "created": 1389719819,
  "likes": 0,
  "user_like_action": false,
  "realm": "school",
  "school_id": 344232,
  "num_comments": 0,
  "poll": {
    "options": [
      {
        "id": 1509,
        "title": "Xbox One",
        "count": 0,
        "selected": false
      },
      {
        "id": 1511,
        "title": "PS4",
        "count": 1,
        "selected": true
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5825455</id>
  <body>Best Gaming</body>
  <uid>45552</uid>
  <created>1389719819</created>
  <likes>0</likes>
  <user_like_action></user_like_action>
  <realm>school</realm>
  <school_id>344232</school_id>
  <num_comments>0</num_comments>
  <poll>
    <options>
      <id>1509</id>
      <title>Xbox One</title>
      <count>0</count>
      <selected></selected>
    </options>
    <options>
      <id>1511</id>
      <title>PS4</title>
      <count>1</count>
      <selected>1</selected>
    </options>
  </poll>
</result>
```

:::
