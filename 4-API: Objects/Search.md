# Search

Search users, schools, groups and courses. There are three different types of search results — users, groups, and courses — and each result object contains different properties. Use the GET list call with query parameters `keywords` (the search phrase) and optional `type` to limit results to a specific kind. Note that all searches are case-insensitive.

## Fields

### User search result object

| Field         | Name                | Description                                 | Type      |
| ------------- | ------------------- | ------------------------------------------- | --------- |
| `uid`         | User ID             | The id of the user.                         | `integer` |
| `name`        | User display name   | The display name of the user.               | `string`  |
| `picture_url` | User picture URL    | The full URL of the user's profile picture. | `string`  |
| `school`      | School display name | The display name of the user's school.      | `string`  |
| `school_id`   | School ID           | The id of the user's school.                | `integer` |

### Course search result object

| Field                | Name                | Description                                   | Type      |
| -------------------- | ------------------- | --------------------------------------------- | --------- |
| `id`                 | Course ID           | The id of the course.                         | `integer` |
| `course_title`       | Course title        | The display name of the course.               | `string`  |
| `dep_code`           | Department code     | The course's department code.                 | `string`  |
| `course_code`        | Course Code         | The course code.                              | `string`  |
| `course_description` | Course description  | The course description.                       | `string`  |
| `picture_url`        | Course picture URL  | The full URL of the course's profile picture. | `string`  |
| `school`             | School display name | The display name of the course's school.      | `string`  |
| `school_id`          | School ID           | The id of the course's school.                | `integer` |

### Group search result object

| Field         | Name                | Description                                  | Type      |
| ------------- | ------------------- | -------------------------------------------- | --------- |
| `id`          | Group ID            | The id of the group.                         | `integer` |
| `group_title` | Group title         | The display name of the group.               | `string`  |
| `picture_url` | Group picture URL   | The full URL of the group's profile picture. | `string`  |
| `school`      | School display name | The display name of the group's school.      | `string`  |
| `school_id`   | School ID           | The id of the group's school.                | `integer` |

## GET `search`

Search for users, groups, and courses. Use the query parameters below to provide the search phrase and optionally limit the result type.

Parameters:

- `keywords` — The search phrase.
- `type` — Optional. Limit results to `user`, `group`, or `course`.

**Return** A collection of search objects (see [Fields](#fields)).

::: code-group

```json [JSON]
{
  "users": {
    "search_result": [
      {
        "uid": "48289",
        "name": "James Howlett",
        "picture_url": "http:\/\/...",
        "school": "Hill Valley High School",
        "school_id": "344232"
      }
    ],
    "total": 1,
    "links": {
      "self": "http:\/\/...&limit=10&page=0"
    }
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <users>
        <search_result>
            <uid>48289</uid>
            <name>James Howlett</name>
            <picture_url>http:\/\/...</picture_url>
            <school>Hill Valley High School</school>
            <school_id>344232</school_id>
        </search_result>
        <total>1</total>
        <links>
            <self>http:\/\/...&amp;limit=10&amp;page=0</self>
        </links>
    </users>
</result>
```

:::
