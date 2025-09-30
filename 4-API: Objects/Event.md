# Event

Events can be created for users, courses, groups, schools, or districts; all events automatically feed into the "upcoming" and "calendar" portions of the site. Assignment-related events can be viewed but cannot be modified directly.

> [!IMPORTANT]
> Events exist in districts, schools, users, groups, and sections.

## Fields

| Field              | Name               | Description                                                                                                                   | Type                                |
| ------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `id`\*             | Schoology Event ID | The internal Schoology ID of the event. Present on returned objects.                                                          | `string`                            |
| `title`\*          | Title              | The event title.                                                                                                              | `string`                            |
| `description`      | Description        | The event description.                                                                                                        | `string`                            |
| `start`\*          | Start              | The start of the event. Format: `YYYY-MM-DD HH:MM:SS`.                                                                        | `datetime`                          |
| `has_end`          | Has End            | Whether or not this event has an end date/time. Values: `0` or `1`. Default: `0`.                                             | `0,1`                               |
| `end`              | End                | The end of the event (present if `has_end` is `1`). Format: `YYYY-MM-DD HH:MM:SS`.                                            | `datetime`                          |
| `all_day`          | All Day            | Whether this is an all-day event (no time, just start/end day). Values: `0` or `1`. Default: `0`.                             | `0,1`                               |
| `rsvp`             | RSVP Settings      | Who may RSVP: `0` = no one, `1` = invited only, `2` = anyone. Default: `0`.                                                   | `0,1,2`                             |
| `comments_enabled` | Enable Comments    | Whether users can discuss the event. Values: `0` or `1`. Default: `1`.                                                        | `0,1`                               |
| `type`             | Event Type         | Type of event: `event` = normal event, `assignment` = due event for an assignment, `discussion` = due event for a discussion. | `event`, `assignment`, `discussion` |
| `editable`         | Editable           | Indicates if the current user can edit the event (response-only).                                                             | `0,1`                               |
| `realm`            | Realm              | The realm where the event lives (e.g., `section`, `user`, `school`).                                                          | `string`                            |
| `section_id`       | Section ID         | The associated section ID when `realm` is a section (response-only).                                                          | `string`                            |
| `links`            | Links              | URL links related to the event (response-only).                                                                               | `object`                            |

\* = Required

## GET `{realm}/events`

View a list of events (paged). You can limit the result set by date by specifying both `start_date` and `end_date` as `YYYY-MM-DD` or `YYYYMMDD`.

Parameters: `start_date`, `end_date`, `with_attachments`

**Return** A list of [event objects](#fields)

::: code-group

```json [JSON]
{
  "event": [
    {
      "id": 5615031,
      "title": "Test Event 1",
      "description": "",
      "start": "2013-12-16 18:59:59",
      "has_end": 0,
      "end": "",
      "all_day": 1,
      "editable": 1,
      "rsvp": 0,
      "comments_enabled": 1,
      "type": "event",
      "realm": "section",
      "section_id": 3719526,
      "links": {
        "self": "http:\/\/...\/5615031"
      }
    },
    {
      "id": 5615033,
      "title": "Test Event 2",
      "description": "",
      "start": "2013-12-23 18:59:59",
      "has_end": 0,
      "end": "",
      "all_day": 1,
      "editable": 1,
      "rsvp": 0,
      "comments_enabled": 1,
      "type": "event",
      "realm": "section",
      "section_id": 3719526,
      "links": {
        "self": "http:\/\/...\/5615033"
      }
    }
  ],
  "total": 2,
  "links": {
    "self": "http:\/\/...\/events?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <event>
    <id>5615031</id>
    <title>Test Event 1</title>
    <description />
    <start>2013-12-16 18:59:59</start>
    <has_end>0</has_end>
    <end />
    <all_day>1</all_day>
    <editable>1</editable>
    <rsvp>0</rsvp>
    <comments_enabled>1</comments_enabled>
    <type>event</type>
    <realm>section</realm>
    <section_id>3719526</section_id>
    <links>
      <self>http://.../5615031</self>
    </links>
  </event>
  <event>
    <id>5615033</id>
    <title>Test Event 2</title>
    <description />
    <start>2013-12-23 18:59:59</start>
    <has_end>0</has_end>
    <end />
    <all_day>1</all_day>
    <editable>1</editable>
    <rsvp>0</rsvp>
    <comments_enabled>1</comments_enabled>
    <type>event</type>
    <realm>section</realm>
    <section_id>3719526</section_id>
    <links>
      <self>http://.../5615033</self>
    </links>
  </event>
  <total>2</total>
  <links>
    <self>http://...events?start=0&amp;limit=20</self>
  </links>
</result>
```

:::

## GET `{realm}/events/{id}`

View a specified event.

**Return** An [event object](#fields)

::: code-group

```json [JSON]
{
  "id": 5615031,
  "title": "Test Event 1",
  "description": "",
  "start": "2013-12-16 23:59:59",
  "has_end": 0,
  "end": "",
  "all_day": 1,
  "editable": 1,
  "rsvp": 0,
  "comments_enabled": 1,
  "type": "event",
  "realm": "section",
  "section_id": 3719526
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5615031</id>
  <title>Test Event 1</title>
  <description />
  <start>2013-12-16 23:59:59</start>
  <has_end>0</has_end>
  <end />
  <all_day>1</all_day>
  <editable>1</editable>
  <rsvp>0</rsvp>
  <comments_enabled>1</comments_enabled>
  <type>event</type>
  <realm>section</realm>
  <section_id>3719526</section_id>
</result>
```

:::

## POST `{realm}/events`

Create an event.

**Content** An object containing event fields

::: code-group

```json [JSON]
{
  "title": "My new event",
  "description": "My event description",
  "start": "2015-05-45 16:30:00",
  "has_end": "1",
  "end": "2015-05-45 18:30:00",
  "type": "event"
}
```

```xml [XML]
<body>
  <title>My new event</title>
  <description>My event description</description>
  <start>2015-05-45 16:30:00</start>
  <has_end>1</has_end>
  <end>2015-05-45 18:30:00</end>
  <type>event</type>
</body>
```

:::

**Return** An [event object](#fields)

::: code-group

```json [JSON]
{
  "id": 5615013,
  "title": "My Course Event",
  "description": "My course event description",
  "start": "2014-12-28 11:30:00",
  "has_end": 1,
  "end": "2014-12-28 13:30:00",
  "all_day": 0,
  "editable": 1,
  "rsvp": 0,
  "comments_enabled": 1,
  "type": "event",
  "realm": "section",
  "section_id": 3719526,
  "links": {
    "self": "http:\/\/...\/3719526\/events\/5615013"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5615013</id>
  <title>My Course Event</title>
  <description>My course event description</description>
  <start>2014-12-28 11:30:00</start>
  <has_end>1</has_end>
  <end>2014-12-28 13:30:00</end>
  <all_day>0</all_day>
  <editable>1</editable>
  <rsvp>0</rsvp>
  <comments_enabled>1</comments_enabled>
  <type>event</type>
  <realm>section</realm>
  <section_id>3719526</section_id>
  <links>
    <self>http://.../events/5615013</self>
  </links>
</result>
```

:::

## PUT `{realm}/events/{id}`

Modify an event.

**Content** An object containing event fields

::: code-group

```json [JSON]
{
  "title": "My new event with updated end time",
  "end": "2015-05-45 20:30:00"
}
```

```xml [XML]
<body>
  <title>My new event with updated end time</title>
  <end>2015-05-45 20:30:00</end>
</body>
```

:::

## DELETE `{realm}/events/{id}`

Delete an event (cannot be undone).
