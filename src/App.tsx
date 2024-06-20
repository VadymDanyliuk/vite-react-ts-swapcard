import { initClient, ClientProvider } from "@swapcard/react-sdk/lib/client";
import { ApplicationProvider } from "@swapcard/react-sdk/lib/application";
import { EventProvider } from "@swapcard/react-sdk/lib/event";
import { ExhibitorEventListView } from "@swapcard/react-sdk/lib/exhibitor/event-list-view";

export default function App() {
    const client = initClient();

    // See also https://github.com/VadymDanyliuk/vite-react-ts-swapcard/tree/dev

    console.log(import.meta.env.VITE_PUBLIC_EVENT_ID);
    console.log(import.meta.env.VITE_PUBLIC_EXHIBITOR_VIEW_ID);

    return (
        <ClientProvider client={client}>
            <ApplicationProvider>
                <EventProvider eventId={import.meta.env.VITE_PUBLIC_EVENT_ID}>
                    <ExhibitorEventListView viewId={import.meta.env.VITE_PUBLIC_EXHIBITOR_VIEW_ID} />
                </EventProvider>
            </ApplicationProvider>
        </ClientProvider>
    );
}
