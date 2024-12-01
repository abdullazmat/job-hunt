import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"], // enum is used where we have select some value.
      required: true,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [
        {
          type: String,
        },
      ],
      resume: {
        type: String, // URL of the resume
      },
      resumeOriginalName: {
        type: String,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId, // Refers to the Company id
        ref: "Company",
      },
      profilePhoto: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
