# Documents

Documents are standalone file/links. Documents are currently supported in Courses and Schools. On the website, group documents are done through Resources. Documents are simple pieces of content that have one attachment — because a document must have an attachment, all returned documents include an `attachments` block. The `with_attachment` query parameter will return the same response as the request without it.

> [!IMPORTANT]
> Documents exist in schools and sections.

## Fields

| Field                 | Name                         | Description                                                                                                                                                                                       | Type      |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `id`                  | ID                           | The unique ID of the document.                                                                                                                                                                    | `integer` |
| `title`               | Title                        | The document title.                                                                                                                                                                               | `string`  |
| `course_fid`          | Course Folder ID             | The course folder ID this content is in. Only applicable if realm = course.                                                                                                                       | `integer` |
| `available`           | Available                    | Is this available under course completion rules. Allowed values: `0`,`1`.                                                                                                                         | `integer` |
| `published`           | Published                    | Is this piece of content published (`1`) or unpublished (`0`).                                                                                                                                    | `integer` |
| `attachments`         | Attachment                   | Attachment array (files). Documents always include attachments.                                                                                                                                   | `array`   |
| `url`\*               | URL                          | For creating documents with link or embed, send the value in this field. One of `url` or `file-attachments` is required; if both are given, `file-attachments` is respected and `url` is ignored. | `string`  |
| `display_inline`      | Display Inline               | For creating documents with links, determines whether the link will open in an iframe (`1`) or a new tab (`0`).                                                                                   | `integer` |
| `file-attachments`\*  | File                         | For creating documents with files, follow the standard file attachment technique. One of `url` or `file-attachments` is required.                                                                 | `array`   |
| `count_in_grade`      | Count in Grade               | Applies to Course Sections realm and External Tool material enabled for grading. Can be used for materials such as pre-assessments. Allowed values: `0`,`1`. Default: `1`.                        | `integer` |
| `collected_only`      | Collected Only               | Allows teachers to mark materials as completed or not; applies to Course Sections realm and External Tool material enabled for grading. Allowed values: `0`,`1`. Default: `0`.                    | `integer` |
| `auto_publish_grades` | Automatically Publish Grades | Assignment grades will be visible to students and guardians as soon as they are entered. Allowed values: `0`,`1`. Default: `1`.                                                                   | `integer` |

\* = Required

## GET `{realm}/documents`

View a list of documents (paged).

Parameters: `with_tags` (optional) — retrieve tags of this piece of content.

::: code-group

```json [JSON]
{
  "document": [
    {
      "id": 5698289,
      "title": "logo-1239021.jpg",
      "course_fid": 0,
      "available": 1,
      "published": 1,
      "completion_status": "",
      "completed": 0,
      "attachments": {
        "files": {
          "file": [
            {
              "id": 1458867,
              "type": "file",
              "title": "logo-1239021.jpg",
              "filename": "logo-1239021.jpg",
              "filesize": 3825,
              "md5_checksum": "67769392e30b6",
              "timestamp": 1388421315,
              "filemime": "image/jpeg",
              "download_path": "http://...1a0c3e4487.jpg",
              "extension": "jpg",
              "converted_status": 4,
              "converted_type": 3,
              "dimensions": "",
              "thumbnail": "http://...1a0c3e4487.jpg",
              "thumbnail_dimensions": "120x90"
            }
          ]
        }
      }
    }
  ],
  "total": "1",
  "links": {
    "self": "http://.../documents?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <document>
    <id>5698289</id>
    <title>logo-1239021.jpg</title>
    <course_fid>0</course_fid>
    <available>1</available>
    <published>1</published>
    <completion_status />
    <completed>0</completed>
    <attachments>
      <files>
        <file>
          <id>1458867</id>
          <type>file</type>
          <title>logo-1239021.jpg</title>
          <filename>logo-1239021.jpg</filename>
          <filesize>3825</filesize>
          <md5_checksum>67769392e30b6</md5_checksum>
          <timestamp>1388421315</timestamp>
          <filemime>image/jpeg</filemime>
          <download_path>http://...1a0c3e4487.jpg</download_path>
          <extension>jpg</extension>
          <converted_status>4</converted_status>
          <converted_type>3</converted_type>
          <dimensions />
          <thumbnail>http://...1a0c3e4487.jpg</thumbnail>
          <thumbnail_dimensions>120x90</thumbnail_dimensions>
        </file>
      </files>
    </attachments>
  </document>
  <total>1</total>
  <links>
    <self>http://.../documents?start=0&amp;limit=20</self>
  </links>
</result>
```

:::

## GET `{realm}/documents/{id}`

View a specified document.

