import { create } from "apisauce";

const api = create({
  baseURL: "http://3f079e52e1ac.ngrok.io",
});

// api.addResponseTransform((Response) => {
//   if (!Response.ok) {
//     throw Response;
//   }
// });

export default api;
