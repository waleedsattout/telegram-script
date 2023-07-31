# telegram-script

Telegram with Google Apps Scripts

## Overview

This is a very simple code to use Telegram bot in Google Apps Script.

## Usage

1. Copy the `TG` class to your `.gs` file.
2. In your `doPost` function, create an instance of the `TG` class with your bot token and the data received in the `doPost` function.
3. Use the `replyToSender` method to send a message back to the user.

Example:

```javascript
function doPost(e) {
  // Get the data received in the doPost function
  var data = JSON.parse(e.postData.contents);

  // Create an instance of the TG class with your bot token and the data
  var bot = new TG("<your_bot_token>", data);

  // Send a message back to the user
  bot.replyToSender("great!");
}
```

## API

### `TG(token, data)`

Creates a new instance of the TG class with the specified bot token and data.

- `token` - The authentication token of the Telegram bot.
- `data` - The data received in the doPost function.

### `setWebhook()`

this method to set the webhook, note that you need to specify the `publishUrl` that you can get after deploying the the script and get the url.

### `replyToSender(text)`

Sends a message to the user who sent the original message.

- text - The text of the message to send.

### `sendKeyboard(text, choices)`

- text - The text to set it with the keyboard, it is needed by telegram if I recall.
- choices - An array of arrays of keyboard text and callback_data that represents the inline keyboard markup to include with the message. it could be something like `[['Yes', 'true'], ['No', 'false']]`


## Additional

I made a class to help me doing things, it apparently needs updates all the time along with TG class but here we go:

### `transformArrayToKeyboard(choices)`
it transforms `[4,5,6,7,8]` to this:
```javascript
[
    [
        {text: "4" },{text: "5" },{text: "6" }
    ]
    [
        {text: "7" },{text: "8" }
    ]
];
```

### `toInlineKeyBoard(data)`
it transforms `[['text','callback_data'], ['text','callback_data']]` to this:

```javascript
{
    "inline_keyboard": [
        [{
            "text": "Yes",
            "callback_data": "yes"
        }],
        [{
            "text": "No",
            "callback_data": "no"
        }]
    ]
}
```
