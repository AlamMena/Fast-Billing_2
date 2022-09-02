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
    <div className="w-full pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <PageHeader header="Contacts" ubicationRoutes={ubicationsRoutes} />
        <Button
          className="shadow-xl rounded-xl py-2 bg-green-600 hover:bg-green-800"
          variant="contained"
          onClick={() => setFormOpen(true)}
          startIcon={<Add className="text-white" />}
          disableRipple
        >
          <span className="text-sm text-neutral-50 capitalize font-bold">
            New contact
          </span>
        </Button>
      </div>
      <ContactList />
      <ContactForm open={formOpen} setOpen={setFormOpen} />
    </div>
  );
}
