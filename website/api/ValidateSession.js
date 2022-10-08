const fs = require("fs");
const {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} = require("firebase/auth");
const Firebase = require("../../classes/Firebase");

module.exports = {
  name: "/api/validate", // add the url path where its located " / " is the main one aka index
  run: async (req, res) => {
    const instance = Firebase.getInstance();
    const auth = getAuth(instance);
    const adminInstance = Firebase.getAdminInstance();

    const sessionCookie = req.cookies.session || req.body.cookie || "";

    return adminInstance
      .auth()
      .verifySessionCookie(sessionCookie, true /** check if revoked. */)
      .then(async function (decodedClaims) {
        // Serve content for signed in user.
        if(res.headersSent) return { user: await adminInstance.auth().getUser(decodedClaims.sub) };
        else return res.send({ user: await adminInstance.auth().getUser(decodedClaims.sub) })
      })
      .catch(function (error) {
        // Force user to login.
        console.log(error)
        res.send({ error: true })
      });
  },
};
