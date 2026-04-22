(function () {
    let score = 0; // ตัวแปรเก็บคะแนน เริ่มที่ 0

    // ส่วน Logic (Process)
    window.feedNo = function () {
        score = score + 1; // บวกเพิ่มทีละหนึ่ง
        document.getElementById("score").innerText = score; // โชว์คะแนนใหม่

        let img = document.getElementById("no-img");
        let status = document.getElementById("status-text");

        // 🧠 นี่คือ Logic Range (0-50, 51-80, 81+)
        if (score <= 30) {
            // State: ผอมโซ
            img.src = "no_thin.jpg";
            img.style.width = "250px";
            status.innerText = "กำลังหิวโหย...";
        } else if (score <= 80) {
            // State: เริ่มมีกิน
            img.src = "no_normal.jpg";
            img.style.width = "300px"; // ขยายขนาดนิดหน่อย
            status.innerText = "เริ่มมีแก้มแล้ว!";
        } else {
            // State: SUPER FAT (เวอร์ชันพุงป่องอิ่มจนเดินไม่ไหว!)
            img.src = "no_superfat.jpg";
            img.style.width = "400px"; // ขยายร่างใหญ่สุดๆ
            status.innerText = "อิ่มจนพุงกาง เดินไม่ไหวแล้ว!! (Super Fat)";
        }
    };
    // ดักจับการพยายามแฮ็กตัวแปร score
    Object.defineProperty(window, 'score', {
        set: function (value) {
            triggerNightmare();
        }
    });

    function triggerNightmare() {
        // ถ้ามีใครพยายามเปลี่ยนคะแนนจาก Console...
        alert("แกพยายามโกงเหรอ?!");
        document.body.classList.add('nightmare-mode');
        document.getElementById('no-img').src = 'cheat.jpg';
        document.getElementById('status-text').innerText = "แกทำอะไรลงไป...";
    }
})();

