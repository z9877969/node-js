// const argv = require("yargs").argv;
const { Command } = require("commander");
const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");

const invokeAction = async ({ action, name, phone, email, id }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contactById = await getContactById(id);
      console.log(contactById);
      break;
    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log(addedContact);
      break;
    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn("\x1B[1;5;32m Unknown action type!\x1B[0m");
  }
};

const program = new Command();

program
  .option("-a, --action <type>", "chosed action type")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
