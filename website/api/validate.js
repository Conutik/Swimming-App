const fs = require("fs");
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require("firebase/auth");
const Firebase = require("../../classes/Firebase");

module.exports = {
    name: "/api/signup", // add the url path where its located " / " is the main one aka index
    run: async (req, res) => {

        const instance = Firebase.getInstance()
        const auth = getAuth(instance)

        createUserWithEmailAndPassword(auth, "khawaj.zaid@gmail.com", "123456")
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: "Conutik"
          })
          res.send({ receive: true, user: user })
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          res.send({ msg: errorMessage })
          // ..
        });


    

    }
}