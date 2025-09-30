# Reminders

Reminders are user notifications reminding them to complete an action for a given realm. The API supports viewing realm-specific reminders that mirror the functionality of the reminder widget on the web. Supported reminder types include `ungraded` (a reminder for course section admins that lists assignments and corresponding revisions that have not yet been graded) and `resubmitted` (a reminder for course section admins that lists assignments and corresponding revisions that have not yet been viewed).

> [!IMPORTANT]
> Reminders exist in sections.

## Fields

| Field                | Name               | Description                                                                             | Type      |
| -------------------- | ------------------ | --------------------------------------------------------------------------------------- | --------- |
| `type`               | Type               | Type of reminder; one of the supported reminder types: `ungraded`, `resubmitted`.       | `string`  |
| `count`              | Count              | The number of reminders.                                                                | `integer` |
| `assignments`        | Assignments        | List of assignment objects that have relevant revisions (see assignment fields below).  | `array`   |
| `id`                 | ID                 | The assignment ID.                                                                      | `integer` |
| `title`              | Title              | Assignment title.                                                                       | `string`  |
| `description`        | Description        | Assignment description.                                                                 | `string`  |
| `due`                | Due                | Assignment due date/time (may be empty).                                                | `string`  |
| `grading_scale`      | Grading scale      | ID of grading scale.                                                                    | `string`  |
| `grading_period`     | Grading period     | ID of grading period.                                                                   | `string`  |
| `grading_category`   | Grading category   | ID of grading category.                                                                 | `string`  |
| `max_points`         | Max points         | Maximum points for the assignment.                                                      | `string`  |
| `factor`             | Factor             | Grade factor.                                                                           | `string`  |
| `is_final`           | Is final           | Whether the grade is final.                                                             | `string`  |
| `show_comments`      | Show comments      | Whether comments are shown.                                                             | `string`  |
| `grade_stats`        | Grade stats        | Whether grade stats are shown.                                                          | `string`  |
| `allow_dropbox`      | Allow dropbox      | Whether dropbox is allowed.                                                             | `string`  |
| `allow_discussion`   | Allow discussion   | Whether discussion is allowed.                                                          | `string`  |
| `published`          | Published          | Whether the assignment is published.                                                    | `integer` |
| `type`               | Type               | The content type (e.g., `assignment`).                                                  | `string`  |
| `grade_item_id`      | Grade item ID      | Grade item identifier.                                                                  | `integer` |
| `available`          | Available          | Whether assignment is available.                                                        | `integer` |
| `completed`          | Completed          | Whether assignment is completed.                                                        | `integer` |
| `dropbox_locked`     | Dropbox locked     | Whether dropbox is locked.                                                              | `integer` |
| `grading_scale_type` | Grading scale type | Grading scale type.                                                                     | `integer` |
| `show_rubric`        | Show rubric        | Whether rubric is shown.                                                                | `boolean` |
| `num_assignees`      | Num assignees      | Number of assignees.                                                                    | `integer` |
| `assignees`          | Assignees          | List of assignee objects (may be empty).                                                | `array`   |
| `section_id`         | Section ID         | ID of the section this assignment belongs to.                                           | `string`  |
| `revisions`          | Revisions          | List of student revision objects related to the assignment (see revision fields below). | `array`   |
| `revision_id`        | Revision ID        | The revision identifier.                                                                | `integer` |
| `uid`                | User ID            | ID of the user who submitted the revision.                                              | `integer` |
| `created`            | Created            | Unix timestamp when the revision was created.                                           | `integer` |
| `num_items`          | Num items          | Number of items in the revision.                                                        | `integer` |
| `late`               | Late               | Whether the submission was late.                                                        | `integer` |
| `draft`              | Draft              | Whether the revision is a draft.                                                        | `integer` |

\* = Required

## GET `reminders/{type}`

View a list of reminders across all realms for a specific type.

Parameters: `with_attachments` — retrieve attachments for this piece of content.

**Return** A list of reminders (see Fields)

::: code-group

