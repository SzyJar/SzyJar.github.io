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
  <div class="additional-info">
    {details?.text}
  </div>
</div>