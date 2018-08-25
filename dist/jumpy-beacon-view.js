"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
/* global atom */
const atom_1 = require("atom");
class JumpyBeaconView {
    constructor(serializedState) {
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(atom.workspace.onDidStopChangingActivePaneItem((paneItem) => {
            this.animateBeacon(paneItem);
        }));
    }
    animateBeacon(paneItem) {
        if (!atom.workspace.isTextEditor(paneItem)) {
            return;
        }
        const textEditor = paneItem;
        const position = textEditor.getCursorScreenPosition();
        const range = atom_1.Range(position, position);
        const marker = textEditor.markScreenRange(range, { invalidate: 'never' });
        const beacon = document.createElement('span');
        beacon.classList.add('jumpy-beacon'); // For styling and tests
        textEditor.decorateMarker(marker, {
            item: beacon,
            type: 'overlay'
        });
        setTimeout(function () {
            marker.destroy();
        }, 200);
    }
    // Returns an object that can be retrieved when package is activated
    serialize() { }
    // Tear down any state and detach
    destroy() {
        if (this.disposables) {
            this.disposables.dispose();
        }
    }
}
exports.default = JumpyBeaconView;
//# sourceMappingURL=jumpy-beacon-view.js.map