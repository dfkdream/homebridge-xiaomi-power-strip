# homebridge-xiaomi-power-strip

This is a Xiaomi Power Strip plugin for homebridge. 

It has functionality to turn on/off Xiaomi Mi Smart Power Strip from Apple Homekit.

## Dependency

* miio with version ^0.15.6

## Installation

1. Install required dependencies and program

```zsh
npm install -g homebridge-zimi-power-strip "miio@^0.15.6"
```

2. Get token and IP address for your Xiaomi Mi Power Strip by using:

```zsh
miio discover
```

3. Modify config.json in your homebridge setup and add following:

```json
"accessories": [
    {
        "accessory": "XiaoMiPowerStrip",
        "name": "Power Strip",
        "address": "[IP Address from step 2]",
        "token": "[Token from step 2]",
        "model": "zimi.powerstrip.v2"
    }
]
```