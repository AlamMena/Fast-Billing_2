import React from "react";
import { TextField, Button, Checkbox, Link, Avatar } from "@mui/material";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
  return (
    <>
      {/* Login Page */}
      <div className="grid grid-cols-12 h-screen">
        {/* Login Form */}
        <div className=" md:col-span-5 col-span-12 flex items-center justify-center">
          <div className="  h-96 w-96 p-2 m-2">
            <div>
              <Avatar
                alt="Metaverse"
                variant="square"
                src="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png"
                sx={{ width: 60, height: 50 }}
              />
            </div>
            <div className=" text-3xl font-bold tracking-tighter">Sign In</div>
            <div className="text-xs mb-3">
              <span>No tienes una cuenta? </span>
              <Link href="#" underline="always">
                <span>Crea una</span>
              </Link>
            </div>
            {/* Inputs */}
            <div className="py-1">
              <TextField
                required
                id="outlined-required"
                label="Correo electronico"
                size="small"
                fullWidth
              />
            </div>
            <div className="py-1">
              <TextField
                required
                id="outlined-required"
                label="Contrasena"
                size="small"
                type="password"
                defaultValue=""
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
                variant="contained"
                color="primary"
                fullWidth
                className="bg-black"
              >
                Iniciar Sesion
              </Button>
            </div>
            <hr className="my-4"></hr>
            {/* Icons container */}
            <div className="flex justify-around mt-5">
              <Button variant="outlined" size="large">
                <FaFacebookF />
              </Button>
              <Button variant="outlined">
                <FaGoogle />
              </Button>
              <Button variant="outlined">
                <FaGithub />
              </Button>
            </div>
          </div>
        </div>
        {/* Login background */}
        <div className=" hidden md:flex md:col-span-7 bg-black">
          <div className=" items-center flex flex-col p-4">
            <div className=" text-white text-4xl">
              Welcome to Fast Billing 2
            </div>
            <div className=" text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe non
              reiciendis voluptates consectetur culpa? Sequi voluptatem quidem
              ex tenetur quibusdam ipsum doloribus quos similique, consequatur
              beatae eaque est libero harum magni iure distinctio optio.
              Praesentium cum illum et nulla ipsa eaque rerum sint cupiditate
              voluptatum.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