Parameters: `with_tags` (optional) — retrieve tags of this piece of content.

::: code-group

```json [JSON]
{
  "id": 5698289,
  "title": "",
  "course_fid": 0,
  "available": 1,
  "published": 1,
  "completion_status": "",
  "completed": 0,
  "attachments": {
    "files": {
      "file": [
        {
          "id": 1458867,
          "type": "file",
          "title": "logo-1239021.jpg",
          "filename": "logo-1239021.jpg",
          "filesize": 3825,
          "md5_checksum": "d4a67769392e30b6",
          "timestamp": 1388421315,
          "filemime": "image/jpeg",
          "download_path": "http://...3e4487.jpg",
          "extension": "jpg",
          "converted_status": 4,
          "converted_type": 3,
          "dimensions": "",
          "thumbnail": "http://...3e4487.jpg",
          "thumbnail_dimensions": "120x90"
        }
      ]
    }
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5698289</id>
  <title />
  <course_fid>0</course_fid>
  <available>1</available>
  <published>1</published>
  <completion_status />
  <completed>0</completed>
  <attachments>
    <files>
      <file>
        <id>1458867</id>
        <type>file</type>
        <title>logo-1239021.jpg</title>
        <filename>logo-1239021.jpg</filename>
        <filesize>3825</filesize>
        <md5_checksum>d4a67769392e30b6</md5_checksum>
        <timestamp>1388421315</timestamp>
        <filemime>image/jpeg</filemime>
        <download_path>http://...3e4487.jpg</download_path>
        <extension>jpg</extension>
        <converted_status>4</converted_status>
        <converted_type>3</converted_type>
        <dimensions />
        <thumbnail>http://...3e4487.jpg</thumbnail>
        <thumbnail_dimensions>120x90</thumbnail_dimensions>
      </file>
    </files>
  </attachments>
</result>
```

:::

## POST `{realm}/documents`

Create a Document.

**Content** An object containing document fields. `url` or `file-attachments` are required. If both are given, `file-attachments` will be respected and `url` ignored.

::: code-group

```json [JSON]
{
  "title": "Sample document",
  "file-attachment": {
    "id": [213123234]
  }
}
```

```xml [XML]
<body>
  <title>Sample document</title>
  <file-attachment>
    <id>
      <id>213123234</id>
    </id>
  </file-attachment>
</body>
```

:::

**Return** An object containing document fields.

::: code-group

```json [JSON]
{
  "id": 5698289,
  "title": "logo-1239021.jpg",
  "course_fid": 0,
  "available": 1,
  "published": 1,
  "completion_status": "",
  "completed": 0,
  "attachments": {
    "files": {
      "file": [
        {
          "id": 1458867,
          "type": "file",
          "title": "logo-1239021.jpg",
          "filename": "logo-1239021.jpg",
          "filesize": 3825,
          "md5_checksum": "769392e30b6",
          "timestamp": 1388421315,
          "filemime": "image/jpeg",
          "download_path": "http://...3e4487.jpg",
          "extension": "jpg",
          "converted_status": 4,
          "converted_type": 3,
          "dimensions": "",
          "thumbnail": "http://...3e4487.jpg",
          "thumbnail_dimensions": "120x90"
        }
      ]
    }
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5698289</id>
  <title>logo-1239021.jpg</title>
  <course_fid>0</course_fid>
  <available>1</available>
  <published>1</published>
  <completion_status />
  <completed>0</completed>
  <attachments>
    <files>
      <file>
        <id>1458867</id>
        <type>file</type>
        <title>logo-1239021.jpg</title>
        <filename>logo-1239021.jpg</filename>
        <filesize>3825</filesize>
        <md5_checksum>769392e30b6</md5_checksum>
        <timestamp>1388421315</timestamp>
        <filemime>image/jpeg</filemime>
        <download_path>http://...3e4487.jpg</download_path>
        <extension>jpg</extension>
        <converted_status>4</converted_status>
        <converted_type>3</converted_type>
        <dimensions />
        <thumbnail>http://...3e4487.jpg</thumbnail>
        <thumbnail_dimensions>120x90</thumbnail_dimensions>
      </file>
    </files>
  </attachments>
</result>
```

:::

## PUT `{realm}/documents/{id}`

Modify a document. Title and published/unpublished can be changed.

**Content** An object containing document fields.

::: code-group

```json [JSON]
{
  "title": "Sample unpublished document",
  "published": "0"
}
```

```xml [XML]
<body>
  <title>Sample unpublished document</title>
  <published>0</published>
</body>
```

:::

## DELETE `{realm}/documents/{id}`

Delete a document (cannot be undone).
