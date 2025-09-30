# Design & Architecture

Schoology implements a REST API. For more information on RESTful web services, read:

https://en.wikipedia.org/wiki/Representational_State_Transfer

The best way to get started using the API is to make some simple calls and get the responses. This will allow you to make sure you OAuth credentials are working and that you can communicate with the API. A recommended tool for making REST API calls in Windows is http://www.fiddler2.com. I can't attest to anything solid for Mac, however you might look here: http://alternativeto.net/software/fiddler/?platform=mac (using a proxy like Fiddler first is helpful because it takes care of all the mechanics of actually making the request and lets you focus on getting the format right first).

The Schoology API expects to receive requests that strictly follow HTTP 1.1, and does it's best to respond to requests in that format (there are a couple instances where the Schoology API bends this format slightly for the convenience of the API user). In general, the Schoology API makes proper use of HTTP status codes, and you can examine the response code to any request first to determine the outcome. In other words, if you get a 403, you don't have permission to do what you want, if you get a 200 your request was a success and if you get a 404, the resource was not found. For information about HTTP status codes, read <http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>.

The three basic elements of any request to the Schoology API are:

**1. HTTP headers**

The Schoology API respects all the standard HTTP 1.1 headers and expects you to at least define the following headers:

- `Accept`: a properly formatted and weighted list of response body formats you will accept (currently supports text/xml,application/json)
- `Host`: the FQDN of the API service (api.schoology.com)
- `Content-Type`: For requests that contain a request body (i.e. something else in addition to HTTP headers), the format of that request body (currently supports text/xml,application/json).
- `Authorization`: The OAuth-defined header that authorizes you as a valid,enabled user of the API. For more information about generating this header, please see section 2.

**2. The OAuth header**

The OAuth header validates you as an enabled API user. For more information about properly generating the required OAuth header, read our page on [OAuth](./3-Authentication), and especially the links at the bottom of that page for getting started with using OAuth. To generate your Schoology API credentials, sign in to your account and visit https://www.schoology.com/api.

**3. Request body (optional)**

When you're doing things like creating a discussion, replying to a private message or updating user profile information, you will be using POST or PUT and will define your content (i.e. updated profile information, the text body of the discussion) in the request body of your API call. This information is therefore obviously required when making these types of calls, and is discarded otherwise. Read section 1 above (HTTP headers) for a list of acceptable request body formats.

The format of the response you will receive is determined by the Accept HTTP header you pass when making the request, and differs structurally depending on what kind of call you are making. The best way to find out what types of response structures you'll receive for different calls is to simply start making some calls and seeing what you get back.

For some further help forming these requests, check out the [examples page](./6-Examples) and the API reference.
