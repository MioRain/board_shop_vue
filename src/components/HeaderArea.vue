<script>

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="greet">
        <div>Hi, User</div>
      </div>
      <div class="logo">
        <img alt="board shop logo" class="logo" src="@/assets/logo.png" width="100" height="100" />
        <h1>Board Shop</h1>
      </div>
      <nav>
        <button>購物車</button>
        <button>登入</button>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100vw;
  height: 100px;
  padding: 0 50px;
  background-color: var(--color-buff);
  position: fixed;

  .wrapper {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .greet {
      height: 100px;
      display: flex;
      align-items: center;
      float: left;
      font-size: 2rem;
    }

    .logo {
      img {
        position: relative;
        left: -100px;
      }

      h1 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    nav {
      button {
        margin-right: 30px;
        padding: 5px;
        background-color: var(--color-light-1);
        border: 1px solid var(--color-light-1);
        border-radius: 10px;
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
  }
}</style>