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
								<span class="user-info__field-caption">Возраст: </span>
								<input class="user-info__field" type="text" v-model="contact.age" :disabled="!isEditable">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__field-caption">Пол: </span>
								<input class="user-info__field" type="text" v-model="contact.sex" :disabled="!isEditable">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__field-caption">Статус: </span>
								<input class="user-info__field" type="text" v-model="contact.tags" :disabled="!isEditable">
							</label>
              <!-- <span
                class="user-info__tag"
                v-for="(tag, index) in contact.tags"
                :key="index"
              >{{ tag }}{{ index !== contact.tags.length - 1 ? ', ' : '' }}</span> -->
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__field-caption">Телефон: </span>
								<input class="user-info__field" type="text" v-model="contact.phone" :disabled="!isEditable">
							</label>
            </li>
            <li class="user-info__item">
							<label class="user-info__label">
								<span class="user-info__field-caption">Электронная почта: </span>
								<input class="user-info__field" type="text" v-model="contact.email" :disabled="!isEditable">
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
			this.contact.tags = this.contact.tags.split(',').map((tag) => {
				return tag.trim();
			});
			this.isEditable = false;
			this.$store.dispatch('setContactChange', this.contact);
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
	flex-grow: 1;
	width: 100%;
	max-width: 1600px;
	margin: 0 auto;
	padding: 0 20px;
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
    max-width: 1600px;
    margin: 0 auto;
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
	&__field-caption {
		font-weight: bold;
	}
	&__field {
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
		&:disabled {
			color: inherit;
			font: inherit;
			background-color: transparent;
			border: none;
		}
	}
}
</style>
