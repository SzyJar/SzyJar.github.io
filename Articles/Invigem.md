# Invigem - how it's build

_Invigem_ is a hobby project built using **Blazor Server** with the **Interactive Auto render mode** for a responsive, dynamic user experience. The backend is developed with **ASP.NET Core**, serving both the web application and API endpoints that act as a secure proxy for accessing external services and Azure Table Storage — keeping sensitive keys and connection strings off the client. The entire application stack is deployed and hosted on **Microsoft Azure**, ensuring scalability and reliability.


### Data Flow

Azure Table Storage is populated daily with recent stock _adjusted close_ prices from the Alpha Vantage API. This population is handled by an **Azure Function App** triggered by an **Azure Logic App** — the function runs once per day.

The **ASP.NET Core API** acts as a proxy to Azure Table Storage, retrieving and caching the most recent data. The client then fetches this data from the API and stores it locally in the browser.

This architecture uses a **three-layer caching strategy**:

-   **Azure Table Storage** caches data from the Alpha Vantage API to reduce external API calls (limited to 25 requests per day on the free plan).
    
-   **Backend caching** stores retrieved table data to reduce calls to Azure Table Storage (also running on the free plan).
    
-   **Client-side caching** minimizes requests to the backend API, helping stay within the 60-minute daily CPU time limit.


### Stock Data Provider

Choosing **Blazor** over other popular frontend frameworks allows for tight integration with the **ASP.NET Core** backend. This makes it possible to reuse logic across both layers, with separate implementations depending on the environment.

The **stock data provider** class acts as a shared data source for both the backend and frontend. It is injected with different implementations of a data client: on the backend, the client retrieves data from **Azure Table Storage**, while on the frontend, it communicates with the **API**.

I implemented a custom caching layer using **`ConcurrentDictionary`**  to achieve near O(1) retrieval times when the cache is populated. The caching logic itself is reused on both the frontend and backend.

This approach reduces code duplication and simplifies the application's overall data flow, making it easier to understand and maintain.


### WASM Hydration and Prefetch

When a user enters the website, the browser downloads the **WebAssembly (WASM)** version of the frontend. Since the **Azure free plan** does not support WebSocket connections, Blazor falls back to **WASM-only mode**.

During hydration, the user is presented with a **disclaimer and loading indicator** — both are meant to hold user's attention while the WASM bundle downloads. Once downloaded, the browser instantly calls the API to start preparing data, even before the user acknowledges the disclaimer and moves to the main view.

If the application was hosted on a server that allows WebSocket connections, Blazor could run in **Server mode**. With **Server-Side Rendering (SSR)** for first time component renders, the first render would happen on the server, then re-renders would happen on the client. However, the app still needs to transition into **interactive mode** before user interaction is enabled, and during that transition, the loading indicator remains visible — just like in WASM mode.


### Obfuscating the API

I decided to rotate API endpoint addresses instead of authenticating users —&nbsp;the goal is to make using the API outside of the application **unreliable**.

Both the client and server share logic that generates a new API endpoint every few seconds. This generation is based on **UTC time**, which means the client must stay tightly synchronized with the server. Even a **one-second drift** will cause the client to hit a non-existent endpoint and get a 404.

Since the API isn’t meant for public use, I allow myself to **ignore common practices on purpose**. Instead of returning JSON, the API returns raw **`byte[]`**. It saves on serialization overhead and makes the API responses harder to interpret.

I also avoid using descriptive endpoint names. Instead, both client and server use an **endpoint name provider**, which gives clean, readable names in the source code, but replaces them with obfuscated strings in production. This kind of setup would be much harder to pull off with a typical JS framework — Blazor makes it straightforward because both sides of the app live in the same tech stack.

Of course, someone could still decompile the WASM assemblies and extract the logic used to generate endpoint URLs — and from there, guess the next valid endpoints. But in this case, it’s **not worth the effort**. The data comes from the free Alpha Vantage API anyway. Obfuscation, rather than full authentication, is a&nbsp;reasonable tradeoff for a personal project like this.