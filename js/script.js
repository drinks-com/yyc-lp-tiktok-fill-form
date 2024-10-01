const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href");
    const fixedHeaderHeight = 180;
    const top =
      document.querySelector("" + blockID).offsetTop - fixedHeaderHeight;
    window.scrollTo({
      top,
      left: 0,
      behavior: "smooth",
    });
  });
}

// FAQ animation //

class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector("summary");
    this.content = el.querySelector(".summary-content");

    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = "hidden";
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;

    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 200,
        easing: "ease-out",
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 200,
        easing: "ease-out",
      }
    );
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = "";
  }
}

document.querySelectorAll("details").forEach((el) => {
  new Accordion(el);
});

// end FAQ animation //

$(function () {
  if (window.innerWidth <= 767) {
    $(".claims_marquee").marquee({
      // duration: 15000,
      speed: 50,
      infinite: true,
      startVisible: true,
      duplicated: true,
      gap: 0,
    });
  } else {
    $(".claims_marquee").marquee({
      // duration: 15000,
      speed: 80,
      infinite: true,
      startVisible: true,
      duplicated: true,
      gap: 0,
    });
  }
});

window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  var scrolled = window.scrollY;

  if (scrolled > 0) {
    header.style.boxShadow = "0 3px 3px rgba(0, 0, 0, 0.2)";
  } else {
    header.style.boxShadow = "none";
  }
});

window.addEventListener("klaviyoForms", function (e) {
  if (e.detail.type == "submit") {
    document.getElementById("form-inner").style.display = "none";
  }
});

function trackingEvents() {
  $(".btn-submit").on("click", function () {
    fbq("track", "AddToCart");
    gtag("event", "add_product_to_cart", {
      event_category: "AddToCart",
      event_label: "AddToCart",
    });
  });
}
trackingEvents();
