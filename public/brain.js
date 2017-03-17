/**
 *
 * Brain!!!!!
 *
 */

var brain = {};
brain.eventSubscriptions = {};
brain.dataValues = {};


brain.subscribeToEvent = function (event, func, componentRef) {

    if (typeof func !== 'function') {
        return;
    }

    var funcObj = {
        func: func,
        componentRef: componentRef
    };

    if (typeof brain.eventSubscriptions[event] === 'undefined') {
        brain.eventSubscriptions[event] = [funcObj];
    } else {
        if (brain.eventSubscriptions[event].indexOf(funcObj) == -1) {
            brain.eventSubscriptions[event].push(funcObj);
        }
    }
};


brain.broadcastEvent = function (event, data) {
    var list = brain.eventSubscriptions[event];

    _.each(list, function (funcObj, index) {

        if (typeof funcObj !== 'object') {
            return;
        }

        var componentRef = funcObj.componentRef;
        if (componentRef && typeof componentRef.isMounted === 'function') {
            if (!componentRef.isMounted()) {
                delete brain.eventSubscriptions[event][index];
                return;
            }
        }

        var func = funcObj.func;
        if (typeof func === 'function') {
            func.call(this, data);
        }
    });


    brain.eventSubscriptions[event] = _.filter(list, function(funcObj){
        return typeof funcObj === 'object';
    });

};


brain.setData = function (address, data) {
    var d = new Date();
    brain.dataValues[address] = {
        data:  data,
        timestamp: d.getTime()
    };

};

brain.getData = function (address) {
    var data = brain.dataValues[address];
    if (typeof data === 'undefined') {
        return false;
    }

    return data.data;
};

brain.updateData = function(address, data) {
    brain.setData(address, data);
    brain.broadcastEvent(address, data);
};


brain.subscribeToData = function(address, func, componentRef) {
    brain.subscribeToEvent(address, func, componentRef);
};


brain.subscribeToAJAXDataPoint = function (dataPointObj, func, componentRef) {
    var address = brain.generateAddressOfAJAXDataPoint(dataPointObj);
    brain.subscribeToEvent(address, func, componentRef);
};

brain.syncAJAXDataPoint = function (dataPointObj, forceLoadFromServer, callback, preventBroadcast) {

    var address = brain.generateAddressOfAJAXDataPoint(dataPointObj);
    var url = dataPointObj.url;
    var params = dataPointObj.params;

    if (typeof brain.dataValues[address] === 'undefined' || forceLoadFromServer) {
        $.ajax({
            type: "GET",
            url: App.baseURL + url,
            dataType: 'json',
            data: params,
            cache: false,
            error: function(d) {}
        }).done(function(data) {
            if (!preventBroadcast) {
                brain.updateData(address, data);
            }
            if (typeof callback == 'function'){
                callback.call(this, data);
            }

        });

        brain.dataValues[address] = 'PROMISED';
        return true; //sync from server

    } else if (brain.dataValues[address] === 'PROMISED') {
        //Nothing, waiting for promise complete
        return false; //no sync from server
    } else {
        var value = brain.getData(address);
        brain.broadcastEvent(address, value);
        return false; //no sync from server
    }
};



brain.generateAddressOfAJAXDataPoint = function (dataPointObj) {
    var url = dataPointObj.url;
    var params =  dataPointObj.params;

    var address = url.replace(/\//g, "_");

    var paramsString = '';
    var paramsKeys = [];
    _.each(params, function(v, k) {
        paramsKeys.push(k);
    });

    paramsKeys.sort();

    _.each(paramsKeys, function(k) {
        paramsString += k + '_' + params[k] + '_';
    });
    paramsString += 'address';

    address += '_params_' + paramsString;

    return address;

};
