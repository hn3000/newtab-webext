
# A very minimal new-tab extension

This extension should work as a very minimal new tab override
in Firefox, Chrome and Edge (previous versions of chrome didn't support
its functionality, but it works now -- tested in Edge 97, 98 and 99).

The main advantage of this extension over others is its size, it has less than 220 lines of (easily reviewed) code.

````
.../newtab$ wc -l *.*
  51 code.js
  32 manifest.json
  74 newtab.html
  17 options.html
  40 options.js
   8 README.md
 222 total
````


## Signing the extension

    ```bash
    (source .secret && web-ext sign --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET --channel unlisted)
    ```

The file `.secret` should look like this:

    ```bash
    WEB_EXT_API_KEY=user:123456789:123
    WEB_EXT_API_SECRET=xxxxsuperxxsecretxxxxx
    ```

The key and secret are obtained from 
<https://addons.mozilla.org/en-GB/developers/addon/api/key/>.

I found that URL at 
<https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-sign>, 
there does not seem to be a direct link in the menu at
<https://addons.mozilla.org>.

