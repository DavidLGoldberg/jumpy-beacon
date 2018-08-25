### global
atom
jasmine describe xdescribe beforeEach afterEach it expect
###
path = require 'path'
{keydown} = require './helpers/keydown'
{wait} = require './helpers/wait'

describe "Jumpy-beacon", ->
    [workspaceElement, textEditorElement, textEditor ] = []

    beforeEach ->
        atom.packages.activatePackage 'jumpy-beacon'

    beforeEach ->
        atom.workspace.open 'test_text.md'

    beforeEach ->
        # TODO: Abstract the following out, (DRY) --------------
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
        atom.project.setPaths([path.join(__dirname, 'fixtures')])
        workspaceElement = atom.views.getView(atom.workspace)
        # @leedohm helped me with this idiom of workspace size.
        # He found it in the wrap-guide.
        workspaceElement.style.height = "5000px" # big enough
        workspaceElement.style.width = "5000px"
        jasmine.attachToDOM(workspaceElement)
        # TODO: Abstract the following out, (DRY) --------------

        textEditor = atom.workspace.getActiveTextEditor()
        textEditorElement = atom.views.getView(textEditor)
        textEditor.setCursorBufferPosition [1,1]

    afterEach ->
        atom.workspace.destroy 'test_text.md'

    describe "when the jumpy-beacon is running", ->
        it "animates on tab switch", ->
