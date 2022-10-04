const fs = require("fs");
const {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const Firebase = require("../../classes/Firebase");

module.exports = {
  name: "/api/login", // add the url path where its located " / " is the main one aka index
  run: async (req, res) => {
    console.log(req.body);

    const instance = Firebase.getInstance();
    const adminInstance = Firebase.getAdminInstance();
    const auth = getAuth(instance);
    let data = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    // console.log(data._tokenResponse.idToken)
    // res.send({ auth: auth.currentUser });

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // We could also choose to enforce that the ID token auth_time is recent.
    adminInstance
      .auth()
      .verifyIdToken(data._tokenResponse.idToken)
      .then(function (decodedClaims) {
        // In this case, we are enforcing that the user signed in in the last 5 minutes.
        if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
          return adminInstance
            .auth()
            .createSessionCookie(data._tokenResponse.idToken, { expiresIn: expiresIn });
        }
        throw new Error("UNAUTHORIZED REQUEST!");
      })
      .then(function (sessionCookie) {
        // Note httpOnly cookie will not be accessible from javascript.
        // secure flag should be set to true in production.
        const options = {
          maxAge: expiresIn,
          httpOnly: true,
          secure: false /** to test in localhost */,
        };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      })
      .catch(function (error) {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      });
  },
};
