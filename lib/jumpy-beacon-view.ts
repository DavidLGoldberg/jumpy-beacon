'use babel';

/* global atom */
import { CompositeDisposable, Range, Point, Pane } from 'atom';

export default class JumpyBeaconView {
    workspaceElement: any;
    disposables: CompositeDisposable;
    commands: CompositeDisposable;

    constructor(serializedState: any) {
        this.workspaceElement = atom.views.getView(atom.workspace);
        this.disposables = new CompositeDisposable();
        this.commands = new CompositeDisposable();

        atom.workspace.onDidStopChangingActivePaneItem((paneItem: Pane) => {
            this.animateBeacon(paneItem);
        });
    }

    animateBeacon(paneItem: Pane) {
        if(!atom.workspace.isTextEditor(paneItem)) {
            return;
        }

        const textEditor = paneItem;
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
        if (this.commands) {
            this.commands.dispose();
        }
        if (this.disposables) {
            this.disposables.dispose();
        }
    }
}
