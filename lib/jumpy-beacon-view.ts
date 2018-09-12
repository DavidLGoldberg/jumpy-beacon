'use babel';

/* global atom */
import { CompositeDisposable, Range, Pane, TextEditor } from 'atom';

export default class JumpyBeaconView {
    disposables: CompositeDisposable;

    constructor(serializedState: any) {
        this.disposables = new CompositeDisposable();

        this.disposables.add(
            atom.workspace.onDidStopChangingActivePaneItem((paneItem: Pane) => {
                if (this.shouldAnimate(paneItem)) {
                    this.animateBeacon(paneItem);
                }
            })
        );
    }

    shouldAnimate(paneItem: Pane) : boolean {
        if(!atom.workspace.isTextEditor(paneItem)) {
            return false;
        }

        const textEditor = paneItem;
        // short circuit to not animate if cursor is 0,0 (mostly here because of new tabs):
        if (textEditor.getCursorBufferPosition().isEqual([0,0])) {
            return false;
        }

        return true;
    }

    animateBeacon(textEditor: TextEditor) : void {
        const position = textEditor.getCursorScreenPosition();
        const range = Range(position, position);
        const marker = textEditor.markScreenRange(range, { invalidate: 'never' });
        const beacon = document.createElement('span');
        beacon.classList.add('jumpy-beacon'); // For styling and tests
        textEditor.decorateMarker(marker,
            {
                item: beacon,
                type: 'overlay'
            });
        setTimeout(function() {
            marker.destroy();
        } , 200);
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        if (this.disposables) {
            this.disposables.dispose();
        }
    }
}
