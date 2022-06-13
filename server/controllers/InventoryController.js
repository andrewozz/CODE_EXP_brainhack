
const db = require("../firebaseDB.js"); //intisalise db connection
const {getDatabase,ref,update,child,set,get,push,remove,} = require("firebase/database");
const rtimeDb = getDatabase();

const authenticateStoreEntry = async (req,res) =>
{
    console.log("authenticating store entry...");
    const {camp,storeId, password} = req.body.params;    
    var campExists = false;
    var storeExists = false;

    //getting firebase db
    const userRef = ref(rtimeDb, "Invent/data/");
    await get(userRef)
    .then((snapshot)=>{
        snapshot.forEach((snap)=>
        {
            console.log("---------------------------")
            if (snap.val().campName === camp) // check the camp entered in the field
            {
                campExists = true;
                const stores = snap.val().storeData;
                //check the store entered in the field has correct password
                (stores).forEach((store)=>
                {
                    // console.log(store.val())
                    if (store.id === storeId)
                    {
                        storeExists = true;
                        if (store.password !== password)
                        {
                            return res.status(400).json("wrong password for store!");

                        }
                        else
                        {
                            console.log("correct pw");
                            res.status(200).json("Successful!");
                        }
                    }
                })               
            }
        })

    })
    .catch((err)=> console.log(err));
    if (campExists === false) return res.status(400).json("camp does not exist!");
    else if (storeExists === false) return res.status(400).json("store does not exist!");
    else return;

}


const getAllStoreItems = (req,res) =>
{

    console.log("hello")
    const {camp,storeId} = req.query;
    // console.log("getting all inventory items now for", camp, storeId);


    //Retrieving store items from database
    const userRef = ref(rtimeDb, "Invent/data/");
    get(userRef)
    .then((snapshot)=>{
        snapshot.forEach((snap)=>
        {
            if (snap.val().campName === camp) // check the camp entered in the field
            {
                const stores = snap.val().storeData;
                (stores).forEach((store)=>
                {
                    // console.log(store.val())
                    if (store.id === storeId)
                    {
                        // managed to find the storeId
                        res.status(200).json({"items":store.storeItems });

                    }
                })               
            }
        })

    })
    .catch((err)=> res.status(400).json(err))

}

const findRelativePath = async (camp,storeId) =>
{

    const userRef = ref(rtimeDb, "Invent/data/");
    var campKey = 0;
    var storeKey = 0;
    var keys = {}
    await get(userRef)
    .then((snapshot)=>{
        snapshot.forEach((snap)=>
        {
            campKey = snap.key;
            if (snap.val().campName === camp) // check the camp entered in the field
            {
                const stores = snap;
                (stores).forEach((store)=>
                {
                    console.log(store.val())
                    store.forEach((innerstore)=>{
                        if (innerstore.val().id === storeId)
                        {
                            // managed to find the storeId
                            storeKey = innerstore.key;
                            keys = ({"campKey": campKey, "storeKey": storeKey});
                        }

                    })
                })               
            }
        })

    })
    .catch((err)=> console.log(err));
    return keys;
}

const updateStoreItemQuantity = async (req,res) =>
{
    const {camp, storeId, itemId, change} = req.body.params;
    console.log(camp,storeId,itemId,change);
    const keys = await findRelativePath(camp,storeId);
    const userRef = ref(rtimeDb, `Invent/data/${keys.campKey}/storeData/${keys.storeKey}/storeItems/${itemId-1}`);
    console.log(keys);
    const item = await get(userRef)
    .then((snapshot)=>
    {
       return snapshot.val();
    })
    .catch((err)=> res.status(400).json("smth went wrong!"))

    await set(userRef, {
        description: item.description,
        itemId: item.itemId,
        name: item.name,
        quantity: (item.quantity + change)
      })
      .then(() => {
        console.log("success",item.quantity + change);
        res.status(200).json("successfully updated quantity")
      })
      .catch((error) => {
        return res.status(400).json("smth went wrong!");
    });


    



}

module.exports = {authenticateStoreEntry, getAllStoreItems, updateStoreItemQuantity}