# Submissions

Formerly "Dropbox". Submissions are uniquely identified by a section id, grade item id, user id, and revision id.

> [!IMPORTANT]
> Submissions exist in sections.

## Fields

### Revision Item

| Field         | Name                | Description                                                                                                                                                                                               | Type      |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `revision_id` | Revision ID         | A unique identifier grouping a collection of items and representing a single student's submission for a single assignment.                                                                                | `integer` |
| `created`     | Created             | The time the revision was submitted (Unix timestamp).                                                                                                                                                     | `integer` |
| `late`        | Late                | Indicates whether or not this revision was turned in late.                                                                                                                                                | `integer` |
| `num_items`   | Number of Items     | The number of items associated with this revision.                                                                                                                                                        | `integer` |
| `draft`       | Draft               | Whether or not the revision is a draft. A user can only have one active draft; if they have an active draft they cannot create another revision until the draft is submitted or deleted. Values: `0`/`1`. | `integer` |
| `body`        | Content of Revision | The content of the revision. Expected in POST calls to `sections/{section id}/submissions/{grade item id}/create` when creating from text/HTML.                                                           | `string`  |

## GET `sections/{section id}/submissions/{grade item id}/`

All the revisions for a requested grade item, sorted by the most recent revision and grouped by user.

Query parameters:

- `with_attachments` — retrieve attachments of this piece of content.
- `all_revisions` — optional argument to get all revisions instead of just the most recent one. Accepts a boolean.

**Return** Revision items and drop item attachments if requested grouped by user

::: code-group

