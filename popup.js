let submitButton = document.getElementById('submitButton')

submitButton.onClicked.addEventListener(function() {
  let blockThisSite = document.getElementById('blockThisSite');
  chrome.storage.sync.set({storedBlockedSite: blockThisSite}, function() {
    console.log("Blocked site:" + blockThisSite);
  });
});
