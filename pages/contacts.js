import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import ContactForm from "../components/Contacts/ContactForm";
import ContactList from "../components/Contacts/ContactList";
import PageHeader from "../components/Globals/PageHeader";
export default function Contacts() {
  const [formOpen, setFormOpen] = useState(false);
  const ubicationsRoutes = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "User",
      link: "/User",
    },
    {
      text: "List",
      link: "/User/list",
    },
  ];
  return (
    <div className="w-full px-8 md:pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Contacts" ubicationRoutes={ubicationsRoutes} />
        </div>
        <div className="flex">
          <Button
            className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
            variant="contained"
            onClick={() => setFormOpen(true)}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm text-neutral-50 capitalize font-bold">
              New contact
            </span>
          </Button>
        </div>
      </div>
      <ContactList setFormOpen={setFormOpen} />
      <ContactForm open={formOpen} setOpen={setFormOpen} />
    </div>
  );
}