```json [JSON]
{
  "revision": [
    {
      "revision_id": 2,
      "uid": 48289,
      "created": 1389654349,
      "num_items": 1,
      "late": 0,
      "draft": 0
    }
  ],
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <revision>
        <revision_id>2</revision_id>
        <uid>48289</uid>
        <created>1389654349</created>
        <num_items>1</num_items>
        <late>0</late>
        <draft>0</draft>
    </revision>
    <links>
        <self>http:\/\/...?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## GET `sections/{section id}/submissions/{grade item id}/{user id}`

Revisions for a given user for a given grade item, sorted by the most recent revision.

Query parameters:

- `with_attachments` — retrieve attachments of this piece of content.

**Return** Revision items and drop item attachments if requested

::: code-group

```json [JSON]
{
  "revision": [
    {
      "revision_id": 1,
      "uid": 48289,
      "created": 1388424197,
      "num_items": 1,
      "late": 0,
      "draft": 0
    },
    {
      "revision_id": 2,
      "uid": 48289,
      "created": 1389654349,
      "num_items": 1,
      "late": 0,
      "draft": 0
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <revision>
        <revision_id>1</revision_id>
        <uid>48289</uid>
        <created>1388424197</created>
        <num_items>1</num_items>
        <late>0</late>
        <draft>0</draft>
    </revision>
    <revision>
        <revision_id>2</revision_id>
        <uid>48289</uid>
        <created>1389654349</created>
        <num_items>1</num_items>
        <late>0</late>
        <draft>0</draft>
    </revision>
</result>
```

:::

## GET `sections/{section id}/submissions/{grade item id}/{user id}/revision/{revision id}`

Specific revision for a given user for a given grade item.

Query parameters:

- `with_attachments` — retrieve attachments of this piece of content.

**Return** Revision items and drop item attachments if requested

::: code-group

```json [JSON]
{
  "revision": [
    {
      "revision_id": 1,
      "uid": 48289,
      "created": 1388424197,
      "num_items": 1,
      "late": 0,
      "draft": 0
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <revision>
        <revision_id>1</revision_id>
        <uid>48289</uid>
        <created>1388424197</created>
        <num_items>1</num_items>
        <late>0</late>
        <draft>0</draft>
    </revision>
</result>
```

:::

## GET `sections/{section id}/submissions/{grade item id}/{user id}/comments`

View a list of submission comments for a given user and grade item in a section.

**Return** Submission comments

::: code-group

```json [JSON]
{
  "comment": [
    {
      "id": 1559,
      "uid": 29,
      "comment": "Revision 1 submitted",
      "created": 1424808366
    },
    {
      "id": 1561,
      "uid": 29,
      "comment": "Revision 2 submitted",
      "created": 1424808400
    },
    {
      "id": 1607,
      "uid": 7,
      "comment": "Nice work!",
      "created": 1425396600
    },
    {
      "id": 1609,
      "uid": 7,
      "comment": "Great improvement",
      "created": 1425396611
    }
  ],
  "total": 15,
  "links": {
    "self": "https:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<comment>
		<id>1559</id>
		<uid>29</uid>
		<comment>Revision 1 submitted</comment>
		<created>1424808366</created>
	</comment>
	<comment>
		<id>1561</id>
		<uid>29</uid>
		<comment>Revision 2 submitted</comment>
		<created>1424808400</created>
	</comment>
	<comment>
		<id>1607</id>
		<uid>7</uid>
		<comment>Nice work!</comment>
		<created>1425396600</created>
	</comment>
	<comment>
		<id>1609</id>
		<uid>7</uid>
		<comment>Great improvement</comment>
		<created>1425396611</created>
	</comment>
	<total>15</total>
	<links>
		<self>https://...?start=0&amp;limit=20</self>
	</links>
</result>
```

:::

## GET `sections/{section id}/submissions/{grade item id}/{user id}/comments/{comment id}`

View a specific submission comment for a given user and grade item in a section.

**Return** Submission comment

::: code-group

```json [JSON]
{
  "id": 1607,
  "uid": 7,
  "comment": "Nice work!",
  "created": 1425396600
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>1607</id>
	<uid>7</uid>
	<comment>Nice work!</comment>
	<created>1425396600</created>
</result>
```

:::

## POST `sections/{section id}/submissions/{grade item id}/{action}`

Create a submission revision. The `{action}` parameter dictates whether a revision with files attached is created, or a revision is created from text/HTML:

- Use `{action}` = `file` to create a submission from file IDs passed in as file attachments.
- Use `{action}` = `create` to create from text/HTML; when using `create` include a `body` attribute in the request. If the `draft` flag is not set the API will default to submitting this revision; to save as a draft set `draft` to `true`. A user can only have one active draft and will be denied creating a file revision while a draft exists.

File uploads are accepted. (Note: this endpoint was changed as of 2/15/15; older endpoints remain available but are not maintained.)

**Return** Revision items and drop item attachments if requested grouped by user

::: code-group

```json [JSON]
{
  "revision": [
    {
      "revision_id": 37,
      "uid": 48289,
      "created": 1389656715,
      "num_items": 1,
      "late": 0,
      "draft": 0,
      "attachments": {
        "files": {
          "file": [
            {
              "id": 6035,
              "type": "",
              "title": "logo-1239021.jpg",
              "filename": "logo-1239021.jpg",
              "filesize": 3825,
              "md5_checksum": "...",
              "timestamp": 1389656715,
              "filemime": "image\/jpeg",
              "download_path": "http:\/\/...",
              "extension": "jpg",
              "converted_status": 4,
              "converted_type": 3,
              "dimensions": "",
              "thumbnail": "http:\/\/...",
              "thumbnail_dimensions": "120x90"
            }
          ]
        }
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <revision>
        <revision_id>37</revision_id>
        <uid>48289</uid>
        <created>1389656715</created>
        <num_items>1</num_items>
        <late>0</late>
        <draft>0</draft>
        <attachments>
            <files>
                <file>
                    <id>6035</id>
                    <type />
                    <title>logo-1239021.jpg</title>
                    <filename>logo-1239021.jpg</filename>
                    <filesize>3825</filesize>
                    <md5_checksum>...</md5_checksum>
                    <timestamp>1389656715</timestamp>
                    <filemime>image/jpeg</filemime>
                    <download_path>http:\/\/...</download_path>
                    <extension>jpg</extension>
                    <converted_status>4</converted_status>
                    <converted_type>3</converted_type>
                    <dimensions />
                    <thumbnail>http:\/\/...</thumbnail>
                    <thumbnail_dimensions>120x90</thumbnail_dimensions>
                </file>
            </files>
        </attachments>
    </revision>
</result>
```

:::

## DELETE `sections/{section id}/submissions/{grade item id}/{user id}/revision/{revision id}`

Delete an assignment submission revision.

## DELETE `sections/{section id}/submissions/{grade item id}/{user id}/comments/{comment id}`

Delete a submission comment.
