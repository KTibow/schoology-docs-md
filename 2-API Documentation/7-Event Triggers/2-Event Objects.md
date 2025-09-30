# Triggers and Receiving Their Event Objects

Event Objects are what Schoology will send to the targets you specify. You can expect event objects to have a fairly consistent structure. You can always rely on the uid, timestamp, and type fields to tell you who caused the trigger to happen, when it happened, and what sort of trigger it is, respectively. You can also rely on the data field which will contain information about what happened/changed. The contents in the data field become more variable however. Whenever applicable, the data field will contain a `realm` and `_id` field to tell you where the event took place (what group, course, etc). Inside the data field there is also the `object` which will be identical to the object returned if you were to make a GET list call or single GET call for the resource that was created, edited, or deleted.

> [!NOTE]
> The type field will always look like "trigger_name.operation". So, if you subscribe to the grade_item trigger which occurs whenever an assignment, assessment, or graded discussion is created, edited, or deleted you would get an event object of type: "grade_item.update" when it is created. If that same assignment is then deleted you will get an event object of type: "grade_item.delete".

When we POST the event object to your target we expect a HTTP status 200 in return. If Schoology gets anything other than that in return Schoology will requeue the event object to be sent again in 10 minutes. Schoology will do this up to 5 times at which point Schoology will give up and the event object will be lost forever. Schoology does not keep any memory of the event objects sent out.

## grade_item

**Description:** Creation, editing, and deletion of an assignment, assessment, or graded discussion. In other words, anything with a grade attached to it.

`data`->`object` will contain [assignment fields](<../../4-API: Objects/Assignment>)

**Possible Operations:**

- grade_item.update
- grade_item.delete

Example object:

```json
{
  "uid": 44012,
  "timestamp": 1358260828,
  "type": "grade_item.update",
  "data": [
    {
      "realm": "section",
      "section_id": "364856",
      "realm_id": "364856",
      "section_school_code": "HIST101",
      "synced_section": "0",
      "id": 449715,
      "grade_item_type": "discussion",
      "object": {
        "id": 449715,
        "title": "Event Trigger Grade Item",
        "description": "",
        "due": "2013-01-31 23:59:00",
        "grading_scale": "0",
        "grading_period": "197",
        "grading_category": "1189",
        "max_points": "100",
        "factor": "1",
        "is_final": "0",
        "show_comments": "0",
        "grade_stats": "0",
        "allow_dropbox": "1",
        "allow_discussion": "1",
        "published": 1,
        "type": "assignment",
        "grade_item_id": 449715,
        "available": 1,
        "completed": 0,
        "num_assignees": 0,
        "assignees": [],
        "completion_status": ""
      }
    }
  ]
}
```

## attendance

**Description:** Whenever an attendance save operation happens. Since attendance editing is almost always done in bulk, expect an array of attendance objects in the data.object field.

`data`->`object` will contain [attendance fields](<../../4-API: Objects/Attendance>)

**Possible Operations:**

- attendance.update

Example object:

```json
{
  "uid": 44012,
  "timestamp": 1358260792,
  "type": "attendance.update",
  "data": [
    {
      "realm": "section",
      "section_id": 364856,
      "object": {
        "enrollment_id": 206873,
        "date": "2013-01-20",
        "status": 2,
        "comment": ""
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "object": {
        "enrollment_id": 206875,
        "date": "2013-01-17",
        "status": 2,
        "comment": ""
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "object": {
        "enrollment_id": 206879,
        "date": "2013-01-19",
        "status": 2,
        "comment": ""
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "object": {
        "enrollment_id": 206880,
        "date": "2013-01-18",
        "status": 2,
        "comment": ""
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "object": {
        "enrollment_id": 206882,
        "date": "2013-01-17",
        "status": 2,
        "comment": ""
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "object": {
        "enrollment_id": 206882,
        "date": "2013-01-19",
        "status": 2,
        "comment": ""
      }
    }
  ]
}
```

## grades

**Description:** Whenever a grades save operation happens. Since grades editing is almost always done in bulk, expect an array of grade objects in the data.object field. Please note the additional field: `updated_overall_grade` which will only be found in Event grade objects. This allows listeners of this event to know the newly updated course grade of the concerned enrollment for the specified section.

`data`->`object` will contain [grade fields](<../../4-API: Objects/Grade>)

**Possible Operations:**

- grades.update

Example object:

