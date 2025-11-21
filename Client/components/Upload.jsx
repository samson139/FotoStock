import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from "react-query";
import customFetch from '../src/utils/utils';

const Upload = () => {
  const queryClient = useQueryClient();
  const { firstname } = useOutletContext();
  const [imagename, setImagename] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState("");
  const [imageFile, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    setIsImageLoaded(true);
  }

  const { mutate: upload, isLoading } = useMutation({
    mutationFn: (formData) => customFetch.post("/uploadimage", formData, {
      withCredentials: true,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast.success("Image uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Error uploading image.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile || !imagename || !price || !firstname || !description) {
      toast.error("Please fill in all fields.");
      return;
    }
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("imagename", imagename);
    formData.append("price", price);
    formData.append("username", firstname);
    formData.append("description", description);
    upload(formData);

    setImagename("");
    setPrice("");
    setDescription("");
    setImage(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-100 via-gray-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">


      {/* Right Side — Form */}
      <form
        className="
      w-full md:w-1/2 lg:w-1/3 
      bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col gap-6
      border border-gray-200 dark:border-gray-700 transition-all duration-500
      hover:shadow-3xl hover:scale-[1.01]
    "
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-amber-200 text-center mb-6 tracking-tight">
          Upload New Image
        </h2>

        {/* Image Name */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="md:w-1/3 text-gray-700 dark:text-amber-100 font-semibold">Image Name:</label>
          <input
            type="text"
            value={imagename}
            onChange={(e) => setImagename(e.target.value)}
            className="md:w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-amber-400 transition"
            placeholder="Enter image title"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="md:w-1/3 text-gray-700 dark:text-amber-100 font-semibold">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="md:w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-amber-400 transition"
            placeholder="Enter price in $"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <label className="md:w-1/3 text-gray-700 dark:text-amber-100 font-semibold mt-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={1000}
            className="md:w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-amber-400 transition resize-none"
            placeholder="Describe your image..."
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="md:w-1/3 text-gray-700 dark:text-amber-100 font-semibold">Select Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="md:w-2/3 file-input file-input-bordered file-input-info w-full rounded-lg"
            required
          />
        </div>

        {/* Preview */}
        {isImageLoaded && imageFile && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl shadow-lg mt-4 border border-gray-300 dark:border-gray-600"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !isImageLoaded || !imagename || !price || !description}
          className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-amber-400 dark:to-orange-400 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

    </div>

  )
}

export default Upload;
