(function(o){"use strict";let t;const e={wtf:"what the fuck",wth:"what the hell",lmao:"laughing my ass off",lmfao:"laughing my fucking ass off",lol:"laughing out loud",wdym:"what do you mean",ltr:"left to right",rtl:"right to left",wym:"what you mean",ikr:"i know right",lmk:"let me know",ofc:"of course",brb:"be right back",btw:"by the way",b4:"before",ofc:"of course",bff:"best friends forever",afaik:"as far as i know",afk:"away from keyboard",ttyl:"talk to you later",gtg:"got to go",tho:"though"," ig ":" i guess "," ig":" i guess",rtfm:"read the freaking manual"," u ":" you "," r ":" are "," ur ":" your "," uw ":" you are welcome "," uwot ":" what do you mean "," ok ":" okay"," ok.":" okay."," ok?":" okay?"," ok!":" okay!"," ok,":" okay,"," i ":" I "," i?":" I?"," i!":" I!"," i.":" I."," i,":" I,","\ni ":"\nI ",im:"I am",Im:"I am",doesnt:"does not",dont:"do not",didnt:"did not",cant:"can not",cannot:"can not",wont:"will not",aint:"is not",lets:"let us",thats:"that is",wouldnt:"would not",couldnt:"could not",shouldnt:"should not",fuck:"freak",shitty:"poopy",shit:"poop",damn:"darn",damnit:"darn it",dammit:"darn it"};return{onLoad(){t=cumcord.patcher.after("sendMessage",o.webpackModules.findByProps("sendMessage"),(o=>{let t=o[1].content;return o[1].content=(o=>{for(var t in e)o.toLowerCase().includes(t.toLowerCase())&&(console.log(`Message contains '${t}', would replace with '${e[t]}'`),o=o.toString().replace(t,e[t])),"."!==o.replace("~~","").slice(-1)&&"!"!==o.replace("~~","").slice(-1)&&"?"!==o.replace("~~","").slice(-1)&&(o+="."),o[0]!==o.toUpperCase()[0]&&(o=o.charAt(0).toUpperCase()+o.slice(1));return o})(t),o}))},onUnload(){t()}}})(cumcord.modules);