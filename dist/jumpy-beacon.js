"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
const jumpy_beacon_view_1 = require("./jumpy-beacon-view");
module.exports = {
    jumpyBeaconView: null,
    activate(state) {
        this.jumpyBeaconView = new jumpy_beacon_view_1.default(state.jumpyBeaconViewState);
    },
    deactivate() {
        if (this.jumpyBeaconView) {
            this.jumpyBeaconView.destroy();
        }
        this.jumpyBeaconView = null;
    },
    serialize() {
        return {
            jumpyBeaconViewState: this.jumpyBeaconView.serialize(),
        };
    }
};
//# sourceMappingURL=jumpy-beacon.js.map