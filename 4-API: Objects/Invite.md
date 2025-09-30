# Invite

Users can receive requests to join course sections and groups. Invites represent requests related to either a course section or a group and can be listed or updated via the API.

> [!IMPORTANT]
> Invites exist in users, groups, and sections.

## Fields

| Field          | Name         | Description                                                                       | Type      |
| -------------- | ------------ | --------------------------------------------------------------------------------- | --------- |
| `section_id`   | Section ID   | For course invites, the ID of the course section related to the invite.           | `integer` |
| `section_name` | Section Name | For course invites, the display name of the course section related to the invite. | `string`  |
| `group_id`     | Group ID     | For group invites, the ID of the group related to the invite.                     | `string`  |
| `group_name`   | Group Name   | For group invites, the display name of the group related to the invite.           | `string`  |
| `picture_url`  | Picture URL  | The full URL of the profile picture of the related group or course section.       | `string`  |
| `school_name`  | School Name  | The name of the school that owns the realm related to the invite.                 | `string`  |
| `school_id`    | School ID    | The ID of the school that owns the realm related to the invite.                   | `string`  |
| `id`           | Invite ID    | The Schoology ID of the invite.                                                   | `integer` |
| `created*`     | Date Created | The unix timestamp when the request was created.                                  | `string`  |

\* = Required

## GET `users/{user id}/invites/{realm}`

View a list of pending invites

Parameters:

- `created_offset` — Only return invites created after the specified time. Accepts any string PHP's strtotime can interpret (for example: `2010-05-14 23:44:32`).

**Return** A list of invite objects ([see fields](#fields))

::: code-group

```json [JSON]
{
  "invite": [
    {
      "group_id": 49736,
      "group_name": "Chess Club",
      "picture_url": "http:\/\/...",
      "school_name": "Washington University",
      "school_id": 170,
      "id": 55232611,
      "created": 1389715233
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <invite>
        <group_id>49736</group_id>
        <group_name>Chess Club</group_name>
        <picture_url>http:\/\/...</picture_url>
        <school_name>Washington University</school_name>
        <school_id>170</school_id>
        <id>55232611</id>
        <created>1389715233</created>
    </invite>
</result>
```

:::

## PUT `users/{user id}/invites/{realm}/{invite id}`

Update a pending invite. The `invite_action` value must be either the string `accept` or `deny`. Note: XML requests currently require an additional `<request>` wrapper for correct request body structure.

**Content** An object containing an `invite_action` field

::: code-group

```json [JSON]
{
  "invite": {
    "invite_action": "deny"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<request>
  <invite>
    <invite_action>deny</invite_action>
  </invite>
</request>
```

:::
