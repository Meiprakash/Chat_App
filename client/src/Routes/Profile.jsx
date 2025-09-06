import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/chat-app-assets/assets";
import AuthContaxt from "../../Contaxt/AuthContaxt";

function Profile() {

  const {authUser , updateProfile } = useContext(AuthContaxt)

  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const [name, setname] = useState(authUser.fullname);
  const [bio, setbio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      await updateProfile({ fullname: name, bio })
      navigate("/home");
      return

    }

  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div
        className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-centre justify-between max-sm:flex-col-reverse
          rounded-lg"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg text-gray-900">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer text-gray-900"
          >
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg , .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              className={`w-12 h-12 ${image && "rounded-full"}`}
            />
            Upload Profile image
          </label>

          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            className="text-gray-900 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2"
          />
          <textarea
            onChange={(e) => setbio(e.target.value)}
            value={bio}
            placeholder="Write Your bio"
            className="text-gray-900 gap-5 border border-gray-500 rounded-2xl"
            required
          ></textarea>
          <button
            type="submit"
            className="text-gray-900 border rounded-2xl w-20 gap-5 cursor-pointer"
          >
            Save
          </button>
        </form>
        <img
          src="yoyo-logo.png"
          alt=""
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${
            image && "rounded-full"
          }`}
        />
      </div>
    </div>
  );
}

export default Profile;
