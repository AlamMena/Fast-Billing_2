import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  Link,
  Avatar,
  AvatarGroup,
  Box,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "../Auth/useAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/UserSlice";
import { useRouter } from "next/router";
import auth from "../Auth/FirebaseAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const { LogIn } = useAuth();
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      await LogIn(data);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const avatars = [
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8DLCX8WkTXBhPLEdDSurXmr66XlwIpa_EuY4cpUS9WxexK-piyps9ivFHtbnltBgDq7g&usqp=CAU",
      width: 40,
      height: 40,
    },
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzF6ZipCh3_AcIho22fXQyvr2QSm2zZgq677xCnpS-IZor0dWyrrHQma6FUyGt2qXUFI&usqp=CAU",
      width: 40,
      height: 40,
    },
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6FOCo35CJu6oDizL-rBOxFRoB_txplyFcOpAlSP2-qpUJar1J9n0FfZWBvEcCZ_Yz1w&usqp=CAU",
      width: 40,
      height: 40,
    },
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEO2XAm5iqp93uhaOFjtoOstSpBbDRlvBUuuWt9GZd5gy27yb5xZeveE8A_DjbIaGL7cQ&usqp=CAU",
      width: 40,
      height: 40,
    },
  ];

  return (
    <>
      {/* Login Page */}
      <div className="grid grid-cols-12 h-screen">
        {/*---------------------------------- Login Form -------------------------------------*/}
        <div className=" lg:ml-14 md:ml-0 lg:col-span-5 col-span-12 flex lg:items-center sm:items-baseline md:items-center pt-12 md:pt-0 justify-center bg-inherit lg:bg-inherit md:bg-gray-200">
          <div className=" lg:bg-inherit bg-inherit md:bg-white md:h-fit md:w-80 md:shadow-lg shadow-none lg:shadow-none rounded-xl  lg:h-96 lg:w-80 h-96 w-96 md:py-10 md:p-4 p-2 m-2 lg:py-0 lg:p-2">
            <div>
              <Avatar
                alt="Metaverse"
                variant="square"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3bAlqaZSh0mViahdE_MNIduBQZBWwyBEZtA&usqp=CAU"
                sx={{ width: 65, height: 65 }}
              />
            </div>
            <div className=" text-3xl font-bold tracking-tighter mt-5">
              Iniciar Sesion
            </div>
            <div className="text-xs mb-5">
              <span>No tienes una cuenta? </span>
              <Link href="#" underline="always">
                <span>Crea una</span>
              </Link>
            </div>
            {/* Inputs */}
            <form onSubmit={handleSubmit((data) => handleLogin(data))}>
              <div className="py-2">
                <TextField
                  required
                  id="email"
                  label="Correo electronico"
                  {...register("email")}
                  size="small"
                  error={error}
                  fullWidth
                  autoComplete="off"
                />
              </div>
              <div className="py-2">
                <TextField
                  autoComplete="off"
                  required
                  id="password"
                  error={error}
                  helperText={error ? "No se ha encontrado el usuario" : ""}
                  label="Contrasena"
                  {...register("password")}
                  size="small"
                  type="password"
                  fullWidth
                />
              </div>

              {/* Rembember me container */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center tracking-wide text-xs">
                  <Checkbox />
                  Recuerdame
                </div>
                <div className="tracking-wide text-xs font-bold text-right">
                  <Link href="#" underline="always">
                    {"Olvidaste la contrasena?"}
                  </Link>
                </div>
              </div>
              {/* Sign In Button */}
              <div className="p-3">
                <Button
                  className=" rounded-full bg-green-600"
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  <span className=" text-white font-bold tracking-wider">
                    Iniciar Sesion
                  </span>
                </Button>
              </div>
            </form>
            <hr className="my-4"></hr>
            {/* Icons container */}
            <div className="flex justify-around mt-5">
              <Button
                variant="outlined"
                size="large"
                className="hover:text-green-600 rounded-full"
              >
                <FiFacebook />
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="hover:text-green-600 rounded-full"
              >
                <FaGoogle />
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="hover:text-green-600 rounded-full"
              >
                <FiGithub />
              </Button>
            </div>
          </div>
        </div>
        {/*-------------------------------- Login background -------------------------------- */}
        <div className=" hidden lg:flex lg:col-span-7 bg-[url('https://cdn.dribbble.com/users/373274/screenshots/10805897/media/6e234812bc4204db2848082933592e54.png')] lg:items-center">
          <div className=" px-20">
            {/* Title and subtitle */}
            <div className=" text-white text-5xl p-3 font-bold">
              Bienvenido a <div> nuestra comunidad</div>
            </div>
            <div className=" text-white p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe non
              reiciendis voluptates consectetur culpa? Sequi voluptatem quidem e
            </div>
            {/* Avatars */}
            <div className="flex items-center py-4 px-3 ">
              <AvatarGroup max={4}>
                {avatars.map((item, index) => {
                  return (
                    <Avatar
                      key={index}
                      alt={item.alt}
                      src={item.src}
                      sx={{ width: item.width, height: item.height }}
                    />
                  );
                })}
              </AvatarGroup>
              <div className="text-white px-4 text-xs">
                Es tu turno de unirte a nosotros
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
