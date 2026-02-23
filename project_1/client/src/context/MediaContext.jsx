import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api/axios";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  // Inside MediaContext.js

  // 1. Wrap in useCallback so it stays stable
  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/media");
      setMedia(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching media:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ADD MEDIA (Supports File Upload)
  const addMedia = async (formData) => {
    try {
      const res = await api.post("/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchMedia();
      return {
        success: true,
        message: res.data.message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || "Upload failed",
      };
    }
  };

  // UPDATE MEDIA
  const updateMedia = async (id, updateData) => {
    try {
      const res = await api.put(`/media/${id}`, updateData);
      setMedia((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...res.data.data } : item,
        ),
      );
      return { success: true };
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return { success: false, message: "Update failed" };
    }
  };

  // DELETE MEDIA
  const deleteMedia = async (id) => {
    try {
      // 1. Capture the response from the backend
      const res = await api.delete(`/media/${id}`);

      // 2. Update local state to remove the item from UI
      setMedia((prev) => prev.filter((item) => item._id !== id));

      // 3. Return success and the message from the backend (res.data.message)
      return {
        success: true,
        message: res.data.message || "Media deleted successfully2",
      };
    } catch (err) {
      // 4. Handle errors from the backend
      return {
        success: false,
        message: err.response?.data?.error || "Delete failed",
      };
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);
  return (
    <MediaContext.Provider
      value={{
        media,
        loading,
        fetchMedia,
        addMedia,
        updateMedia,
        deleteMedia,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMedia = () => useContext(MediaContext);
