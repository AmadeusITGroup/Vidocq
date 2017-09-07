import { Component, ViewChild, ElementRef, Input, ViewEncapsulation, AfterViewInit, OnChanges } from '@angular/core';

declare const monaco: any;
declare const require: any;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-monaco-editor',
    template: `
        <div id='editor' #editor class="monaco-editor" dnd-droppable 
            (onDropSuccess)="transferDataSuccess($event)"
            (blur)="onBlur($event)" ></div>
    `,
    styles: [`
        .monaco-editor {
            width: 100%;
            height: 400px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .monaco-editor .token.tables {
            color: red;
        }
    `],
})
export class MonacoEditorComponent implements AfterViewInit, OnChanges {
    @Input() query: string;
    @ViewChild('editor') editorContent: ElementRef;

    private editor: any;

    constructor() {
    }

    ngAfterViewInit() {
        const onGotAmdLoader = () => {
            // Load monaco
            (<any>window).require(['vs/editor/editor.main'], () => {
                this.initMonaco();
            });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
            const loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = 'vs/loader.js';
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }

    // Will be called once monaco library is available
    initMonaco() {
        const editorDiv: HTMLDivElement = this.editorContent.nativeElement;
        this.editor = monaco.editor.create(editorDiv, {
            value: this.query,
            language: 'javascript',
            theme: 'vs-dark',
            formatOnType: true,
            formatOnPaste: true
        });
    }

    getText() {
        return this.editor.getValue();
    }

    ngOnChanges(changes: any) {
        if (this.editor) {
            this.editor.setValue(this.query);
        }
    }
}
