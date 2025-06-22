<script>
  import '../styles/tech-details-info.scss';
  import techList from '../TechList'
  let { curentTech = $bindable()} = $props();

  let details = $state();

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