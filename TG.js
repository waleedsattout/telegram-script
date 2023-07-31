class TB {
  constructor(token, contents) {
    this.contents = contents
    this.token = token
    this.chat_id = this.contents?.message?.from?.id || this.contents?.callback_query?.from?.id
  }

  request(method, data) {
    let options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(data)
    };
    let response = UrlFetchApp.fetch(`https://api.telegram.org/bot${this.token}/${method}`, options);
    if (response.getResponseCode() == 200) {
      return JSON.parse(response.getContentText());
    }
    return false;
  }

  replyToSender(text) {
    return this.request('sendMessage', {
      'chat_id': this.chat_id,
      'text': text
    });
  }

  setWebhook() {
    if (this.token === '') {
      Logger.log('Error, Token must not be empty');
      return false
    };
    let result = this.request('setWebhook', {
      url: publishUrl
    });
    Logger.log(result);
  }

  /**
* chices = [4,5,6,7,8]
* @param text String
* @param choices Array
* @returns 
*/
  sendKeyboard(text = 'Menu', choices) {
    const buttons = Fix.transformArrayToKeyboard(choices);
    return this.request('sendMessage', {
      'chat_id': this.chat_id,
      'text': text,
      'reply_markup': JSON.stringify({
        keyboard: buttons,
        resize_keyboard: true
      })
    });
  }

  sendInlineKeyboard(text, keyboard) {
    return this.request('sendMessage', {
      'chat_id': this.chat_id,
      'text': text,
      'reply_markup': JSON.stringify(Fix.toKeyBoard(keyboard))
    });
  }

  handleCallbackQuery(data) {
    if (data == 'yes') {
      this.replyToSender('OK, lets continue');
    } else if (data == 'no') {
      this.replyToSender('OK, see you again');
    } else {
      this.replyToSender('Sorry, I dont understand');
    }
  }
}
