<script>
    let { hover, tech, src } = $props();
    import '../styles/tech-details-button.scss';

</script>

<div class='icon' onmouseover={hover} onfocus={hover} role="button" tabindex="0">
    <img src={src} alt={tech} loading="lazy"/>
</div>