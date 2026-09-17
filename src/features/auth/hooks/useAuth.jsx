import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authRegisterThunk, loginThunk } from "../apis/authThank";
import { createPostThunk, editPostThunk } from "../../main/apis/postThunk";
import { updatePostData } from "../../main/state/postSlice";
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postUpdateData } = useSelector((store) => store.postSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues : {
      'description' : postUpdateData?.description ? postUpdateData.description :  ''
    }
  });

  const { isLoading } = useSelector((store) => store.authSlice);

  const handleRegister = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("profilePic", data.profilePic[0]);

    dispatch(authRegisterThunk(formData));
  };

  const handleLogin = async (data) => {
    dispatch(loginThunk(data));
  };

  const handlePost = async (data, selectImages , existingImages , id) => {
    console.log(existingImages)
    const formData = new FormData();
    formData.append("description", data.description);

    if(existingImages){
      for (let i = 0; i < selectImages.length; i++) {
      formData.append("newImages", selectImages[i]);
      }
    }else{
      for (let i = 0; i < selectImages.length; i++) {
      formData.append("images", selectImages[i]);
      }
    }

  
    if(existingImages && id){
      formData.append('existingImages' , JSON.stringify(existingImages))
      formData.append('id' , id)
      await dispatch(editPostThunk({id :  id ,  data : formData}))
      dispatch(updatePostData(null))
    }else{
      await dispatch(createPostThunk(formData));
    }

    reset();
    navigate("/profile");
  };

  return {
    register,
    handleSubmit,
    errors,
    handleRegister,
    navigate,
    isLoading,
    handleLogin,
    handlePost,
  };
};

export default useAuth;
