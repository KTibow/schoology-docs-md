# Network

View a list of users in the given user's network. Optional query strings may be appended to filter results: `search` to match user names (case-insensitive, exact and partial matches) and `page` to specify the page of results (the response body limit is 30 records per page). If you need a list of users in the given user's school, call `users` instead (see API - User).

> [!IMPORTANT]
> Networks exist in users.

## Fields

| Field  | Name              | Description                          | Type      |
| ------ | ----------------- | ------------------------------------ | --------- |
| `uid`  | User ID           | The user ID of the listed user.      | `integer` |
| `name` | User display name | The display name of the listed user. | `string`  |

## GET `users/{user id}/network`

View a list of users in the given user's network.

Parameters:

- `search` — show only results matching the given search string. Matching is a case-insensitive comparison performed on user names for both exact and partial phrases (for example, searching for `john` will return users named `John Doe` and `William johnson`).
- `page` — the page of results to return (current response body limit is 30 records per page).

**Return** A list of [user objects](#fields)

::: code-group

```json [JSON]
{
  "user": [
    {
      "uid": "44012",
      "name_title": "",
      "name_title_show": "0",
      "name_first": "Alex",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": "0",
      "name_last": "Mon",
      "picture_url": "http:\/\/..."
    },
    {
      "uid": "5",
      "name_title": "Dr.",
      "name_title_show": "1",
      "name_first": "Schoology",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": "0",
      "name_last": "Shaw",
      "picture_url": "http:\/\/..."
    }
  ],
  "total": "2",
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <user>
        <uid>44012</uid>
        <name_title />
        <name_title_show>0</name_title_show>
        <name_first>Alex</name_first>
        <name_first_preferred />
        <name_middle />
        <name_middle_show>0</name_middle_show>
        <name_last>Mon</name_last>
        <picture_url>http:\/\/...</picture_url>
    </user>
    <user>
        <uid>5</uid>
        <name_title>Dr.</name_title>
        <name_title_show>1</name_title_show>
        <name_first>Schoology</name_first>
        <name_first_preferred />
        <name_middle />
        <name_middle_show>0</name_middle_show>
        <name_last>Shaw</name_last>
        <picture_url>http:\/\/...</picture_url>
    </user>
    <total>2</total>
    <links>
        <self>http:\/\/...?start=0&amp;limit=20</self>
    </links>
</result>
```

:::
