import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MonacoEditorComponent } from '../monaco-editor/monaco-editor.component';
import { CollectionService } from '../services/collection.service';

import { find, aggregate } from './sample.code';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnDestroy {
  @ViewChild('monacoEditor') monacoEditor: MonacoEditorComponent;

  private sub: any;
  private currentCollection: string;
  private currentDatabase: string;
  private collectionList: string[] = [];
  private itemInCollection: number;
  private skip = 0;
  private limit = 10;

  private tabList: string[] = ['Find', 'Aggregate'];
  private methodsList: Function[] = [this.find.bind(this), this.aggregate.bind(this)];
  private queryList: string[] = [find, aggregate];


  private selectedTab: string = this.tabList[0];
  private query: string = this.queryList[0];

  private results: Object[] = [];
  private selectedResult: Object;

  public jsonData: Object = {};

  constructor(private route: ActivatedRoute,
    private collectionService: CollectionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const database = JSON.parse(params['database']);
      this.collectionList = database.collections;
      this.currentDatabase = database.name;
      this.changeCollection(params['collection']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changeTab(tabName: string, event: any) {
    // Save the curent tab code
    this.queryList[this.tabList.indexOf(this.selectedTab)] = this.monacoEditor.getText();
    // Then changes tab
    this.selectedTab = tabName;
    this.query = this.queryList[this.tabList.indexOf(this.selectedTab)];
    event.preventDefault();
  }

  selectResult(result: JSON, event?: any) {
    this.selectedResult = result;
    this.jsonData = result;
    if (event) {
      event.preventDefault();
    }
  }

  changeCollection(collection: string) {
    this.currentCollection = collection;
    this.collectionService.count(this.currentDatabase, this.currentCollection)
        .subscribe(count => {
          this.itemInCollection = count;
        });
    this.collectionService.find(this.currentDatabase, this.currentCollection, this.skip, this.limit)
        .subscribe(results => {
          this.results = results;
          this.selectResult(results[0]);
        });
  }

  run() {
    const methodToRun = this.methodsList[this.tabList.indexOf(this.selectedTab)];
    methodToRun(function(results: Object[], self: any) {
      self.selectResult(results[0]);
    });
  }

  find(callback: Function) {
    this.collectionService.find(this.currentDatabase, this.currentCollection, this.skip, this.limit, this.monacoEditor.getText())
        .subscribe(results => {
          this.results = results;
          callback(results, this);
        });
  }

  aggregate(callback: Function) {
    this.collectionService.aggregate(this.currentDatabase, this.currentCollection, this.skip, this.limit, this.monacoEditor.getText())
        .subscribe(results => {
          this.results = results;
          callback(results, this);
        });
  }

  exportJson() {
    if (this.tabList.indexOf(this.selectedTab) === 0) {
      // find
      this.collectionService.findExport(this.currentDatabase, this.currentCollection, this.monacoEditor.getText())
          .subscribe(results => this.downloadJsonFile(results) );
    } else {
      // aggregate
      this.collectionService.aggregateExport(this.currentDatabase, this.currentCollection, this.monacoEditor.getText())
          .subscribe(results => this.downloadJsonFile(results) );
    }
  }

  exportCsv() {
    if (this.tabList.indexOf(this.selectedTab) === 0) {
      // find
      this.collectionService.findExport(this.currentDatabase, this.currentCollection, this.monacoEditor.getText())
          .subscribe(results => this.downloadCsvFile(results) );
    } else {
      // aggregate
      this.collectionService.aggregateExport(this.currentDatabase, this.currentCollection, this.monacoEditor.getText())
          .subscribe(results => this.downloadCsvFile(results) );
    }
  }

  downloadJsonFile(data: any) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/octet-stream' });  // Using octet-stream as json seems not to work
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  downloadCsvFile(data: Array<Object>) {
    let formattedData = '';
    // todo: flattify
    data.forEach(object => {
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          formattedData += object[property] + ',';
        }
      }
      // Remove last ',' character
      formattedData = formattedData.slice(0, -1);
      formattedData += '\n';
    });
    const blob = new Blob([formattedData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
