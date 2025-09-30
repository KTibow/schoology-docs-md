# Grading Rubrics

Grading rubrics allow you to grade assignments and discussions using a standard of performance for your students.

> [!IMPORTANT]
> Grading rubrics exist in sections.

## Fields

| Field | Name | Description | Type |
|---|---|---|---|
| `id` | ID | The ID of the grading rubric | `integer` |
| `created` | Created | The created timestamp of the grading rubric | `string` |
| `title` | Title | The title of the grading rubric | `string` |
| `total_points` | Total points | The total points of the grading rubric | `integer` |
| `realm` | Realm | The Schoology realm of the grading rubric (section) | `string` |
| `realm_id` | Realm id | The Schoology realm id of the grading rubric (section id) | `integer` |
| `criteria` | Criteria | A list of rubric criteria objects (see below) | `array` |
| `id` | Criteria id | The ID of the grading rubric criteria | `integer` |
| `title` | Criteria title | The title of the grading rubric criteria | `string` |
| `description` | Criteria description | The description of the grading rubric criteria | `string` |
| `max_points` | Criteria max points | The maximum points of the grading rubric criteria | `integer` |
| `weight` | Criteria weight | The weight of the grading rubric criteria | `integer` |
| `ratings` | Ratings | A list of criteria rating objects (see below) | `array` |
| `points` | Rating points | The point value of the criteria rating | `integer` |
| `description` | Rating description | The description of the criteria rating | `string` |

## GET `sections/{section id}/grading_rubrics`

List all grading rubrics in a course section

