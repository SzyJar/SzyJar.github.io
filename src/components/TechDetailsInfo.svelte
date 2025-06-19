<script>
  import '../styles/tech-details-info.scss';
  let { curentTech = $bindable()} = $props();

  const techList = [
      { id: "dotnet",   stars: 3,   name: ".NET ecosystem",   text: "I can build and maintain full-stack applications within the .NET ecosystem, using ASP.NET Core, Entity Framework Core, and Blazor or WPF. I’m proficient in LINQ, object-oriented programming (OOP), and common design patterns." },
      { id: "blazor",   stars: 3,   name: "Blazor",           text: "I can build and maintain both Blazor Server and WebAssembly (WASM) applications. I'm comfortable using dependency injection, JavaScript interop, and I understand the nuances of Blazor’s rendering and component lifecycle." },
      { id: "mssql",    stars: 2,   name: "MS SQL Server",    text: "I can write complex SELECT queries using multiple joins and filters. I use SQL Server Management Studio for query execution and occasionally analyze execution plans. I'm currently focused on reading data and have limited experience with data modification or schema design." },
      { id: "svelte",   stars: 2,   name: "Svelte / SvelteKit",  text: "I can comfortably build simple to moderately complex Svelte and SvelteKit applications, including server-side rendering (SSR). I have experience managing data fetching in SSR contexts, alongside building reactive components and handling component state." },
      { id: "html",     stars: 3,   name: "HTML",             text: "I write clean, semantic HTML to build well-structured web pages. I’m comfortable with modern elements and basic accessibility, ensuring good integration with CSS and JavaScript." },
      { id: "css",      stars: 3,   name: "CSS",              text: "I write clean, maintainable, and responsive CSS that ensures great-looking layouts across all convencional screen sizes." },
  ]

  let details = $state(techList.find(item => item.id === curentTech));

  $effect(() => {
    details = techList.find(item => item.id === curentTech);
  });
</script>

<div class="content">
  <div class="name">
    {details?.name}
  </div>
  <div class="stars">
    {#each Array(details?.stars ?? 0) as _, i}
      <i class="fa-solid fa-star"></i>
    {/each}<!--
--->{#each Array(5 - (details?.stars ?? 0)) as _, i}
      <i class="fa-regular fa-star"></i>
    {/each}
  </div>
  <div class="additional-info">
    {details?.text}
  </div>
</div>