```json [JSON]
{
  "reminders": [
    {
      "type": "ungraded",
      "count": 3,
      "assignments": [
        {
          "id": 5818701,
          "title": "Assignment 1",
          "description": "Please use the attached document to complete the assignment",
          "due": "",
          "grading_scale": "0",
          "grading_period": "25097",
          "grading_category": "4445",
          "max_points": "100",
          "factor": "1",
          "is_final": "0",
          "show_comments": "0",
          "grade_stats": "0",
          "allow_dropbox": "1",
          "allow_discussion": "1",
          "published": 1,
          "type": "assignment",
          "grade_item_id": 5818701,
          "available": 1,
          "completed": 0,
          "dropbox_locked": 0,
          "grading_scale_type": 0,
          "show_rubric": false,
          "num_assignees": 0,
          "assignees": [],
          "section_id": "5818697",
          "revisions": [
            {
              "revision_id": 8,
              "uid": 248071,
              "created": 1409094487,
              "num_items": 1,
              "late": 1,
              "draft": 0
            }
          ]
        },
        {
          "id": 9274619,
          "title": "Health Choices",
          "description": "",
          "due": "",
          "grading_scale": "0",
          "grading_period": "31217",
          "grading_category": "7813",
          "max_points": "100",
          "factor": "1",
          "is_final": "0",
          "show_comments": "0",
          "grade_stats": "0",
          "allow_dropbox": "1",
          "allow_discussion": "1",
          "published": 1,
          "type": "assignment",
          "grade_item_id": 9274619,
          "available": 1,
          "completed": 0,
          "dropbox_locked": 0,
          "grading_scale_type": 0,
          "show_rubric": false,
          "num_assignees": 0,
          "assignees": [],
          "section_id": "8495243",
          "revisions": [
            {
              "revision_id": 15,
              "uid": 81562,
              "created": 1411075065,
              "num_items": 1,
              "late": 0,
              "draft": 0
            },
            {
              "revision_id": 6,
              "uid": 2441585,
              "created": 1410805384,
              "num_items": 1,
              "late": 0,
              "draft": 0
            }
          ]
        }
      ]
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<reminders>
		<type>ungraded</type>
		<count>3</count>
		<assignments>
			<id>5818701</id>
			<title>Assignment 1</title>
			<description>Please use the attached document to complete the assignment</description>
			<due />
			<grading_scale>0</grading_scale>
			<grading_period>25097</grading_period>
			<grading_category>4445</grading_category>
			<max_points>100</max_points>
			<factor>1</factor>
			<is_final>0</is_final>
			<show_comments>0</show_comments>
			<grade_stats>0</grade_stats>
			<allow_dropbox>1</allow_dropbox>
			<allow_discussion>1</allow_discussion>
			<published>1</published>
			<type>assignment</type>
			<grade_item_id>5818701</grade_item_id>
			<available>1</available>
			<completed>0</completed>
			<dropbox_locked>0</dropbox_locked>
			<grading_scale_type>0</grading_scale_type>
			<show_rubric></show_rubric>
			<num_assignees>0</num_assignees>
			<assignees />
			<section_id>5818697</section_id>
			<revisions>
				<revision_id>8</revision_id>
				<uid>248071</uid>
				<created>1409094487</created>
				<num_items>1</num_items>
				<late>1</late>
				<draft>0</draft>
			</revisions>
		</assignments>
		<assignments>
			<id>9274619</id>
			<title>Health Choices</title>
			<description />
			<due />
			<grading_scale>0</grading_scale>
			<grading_period>31217</grading_period>
			<grading_category>7813</grading_category>
			<max_points>100</max_points>
			<factor>1</factor>
			<is_final>0</is_final>
			<show_comments>0</show_comments>
			<grade_stats>0</grade_stats>
			<allow_dropbox>1</allow_dropbox>
			<allow_discussion>1</allow_discussion>
			<published>1</published>
			<type>assignment</type>
			<grade_item_id>9274619</grade_item_id>
			<available>1</available>
			<completed>0</completed>
			<dropbox_locked>0</dropbox_locked>
			<grading_scale_type>0</grading_scale_type>
			<show_rubric></show_rubric>
			<num_assignees>0</num_assignees>
			<assignees />
			<section_id>8495243</section_id>
			<revisions>
				<revision_id>15</revision_id>
				<uid>81562</uid>
				<created>1411075065</created>
				<num_items>1</num_items>
				<late>0</late>
				<draft>0</draft>
			</revisions>
			<revisions>
				<revision_id>6</revision_id>
				<uid>2441585</uid>
				<created>1410805384</created>
				<num_items>1</num_items>
				<late>0</late>
				<draft>0</draft>
			</revisions>
		</assignments>
	</reminders>
</result>
```

:::

## GET `{realm}/reminders/{type}`

View a list of reminders for a specific realm for a specific type.

Parameters: `with_attachments` — retrieve attachments for this piece of content.

**Return** A list of reminders (see Fields)

::: code-group

```json [JSON]
{
  "reminders": [
    {
      "type": "resubmitted",
      "count": 1,
      "assignments": [
        {
          "id": 9274619,
          "title": "Assignment 3",
          "description": "",
          "due": "",
          "grading_scale": "0",
          "grading_period": "31217",
          "grading_category": "7813",
          "max_points": "100",
          "factor": "1",
          "is_final": "0",
          "show_comments": "0",
          "grade_stats": "0",
          "allow_dropbox": "1",
          "allow_discussion": "1",
          "published": 1,
          "type": "assignment",
          "grade_item_id": 9274619,
          "available": 1,
          "completed": 0,
          "dropbox_locked": 0,
          "grading_scale_type": 0,
          "show_rubric": false,
          "num_assignees": 0,
          "assignees": [],
          "section_id": "8495243",
          "revisions": [
            {
              "revision_id": 15,
              "uid": 81562,
              "created": 1411075065,
              "num_items": 1,
              "late": 0,
              "draft": 0
            }
          ]
        }
      ]
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<reminders>
		<type>resubmitted</type>
		<count>1</count>
		<assignments>
			<id>9274619</id>
			<title>Assignment 3</title>
			<description />
			<due />
			<grading_scale>0</grading_scale>
			<grading_period>31217</grading_period>
			<grading_category>7813</grading_category>
			<max_points>100</max_points>
			<factor>1</factor>
			<is_final>0</is_final>
			<show_comments>0</show_comments>
			<grade_stats>0</grade_stats>
			<allow_dropbox>1</allow_dropbox>
			<allow_discussion>1</allow_discussion>
			<published>1</published>
			<type>assignment</type>
			<grade_item_id>9274619</grade_item_id>
			<available>1</available>
			<completed>0</completed>
			<dropbox_locked>0</dropbox_locked>
			<grading_scale_type>0</grading_scale_type>
			<show_rubric></show_rubric>
			<num_assignees>0</num_assignees>
			<assignees />
			<section_id>8495243</section_id>
			<revisions>
				<revision_id>15</revision_id>
				<uid>81562</uid>
				<created>1411075065</created>
				<num_items>1</num_items>
				<late>0</late>
				<draft>0</draft>
			</revisions>
		</assignments>
	</reminders>
</result>
```

:::
