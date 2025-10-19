document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("trailerPopup");
  const frame = document.getElementById("trailerFrame");

  // =============================
  // 🎬 Xử lý trailer popup
  // =============================
  document.querySelectorAll(".trailer-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.dataset.link;
      frame.src = link + "?autoplay=1&rel=0";
      popup.style.display = "flex";
    });
  });

  // Đóng popup trailer
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.style.display = "none";
      frame.src = "";
    });
  });

  // =============================
  // 📅 Chọn ngày chiếu
  // =============================
  const dateButtons = document.querySelectorAll(".date");
  dateButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      dateButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // =============================
  // ⏰ Chọn giờ chiếu
  // =============================
  const timeButtons = document.querySelectorAll(".time-slots button");
  timeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Đổi trạng thái active
      timeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // =============================
      // 🧠 Lấy thông tin phim
      // =============================
      const movieCard = btn.closest(".movie-card") || document;
      const movieTitle =
        movieCard.querySelector(".movie-title")?.textContent.trim() ||
        "Phim đang chiếu";
      const posterSrc =
        movieCard.querySelector(".poster img")?.src ||
        "./assets/img/default.jpg";
      const selectedDate =
        document.querySelector(".date.active")?.textContent.trim() ||
        "Chưa chọn ngày";
      const selectedShowtime = btn.textContent.trim();

      // =============================
      // 💾 Lưu vào localStorage
      // =============================
      localStorage.setItem("selectedMovie", movieTitle);
      localStorage.setItem("selectedPoster", posterSrc);
      localStorage.setItem("selectedDate", selectedDate);
      localStorage.setItem("selectedShowtime", selectedShowtime);

      // =============================
      // 🔁 Chuyển sang trang chọn ghế
      // =============================
      window.location.href = "seat.html";
    });
  });
});
