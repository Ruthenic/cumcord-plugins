import {webpackModules} from '@cumcord/modules';

const logger = {
  log: (input) => {
    console.log(
        `%cSenDev%c ${input}`,
        'background-color: #7289da; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold',
        '');
  },
};


let unpatch;

export default {
  onLoad() {
    unpatch = cumcord.patcher.after(
        'sendMessage', webpackModules.findByProps('sendMessage'), (args) => {
          if (args[1].content.startsWith('!cid')) {
            args[1].content =
                webpackModules.findByProps('getChannelId').getChannelId();
          } else if (args[1].content.startsWith('!uid')) {
            try {
              var new_msg =
                  args[1]
                      .content.slice(args[1].content.indexOf('<@!') + 3)
                      .replace('>', '')
                      .substring(0, 19);  // big long line to isolate the uid
              args[1].content = new_msg;
            } catch (error) {
              logger('Cannot find ping ID, not patching args.');
            }
          }
          return args;
        });
  },
  onUnload() {
    unpatch();
  }
};
