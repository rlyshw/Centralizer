# Centralizer

The way this works is you host a "central" static html file. Clients "look" at that ONE file and pass events directly to it through the socket layer. Every single event that a client does will propogate immediately onto the server's central document. The server's html document is static on the filesystem. It is stored in RAM for as long as the app runs. This means changes to the document persist across sessions during the lifetime of the app, logging out and logging back in will always show the same document as before(as long as the app is running in the interim). For cold persistent storage, you can simply write the document stored in RAM back into the html on the filesystem.

I'm going to try to put gridster in it.
