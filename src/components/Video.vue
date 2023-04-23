<template>
    <div class="video-container">
        <iframe 
        :src="'https://www.youtube.com/embed/'+ youtube_id"
        frameborder="0" width="100%" height="400" 
        allow="accelremoter; autoplay; encrypted-media; gyroscope; pivture-in-picture;" allowfullscreen></iframe>
        
    </div>
</template>

<script>
export default {
    props: ['youtube_id']
}
</script>