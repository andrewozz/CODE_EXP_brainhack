
const db = require("../firebaseDB.js"); //intisalise db connection
const {getDatabase,ref,update,child,set,get,push,remove,} = require("firebase/database");
const rtimeDb = getDatabase();


const sendOrderItem = (req,res) =>
{
    console.log("sending order item");
    console.log(req.body.params)
    const item = req.body.params;
    const {campName, storeIdName} = item;
    const key = campName+storeIdName;
    const orderRef = ref(rtimeDb,`Orders/${key}`)
    
    push(orderRef,item)
    .then(()=>{
        res.status(200).json("success!")
    })
    .catch((err)=>res.status(400).json(err))


}

module.exports = {sendOrderItem}

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