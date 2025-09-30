# Scorm Package

Scorm packages are containers for a Sharable Content Object Reference Model that can be integrated with Schoology.

> [!IMPORTANT]
> Scorm packages exist in sections.

## Fields

| Field                   | Name                  | Description                                                                                                                                                                                                                  | Type      |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `title`                 | Title                 | The scorm package title.                                                                                                                                                                                                     | `string`  |
| `url`                   | Launch Url            | The URL to launch the scorm package.                                                                                                                                                                                         | `string`  |
| `num_attempts`          | Number of Attempts    | The total number of attempts on a scorm package in the course section.                                                                                                                                                       | `integer` |
| `scorm_grading_enabled` | Scorm Grading Enabled | Whether or not grading for the Scorm Package is enabled. `0` or `1`.                                                                                                                                                         | `integer` |
| `sco_grading_enabled`   | Sco Grading Enabled   | Whether or not grading for one or more Sco is enabled. `0` or `1`.                                                                                                                                                           | `integer` |
| `grade_timing_type`     | Grade Timing Type     | Timing type for the scorm/sco grade items: `1 = Scorm Completion`, `2 = Sco Completion First`, `3 = Sco Completion Last`.                                                                                                    | `integer` |
| `grade_timing_option`   | Grade Timing Option   | Timing options for the scorm grade item (excl. extra credit): `1 = Score`, `2 = Completion`, `3 = Satisfaction`.                                                                                                             | `integer` |
| `available`             | Available             | The availability status of the scorm package. `0` or `1`.                                                                                                                                                                    | `integer` |
| `completed`             | Completed             | Whether or not the scorm package has been completed. `0` or `1`.                                                                                                                                                             | `integer` |
| `completion_status`     | Completion Status     | The completion status of the scorm package.                                                                                                                                                                                  | `string`  |
| `count_in_grade`        | Count in Grade        | Used for pre-assessments or practice work allowing parents/students to see progress while knowing the score is not impacting a student's calculated grade. Applies only to Scorm packages enabled for grading. Default: `1`. | `integer` |

## GET `sections/{section id}/packages`

View a list of SCORM packages in a course section

**Return** A list of [scorm packages](#fields)

::: code-group

```json [JSON]
{
  "package": [
    {
      "id": 2581911,
      "title": "statistics_pack_5",
      "num_attempts": 0,
      "scorm_grading_enabled": 0,
      "sco_grading_enabled": 1,
      "grade_timing_type": 0,
      "grade_timing_option": 0,
      "url": "http:\/\/schoology.com\/course\/625104\/materials\/package\/2581911\/launch",
      "available": 1,
      "completed": 0,
      "completion_status": "",
      "count_in_grade": 1
    },
    {
      "id": 2582016,
      "title": "geometry_pack_5",
      "num_attempts": 0,
      "scorm_grading_enabled": 0,
      "sco_grading_enabled": 0,
      "grade_timing_type": 0,
      "grade_timing_option": 0,
      "url": "http:\/\/schoology.com\/course\/625104\/materials\/package\/2582016\/launch",
      "available": 1,
      "completed": 0,
      "completion_status": "",
      "count_in_grade": 1
    }
  ],
  "total": 2,
  "links": {
    "self": "http:\/\/schoology.com\/v1\/sections\/625104\/packages?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<package>
		<id>2581911</id>
		<title>statistics_pack_5</title>
		<num_attempts>0</num_attempts>
		<scorm_grading_enabled>0</scorm_grading_enabled>
		<sco_grading_enabled>1</sco_grading_enabled>
		<grade_timing_type>0</grade_timing_type>
		<grade_timing_option>0</grade_timing_option>
		<url>http://schoology.com/course/625104/materials/package/2581911/launch</url>
		<available>1</available>
		<completed>0</completed>
		<completion_status />
		<count_in_grade>1</count_in_grade>
	</package>
	<package>
		<id>2582016</id>
		<title>geometry_pack_5</title>
		<num_attempts>0</num_attempts>
		<scorm_grading_enabled>0</scorm_grading_enabled>
		<sco_grading_enabled>0</sco_grading_enabled>
		<grade_timing_type>0</grade_timing_type>
		<grade_timing_option>0</grade_timing_option>
		<url>http://schoology.com/course/625104/materials/package/2582016/launch</url>
		<available>1</available>
		<completed>0</completed>
		<completion_status />
		<count_in_grade>1</count_in_grade>
	</package>
	<total>2</total>
	<links>
		<self>http://schoology.com/v1/sections/625104/packages?start=0&amp;limit=20</self>
	</links>
</result>
```

:::

## GET `sections/{section id}/package/{id}`

View a specified scorm package

**Return** A [scorm package](#fields)

::: code-group

```json [JSON]
{
  "id": 2581911,
  "title": "statistics_pack_5",
  "num_attempts": 0,
  "scorm_grading_enabled": 0,
  "sco_grading_enabled": 1,
  "grade_timing_type": 0,
  "grade_timing_option": 0,
  "url": "http:\/\/schoology.com\/course\/625104\/materials\/package\/2581911\/launch",
  "available": 1,
  "completed": 0,
  "completion_status": "",
  "count_in_grade": 1
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>2581911</id>
	<title>statistics_pack_5</title>
	<num_attempts>0</num_attempts>
	<scorm_grading_enabled>0</scorm_grading_enabled>
	<sco_grading_enabled>1</sco_grading_enabled>
	<grade_timing_type>0</grade_timing_type>
	<grade_timing_option>0</grade_timing_option>
	<url>http://schoology.com/course/625104/materials/package/2581911/launch</url>
	<available>1</available>
	<completed>0</completed>
	<completion_status />
	<count_in_grade>1</count_in_grade>
</result>
```

:::

## DELETE `sections/{section id}/package/{id}`

Delete a scorm package (cannot be undone)
