var miio = require('miio');
var Service, Characteristic;

module.exports = function (homebridge) {

    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-xiaomi-power-strip', 'XiaoMiPowerStrip', XiaoMiPowerStrip);
}

function XiaoMiPowerStrip(log, config) {
    this.log = log;
    this.name = config.name || 'Power Strip';
    this.address = config.address;
    this.token = config.token;
    this.model = config.model;

    this.services = [];

    this.switchService = new Service.Switch(this.name);

    this.switchService
       .getCharacteristic(Characteristic.On)
       .on('get',this.getPowerState.bind(this))
       .on('set',this.setPowerState.bind(this));

    this.services.push(this.switchService);

    this.serviceInfo = new Service.AccessoryInformation();

    this.serviceInfo
        .setCharacteristic(Characteristic.Manufacturer, 'Xiaomi')
        .setCharacteristic(Characteristic.Model, 'Power-Strip')
        .setCharacteristic(Characteristic.SerialNumber, '62810821');

    this.services.push(this.serviceInfo);

    this.discover();
}

XiaoMiPowerStrip.prototype = {
    discover: function () {
        var accessory = this;
        miio.device({
            address: accessory.address,
            token: accessory.token,
            model: accessory.model
        })
        .then(d=>{accessory.device=d});
    },

    getPowerState: function (callback) {
        if(!this.device){
            callback(null, false);
            return;
        }

        this.device.call("get_prop",["power"])
            .then(res=>{
                on = res[0]==="on";
                this.log.info("getPowerState:",on);
                callback(null,on);
            });
    },

    setPowerState: function (state, callback) {
        this.log.info('setPowerState:', state);

        if(!this.device){
            callback(new Error('Mi Smart Power Strip not found'));
            return;
        }

        this.device.setPower(state);
        callback();
    },

    identify: function(callback) {
        callback();
    },

    getServices: function () {
        return this.services;
    }
};
