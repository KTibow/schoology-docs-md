# Course Folder

A course folder request returns all the contents of the folder with pointers to that piece of content if the API supports it. This includes child Folders. If the folder has a parent, there is a `<parent>` object that has all the fields of a folder object. Its location attribute will point to the parent. A folder with id = 0 is the root of the course. The contents of the folder is returned in the same order that they are in the course. Ordering does matter.

> [!IMPORTANT]
> Course Folders exist in courses.

## Fields

| Field      | Name                                  | Description                                                            | Type      |
| ---------- | ------------------------------------- | ---------------------------------------------------------------------- | --------- |
| `id`       | Schoology ID of the folder content    | Schoology ID of the folder content                                     | `integer` |
| `title`    | Title                                 | The content title                                                      | `string`  |
| `body`     | Description of the Content            | If the content has a description or body this is it                    | `string`  |
| `type`     | Type of content                       | Type of content `{folder, assignment, discussion, media-album}`        | `string`  |
| `location` | API endpoint to retrieve content from | If the content is accessible via API this location field points to it. | `string`  |

## GET `courses/{course_id}/folder/{folder_id}`

View the contents of a specific folder

**Return** A list of objects within the folder

::: code-group

```json [JSON]
{
  "self": {
    "id": 117703,
    "title": "F8",
    "body": "",
    "available": 1,
    "type": "folder",
    "location": "http:\/\/...",
    "publish_start": "",
    "publish_end": "",
    "status": 1,
    "completion_status": "",
    "has_rules": 0,
    "completed": 0
  },
  "parent": {
    "id": 0,
    "title": "",
    "body": "",
    "available": 1,
    "type": "folder",
    "location": "http:\/\/...",
    "publish_start": "",
    "publish_end": "",
    "status": 0,
    "completion_status": "",
    "has_rules": 0,
    "completed": 0
  },
  "folder-item": [
    {
      "id": 5534077,
      "title": "widget_like_320.zip",
      "body": "",
      "available": 1,
      "completion_status": "",
      "has_rules": 0,
      "completed": 0
    },
    {
      "id": 5534085,
      "title": "Golf Explained - CP Single SCO",
      "body": "",
      "available": 1,
      "type": "package",
      "location": "http:\/\/...",
      "url": "http:\/\/...",
      "completion_status": "",
      "has_rules": 0,
      "completed": 0
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<self>
		<id>117703</id>
		<title>F8</title>
		<body />
		<available>1</available>
		<type>folder</type>
		<location>http:\/\/...</location>
		<publish_start />
		<publish_end />
		<status>1</status>
		<completion_status />
		<has_rules>0</has_rules>
		<completed>0</completed>
	</self>
	<parent>
		<id>0</id>
		<title />
		<body />
		<available>1</available>
		<type>folder</type>
		<location>http:\/\/...</location>
		<publish_start />
		<publish_end />
		<status>0</status>
		<completion_status />
		<has_rules>0</has_rules>
		<completed>0</completed>
	</parent>
	<folder-item>
		<id>5534077</id>
		<title>widget_like_320.zip</title>
		<body />
		<available>1</available>
		<completion_status />
		<has_rules>0</has_rules>
		<completed>0</completed>
	</folder-item>
	<folder-item>
		<id>5534085</id>
		<title>Golf Explained - CP Single SCO</title>
		<body />
		<available>1</available>
		<type>package</type>
		<location>http:\/\/...</location>
		<url>http:\/\/...</url>
		<completion_status />
		<has_rules>0</has_rules>
		<completed>0</completed>
	</folder-item>
</result>
```

:::
