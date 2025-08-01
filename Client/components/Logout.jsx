
import { useAuthContext } from "./Authentication";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();
  const { handleLogout } = useAuthContext();

  const logoutAndRedirect = async () => {
    try {
      await handleLogout();
      navigate("/signin");

    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <button type="button"
    className="btn w-15 text-xxl
     text-gray-800 bg-gray-300
      hover:bg-yellow-100
      hover:text-white-700
      py-0 px-2 rounded-lg"
    onClick={logoutAndRedirect}>
    Logout
  </button>

}

export default Logout;