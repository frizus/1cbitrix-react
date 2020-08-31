{"version":3,"sources":["hardware.js"],"names":["lsKey","defaultMicrophone","defaultCamera","defaultSpeaker","enableMicAutoParameters","preferHd","HardwareManager","this","initialized","_currentDeviceList","updating","Object","defineProperty","get","_getDeviceMap","bind","microphoneId","localStorage","getItem","microphoneList","set","setItem","cameraId","cameraList","speakerId","audioOutputList","preferHdQuality","prototype","init","Promise","resolve","reject","enumerateDevices","then","deviceList","navigator","mediaDevices","addEventListener","BX","debounce","onNavigatorDeviceChanged","catch","devices","hasCamera","Error","keys","length","getMicrophoneList","values","filter","deviceInfo","kind","getCameraList","getSpeakerList","canSelectSpeaker","HTMLMediaElement","updateDeviceList","e","removedDevices","addedDevices","forEach","index","findIndex","dev","deviceId","splice","push","onCustomEvent","added","removed","deviceKind","result","i","label","Call","Hardware"],"mappings":"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","file":"hardware.map.js"}