<template>
  <section class="contact-item">
    <div v-if="contact" class="contact-item__inner">

			<div class="contact-item__toolbar">
				<v-button class="contact-item__button" :text="'Назад'" @on-click="goToPrevPage"/>
				<v-button v-if="!isEditable" :hasIcon="true" :icon="'edit'" class="contact-item__button" :text="'Редактировать'" @on-click="editContact"/>
				<v-button v-if="isEditable" class="contact-item__button" :text="'Сохранить'" @on-click="editContactSave"/>
				<v-button v-if="isEditable" class="contact-item__button" :text="'Отменить'" @on-click="editContactCancel"/>
			</div>

      <header class="contact-item__head">
        <h1 v-if="!isEditable" class="contact-item__title">{{ contact.name }}</h1>
				<input class="contact-item__title-field" v-if="isEditable" type="text" v-model="contact.name" :size="contact.name.length + 1">
      </header>

      <div class="contact-item__body">
        <div class="contact-item__avatar">
          <img :src="contact.avatar || avatar" :alt="contact.name" />
        </div>

        <div class="contact-item__info user-info">
          <ul class="user-info__list">
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__title">Возраст: </span>
								<span class="user-info__text" v-if="!isEditable">{{ contact.age }}</span>
								<input class="user-info__input" v-else type="text" v-model="contact.age">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__title">Пол: </span>
								<span class="user-info__text" v-if="!isEditable">{{ contact.sex }}</span>
								<input class="user-info__input" v-else type="text" v-model="contact.sex">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__title">Статус: </span>
								<span class="user-info__text" v-if="!isEditable">{{ contact.tags.join(', ') }}</span>
								<input class="user-info__input" v-else type="text" v-model="contact.tags">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__title">Телефон: </span>
								<span class="user-info__text" v-if="!isEditable">
									<a :href="`tel:${contact.phone}`">{{ contact.phone | phone }}</a>
								</span>
								<input class="user-info__input" v-else type="tel" v-model="contact.phone">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__title">Электронная почта: </span>
								<span class="user-info__text" v-if="!isEditable">
									<a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
								</span>
								<input class="user-info__input" v-else type="email" v-model="contact.email">
							</label>
            </li>
          </ul>
        </div>

				<contact-map v-if="contact.location" :address="contact.location"/>

      </div>
    </div>

		<v-preloader v-if="isLoading" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ContactMap from '@/components/Contact/ContactMap.vue';
import vPreloader from '@/components/vPreloader.vue';
import vButton from '@/components/Blocks/vButton.vue';
import { db } from "@/main";
import avatar from "@/assets/icons/user.png";

export default {
	name: "contact-item",
	components: {
		ContactMap,
		vPreloader,
		vButton
	},
  data() {
    return {
      id: this.$route.params.id,
			contact: null,
			contactHistory: {},
			avatar,
			isLoading: true,
			isEditable: false
    };
  },
  mounted() {
		this.getContactById(this.id);
  },
  methods: {
    async getContactById(id) {
			await db.ref('/users/' + this.getUserId)
				.child('contacts')
				.child(id)
				.once('value')
				.then((snapshot) => {
					this.contact = snapshot.val();
					this.isLoading = false;
				});
		},
		goToPrevPage() {
			this.$router.go(-1);
		},
		editContact() {
			this.isEditable = true;
			Object.assign(this.contactHistory, this.contact);
		},
		editContactCancel() {
			this.isEditable = false;
			this.contact = this.contactHistory;
		},
		editContactSave() {
			this.contact.tags = this.contact.tags.split ? this.contact.tags.split(',').map(tag => tag.trim()) : this.contact.tags;
			this.isEditable = false;
			this.$store.dispatch('updateContact', this.contact);
		}
	},
	computed: {
		...mapGetters([
			'getUserId'
		])
	}
};
</script>

<style lang="scss">
@import "@/style/variables.scss";

.contact-item {
	background-color: $background-color;
	box-sizing: border-box;
	&__toolbar {
		display: flex;
		margin-bottom: 20px;
		padding: 20px 30px;
		background-color: #ffffff;
		border: 1px solid $border-color;
		border-radius: 5px;
	}
  &__inner {
    padding: 20px 0;
	}
	&__head {
		text-align: center;
	}
	&__title,
	&__title-field {
		display: inline-block;
		margin: 0 0 10px;
		font-size: 24px;
		font-weight: bold;
		font-family: inherit;
	}
	&__title-field {
		padding: 3px 6px;
		color: $text-color;
		border: 2px solid $border-color;
		border-radius: 3px;
		transition: border-color 0.2s ease;
		outline: none;
		&:focus {
			border-color: $main-color;
		}
	}
  &__body {
		display: flex;
		margin-bottom: 20px;
  }
  &__avatar {
    width: 250px;
    height: 250px;
    img {
      width: 100%;
    }
  }
  &__info {
		padding: 0 20px;
		margin-right: auto;
	}
	&__button {
		margin-right: 10px;
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
	&__title {
		font-weight: bold;
	}
	&__input {
		padding: 3px 6px;
		color: $text-color;
		font: inherit;
		border: 2px solid $border-color;
		border-radius: 3px;
		transition: border-color 0.2s ease;
		outline: none;
		&:focus {
			border-color: $main-color;
		}
	}
}
</style>
