import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewInit, ViewChild } from '@angular/core';

declare var JSONEditor;

// Crappy hack: https://github.com/Urbansson/ng2-jsoneditor/issues/3

@Component({
  selector: 'app-json-viewer',
  template: `
    <div #jsoneditor></div>
  `
})
export class JsonViewerComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('jsoneditor') jsonEditor;

  @Input() data;
  @Input() options;
  @Input() schema;
  @Input() mode;

  templateDivRef: any;
  editorRef: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.firstChange && !!changes.data && changes.data.currentValue != null) {
      this.editorRef.set(this.data);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.templateDivRef = this.jsonEditor.nativeElement;
    this.createDefaultObjectViewer();
  }

  createDefaultObjectViewer() {
    this.editorRef = new JSONEditor(this.templateDivRef, { mode: this.mode, schema: this.schema }, {});
  }

}
