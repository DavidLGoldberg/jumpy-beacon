"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
const jumpy_beacon_view_1 = require("./jumpy-beacon-view");
module.exports = {
    jumpyBeaconView: null,
    config: {
        shouldBeaconPreviousCursorOnClick: {
            description: '(EXPERIMENTAL) If true will display a beacon for previous cursor spots during a click to focus.  If false there will be no beacon as this is not useful and can be misleading.',
            type: 'boolean',
            default: false
        },
    },
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