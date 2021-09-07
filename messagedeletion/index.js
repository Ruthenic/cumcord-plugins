import {React} from '@cumcord/modules/common';
const getElementFromMessageId =
    cumcord.modules.webpackModules.findByProps('getElementFromMessageId')
        .getElementFromMessageId;
const origDispatch = Object.getPrototypeOf(
    cumcord.modules.webpackModules.findByProps('dispatch'));
const getChannelInfo =
    Object
        .getPrototypeOf(
            cumcord.modules.webpackModules.findByProps('getChannel'))
        .getChannel;
const getGuildInfo =
    Object
        .getPrototypeOf(cumcord.modules.webpackModules.findByProps('getGuild'))
        .getGuild;
const SettingsView =
    cumcord.modules.webpackModules.findByDisplayName('SettingsView');
import Settings from './components/Settings.jsx';

let deletedMessages = [];
let unpatch;
let unsettings;
let untimeout;
let uncss

function styleMessages() {
  for (let message of deletedMessages) {
    try {
      if (!document.getElementById(message['id'])
               .classList.contains('deleted-message')) {
        document.getElementById(message['id']).classList.add('deleted-message');
        // TODO: do inline styles anyways? they're way more consistent
      }
    } catch (error) {
      // console.log(error)
    }
  }
}

export default {
  onLoad() {
    // Initialize settings values
    window.betterMessageDeletion_enableToasts = false;
    // MLv2 style
    // TODO: make this shit work
    // uncss = cumcord.patcher.injectCSS(".deleted-message{color: #f04747
    // !important;}");

    // GM Style
    uncss = cumcord.patcher.injectCSS(
        '.deleted-message{background-color: rgba(240, 71, 71, 0.1);}');
    // TODO: when cumcord adds settings, allow a toggle between the two
    // (assuming i ever figure out how to change text colour)

    untimeout = setInterval(styleMessages, 300);
    unpatch = cumcord.patcher.instead(
        'dispatch', origDispatch,
        (args, orig) => {  //"prototype bullshit", thanks creatable
          if (args[0]['type'] === 'MESSAGE_DELETE') {
            console.log(args);
            try {
              var deletedMessageInfo = {
                'deletedHtmlElement': getElementFromMessageId(args[0]['id'])
              };
              deletedMessageInfo['deletedText'] =
                  deletedMessageInfo['deletedHtmlElement'].innerText.split(
                      '\n')[3];
              deletedMessageInfo['id'] = 'chat-messages-' + args[0]['id'];
              deletedMessageInfo['deletedHtmlElement'];
              console.log(
                  '[messagedeletion] New Deleted Message: ' +
                  deletedMessageInfo['deletedText']);
              if (deletedMessages.indexOf(deletedMessageInfo) == -1) {
                deletedMessages.push(deletedMessageInfo);
              }
              if (window.betterMessageDeletion_enableToasts) {
                var guildName =
                    getGuildInfo(getChannelInfo(args[0]['channelId']).guild_id)
                        .name;
                cumcord.ui.toasts.showToast({
                  title: `New deleted message in ${guildName}!`,
                  duration: 3000
                });
              }
              console.log(deletedMessages);
              return;
            } catch (error) {
              console.log('[messagedeletion] Failed to get deleted message!');
              console.error(error);
            }
          }
          return orig(...args);
        });
    unsettings = cumcord.patcher.after(
        'getPredicateSections', SettingsView.prototype, (args, items) => {
          const settings = [
            {section: 'DIVIDER'},
            {section: 'HEADER', label: 'BetterMessageDeletion'},
            {section: 'BMD', label: 'Settings', element: Settings}
          ]
          items.push(...settings);
          return items;
        });
  },
  onUnload() {
    uncss();
    unpatch();
    clearInterval(untimeout);
  }
};
