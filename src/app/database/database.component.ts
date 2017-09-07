import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServerService } from '../services/server.service';
import { DatabaseService } from '../services/database.service';
import { CollectionService } from '../services/collection.service';

class Collection {
  name: string;
  count: number;
}
class Database {
  name: string;
  collections: Collection[] = [];
}

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent {
  private databases: Database[] = [];
  private filteredDatabases: Database[] = [];
  private filteredCollection: Collection[] = [];
  private selectedDatabase: Database;
  private searchDbName: string;
  private searchCollectionName: string;

  private host: string;
  private port: number;
  private username: string;
  private password: string;

  constructor(private router: Router,
              private serverService: ServerService,
              private databaseService: DatabaseService,
              private collectionService: CollectionService) {
    this.listDatabases();
  }

  listDatabases() {
    this.databases = [];
    this.databaseService.get()
                        .subscribe(databases  => {
                          databases.forEach(responseDatabase => {
                            const database = new Database;
                            database.name = responseDatabase.name;
                            this.collectionService.get(database.name)
                                                  .subscribe(collections  => {
                                                    collections.forEach(collection => {
                                                      database.collections.push({name: collection.name, count: 0});
                                                    });
                                                    this.databases.push(database);
                                                    this.filterDatabase();
                                                    this.filterCollection();
                                                  });
                          });
                        });

  }

  selectDatabase(database: Database, event: any) {
    this.selectedDatabase = database;
    this.collectionService.get(this.selectedDatabase.name)
                          .subscribe(collections  => {
                            this.selectedDatabase.collections = [];
                            collections.forEach(collection => {
                              this.collectionService.count(this.selectedDatabase.name, collection.name)
                                                    .subscribe(count => {
                                                      database.collections.push({name: collection.name, count: count});
                                                      this.filterCollection();
                                                    });
                            });
                            this.filterDatabase();
                          });
    event.preventDefault();
  }

  selectCollection(selectedDatabase: Database, collection: Collection, event: any) {
    event.preventDefault();
    this.router.navigate(['/collection', collection.name, JSON.stringify(selectedDatabase)]);
  }

  filterDatabase() {
    this.filteredDatabases = [];
    const regexpName = new RegExp(this.searchDbName, 'i');
    this.databases.forEach(database => {
      if (!this.searchDbName) {
          this.filteredDatabases.push(database);
      } else {
        if (regexpName.test(database.name)) {
          this.filteredDatabases.push(database);
        }
      }
    });
  }

  filterCollection() {
    if (this.selectedDatabase) {
      this.filteredCollection = [];
      const regexpName = new RegExp(this.searchCollectionName, 'i');
      this.selectedDatabase.collections.forEach(collection => {
        if (!this.searchCollectionName) {
            this.filteredCollection.push(collection);
        } else {
          if (regexpName.test(collection.name)) {
            this.filteredCollection.push(collection);
          }
        }
      });
    }
  }

  setDefaultServer() {
    this.serverService.setDefault()
                      .subscribe(response  => {
                        this.listDatabases();
                      });
  }

  changeServer() {
    this.serverService.changeServer(this.host, this.port, this.username, this.password)
                      .subscribe(response  => {
                        this.listDatabases();
                      });
  }

}
