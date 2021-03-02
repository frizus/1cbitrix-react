{"version":3,"sources":["util.js"],"names":["BX","namespace","Call","Util","blankAvatar","userData","usersInProcess","updateUserData","callId","users","usersToUpdate","self","this","i","length","hasOwnProperty","push","result","Promise","resolve","reject","CallEngine","getRestClient","callMethod","userIds","then","response","type","isPlainObject","answer","forEach","userId","catch","error","setUserData","getDateForLog","d","Date","getFullYear","lpad","getMonth","getDate","getHours","getMinutes","getSeconds","getMilliseconds","getTimeForLog","str","chr","toString","getUser","getUsers","getUserName","name","getUserAvatar","avatar_hr","isBlank","getUserAvatars","isAvatarBlank","url","getCustomMessage","message","messageText","gender","convertKeysToUpper","replace","match","placeHolder","substr","obj","util","objectClone","k","u","toUpperCase","appendChildren","parent","children","child","appendChild","containsVideoTrack","stream","MediaStream","getVideoTracks","hasHdVideo","videoTrack","trackSettings","getSettings","width","findBestElementSize","height","userCount","bestFilledArea","area","getFilledArea","bestWidth","elementWidth","bestHeight","elementHeight","rowCount","columnCount","Math","ceil","maxElementWidth","maxElementHeight","ratio","neededRatio","expectedElementHeight","expectedElementWidth","isWebRTCSupported","webkitRTCPeerConnection","mozRTCPeerConnection","RTCPeerConnection","isCallServerAllowed","getUserLimit","parseInt","getLogMessage","text","arguments","Error","stack","JSON","stringify","e","getUuidv4","c","r","random","v","alterSDP","sdp","options","sdpLines","split","codecRtpMaps","videoLineIndex","line","exec","rtpmap","codec","sortVideoLine","join","videoLine","rtpMaps","parsedVideoLine","codecsSlice","slice","rtpMapToCodec","rtpMap","sort","a","b","trim","codecA","codecB","concat","endsWith","stopMediaStream","mediaStream","getTracks","track","stop"],"mappings":"CAAC,WAEAA,GAAGC,UAAU,WAEb,GAAGD,GAAGE,KAAKC,KACX,CACC,OAGD,IAAIC,EAAc,iCAElBJ,GAAGE,KAAKC,MACPE,YACAC,kBAEAC,eAAgB,SAASC,EAAQC,GAEhC,IAAIC,KACJ,IAAIC,EAAOC,KACX,IAAK,IAAIC,EAAI,EAAGA,EAAIJ,EAAMK,OAAQD,IAClC,CACC,GAAGD,KAAKP,SAASU,eAAeN,EAAMI,IACtC,CACC,SAGDH,EAAcM,KAAKP,EAAMI,IAG1B,IAAII,EAAU,IAAIC,QAAQ,SAASC,EAASC,GAE3C,GAAGV,EAAcI,SAAW,EAC5B,CACC,OAAOK,IAGRnB,GAAGqB,WAAWC,gBAAgBC,WAAW,oBAAqBf,OAAQA,EAAQgB,QAASd,IAAgBe,KAAK,SAASC,GAEpH,IAAIT,EAASjB,GAAG2B,KAAKC,cAAcF,EAASG,OAAOZ,QAAUS,EAASG,OAAOZ,UAC7ER,EAAMqB,QAAQ,SAASC,GAEtB,GAAGd,EAAOc,GACV,CACCpB,EAAKN,SAAS0B,GAAUd,EAAOc,UAEzBpB,EAAKL,eAAeyB,KAE5BZ,MAEEa,MAAM,SAASC,GAEjBb,EAAOa,EAAMJ,YAIf,IAAK,IAAIhB,EAAI,EAAGA,EAAIH,EAAcI,OAAQD,IAC1C,CACCD,KAAKN,eAAeI,EAAcG,IAAMI,EAEzC,OAAOA,GAGRiB,YAAa,SAAS7B,GAErB,IAAK,IAAI0B,KAAU1B,EACnB,CACCO,KAAKP,SAAS0B,GAAU1B,EAAS0B,KAInCI,cAAe,WAEd,IAAIC,EAAI,IAAIC,KAEZ,OAAOD,EAAEE,cAAgB,IAAM1B,KAAK2B,KAAKH,EAAEI,WAAY,EAAG,KAAO,IAAM5B,KAAK2B,KAAKH,EAAEK,UAAW,EAAG,KAAO,IAAM7B,KAAK2B,KAAKH,EAAEM,WAAY,EAAG,KAAO,IAAM9B,KAAK2B,KAAKH,EAAEO,aAAc,EAAG,KAAO,IAAM/B,KAAK2B,KAAKH,EAAEQ,aAAc,EAAG,KAAO,IAAMR,EAAES,mBAG7OC,cAAe,WAEd,IAAIV,EAAI,IAAIC,KAEZ,OAAOzB,KAAK2B,KAAKH,EAAEM,WAAY,EAAG,KAAO,IAAM9B,KAAK2B,KAAKH,EAAEO,aAAc,EAAG,KAAO,IAAM/B,KAAK2B,KAAKH,EAAEQ,aAAc,EAAG,KAAO,IAAMR,EAAES,mBAGtIN,KAAM,SAASQ,EAAKjC,EAAQkC,GAE3BD,EAAMA,EAAIE,WACVD,EAAMA,GAAO,IAEb,GAAGD,EAAIjC,OAASA,EAChB,CACC,OAAOiC,EAGR,IAAI9B,EAAS,GACb,IAAI,IAAIJ,EAAI,EAAGA,EAAIC,EAASiC,EAAIjC,OAAQD,IACxC,CACCI,GAAU+B,EAGX,OAAO/B,EAAS8B,GAGjBG,QAAS,SAAS1C,EAAQuB,GAEzB,IAAIpB,EAAOC,KACX,OAAO,IAAIM,QAAQ,SAASC,EAASC,GAEpC,GAAGT,EAAKN,SAASU,eAAegB,GAChC,CACC,OAAOZ,EAAQR,EAAKN,SAAS0B,SAEzB,GAAGpB,EAAKL,eAAeS,eAAegB,GAC3C,CACCpB,EAAKL,eAAeyB,GAAQN,KAAK,WAEhC,OAAON,EAAQR,EAAKN,SAAS0B,UAI/B,CACCpB,EAAKJ,eAAeC,GAASuB,IAASN,KAAK,WAE1C,OAAON,EAAQR,EAAKN,SAAS0B,UAMjCoB,SAAU,SAAS3C,EAAQC,GAE1B,IAAIE,EAAOC,KACX,OAAO,IAAIM,QAAQ,SAASC,EAASC,GAEpCT,EAAKJ,eAAeC,EAAQC,GAAOgB,KAAK,WAEvC,IAAIR,KACJR,EAAMqB,QAAQ,SAASC,GAEtBd,EAAOc,GAAUpB,EAAKN,SAAS0B,SAEhC,OAAOZ,EAAQF,QAKlBmC,YAAa,SAAS5C,EAAQuB,GAE7B,IAAIpB,EAAOC,KACX,OAAO,IAAIM,QAAQ,SAASC,EAASC,GAEpC,GAAGT,EAAKN,SAASU,eAAegB,GAChC,CACC,OAAOZ,EAAQR,EAAKN,SAAS0B,GAAQsB,KAAO1C,EAAKN,SAAS0B,GAAQsB,KAAO,SAErE,GAAG1C,EAAKL,eAAeS,eAAegB,GAC3C,CACCpB,EAAKL,eAAeyB,GAAQN,KAAK,WAEhC,OAAON,EAAQR,EAAKN,SAAS0B,GAAQsB,KAAO1C,EAAKN,SAAS0B,GAAQsB,KAAO,UAI3E,CACC1C,EAAKJ,eAAeC,GAAQuB,IAASN,KAAK,WAEzC,OAAON,EAAQR,EAAKN,SAAS0B,GAAQsB,KAAO1C,EAAKN,SAAS0B,GAAQsB,KAAO,UAM7EC,cAAe,SAAS9C,EAAQuB,GAE/B,IAAIpB,EAAOC,KACX,OAAO,IAAIM,QAAQ,SAASC,EAASC,GAEpC,GAAGT,EAAKN,SAASU,eAAegB,GAChC,CACC,OAAOZ,EAAQR,EAAKN,SAAS0B,GAAQwB,YAAcC,EAAQ7C,EAAKN,SAAS0B,GAAQwB,WAAa5C,EAAKN,SAAS0B,GAAQwB,UAAY,SAE5H,GAAG5C,EAAKL,eAAeS,eAAegB,GAC3C,CACCpB,EAAKL,eAAeyB,GAAQN,KAAK,WAEhC,OAAON,EAAQR,EAAKN,SAAS0B,GAAQwB,YAAcC,EAAQ7C,EAAKN,SAAS0B,GAAQwB,WAAa5C,EAAKN,SAAS0B,GAAQwB,UAAY,UAIlI,CACC5C,EAAKJ,eAAeC,GAAQuB,IAASN,KAAK,WAEzC,OAAON,EAAQR,EAAKN,SAAS0B,GAAQwB,YAAcC,EAAQ7C,EAAKN,SAAS0B,GAAQwB,WAAa5C,EAAKN,SAAS0B,GAAQwB,UAAY,UAMpIE,eAAgB,SAASjD,EAAQC,GAEhC,IAAIE,EAAOC,KACX,OAAO,IAAIM,QAAQ,SAASC,EAASC,GAEpCT,EAAKJ,eAAeC,EAAQC,GAAOgB,KAAK,WAEvC,IAAIR,KACJR,EAAMqB,QAAQ,SAASC,GAEtBd,EAAOc,GAAUpB,EAAKN,SAAS0B,GAAQwB,YAAcC,EAAQ7C,EAAKN,SAAS0B,GAAQwB,WAAa5C,EAAKN,SAAS0B,GAAQwB,UAAY,KAEnI,OAAOpC,EAAQF,QAKlByC,cAAe,SAASC,GAGvB,IAAI1C,EAAUuC,EAAQG,GACtB,OAAO1C,GAGR2C,iBAAkB,SAASC,EAASxD,GAEnC,IAAIyD,EACJ,IAAI9D,GAAG2B,KAAKC,cAAcvB,GAC1B,CACCA,KAGD,GAAGA,EAAS0D,QAAU/D,GAAG6D,QAAQ9C,eAAe8C,EAAU,IAAMxD,EAAS0D,QACzE,CACCD,EAAc9D,GAAG6D,QAAQA,EAAU,IAAMxD,EAAS0D,YAGnD,CACCD,EAAc9D,GAAG6D,QAAQA,GAG1BxD,EAAWO,KAAKoD,mBAAmB3D,GAEnC,OAAOyD,EAAYG,QAAQ,UAAW,SAASC,GAE9C,IAAIC,EAAcD,EAAME,OAAO,EAAGF,EAAMpD,OAAS,GACjD,OAAOT,EAASU,eAAeoD,GAAe9D,EAAS8D,GAAeD,KAIxEF,mBAAoB,SAASK,GAE5B,IAAIpD,EAASjB,GAAGsE,KAAKC,YAAYF,GAEjC,IAAI,IAAIG,KAAKvD,EACb,CACC,IAAIwD,EAAID,EAAEE,cAEV,GAAGD,GAAKD,EACR,CACCvD,EAAOwD,GAAKxD,EAAOuD,UACZvD,EAAOuD,IAGhB,OAAOvD,GAGR0D,eAAgB,SAASC,EAAQC,GAEhCA,EAAS/C,QAAQ,SAASgD,GAEzBF,EAAOG,YAAYD,MAIrBE,mBAAoB,SAASC,GAE5B,KAAKA,aAAkBC,aACtB,OAAO,MAER,OAAOD,EAAOE,iBAAiBrE,OAAS,GAGzCsE,WAAY,SAASH,GAEpB,KAAKA,aAAkBC,cAAgBD,EAAOE,iBAAiBrE,SAAW,EACzE,OAAO,MAER,IAAIuE,EAAaJ,EAAOE,iBAAiB,GACzC,IAAIG,EAAgBD,EAAWE,cAE/B,OAAOD,EAAcE,OAAS,MAG/BC,oBAAqB,SAASD,EAAOE,EAAQC,GAE5C,IAAIC,EAAiB,EAErB,IAAK,IAAI/E,EAAI,EAAGA,GAAK8E,EAAW9E,IAChC,CACC,IAAIgF,EAAOjF,KAAKkF,cAAcN,EAAOE,EAAQC,EAAW9E,GACxD,GAAGgF,EAAKA,KAAOD,EACf,CACCA,EAAiBC,EAAKA,KACtB,IAAIE,EAAYF,EAAKG,aACrB,IAAIC,EAAaJ,EAAKK,cAEvB,GAAGL,EAAKA,KAAOD,EACf,CACC,OAGF,OAAQJ,MAAOO,EAAWL,OAAQO,IAGnCH,cAAe,SAASN,EAAOE,EAAQC,EAAWQ,GAEjD,IAAIC,EAAcC,KAAKC,KAAKX,EAAYQ,GACxC,IAAII,EAAkBf,EAAQY,EAC9B,IAAII,EAAmBd,EAASS,EAEhC,IAAIM,EAAQD,EAAmBD,EAC/B,IAAIG,EAAc,EAAI,GAEtB,IAAIC,EACJ,IAAIC,EAEJ,GAAGH,EAAQC,EACX,CACCC,EAAwBH,EACxBI,EAAuBL,GAAmBE,EAAQC,OAGnD,CACCE,EAAuBL,EACvBI,EAAwBH,GAAoBE,EAAcD,GAI3D,IAAIZ,EAAOe,EAAuBD,EAAwBhB,EAE1D,OAAQE,KAAMA,EAAMG,aAAcY,EAAsBV,cAAeS,IAGxEE,kBAAmB,WAElB,cAAeC,yBAA2B,oBAAsBC,sBAAwB,oBAAsBC,mBAAqB,aAGpIC,oBAAqB,WAEpB,OAAOjH,GAAG6D,QAAQ,yBAA2B,KAG9CqD,aAAc,WAEb,GAAItG,KAAKqG,sBACT,CACC,OAAOE,SAASnH,GAAG6D,QAAQ,0BAG5B,OAAOsD,SAASnH,GAAG6D,QAAQ,2BAG5BuD,cAAe,WAEd,IAAIC,EAAOrH,GAAGE,KAAKC,KAAKgC,gBAExB,IAAK,IAAItB,EAAI,EAAGA,EAAIyG,UAAUxG,OAAQD,IACtC,CACC,GAAGyG,UAAUzG,aAAc0G,MAC3B,CACCF,EAAOC,UAAUzG,GAAGgD,QAAU,KAAOyD,UAAUzG,GAAG2G,UAGnD,CACC,IAECH,EAAOA,EAAK,cAAcC,UAAUzG,IAAO,SAAU4G,KAAKC,UAAUJ,UAAUzG,IAAKyG,UAAUzG,IAE9F,MAAO8G,GAENN,EAAOA,EAAK,4BAKf,OAAOA,GAGRO,UAAW,WAEV,MAAO,uCAAuC3D,QAAQ,QAAS,SAAS4D,GACvE,IAAIC,EAAIzB,KAAK0B,SAAW,GAAK,EAAGC,EAAIH,GAAK,IAAMC,EAAKA,EAAI,EAAM,EAC9D,OAAOE,EAAE/E,SAAS,OAIpBgF,SAAU,SAASC,EAAKC,GAEvB,IAAIA,EACJ,CACC,OAGD,IAAIC,EAAWF,EAAIG,MAAM,MACzB,IAAIC,KAEJ,IAAIC,EAAiB,MACrB,IAAK,IAAI1H,EAAI,EAAGA,EAAIuH,EAAStH,OAAQD,IACrC,CACC,IAAI2H,EAAOJ,EAASvH,GAEpB0H,EAAiBA,IAAmBC,EAAKtE,MAAM,aAAe,KAAOrD,EAAI,OACzE,IAAI0H,EACJ,CACC,SAGD,IAAIrE,EAAQ,uBAAuBuE,KAAKD,GACxC,GAAItE,EACJ,CACCoE,EAAatH,MACZ0H,OAAQxE,EAAM,GACdyE,MAAOzE,EAAM,MAKhB,IAAIqE,EACJ,CACC,OAGDH,EAASG,GAAkBK,EAAcR,EAASG,GAAiBD,EAAcH,GACjF,OAAOC,EAASS,KAAK,QAIvB,SAASD,EAAcE,EAAWC,EAASZ,GAE1C,SACA,IAAIa,EAAkBF,EAAUT,MAAM,KACtC,IAAIY,EAAcD,EAAgBE,MAAM,GAExC,IAAIC,KACJJ,EAAQjH,QAAQ,SAASsH,GAExBD,EAAcC,EAAOV,QAAUU,EAAOT,QAGvCM,EAAYI,KAAK,SAASC,EAAGC,GAE5BD,EAAIA,EAAEE,OACND,EAAIA,EAAEC,OAEN,IAAIC,EAASN,EAAcG,GAC3B,IAAII,EAASP,EAAcI,GAE3B,GAAGE,EAAOrF,OAAO,EAAG,KAAO,QAAUsF,EAAOtF,OAAO,EAAG,KAAO,OAC7D,CACC,OAAQ,OAEJ,GAAIqF,EAAOrF,OAAO,EAAG,KAAO,QAAUsF,EAAOtF,OAAO,EAAG,KAAO,OACnE,CACC,OAAO,MAGR,CACC,OAAOkF,EAAIC,KAIb,IAAItI,EAAS+H,EAAgBE,MAAM,EAAG,GAAGS,OAAOV,GAEhD,OAAOhI,EAAO4H,KAAK,KAGpB,SAASrF,EAAQG,GAEhB,cAAc,IAAU,UAAYA,GAAO,IAAMA,EAAIiG,SAASxJ,GAG/D,SAASyJ,EAAgBC,GAExB,IAAKA,aAAuB5E,YAC5B,CACC,OAGD4E,EAAYC,YAAYjI,QAAQ,SAASkI,GAExCA,EAAMC,WA1eR","file":"util.map.js"}