---
zendesk:
  article_id: 25619268678557
  name: Remote UI - Deep dive
  position: 3
  labels: cloud
---

Home Assistant Remote UI allows you to connect to your Home Assistant instance from outside of your home network. By default, remote access is not enabled. You need to [enable it](/hc/en-us/articles/26474279202973/).

Once enabled, Home Assistant generates a security certificate for secure communication and provides you with a URL. You can then use this URL to access your Home Assistant while away from home.

## How it works

This section dives into more technical details on how the remote connection works. If you are only interested in a high level overview, refer to the topic [about the Remote UI connection to Home Assistant](/hc/en-us/articles/26469707849629/).

### Remote UI communication and routing

The Remote UI ensures secure communication between your browser and your local Home Assistant instance by encrypting all data. This encryption is achieved using a Let's Encrypt certificate. Behind the scenes, your local Home Assistant instance connects to one of our custom-built UI proxy servers. These servers operate at the TCP level, forwarding all encrypted data between your browser/client and the local instance.

#### Routing mechanism

Routing is handled on the proxy server (Home Assistant Cloud) by the [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication) extension during the TLS handshake. This extension specifies the hostname for which an incoming request is intended, allowing the proxy server to forward the request to the matching local instance.

To handle simultaneous requests, all data is routed through a TCP multiplexer. The local Home Assistant instance processes the incoming TCP packets using the following steps:

1. Demultiplexing the packets.
2. Decrypting the packets using the SSL certificate.
3. Forwarding the decrypted data to the HTTP component for further handling.

## About add-ons which support ingress

Add-ons which support Ingress can be accessed via Home Assistant Cloud. Because they are served via the Home Assistant UI, they benefit from the same end-to-end encryption and local authentication as the Home Assistant frontend.

## Related topics

- [Enabling remote access to Home Assistant (Remote UI)](/hc/en-us/articles/26474279202973/)
- [About the Remote UI connection to Home Assistant (high level explainer)](/hc/en-us/articles/26469707849629/)
- [Remote UI - security aspects](/hc/en-us/articles/26508882007581/)
- [Using Remote UI with a custom domain for Home Assistant](/hc/en-us/articles/26497540527517/)