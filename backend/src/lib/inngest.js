import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../modals/User.js";

export const inngest = new Inngest({ id: "Interview" });

const syncUser = inngest.createFunction(
  { id: "sync_user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkID: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""}${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    await upsertStreamUser({
      id: newUser.clerkID.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkID: id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];
