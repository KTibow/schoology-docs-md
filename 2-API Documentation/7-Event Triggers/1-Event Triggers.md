# Event Triggers

School admins can configure targets to listen for events that happen inside of their school in Schoology. There are three important objects in understanding how to set up a resource to listen for certain events:

- **Triggers:** are Schoology defined actions that will cause a check for target subscriptions for that action in the school the action took place.
- **Targets:** are user defined objects specifying where data about the action that took place ([Event Objects](<./2-Event Objects>)) should be sent.
- **Subscriptions** are the relationships between Schoology triggers and user-defined Targets. Users can subscribe to have multiple targets per trigger, or, alternatively, have one target listen to all Schoology defined triggers.

## Targets

Schoology exposes a UI in the admin panel, as well as programmatic endpoints to maintain targets. A user must have access to the Schoology Trigger UI to act on these endpoints. A target object looks like the following:

| Field       | Name        | Description                                                                                   | Type    |
| ----------- | ----------- | --------------------------------------------------------------------------------------------- | ------- |
| Id          | id\*        | The Schoology Id of the target                                                                | integer |
| Target      | target      | The URL of the target resource. This is where data will be sent when a trigger action occurs. | string  |
| Description | description | Optional description of the target.                                                           | string  |

\* = Required

### GET `triggers/targets`

List a school's targets

**Return** A object containing a list of [targets](#targets)

### POST `triggers/targets`

Create a target

**Content** A [target](#targets)

**Return** A [target](#targets)

### PUT `triggers/targets/[target_id]`

Modify a target

**Content** A [target](#targets)

### DELETE `triggers/targets/[target_id]`

Delete a target

## Subscriptions

Once you have your targets made, you then have to define a relationship between targets and triggers. The subscription endpoints will allow you to do this

| Field               | Name           | Description                                                                                                                                                 | Type    |
| ------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Target Id           | target_id\*    | The Schoology Id of the target you would like to relate to the specified trigger                                                                            | integer |
| Trigger Name        | trigger\*      | The name of the trigger you are subscribing this target to                                                                                                  | string  |
| Subscription Status | subscribed\*   | Whether or not the target is subscribed to this trigger. In the list call this will always be 0, use this flag in the PUT call to subscribe and unsubscribe | `{0,1}` |
| API Version         | version        | What version of the API this subscription should belong to. Right now we only support v1                                                                    | "v1"    |
| Include Object      | include_object | Whether or not to include the extended data in the return object. If not included, defaults to 0                                                            | `{0,1}` |

\* = Required

### GET `triggers/subscriptions`

List all subscriptions for the users school

**Return** An object containing an array of [subscriptions](#subscriptions) in the 'subscription' attribute

### PUT `triggers/subscriptions`

Create and modify subscription relationships

**Content** An object containing an array of [subscriptions](#subscriptions) in the 'subscription' attribute

**Return** An object containing an array of statuses and messages about the success of the subscription action

::: code-group

```json [Request]
{
  "subscription": [
    {
      "target_id": 373221,
      "trigger": "grades",
      "subscribed": 1,
      "include_object": 1
    },
    { "target_id": 373221, "trigger": "attendancesdf", "subscribed": 0 }
  ]
}
```

```json [Response]
{
  "subscription": [
    {
      "item": {
        "target_id": 373221,
        "trigger": "grades",
        "version": "v1",
        "subscribed": 1,
        "target_url": "http:\/\/school.schoology.com\/trigger",
        "include_object": "1"
      },
      "status": 200
    },
    {
      "item": {
        "target_id": 373221,
        "target_url": null,
        "trigger": "attendancesdf",
        "subscribed": 0,
        "version": null,
        "include_object": null
      },
      "message": "The trigger with name attendancesdf does not exist",
      "status": 400
    }
  ]
}
```

:::
