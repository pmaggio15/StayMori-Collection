import User from "../models/User.js";
import { Webhook } from "svix";


const clerkWebHooks = async () => {
    try {
        //create a svix instance with clerk
        const Whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        //verifying headers
        await Whook.verify(JSON.stringify(req.body, headers))

        //getting data from req body
        const {data, type} = req.body

        const urserData = {
            _id: data.id,
            email: data.emailaddresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }

        //switch cases for different events

        switch (type) {
            case "user.created": {
                await User.create(userData);
                break;
            }
            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }
        
            default:
                break;
        }
        res.json({success: true, message: "Webhook recieved"
        })
    }
    catch {
        console.log(error.message);
        res.json({success: false, message: error.messgea});
    }
}

export default clerkWebHooks;
