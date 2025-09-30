# Retrieving Extras

Any endpoint that indicates it supports the query parameters below will return to the normal API objects with an extra object (attachment or tag) inside of each object:

| Name        | Query Parameter       | Type                                         |
| ----------- | --------------------- | -------------------------------------------- |
| Attachments | `?with_attachments=1` | [attachment_object](#the-attachments-object) |
| Tags        | `?with_tags=1`        | [tag_object](#the-tags-object)               |

## The Attachments Object

To get the attachments for discussions in a given course you would use an endpoint like:

- https://api.schoology.com/v1/course/course_id/discussions?with_attachments=1

Each attachment type has a different set of fields, enumerated below:

| Field    | Name              | Description             | Type                          |
| -------- | ----------------- | ----------------------- | ----------------------------- |
| `files`  | File Attachments  | A list of file objects  | [file_object](#file-object)   |
| `links`  | Link Attachments  | A list of link objects  | [link_object](#link-object)   |
| `videos` | Video Attachments | A list of video objects | [video_object](#video-object) |
| `embeds` | Embed Attachments | A list of embed objects | [embed_object](#embed-object) |

### File Object

A few notes about the converted_fields:

- A converted file is a unique file from the original file. The converted file's value is that it has been converted to a format supported by more devices. However, the value of the original file is still very important. This motivates the decision to return information about both files.
- The converted_status will always given. The converted_status is a integer. The meanings of the numbers are as follows:
  - 1: The file has been converted and is available
  - 2: The file is pending conversion
  - 3: File conversion has failed
  - 4: Any sort of conversion attempts are inactive.

- The converted_type will always be given. This flags what type of file Schoology abstracts and tries to convert the original file too (e.g. .flv, .mp4, .asf, .wmv, and .smi are all considered **video** files). The constants are as follows:
  - 1: Video
  - 2: Audio
  - 3: Image
  - 4: Document
  - 5: Unknown

- The only time converted file information will be given is if a file of converted_type **Audio (2)** or **Video (1)** file has been converted and is available, information about that file will be returned in the file object.

| Field                     | Name                    | Description                                                        | Type      |
| ------------------------- | ----------------------- | ------------------------------------------------------------------ | --------- |
| `id`                      | Attachment ID           | The internal Schoology ID of the attachment                        | `integer` |
| `title`                   | Title of the attachment | Title of the attachment, could be different from filename          | `string`  |
| `filename`                | Filename                | The name of the file                                               | `string`  |
| `md5_checksum`            | Md5 Checksum            | MD5 checksum of the file                                           | `string`  |
| `timestamp`               | Timestamp               | The timestamp of when the file was uploaded                        | `integer` |
| `download_path`           | Download Path           | An API accessible URL to the file.                                 | `string`  |
| `extension`               | File Extension          | The extension of the file, merely a convenience field for the user | `string`  |
| `converted_status`        | Converted Status        | Status of the conversion process for this file                     | `integer` |
| `converted_type`          | Converted Type          | Type of file Schoology would consider this extension               | `integer` |
| `converted_filename`      | Converted Filename      | The name of the converted file                                     | `string`  |
| `converted_download_path` | Converted Download Path | The download path of the converted file                            | `string`  |
| `converted_extension`     | Converted Extension     | The extension of the converted file                                | `string`  |
| `converted_filesize`      | Converted Filesize      | The size of the converted file                                     | `integer` |
| `converted_md5_checksum`  | Converted MD5 Checksum  | The md5 checksum of the converted file                             | `string`  |

### Link Object

| Field       | Name                    | Description                                                        | Type      |
| ----------- | ----------------------- | ------------------------------------------------------------------ | --------- |
| `id`        | Attachment ID           | The internal Schoology ID of the attachment                        | `integer` |
| `title`     | Title of the attachment | Title of the attachment, could be different from filename          | `string`  |
| `url`       | URL                     | URL of the link attachment                                         | `string`  |
| `summary`   | Summary                 | If requested by attaching user, a small teaser from the link site  | `string`  |
| `favicon`   | Favicon                 | Link to the favicon image from the site                            | `string`  |
| `thumbnail` | Thumbnail image         | If request by attaching user, a thumbnail image from the link site | `string`  |

### Video Object

- The video type is very similar to the link type. This simply denotes that this is a link to a site that Schoology handles in a special fashion. For links pointing to sites like youtube and vimeo and other video hosting sites, Schoology does some special fetching to do things like generate a thumbnail.

| Field       | Name                    | Description                                                        | Type      |
| ----------- | ----------------------- | ------------------------------------------------------------------ | --------- |
| `id`        | Attachment ID           | The internal Schoology ID of the attachment                        | `integer` |
| `title`     | Title of the attachment | Title of the attachment, could be different from filename          | `string`  |
| `url`       | URL                     | URL of the link attachment                                         | `string`  |
| `favicon`   | Favicon                 | Link to the favicon image from the site                            | `string`  |
| `thumbnail` | Thumbnail image         | If request by attaching user, a thumbnail image from the link site | `string`  |

### Embed Object

| Field        | Name          | Description                                 | Type      |
| ------------ | ------------- | ------------------------------------------- | --------- |
| `id`         | Attachment ID | The internal Schoology ID of the attachment | `integer` |
| `embed_code` | Embed Code    | The embed code of the embed                 | `string`  |

## The Tags Object

Tags is the API name for the various alignment types Schoology supports such as state standards and custom learning outcomes. Users can associate or "Tag" content such as Assignments, Documents, Resources or Discussions. Endpoints that support tags will have the `with_tags` parameter listed as a supported query parameter.

To get the tags for discussions in a given course you would use an endpoint like:

- https://api.schoology.com/v1/course/course_id/discussions?with_tags=1

| Field         | Name          | Description                                     | Type      |
| ------------- | ------------- | ----------------------------------------------- | --------- |
| `title`       | Title of tag  | Title of tag                                    | `string`  |
| `description` | Description   | Description                                     | `string`  |
| `id`          | Term ID       | The internal Schoology term ID                  | `integer` |
| `vid`         | Vocabulary ID | The internal Schoology vocabulary ID of the tag | `integer` |
