import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from "react-query";
import customFetch from '../src/utils/utils';

const Upload = () => {
  const queryClient = useQueryClient();
  const { firstname } = useOutletContext()
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
      toast.success("image uploaded");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred while uploading.");
    }
  })


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
    console.log("formData", formData);
  }

  return (
    <div className='flex mt-20 justify-center h-screen'>
      <form className="w-full max-w-sm " onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="dark:text-amber-50 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="imagename">Image Name:</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              id="imagename"
              name="imagename"
              value={imagename}
              onChange={(e) => setImagename(e.target.value)}
              required />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="dark:text-amber-50 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="price">Price:</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            /><br /><br />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="dark:text-amber-50 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">Description:</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="dark:text-amber-50 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="image_file">Upload Image:</label>
          </div>
          <div className="md:w-2/3">
            <input
              type="file"
              id="image_file"
              name="image_file"
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button className='dark:btn dark:btn-warning btn btn-primary' type="submit"
            disabled={isLoading || !isImageLoaded || !imageFile || !imagename || !price || !description}>
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Upload;
