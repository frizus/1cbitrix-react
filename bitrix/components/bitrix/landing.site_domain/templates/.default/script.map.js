{"version":3,"sources":["script.js"],"names":["BX","namespace","Landing","SiteDomainHelper","params","this","idDomainName","idDomainMessage","idDomainLoader","classes","dangerBorder","successBorder","dangerAlert","successAlert","idDomainNameParent","parentNode","prototype","showLoader","clearMessage","show","hideLoader","hide","isLoaderShowed","style","display","setSuccess","successMessage","setMessage","setError","errorMessage","isErrorShowed","hasClass","message","error","addClass","innerHTML","removeClass","SiteDomainInput","domainId","domainName","domainPostfix","idDomainDnsInfo","idDomainSubmit","previousDomainName","helper","submit","bind","debounce","event","keyupCallback","checkSubmit","fillDnsInstruction","domainNameIsEmpty","value","util","trim","PreventDefault","ajax","url","method","data","domain","filter","!ID","sessid","dataType","onsuccess","type","result","available","deleted","rows","cells","length","cNameRecordRow","aRecordRow","domainParts","split","domainRe","textContent","match","SiteDomainPrivate","SiteDomainBitrix24","SiteDomainFree","idDomainCheck","idDomainAnother","idDomainAnotherMore","saveBlockerInfo","promoCloseIcon","promoCloseLink","promoBlock","maxVisibleSuggested","parseInt","tld","closePromoBlock","showMoreDomains","checkDomain","remove","height","children","offsetHeight","classList","add","top","UI","InfoHelper","selectSuggested","fillSuggest","suggest","i","c","push","create","props","className","attrs","name","id","events","click","for","text","appendChild","enable"],"mappings":"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","file":"script.map.js"}