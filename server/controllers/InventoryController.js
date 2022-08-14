
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
    const {camp, storeId, itemId, change, userInfo, itemName,date} = req.body.params;
    const {uid,name} = userInfo;
    console.log(req.body.params);
    const keys = await findRelativePath(camp,storeId);
    const userRef = ref(rtimeDb, `Invent/data/${keys.campKey}/storeData/${keys.storeKey}/storeItems/${itemId-1}`);
    console.log(keys);
    const item = await get(userRef)
    .then((snapshot)=>
    {
       return snapshot.val();
    })
    .catch((err)=> res.status(400).json("Something went wrong!"))

    await set(userRef, {
        description: item.description,
        itemId: item.itemId,
        name: item.name,
        quantity: (item.quantity + change)
      })
      .then(() => {
        console.log("success",item.quantity + change);
        updateStoreActivities(uid,name,camp,storeId,itemId,itemName,change,date);
        res.status(200).json("successfully updated quantity")
      })
      .catch((error) => {
        return res.status(400).json("Something went wrong!");
    });
}

const updateStoreActivities = (uid,name,camp,storeId,itemId,itemName,change,date) => 
{

    //key for unique storeID in a camp 
    const key = camp+storeId;
    const activityRecord ={uid,name,itemName,change,date}

    const StoreRef = ref(rtimeDb,`StoreActivities/${key}`)
    try{
        if (change!=0)
        {
            push(StoreRef,activityRecord)
        }
        else
        {
            console.log("nth was updated since change in quantity is 0!")
        }
    }
    catch
    {
        throw new Error("unable to update store activities!")
    }
      

}

const updateUserActivities = async(req,res) =>
{
    console.log("updating user activities")
    console.log(req.body.params);

    //destructuring data and organizing it into individual transaction activities
    const records = [];
    const {camp,storeId,activities,uid} =  req.body.params;
    for (var i =0; i< activities.length;i++)
    {
        const record = {"camp": camp, "storeId": storeId, "name": activities[i].name , "quantity": activities[i].quantity, "date": activities[i].date };
        records.push(record);
    }
    console.log(records);

    //updating data to db
    const userRef = ref(rtimeDb, `UserActivites/${uid}/`);
    try{
        records.forEach((record)=>
        {
            push(userRef,record);
        })
        res.status(200).json("successfully updated activities!");
    }
    catch(err)
    {
        res.status(400).json("smth went wrong!")
    }

}

const getAllUserActivities = (req,res) =>
{
    console.log("getAllUserActivities")
    const {uid} = req.query;
    const userRef = ref(rtimeDb, `UserActivites/${uid}/`);

    get(userRef)
    .then((snapshot)=>
    {
        if (snapshot.exists())
        {
            res.status(200).json(snapshot.val());
        }
        else
        {
            res.status(400).json("You do not have any activity yet!");
        }
    })
    .catch((err)=>
    {
        console.log(err);
        res.status(400).json("smth went wrong!");
    })
    return;
}

const getAllStoreActivities = (req,res)=>
{
    const {camp,storeId} = req.query;
    const key = camp + storeId;
    console.log(key)

    // get request to firebase db to fetch all the store activities



    const storeRef = ref(rtimeDb,`StoreActivities/${key}/`)
    const records = [];
    get(storeRef)
    .then((snapshot)=>
    {
        console.log("getting all records for this store!")
        console.log(snapshot.val());
        snapshot.forEach((snap)=>
        {
            console.log("______")
            console.log(snap.val());
            records.push(snap.val())
        })
        console.log( "records here")
        res.status(200).json(records);
        
    }
    )
    .catch((err)=>
    {
        console.log(err);
        res.status(400).json(err)
    })

}

module.exports = {authenticateStoreEntry, 
                    getAllStoreItems,
                    updateStoreItemQuantity,
                    updateUserActivities,
                    getAllUserActivities,
                    getAllStoreActivities}