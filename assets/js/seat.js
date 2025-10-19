document.addEventListener("DOMContentLoaded", () => {
  // 🎬 Load thông tin phim từ localStorage
  const title = localStorage.getItem("selectedMovie") || "Phim đang chiếu";
  const poster =
    localStorage.getItem("selectedPoster") || "./assets/img/default.jpg";
  const date = localStorage.getItem("selectedDate") || "Chưa chọn ngày";
  const time = localStorage.getItem("selectedShowtime") || "Chưa chọn";

  document.querySelector(".sidebar h2").textContent = title;
  document.querySelector(".sidebar .poster img").src = poster;
  document.querySelector(
    ".sidebar p:nth-of-type(2)"
  ).innerHTML = `Ngày chiếu: <strong>${date}</strong>`;
  document.querySelector(
    ".sidebar p:nth-of-type(3)"
  ).innerHTML = `Suất chiếu: <strong>${time}</strong>`;

  // 💺 Xử lý chọn ghế
  const seatMap = document.getElementById("seatMap");
  const countSpan = document.getElementById("count");
  const totalSpan = document.getElementById("total");
  const payBtn = document.getElementById("payBtn");
  const overlay = document.getElementById("overlay");
  const selectedList = document.getElementById("selectedList");
  const payTotal = document.getElementById("payTotal");
  const qrImage = document.getElementById("qrImage");

  let selectedSeats = [];

  seatMap.addEventListener("click", (e) => {
    const seat = e.target.closest(".seat");
    if (!seat || seat.classList.contains("booked")) return;

    seat.classList.toggle("selected");

    const seatId = seat.dataset.id;
    if (seat.classList.contains("selected")) {
      selectedSeats.push(seatId);
    } else {
      selectedSeats = selectedSeats.filter((s) => s !== seatId);
    }

    calculateTotal();
  });

  // ✅ Hàm tính tổng tiền & cập nhật giao diện
  function calculateTotal() {
    countSpan.textContent = selectedSeats.length;

    let total = 0;
    selectedSeats.forEach((id) => {
      const seatEl = document.querySelector(`.seat[data-id='${id}']`);
      total += seatEl.classList.contains("vip") ? 100000 : 50000;
    });

    totalSpan.textContent = total.toLocaleString("vi-VN") + "₫";
    payBtn.disabled = selectedSeats.length === 0;
    return total;
  }

  // 💳 Hiển thị overlay thanh toán
  payBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");

    selectedList.innerHTML = selectedSeats.map((s) => `<li>${s}</li>`).join("");

    const total = calculateTotal();
    payTotal.textContent = total.toLocaleString("vi-VN") + "₫";

    qrImage.src = "./assets/img/qr.png";
  });

  // ❌ Đóng overlay
  document.getElementById("closePay").addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // ✅ Hoàn tất thanh toán
  document.getElementById("confirmPay").addEventListener("click", () => {
    alert("🎉 Thanh toán thành công! Chúc bạn xem phim vui vẻ.");
    overlay.classList.add("hidden");

    document.querySelectorAll(".seat.selected").forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("booked");
    });

    selectedSeats = [];
    calculateTotal();
  });
});
