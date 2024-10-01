Vue.config.devtools = true;
var app = new Vue({
  el: "#shop",
  data: function data() {
    return {
      qty: 1,
      pickedProduct: "",
      products: [
        {
          name: "Protein Brownies",
          id: 45393893064963,
          price: 39.99,
          index: 0,
        },
        {
          name: "Protein Blondies",
          id: 45264949444867,
          price: 39.99,
          index: 3,
        },
        {
          name: "Brownies & Blondies",
          id: 45393208312067,
          price: 64.99,
          price_old: 69.98,
          index: 6,
        },
      ],
    };
  },

  computed: {
    generateUrl() {
      const url = "https://yesyoucan.com/cart/";
      const product = this.pickedProduct.id;
      const qty = this.qty;

      const genUrl = url + product + ":" + qty;
      return genUrl;
    },
  },
  created() {},
  async mounted() {
    this.pickedProduct = this.products[2];
  },
  methods: {
    minus() {
      if (this.qty <= 1) {
        this.qty = 1;
      } else {
        this.qty--;
      }
    },
    plus() {
      this.qty++;
    },
  },
  watch: {
    pickedProduct(val) {
      shopSlider.slideTo(val.index);
    },
  },
});
