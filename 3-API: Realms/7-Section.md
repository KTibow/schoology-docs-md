# Section

Teachers and students are enrolled into course sections; each section must belong to a parent course. Assignments, documents, events, and other materials are created and associated with course sections.

## Fields

| Field                                         | Name                        | Description                                                                                                                                                                                                                      | Type                |
| --------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `id`                                          | Schoology Section ID        | The internal Schoology ID of the section                                                                                                                                                                                         | `string`            |
| `title (section_title allowed in POST/PUT)`\* | Section Title               | The section title (e.g. Section 10b).                                                                                                                                                                                            | `string`            |
| `section_code`\*                              | Section Code                | The section code must be unique across the course and grading period (e.g. "Spring 2010" can only have one "10b" for course "ENG101"). Must specify if `section_school_code` is unset.                                           | `string`            |
| `section_school_code`\*                       | Section School Code         | The section school code must be unique across the school. Must specify this or `section_code`.                                                                                                                                   | `string`            |
| `access_code`                                 | Access Code                 | The access code is created by Schoology automatically, and cannot be adjusted. If this field is blank, the course cannot be enrolled in via access code                                                                          | `string`            |
| `grading_periods`\*                           | Grading Periods             | The grading period IDs with which this course is associated.                                                                                                                                                                     | `array of integers` |
| `description`                                 | Description                 | The section description.                                                                                                                                                                                                         | `string`            |
| `profile_url`                                 | Profile picture URL         | The full URL of the section's profile picture                                                                                                                                                                                    | `string`            |
| `location`                                    | Location                    | The location of the course section.                                                                                                                                                                                              | `string`            |
| `meeting_days`                                | Meeting Days                | Days of the week that this course section meets. Each day is represented by a number (Sun is 0, Sat is 7).                                                                                                                       | `array of integers` |
| `start_time`                                  | Start Time                  | The time this section starts on the specified meeting days, from 00:00 to 23:59 (local time). Not applicable if your school uses class period blocks (i.e. sections meet at different times on different days).                  | `string (HH:mm)`    |
| `end_time`                                    | End Time                    | The time this section ends on the specified meeting days.                                                                                                                                                                        | `string (HH:mm)`    |
| `class_periods`                               | Class Periods               | The class period IDs with which this course is associated. Not applicable if your school **does not** use class period blocks (see `start_time`).                                                                                | `array of integers` |
| `options/course_format`                       | Course Format               | The course format - 1 for basic (default), 2 for topic-based (default 1)                                                                                                                                                         | `{1,2}`             |
| `options/weighted_grading_categories`         | Weighted Grading Categories | Whether grading categories for this course are weighted; otherwise, categories will be weighted evenly. (default 0)                                                                                                              | `{0,1}`             |
| `options/upload_document`                     | Upload Documents            | Whether students can upload documents to the course profile. (default 0)                                                                                                                                                         | `{0,1}`             |
| `options/create_discussion`                   | Create Discussion Topic     | Whether students can create discussion topics. (default 0)                                                                                                                                                                       | `{0,1}`             |
| `options/member_post`                         | Post to Course Feed         | Whether students can post to the course feed. (default 0)                                                                                                                                                                        | `{0,1}`             |
| `options/member_post_comment`                 | Post Course Feed Comments   | Whether students can post comments to course feed entries. (default 0)                                                                                                                                                           | `{0,1}`             |
| `synced`                                      | Sync Status                 | Whether or not this course section was synced with an external system (eg, Student Information System). The default value is 0. For synced course sections, the **Section School Code** field is not editable through Schoology. | `{0,1}`             |

\* = Required

## GET `courses/{course_id}/sections`

View a list of sections for a course (paged). The following parameters can be added to this path:

- `include_past`: Set this to 1 to include sections from expired/past grading periods.

