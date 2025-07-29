<script>
   import { marked } from 'marked';
   import '../../../styles/app.scss'
   import '../../../styles/markdown.scss'
   const url = 'https://raw.githubusercontent.com/SzyJar/SzyJar.github.io/refs/heads/main/Articles/Invigem.md';
</script>

<div class="markdown-body">
   {#await fetch(url).then(r => r.text()) then text}
    {@html marked(text)}
   {/await}
</div>