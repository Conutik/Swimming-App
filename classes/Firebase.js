const { initializeApp } = require("firebase/app")
const admin = require("firebase-admin");
const a = require("../admin.json")

class Firebase {
  construct(firebaseConfig) {
    if(this.app) throw new Error("Already initialized")
    this.app = initializeApp(firebaseConfig);

    if(this.adminApp) throw new Error("Init")
    this.adminApp = admin.initializeApp({
      credential: admin.credential.cert(a)
    })
    
    return true
  }

  getInstance() {
    return this.app;
  }

  getAdminInstance() {
    return this.adminApp;
  }
}

module.exports = new Firebase();
