import { get, set, del } from "idb-keyval";




const idbPersister = {
  persistClient: async (client:any) => {
    await set("react-query-cache", client);
  },

  restoreClient: async () => {
    return await get("react-query-cache");
  },

  removeClient: async () => {
    await del("react-query-cache");
  },
};




const persistOptions={
      persister: idbPersister,
      maxAge: 1000 * 60 * 60 * 24,
      buster: "v1",
    }

    export default persistOptions;