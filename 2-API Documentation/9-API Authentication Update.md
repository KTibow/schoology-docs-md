# Important API Authentication Update: Additional Security for OAuth/API Keys on 3rd Party Apps

## What is this?

This update introduces additional security measures for OAuth/API keys used by 3rd party apps to access data in Schoology from June 25, 2025

This does not affect apps in the Schoology App Center.

## What does it do?

This will ensure that Personal API keys cannot access other user data. Integrations using Personal API keys will receive a 401 error.

## What won't change?

This will not affect Schoology App Center applications.

Apps that are unpublished or available only within the school will continue to access users within the same school without changes.

## Schoology App Center Approval Requirement:

Moving forward, apps must be approved by Schoology to access data from other schools. Unapproved apps will receive a 401 error when attempting to access user data. Please ensure all necessary actions are taken before the mandatory activation date to avoid possible disruptions. If you have any questions or would like to opt in sooner than the mandatory date, please reach out to our support team.
