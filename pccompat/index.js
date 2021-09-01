import {webpackModules} from '@cumcord/modules';


let unpatch;

let hasRealReq = false;

window.powercord = {
  pcCompat: {commands: []},
  entities: {
    Plugin: class {
      constructor() {}
    }  // STUB
       // TODO: actually implement some PC methods here
  },
  api: {
    commands: {
      registerCommand: (info) => {  // i hope this doesn't return anything
        var name = info.command;
        var executor = info.executor;
        eval(
            `var window.tmppatch = cumcord.patcher.after("sendMessage", cumcord.modules.webpackModules.findByProps("sendMessage"), (args) => {
				if (args[1].content.startsWith("!" + ${name})) {
					args[1].content = ${
                executor.toString()}([args[1].content]).result;
				}
			});`)
        window.powercord.pcCompat.commands.push(
            {name: name, patch: window.tmppatch});
      }  // TODO: when Cumcord introduces a proper API for command handling,
         // convert this code to do that
    }
  }
}

export default {
  onLoad() {
    if (window.require !== undefined) {
      window.realRequire = window.require;
      hasRealReq = true;
      console.warn(
          '[pcCompat] Warning: Require is actually exposed! It has been moved to window.realRequire()!')
    }
    window.require = (module) => {
      let moduleArr = module.split('/');
      var modulePath = moduleArr.slice(1).join('/')
      if (moduleArr[0] !== 'powercord') {
        if (hasRealReq === true) {
          return window.realRequire(module);
        } else {
          throw '[pcCompat] Error: Tried to import non-powercord module with pcCompat require and real require does not exist!';
        }
      }
      else {
        // TODO: this should not be hardcoded
        if (modulePath === 'entities') {
          return window.powercord.entities;
        }
      }
    }  // implementation of require exclusively for powercord modules
  },
  onUnload() {
    unpatch();
  }

};
