(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6595454e"],{"3b17":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"auth-overlay"},[s("div",{staticClass:"auth"},[s("div",{staticClass:"auth__logo"},[s("v-logo",{attrs:{width:60}})],1),s("span",{staticClass:"auth__title"},[t._v(t._s(t.title))]),"login"===t.type?s("form",{staticClass:"auth__form",attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[s("label",{staticClass:"auth__label auth__label--name"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"auth__field input",attrs:{type:"text",placeholder:"Адрес электронной почты"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),s("label",{staticClass:"auth__label auth__label--password"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"auth__field input",attrs:{type:"password",placeholder:"Пароль",autocomplete:"on"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),s("button",{staticClass:"auth__button",attrs:{disabled:!t.disabled}},[t._v("Войти")]),s("span",{staticClass:"auth__text"},[t._v(" Еще нет аккаунта? "),s("router-link",{staticClass:"auth__link",attrs:{to:"/register"}},[t._v("Зарегистрируйтесь")])],1)]):t._e(),"register"===t.type?s("form",{staticClass:"auth__form",attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[s("label",{staticClass:"auth__label auth__label--name"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.name,expression:"user.name"}],staticClass:"auth__field input",attrs:{type:"text",placeholder:"Имя пользователя"},domProps:{value:t.user.name},on:{input:function(e){e.target.composing||t.$set(t.user,"name",e.target.value)}}})]),s("label",{staticClass:"auth__label auth__label--email"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"auth__field input",attrs:{type:"text",placeholder:"Адрес электронной почты"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),s("label",{staticClass:"auth__label auth__label--password"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"auth__field input",attrs:{type:"password",placeholder:"Пароль",autocomplete:"on"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),s("label",{staticClass:"auth__label auth__label--password"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.repeatPassword,expression:"user.repeatPassword"}],staticClass:"auth__field input",attrs:{type:"password",placeholder:"Повторите пароль",autocomplete:"on"},domProps:{value:t.user.repeatPassword},on:{input:function(e){e.target.composing||t.$set(t.user,"repeatPassword",e.target.value)}}}),t.user.password!==t.user.repeatPassword?s("span",{staticClass:"auth__error"},[t._v("Пароли должны совпадать")]):t._e()]),s("button",{staticClass:"auth__button",attrs:{disabled:!t.disabled}},[t._v("Зарегистрироваться")]),s("span",{staticClass:"auth__text"},[t._v(" Уже есть аккаунт? "),s("router-link",{staticClass:"auth__link",attrs:{to:"/login"}},[t._v("Войти")])],1)]):t._e()])])},r=[],l=s("5eed"),i={name:"v-auth",components:{vLogo:l["a"]},props:{type:{type:String,required:!0}},data:function(){return{user:{name:"",email:"",password:"",repeatPassword:""}}},methods:{login:function(){this.$store.dispatch("login",this.user)},register:function(){this.$store.dispatch("createUser",this.user)}},computed:{title:function(){return"login"===this.type?"Авторизация":"Регистрация"},disabled:function(){return"login"===this.type?this.user.email.length>0&&this.user.password.length>0:"register"===this.type?this.user.email.length>0&&this.user.password.length>0&&this.user.password===this.user.repeatPassword:void 0}}},o=i,u=(s("4cd9"),s("2877")),n=Object(u["a"])(o,a,r,!1,null,null,null);e["a"]=n.exports},"4cd9":function(t,e,s){"use strict";var a=s("d040"),r=s.n(a);r.a},a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-page"},[s("v-auth",{attrs:{type:"login"}})],1)},r=[],l=s("3b17"),i={name:"Login",components:{vAuth:l["a"]}},o=i,u=s("2877"),n=Object(u["a"])(o,a,r,!1,null,null,null);e["default"]=n.exports},d040:function(t,e,s){}}]);
//# sourceMappingURL=chunk-6595454e.50d67632.js.map