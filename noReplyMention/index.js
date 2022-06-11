let unpatch;

export default {
    onLoad() {
        unpatch = cumcord.patcher.before("createPendingReply", cumcord.modules.webpack.findByProps("createPendingReply"), (args) => {
        	args[0].shouldMention = false;
        });
    },
    onUnload() {
        unpatch();
    }
};
