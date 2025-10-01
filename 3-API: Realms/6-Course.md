# Course

Courses are simply containers for course sections. Objects cannot belong to courses; they can only belong to course sections. Courses are parent objects to course sections; they are mere placeholders and cannot be used to upload documents, assignments, etc.

## Fields

| Field                     | Name                         | Description                                                                                                                                                                                              | Type                         |
| ------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `id`                      | Schoology Course ID          | The internal Schoology ID of the course                                                                                                                                                                  | `string`                     |
| `building_id`             | Schoology School Building ID | The internal Schoology ID of the school building to which the course belongs                                                                                                                             | `string`                     |
| `title`\*                 | Course Title                 | The title of the course                                                                                                                                                                                  | `string`                     |
| `course_code`\*           | Course Code                  | The course code must be unique across the entire school (e.g. ENG101)                                                                                                                                    | `string`                     |
| `department`              | Department Name              | The department name (e.g. English)                                                                                                                                                                       | `string`                     |
| `description`             | Description                  | The course description                                                                                                                                                                                   | `string`                     |
| `credits`                 | Credits                      | The number of credits this course is worth                                                                                                                                                               | `double`                     |
| `synced`                  | Sync Status                  | Whether or not this course was synced with an external system (eg, Student Information System). The default value is 0. For synced courses, the **Course Code** field is not editable through Schoology. | `{0,1}`                      |
| `grade_level_range_start` | Grade Level Range Start      | The lowest (or only) grade level in the course.                                                                                                                                                          | `integer {1, 2, 3, ..., 15}` |
| `grade_level_range_end`   | Grade Level Range End        | The highest grade level in the course - must be great than grade_level_range_start if used.                                                                                                              | `integer {1, 2, 3, ..., 15}` |
| `subject_area`            | Subject Area                 | The subject area of the course                                                                                                                                                                           | `integer {1, 2, 3, ..., 9}`  |
| `district_course_name`    | District Course Name         | Uniquely identifies courses across buildings for a district                                                                                                                                              | `string`                     |

\* = Required

### Grade Levels

| API Value | Grade Level                       |
| --------- | --------------------------------- |
| 0         | No grade level/remove grade level |
| 1         | Pre-K                             |
| 2         | K                                 |
| 3         | 1                                 |
| 4         | 2                                 |
| 5         | 3                                 |
| 6         | 4                                 |
| 7         | 5                                 |
| 8         | 6                                 |
| 9         | 7                                 |
| 10        | 8                                 |
| 11        | 9                                 |
| 12        | 10                                |
| 13        | 11                                |
| 14        | 12                                |
| 15        | Higher-Ed                         |

### Subject Areas

| API Value | Subject Area                |
| --------- | --------------------------- |
| 0         | Other                       |
| 1         | Health & Physical Education |
| 2         | Language Arts               |
| 3         | Mathematics                 |
| 4         | Professional Development    |
| 5         | Science                     |
| 6         | Social Studies              |
| 7         | Special Education           |
| 8         | Technology                  |
| 9         | Arts                        |

## GET courses

View a list of courses in your school (paged), with the option to filter results with the following query strings:

- `building_id`: Only return courses for the given building.
- `fetch_district_course_name`: If the set value is `1`, it will also show `district_course_name` for the courses, in the response.

