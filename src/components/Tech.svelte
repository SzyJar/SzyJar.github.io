<script>
    import '../styles/tech.scss';
    import TechDetailsButton from './TechDetailsButton.svelte';
    import TechDetailsInfo from './TechDetailsInfo.svelte';

    let curentTech = $state("dotnet");

    const microsoftStack = [
        { tech: "dotnet",   src: "/logos/dotnet.svg" },
        { tech: "blazor",   src: "/logos/blazor.svg" },
        { tech: "mssql",    src: "/logos/microsoft-sql-server.svg" },
        { tech: "azure",    src: "/logos/microsoft-azure.svg" },
    ]

</script>

<div class="tech" id="select-tech">
    <div class="select-tech-container">
        <div class="select-tech">
            {#each microsoftStack as tech, i}
                <TechDetailsButton hover={() => curentTech=tech.tech} tech={tech.tech} src={tech.src}/>
            {/each}
        </div>
    </div>

    <div class="display-tech">
        <TechDetailsInfo curentTech={curentTech}/>
    </div>
</div>