**Return** A list of [grading rubric objects](#fields)

::: code-group

```json [JSON]
{
  "grading_rubric": [
    {
      "id": 405,
      "created": 1420642460,
      "title": "PowerPoint Presentation",
      "total_points": 20,
      "realm": "section",
      "realm_id": 709161,
      "criteria": [
        {
          "id": 249,
          "title": "Research and Note Taking",
          "description": "Student should have done ample research into their chose topic.",
          "max_points": 4,
          "weight": 1,
          "ratings": [
            {
              "points": 4,
              "description": "Excellent"
            },
            {
              "points": 3,
              "description": "Good"
            },
            {
              "points": 2,
              "description": "Satisfactory"
            },
            {
              "points": 1,
              "description": "Needs Improvement"
            }
          ]
        },
        {
          "id": 251,
          "title": "Pre Production Planning",
          "description": "A strong outline must be accompanied by the presentation",
          "max_points": 4,
          "weight": 2,
          "ratings": [
            {
              "points": 4,
              "description": "Excellent"
            },
            {
              "points": 3,
              "description": "Good"
            },
            {
              "points": 2,
              "description": "Satisfactory"
            },
            {
              "points": 1,
              "description": "Needs Improvement"
            }
          ]
        },
        {
          "id": 253,
          "title": "Content",
          "description": "Content should be clear, concise, logical, and accurate",
          "max_points": 4,
          "weight": 3,
          "ratings": [
            {
              "points": 4,
              "description": "Excellent"
            },
            {
              "points": 3,
              "description": "Good"
            },
            {
              "points": 2,
              "description": "Satisfactory"
            },
            {
              "points": 1,
              "description": "Needs Improvement"
            }
          ]
        },
        {
          "id": 255,
          "title": "Layout",
          "description": "Slides must be clean and easy to understand",
          "max_points": 4,
          "weight": 4,
          "ratings": [
            {
              "points": 4,
              "description": "Excellent"
            },
            {
              "points": 3,
              "description": "Good"
            },
            {
              "points": 2,
              "description": "Satisfactory"
            },
            {
              "points": 1,
              "description": "Needs Improvement"
            }
          ]
        },
        {
          "id": 257,
          "title": "Graphics",
          "description": "Any media on slides should be appropriate to the content",
          "max_points": 4,
          "weight": 5,
          "ratings": [
            {
              "points": 4,
              "description": "Excellent"
            },
            {
              "points": 3,
              "description": "Good"
            },
            {
              "points": 2,
              "description": "Satisfactory"
            },
            {
              "points": 1,
              "description": "Needs Improvement"
            }
          ]
        }
      ]
    },
    {
      "id": 407,
      "created": 1420642644,
      "title": "Oral Presentation",
      "total_points": 12,
      "realm": "section",
      "realm_id": 709161,
      "criteria": [
        {
          "id": 259,
          "title": "Delivery",
          "description": "Presenter doesn’t rush, shows\nenthusiasm, avoids likes, ums, kind ofs, you\nknows, etc. Uses complete sentences.",
          "max_points": 3,
          "weight": 1,
          "ratings": [
            {
              "points": 3,
              "description": "All elements present"
            },
            {
              "points": 2,
              "description": "Most elements\npresent"
            },
            {
              "points": 1,
              "description": "Some elements\npresent"
            },
            {
              "points": 0,
              "description": "No elements\npresent"
            }
          ]
        },
        {
          "id": 261,
          "title": "Eye Contact",
          "description": "Presenter keeps head up,\ndoes not read, and speaks to whole audience.",
          "max_points": 3,
          "weight": 2,
          "ratings": [
            {
              "points": 3,
              "description": "All elements present"
            },
            {
              "points": 2,
              "description": "Most elements\npresent"
            },
            {
              "points": 1,
              "description": "Some elements\npresent"
            },
            {
              "points": 0,
              "description": "No elements\npresent"
            }
          ]
        },
        {
          "id": 263,
          "title": "Posture",
          "description": "Presenter stands up straight, faces\naudience, and doesn’t fidget.",
          "max_points": 3,
          "weight": 3,
          "ratings": [
            {
              "points": 3,
              "description": "All elements present"
            },
            {
              "points": 2,
              "description": "Most elements\npresent"
            },
            {
              "points": 1,
              "description": "Some elements\npresent"
            },
            {
              "points": 0,
              "description": "No elements\npresent"
            }
          ]
        },
        {
          "id": 265,
          "title": "Volume",
          "description": "Presenter can be easily heard by\nall. No gum, etc.",
          "max_points": 3,
          "weight": 4,
          "ratings": [
            {
              "points": 3,
              "description": "All elements present"
            },
            {
              "points": 2,
              "description": "Most elements\npresent"
            },
            {
              "points": 1,
              "description": "Some elements\npresent"
            },
            {
              "points": 0,
              "description": "No elements\npresent"
            }
          ]
        }
      ]
    }
  ],
  "total": 2
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<grading_rubric>
		<id>405</id>
		<created>1420642460</created>
		<title>PowerPoint Presentation</title>
		<total_points>20</total_points>
		<realm>section</realm>
		<realm_id>709161</realm_id>
		<criteria>
			<id>249</id>
			<title>Research and Note Taking</title>
			<description>Student should have done ample research into their chose topic.</description>
			<max_points>4</max_points>
			<weight>1</weight>
			<ratings>
				<points>4</points>
				<description>Excellent</description>
			</ratings>
			<ratings>
				<points>3</points>
				<description>Good</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Satisfactory</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Needs Improvement</description>
			</ratings>
		</criteria>
		<criteria>
			<id>251</id>
			<title>Pre Production Planning</title>
			<description>A strong outline must be accompanied by the presentation</description>
			<max_points>4</max_points>
			<weight>2</weight>
			<ratings>
				<points>4</points>
				<description>Excellent</description>
			</ratings>
			<ratings>
				<points>3</points>
				<description>Good</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Satisfactory</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Needs Improvement</description>
			</ratings>
		</criteria>
		<criteria>
			<id>253</id>
			<title>Content</title>
			<description>Content should be clear, concise, logical, and accurate</description>
			<max_points>4</max_points>
			<weight>3</weight>
			<ratings>
				<points>4</points>
				<description>Excellent</description>
			</ratings>
			<ratings>
				<points>3</points>
				<description>Good</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Satisfactory</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Needs Improvement</description>
			</ratings>
		</criteria>
		<criteria>
			<id>255</id>
			<title>Layout</title>
			<description>Slides must be clean and easy to understand</description>
			<max_points>4</max_points>
			<weight>4</weight>
			<ratings>
				<points>4</points>
				<description>Excellent</description>
			</ratings>
			<ratings>
				<points>3</points>
				<description>Good</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Satisfactory</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Needs Improvement</description>
			</ratings>
		</criteria>
		<criteria>
			<id>257</id>
			<title>Graphics</title>
			<description>Any media on slides should be appropriate to the content</description>
			<max_points>4</max_points>
			<weight>5</weight>
			<ratings>
				<points>4</points>
				<description>Excellent</description>
			</ratings>
			<ratings>
				<points>3</points>
				<description>Good</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Satisfactory</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Needs Improvement</description>
			</ratings>
		</criteria>
	</grading_rubric>
	<grading_rubric>
		<id>407</id>
		<created>1420642644</created>
		<title>Oral Presentation</title>
		<total_points>12</total_points>
		<realm>section</realm>
		<realm_id>709161</realm_id>
		<criteria>
			<id>259</id>
			<title>Delivery</title>
			<description>Presenter doesn’t rush, shows
enthusiasm, avoids likes, ums, kind ofs, you
knows, etc. Uses complete sentences.</description>
			<max_points>3</max_points>
			<weight>1</weight>
			<ratings>
				<points>3</points>
				<description>All elements present</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Most elements
present</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Some elements
present</description>
			</ratings>
			<ratings>
				<points>0</points>
				<description>No elements
present</description>
			</ratings>
		</criteria>
		<criteria>
			<id>261</id>
			<title>Eye Contact</title>
			<description>Presenter keeps head up,
does not read, and speaks to whole audience.</description>
			<max_points>3</max_points>
			<weight>2</weight>
			<ratings>
				<points>3</points>
				<description>All elements present</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Most elements
present</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Some elements
present</description>
			</ratings>
			<ratings>
				<points>0</points>
				<description>No elements
present</description>
			</ratings>
		</criteria>
		<criteria>
			<id>263</id>
			<title>Posture</title>
			<description>Presenter stands up straight, faces
audience, and doesn’t fidget.</description>
			<max_points>3</max_points>
			<weight>3</weight>
			<ratings>
				<points>3</points>
				<description>All elements present</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Most elements
present</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Some elements
present</description>
			</ratings>
			<ratings>
				<points>0</points>
				<description>No elements
present</description>
			</ratings>
		</criteria>
		<criteria>
			<id>265</id>
			<title>Volume</title>
			<description>Presenter can be easily heard by
all. No gum, etc.</description>
			<max_points>3</max_points>
			<weight>4</weight>
			<ratings>
				<points>3</points>
				<description>All elements present</description>
			</ratings>
			<ratings>
				<points>2</points>
				<description>Most elements
present</description>
			</ratings>
			<ratings>
				<points>1</points>
				<description>Some elements
present</description>
			</ratings>
			<ratings>
				<points>0</points>
				<description>No elements
present</description>
			</ratings>
		</criteria>
	</grading_rubric>
	<total>2</total>
</result>
```

:::

## GET `sections/{section id}/grading_rubrics/{grading rubric id}`

View a grading rubric in a course section

**Return** A [grading rubric object](#fields)

::: code-group

```json [JSON]
{
  "id": 405,
  "created": 1420642460,
  "title": "PowerPoint Presentation",
  "total_points": 20,
  "realm": "section",
  "realm_id": 709161,
  "criteria": [
    {
      "id": 249,
      "title": "Research and Note Taking",
      "description": "Student should have done ample research into their chose topic.",
      "max_points": 4,
      "weight": 1,
      "ratings": [
        {
          "points": 4,
          "description": "Excellent"
        },
        {
          "points": 3,
          "description": "Good"
        },
        {
          "points": 2,
          "description": "Satisfactory"
        },
        {
          "points": 1,
          "description": "Needs Improvement"
        }
      ]
    },
    {
      "id": 251,
      "title": "Pre Production Planning",
      "description": "A strong outline must be accompanied by the presentation",
      "max_points": 4,
      "weight": 2,
      "ratings": [
        {
          "points": 4,
          "description": "Excellent"
        },
        {
          "points": 3,
          "description": "Good"
        },
        {
          "points": 2,
          "description": "Satisfactory"
        },
        {
          "points": 1,
          "description": "Needs Improvement"
        }
      ]
    },
    {
      "id": 253,
      "title": "Content",
      "description": "Content should be clear, concise, logical, and accurate",
      "max_points": 4,
      "weight": 3,
      "ratings": [
        {
          "points": 4,
          "description": "Excellent"
        },
        {
          "points": 3,
          "description": "Good"
        },
        {
          "points": 2,
          "description": "Satisfactory"
        },
        {
          "points": 1,
          "description": "Needs Improvement"
        }
      ]
    },
    {
      "id": 255,
      "title": "Layout",
      "description": "Slides must be clean and easy to understand",
      "max_points": 4,
      "weight": 4,
      "ratings": [
        {
          "points": 4,
          "description": "Excellent"
        },
        {
          "points": 3,
          "description": "Good"
        },
        {
          "points": 2,
          "description": "Satisfactory"
        },
        {
          "points": 1,
          "description": "Needs Improvement"
        }
      ]
    },
    {
      "id": 257,
      "title": "Graphics",
      "description": "Any media on slides should be appropriate to the content",
      "max_points": 4,
      "weight": 5,
      "ratings": [
        {
          "points": 4,
          "description": "Excellent"
        },
        {
          "points": 3,
          "description": "Good"
        },
        {
          "points": 2,
          "description": "Satisfactory"
        },
        {
          "points": 1,
          "description": "Needs Improvement"
        }
      ]
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>405</id>
	<created>1420642460</created>
	<title>PowerPoint Presentation</title>
	<total_points>20</total_points>
	<realm>section</realm>
	<realm_id>709161</realm_id>
	<criteria>
		<id>249</id>
		<title>Research and Note Taking</title>
		<description>Student should have done ample research into their chose topic.</description>
		<max_points>4</max_points>
		<weight>1</weight>
		<ratings>
			<points>4</points>
			<description>Excellent</description>
		</ratings>
		<ratings>
			<points>3</points>
			<description>Good</description>
		</ratings>
		<ratings>
			<points>2</points>
			<description>Satisfactory</description>
		</ratings>
		<ratings>
			<points>1</points>
			<description>Needs Improvement</description>
		</ratings>
	</criteria>
	<criteria>
		<id>251</id>
		<title>Pre Production Planning</title>
		<description>A strong outline must be accompanied by the presentation</description>
		<max_points>4</max_points>
		<weight>2</weight>
		<ratings>
			<points>4</points>
			<description>Excellent</description>
		</ratings>
		<ratings>
			<points>3</points>
			<description>Good</description>
		</ratings>
		<ratings>
			<points>2</points>
			<description>Satisfactory</description>
		</ratings>
		<ratings>
			<points>1</points>
			<description>Needs Improvement</description>
		</ratings>
	</criteria>
	<criteria>
		<id>253</id>
		<title>Content</title>
		<description>Content should be clear, concise, logical, and accurate</description>
		<max_points>4</max_points>
		<weight>3</weight>
		<ratings>
			<points>4</points>
			<description>Excellent</description>
		</ratings>
		<ratings>
			<points>3</points>
			<description>Good</description>
		</ratings>
		<ratings>
			<points>2</points>
			<description>Satisfactory</description>
		</ratings>
		<ratings>
			<points>1</points>
			<description>Needs Improvement</description>
		</ratings>
	</criteria>
	<criteria>
		<id>255</id>
		<title>Layout</title>
		<description>Slides must be clean and easy to understand</description>
		<max_points>4</max_points>
		<weight>4</weight>
		<ratings>
			<points>4</points>
			<description>Excellent</description>
		</ratings>
		<ratings>
			<points>3</points>
			<description>Good</description>
		</ratings>
		<ratings>
			<points>2</points>
			<description>Satisfactory</description>
		</ratings>
		<ratings>
			<points>1</points>
			<description>Needs Improvement</description>
		</ratings>
	</criteria>
	<criteria>
		<id>257</id>
		<title>Graphics</title>
		<description>Any media on slides should be appropriate to the content</description>
		<max_points>4</max_points>
		<weight>5</weight>
		<ratings>
			<points>4</points>
			<description>Excellent</description>
		</ratings>
		<ratings>
			<points>3</points>
			<description>Good</description>
		</ratings>
		<ratings>
			<points>2</points>
			<description>Satisfactory</description>
		</ratings>
		<ratings>
			<points>1</points>
			<description>Needs Improvement</description>
		</ratings>
	</criteria>
</result>
```

:::
