article_id: 25142896227357
name: I forgot the owner password for the Home Assistant Green. How can I reset it?
position: 3
labels: green, troubleshooting
---

If you forgot the owner's password, you need to connect an external monitor and keyboard to Home Assistant Green and reset the password via the terminal.

1. Connect an external monitor and keyboard to Home Assistant Green.

   - Follow the steps outlined in [Using the console on the HDMI display](/guides/use-terminal/).

2. Reset the password via the terminal.

   - Enter the following command: `auth reset --username 'existing_user' --password 'new_password'`

     **Info**: The ha command line does not support all special characters.
     - Use a short and simple password without special characters when resetting via the command line.

     **Example**: To reset the password for the user `yelena` to `12345`, enter: `auth reset --username 'yelena' --password '12345'` ![Command Line Example](../../../static/img/green/home-assistant-cli.webp)

3.  Log in with the new password.

4.  Replace the simple password with a complex one.

    - Go to your [User profile](https://my.home-assistant.io/redirect/profile/) and, on the **Security** tab, update the password to a more complex one.

