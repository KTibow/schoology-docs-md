# Allowing Cookies

> [!WARNING]
> Newer browsers are imposing stricter rules about third-party cookies. Since your app will be launching in an iframe from a different domain than Schoology's, some browsers might prevent your app from saving cookies.

## Affected Browsers

At the moment, only **Safari** blocks 3rd party cookies by default. However, Firefox will soon be blocking 3rd party cookies as well, starting with v22 (see [this article](http://www.theverge.com/2013/2/23/4023078/firefox-to-start-blocking-cookies-from-third-party-advertisers)).

If you're having difficulty setting cookies with Internet Explorer, see the article entitled "[Security Policy](<./7-Security Policy>)."

## Workaround

If the user has previously visited your app's domain from a regular browser window, then the browser will allow cookies from that same domain in an iframe.

The workaround works by launching a popup window to a basic page on your app's domain that sets a cookie and closes itself immediately - users do not see the popup. By the time your app loads, the browser will have seen that the user had accessed your app's domain and will then allow cookies from your app.

You must create a page on your app's domain that contains the following. If you are using a dispatcher / menu router or a templating engine, create a page with the items between the &lt;body&gt; tags.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Loading App...</title>
  </head>

  <body>
    <p>Loading application...</p>
    <script type="text/javascript">
      document.cookie = "setcookie=1";
      self.close();
    </script>
  </body>
</html>
```

When creating or editing your app, check the **"This app uses cookies"** option and enter the path to this new page in the **"Cookie Preload URL"** field.
