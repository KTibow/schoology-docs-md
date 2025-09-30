# Attendance

Attendance statuses are associated with an enrollment and a specific date. Attendance statuses are assigned to users for a specific date through enrollments.

> [!IMPORTANT]
> Attendances exist in sections.

## Fields

| Field             | Name          | Description                                                                    | Type                |
| ----------------- | ------------- | ------------------------------------------------------------------------------ | ------------------- |
| `enrollment_id`\* | Enrollment ID | The ID of the enrollment for which you are assigning an attendance status.     | `integer`           |
| `date`\*          | Date          | The date for which the status is being set (YYYY-MM-DD).                       | `date (YYYY-MM-DD)` |
| `status`\*        | Status        | The attendance status: `1` = present, `2` = absent, `3` = late, `4` = excused. | `1-4`               |
| `comment`         | Comment       | A comment to associate with this attendance status.                            | `string`            |

\* = Required

## GET `sections/{section id}/attendance`

View a list of attendance statuses (paged).

Query parameters:

- `start` and `end`: filter statuses for a given date range, inclusive (YYYY-MM-DD)
- `enrollment_id`: filter statuses for a given enrollment

**Return** A list of [attendance objects](#fields)

::: code-group

```json [JSON]
{
  "date": [
    {
      "date": "2014-01-13",
      "statuses": {
        "status": [
          {
            "status_code": 2,
            "attendances": {
              "attendance": [
                {
                  "enrollment_id": 44783151,
                  "date": "2014-01-13",
                  "status": 2,
                  "comment": ""
                }
              ]
            }
          }
        ]
      }
    },
    {
      "date": "2014-01-14",
      "statuses": {
        "status": [
          {
            "status_code": 3,
            "attendances": {
              "attendance": [
                {
                  "enrollment_id": 44783151,
                  "date": "2014-01-14",
                  "status": 3,
                  "comment": ""
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "totals": {
    "total": [
      {
        "status": 2,
        "count": 1
      },
      {
        "status": 3,
        "count": 1
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <date>
        <date>2014-01-13</date>
        <statuses>
            <status>
                <status_code>2</status_code>
                <attendances>
                    <attendance>
                        <enrollment_id>44783151</enrollment_id>
                        <date>2014-01-13</date>
                        <status>2</status>
                        <comment />
                    </attendance>
                </attendances>
            </status>
        </statuses>
    </date>
    <date>
        <date>2014-01-14</date>
        <statuses>
            <status>
                <status_code>3</status_code>
                <attendances>
                    <attendance>
                        <enrollment_id>44783151</enrollment_id>
                        <date>2014-01-14</date>
                        <status>3</status>
                        <comment />
                    </attendance>
                </attendances>
            </status>
        </statuses>
    </date>
    <totals>
        <total>
            <status>2</status>
            <count>1</count>
        </total>
        <total>
            <status>3</status>
            <count>1</count>
        </total>
    </totals>
</result>
```

:::

Note: In general, this endpoint will not return records for a status of PRESENT. If attendance was taken on a given day, assume all enrollments are PRESENT outside of whatever status-specific records are returned.

Errors:

- Response Code `410 Gone` returned if district has installed the PowerSchool SIS Attendance App for its courses.

## PUT `sections/{section id}/attendance`

Modify attendance statuses

**Content** Objects containing attendance fields

::: code-group

```json [JSON]
{
  "attendances": {
    "attendance": [
      {
        "enrollment_id": "784754",
        "date": "2014-05-20",
        "status": "1"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<attendances>
		<attendance>
			<enrollment_id>784754</enrollment_id>
			<date>2014-05-20</date>
			<status>1</status>
		</attendance>
	</attendances>
</result>
```

:::

**Return** An array of attendance ids and response codes

::: code-group

```json [JSON]
{
  "attendance": [
    {
      "id": "564027",
      "response_code": 200
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<attendance>
		<id>564027</id>
		<response_code>200</response_code>
	</attendance>
</result>
```

:::

Errors:

- Response Code `410 Gone` returned if district has installed the PowerSchool SIS Attendance App for its courses.
