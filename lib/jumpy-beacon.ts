'use babel';

import JumpyBeaconView from './jumpy-beacon-view';

module.exports = {

    jumpyBeaconView: null,

    activate(state: any) {
        this.jumpyBeaconView = new JumpyBeaconView(state.jumpyBeaconViewState);
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