**Return** A list of [sections](#fields).

::: code-group

```json [JSON]
{
  "section": [
    {
      "id": "4318461",
      "course_title": "Time Travel",
      "course_code": "CC106",
      "course_id": "1407691",
      "school_id": "344232",
      "access_code": "GBMWW-2QKN5",
      "section_title": "Section 9nw",
      "section_code": "",
      "section_school_code": "SI200",
      "synced": "0",
      "active": 1,
      "description": "",
      "grading_periods": [435, 13011],
      "profile_url": "http:\/\/...\/images\/course-default.gif",
      "location": "",
      "meeting_days": [""],
      "start_time": "",
      "end_time": "",
      "weight": "0",
      "options": {
        "weighted_grading_categories": "0",
        "upload_documents": "0",
        "create_discussion": "0",
        "member_post": "1",
        "member_post_comment": "1",
        "content_index_visibility": {
          "topics": 1,
          "assignments": 1,
          "assessments": 1,
          "documents": 1,
          "discussion": 1,
          "album": 1,
          "pages": 1
        }
      },
      "links": {
        "self": "http:\/\/...\/v1\/sections\/4318461"
      },
      "admin": 1
    },
    {
      "id": "3719526",
      "course_title": "Time Travel",
      "course_code": "CC106",
      "course_id": "1407691",
      "school_id": "344232",
      "access_code": "88548-D5TVT",
      "section_title": "Section 8i",
      "section_code": "SC101",
      "section_school_code": "",
      "synced": "0",
      "active": 1,
      "description": "",
      "grading_periods": [13011],
      "profile_url": "http:\/\/...\/images\/course-default.gif",
      "location": "",
      "meeting_days": [""],
      "start_time": "",
      "end_time": "",
      "weight": "0",
      "options": {
        "weighted_grading_categories": "0",
        "upload_documents": "0",
        "create_discussion": "0",
        "member_post": "1",
        "member_post_comment": "1",
        "content_index_visibility": {
          "topics": 1,
          "assignments": 1,
          "assessments": 1,
          "documents": 1,
          "discussion": 1,
          "album": 1,
          "pages": 1
        }
      },
      "links": {
        "self": "http:\/\/...\/v1\/sections\/3719526"
      },
      "admin": 1
    }
  ],
  "total": "2",
  "links": {
    "self": "http:\/\/...\/sections?start=0&limit=20"
  }
}
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <section>
    <id>4318461</id>
    <course_title>Time Travel</course_title>
    <course_code>CC106</course_code>
    <course_id>1407691</course_id>
    <school_id>344232</school_id>
    <access_code>GBMWW-2QKN5</access_code>
    <section_title>Section 9nw</section_title>
    <section_code />
    <section_school_code>SI200</section_school_code>
    <synced>0</synced>
    <active>1</active>
    <description />
    <grading_periods>435</grading_periods>
    <grading_periods>13011</grading_periods>
    <profile_url>http://.../images/course-default.gif</profile_url>
    <location />
    <meeting_days />
    <start_time />
    <end_time />
    <weight>0</weight>
    <options>
      <weighted_grading_categories>0</weighted_grading_categories>
      <upload_documents>0</upload_documents>
      <create_discussion>0</create_discussion>
      <member_post>1</member_post>
      <member_post_comment>1</member_post_comment>
      <content_index_visibility>
        <topics>1</topics>
        <assignments>1</assignments>
        <assessments>1</assessments>
        <documents>1</documents>
        <discussion>1</discussion>
        <album>1</album>
        <pages>1</pages>
      </content_index_visibility>
    </options>
    <links>
      <self>http://.../v1/sections/4318461</self>
    </links>
    <admin>1</admin>
  </section>
  <section>
    <id>3719526</id>
    <course_title>Time Travel</course_title>
    <course_code>CC106</course_code>
    <course_id>1407691</course_id>
    <school_id>344232</school_id>
    <access_code>88548-D5TVT</access_code>
    <section_title>Section 8i</section_title>
    <section_code>SC101</section_code>
    <section_school_code />
    <synced>0</synced>
    <active>1</active>
    <description />
    <grading_periods>13011</grading_periods>
    <profile_url>http://...images/course-default.gif</profile_url>
    <location />
    <meeting_days />
    <start_time />
    <end_time />
    <weight>0</weight>
    <options>
      <weighted_grading_categories>0</weighted_grading_categories>
      <upload_documents>0</upload_documents>
      <create_discussion>0</create_discussion>
      <member_post>1</member_post>
      <member_post_comment>1</member_post_comment>
      <content_index_visibility>
        <topics>1</topics>
        <assignments>1</assignments>
        <assessments>1</assessments>
        <documents>1</documents>
        <discussion>1</discussion>
        <album>1</album>
        <pages>1</pages>
      </content_index_visibility>
    </options>
    <links>
      <self>http://.../v1/sections/3719526</self>
    </links>
    <admin>1</admin>
  </section>
  <total>2</total>
  <links>
    <self>http://.../sections?start=0&amp;limit=20</self>
  </links>
</result>
```

:::

## GET `sections?section_school_codes=...`

View a list of sections by specifying a comma separated list of section school codes. The following parameters can be added to this path:

- `section_school_codes`: A comma-separated list of section school codes, up to 50 at a time.
- `include_past`: Set this to 1 to include sections from expired/past grading periods.

**Return** A list of [sections](#fields).

## GET `sections/{id}`

View a specified course section

**Return** A [section](#fields).

::: code-group

```json [JSON]
{
  "id": "4318461",
  "course_title": "Time Travel",
  "course_code": "CC106",
  "course_id": "1407691",
  "school_id": "344232",
  "access_code": "GBMWW-2QKN5",
  "section_title": "Section 9nw",
  "section_code": "",
  "section_school_code": "SI200",
  "synced": "0",
  "active": 1,
  "description": "",
  "subject_area": "0",
  "grade_level_range_start": "12",
  "grade_level_range_end": "14",
  "grading_periods": [13011, 435],
  "profile_url": "http:\/\/...\/images\/course-default.gif",
  "location": "",
  "meeting_days": [""],
  "start_time": "",
  "end_time": "",
  "weight": "0",
  "options": {
    "weighted_grading_categories": "0",
    "upload_documents": "0",
    "create_discussion": "0",
    "member_post": "1",
    "member_post_comment": "1",
    "content_index_visibility": {
      "topics": 1,
      "assignments": 1,
      "assessments": 1,
      "documents": 1,
      "discussion": 1,
      "album": 1,
      "pages": 1
    }
  },
  "admin": 1
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>4318461</id>
  <course_title>Time Travel</course_title>
  <course_code>CC106</course_code>
  <course_id>1407691</course_id>
  <school_id>344232</school_id>
  <access_code>GBMWW-2QKN5</access_code>
  <section_title>Section 9nw</section_title>
  <section_code />
  <section_school_code>SI200</section_school_code>
  <synced>0</synced>
  <active>1</active>
  <description />
  <subject_area>0</subject_area>
  <grade_level_range_start>12</grade_level_range_start>
  <grade_level_range_end>14</grade_level_range_end>
  <grading_periods>13011</grading_periods>
  <grading_periods>435</grading_periods>
  <profile_url>http://.../images/course-default.gif</profile_url>
  <location />
  <meeting_days />
  <start_time />
  <end_time />
  <weight>0</weight>
  <options>
    <weighted_grading_categories>0</weighted_grading_categories>
    <upload_documents>0</upload_documents>
    <create_discussion>0</create_discussion>
    <member_post>1</member_post>
    <member_post_comment>1</member_post_comment>
    <content_index_visibility>
      <topics>1</topics>
      <assignments>1</assignments>
      <assessments>1</assessments>
      <documents>1</documents>
      <discussion>1</discussion>
      <album>1</album>
      <pages>1</pages>
    </content_index_visibility>
  </options>
  <admin>1</admin>
</result>
```

:::

## POST `courses/{course id}/sections`

Create a course section

**Content** A [section](#fields)

::: code-group

```json [JSON]
{
  "title": "Section 1",
  "description": "Section 1 Math",
  "section_school_code": "35",
  "grading_periods": [13221, 2344, 1246]
}
```

```xml [XML]
<body>
  <title>Section 1</title>
  <description>Section 1 Math</description>
  <section_school_code>37</section_school_code>
  <grading_periods>13221</grading_periods>
  <grading_periods>2344</grading_periods>
  <grading_periods>1246</grading_periods>
</body>
```

:::

**Return** A [section](#fields)

::: code-group

```json [JSON]
{
  "id": "5614973",
  "course_id": "1407691",
  "school_id": "344232",
  "access_code": "C2BGQ-F3TCV",
  "section_title": "Section API",
  "section_code": "",
  "section_school_code": "SA1",
  "synced": null,
  "active": 1,
  "description": "discuss REST API",
  "grading_periods": [13011],
  "profile_url": "http:\/\/......\/course-default.gif",
  "location": "",
  "meeting_days": [""],
  "start_time": null,
  "end_time": null,
  "options": {
    "weighted_grading_categories": null,
    "upload_documents": null,
    "create_discussion": null,
    "member_post": null,
    "member_post_comment": null,
    "content_index_visibility": []
  },
  "links": {
    "self": "http:\/\/...\/v1\/sections\/5614973"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5614973</id>
	<course_id>1407691</course_id>
	<school_id>344232</school_id>
	<access_code>C2BGQ-F3TCV</access_code>
	<section_title>Section API</section_title>
	<section_code />
	<section_school_code>SA1</section_school_code>
	<synced />
	<active>1</active>
	<description>discuss REST API</description>
	<grading_periods>13011</grading_periods>
	<profile_url>http://......course-default.gif</profile_url>
	<location />
	<meeting_days />
	<start_time />
	<end_time />
	<options>
		<weighted_grading_categories />
		<upload_documents />
		<create_discussion />
		<member_post />
		<member_post_comment />
		<content_index_visibility />
	</options>
	<links>
		<self>http://.../v1/sections/5614973</self>
	</links>
</result>
```

:::

## POST `courses/{course id}/sections` (bulk)

Create multiple sections at a time. The following parameters can be added to this endpoint:

- `update_existing`: Set this to 1 (e.g. ?update_existing=1) in order update existing sections, matched by the `section_code` and `grading_periods` fields. Without this parameter, creation will fail if a pre-existing section has the same `section_code` for the given `grading_periods` as a passed section object.

**Content** Multiple sections can be created at a time (up to 50) by wrapping [section fields in objects](#fields) in `section` in `sections`.

::: code-group

```json [JSON]
{
  "sections": {
    "section": [
      {
        "title": "Section 1",
        "description": "Section 1 Math",
        "section_school_code": "35",
        "grading_periods": [13221, 2344, 1246]
      },
      {
        "title": "Section 2",
        "description": "Section 2 Math",
        "section_school_code": "37",
        "grading_periods": [13221, 2344, 1246]
      }
    ]
  }
}
```

```xml [XML]
<body>
  <sections>
    <section>
      <title>Section 1</title>
      <description>Section 1 Math</description>
      <section_school_code>35</section_school_code>
      <grading_periods>13221</grading_periods>
      <grading_periods>2344</grading_periods>
      <grading_periods>1246</grading_periods>
    </section>
    <section>
      <title>Section 2</title>
      <description>Section 2 Math</description>
      <section_school_code>37</section_school_code>
      <grading_periods>13221</grading_periods>
      <grading_periods>2344</grading_periods>
      <grading_periods>1246</grading_periods>
    </section>
  </sections>
</body>
```

:::

**Return** The API endpoint (location) of each section created, or an error message if there was a problem creating the section.

::: code-group

```json [JSON]
{
  "section": [
    {
      "response_code": 200,
      "id": "5614975",
      "location": "http:\/\/...\/v1\/sections\/5614975",
      "section_code": "",
      "section_school_code": "SA4",
      "synced": null,
      "grading_periods": [13011]
    },
    {
      "response_code": 200,
      "id": "5614977",
      "location": "http:\/\/...\/v1\/sections\/5614977",
      "section_code": "",
      "section_school_code": "SA5",
      "synced": null,
      "grading_periods": [13011]
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <section>
    <response_code>200</response_code>
    <id>5614975</id>
    <location>http://.../v1/sections/5614975</location>
    <section_code />
    <section_school_code>SA4</section_school_code>
    <synced />
    <grading_periods>13011</grading_periods>
  </section>
  <section>
    <response_code>200</response_code>
    <id>5614977</id>
    <location>http://.../v1/sections/5614977</location>
    <section_code />
    <section_school_code>SA5</section_school_code>
    <synced />
    <grading_periods>13011</grading_periods>
  </section>
</result>
```

:::

## POST sections/copy

Schedule the copy of existing sections and their content into new or existing sections as an asynchronous background job

**Optional Query Parameters**

- `enroll_user`: Set this to 1 (e.g.?enroll_user=1) in order enroll the user making the API call into the newly copied section

**Content**: fields

- `source_section_id` or `source_section_school_code` - the identifier of the section getting copied - required
- `section_id` or `section_school_code` or `section_code` - required
  - if section_id is provided then we assume section exists - check permissions, make sure section has no content, and then just copy content to existing section
  - if section_school_code is provided then check if section_school_code exists.
    - If exists, check if section is empty and then copy contents to existing section.
    - If does not exist then create new section and then copy contents to new section.

  - If section_code is provided then try and create new section

- `course_id` or `course_code` - the identifier of the parent course that the copied section will live in - required
- `title` - the title of the new section - required
- `grading_periods` - the grading_periods the new section with span - required
- `description` - the description of the new section - optional
- `synced` - If set to 1 course section fields (section_school_code, grading_periods) will not be editable. If not set, `synced` will be inherited from source section - optional

::: code-group

```json [JSON]
{
  "sections": {
    "section": [
      {
        "source_section_id": 123456,
        "title": "Section 2A",
        "description": "Science Section 2A",
        "section_school_code": "SCI2A",
        "course_id": 5432751,
        "course_id": 1,
        "grading_periods": [175, 212]
      },
      {
        "source_section_school_code": "MASTERSCIENCE",
        "title": "Section 3A",
        "description": "Science Section 3A",
        "section_school_code": "SCI3A",
        "course_code": "SCIFULL",
        "grading_periods": [175, 212]
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<sections>
		<section>
			<source_section_id>123456</source_section_id>
			<title>Section 2A</title>
			<description>Science Section 2A</description>
			<section_school_code>SCI2A</section_school_code>
			<course_id>5432751</course_id>
                        <synced>1</synced>
			<grading_periods>175</grading_periods>
			<grading_periods>212</grading_periods>
		</section>
		<section>
			<source_section_school_code>MASTERSCIENCE</source_section_school_code>
			<title>Section 3A</title>
			<description>Science Section 3A</description>
			<section_school_code>SCI3A</section_school_code>
			<course_code>SCIFULL</course_code>
			<grading_periods>175</grading_periods>
			<grading_periods>212</grading_periods>
		</section>
	</sections>
</result>
```

:::

**Return**

::: code-group

```json [JSON]
{
  "section": [
    {
      "section_school_code": "SCI2A",
      "grading_periods": [175, 212],
      "title": "Section 2A",
      "transfer_url": "https:\/\/schoology.com\/settings\/transfers",
      "response_code": 200,
      "description": "Science Section 2A"
    },
    {
      "section_school_code": "3A",
      "grading_periods": [175, 212],
      "title": "Section 3A",
      "transfer_url": "https:\/\/schoology.com\/settings\/transfers",
      "response_code": 200,
      "description": "Science Section 3A"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<section>
		<section_school_code>SCI2A</section_school_code>
		<grading_periods>175</grading_periods>
		<grading_periods>212</grading_periods>
		<title>Section 2A</title>
		<transfer_url>https://schoology.com/settings/transfers</transfer_url>
		<response_code>200</response_code>
		<description>Science Section 2A</description>
	</section>
	<section>
		<section_school_code>3A</section_school_code>
		<grading_periods>175</grading_periods>
		<grading_periods>212</grading_periods>
		<title>Section 3A</title>
		<transfer_url>https://schoology.com/settings/transfers</transfer_url>
		<response_code>200</response_code>
		<description>Science Section 3A</description>
	</section>
</result>
```

:::

## PUT `sections/{id}`

Modify a course

**Content** A [section](#fields)

::: code-group

```json [JSON]
{
  "title": "Updated Section 1 title",
  "section_school_code": "35",
  "synced": "1"
}
```

```xml [XML]
<body>
  <title>Updated Section 1 title</title>
  <section_school_code>37</section_school_code>
  <synced>1</synced>
</body>
```

:::

## PUT sections (bulk)

Modify multiple sections

**Content** Up to 50 sections can be updated at a time by wrapping [section fields in objects](#fields) in `section` in `sections`.

::: code-group

```json [JSON]
{
  "sections": {
    "section": [
      {
        "id": 123456,
        "title": "Updated Section 1 title",
        "section_school_code": "35",
        "synced": "1"
      },
      {
        "id": 123457,
        "title": "Updated Section 2 title",
        "section_school_code": "37",
        "synced": "1"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <sections>
    <section>
      <id>123456</id>
      <title>Updated Section 1 title</title>
      <section_school_code>35</section_school_code>
      <synced>1</synced>
    </section>
    <section>
      <id>123457</id>
      <title>Updated Section 2 title</title>
      <section_school_code>37</section_school_code>
      <synced>1</synced>
    </section>
  </sections>
</body>
```

:::

**Return** The schoology ID of each section updated, or an error message if there was a problem creating the section.

::: code-group

```json [JSON]
{
  "section": [
    {
      "response_code": 200,
      "id": "3719526",
      "location": "http:\/\/...\/v1\/sections\/3719526",
      "section_code": "",
      "section_school_code": "SC111",
      "synced": "0",
      "grading_periods": [13011]
    },
    {
      "response_code": 200,
      "id": "4318461",
      "location": "http:\/\/...\/v1\/sections\/4318461",
      "section_code": "",
      "section_school_code": "SI200",
      "synced": "0",
      "grading_periods": [13011, 435]
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <section>
    <response_code>200</response_code>
    <id>3719526</id>
    <location>http://.../v1/sections/3719526</location>
    <section_code />
    <section_school_code>SC111</section_school_code>
    <synced>0</synced>
    <grading_periods>13011</grading_periods>
  </section>
  <section>
    <response_code>200</response_code>
    <id>4318461</id>
    <location>http://.../v1/sections/4318461</location>
    <section_code />
    <section_school_code>SI200</section_school_code>
    <synced>0</synced>
    <grading_periods>13011</grading_periods>
    <grading_periods>435</grading_periods>
  </section>
</result>
```

:::

## DELETE `sections/{id}`

Delete a course (cannot be undone)

## DELETE sections (bulk)

Delete up to 50 sections. Comma-separated Schoology IDs are passed in the query string with the `section_ids` parameter.

## Objects in Sections

<RealmObjects realm="Sections" />
