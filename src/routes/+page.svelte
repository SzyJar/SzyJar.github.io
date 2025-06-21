<script>
    import '../styles/app.scss'
    import Footer from '../components/Footer.svelte'
    import Home from '../components/Home.svelte'
    import Tech from '../components/Tech.svelte'
    import Navbar from '../components/Navbar.svelte'
</script>

<div class="app">
    <Navbar />

    <div id='home-section' class="section">
        <Home />
    </div>
    <div id='tech-section' class="section">
        <Tech />
    </div>

    <Footer />
</div>