```json
{
  "uid": 44012,
  "timestamp": 1358260783,
  "type": "grades.update",
  "data": [
    {
      "realm": "section",
      "section_id": 364856,
      "section_school_code": "HIST101",
      "realm_id": 364856,
      "enrollment_id": 207946,
      "school_uid": "jsmith",
      "updated_overall_grade": 58.5,
      "object": {
        "enrollment_id": 207946,
        "assignment_id": 372736,
        "grade": 56,
        "exception": 0,
        "max_points": 100,
        "is_final": 1,
        "timestamp": 1358260783,
        "comment": "",
        "comment_status": null,
        "override": null,
        "calculated_grade": null,
        "pending": null,
        "type": "discussion",
        "location": "http://dev.schoologize.com/v1/course/364856/discussions/368837",
        "scale_id": 1,
        "category_id": 1189
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "section_school_code": "HIST101",
      "realm_id": 364856,
      "enrollment_id": 206871,
      "school_uid": "jknox1",
      "updated_overall_grade": 88.5,
      "object": {
        "enrollment_id": 206871,
        "assignment_id": 372837,
        "grade": 88,
        "exception": 0,
        "max_points": 100,
        "is_final": 0,
        "timestamp": 1358260783,
        "comment": "",
        "comment_status": null,
        "override": null,
        "calculated_grade": null,
        "pending": null,
        "type": "discussion",
        "location": "http://dev.schoologize.com/v1/course/364856/discussions/372835",
        "scale_id": 1,
        "category_id": 1189
      }
    },
    {
      "realm": "section",
      "section_id": 364856,
      "section_school_code": "HIST101",
      "realm_id": 364856,
      "enrollment_id": 206871,
      "school_uid": "jsmith2",
      "updated_overall_grade": 76.5,
      "object": {
        "enrollment_id": 206871,
        "assignment_id": 372869,
        "grade": 79,
        "exception": 0,
        "max_points": 100,
        "is_final": 0,
        "timestamp": 1358260783,
        "comment": "",
        "comment_status": null,
        "override": null,
        "calculated_grade": null,
        "pending": null,
        "type": "discussion",
        "location": "http://dev.schoologize.com/v1/course/364856/discussions/372867",
        "scale_id": 1,
        "category_id": 1189
      }
    }
  ]
}
```

## section_completion

**Description:** Fired when a student completes all the rules in a course section. Once a course section is completed it is not possible to be "uncompleted" (e.g. if a teacher adds another rule).

**Possible Operations:**

- section_completion.update

Example object:

```json
{
  "uid": 46195,
  "timestamp": 1358261317,
  "type": "section_completion.update",
  "data": {
    "realm": "section",
    "section_id": 287729,
    "object": {
      "uid": 46195,
      "total_rules": 1,
      "completed_rules": 1,
      "percent_complete": 1,
      "completed": 1
    }
  }
}
```

## dropbox_submission

**Description:** Fired when a student submits an assignment submission.

**Possible Operations:**

- dropbox_submission.update

Example object:

```json
(
  "uid": 12345
  "timestamp": 1398873476
  "type": dropbox_submission.update
  "data": stdClass Object
    (
      "realm": section
      "section_id": 123456
      "realm_id": 123456
      "uid": 12345
      "revision_id": 3
      "assignment_nid": 123456
      "object": stdClass Object
        (
          "revision_id": 3
          "uid": 12345
          "created": 1398873455
          "num_items": 1
          "late": 1
          "draft": 0
          "assignment_nid": 123456
          "attachments": stdClass Object
            (
              "files": stdClass Object
                (
                  "file": stdClass Object
                    (
                      "7985": stdClass Object
                        (
                          "id": 7985
                          "type":
                          "title": dropbox_81562_r3.html
                          "filename": dropbox_81562_r3.html
                          "filesize": 3961
                          "md5_checksum": 5ad832729a384451d2af5a585ce7132e
                          "timestamp": 1398873455
                          "filemime": text/html
                          "download_path": http://api.schoology.com/v1/system/files/drop_items/m/201404/course/123456/dropbox_81562_r3_53611d6fc7555.html
                          "extension": html
                          "converted_status": 1
                          "converted_type": 4
                          "converted_filename": 1398873530-dropbox_81562_r3_53611d6fc7555.html_53611dbb5722e.pdf
                          "converted_download_path": http://schoology.com/v1/system/files/drop_items/m/201404/course/123456/1398873530-dropbox_81562_r3_53611d6fc7555.html_53611dbb5722e.pdf
                          "converted_extension": pdf
                          "converted_filemime": application/pdf
                          "converted_filesize": 9357
                          "converted_md5_checksum": 7866a0f381ac59742d3a49e667a3c0a8
                        )

                    )

                )

            )

        )

    )

)
```
