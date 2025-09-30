# Grading Period

Grading periods (marking periods) determine when a course section is active. Course sections and assignments are linked to grading periods (or marking periods). This endpoint lists all grading periods for the school. To view a list of grading periods for a specific section, see course sections. This endpoint is only available to school administrators.

> [!IMPORTANT]
> Grading periods exist in sections.

## Fields

| Field     | Name       | Description                                                                                   | Type                       |
| --------- | ---------- | --------------------------------------------------------------------------------------------- | -------------------------- |
| `title`\* | Title      | The grading period title. This title must be unique across all grading periods in the school. | `string`                   |
| `start`\* | Start Date | The grading period start date. Format: `YYYY-MM-DD`.                                          | `date string (YYYY-MM-DD)` |
| `end`\*   | End Date   | The grading period end date. Format: `YYYY-MM-DD`.                                            | `date string (YYYY-MM-DD)` |

\* = Required

## GET `gradingperiods`

View a list of grading periods.

Parameters:

- `title`
- `startswith` (set to `1` to match titles that begin with the provided `title`)

**Return** A list of [grading period objects](#fields)

::: code-group

```json [JSON]
{
  "total": 1,
  "gradingperiods": [
    {
      "id": 13011,
      "title": "Never Ending Period",
      "start": "2012-09-17",
      "end": "2016-09-17",
      "active": "1",
      "links": {
        "self": "http:\/\/..."
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<total>1</total>
	<gradingperiods>
		<id>13011</id>
		<title>Never Ending Period</title>
		<start>2012-09-17</start>
		<end>2016-09-17</end>
		<active>1</active>
		<links>
			<self>http:\/\/...</self>
		</links>
	</gradingperiods>
</result>
```

:::

## GET `sections/{id}/grading_periods`

List the available grading periods for the given course section.

**Return** A list of grading period objects

::: code-group

```json [JSON]
{
  "grading_period": [
    {
      "id": 435,
      "title": "Fall 2013",
      "weight": 50,
      "start": "2013-09-01 00:00:00",
      "end": "2013-12-31 00:00:00"
    },
    {
      "id": 13011,
      "title": "Never Ending Period",
      "weight": 50,
      "start": "2012-09-17 00:00:00",
      "end": "2016-09-17 00:00:00"
    }
  ],
  "links": {
    "self": "https:\/\/...\/v1\/sections\/4318461\/grading_periods"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<grading_period>
		<id>435</id>
		<title>Fall 2013</title>
		<weight>50</weight>
		<start>2013-09-01 00:00:00</start>
		<end>2013-12-31 00:00:00</end>
	</grading_period>
	<grading_period>
		<id>13011</id>
		<title>Never Ending Period</title>
		<weight>50</weight>
		<start>2012-09-17 00:00:00</start>
		<end>2016-09-17 00:00:00</end>
	</grading_period>
	<links>
		<self>https://.../v1/sections/4318461/grading_periods</self>
	</links>
</result>
```

:::

## GET `gradingperiods/{id}`

View a specific grading period

**Return** A [grading period](#fields)

::: code-group

```json [JSON]
{
  "id": "25739",
  "title": "Summer Period",
  "start": "2014-05-01",
  "end": "2014-09-01",
  "active": "0"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>25739</id>
	<title>Summer Period</title>
	<start>2014-05-01</start>
	<end>2014-09-01</end>
	<active>0</active>
</result>
```

:::

## POST `gradingperiods`

Create a grading period

**Content** An object containing grading period fields

::: code-group

```json [JSON]
{
  "title": "The grading period title",
  "start": "2013-09-09",
  "end": "2013-12-22"
}
```

```xml [XML]
<body>
  <title>The grading period title</title>
  <start>2013-09-09</start>
  <end>2013-12-22</end>
</body>
```

:::

**Return** A grading period object

::: code-group

```json [JSON]
{
  "id": "25739",
  "title": "Summer Period",
  "start": "2014-05-01",
  "end": "2014-09-01",
  "active": "0",
  "links": {
    "self": "http:\/\/..."
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>25739</id>
	<title>Summer Period</title>
	<start>2014-05-01</start>
	<end>2014-09-01</end>
	<active>0</active>
	<links>
		<self>http:\/\/...</self>
	</links>
</result>
```

:::

## PUT `gradingperiods/{id}`

Modify a grading period

**Content** An object containing grading period fields

::: code-group

```json [JSON]
{
  "title": "Extended grading period title",
  "start": "2013-09-09",
  "end": "2014-06-15"
}
```

```xml [XML]
<body>
  <title>Extended grading period title</title>
  <start>2013-09-09</start>
  <end>2014-06-15</end>
</body>
```

:::

## DELETE `gradingperiods/{id}`

Delete a grading period (cannot be undone). All course sections belonging to this grading period must first be deleted or associated with a different period.
