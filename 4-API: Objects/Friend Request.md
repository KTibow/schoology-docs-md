# Friend Request

Friend requests can be sent from/received by other Schoology users in your network. You can view a list of pending requests and update (accept or deny) pending requests. For listing, you can specify the query key `created_offset` to view only requests that were created after the specified time (any format PHP's `strtotime` can interpret), for example: `/users/{user id}/requests/friends?created_offset=2010-05-14+22:23:00`.

> [!IMPORTANT]
> Friend Requests exist in users.

## Fields

| Field            | Name           | Description                                                | Type      |
| ---------------- | -------------- | ---------------------------------------------------------- | --------- |
| `requester_id`   | Requester ID   | The user ID of the user making the request                 | `integer` |
| `requester_name` | Requester Name | The display name of the user making the request            | `string`  |
| `picture_url`    | Picture URL    | The full URL of the profile picture of the requesting user | `string`  |
| `school_name`    | School Name    | The school of the requesting user                          | `string`  |
| `school_id`      | School ID      | The ID of the school of the requesting user                | `string`  |
| `created`        | Date Created   | The unix timestamp when the request was created            | `string`  |

## GET `users/{user id}/requests/friends`

View a list of pending requests

Parameters

- `created_offset` — Filter to requests created after the specified time (any format PHP's `strtotime` accepts). Example: `2010-05-14+22:23:00`

**Return** A list of [friend request objects](#fields)

::: code-group

```json [JSON]
{
  "request": [
    {
      "id": "39095",
      "requester_id": "5",
      "created": "1389714992",
      "requester_name": "Dr. Shaw",
      "picture_url": "http:\/\/...",
      "school_name": "Washington University",
      "school_id": "170"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <request>
        <id>39095</id>
        <requester_id>5</requester_id>
        <created>1389714992</created>
        <requester_name>Dr. Shaw</requester_name>
        <picture_url>http:\/\/...</picture_url>
        <school_name>Washington University</school_name>
        <school_id>170</school_id>
    </request>
</result>
```

:::

## PUT `users/{user id}/requests/friends/{request id}`

Update a pending request. The `request_action` field value must be a string with value `accept` or `deny`.

**Content** An object containing a `request_action` field

::: code-group

```json [JSON]
{
  "request_action": "accept"
}
```

```xml [XML]
<request>
  <request_action>accept</request_action>
</request>
```

:::
