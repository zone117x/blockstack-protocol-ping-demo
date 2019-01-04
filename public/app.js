document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('signin-button').addEventListener('click', function (event) {
    event.preventDefault()
    let manifestFile = "manifest.json";
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        manifestFile = "manifest.dev.json";
    }
    blockstack.redirectToSignIn(window.location.origin + window.location.pathname, window.location.origin + window.location.pathname + manifestFile)
  })
  document.getElementById('signout-button').addEventListener('click', function (event) {
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
  })

  function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
    if (person.avatarUrl()) {
      document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
    }
    document.getElementById('section-1').style.display = 'none'
    document.getElementById('section-2').style.display = 'block'
  }

  if (blockstack.isUserSignedIn()) {
    var profile = blockstack.loadUserData().profile
    showProfile(profile)
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function (userData) {
      window.location = window.location.origin
    })
  }
})
