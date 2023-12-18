import mongoose from "mongoose";
const connectedb = async () => {
  return await mongoose
    .connect(process.env.CONNECTION)
    .then((result) => {
      console.log("Connected-DB");
    })
    .catch((err) => {
      console.log(`Fail of connection......${err}`);
    });
};

export default connectedb;
