import { useEffect, useState } from "react";
import { initClient, getClientState } from "@swapcard/react-sdk/lib/client";
import { getApplication } from "@swapcard/react-sdk/lib/application";
import { getEvent } from "@swapcard/react-sdk/lib/event";
import Exhibitors from "./Exhibitors.tsx";

export default function App() {
  const [initialState, setInitialState] = useState(null);

  useEffect(() => {
    async function getInitialState() {
      const client = initClient();

      await Promise.all([
        getApplication(client),
        getEvent(client, { eventId: import.meta.env.VITE_PUBLIC_EVENT_ID }),
      ]);

      const initialState = getClientState(client);
      setInitialState(initialState);
    }

    void getInitialState();
  }, []);

  console.log(import.meta.env.VITE_PUBLIC_EVENT_ID);
  console.log(import.meta.env.VITE_PUBLIC_EXHIBITOR_VIEW_ID);

  return <>{initialState && <Exhibitors initialState={initialState} />}</>;
}
