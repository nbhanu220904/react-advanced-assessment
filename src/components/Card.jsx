import React, { useState, useEffect } from "react";
import { Mail, Phone, Globe, Heart, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const Card = ({ user, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState(user);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(user);
    }
  }, [open, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(formData);
    setOpen(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setOpen(false);
  };

  return (
    <div className="w-85 h-100 border border-gray-300 rounded-sm shadow bg-white flex flex-col overflow-hidden">
      <div className="flex justify-center items-center bg-gray-200 h-40">
        {/* <img
          src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          alt="user avatar"
          className="w-20 h-20 rounded-full border border-gray-300"
        /> */}
        <img
          src={user.avatar}
          alt={`${user.username} avatar`}
          className="w-40 h-40  border border-gray-200 object-cover"
        />
      </div>

      <div className="p-4 flex-1">
        <h2 className="text-base font-semibold">{user.name}</h2>
        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
          <Mail size={16} />
          <a
            href={`mailto:${user.email}`}
            className="hover:underline break-all"
          >
            {user.email}
          </a>
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
          <Phone size={16} />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
          <Globe size={16} />
          <a
            href={
              user.website.startsWith("http")
                ? user.website
                : `http://${user.website}`
            }
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {user.website}
          </a>
        </div>
      </div>

      <div className="flex justify-around border-t p-3 text-gray-500">
        <button className="hover:text-red-500" onClick={() => setLiked(!liked)}>
          <Heart
            size={18}
            className="cursor-pointer"
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : "currentColor"}
          />
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Edit size={18} className="cursor-pointer hover:text-blue-500" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white shadow-lg rounded-lg p-6">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  <span className="text-red-500">*</span> Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  <span className="text-red-500">*</span> Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  <span className="text-red-500">*</span> Phone:
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  <span className="text-red-500">*</span> Website:
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-1 rounded border bg-gray-100 hover:bg-gray-200"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                type="button"
              >
                OK
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <button
          className="hover:text-red-600"
          onClick={() => onDelete(user.id)}
        >
          <Trash2 size={18} className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Card;
