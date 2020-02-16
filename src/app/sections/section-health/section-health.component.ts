import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { Server } from '../../shared/server';
import { Observable, timer } from 'rxjs';
import { AnonymousSubscription } from 'rxjs-compat/Subscription';
import { ServerMessage } from 'src/app/shared/server-message';

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  constructor(private _serverService: ServerService) { }

  servers: Server[];
  timeSubscription: AnonymousSubscription;

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  refreshData() {
    this._serverService.getServers().subscribe(res => {
      this.servers = res;
    });

    this.subscribeToData();
  }

  subscribeToData() {
    const numbers = timer(5000);
    this.timeSubscription = numbers.subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg)
      .subscribe(res => console.log('Message sent to server: ', msg),
                 err => console.log('Error: ', err));
  }
}
