'use babel';

/* global atom */
import { CompositeDisposable, Point } from 'atom';

export default class JumpyBeaconView {
    workspaceElement: any;
    disposables: CompositeDisposable;
    commands: CompositeDisposable;

    constructor(serializedState: any) {
        this.workspaceElement = atom.views.getView(atom.workspace);
        this.disposables = new CompositeDisposable();
        this.commands = new CompositeDisposable();
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
