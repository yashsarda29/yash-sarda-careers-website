/* Shared blog behaviour. Keep WHATSAPP_NUMBER in sync with index.html. */
(function () {
  var WHATSAPP_NUMBER = "918850628288";
  var wa = function (msg) { return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg); };

  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = wa(a.dataset.msg || "Hi Yash!");
    a.target = "_blank";
    a.rel = "noopener";
  });

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  var bar = document.querySelector(".progress");
  var article = document.querySelector(".prose");
  if (bar && article) {
    var update = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - innerHeight * 0.6;
      var done = Math.min(Math.max(-r.top + innerHeight * 0.2, 0), total);
      bar.style.width = (total > 0 ? (done / total) * 100 : 0) + "%";
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  }
})();
