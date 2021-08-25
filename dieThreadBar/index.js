import {webpackModules} from "@cumcord/modules";

let css;

export default {
    onLoad() {
        css = cumcord.patcher.injectCSS(".threadSuggestionBar-2ufK2Z {display: none;}")
    },
    onUnload() {
        css();
    }
};
