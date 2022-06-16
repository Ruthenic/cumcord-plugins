import { findByProps } from '@cumcord/modules/webpack';

let unpatch;

const dictionary = {
  'wtf': 'what the fuck',
  'wth': 'what the hell',
  'lmao': '*laughing my ass off*',
  'lmfao': '*laughing my fucking ass off*',
  'lol': '*laughing out loud*',
  'wdym': 'what do you mean',
  'ltr': 'left to right',
  'rtl': 'right to left',
  'wym': 'what you mean',
  'ikr': 'i know right',
  'lmk': 'let me know',
  'ofc': 'of course',
  'brb': 'be right back',
  'btw': 'by the way',
  'b4': 'before',
  'ofc': 'of course',
  'bff': 'best friends forever',
  'afaik': 'as far as i know',
  'afk': 'away from keyboard',
  'ttyl': 'talk to you later',
  'gtg': 'got to go',
  'tho': 'though',
  'smh': 'shaking my head',
  'tbh': 'to be honest',
  'bruv': 'brother',
  'ty': ' thank you',
  'ngl': ' not gonna lie',
  'ig ': ' i guess ',
  'ig': ' i guess',
  'rtfm': 'read the freaking manual',
  'u': 'you',
  'r': 'are',
  'ur': 'your',
  'uw': 'you are welcome',
  'uwot': 'what do you mean',
  'ok': 'okay',
  'ok.': 'okay.',
  'ok?': 'okay?',
  'ok!': 'okay!',
  'ok,': 'okay,',
  'i': 'I',
  'i?': 'I?',
  'i!': 'I!',
  'i.': 'I.',
  'i,': 'I,',
  '\ni ': '\nI ',
  'im': 'I am',
  'Im': 'I am',
  'doesnt': 'does not',
  'dont': 'do not',
  'didnt': 'did not',
  'cant': 'can not',
  'cannot': 'can not',
  'wont': 'will not',
  'aint': 'is not',
  'lets': 'let us',
  'thats': 'that is',
  'wouldnt': 'would not',
  'couldnt': 'could not',
  'shouldnt': 'should not',
  'fuck': 'freak',
  'shitty': 'poopy',
  'shit': 'poop',
  'damn': 'darn',
  'dammit': 'darn it',
  'cock': 'pipe',
  'dick': 'pipe',
  'penis': 'pipe',
  'your': "you are",
  'isnt': 'is not',
  'idk': 'I do not know'
};

const correct = (message) => {
  // Use regex to replace all occurences of ${word} in ${message}
  message = message.split(' ')
  for (let i = 0; i < message.length; i++) {
    for (let word in dictionary) {
      if (message[i] === word) {
        message[i] = dictionary[word];
      }
    }
  }
  message = message.join(' ');
  if (message.replace('~~', '').slice(-1) !== '.' &&
      message.replace('~~', '').slice(-1) !== '!' &&
      message.replace('~~', '').slice(-1) !== '?' &&
      (message[0] !== ":" && message.replace('~~', '').slice(-1) !== ':') ) {
    message += '.';
  }
  if (message.replace('~~', '')[0] !==
      message.replace('~~', '').toUpperCase()[0]) {
    message = message.charAt(0).toUpperCase() + message.slice(1);
  }
  return message.replace('Https://', 'https://');
};

export default {
  onLoad() {
    unpatch = cumcord.patcher.after(
        'sendMessage', findByProps('sendMessage'), (args) => {
          let messageText = args[1].content;
          args[1].content = correct(correct(messageText));
          return args;
        });
  },
  onUnload() {
    unpatch();
  }
};
