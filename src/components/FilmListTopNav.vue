<template>
  <div class="nav">
    <header data-v-4070467a="" class="header">
      <div data-v-4070467a="" class="left">
        <div
          data-v-4070467a=""
          class="city"
          data-enter-time="1602495621"
          data-click-fun="track_f_253582"
        >
          <router-link data-v-4070467a="" to="/city" tag="span">
            {{ city | cleaner }}
          </router-link>
          <img
            data-v-4070467a=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
            width="6px"
            height="3px"
          />
        </div>
      </div>
      <div data-v-4070467a="" class="title">
        <div data-v-4070467a="">电影</div>
      </div>
      <div data-v-4070467a="" class="right">
        <div data-v-4070467a="">
          <div
            data-v-4070467a=""
            class="toCinemaSearch"
            data-enter-time="1602495621"
            data-click-fun="track_f_53117"
          >
            <img
              data-v-4070467a=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA2CAMAAABQrCHsAAABlVBMVEVHcEwaGh8/Pz8ZGxszMzMZGhwZGhsZGhsZGhsZGhscHBwnJycZGhskJCQaGh0fHx8ZGhsaGiMeHh4ZGhsZGhsbGxsZJiYaGhsZGhsZGhwZGhwZGxsZGxsaGhsfHx8ZGhsbGxsqKioaGhsbGxsZGxsbGxsZGhwaGh8ZGhskJCQZGxsZHh4ZGxsZGhsaGh0aGhsZGhsZMzMaGh0ZGhseHh4ZGhsZGhseHh4ZGhsZGhsZHh4aGh0aGhsZGhwbGxsaGh4ZIiIbGxsZGhwbGxsZGxsaGh1/f38aGhsZGxshISEZGxsZGxsZGhsZGhwfHx8aGh4aGhsdHR0ZGxv///8ZGhsqKioaGhwbGxtVVVUaGhwbGxsaGh8ZGhsZGxsaGhwZGxsaGhwaGhwgICAiIiIcHBwZGhsZGxsbGxsZGhsZGxsaGhwbGxsZGhsaGiAZGhwaGhsZGxsaGhwZGxsZGhwaGhsZHBwaGhwZHBwaGhwaGh0aGh0ZGhwbGxsaGh0aGhoZGhwaGiEZGxsZHBwZHR0aGhsaGhsZGhsIL5M3AAAAhnRSTlMAOQTsBeP76P73SA3qB2kY+B0i/fRBFKbfx62elq8QtzgG11V5L70w/BXOO6DeV6T2CnLwKsDWIenVMla5mUo6HhysQs9NAsSXF4uE06IITJwjggHMDFhxA5BAMd3Zj52Iah8PG/JmUuCDfS7LJ7aSqXVl0etQYlp8X2i+JXtz0CZ6Wzy4w4GfxwoAAAJjSURBVBgZrcEFUxQBAIbh77qL7m4ElFCxCQWDUFBQaaXDwu56f7cwzHLHsXe7N+Pz6D9pfPehovJvZcWHd42yx1n4uISkkseFTlmZejRHurlHU8pqaJpDruLN6Nvfb6ObxS4OTQ8pM/dVDoQXnszKMPtkIcyBq25lUNQHFDwI6aTQgwKgr0imejuArphOi3UBHb0yEfNAS7fMdbeAJ6ZTIqXQE1QmwR4ojSjdGHgLlVmhF8aU5hfwSdlEgfc6IVICo8puFEpqlWoGfA+V3UMfzCjFMxdEZSUKrmdKWoN5p6w452FNSXuwLGvLsKdjoTj+57L23E88JEM97MiOHaiX4QVsyY4teCFDGazLjnUok6EUamSHA0pl2IAV2bECGzLEISI7IhCXYR+KZEcR7MvwBrZlxza8keEPBGVHEKplKIfXsuM1lMvwCl7KjpfwSoZdWK2VtdpV2NWxOgjKWhDqlLQExbJWDEtKegr+Zllp9sNTpRiEK7JyBQaV6ocXrim7a+D9ohMqwJWnbPJcUKGTWj3QH1JmoX7wtCrNpbNQfU6ZnKuGs5d0ymWgLSFziTbgskx8BXztMtPuAy7myczHOOSfuaF0N87kgx/CDplx+IDAnftKdf9OAPB9C0CgU2YSlRy6d9dx+5akW7cdd+9xqDKhmjD4G2Tq+ghHvJ7vHi9HRq7rwIXzQLlbpm6WFZCqoOymjlQ1AZ+rZG58YnLYlw/k+4YnJ8Z1zL0I1OUpM+dA44BT6Rr8EHYoV/UBCHQqVzUXwf9TubpwHih3K0dVTUCTWzlyLwLvlbOGlkCzctca0z9q9NKFAyAIHQAAAABJRU5ErkJggg=="
              width="18px"
              height="18px"
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
    <ul>
      <router-link to="/film/nowplaying" tag="li" active-class="active">
        <span>正在热映</span>
      </router-link>
      <router-link to="/film/comingsoon" tag="li" active-class="active">
        <span>即将上映</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      nowadd: "",
    };
  },
  computed: {
    ...mapState(["city"]),
  },
  filters: {
    cleaner(val) {
      return val.split('"').join("");
    },
  },
  mounted() {
    if (localStorage.getItem("city").length > 0) {
      this.$store.commit("setCity", localStorage.getItem("city"));
    }
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  ul {
    position: fixed;
    top: 44px;
    display: flex;
    text-align: center;
    background-color: #fff;
    width: 100%;
    z-index: 2000;

    li {
      flex: 1;
      display: flex;
      justify-content: center;
      &.active {
        span {
          width: 40%;
          border-bottom: 2px solid red;
          display: block;
          color: #fe5100;
        }
      }
    }
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    z-index: 3000;
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    div {
      float: left;
      height: 44px;
    }
    .left {
      min-width: 15%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 15px;
      .city {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          font-size: 13px;
          max-width: 58px;
          height: 16px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 5px;
          color: #191a1b;
        }
        img {
          vertical-align: middle;
        }
      }
    }
    .title {
      text-align: center;
      font-size: 17px;
      color: #191a1b;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      div {
        width: 100%;
        color: #191a1b;
        text-align: center;
      }
    }
    .right {
      width: 15%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-right: 15px;
      div {
        width: 100%;
        text-align: right;
      }
    }
  }
}
</style>