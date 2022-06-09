
const db = require("../firebaseDB.js"); //intisalise db connection
const {getDatabase,ref,update,child,set,get,push,remove,} = require("firebase/database");
const rtimeDb = getDatabase();

const createUserAccount = async (req,res) =>
{
    console.log( "creating user acct!")
    const userRef = ref(rtimeDb, "Accounts/");
    const accountDetails = req.body.params;    
    // Perform validations such as no repeat of emails or usernames
    var validated = true;
    await get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        //iterate through snapshot
        snapshot.forEach((snap) =>
        {
          const snapAccountInfo = snap.val();
          if (snapAccountInfo.email === accountDetails.email)
          {
            validated = false;
            throw new Error("Email has already been registered!");
          }
        })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error.message);
      res.status(400).json(error.message);
      return;
    });

    // Add account to firebase database to store user accounts if validated == true
    if (validated === true)
    {
      await push(userRef,accountDetails)
      .then(() => res.status(200).json("success"))
      .catch((err) => res.status(400).json(err));
    }
    return;
}

const authenticateUserAccount = (req,res) =>
{
  const accountDetails = req.query;
  console.log(accountDetails)
  const userRef = ref(rtimeDb, "Accounts/");
  get(userRef) // then connsists of a function for uthentication that wd run after get fetches data
  .then((snapshot)=>
  {
    if (snapshot.exists()) {
      var emailExists = false;
      snapshot.forEach((snap)=>
      {
        const accountId = snap.key;
        const snapAccountInfo = snap.val();
        if (snapAccountInfo.email === accountDetails.email)
        {
          emailExists = true;
          console.log(snapAccountInfo.password, snapAccountInfo.email);
          console.log(snapAccountInfo.password === accountDetails.password )
          //correct pw for email acct
          if (snapAccountInfo.password === accountDetails.password){console.log("success");return res.status(200).json({msg: "successfully logged in!", uid: accountId, name: snapAccountInfo.name});}
          else
          {
            //wrong password entered for the email acct
            console.log("wrong pw");
            res.status(400).json("wrong password!");
          }
        }
      })
    } else {
      console.log("Something went wrong! PLease try again");
    }
    if (emailExists === false) return res.status(400).json("Email does not exist!");
  })
  .catch((err)=>res.status(400).json("Something went wrong!")); 
}

module.exports = {createUserAccount,
                  authenticateUserAccount}