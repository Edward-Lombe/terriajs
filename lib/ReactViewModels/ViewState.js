'use strict';

/*global require*/
var knockout = require('terriajs-cesium/Source/ThirdParty/knockout');
import addedByUser from '../Core/addedByUser';
import MouseCoords from './MouseCoords';
import SearchState from './SearchState';

/**
 * Root of a global view model. Presumably this should get nested as more stuff goes into it. Basically this belongs to
 * the root of the UI and then it can choose to pass either the whole thing or parts down as props to its children.
 */

export default class ViewState {
    constructor(locationSearchProviders) {
        this.mobileViewOptions = Object.freeze({
            data: 'data',
            preview: 'preview',
            nowViewing: 'nowViewing',
            search: 'search'
        });

        this.componentOrderOptions = Object.freeze({
            chart: 0,
            featureInfoPanel: 1,
            modelWindow: 2
        });

        this.searchState = new SearchState(locationSearchProviders);

        this.previewedItem = undefined;
        this.userDataPreviewedItem = undefined;
        this.modalVisible = false;
        this.modalTabIndex = 0;
        this.isDraggingDroppingFile = false;
        this.mobileView = null;
        this.componentOnTop = this.componentOrderOptions.chart;
        this.isMapFullScreen = false;

        this.notifications = [];

        knockout.track(this, ['previewedItem', 'modalVisible', 'modalTabIndex', 'userDataPreviewedItem', 'isDraggingDroppingFile', 'mobileView', 'componentOnTop', 'notifications', 'isMapFullScreen']);

        this.mouseCoords = new MouseCoords();
    }

    openWelcome() {
        this.modalVisible = true;
        this.modalTabIndex = 0;
    }

    openAddData() {
        this.modalVisible = true;
        this.modalTabIndex = 1;
    }

    openUserData() {
        this.modalVisible = true;
        this.modalTabIndex = 2;
    }

    searchInCatalog(query) {
        this.openAddData();
        this.searchState.catalogSearchText = query;
    }

    viewCatalogItem(item) {
        if (addedByUser(item)) {
            this.userDataPreviewedItem = item;
            this.openUserData();
        } else {
            this.previewedItem = item;
            this.openAddData();
        }
    }

    toggleModal(bool) {
        this.modalVisible = bool;
    }

    switchMobileView(viewName){
        this.mobileView = viewName;
    }

    switchComponentOrder(component){
        this.componentOnTop = component;
    }

    getNextNotification() {
        return this.notifications[0];
    }

    hideMapUi() {
        return this.getNextNotification() && this.getNextNotification().hideUi;
    }
}