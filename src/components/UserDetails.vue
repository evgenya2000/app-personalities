<template>
  <div class="user-details">
    <h3>Name: {{ user.name }}</h3>
    <div class="albums-list" v-if="pageType === 'albums' && albums.length > 0">
      <h2>Albums:</h2>
      <div v-for="album in albums" :key="album.id" class="album-item">
        <div class="album-name">{{ album.title }}</div>
        <div
          class="album-photos"
          ref="albumPhotos"
          v-if="album.photos && album.photos.length > 0"
        >
          <img
            v-for="photo in albumPhotos(album.id).slice(0, 5)"
            :key="photo.id"
            :src="photo.url"
            :alt="photo.title"
          />
        </div>
      </div>
    </div>
    <div class="posts-list" v-if="pageType === 'posts'">
      <h2>Posts:</h2>
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="post-name">{{ post.title }}</div>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      albums: [],
      posts: [],
      selectedAlbum: null,
      pageType: "",
      photosLoaded: false,
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.pageType = this.$route.params.pageType || "albums"; // Default to 'albums'
    this.fetchUserDetails(userId);
    if (this.pageType === "albums") {
      this.fetchUserAlbums(userId);
    } else if (this.pageType === "posts") {
      this.fetchUserPosts(userId);
    }
  },
  methods: {
    fetchUserDetails(userId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user details", error);
        });
    },
    async fetchUserAlbums(userId) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        this.albums = response.data;
        await this.fetchAlbumPhotos();
      } catch (error) {
        console.error("Error fetching user albums", error);
      }
    },
    async fetchAlbumPhotos() {
      // eslint-disable-next-line no-unused-vars
      const albumIds = this.albums.map((album) => album.id);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos`
        );
        const photos = response.data;
        this.albums.forEach((album) => {
          const albumPhotos = photos.filter(
            (photo) => photo.albumId === album.id
          );
          if (albumPhotos && albumPhotos.length > 0) {
            this.$set(album, "photos", albumPhotos.slice(0, 5));
          } else {
            this.$set(album, "photos", []); // Установка пустого массива, если albumPhotos пуст или неопределен
          }
        });
        this.photosLoaded = true;
        this.initCarouselIfDataLoaded();
      } catch (error) {
        console.error("Error fetching album photos", error);
      }
    },
    fetchUserPosts(userId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user posts", error);
        });
    },
    initCarouselIfDataLoaded() {
      this.$nextTick(() => {
        // Проверяем, что фотографии загружены
        if (this.photosLoaded) {
          // Получаем ссылку на контейнер для карусели
          const albumPhotos = this.$refs.albumPhotos;

          // Проверяем наличие контейнера
          if (albumPhotos) {
            // Инициализируем Slick Carousel
            // eslint-disable-next-line no-undef
            $(albumPhotos).slick();
          } else {
            console.error(
              "Контейнер для инициализации Slick Carousel не найден"
            );
          }
        } else {
          console.log("Данные еще не загружены, попробуйте позже");
        }
      });
    },
    albumPhotos(albumId) {
      const album = this.albums.find((album) => album.id === albumId);
      if (album && album.photos) {
        return album.photos.slice(0, 5);
      } else {
        return []; // Возвращаем пустой массив, если album или album.photos не определены
      }
    },
  },
};
</script>

<style lang="scss">
@import "./_variables.scss";
@import "./UserDetails.scss";
</style>
