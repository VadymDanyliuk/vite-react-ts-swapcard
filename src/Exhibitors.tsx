import { useEffect, useState } from "react";
import { ClientProvider, initClient } from "@swapcard/react-sdk/lib/client";
import { ApplicationProvider } from "@swapcard/react-sdk/lib/application";
import { EventProvider } from "@swapcard/react-sdk/lib/event";
import {
  ExhibitorEventListView,
  getExhibitorEventListView,
} from "@swapcard/react-sdk/lib/exhibitor/event-list-view";

interface ExhibitorsProps {
  initialState: any;
}

export default function Exhibitors({ initialState }: ExhibitorsProps) {
  const client = initClient({ initialState });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getLocalState() {
      await getExhibitorEventListView(client, {
        eventId: import.meta.env.VITE_PUBLIC_EVENT_ID,
        viewId: import.meta.env.VITE_PUBLIC_EXHIBITOR_VIEW_ID,
      });

      setLoaded(true);
    }

    void getLocalState();
  }, []);

  return (
    <>
      <ClientProvider client={client}>
        <ApplicationProvider disableResetCSS>
          <EventProvider eventId={import.meta.env.VITE_PUBLIC_EVENT_ID}>
            {loaded && (
              <ExhibitorEventListView
                viewId={import.meta.env.VITE_PUBLIC_EXHIBITOR_VIEW_ID}
                renderExhibitorCard={(node: any, exhibitor: any) => (
                  <a href={exhibitor.id}>{node}</a>
                )}
              />
            )}
          </EventProvider>
        </ApplicationProvider>
      </ClientProvider>
    </>
  );
}
