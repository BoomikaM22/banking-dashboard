import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  badge: { type: String, required: true },
  date: { type: String, required: true }
});

export default mongoose.model("Announcement", AnnouncementSchema);
