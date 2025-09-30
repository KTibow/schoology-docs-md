# Completion

Each user enrolled in a course section has a completion object with information about the student's progress in the section.

> [!IMPORTANT]
> Completions exist in sections.

## Fields

| Field              | Name             | Description                                                             | Type      |
| ------------------ | ---------------- | ----------------------------------------------------------------------- | --------- |
| `uid`              | User Id          | The Schoology user id of the user.                                      | `string`  |
| `total_rules`      | Total Rules      | The total number of completion rules for the user for the section.      | `integer` |
| `completed_rules`  | Completed Rules  | The total number of rules the user has completed for the section.       | `integer` |
| `percent_complete` | Percent Complete | The percentage of the section the user has completed.                   | `float`   |
| `completed`        | Completed?       | Whether the section has been completed by the user. Values: `0` or `1`. | `integer` |

## GET `sections/{section id}/completion`

View a list of section completion objects

**Return** A list of [completion objects](#fields)

::: code-group

```json [JSON]
{
  "completion": [
    {
      "uid": 48289,
      "total_rules": 2,
      "completed_rules": 0,
      "percent_complete": 0,
      "completed": 0
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<completion>
		<uid>48289</uid>
		<total_rules>2</total_rules>
		<completed_rules>0</completed_rules>
		<percent_complete>0</percent_complete>
		<completed>0</completed>
	</completion>
	<total>1</total>
	<links>
		<self>http:\/\/...?start=0&amp;limit=20</self>
	</links>
</result>
```

:::

## GET `sections/{section id}/completion/user/{user id}/{id}`

View a specified section completion object for a particular user

**Return** A [completion](#fields)

::: code-group

```json [JSON]
{
  "uid": 48289,
  "total_rules": 2,
  "completed_rules": 0,
  "percent_complete": 0,
  "completed": 0
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<uid>48289</uid>
	<total_rules>2</total_rules>
	<completed_rules>0</completed_rules>
	<percent_complete>0</percent_complete>
	<completed>0</completed>
</result>
```

:::
