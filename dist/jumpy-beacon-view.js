"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
/* global atom */
const atom_1 = require("atom");
class JumpyBeaconView {
    constructor(serializedState) {
        this.disposables = new atom_1.CompositeDisposable();
        this.wasLastClicked = false;
        this.disposables.add(atom.workspace.observeTextEditors((textEditor) => {
            const cursor = textEditor.getLastCursor();
            this.disposables.add(cursor.onDidChangePosition((event) => {
                if (atom.config.get('jumpy-beacon.shouldBeaconPreviousCursorOnClick')) {
                    if (this.shouldAnimate(textEditor)) {
                        // This works strictly because of the 100ms debounce on onDidStopChangingActivePaneItem()
                        this.animateBeacon(textEditor, event.oldScreenPosition);
                    }
                }
                this.wasLastClicked = true;
            }));
        }));
        this.disposables.add(atom.workspace.onDidStopChangingActivePaneItem((paneItem) => {
            if (this.shouldAnimate(paneItem)) {
                const textEditor = paneItem; // can assert from above
                this.animateBeacon(textEditor, textEditor.getCursorScreenPosition());
            }
            // reset:
            this.wasLastClicked = false;
        }));
    }
    shouldAnimate(paneItem) {
        if (!atom.workspace.isTextEditor(paneItem)) {
            return false;
        }
        const textEditor = paneItem;
        // short circuit to not animate if cursor is 0,0 (mostly here because of new tabs):
        if (textEditor.getCursorBufferPosition().isEqual([0, 0])) {
            return false;
        }
        if (this.wasLastClicked) {
            return false;
        }
        return true;
    }
    animateBeacon(textEditor, position) {
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