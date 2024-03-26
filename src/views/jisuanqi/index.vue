<template>
  <div id="calculator">
    <input type="text" v-model="result" readonly class="result-input" />
    <div class="buttons">
      <button v-for="button in buttons" :key="button" @click="handleClick(button)" class="calc-button">
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      buttons: ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/'],
    }
  },
  methods: {
    handleClick(button) {
      if (button === '=') {
        this.calculate()
      } else {
        this.result += button
      }
    },
    calculate() {
      try {
        this.result = eval(this.result)
      } catch (error) {
        this.result = 'Error'
      }
    },
  },
}
</script>

<style scoped>
#calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.result-input {
  width: 200px;
  height: 40px;
  font-size: 18px;
  text-align: right;
  margin-bottom: 10px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.calc-button {
  width: 50px;
  height: 50px;
  font-size: 16px;
}
</style>
