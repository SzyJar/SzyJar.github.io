<script>
    import '../styles/tech.scss';
    import TechDetailsButton from './TechDetailsButton.svelte';
    import TechDetailsInfo from './TechDetailsInfo.svelte';

    let curentTech = $state("dotnet");

    const microsoftStack = [
        { tech: "dotnet",   src: "/logos/dotnet.svg" },
        { tech: "blazor",   src: "/logos/blazor.svg" },
        { tech: "mssql",    src: "/logos/microsoft-sql-server.svg" }
    ]

    const webstack = [
        { tech: "svelte",   src: "/logos/svelte.svg" },
        { tech: "html",     src: "/logos/html5.svg" },
        { tech: "css",      src: "/logos/css.svg" },
    ]

</script>

<div class="tech" id="select-tech">
    <div class="select-tech-container">
        <div class="header-main">Technology stack I use</div>
        <div class="group-header">Microsoft full-stack development</div>
        <div class="select-tech">
            {#each microsoftStack as tech, i}
                <TechDetailsButton hover={() => curentTech=tech.tech} tech={tech.tech} src={tech.src}/>
            {/each}
        </div>
        <div class="group-header">Web development</div>
        <div class="select-tech">
            {#each webstack as tech, i}
                <TechDetailsButton hover={() => curentTech=tech.tech} tech={tech.tech} src={tech.src}/>
            {/each}
        </div>
    </div>

    <div class="display-tech">
        <TechDetailsInfo curentTech={curentTech}/>
    </div>
</div>