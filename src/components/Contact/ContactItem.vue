<template>
  <section v-if="contact" class="contact-item">
    <div class="contact-item__inner">

      <header class="contact-item__head">
        <h1 class="contact-item__title">{{ contact.name }}</h1>
      </header>

      <div class="contact-item__body">

        <div class="contact-item__avatar">
          <img :src="contact.avatar || avatar" :alt="contact.name" />
        </div>

        <div class="contact-item__info user-info">
          <ul class="user-info__list">
            <li class="user-info__item">
              <b>Возраст:</b>
              {{ contact.age }}
            </li>
            <li class="user-info__item">
              <b>Пол:</b>
              {{ contact.sex === 'male' ? 'мужской' : 'женский' }}
            </li>
            <li class="user-info__item">
              <b>Статус: </b>
              <span
                class="user-info__tag"
                v-for="(tag, index) in contact.tags"
                :key="index"
              >{{ tag }}{{ index !== contact.tags.length - 1 ? ', ' : '' }}</span>
            </li>
            <li class="user-info__item">
              <b>Телефон: </b>
              <a :href="`tel:${contact.phone}`" class="user-info__link">{{ contact.phone | phone}}</a>
            </li>
            <li class="user-info__item">
              <b>Электронная почта: </b>
              <a :href="`mailto:${contact.email}`" class="user-info__link">{{ contact.email }}</a>
            </li>
          </ul>
        </div>

				<contact-map :address="contact.location" />

      </div>

    </div>
  </section>
</template>

<script>
import ContactMap from '@/components/Contact/ContactMap.vue';
import { db } from "@/main";
import avatar from "@/assets/icons/user.png";

export default {
	name: "contact-item",
	components: {
		ContactMap,
	},
  data() {
    return {
      id: this.$route.params.id,
      contact: null,
      avatar,
    };
  },
  mounted() {
    this.getContactById(this.id);
  },
  methods: {
    async getContactById(id) {
      await db
        .ref("contacts/" + id)
        .once("value")
        .then(snapshot => {
          this.contact = snapshot.val();
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/variables.scss";

.contact-item {
  background-color: $background-color;
  &__inner {
    padding: 20px 0;
    max-width: 1600px;
    margin: 0 auto;
  }
  &__title {
    margin: 0 0 10px;
    text-align: center;
  }
  &__body {
		display: flex;
		margin-bottom: 20px;
  }
  &__avatar {
    width: 300px;
    height: 300px;
    img {
      width: 100%;
    }
  }
  &__info {
		padding: 0 20px;
		margin-right: auto;
	}
}

.user-info {
  &__list {
    padding: 0;
    list-style: none;
  }
  &__item {
    margin-bottom: 10px;
  }
  &__link {
  }
}
</style>
