<template>    
    <div class="card">
        <div class="card-image">
            <figure class="image is4by3">
                <img
                :src="course.get_image"
                alt="Placeholser image"
            />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="is-size-5">{{ course.title    }}</p>
            </div>
            </div>
            <div class="content">
                <p>{{ course.short_description }}</p>
            <!-- <a href="#">More</a> -->
            <router-link :to="{name: 'Course', params: {slug:course.slug }}">More</router-link> <!-- change it to dynamic link-->
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: [
        'course'
    ]
}
</script>