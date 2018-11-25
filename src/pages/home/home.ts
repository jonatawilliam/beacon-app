import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IBeacon, IBeaconPluginResult } from '@ionic-native/ibeacon';

import { DetailPage } from '../detail/detail';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private static readonly BEACONS_UUID = 'FE913213-B311-4A42-8C16-47FAEAC938DB';
  private static readonly BEACON_1 = 'beacon1';
  private static readonly BEACON_2 = 'beacon2';
  private beacon1Fired = false;
  private beacon2Fired = false;

  constructor(
    private navCcntroller: NavController,
    private ibeacon: IBeacon,
  ) {
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    delegate.didEnterRegion()
      .subscribe(
        beacon => this.handleBeacon(beacon),
        error => console.error('didEnterRegion', error)
      );

    const beacon1 = this.ibeacon.BeaconRegion(
      HomePage.BEACON_1,
      HomePage.BEACONS_UUID,
      5780
    );

    const beacon2 = this.ibeacon.BeaconRegion(
      HomePage.BEACON_2,
      HomePage.BEACONS_UUID,
      5687
    );

    this.ibeacon.startMonitoringForRegion(beacon1);
    this.ibeacon.startMonitoringForRegion(beacon2);
  }

  private handleBeacon(beacon: IBeaconPluginResult) {
    if (!beacon.region.identifier) return;

    switch (beacon.region.identifier) {
      case HomePage.BEACON_1:
        this.handleBeacon1();
        break;
      case HomePage.BEACON_2:
        this.handleBeacon2();
        break;
      default:
        break;
    }
  }

  private handleBeacon1() {
    if (this.beacon1Fired) return;

    this.beacon1Fired = true;
    cordova.plugins.notification.local.schedule({
      title: 'Promoçao time do coraçao.',
      text: 'Use o código TIME15 para comprar'
            + ' uma camisa do seu time do coraçao'
            + ' com 15% de desconto',
      foreground: true
    });
  }

  private handleBeacon2() {
    if (this.beacon2Fired) return;

    this.beacon2Fired = true;
    this.navCcntroller.push(DetailPage);
  }

}
