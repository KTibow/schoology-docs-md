# Addendum (by schoology-docs-md)

There are a few things of note you can do with the Schoology API for any request, collected here.

## Include attachments and tags

See the [extras page](./5-Extras) for info on this one.

## Vary profile image sizes

Profile image sizes can be modified by adding the `picture_size` parameter to any request. For example: https://api.schoology.com/v1/users?picture_size=sm. The following sizes are available:

- **big**: width - 250px
- **reg**: width - 170px
- **sm**: 50x46 px
- **tiny**: 35x32 px

## Paginate

You can use the `start` (or `start_id`) and `limit` URL parameters for pagination.

## OPTIONS

Any call can use the `OPTIONS` method.

## POST multiget

Make multiple (up to 50) GET calls (from the following list) with a single POST call and receive each response body in full in a single compiled response.

```
/groups/[group_id]
/courses/[course_id]
/courses/[course_id]/sections
/sections/[section_id]
/sections/[section_id]/assignments
/sections/[section_id]/enrollments
/sections/[section_id]/grade_items
/sections/[section_id]/grades
/sections/ext/[id]
/users/[user_id]
/users/[user_id]/sections
/users/[user_id]/groups
/users/ext/[id]
/[realm]/[realm_id]/updates
/[realm]/[realm_id]/discussions
/[realm]/[realm_id]/events
```

Example call:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<requests>
  <request>/v1/users/265</request>
  <request>/v1/users/265/sections</request>
  <request>/v1/sections/2354/assignments</request>
</requests>
```

## POST multioptions

Make multiple OPTIONS calls (for any endpoint) with a single POST call and receive each response body in full in a single compiled response.

Example call:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<requests>
  <request>/v1/users/265</request>
  <request>/v1/users/265/sections</request>
  <request>/v1/sections/2354/assignments</request>
</requests>
```
