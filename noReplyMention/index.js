let unpatch;

export default {
    onLoad() {
        unpatch = cumcord.patcher.before("createPendingReply", cumcord.modules.webpackModules.findByProps("createPendingReply"), (args) => {
        	args[0].shouldMention = false;
        });
    },
    onUnload() {
        unpatch();
    }
};