**Return** A list of [courses](#fields)

::: code-group

```json [JSON]
{
  "course": [
    {
      "id": 1407691,
      "title": "Time Travel",
      "course_code": "CC106",
      "department": "",
      "description": "",
      "credits": 0,
      "subject_area": 0,
      "grade_level_range_start": 12,
      "grade_level_range_end": 14,
      "synced": 1,
      "building_id": "344232"
    },
    {
      "id": 5410559,
      "title": "FS1 Course",
      "course_code": "",
      "department": "",
      "description": "",
      "credits": 0,
      "subject_area": 2,
      "grade_level_range_start": 6,
      "grade_level_range_end": 0,
      "synced": 0,
      "building_id": "5171921"
    },
    {
      "id": 5614935,
      "title": "Bulk Course 1",
      "course_code": "BC101",
      "department": "Administration",
      "description": "discuss bulk operations",
      "credits": 0,
      "subject_area": 0,
      "grade_level_range_start": 0,
      "grade_level_range_end": 0,
      "synced": 0,
      "building_id": "344232"
    }
  ],
  "total": "3",
  "links": {
    "self": "http:\/\/...\/v1\/courses?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<course>
		<id>1407691</id>
		<title>Time Travel</title>
		<course_code>CC106</course_code>
		<department />
		<description />
		<credits>0</credits>
		<subject_area>0</subject_area>
		<grade_level_range_start>12</grade_level_range_start>
		<grade_level_range_end>14</grade_level_range_end>
		<synced>1</synced>
		<building_id>344232</building_id>
	</course>
	<course>
		<id>5410559</id>
		<title>FS1 Course</title>
		<course_code />
		<department />
		<description />
		<credits>0</credits>
		<subject_area>2</subject_area>
		<grade_level_range_start>6</grade_level_range_start>
		<grade_level_range_end>0</grade_level_range_end>
		<synced>0</synced>
		<building_id>5171921</building_id>
	</course>
	<course>
		<id>5614935</id>
		<title>Bulk Course 1</title>
		<course_code>BC101</course_code>
		<department>Administration</department>
		<description>discuss bulk operations</description>
		<credits>0</credits>
		<subject_area>0</subject_area>
		<grade_level_range_start>0</grade_level_range_start>
		<grade_level_range_end>0</grade_level_range_end>
		<synced>0</synced>
		<building_id>344232</building_id>
	</course>
	<total>3</total>
	<links>
		<self>http://.../v1/courses?start=0&amp;limit=20</self>
	</links>
</result>
```

:::

## GET `courses/{id}`

View a specified course

**Return** A [course](#fields)

::: code-group

```json [JSON]
{
  "id": 1407691,
  "title": "Time Travel",
  "course_code": "CC106",
  "department": "",
  "description": "",
  "credits": 0,
  "subject_area": 0,
  "grade_level_range_start": 12,
  "grade_level_range_end": 14,
  "synced": 1,
  "building_id": "344232"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>1407691</id>
	<title>Time Travel</title>
	<course_code>CC106</course_code>
	<department />
	<description />
	<credits>0</credits>
	<subject_area>0</subject_area>
	<grade_level_range_start>12</grade_level_range_start>
	<grade_level_range_end>14</grade_level_range_end>
	<synced>1</synced>
	<building_id>344232</building_id>
</result>
```

:::

## POST courses

Create a course

**Content** A [course](#fields)

::: code-group

```json [JSON]
{
  "title": "English Writing",
  "course_code": "E101",
  "department": "English",
  "description": "Essay Writing"
}
```

```xml [XML]
<body>
  <title>English Writing</title>
  <course_code>E101</course_code>
  <department>English</department>
  <description>Essay Writing</description>
</body>
```

:::

**Return** A [course](#fields)

::: code-group

```json [JSON]
{
  "id": 5614879,
  "title": "REST API Course",
  "course_code": "RAPI101",
  "department": "Computer Science",
  "description": "discuss REST API",
  "credits": 0,
  "subject_area": 0,
  "grade_level_range_start": 0,
  "grade_level_range_end": 0,
  "synced": 0,
  "building_id": "344232",
  "links": {
    "self": "http:\/\/...\/v1\/courses\/5614879"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5614879</id>
	<title>REST API Course</title>
	<course_code>RAPI101</course_code>
	<department>Computer Science</department>
	<description>discuss REST API</description>
	<credits>0</credits>
	<subject_area>0</subject_area>
	<grade_level_range_start>0</grade_level_range_start>
	<grade_level_range_end>0</grade_level_range_end>
	<synced>0</synced>
	<building_id>344232</building_id>
	<links>
		<self>http://.../v1/courses/5614879</self>
	</links>
</result>
```

:::

## POST courses (bulk)

Create multiple courses (up to 50) in a single API call. The following querystring parameters can be added to this endpoint:

- `update_existing`: Set this to 1 (e.g. ?update_existing=1) in order to update existing courses, matched by the `course_code` field. Without this parameter, creating a course will fail if another course already exists with the same `course_code` already.

**Content** Multiple courses can be created at a time (up to 50) by wrapping [course fields in objects](#fields) in `course` in `courses`. Sections can be also be created at the same time - combined with the `update_existing` parameter, this can be used for importing or synchronization.

::: code-group

```json [JSON]
{
  "courses": {
    "course": [
      {
        "title": "English course",
        "description": "Essay Writing",
        "course_code": "E233",
        "sections": {
          "section": [
            {
              "title": "Section 1",
              "description": "Section 1 English",
              "section_id": "27",
              "grading_periods": [13221, 2344, 1246]
            },
            {
              "title": "Section 2",
              "description": "Section 2 English",
              "section_id": "35",
              "grading_periods": [13221, 2344, 1246]
            }
          ]
        }
      },
      {
        "title": "Math course",
        "description": "Calculus",
        "course_code": "MS230",
        "sections": {
          "section": [
            {
              "title": "Section 1",
              "description": "Section 1 Math",
              "section_id": "27",
              "grading_periods": [13221, 2344, 1246]
            },
            {
              "title": "Section 2",
              "description": "Section 2 Math",
              "section_id": "35",
              "grading_periods": [13221, 2344, 1246]
            }
          ]
        }
      }
    ]
  }
}
```

```xml [XML]
<body>
  <courses>
    <course>
      <title>English course</title>
      <description>Essay Writing</description>
      <course_code>E233</course_code>
      <sections>
        <section>
          <title>Section 1</title>
          <description>Section 1 English</description>
          <section_id>27</section_id>
          <grading_periods>13221</grading_periods>
          <grading_periods>2344</grading_periods>
          <grading_periods>1246</grading_periods>
        </section>
        <section>
          <title>Section 2</title>
          <description>Section 2 English</description>
          <section_id>35</section_id>
          <grading_periods>13221</grading_periods>
          <grading_periods>2344</grading_periods>
          <grading_periods>1246</grading_periods>
        </section>
      </sections>
    </course>
    <course>
      <title>Math course</title>
      <description>Calculus</description>
      <course_code>MS230</course_code>
      <sections>
        <section>
          <title>Section 1</title>
          <description>Section 1 Math</description>
          <section_id>27</section_id>
          <grading_periods>13221</grading_periods>
          <grading_periods>2344</grading_periods>
          <grading_periods>1246</grading_periods>
        </section>
        <section>
          <title>Section 2</title>
          <description>Section 2 Math</description>
          <section_id>35</section_id>
          <grading_periods>13221</grading_periods>
          <grading_periods>2344</grading_periods>
          <grading_periods>1246</grading_periods>
        </section>
      </sections>
    </course>
  </courses>
</body>
```

:::

**Return** The API endpoint (location) of each course created, or an error message if there was a problem creating the course.

## PUT `courses/{id}`

Modify a course

**Content** A [course](#fields)

::: code-group

```json [JSON]
{
  "title": "English Writing (Advanced)",
  "description": "Creative Writing"
}
```

```xml [XML]
<body>
  <title>English Writing (Advanced)</title>
  <description>Creative Writing</description>
</body>
```

:::

## PUT courses (bulk)

Modify multiple courses

**Content** Multiple courses can be modified at a time (up to 50) by wrapping [course fields in objects](#fields) in `course` in `courses`.

::: code-group

```json [JSON]
{
  "courses": {
    "course": [
      {
        "id": "1407691",
        "title": "Time Travel 2",
        "course_code": "CC106"
      },
      {
        "id": "5614935",
        "title": "Bulk Course 4",
        "course_code": "BC101"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <courses>
    <course>
      <id>1407691</id>
      <title>Time Travel 2</title>
      <title>CC106</title>
    </course>
    <course>
      <id>5614935</id>
      <title>Bulk Course 4</title>
      <title>BC101</title>
    </course>
  </courses>
</result>
```

:::

**Return** The Schoology ID of each course updated, or an error message if there was a problem creating the course.

::: code-group

```json [JSON]
{
  "course": [
    {
      "response_code": 200,
      "id": "1407691",
      "course_code": "CC106"
    },
    {
      "response_code": 200,
      "id": "5614935",
      "course_code": "BC101"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <course>
    <response_code>200</response_code>
    <id>1407691</id>
    <course_code>CC106</course_code>
  </course>
  <course>
    <response_code>200</response_code>
    <id>5614935</id>
    <course_code>BC101</course_code>
  </course>
</result>
```

:::

## DELETE `courses/{id}`

Delete a course (cannot be undone)

## DELETE `courses/{id}` (bulk)

Delete up to 50 courses (cannot be undone). Comma-separated Schoology IDs are passed in the query string with the course_ids parameter.

## Objects and realms

<RealmObjects realm="Courses" />
