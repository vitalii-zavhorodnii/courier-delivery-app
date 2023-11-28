/* eslint-disable no-magic-numbers */
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import {
  sendCoordinates,
  updateLocationPermission
} from '../store/actions/location';
import { dismissMessage, showMessage } from '../store/actions/snackBar';
import store from '../store';
import { platform } from '../utils/platform';
import i18n from './i18n';

const GEOLOCATION_OPTIONS = {
  timeout: 3000,
  distanceFilter: 0,
  authorizationLevel: 'always'
};

Geolocation.setRNConfiguration(GEOLOCATION_OPTIONS);

class TrackingManager {
  async initialize() {
    await Manager.initializePermission();
    await Manager.initializeDelivery();
  }

  async initializePermission() {
    const { dispatch, getState } = store;
    const { orders } = await getState().orders;
    const isThereAnyOrders = !!orders?.length;
    const PERMISSION_CONSTANTS = {
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_ALWAYS
    };

    let locationGranted = await Manager.checkPermission(
      PERMISSION_CONSTANTS[platform]
    );

    let isPermissionsGranted = locationGranted === RESULTS.GRANTED;

    if (!isPermissionsGranted) {
      locationGranted = await Manager.requestPermission(
        PERMISSION_CONSTANTS[platform]
      );
      isPermissionsGranted = locationGranted === RESULTS.GRANTED;
    }

    if (!isPermissionsGranted && isThereAnyOrders) {
      await dispatch(
        showMessage({ message: i18n.t('Службы геолокации выключены') })
      );
    } else {
      dispatch(dismissMessage());
    }

    await dispatch(updateLocationPermission(locationGranted));

    return { locationGranted };
  }

  async initializeDelivery() {
    const { getState } = store;
    const { isDeliveryStarted } = await getState().orders;

    if (isDeliveryStarted) {
      Manager.start();
    } else {
      Manager.stop();
    }
  }

  async checkPermissions() {
    const { dispatch } = store;
    const locationGranted = await Manager.checkPermission(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    await dispatch(updateLocationPermission(locationGranted));
  }

  async start() {
    const { dispatch } = store;

    BackgroundTimer.runBackgroundTimer(() => {
      Geolocation.getCurrentPosition(async (data) => {
        await dispatch(
          sendCoordinates({
            latitude: `${data?.coords.latitude}`,
            longitude: `${data?.coords.longitude}`
          })
        );
      });
    }, 30000);
  }

  async stop() {
    BackgroundTimer.stopBackgroundTimer();
  }

  getLocation(callback) {
    Geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;

      callback({ latitude: `${latitude}`, longitude: `${longitude}` });
    });
  }

  async requestPermission(permission) {
    const granted = await request(permission);

    return granted;
  }

  async checkPermission(permission) {
    const granted = await check(permission);

    return granted;
  }
}

const Manager = new TrackingManager();

export default Manager;
