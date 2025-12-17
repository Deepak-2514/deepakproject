import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
  } catch (error) {
    console.error("Error upserting Stream User:", error);
  }
};

export const deleteStreamUser = async (userID) => {
  try {
    await chatClient.deleteUser(userID);
    console.log("Stream User deleted successfully", userID);
  } catch (error) {
    console.error("Error deleting Stream User:", error);
  }
};
