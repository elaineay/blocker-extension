// explanation taken from https://ops.tips/blog/extension-to-block-websites/
// Limit the requests for which events are
// triggered.
//
// This allows us to have our code being executed
// only when the following URLs are matched.
//
// ps.: if we were going to dynamically set the
//      URLs to be matched (used a configuration
//      page, for example) we'd then specify the
//      wildcard <all_urls> and then do the filtering
// const urls: [
//     '*://news.ycombinator.com/*'
//   ]

// Extra flags for the `onBeforeRequest` event.
//
// Here we're specifying that we want our callback
// function to be executed synchronously such that
// the request remains blocked until the callback
// function returns (having our filtering taking
// effect).
// const webRequestFlags = [
//   'blocking',
// ]

// Register our function that takes action when a request
// is initiated and matches the provided filter that we
// specified in the options.
//
// Because we outsourced the URL filtering to chrome itself
// all we need to do here is always cancel the request (as
// it matches the filter of unwanted webpages).
// chrome.webRequest.onBeforeRequest.addListener(function(details) {
//     return {cancel: true};
//   },
//   {urls: ["https://news.ycombinator.com/*"]},
//   ["blocking"]
// );

// ======================================= experiments===========

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({websites: nil}, function() {
//     console.log("Currently no websites blocked.");
//   });
//
// // Register our function that takes action when a request
// // is initiated and matches the provided filter that we
// // specified in the options.
// //
// // Because we outsourced the URL filtering to chrome itself
// // all we need to do here is always cancel the request (as
// // it matches the filter of unwanted webpages).
// chrome.webRequest.onBeforeRequest.addListener(function(details) {
//     return {cancel: true};
//   },
//   {urls: ["https://news.ycombinator.com/*"]},
//   ["blocking"]
// );


chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({storedBlockedSite: ''}, function() {
    console.log("Currently no websites blocked.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
